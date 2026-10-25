// Proposal storage endpoint - persists to Cloudflare D1 & R2
interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
}

export async function onRequest(context: EventContext<Env, any, any>) {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    if (request.method === 'POST') {
      const body = await request.json() as {
        id?: string;
        proposalId: string;
        title?: string;
        clientName?: string;
        clientEmail?: string;
        totalAmount?: number;
        currency?: string;
        proposalDate?: string;
        status?: string;
        data: any; // full proposal state
      };

      if (!body.proposalId) {
        return new Response(JSON.stringify({ error: 'Proposal ID is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const id = body.id || body.proposalId;
      const proposalId = body.proposalId;
      const r2Key = `proposals/${proposalId}.json`;
      const dataStr = typeof body.data === 'string' ? body.data : JSON.stringify(body.data);

      // 1. Save to R2 Bucket
      if (env.BUCKET) {
        await env.BUCKET.put(r2Key, dataStr, {
          customMetadata: {
            proposalId,
            clientName: body.clientName || '',
            title: body.title || '',
            savedAt: new Date().toISOString(),
          },
        });
      } else {
        console.warn('[proposals] R2 BUCKET binding not found, skipping R2 upload');
      }

      // 2. Save / Upsert to D1 Database
      if (env.DB) {
        await env.DB.prepare(`
          INSERT INTO proposals (
            id, proposal_id, title, client_name, client_email, 
            total_amount, currency, proposal_date, status, 
            r2_key, data, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(proposal_id) DO UPDATE SET
            title = excluded.title,
            client_name = excluded.client_name,
            client_email = excluded.client_email,
            total_amount = excluded.total_amount,
            currency = excluded.currency,
            proposal_date = excluded.proposal_date,
            status = excluded.status,
            r2_key = excluded.r2_key,
            data = excluded.data,
            updated_at = CURRENT_TIMESTAMP
        `).bind(
          id,
          proposalId,
          body.title || null,
          body.clientName || null,
          body.clientEmail || null,
          body.totalAmount || 0,
          body.currency || '₦',
          body.proposalDate || null,
          body.status || 'issued',
          r2Key,
          dataStr
        ).run();
      } else {
        console.warn('[proposals] D1 DB binding not found, skipping DB insert');
      }

      return new Response(JSON.stringify({
        success: true,
        id,
        proposalId,
        r2Key,
        savedToR2: !!env.BUCKET,
        savedToDB: !!env.DB,
        message: 'Proposal successfully stored in D1 database and R2 bucket'
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (request.method === 'GET') {
      const url = new URL(request.url);
      const proposalId = url.searchParams.get('proposalId') || url.searchParams.get('id');

      if (proposalId) {
        // Fetch single proposal
        if (env.DB) {
          const row = await env.DB.prepare(
            'SELECT * FROM proposals WHERE proposal_id = ? OR id = ?'
          ).bind(proposalId, proposalId).first<any>();

          if (row) {
            return new Response(JSON.stringify({
              success: true,
              data: row,
              source: 'd1'
            }), {
              headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            });
          }
        }

        // Fallback to R2
        if (env.BUCKET) {
          const r2Key = `proposals/${proposalId}.json`;
          const obj = await env.BUCKET.get(r2Key);
          if (obj) {
            const content = await obj.text();
            return new Response(JSON.stringify({
              success: true,
              data: {
                proposal_id: proposalId,
                data: content,
                r2_key: r2Key,
              },
              source: 'r2'
            }), {
              headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            });
          }
        }

        return new Response(JSON.stringify({ error: 'Proposal not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      // List recent proposals from D1
      if (env.DB) {
        const result = await env.DB.prepare(
          'SELECT id, proposal_id, title, client_name, client_email, total_amount, currency, proposal_date, status, r2_key, created_at FROM proposals ORDER BY created_at DESC LIMIT 50'
        ).all();

        return new Response(JSON.stringify({
          success: true,
          proposals: result.results || []
        }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      return new Response(JSON.stringify({ success: true, proposals: [] }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[proposals] Fatal Error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
