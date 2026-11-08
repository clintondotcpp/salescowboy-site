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
      <h2>On-Demand Moving, Relocation & Truck Haulage Platform</h2>
      <div class="subtext">Bolt & inDrive Hybrid Fare Negotiation & Instant Dispatch Architecture</div>
    </div>

    <!-- Recipient Info Grid -->
    <div class="recipient-grid">
      <div class="recipient-box">
        <div class="label">Prepared Exclusively For (Client)</div>
        <div class="name">PHP Movers (PHP Movers & Logistics Limited)</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Attn: Executive Management & Operations Directorate</div>
      </div>
      <div class="recipient-box">
        <div class="label">Project Scope & Target Platforms</div>
        <div class="name">Tri-Tier Mobility & Moving Ecosystem</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Customer Web/PWA App + Driver Partner App + Master Admin Desk</div>
      </div>
    </div>

    <!-- Section 1: Executive Summary -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Hybrid Architecture</div>
      <p>
        The objective of this engagement is to deploy a dedicated on-demand moving, relocation, and freight negotiation platform custom-engineered for <strong>PHP Movers</strong>. Traditional ride-hailing and parcel applications fail in commercial moving because haulage jobs are fundamentally heterogeneous: transporting a single washing machine requires a different operational flow than a complete 3-bedroom apartment relocation or commercial pallet freight.
      </p>
      <p>
        To solve this, the PHP Movers ecosystem unifies the two most proven transport models into a single operational interface:
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 12px 0 16px;">
        <div style="background: #f8fafc; border: 1px solid var(--border); border-top: 3px solid #0f172a; padding: 12px; border-radius: 6px;">
          <div style="font-weight: 800; font-size: 12px; color: var(--primary); margin-bottom: 4px;">The Bolt Model (Instant Dispatch)</div>
          <p style="font-size: 11.5px; margin-bottom: 0; color: #475569;">
            Engineered for standardized, rapid dispatches (cargo vans, pickup trucks, single-item moves) with upfront automated pricing calculated by distance and vehicle category.
          </p>
        </div>
        <div style="background: #f8fafc; border: 1px solid var(--border); border-top: 3px solid #b45309; padding: 12px; border-radius: 6px;">
          <div style="font-weight: 800; font-size: 12px; color: var(--accent); margin-bottom: 4px;">The inDrive Model (Fare Bidding)</div>
          <p style="font-size: 11.5px; margin-bottom: 0; color: #475569;">
            Purpose-built for residential relocations and bulky freight. Customers describe items, floor level, and propose a budget. Verified movers bid and counter-offer in real time.
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
          <div class="module-title">Module 1: Customer Moving & Freight Application (Web / Mobile PWA)</div>
          <span class="module-badge">Customer Facing</span>
        </div>
        <ul class="feature-list">
          <li><strong>Moving Classification:</strong> Express Parcel/Light Haulage (Vans/Pickups), Residential Relocation (1.5-Ton to 3-Ton Trucks), and Heavy Industrial Haulage (5-Ton to 10-Ton Flatbeds).</li>
          <li><strong>Cargo Manifest Builder:</strong> Itemized checklist (Furniture, Appliances, Boxes, Fragile Goods), floor levels, elevator availability, and photo uploads for accurate driver appraisal.</li>
          <li><strong>Dual Booking Options:</strong> Instant automated pricing (Bolt style) or real-time fare bidding with nearby truckers (inDrive style).</li>
          <li><strong>Real-Time GPS Tracking:</strong> Live vehicle map updates, ETA countdown, driver contact details, vehicle plate number, and mover verification badges.</li>
          <li><strong>Delivery Security OTP:</strong> 4-digit completion code provided to customer, required by driver upon cargo offload to confirm completion and release funds.</li>
        </ul>
      </div>

      <!-- Module 2 -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 2: Driver, Trucker & Mover Partner Application (Web / Mobile PWA)</div>
          <span class="module-badge">Partner Facing</span>
        </div>
        <ul class="feature-list">
          <li><strong>Driver & Truck Onboarding:</strong> Digital verification portal for driver license, vehicle particulars, roadworthiness certs, truck tonnage, and NUBAN bank accounts.</li>
          <li><strong>Real-Time Job Radar & Bidding Desk:</strong> Audio/visual alerts for moving manifests in radius with full cargo preview and one-tap counter-bidding (+₦3,000, +₦5,000, +₦10,000).</li>
          <li><strong>Navigation Bridge:</strong> One-touch handover of route coordinates to Google Maps or Waze for turn-by-turn truck navigation.</li>
          <li><strong>Move Condition Verification:</strong> Drivers capture photo proofs of pre-existing cargo condition before loading to protect against false damage claims.</li>
          <li><strong>Earnings & Commission Wallet:</strong> Live tracking of gross move revenues, automated commission deductions for PHP Movers, and instant NUBAN payouts.</li>
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
          <li><strong>Partner Verification Desk:</strong> Administrative verification, approval, or rejection of driver documents and vehicle inspections before granting live access.</li>
          <li><strong>Fleet Dispatch Monitor:</strong> Live geographical control map tracking all online vehicles, active moves, loading jobs, and in-transit trucks across Nigeria.</li>
          <li><strong>Dynamic Commission & Tariff Engine:</strong> Set base dispatch rates, per-kilometer charges, helper crew surcharges, and PHP Movers commission rates (10% to 15%).</li>
          <li><strong>Financial Ledger & Split Settlements:</strong> Centralized accounting tracking total Gross Merchandise Value (GMV), net commission earnings, and gateway settlements.</li>
          <li><strong>Dispute & Claims Resolution:</strong> Incident logging for transit delays, damage claims, SOS alerts, and user ratings oversight.</li>
        </ul>
      </div>
    </div>

    <!-- Section 3: Technical Architecture -->
    <div class="section">
      <div class="section-title">3. Recommended Technical Architecture</div>
      <p>
        The platform is built on an enterprise, cost-controlled stack that eliminates expensive proprietary map licensing and delivers high sub-second bidding performance:
      </p>
      <ul class="feature-list">
        <li><strong>Frontend PWA & Mobile APK:</strong> Next.js (React) + Tailwind CSS, compiled as installable Progressive Web Apps (PWAs) with zero download friction and lightweight footprint.</li>
        <li><strong>Real-Time Bidding API:</strong> Node.js (NestJS) with high-concurrency WebSockets for instant counter-offer delivery and sub-second room synchronizations.</li>
        <li><strong>Database & Caching:</strong> PostgreSQL for relational financial ledgers and trip archives; Redis for lightning-fast live GPS coordinates and active matching rooms.</li>
        <li><strong>Cost-Controlled Maps:</strong> Leaflet / OpenStreetMap / MapLibre routing to avoid prohibitive recurring Google Maps API bills.</li>
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
            <td><strong>Cloud Server (API & WebSockets)</strong></td>
            <td>Dedicated backend and bidding logic on Railway.app</td>
            <td class="highlight-cell">$5.00 - $10.00 / month</td>
          </tr>
          <tr>
            <td><strong>Database & Cache (PostgreSQL + Redis)</strong></td>
            <td>Secure trip ledgers, user accounts, and live coordinates</td>
            <td class="highlight-cell">Included in cloud tier (~$5/mo)</td>
          </tr>
          <tr>
            <td><strong>Custom Domain & SSL Security</strong></td>
            <td>phpmovers.ng / phpmovers.com with Cloudflare CDN & SSL</td>
            <td class="highlight-cell">~$12.00 - $20.00 / year</td>
          </tr>
          <tr>
            <td><strong>SMS OTP Verification (Termii)</strong></td>
            <td>Phone number verification and transit security alerts</td>
            <td class="highlight-cell">Pay-as-you-go (~₦5.00 / SMS)</td>
          </tr>
          <tr>
            <td><strong>Geospatial Routing (OSM / Leaflet)</strong></td>
            <td>Map rendering, route paths, and distance computation</td>
            <td class="highlight-cell">$0.00 (Free baseline tier)</td>
          </tr>
          <tr>
            <td><strong>Payment Gateway (Paystack)</strong></td>
            <td>In-app customer payments and wallet top-ups</td>
            <td class="highlight-cell">1.5% per local transaction</td>
          </tr>
          <tr>
            <td><strong>Google Play Developer Account</strong></td>
            <td>One-off registration fee for Android APK publishing</td>
            <td class="highlight-cell">$25.00 (One-time to Google)</td>
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
            <td>System architecture, database schema, vehicle categorization, and complete UI/UX responsive designs for Customer & Driver Apps.</td>
            <td class="highlight-cell">50% (₦600,000)</td>
          </tr>
          <tr>
            <td><strong>2. Functional Staging</strong></td>
            <td>Working WebSocket bidding engine (inDrive model), automated dispatch (Bolt model), driver onboarding portal, and interactive mapping.</td>
            <td class="highlight-cell">30% (₦360,000)</td>
          </tr>
          <tr>
            <td><strong>3. Production Handover</strong></td>
            <td>Live cloud production deployment, custom domain linkage, Paystack integration, Master Admin desk delivery, and 30-day warranty.</td>
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
          <div style="font-size: 10px; color: var(--text-muted);">PHP Movers & Logistics Limited</div>
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
