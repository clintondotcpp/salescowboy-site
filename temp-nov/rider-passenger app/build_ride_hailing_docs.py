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
  <title>Technical & Commercial Proposal - Custom Ride-Hailing Platform (React Native iOS/Android & Web Dashboard) - Sales Cowboy</title>
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
      <span>Custom Ride-Hailing Platform Proposal (React Native & Web)</span>
      <span style="color: #64748b;">•</span>
      <span style="color: #f59e0b; font-size: 11px; font-family: 'JetBrains Mono', monospace;">PROP-2026-SCM-RIDE-01</span>
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
          <div class="tagline">Enterprise Engineering & Mobility Architecture</div>
          <div class="brand-contact">
            36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria<br>
            Email: hello@salescowboy.com.ng | Web: salescowboy.com.ng | Tel: +234 810 493 3232
          </div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="ref">PROP-2026-SCM-RIDE-01</div>
        <div>Date: November 8, 2026</div>
        <div>Status: Official Proposal</div>
      </div>
    </div>

    <!-- Title Block -->
    <div class="title-block">
      <span class="badge">Commercial & Technical Proposal</span>
      <h2>Custom Ride-Hailing Platform Ecosystem</h2>
      <div class="subtext">Native React Native Mobile Apps (iOS & Android) with Central Operations Web Dashboard</div>
    </div>

    <!-- Recipient Info Grid -->
    <div class="recipient-grid">
      <div class="recipient-box">
        <div class="label">Prepared For (Client / Mobility Enterprise)</div>
        <div class="name">Executive Transport Directorate</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Attn: Managing Director & Operations Team</div>
      </div>
      <div class="recipient-box">
        <div class="label">Project Scope & Deliverables</div>
        <div class="name">Tri-Platform Mobility Suite</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">React Native iOS/Android Apps + Next.js Web Admin Console</div>
      </div>
    </div>

    <!-- Section 1: Executive Summary -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Ecosystem Architecture</div>
      <p>
        The objective of this engagement is to design, develop, deploy, and launch a complete enterprise on-demand ride-hailing and mobility ecosystem engineered for rapid dispatch, real-time driver tracking, and commercial fleet management.
      </p>
      <p>
        The ecosystem is engineered across three native and web pillars:
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 12px 0 16px;">
        <div style="background: #f8fafc; border: 1px solid var(--border); border-top: 3px solid #0f172a; padding: 12px; border-radius: 6px;">
          <div style="font-weight: 800; font-size: 12px; color: var(--primary); margin-bottom: 4px;">Native Mobile Apps (React Native)</div>
          <p style="font-size: 11.5px; margin-bottom: 0; color: #475569;">
            Dedicated high-performance mobile applications for both Passengers and Drivers, compiling to native binaries for Apple iOS (App Store) and Google Android (Google Play).
          </p>
        </div>
        <div style="background: #f8fafc; border: 1px solid var(--border); border-top: 3px solid #b45309; padding: 12px; border-radius: 6px;">
          <div style="font-weight: 800; font-size: 12px; color: var(--accent); margin-bottom: 4px;">Web Operations Console (Next.js)</div>
          <p style="font-size: 11.5px; margin-bottom: 0; color: #475569;">
            A centralized desktop and tablet web dashboard for fleet managers to monitor live dispatches, audit driver KYC, configure dynamic tariffs, and manage payouts.
          </p>
        </div>
      </div>
    </div>

    <!-- Section 2: Core Platform Modules (Module 1 & 2) -->
    <div class="section">
      <div class="section-title">2. Core Platform Modules</div>

      <!-- Module 1 -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 1: Passenger Application (Native React Native: iOS & Android)</div>
          <span class="module-badge">iOS & Android App</span>
        </div>
        <ul class="feature-list">
          <li><strong>Onboarding & Authentication:</strong> Phone number verification via SMS OTP (Termii), profile setup, and saved destination shortcuts (Home, Work, Frequent Spots).</li>
          <li><strong>Booking & Fare Estimation:</strong> Interactive pickup/drop-off selection, real-time automated fare calculation based on distance and travel time, and ride tier selection (Standard, Comfort, XL).</li>
          <li><strong>Live Driver Matching & Geospatial Tracking:</strong> Proximity-based dispatch matching rider with nearest online driver, smooth real-time vehicle map tracking, and live ETA countdown.</li>
          <li><strong>Safety & Start-of-Trip OTP:</strong> Driver photo, full name, phone contact, vehicle details, 4-digit security pickup OTP verification, and in-app call/chat button.</li>
          <li><strong>Ratings & Digital Receipts:</strong> Two-way rating and feedback system, and automatic digital trip receipts delivered in-app.</li>
        </ul>
      </div>

      <!-- Module 2 -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 2: Driver Partner Application (Native React Native: iOS & Android)</div>
          <span class="module-badge">iOS & Android App</span>
        </div>
        <ul class="feature-list">
          <li><strong>Driver Onboarding & KYC:</strong> Digital compliance portal collecting driver license, vehicle registration particulars, roadworthiness certificates, and verified bank account details (NUBAN) for automated payouts.</li>
          <li><strong>Dispatch & Trip Acceptance Terminal:</strong> One-tap Online/Offline duty toggle, high-priority audio/visual alerts for incoming ride requests within radius, destination preview, and countdown timers.</li>
          <li><strong>Turn-by-Turn Navigation Bridge:</strong> Instant one-tap handover passing pickup and drop-off coordinates directly into Google Maps or Waze on the driver's phone.</li>
          <li><strong>Driver Wallet & Financial Ledger:</strong> Daily/weekly earnings summary, trip logs, real-time platform commission deduction tracking (for cash or card trips), and direct bank payout requests.</li>
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
          <div class="module-title">Module 3: Central Operations & Master Admin Dashboard (Next.js Web Portal)</div>
          <span class="module-badge">HQ Web Dashboard</span>
        </div>
        <ul class="feature-list">
          <li><strong>Driver Vetting & Approval Desk:</strong> Review, verify, approve, or reject new driver registrations and inspect uploaded vehicle particulars before granting platform dispatch access.</li>
          <li><strong>Live Fleet & Dispatch Monitor:</strong> Interactive administrative map view displaying all active trips, en-route drivers, and online vehicle density across operational zones.</li>
          <li><strong>Fare Matrix & Commission Control:</strong> Configure base fares, per-kilometer rates, per-minute wait time fees, surge pricing multipliers, and platform commission percentages (10% to 15%).</li>
          <li><strong>Finance, Disputes & Incident Logs:</strong> Comprehensive transaction ledgers, trip dispute resolution desk, user deactivation controls, and safety/SOS logs.</li>
        </ul>
      </div>
    </div>

    <!-- Section 3: Technical Architecture -->
    <div class="section">
      <div class="section-title">3. Proposed Technical Architecture</div>
      <p>
        The platform combines native cross-platform mobile fluidity with an enterprise high-throughput backend:
      </p>
      <ul class="feature-list">
        <li><strong>Native Mobile Applications (iOS & Android):</strong> Developed natively in <strong>React Native</strong> (TypeScript), compiling to native binaries for the Apple App Store and Google Play Store with full native hardware sensor support (GPS, background notifications).</li>
        <li><strong>Web Operations Console:</strong> Built using <strong>Next.js 15 (React)</strong> styled with Tailwind CSS, providing a responsive control portal for desktop and tablet users.</li>
        <li><strong>Backend API & Real-Time Engine:</strong> <strong>Node.js (NestJS)</strong> with high-throughput <strong>WebSockets</strong> for sub-second driver location pings, dispatch matching, and immediate state updates.</li>
        <li><strong>Database & Caching Tier:</strong> <strong>PostgreSQL</strong> for immutable financial ledgers and trip archives; <strong>Redis</strong> for sub-second driver location caching and active booking sessions.</li>
        <li><strong>Cost-Controlled Geospatial Mapping:</strong> Open-source tile rendering and routing engines (OpenStreetMap / Leaflet / Mapbox SDK bridges) to eliminate prohibitive third-party map API bills.</li>
      </ul>
    </div>

    <!-- Section 4: Operational Costs -->
    <div class="section">
      <div class="section-title">4. Estimated Running & Operational Costs</div>
      <p>Third-party infrastructure and store fees are paid directly by the client to service providers at transparent cost:</p>
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
            <td><strong>Cloud Application Server (Backend API)</strong></td>
            <td>Runs core backend logic and WebSockets on Railway.app</td>
            <td class="highlight-cell">$10.00 - $20.00 / month</td>
          </tr>
          <tr>
            <td><strong>Database & Cache (PostgreSQL + Redis)</strong></td>
            <td>Stores user accounts, trip ledgers, and live sessions</td>
            <td class="highlight-cell">Included in cloud tier (~$10/mo)</td>
          </tr>
          <tr>
            <td><strong>Custom Domain & SSL Protection</strong></td>
            <td>Brand domain name (.com or .ng) with Cloudflare CDN & SSL</td>
            <td class="highlight-cell">~$15.00 - $25.00 / year</td>
          </tr>
          <tr>
            <td><strong>SMS OTP Phone Verification (Termii)</strong></td>
            <td>User and driver account verification via SMS gateway</td>
            <td class="highlight-cell">Pay-as-you-go (~₦5.00 per SMS)</td>
          </tr>
          <tr>
            <td><strong>Payment Gateway Integration</strong></td>
            <td>Paystack or Moniepoint for in-app wallet top-ups</td>
            <td class="highlight-cell">1.5% per local transaction</td>
          </tr>
          <tr>
            <td><strong>Apple Developer Program (iOS App Store)</strong></td>
            <td>Annual Apple Developer fee to publish on iOS App Store</td>
            <td class="highlight-cell">$99.00 / year (Direct to Apple)</td>
          </tr>
          <tr>
            <td><strong>Google Play Console Account (Android)</strong></td>
            <td>One-time fee to publish Android apps on Google Play</td>
            <td class="highlight-cell">$25.00 (One-time to Google)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 5: Commercial Investment -->
    <div class="section">
      <div class="section-title">5. Commercial Investment & Payment Schedule</div>
      
      <div class="investment-box">
        <div>
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">Total Project Investment</div>
          <div class="amount">₦2,000,000</div>
        </div>
        <div class="timeline">
          <div style="font-weight: 700; color: #f1f5f9; font-size: 13px;">Delivery Timeline: 6 Weeks</div>
          <div>React Native iOS/Android Apps + Web Admin Dashboard</div>
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
            <td>System architecture, database schema, native mapping setup, and complete UI/UX responsive designs for both Rider and Driver React Native apps.</td>
            <td class="highlight-cell">40% (₦800,000)</td>
          </tr>
          <tr>
            <td><strong>2. Functional Staging Milestone</strong></td>
            <td>Working React Native iOS/Android builds on staging, live WebSocket ride matching, map tracking, and driver acceptance workflows.</td>
            <td class="highlight-cell">40% (₦800,000)</td>
          </tr>
          <tr>
            <td><strong>3. Production Handover & Go-Live</strong></td>
            <td>Final production deployment, Web Admin Dashboard delivery, Paystack integration, App Store / Play Store binary submission handover, and documentation.</td>
            <td class="highlight-cell">20% (₦400,000)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 6: Warranty & Authorization -->
    <div class="section">
      <div class="section-title">6. Post-Launch Warranty & Acceptance</div>
      <p>
        Following production handover, Sales Cowboy provides <strong>thirty (30) days of complimentary technical warranty support</strong> covering software bug resolutions, server uptime surveillance, and administrative staff onboarding.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; padding-top: 14px; border-top: 1px dashed var(--border);">
        <div>
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 24px;">For: Sales Cowboy (Developer)</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 6px;"></div>
          <div style="font-size: 11px; font-weight: 700; color: var(--primary);">Lead Systems Architect</div>
          <div style="font-size: 10px; color: var(--text-muted);">Sales Cowboy Marketing Solutions</div>
        </div>
        <div>
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 24px;">For: Client Enterprise</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 6px;"></div>
          <div style="font-size: 11px; font-weight: 700; color: var(--primary);">Authorized Executive Representative</div>
          <div style="font-size: 10px; color: var(--text-muted);">Mobility Operations Directorate</div>
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
pdf_name = "Custom-Ride-Hailing-Platform-Proposal.pdf"
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
