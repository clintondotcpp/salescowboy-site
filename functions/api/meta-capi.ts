export async function onRequest(context: EventContext<{ META_PIXEL_ID: string; META_ACCESS_TOKEN: string }, any, any>) {
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
  
    try {
      const body = (await request.json()) as {
        eventName: string;
        eventId: string;
        userData?: Record<string, any>;
        customData?: Record<string, any>;
        url: string;
      };
      const { eventName, eventId, userData = {}, customData = {}, url } = body;
      const clientUserAgent = request.headers.get("user-agent") ?? undefined;
      const clientIp = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? undefined;

      const payloadUserData: Record<string, unknown> = { ...userData };
      if (clientUserAgent) payloadUserData.client_user_agent = clientUserAgent;
      if (clientIp) payloadUserData.client_ip_address = clientIp;

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