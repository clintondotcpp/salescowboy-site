// Invoice storage endpoint - persists to Cloudflare D1 & R2
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
        invoiceNumber: string;
        clientName?: string;
        clientEmail?: string;
        totalAmount?: number;
        currency?: string;
        invoiceDate?: string;
        dueDate?: string;
        status?: string;
        data: any; // full invoice state
      };

      if (!body.invoiceNumber) {
        return new Response(JSON.stringify({ error: 'Invoice number is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const id = body.id || body.invoiceNumber;
      const invoiceNumber = body.invoiceNumber;
      const r2Key = `invoices/${invoiceNumber}.json`;
      const dataStr = typeof body.data === 'string' ? body.data : JSON.stringify(body.data);

      // 1. Save to R2 Bucket
      if (env.BUCKET) {
        await env.BUCKET.put(r2Key, dataStr, {
          customMetadata: {
            invoiceNumber,
            clientName: body.clientName || '',
            savedAt: new Date().toISOString(),
          },
        });
      } else {
        console.warn('[invoices] R2 BUCKET binding not found, skipping R2 upload');
      }

      // 2. Save / Upsert to D1 Database
      if (env.DB) {
        await env.DB.prepare(`
          INSERT INTO invoices (
            id, invoice_number, client_name, client_email, 
            total_amount, currency, invoice_date, due_date, 
            status, r2_key, data, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(invoice_number) DO UPDATE SET
            client_name = excluded.client_name,
            client_email = excluded.client_email,
            total_amount = excluded.total_amount,
            currency = excluded.currency,
            invoice_date = excluded.invoice_date,
            due_date = excluded.due_date,
            status = excluded.status,
            r2_key = excluded.r2_key,
            data = excluded.data,
            updated_at = CURRENT_TIMESTAMP
        `).bind(
          id,
          invoiceNumber,
          body.clientName || null,
          body.clientEmail || null,
          body.totalAmount || 0,
          body.currency || '₦',
          body.invoiceDate || null,
          body.dueDate || null,
          body.status || 'issued',
          r2Key,
          dataStr
        ).run();
      } else {
        console.warn('[invoices] D1 DB binding not found, skipping DB insert');
      }

      return new Response(JSON.stringify({
        success: true,
        id,
        invoiceNumber,
        r2Key,
        savedToR2: !!env.BUCKET,
        savedToDB: !!env.DB,
        message: 'Invoice successfully stored in D1 database and R2 bucket'
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (request.method === 'GET') {
      const url = new URL(request.url);
      const invoiceNumber = url.searchParams.get('invoiceNumber') || url.searchParams.get('id');

      if (invoiceNumber) {
        // Fetch single invoice
        if (env.DB) {
          const row = await env.DB.prepare(
            'SELECT * FROM invoices WHERE invoice_number = ? OR id = ?'
          ).bind(invoiceNumber, invoiceNumber).first<any>();

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
          const r2Key = `invoices/${invoiceNumber}.json`;
          const obj = await env.BUCKET.get(r2Key);
          if (obj) {
            const content = await obj.text();
            return new Response(JSON.stringify({
              success: true,
              data: {
                invoice_number: invoiceNumber,
                data: content,
                r2_key: r2Key,
              },
              source: 'r2'
            }), {
              headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            });
          }
        }

        return new Response(JSON.stringify({ error: 'Invoice not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      // List recent invoices from D1
      if (env.DB) {
        const result = await env.DB.prepare(
          'SELECT id, invoice_number, client_name, client_email, total_amount, currency, invoice_date, due_date, status, r2_key, created_at FROM invoices ORDER BY created_at DESC LIMIT 50'
        ).all();

        return new Response(JSON.stringify({
          success: true,
          invoices: result.results || []
        }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      return new Response(JSON.stringify({ success: true, invoices: [] }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[invoices] Fatal Error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
