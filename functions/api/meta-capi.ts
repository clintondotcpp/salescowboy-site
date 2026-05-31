export async function onRequest(context: EventContext<{ META_PIXEL_ID: string; META_ACCESS_TOKEN: string; SEND_EMAIL: any }, any, any>) {
    const { request, env } = context;

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }
  
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!env.META_PIXEL_ID || !env.META_ACCESS_TOKEN) {
      console.warn("[meta-capi] Missing META_PIXEL_ID or META_ACCESS_TOKEN in environment.");
      return new Response(JSON.stringify({ error: "Meta credentials missing", diagnostic: "Check dashboard environment variables" }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
  
    async function sha256(text: string): Promise<string> {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hash = await crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }

    try {
      const body = (await request.json()) as {
        eventName: string;
        eventId: string;
        userData?: Record<string, any>;
        customData?: Record<string, any>;
        notificationData?: Record<string, any>;
        url: string;
      };
      const { eventName, eventId, userData = {}, customData = {}, notificationData, url } = body;
      const clientUserAgent = request.headers.get("user-agent") ?? undefined;
      const clientIp = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? undefined;

      const payloadUserData: Record<string, unknown> = {};
      if (clientUserAgent) payloadUserData.client_user_agent = clientUserAgent;
      if (clientIp) payloadUserData.client_ip_address = clientIp;

      // Extract client cookies if provided
      if (userData.fbc) payloadUserData.fbc = userData.fbc;
      if (userData.fbp) payloadUserData.fbp = userData.fbp;

      // Hashing Email
      if (userData.em && typeof userData.em === "string") {
        const cleanEmail = userData.em.trim().toLowerCase();
        payloadUserData.em = await sha256(cleanEmail);
      }

      // Standardize and Hash Phone
      if (userData.ph && (typeof userData.ph === "string" || typeof userData.ph === "number")) {
        let cleanPhone = String(userData.ph).trim().replace(/\D/g, "");
        if (cleanPhone.startsWith("0") && cleanPhone.length === 11) {
          cleanPhone = "234" + cleanPhone.substring(1);
        } else if (cleanPhone.length === 10 && !cleanPhone.startsWith("234")) {
          cleanPhone = "234" + cleanPhone;
        }
        payloadUserData.ph = await sha256(cleanPhone);
      }

      const payload = {
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            event_id: eventId,
            event_source_url: url,
            user_data: payloadUserData,
            custom_data: customData,
          },
        ],
      };

      const response = await fetch(
        `https://graph.facebook.com/v18.0/${env.META_PIXEL_ID}/events?access_token=${env.META_ACCESS_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      // SEND EMAIL NOTIFICATION VIA CLOUDFLARE EMAIL ROUTING (SEND_EMAIL binding)
      if (notificationData && typeof env.SEND_EMAIL !== "undefined") {
        try {
          // Dynamic import of cloudflare:email is supported in Workers
          const { EmailMessage } = await import("cloudflare:email");
          const emailBody = `
=== NEW SALESCOWBOY APP LEAD ===

Business/Brand Name: ${notificationData.businessName}
App Type: ${notificationData.appLabel}

📱 WhatsApp Phone: ${notificationData.phone}
📧 Email Address: ${notificationData.email}

💰 Target Budget: ${notificationData.selectedBudget}
⏱️ Timeline: ${notificationData.selectedTimeline}

🔧 Custom Requirements: 
${notificationData.customFeatures || "No special features specified."}

================================
          `;
          
          const msg = new EmailMessage(
             "hello@salescowboy.com.ng", // Verified sender
             "chukwunyereclinton@gmail.com", // Verified destination
             `New SalesCowboy Lead: ${notificationData.businessName}`,
             emailBody
          );
          await env.SEND_EMAIL.send(msg);
          console.log("[meta-capi] Email notification sent successfully to chukwunyereclinton@gmail.com");
        } catch (emailErr) {
          console.error("[meta-capi] Failed to send email notification", emailErr);
        }
      }

      return new Response(JSON.stringify(result), {
        status: response.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (error) {
      console.error("[meta-capi] Failure", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
  }