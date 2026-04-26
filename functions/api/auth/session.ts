// Session verification endpoint
interface Env {
  DB: D1Database;
}

export async function onRequest(context: EventContext<Env, any, any>) {
  const { request, env } = context;
  
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const token = authHeader.substring(7);
    
    // Verify session
    const sessionResult = await env.DB.prepare(`
      SELECT s.id, s.user_id, s.expires_at, u.email, u.name, u.role
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ? AND s.expires_at > ?
    `)
      .bind(token, new Date().toISOString())
      .first<{ id: number; user_id: number; expires_at: string; email: string; name: string; role: string }>();
    
    if (!sessionResult) {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({
      authenticated: true,
      user: {
        id: sessionResult.user_id,
        email: sessionResult.email,
        name: sessionResult.name,
        role: sessionResult.role,
      },
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Session verification error:', error);
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
