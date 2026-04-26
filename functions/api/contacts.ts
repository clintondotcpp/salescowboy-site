// Contact management endpoint - requires authentication
interface Env {
  DB: D1Database;
}

// Helper to verify authentication
async function verifyAuth(request: Request, env: Env): Promise<{ authenticated: boolean; user?: any }> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authenticated: false };
  }
  
  const token = authHeader.substring(7);
  
  const sessionResult = await env.DB.prepare(`
    SELECT s.user_id, u.email, u.name, u.role
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > ?
  `)
    .bind(token, new Date().toISOString())
    .first<{ user_id: number; email: string; name: string; role: string }>();
  
  if (!sessionResult) {
    return { authenticated: false };
  }
  
  return {
    authenticated: true,
    user: {
      id: sessionResult.user_id,
      email: sessionResult.email,
      name: sessionResult.name,
      role: sessionResult.role,
    },
  };
}

export async function onRequest(context: EventContext<Env, any, any>) {
  const { request, env } = context;
  
  // Verify authentication
  const auth = await verifyAuth(request, env);
  if (!auth.authenticated) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    if (request.method === 'GET') {
      // Get all contacts with pagination
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '50');
      const offset = (page - 1) * limit;
      const status = url.searchParams.get('status');
      
      let query = 'SELECT * FROM contacts';
      const params: any[] = [];
      
      if (status) {
        query += ' WHERE status = ?';
        params.push(status);
      }
      
      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(limit, offset);
      
      const result = await env.DB.prepare(query).bind(...params).all();
      
      // Get total count
      let countQuery = 'SELECT COUNT(*) as total FROM contacts';
      if (status) {
        countQuery += ' WHERE status = ?';
      }
      const countResult = await env.DB.prepare(countQuery).bind(...(status ? [status] : [])).first<{ total: number }>();
      
      return new Response(JSON.stringify({
        success: true,
        data: result.results || [],
        pagination: {
          page,
          limit,
          total: countResult?.total || 0,
          totalPages: Math.ceil((countResult?.total || 0) / limit),
        },
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (request.method === 'PATCH') {
      // Update contact status
      const body = await request.json() as { id: number; status?: string };
      
      if (!body.id) {
        return new Response(JSON.stringify({ error: 'Contact ID required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      const updates: string[] = [];
      const params: any[] = [];
      
      if (body.status) {
        updates.push('status = ?');
        params.push(body.status);
      }
      
      if (updates.length === 0) {
        return new Response(JSON.stringify({ error: 'No updates provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      updates.push('updated_at = ?');
      params.push(new Date().toISOString());
      params.push(body.id);
      
      await env.DB.prepare(
        `UPDATE contacts SET ${updates.join(', ')} WHERE id = ?`
      )
        .bind(...params)
        .run();
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (request.method === 'DELETE') {
      // Delete contact
      const url = new URL(request.url);
      const id = url.searchParams.get('id');
      
      if (!id) {
        return new Response(JSON.stringify({ error: 'Contact ID required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      await env.DB.prepare('DELETE FROM contacts WHERE id = ?')
        .bind(id)
        .run();
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contacts API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
