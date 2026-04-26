// Contact form submission endpoint with MailChannels email notifications
interface Env {
  DB: D1Database;
  ADMIN_EMAIL?: string;
  // MailChannels is built into Cloudflare Workers - no API key needed
}

export async function onRequest(context: EventContext<Env, any, any>) {
  const { request, env } = context;
  
  console.log("[contact] Request received", { method: request.method, url: request.url });
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
  
  if (request.method !== 'POST') {
    console.warn('[contact] Method not allowed', request.method);
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    if (!env.DB) {
      console.error('[contact] Critical Error: DB binding is missing. Ensure D1 is bound to "DB" in the Cloudflare dashboard.');
      return new Response(JSON.stringify({ error: 'Database connection missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const body = await request.json() as { 
      name: string; 
      email: string; 
      phone?: string; 
      business?: string; 
      city?: string;
      state?: string;
      message: string;
    };
    console.log('[contact] Parsed body', body);
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      console.warn('[contact] Missing required fields', body);
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Save to database
    console.log('[contact] Attempting database insert with status...');
    const insertStatement = env.DB.prepare(
      'INSERT INTO contacts (name, email, phone, business, city, state, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    )
      .bind(
        body.name,
        body.email,
        body.phone || null,
        body.business || null,
        body.city || null,
        body.state || null,
        body.message,
        'new'
      );

    const result = await insertStatement.run();
    console.log('[contact] Insert result:', JSON.stringify(result));
    
    const contactId = result.meta?.last_row_id ?? null;
    
    // Send email notification using MailChannels
    console.log('[contact] Attempting email notification...');
    const emailResponse = await sendEmailNotification(env, {
      name: body.name,
      email: body.email,
      phone: body.phone,
      business: body.business,
      city: body.city,
      state: body.state,
      message: body.message,
    });
    console.log('[contact] Email success:', emailResponse.success, emailResponse.error || '');
    
    return new Response(JSON.stringify({
      success: true,
      id: contactId,
      message: 'Contact submitted successfully',
      emailSent: emailResponse.success,
      emailError: emailResponse.error,
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('[contact] Fatal Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

async function sendEmailNotification(env: Env, contact: {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  city?: string;
  state?: string;
  message: string;
}) {
  try {
    // Get admin email from environment or use a default
    const adminEmail = env.ADMIN_EMAIL || 'hello@salescowboy.com.ng';
    
    // MailChannels API endpoint
    const emailRequest = {
      personalizations: [
        {
          to: [{ email: adminEmail }],
        },
      ],
      from: {
        email: 'noreply@salescowboy.com.ng',
        name: 'SalesCowboy Contact Form',
      },
      subject: `New Contact Form Submission from ${contact.name}`,
      content: [
        {
          type: 'text/html',
          value: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ''}
            ${contact.business ? `<p><strong>Business:</strong> ${contact.business}</p>` : ''}
            ${contact.city ? `<p><strong>City:</strong> ${contact.city}</p>` : ''}
            ${contact.state ? `<p><strong>State:</strong> ${contact.state}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${contact.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted via SalesCowboy Marketing contact form</small></p>
          `,
        },
      ],
    };
    console.log('[contact] Sending email payload', emailRequest);
    
    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailRequest),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[contact] MailChannels error', errorText);
      return { success: false, error: errorText };
    }
    
    return { success: true };
  } catch (error) {
    console.error('[contact] Email sending exception', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
