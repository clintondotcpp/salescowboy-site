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
  <title>Technical & Commercial Proposal - Driver Dedicated Virtual Account & Wallet Mobile App - Sales Cowboy</title>
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
      <span>Driver Dedicated Virtual Account & Wallet App Proposal</span>
      <span style="color: #64748b;">•</span>
      <span style="color: #f59e0b; font-size: 11px; font-family: 'JetBrains Mono', monospace;">PROP-2026-SCM-DRV-01</span>
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
          <div class="tagline">Enterprise Engineering & Mobility Fintech</div>
          <div class="brand-contact">
            36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria<br>
            Email: hello@salescowboy.com.ng | Web: salescowboy.com.ng | Tel: +234 810 493 3232
          </div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="ref">PROP-2026-SCM-DRV-01</div>
        <div>Date: November 8, 2026</div>
        <div>Status: Official Proposal</div>
      </div>
    </div>

    <!-- Title Block -->
    <div class="title-block">
      <span class="badge">Commercial & Technical Proposal</span>
      <h2>Driver Dedicated Virtual Account & Wallet Mobile App</h2>
      <div class="subtext">Native React Native (Expo) Android & iOS Mobile Wallet with Central Settlement Web Dashboard</div>
    </div>

    <!-- Recipient Info Grid -->
    <div class="recipient-grid">
      <div class="recipient-box">
        <div class="label">Prepared For (Client / Transport Fintech)</div>
        <div class="name">Executive Fleet & Settlement Directorate</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Attn: Managing Director & Operations Team</div>
      </div>
      <div class="recipient-box">
        <div class="label">Project Scope & Deliverables</div>
        <div class="name">Mobile Wallet & Web Settlement Console</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">React Native iOS/Android App + Web Settlement Console</div>
      </div>
    </div>

    <!-- Section 1: Executive Summary -->
    <div class="section">
      <div class="section-title">1. Project Objective & Strategic Vision</div>
      <p>
        The objective of this engagement is to design, develop, deploy, and scale a specialized mobile fintech wallet application purpose-built for commercial transport drivers (cabs, interstate buses, tricycles, dispatch riders, and haulage truckers).
      </p>
      <p>
        In the Nigerian cash-to-digital mobility landscape, commercial drivers face major operational friction with bank transfers:
      </p>
      <ul class="feature-list" style="margin-bottom: 12px;">
        <li>Traditional personal bank accounts fail to deliver immediate alerts while driving.</li>
        <li>Drivers waste time waiting for bank SMS alerts or asking passengers to show debit screens, leading to traffic blockages and vulnerability to fake transfer receipts.</li>
        <li>Mixing personal finances with daily operating cash creates accounting chaos for fleet managers and transport unions.</li>
      </ul>
      <p>
        This platform solves these challenges by automatically provisioning every driver with a unique, dedicated Nigerian bank account number (dynamic NUBAN via Paystack Dedicated Virtual Accounts, Monnify, or Moniepoint Microfinance Bank) registered in their name. When a passenger transfers money, the driver's in-app wallet is credited in real time via sub-second cloud webhooks, triggering an immediate loud audio chime and spoken voice credit alert so the driver confirms payment safely while operating the vehicle.
      </p>
    </div>

    <!-- Section 2: Core Platform Modules (Module 1) -->
    <div class="section">
      <div class="section-title">2. Functional System Modules</div>

      <!-- Module 1 -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 1: Driver Mobile Application (React Native / Expo: Android & iOS)</div>
          <span class="module-badge">Driver Mobile App</span>
        </div>
        <ul class="feature-list">
          <li><strong>Driver Onboarding & Identity Verification (KYC):</strong> Quick phone-number authentication (SMS OTP via Termii), full legal name capture, and automated BVN/NIN verification required by CBN regulations to issue dedicated virtual NUBAN accounts.</li>
          <li><strong>Dedicated Virtual Bank Account Desk:</strong> Prominent display of driver's dedicated bank account number (Wema, Sterling, or Moniepoint MFB) and account name, with one-tap copy button for fast sharing.</li>
          <li><strong>Printable & Displayable QR Code:</strong> Generates a high-contrast QR code matching the driver's payment credentials that can be laminated and displayed on the vehicle dashboard, sun visor, or headrest.</li>
          <li><strong>Instant Wallet & Audible Credit Alerts:</strong> Sub-second wallet balance updates via webhooks, accompanied by a loud chime and spoken voice notification (e.g., <em>"Payment received: Two Thousand Naira"</em>) for eyes-on-the-road safety.</li>
          <li><strong>Instant Payout & Bank Withdrawal:</strong> Link verified personal settlement bank account (NUBAN check with instant name verification), with one-tap instant withdrawal and automated midnight sweep options.</li>
          <li><strong>Double-Entry Transaction Ledger:</strong> Complete chronological transaction history filtering incoming passenger transfers, platform service deductions, and bank withdrawals.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- A4 Document Page 2 -->
  <div class="sheet">
    <!-- Section 2 Continued: Module 2 -->
    <div class="section">
      <!-- Module 2 -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 2: Central Administrative & Settlement Dashboard (Next.js Web Portal)</div>
          <span class="module-badge">Web Admin Desk</span>
        </div>
        <ul class="feature-list">
          <li><strong>Driver Account Ledger & KYC Auditing:</strong> Master registry of all registered drivers, verified identity credentials, active virtual account mappings, and current wallet balances.</li>
          <li><strong>Live Inflow & Webhook Settlement Monitor:</strong> Real-time ledger recording every incoming passenger bank transfer, matched webhook transaction reference, and outbound withdrawal request with search/filter tools.</li>
          <li><strong>Automated Commission & Platform Fee Engine:</strong> Configurable monetization engine to deduct a platform fee per incoming transfer (flat ₦50 or percentage split such as 2% to 5%) prior to crediting the driver's spendable wallet balance.</li>
          <li><strong>User Controls, Risk Mitigation & Dispute Desk:</strong> One-click wallet freeze/unfreeze controls for fraud prevention, investigation console for disputed transfers, and one-click CSV export of transaction ledgers.</li>
        </ul>
      </div>
    </div>

    <!-- Section 3: Technical Architecture -->
    <div class="section">
      <div class="section-title">3. Proposed Technical Architecture</div>
      <p>
        The platform is engineered on an enterprise, bank-grade architecture maintaining strict double-entry ledger integrity:
      </p>
      <ul class="feature-list">
        <li><strong>Mobile Application (Driver Client):</strong> Built using <strong>React Native (Expo)</strong> with TypeScript. Compiles to native binary packages for <strong>Google Android</strong> (.apk/.aab) and <strong>Apple iOS</strong> (.ipa), featuring native audio engines and background push notification listeners.</li>
        <li><strong>Web Admin Console:</strong> Built with <strong>Next.js 15 (React)</strong> styled with Tailwind CSS, delivering a responsive desktop and tablet portal for settlement officers.</li>
        <li><strong>Backend API & Webhook Dispatcher:</strong> Engineered in <strong>Node.js (NestJS)</strong> deployed on high-availability cloud infrastructure with idempotent webhook handlers to guarantee zero duplicate credits.</li>
        <li><strong>Database & Ledger:</strong> <strong>PostgreSQL</strong> relational database with strict ACID transaction boundaries and double-entry bookkeeping ledgers to eliminate phantom balances.</li>
        <li><strong>Banking Partner Infrastructure:</strong> Direct API integration with <strong>Paystack Dedicated Virtual Accounts (DVA)</strong> or <strong>Monnify Reserve Account APIs</strong> for automated, compliant NUBAN provisioning.</li>
      </ul>
    </div>

    <!-- Section 4: Operational Costs -->
    <div class="section">
      <div class="section-title">4. Estimated Running & Third-Party Operational Costs</div>
      <p>Third-party infrastructure and banking fees are paid directly by the client to service providers at transparent cost:</p>
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
            <td><strong>Cloud Server & DB (Railway.app)</strong></td>
            <td>Runs API backend, webhook listeners, and PostgreSQL ledger</td>
            <td class="highlight-cell">$5.00 - $10.00 / month</td>
          </tr>
          <tr>
            <td><strong>Virtual Account Inflow Fee</strong></td>
            <td>Bank transfer processing fee charged by fintech provider</td>
            <td class="highlight-cell">~1.0% to 1.5% capped (Standard rate)</td>
          </tr>
          <tr>
            <td><strong>SMS OTP Verification (Termii)</strong></td>
            <td>Driver telephone authentication and security PINs</td>
            <td class="highlight-cell">Pay-as-you-go (~₦5.00 per SMS)</td>
          </tr>
          <tr>
            <td><strong>Custom Domain & SSL Protection</strong></td>
            <td>Brand domain name (.com or .ng) with Cloudflare SSL</td>
            <td class="highlight-cell">~$15.00 - $25.00 / year</td>
          </tr>
          <tr>
            <td><strong>Google Play Developer Account</strong></td>
            <td>One-time Android publishing registration fee to Google</td>
            <td class="highlight-cell">$25.00 (One-time fee to Google)</td>
          </tr>
          <tr>
            <td><strong>Apple Developer Program (iOS App Store)</strong></td>
            <td>Annual iOS publishing registration fee to Apple</td>
            <td class="highlight-cell">$99.00 / year (Direct to Apple)</td>
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
          <div class="amount">₦650,000</div>
        </div>
        <div class="timeline">
          <div style="font-weight: 700; color: #f1f5f9; font-size: 13px;">Delivery Timeline: 3 to 4 Weeks</div>
          <div>React Native iOS/Android App + Web Settlement Desk</div>
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
            <td>Technical system architecture, database schema design, React Native mobile project setup, and complete UI/UX responsive screen designs for driver app.</td>
            <td class="highlight-cell">50% (₦325,000)</td>
          </tr>
          <tr>
            <td><strong>2. Integration & Staging Milestone</strong></td>
            <td>Successful integration of the banking API, virtual account generation, webhook credit listener, and staging withdrawal testing.</td>
            <td class="highlight-cell">30% (₦195,000)</td>
          </tr>
          <tr>
            <td><strong>3. Production Handover & Store Build</strong></td>
            <td>Final production build export, Web Admin Dashboard live deployment, staff training, and handover of documentation.</td>
            <td class="highlight-cell">20% (₦130,000)</td>
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
          <div style="font-size: 10px; color: var(--text-muted);">Fleet & Settlement Operations</div>
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
pdf_name = "Driver-Virtual-Account-Wallet-App-Proposal.pdf"
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

