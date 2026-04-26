// Authentication endpoint - Login
interface Env {
  DB: D1Database;
  SESSION_SECRET?: string;
}

export async function onRequest(context: EventContext<Env, any, any>) {
  const { request, env } = context;
  
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    const body = await request.json() as { email: string; password: string };
    
    if (!body.email || !body.password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Get user from database
    const userResult = await env.DB.prepare(
      'SELECT id, email, password_hash, name, role FROM users WHERE email = ?'
    )
      .bind(body.email)
      .first<{ id: number; email: string; password_hash: string; name: string; role: string }>();
    
    if (!userResult) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Verify password using SHA-256 (same as used in create-admin script)
    // Note: In production, consider using a more secure method
    const passwordMatch = await verifyPassword(body.password, userResult.password_hash);
    
    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Generate session token
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    // Save session
    await env.DB.prepare(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)'
    )
      .bind(userResult.id, token, expiresAt.toISOString())
      .run();
    
    // Clean up expired sessions
    await env.DB.prepare('DELETE FROM sessions WHERE expires_at < ?')
      .bind(new Date().toISOString())
      .run();
    
    return new Response(JSON.stringify({
      success: true,
      token,
      user: {
        id: userResult.id,
        email: userResult.email,
        name: userResult.name,
        role: userResult.role,
      },
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  // Hash the provided password using SHA-256
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Compare with stored hash
  return hashHex === storedHash;
}
