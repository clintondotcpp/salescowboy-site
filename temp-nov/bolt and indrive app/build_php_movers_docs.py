import os
import base64
import subprocess
import shutil

base_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(base_dir, "..", ".."))

logo_path = os.path.join(root_dir, "public", "assets", "salescowboy-logo.png")
with open(logo_path, "rb") as f:
    b64_logo = base64.b64encode(f.read()).decode("utf-8")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Technical & Commercial Proposal - PHP Movers - Sales Cowboy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rye&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {{
      --primary: #0f172a;
      --accent: #b45309;
      --accent-light: #fef3c7;
      --text: #1e293b;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --bg: #f8fafc;
      --paper: #ffffff;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #0b0f19;
      color: var(--text);
      line-height: 1.6;
      padding: 40px 20px;
      -webkit-font-smoothing: antialiased;
    }}

    .toolbar {{
      max-width: 210mm;
      margin: 0 auto 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      padding: 12px 20px;
      border-radius: 10px;
      border: 1px solid #334155;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }}

    .toolbar-title {{
      color: #f1f5f9;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .toolbar-actions {{
      display: flex;
      gap: 10px;
    }}

    .btn {{
      background: #0f172a;
      color: #f8fafc;
      border: 1px solid #475569;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      transition: all 0.2s ease;
    }}

    .btn:hover {{
      background: #334155;
      border-color: #64748b;
    }}

    .btn-primary {{
      background: #d97706;
      border-color: #b45309;
      color: #ffffff;
    }}

    .btn-primary:hover {{
      background: #b45309;
    }}

    /* A4 Paper Sheet */
    .sheet {{
      width: 100%;
      max-width: 210mm;
      min-height: 297mm;
      margin: 0 auto 30px;
      background: var(--paper);
      padding: 44px 50px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
      border: 1px solid var(--border);
      position: relative;
    }}

    /* Corporate Letterhead */
    .letterhead {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 20px;
      margin-bottom: 24px;
    }}

    .brand-left {{
      display: flex;
      gap: 14px;
      align-items: center;
    }}

    .brand-logo {{
      height: 52px;
      width: auto;
      object-fit: contain;
      display: block;
    }}

    .brand-info h1 {{
      font-size: 20px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: var(--primary);
      text-transform: uppercase;
      line-height: 1.1;
    }}

    .brand-info .tagline {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: #b45309;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-top: 3px;
    }}

    .brand-contact {{
      font-size: 10.5px;
      color: var(--text-muted);
      margin-top: 5px;
      line-height: 1.4;
    }}

    .doc-meta {{
      text-align: right;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: var(--text-muted);
      background: #f8fafc;
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }}

    .doc-meta .ref {{
      font-weight: 700;
      color: var(--primary);
      font-size: 12px;
      margin-bottom: 3px;
    }}

    /* Title Block */
    .title-block {{
      margin-bottom: 20px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 14px;
    }}

    .badge {{
      display: inline-block;
      background: var(--accent-light);
      color: #92400e;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }}

    .title-block h2 {{
      font-size: 20px;
      font-weight: 800;
      color: var(--primary);
      line-height: 1.25;
      margin-bottom: 6px;
    }}

    .title-block .subtext {{
      font-size: 13px;
      color: var(--text-muted);
    }}

    .recipient-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      background: #f8fafc;
      border: 1px solid var(--border);
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 24px;
      font-size: 12px;
    }}

    .recipient-box .label {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 3px;
    }}

    .recipient-box .name {{
      font-weight: 700;
      color: var(--primary);
      font-size: 13px;
    }}

    /* Sections */
    .section {{
      margin-bottom: 24px;
    }}

    .section-title {{
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--primary);
      border-left: 4px solid var(--accent);
      padding-left: 10px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    p {{
      font-size: 12.5px;
      color: #334155;
      line-height: 1.6;
      margin-bottom: 10px;
    }}

    .module-card {{
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 14px 16px;
      margin-bottom: 14px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }}

    .module-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 1px solid #f1f5f9;
    }}

    .module-title {{
      font-size: 13px;
      font-weight: 700;
      color: var(--primary);
    }}

    .module-badge {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      font-weight: 700;
      background: #eff6ff;
      color: #1e40af;
      padding: 2px 8px;
      border-radius: 4px;
    }}

    ul.feature-list {{
      list-style: none;
      padding-left: 0;
    }}

    ul.feature-list li {{
      position: relative;
      padding-left: 18px;
      font-size: 12px;
      color: #334155;
      margin-bottom: 6px;
      line-height: 1.5;
    }}

    ul.feature-list li::before {{
      content: "•";
      position: absolute;
      left: 4px;
      top: 0;
      color: var(--accent);
      font-weight: bold;
      font-size: 14px;
    }}

    /* Tables */
    table.data-table {{
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 18px;
      font-size: 11.5px;
    }}

    table.data-table th {{
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 9px 12px;
      font-weight: 700;
      font-size: 11px;
      letter-spacing: 0.3px;
    }}

    table.data-table td {{
      padding: 9px 12px;
      border-bottom: 1px solid var(--border);
      color: #334155;
    }}

    table.data-table tr:nth-child(even) {{
      background-color: #f8fafc;
    }}

    table.data-table tr:hover {{
      background-color: #f1f5f9;
    }}

    .highlight-cell {{
      font-weight: 700;
      color: var(--primary);
      font-family: 'JetBrains Mono', monospace;
    }}

    .investment-box {{
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      padding: 18px 22px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
    }}

    .investment-box .amount {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 24px;
      font-weight: 800;
      color: #f59e0b;
    }}

    .investment-box .timeline {{
      font-size: 12px;
      color: #cbd5e1;
      text-align: right;
    }}

    /* Print Styles */
    @media print {{
      body {{
        background: none;
        padding: 0;
      }}
      .toolbar {{
        display: none !important;
      }}
      .sheet {{
        box-shadow: none;
        border: none;
        padding: 24px 30px;
        margin: 0;
        max-width: 100%;
      }}
      .page-break {{
        page-break-before: always;
      }}
    }}
  </style>
</head>
<body>

  <!-- Top Action Toolbar -->
  <div class="toolbar">
    <div class="toolbar-title">
      <span>PHP Movers Product Development Proposal</span>
      <span style="color: #64748b;">•</span>
      <span style="color: #f59e0b; font-size: 11px; font-family: 'JetBrains Mono', monospace;">PROP-2026-SCM-PHP-01</span>
    </div>
    <div class="toolbar-actions">
      <button onclick="window.print()" class="btn btn-primary">Print / Save PDF</button>
    </div>
  </div>

  <!-- A4 Document Page 1 -->
  <div class="sheet">
    <!-- Letterhead -->
    <div class="letterhead">
      <div class="brand-left">
        <img src="data:image/png;base64,{b64_logo}" alt="Sales Cowboy Logo" class="brand-logo">
        <div class="brand-info">
          <h1>Sales Cowboy</h1>
          <div class="tagline">Enterprise Engineering & Market Architecture</div>
          <div class="brand-contact">
            36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria<br>
            Email: hello@salescowboy.com.ng | Web: salescowboy.com.ng | Tel: +234 810 493 3232
          </div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="ref">PROP-2026-SCM-PHP-01</div>
        <div>Date: November 8, 2026</div>
        <div>Status: Official Proposal</div>
      </div>
    </div>

    <!-- Title Block -->
    <div class="title-block">
      <span class="badge">Commercial & Technical Proposal</span>
      <h2>On-Demand Ride-Hailing & Fare Negotiation Platform</h2>
      <div class="subtext">Bolt & inDrive Hybrid Fare Negotiation & Instant Dispatch Mobility Ecosystem</div>
    </div>

    <!-- Recipient Info Grid -->
    <div class="recipient-grid">
      <div class="recipient-box">
        <div class="label">Prepared Exclusively For (Client)</div>
        <div class="name">PHP Movers (PHP Movers Limited)</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Attn: Executive Management & Operations Directorate</div>
      </div>
      <div class="recipient-box">
        <div class="label">Project Scope & Target Platforms</div>
        <div class="name">Tri-Tier Ride-Hailing Ecosystem</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Passenger Web/PWA App + Driver Partner App + Master Admin Desk</div>
      </div>
    </div>

    <!-- Section 1: Executive Summary -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Hybrid Architecture</div>
      <p>
        The objective of this engagement is to engineer, deploy, and scale a proprietary on-demand passenger mobility and ride-hailing platform custom-built for <strong>PHP Movers</strong>. The system is engineered specifically for the Nigerian urban transport ecosystem, merging the operational speed of <strong>Bolt</strong> (quick matching, live trip tracking, digital receipts) with the commercial flexibility of <strong>inDrive</strong> (fair fare bidding and passenger-driver price negotiation):
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 12px 0 16px;">
        <div style="background: #f8fafc; border: 1px solid var(--border); border-top: 3px solid #0f172a; padding: 12px; border-radius: 6px;">
          <div style="font-weight: 800; font-size: 12px; color: var(--primary); margin-bottom: 4px;">The Bolt Model (Instant Dispatch)</div>
          <p style="font-size: 11.5px; margin-bottom: 0; color: #475569;">
            Engineered for commuters seeking an immediate ride. Automated distance-and-time pricing dispatches the nearest active driver instantly with zero price negotiation.
          </p>
        </div>
        <div style="background: #f8fafc; border: 1px solid var(--border); border-top: 3px solid #b45309; padding: 12px; border-radius: 6px;">
          <div style="font-weight: 800; font-size: 12px; color: var(--accent); margin-bottom: 4px;">The inDrive Model (Fare Bidding)</div>
          <p style="font-size: 11.5px; margin-bottom: 0; color: #475569;">
            Passengers propose their starting fare budget. Nearby active drivers receive the ride request and can accept, counter-bid, or decline in real time.
          </p>
        </div>
      </div>
      <p>
        The platform connects everyday passengers with verified independent drivers while giving PHP Movers automated fee collection, commission management, and real-time operational oversight.
      </p>
    </div>

    <!-- Section 2: Core Platform Modules (Module 1 & 2) -->
    <div class="section">
      <div class="section-title">2. Core Platform Modules</div>

      <!-- Module 1 -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 1: Passenger Application (Web / Mobile PWA)</div>
          <span class="module-badge">Passenger Facing</span>
        </div>
        <ul class="feature-list">
          <li><strong>Trip Booking & Route Selection:</strong> Interactive map interface powered by OpenStreetMap and Leaflet to select pickup and drop-off points with automatic route and distance computation.</li>
          <li><strong>Dual Booking Modes (Bolt + inDrive Mechanics):</strong>
            <br>• <em>Standard Match (Bolt Model):</em> Instant automated dispatch based on distance-and-time pricing.
            <br>• <em>Fare Bidding (inDrive Model):</em> Passenger proposes a fare offer; nearby drivers can accept, counter-offer, or decline in real time.
          </li>
          <li><strong>Driver Tracking & Safety:</strong> Real-time vehicle location tracking as the driver approaches, with estimated time of arrival (ETA), vehicle details (make, model, color, plate number), and driver rating.</li>
          <li><strong>Direct Communication & Trip Completion:</strong> In-app calling and messaging button connecting rider and driver, and automatic digital trip receipts upon completion.</li>
          <li><strong>Start-of-Trip OTP Verification:</strong> 4-digit security PIN provided to the passenger, required by the driver before initiating the trip.</li>
        </ul>
      </div>

      <!-- Module 2 -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 2: Driver Partner Application (Web / Mobile PWA)</div>
          <span class="module-badge">Driver Facing</span>
        </div>
        <ul class="feature-list">
          <li><strong>Driver Onboarding & Verification:</strong> Digital registration portal collecting commercial driver license, vehicle particulars, roadworthiness documents, and bank account details (NUBAN) for payouts.</li>
          <li><strong>Trip Dispatch & Bidding Terminal:</strong> Toggle online/offline status, audio and visual alerts for incoming passenger requests in radius, and one-tap bidding to accept the proposed fare or counter with a customized price.</li>
          <li><strong>Turn-by-Turn Navigation Bridge:</strong> One-touch handover to Google Maps or Waze on the driver's phone for turn-by-turn route navigation.</li>
          <li><strong>Earnings & Commission Wallet:</strong> Daily and weekly earnings summary, trip logs, and tracking of platform commission deductions.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- A4 Document Page 2 -->
  <div class="sheet">
    <!-- Section 2 Continued: Module 3 -->
    <div class="section">
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 3: Central Operations & Master Admin Dashboard (PHP Movers HQ)</div>
          <span class="module-badge">Command & Control</span>
        </div>
        <ul class="feature-list">
          <li><strong>Driver & Vehicle Approval Desk:</strong> Verify, approve, or reject new driver registrations and inspect vehicle document uploads before granting platform access.</li>
          <li><strong>Live Fleet & Dispatch Monitor:</strong> Live administrative map view displaying all active trips, online drivers, and completed journeys.</li>
          <li><strong>Commission Engine:</strong> Set dynamic platform service commission rates (e.g., 10% to 15% per completed trip) with cash-trip commission deduction from driver balances.</li>
          <li><strong>User Management & Dispute Resolution:</strong> Track user ratings, handle trip disputes, manage SOS/emergency incident logs, and deactivate non-compliant accounts.</li>
        </ul>
      </div>
    </div>

    <!-- Section 3: Technical Architecture -->
    <div class="section">
      <div class="section-title">3. Recommended Technical Architecture</div>
      <p>
        To deliver high performance within a cost-effective budget, the platform avoids high-cost proprietary mapping licenses and builds on a lightweight, battery-efficient stack:
      </p>
      <ul class="feature-list">
        <li><strong>Frontend Apps (Passenger & Driver):</strong> Developed in <strong>Next.js (React)</strong> styled with Tailwind CSS, packaged as installable <strong>Progressive Web Apps (PWAs)</strong> or lightweight Android APKs. This ensures zero download friction, small storage footprints on budget Android smartphones, and instant updates without app store review delays.</li>
        <li><strong>Backend API & Real-Time Sockets:</strong> <strong>Node.js (NestJS) with WebSockets</strong> hosted on dedicated cloud worker dynos, handling sub-second bid updates, ride dispatch alerts, and location pings.</li>
        <li><strong>Database & Caching:</strong> <strong>PostgreSQL</strong> for immutable trip ledgers and user records, paired with <strong>Redis</strong> for active driver coordinates and live room matching.</li>
        <li><strong>Cost-Controlled Geospatial Mapping:</strong> Open-source tile routing (Leaflet / OpenStreetMap / MapLibre) to ensure map views do not generate heavy recurring Google Maps API bills.</li>
      </ul>
    </div>

    <!-- Section 4: Operational Costs -->
    <div class="section">
      <div class="section-title">4. Estimated Running & Third-Party Operational Costs</div>
      <p>Infrastructure fees are paid directly by PHP Movers to service providers at transparent cost:</p>
      <table class="data-table">
        <thead>
          <tr>
            <th>Infrastructure / Service</th>
            <th>Operational Purpose</th>
            <th>Estimated Initial Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Cloud Server (Backend API)</strong></td>
            <td>Runs core backend and dispatch logic on Railway.app</td>
            <td class="highlight-cell">$5.00 - $10.00 / month</td>
          </tr>
          <tr>
            <td><strong>Database & Cache (PostgreSQL + Redis)</strong></td>
            <td>Stores user accounts, trip ledgers, and live sessions</td>
            <td class="highlight-cell">Included in cloud tier (~$5 - $10/mo total)</td>
          </tr>
          <tr>
            <td><strong>Domain Name & Edge Security</strong></td>
            <td>Custom domain (e.g., .ng or .com) + Cloudflare SSL</td>
            <td class="highlight-cell">~$12.00 - $20.00 / year</td>
          </tr>
          <tr>
            <td><strong>SMS OTP / Phone Verification</strong></td>
            <td>User phone number verification via Termii</td>
            <td class="highlight-cell">Pay-as-you-go (~₦5.00 per SMS)</td>
          </tr>
          <tr>
            <td><strong>Map Routing & Tile Requests</strong></td>
            <td>Open-source map tiles (Leaflet / OSM)</td>
            <td class="highlight-cell">$0.00 (Free baseline tier)</td>
          </tr>
          <tr>
            <td><strong>Payment Gateway Integration</strong></td>
            <td>Paystack / Moniepoint for in-app wallet top-ups</td>
            <td class="highlight-cell">1.5% per local transaction</td>
          </tr>
          <tr>
            <td><strong>Google Play Developer Account</strong></td>
            <td>One-time account fee if deploying to Google Play Store</td>
            <td class="highlight-cell">$25.00 (One-off payment to Google)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 5: Commercial Investment -->
    <div class="section">
      <div class="section-title">5. Commercial Investment & Milestone Schedule</div>
      
      <div class="investment-box">
        <div>
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">Total Project Investment</div>
          <div class="amount">₦1,200,000</div>
        </div>
        <div class="timeline">
          <div style="font-weight: 700; color: #f1f5f9; font-size: 13px;">Delivery Timeline: 4 to 5 Weeks</div>
          <div>All 3 Core Application Modules Included</div>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Milestone</th>
            <th>Deliverable Description</th>
            <th>Payment Percentage & Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Mobilization Deposit</strong></td>
            <td>Paid upon signing of development agreement. Covers system architecture, database schema, and complete UI/UX interface design.</td>
            <td class="highlight-cell">50% (₦600,000)</td>
          </tr>
          <tr>
            <td><strong>2. Functional Staging Milestone</strong></td>
            <td>Paid upon deployment of the core backend, driver bidding logic, and real-time mapping dispatch to the staging environment.</td>
            <td class="highlight-cell">30% (₦360,000)</td>
          </tr>
          <tr>
            <td><strong>3. Production Handover & Go-Live</strong></td>
            <td>Paid upon live cloud deployment, domain linking, payment gateway verification, administrative training, and source code delivery.</td>
            <td class="highlight-cell">20% (₦240,000)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 6: Warranty & Authorization -->
    <div class="section">
      <div class="section-title">6. Post-Launch Warranty & Acceptance</div>
      <p>
        Upon production go-live, Sales Cowboy provides <strong>thirty (30) days of complimentary technical warranty support</strong> covering software bug resolutions, server uptime surveillance, and administrative staff onboarding.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; padding-top: 14px; border-top: 1px dashed var(--border);">
        <div>
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 24px;">For: Sales Cowboy (Developer)</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 6px;"></div>
          <div style="font-size: 11px; font-weight: 700; color: var(--primary);">Lead Systems Architect</div>
          <div style="font-size: 10px; color: var(--text-muted);">Trade Infrastructure LTD / Sales Cowboy</div>
        </div>
        <div>
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 24px;">For: PHP Movers (Client)</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 6px;"></div>
          <div style="font-size: 11px; font-weight: 700; color: var(--primary);">Authorized Executive Representative</div>
          <div style="font-size: 10px; color: var(--text-muted);">PHP Movers Limited</div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
"""

html_path = os.path.join(base_dir, "proposal-letterhead.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"[OK] Written {html_path}")

# Render PDF using headless Chrome
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
pdf_name = "PHP-Movers-Product-Development-Proposal.pdf"
pdf_path = os.path.join(base_dir, pdf_name)
file_url = "file:///" + html_path.replace("\\", "/")

cmd = [
    chrome,
    "--headless=new",
    "--disable-gpu",
    "--run-all-compositor-stages-before-draw",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    file_url
]
subprocess.run(cmd, check=True)
print(f"[OK] Rendered PDF: {pdf_path}")

# Copy to public and out
public_dir = os.path.join(root_dir, "public")
out_dir = os.path.join(root_dir, "out")
shutil.copy2(pdf_path, os.path.join(public_dir, pdf_name))
if os.path.exists(out_dir):
    shutil.copy2(pdf_path, os.path.join(out_dir, pdf_name))
print(f"[OK] Copied {pdf_name} to public and out")
