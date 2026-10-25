import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, business, city, state, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Save to Cloudflare D1 Database
    const cleanStr = (val?: string) => (val ? val.replace(/'/g, "''") : "");
    const sql = `INSERT INTO contacts (name, email, phone, business, city, state, message, status) VALUES ('${cleanStr(name)}', '${cleanStr(email)}', '${cleanStr(phone)}', '${cleanStr(business)}', '${cleanStr(city)}', '${cleanStr(state)}', '${cleanStr(message)}', 'new');`;

    try {
      const token = process.env.CLOUDFLARE_API_TOKEN || "Zk2a4nu8QSrtuEUAyblw6Nf2UDVthU2TfGIAzX7D";
      const cmd = `npx wrangler d1 execute salescowboy-db --remote --command="${sql.replace(/"/g, '\\"')}"`;
      await execAsync(cmd, {
        env: { ...process.env, CLOUDFLARE_API_TOKEN: token },
      });
      console.log("[api/contact] Saved to D1 remotely successfully");
    } catch (dbErr) {
      console.error("[api/contact] Error executing D1 insert:", dbErr);
    }

    // 2. Send email notification to admin
    try {
      const emailRequest = {
        personalizations: [
          {
            to: [
              { email: "hello@salescowboy.com.ng" },
              { email: "chukwunyereclinton@gmail.com" },
            ],
          },
        ],
        from: {
          email: "noreply@salescowboy.com.ng",
          name: "Sales Cowboy Contact Intake",
        },
        subject: `[LEAD] New Sales Cowboy Submission from ${name}`,
        content: [
          {
            type: "text/html",
            value: `
              <h2>New Lead Submission - Sales Cowboy Marketing Solutions</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
              ${business ? `<p><strong>Business:</strong> ${business}</p>` : ""}
              ${city ? `<p><strong>City:</strong> ${city}</p>` : ""}
              ${state ? `<p><strong>State:</strong> ${state}</p>` : ""}
              <p><strong>Message / Project Scope:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
              <hr>
              <p><small>Saved to Cloudflare D1 database: salescowboy-db</small></p>
            `,
          },
        ],
      };

      await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailRequest),
      }).catch((e) => console.log("[api/contact] MailChannels status:", e.message));
    } catch (emailErr) {
      console.error("[api/contact] Error sending email notification:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Contact submitted successfully and saved to DB.",
    });
  } catch (error: any) {
    console.error("[api/contact] Internal Error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
