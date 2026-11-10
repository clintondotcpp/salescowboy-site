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
  <title>Technical & Commercial Proposal - Instant Property Valuation & Construction Costing Platform (React Native & Web) - Sales Cowboy</title>
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
      <span>Property Valuation & Construction Costing Proposal (React Native & Web)</span>
      <span style="color: #64748b;">•</span>
      <span style="color: #f59e0b; font-size: 11px; font-family: 'JetBrains Mono', monospace;">PROP-2026-SCM-PROPTECH-01</span>
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
          <div class="tagline">Enterprise Engineering & PropTech Architecture</div>
          <div class="brand-contact">
            36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria<br>
            Email: hello@salescowboy.com.ng | Web: salescowboy.com.ng | Tel: +234 810 493 3232
          </div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="ref">PROP-2026-SCM-PROPTECH-01</div>
        <div>Date: November 8, 2026</div>
        <div>Status: Official Proposal</div>
      </div>
    </div>

    <!-- Title Block -->
    <div class="title-block">
      <span class="badge">Commercial & Technical Proposal</span>
      <h2>Instant Property Valuation & Construction Costing Platform</h2>
      <div class="subtext">Native React Native Mobile Apps (iOS & Android) with Central Operations Web Dashboard</div>
    </div>

    <!-- Recipient Info Grid -->
    <div class="recipient-grid">
      <div class="recipient-box">
        <div class="label">Prepared For (Client / Real Estate Enterprise)</div>
        <div class="name">Executive Real Estate & Development Directorate</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Attn: Managing Director & Investment Team</div>
      </div>
      <div class="recipient-box">
        <div class="label">Project Scope & Deliverables</div>
        <div class="name">Tri-Platform PropTech Ecosystem</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">React Native iOS/Android Apps + Next.js Web Admin Console</div>
      </div>
    </div>

    <!-- Section 1: Executive Summary -->
    <div class="section">
      <div class="section-title">1. Project Objective & Strategic Vision</div>
      <p>
        The objective of this engagement is to engineer, deploy, and scale an automated real estate intelligence platform that provides prospective property buyers, homeowners, developers, and investors with immediate, location-accurate financial estimates for both <strong>existing properties</strong> and <strong>new construction projects from scratch</strong>.
      </p>
      <p>
        The platform is engineered as a high-utility tri-platform ecosystem:
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 12px 0 16px;">
        <div style="background: #f8fafc; border: 1px solid var(--border); border-top: 3px solid #0f172a; padding: 12px; border-radius: 6px;">
          <div style="font-weight: 800; font-size: 12px; color: var(--primary); margin-bottom: 4px;">Native Mobile App (React Native)</div>
          <p style="font-size: 11.5px; margin-bottom: 0; color: #475569;">
            Published on the Apple App Store (iOS) and Google Play Store (Android). Allows investors, buyers, and field agents to run on-the-go valuations and building costings.
          </p>
        </div>
        <div style="background: #f8fafc; border: 1px solid var(--border); border-top: 3px solid #b45309; padding: 12px; border-radius: 6px;">
          <div style="font-weight: 800; font-size: 12px; color: var(--accent); margin-bottom: 4px;">Central Operations Web Dashboard</div>
          <p style="font-size: 11.5px; margin-bottom: 0; color: #475569;">
            A responsive desktop control portal built in Next.js for real estate executives to calibrate regional pricing tables, construction indexes, and review captured leads.
          </p>
        </div>
      </div>
      <p>
        The platform functions as both a high-utility valuation calculator for users and an automated client-acquisition engine for the business, capturing verified contact details (WhatsApp-enabled phone numbers and emails) before unlocking complete financial reports.
      </p>
    </div>

    <!-- Section 2: Core Platform Modules (Module 1) -->
    <div class="section">
      <div class="section-title">2. Functional System Modules</div>

      <!-- Module 1 Track A -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 1 - Track A: Existing Property Market Valuation (React Native iOS & Android)</div>
          <span class="module-badge">Valuation Engine</span>
        </div>
        <ul class="feature-list">
          <li><strong>Location & Regional Tiering:</strong> State, Local Government Area (LGA), and specific neighborhood/corridor tiering (e.g., Lekki Phase 1, Ikoyi, Ikeja GRA, Guzape, Maitama, New Owerri).</li>
          <li><strong>Property Attribute Inputs:</strong> Building typology (Duplex, Semi-Detached, Terraced House, Multi-Family Flats, Commercial Space), land size, room counts, building age, finishing standard, and land title classification (C of O, Governor's Consent, Gazette, Deed of Conveyance).</li>
          <li><strong>Automated Computation:</strong> Delivers estimated current market resale value, anticipated annual rental income yield, and average capital payback duration based on regional baseline data.</li>
        </ul>
      </div>

      <!-- Module 1 Track B -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 1 - Track B: New Build Construction Cost Estimator / Digital BOQ</div>
          <span class="module-badge">BOQ Engine</span>
        </div>
        <ul class="feature-list">
          <li><strong>Building Typology Configuration:</strong> Selection of architectural typology (e.g., 4-Bedroom Detached Duplex, 2-Storey Block of 6 Flats, 3-Bedroom Bungalow).</li>
          <li><strong>Construction Scope Parameters:</strong> Floor area / square meter footprint, foundation type (standard strip vs raft/piling), and finishing tier (Economy, Executive, Luxury).</li>
          <li><strong>Milestone Cost Breakdown:</strong> Itemized estimates across: 1. Substructure & Foundation, 2. Frame & Superstructure, 3. Roofing & Carcass, 4. MEP Rough-ins, 5. Interior & Exterior Finishes.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- A4 Document Page 2 -->
  <div class="sheet">
    <!-- Section 2 Continued: Module 2 & 3 -->
    <div class="section">
      <!-- Module 2 -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 2: Lead Generation & Report Delivery Gate</div>
          <span class="module-badge">Lead Engine</span>
        </div>
        <ul class="feature-list">
          <li><strong>Instant On-Screen Summary:</strong> Displays baseline valuation and construction cost ranges directly on the mobile screen.</li>
          <li><strong>Lead Capture Gate:</strong> Unlocking the complete financial summary and itemized cost breakdown requires the user's Full Name, Phone Number (WhatsApp-enabled), and Email Address.</li>
          <li><strong>Downloadable Assessment Summary:</strong> Automatically compiles the generated figures into a clean, branded digital summary sheet for the user.</li>
          <li><strong>Instant WhatsApp Action:</strong> One-tap action button allowing the user to initiate a direct WhatsApp conversation with your sales team regarding their specific calculation.</li>
        </ul>
      </div>

      <!-- Module 3 -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 3: Master Administrative Web Dashboard (Next.js Web Portal)</div>
          <span class="module-badge">Control Console</span>
        </div>
        <ul class="feature-list">
          <li><strong>Rate & Price Configuration Desk:</strong> Simple admin forms to update localized square-meter valuation rates and construction material index prices (cement, rebar, granite, labor rates per LGA) without writing code.</li>
          <li><strong>Lead Vault & CRM Integration:</strong> Centralized table recording every assessment run, user contact details, selected property specs, and estimated values.</li>
          <li><strong>Data Export:</strong> One-click CSV export of captured leads for marketing campaigns, CRM syncing, and telephone follow-ups.</li>
        </ul>
      </div>
    </div>

    <!-- Section 3: Technical Architecture -->
    <div class="section">
      <div class="section-title">3. Proposed Technical Architecture</div>
      <p>
        The platform combines native cross-platform mobile fluidity on iOS and Android with an enterprise cloud backend:
      </p>
      <ul class="feature-list">
        <li><strong>Native Mobile Applications (iOS & Android):</strong> Developed natively in <strong>React Native</strong> (TypeScript). Compiles to native binary packages for the Apple App Store and Google Play Store, providing smooth animations, offline storage, and responsive UI.</li>
        <li><strong>Web Operations Console:</strong> Built using <strong>Next.js (React)</strong> styled with Tailwind CSS, providing a responsive control portal for desktop and tablet users.</li>
        <li><strong>Backend API & Calculation Engine:</strong> <strong>Node.js</strong> server actions and RESTful API endpoints for high-speed algorithmic execution and minimal latency.</li>
        <li><strong>Database & Storage:</strong> <strong>PostgreSQL</strong> relational database for immutable valuation logs, lead captures, and regional tariff matrices.</li>
        <li><strong>Hosting & CDN:</strong> Deployed on <strong>Railway / Cloudflare Edge</strong>, ensuring high availability, fast response times, and automated SSL encryption.</li>
      </ul>
    </div>

    <!-- Section 4: Operational Costs -->
    <div class="section">
      <div class="section-title">4. Estimated Third-Party Operational Costs</div>
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
            <td><strong>Cloud Hosting & Database (Railway.app)</strong></td>
            <td>Runs API backend, stores calculation logs and lead vault</td>
            <td class="highlight-cell">$5.00 - $10.00 / month</td>
          </tr>
          <tr>
            <td><strong>Custom Domain & SSL Protection</strong></td>
            <td>Brand domain name (.com or .ng) with Cloudflare SSL</td>
            <td class="highlight-cell">~$15.00 - $25.00 / year</td>
          </tr>
          <tr>
            <td><strong>Transactional Email Dispatch (Resend / SES)</strong></td>
            <td>Automated email delivery of valuation summary reports</td>
            <td class="highlight-cell">Free tier (up to 3,000 emails / month)</td>
          </tr>
          <tr>
            <td><strong>Apple Developer Program (iOS App Store)</strong></td>
            <td>Annual Apple Developer Account fee to publish on iOS</td>
            <td class="highlight-cell">$99.00 / year (Direct to Apple)</td>
          </tr>
          <tr>
            <td><strong>Google Play Console Account (Android)</strong></td>
            <td>One-time registration fee to publish on Google Play Store</td>
            <td class="highlight-cell">$25.00 (One-off to Google)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 5: Commercial Investment -->
    <div class="section">
      <div class="section-title">5. Commercial Investment & Payment Terms</div>
      
      <div class="investment-box">
        <div>
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">Total Project Investment</div>
          <div class="amount">₦850,000</div>
        </div>
        <div class="timeline">
          <div style="font-weight: 700; color: #f1f5f9; font-size: 13px;">Delivery Timeline: 3 to 4 Weeks</div>
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
            <td>Technical system architecture, database schema design, algorithmic costing models, and complete UI/UX responsive designs for React Native mobile app and Web Dashboard.</td>
            <td class="highlight-cell">50% (₦425,000)</td>
          </tr>
          <tr>
            <td><strong>2. Functional Staging Milestone</strong></td>
            <td>Deployment of the dual estimation engine, dynamic questionnaire, lead capture gate, and admin rate adjustment panel on staging.</td>
            <td class="highlight-cell">30% (₦255,000)</td>
          </tr>
          <tr>
            <td><strong>3. Production Handover & Go-Live</strong></td>
            <td>Live production deployment, custom domain connection, App Store / Play Store binary submission handover, staff training, and administrative handover.</td>
            <td class="highlight-cell">20% (₦170,000)</td>
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
          <div style="font-size: 10px; color: var(--text-muted);">Real Estate & Investment Directorate</div>
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
pdf_name = "PropTech-Property-Valuation-Construction-Estimator-Proposal.pdf"
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

