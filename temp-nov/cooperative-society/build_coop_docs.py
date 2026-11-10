import os
import base64
import subprocess
import shutil
import fitz

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
  <title>Technical & Commercial Proposal - Cooperative Society Contributions & Fund Pooling Mobile App - Sales Cowboy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
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
      line-height: 1.5;
      padding: 30px 20px;
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
      margin: 0 auto 30px;
      background: var(--paper);
      padding: 36px 42px;
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
      padding-bottom: 14px;
      margin-bottom: 18px;
    }}

    .brand-left {{
      display: flex;
      gap: 12px;
      align-items: center;
    }}

    .brand-logo {{
      height: 48px;
      width: auto;
      object-fit: contain;
      display: block;
    }}

    .brand-info h1 {{
      font-size: 18px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: var(--primary);
      text-transform: uppercase;
      line-height: 1.1;
    }}

    .brand-info p {{
      font-size: 10.5px;
      color: var(--text-muted);
      margin-top: 2px;
      letter-spacing: 0.2px;
    }}

    .meta-right {{
      text-align: right;
      font-size: 10.5px;
      color: var(--text-muted);
      line-height: 1.4;
    }}

    .meta-badge {{
      display: inline-block;
      background: var(--accent-light);
      color: var(--accent);
      font-weight: 700;
      font-size: 9.5px;
      padding: 2px 7px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }}

    .doc-title-block {{
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      padding: 16px 20px;
      border-radius: 7px;
      margin-bottom: 18px;
      border-left: 4px solid var(--accent);
    }}

    .doc-pre {{
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fbbf24;
      font-weight: 700;
      margin-bottom: 3px;
    }}

    .doc-title {{
      font-size: 17px;
      font-weight: 800;
      line-height: 1.25;
      letter-spacing: -0.3px;
    }}

    .doc-subtitle {{
      font-size: 11px;
      color: #94a3b8;
      margin-top: 4px;
    }}

    /* Section Styling */
    .section {{
      margin-bottom: 18px;
      page-break-inside: avoid;
    }}

    .section-title {{
      font-size: 12.5px;
      font-weight: 800;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-left: 3px solid var(--accent);
      padding-left: 8px;
      margin-bottom: 9px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}

    p {{
      font-size: 11px;
      color: var(--text);
      line-height: 1.5;
      margin-bottom: 8px;
    }}

    /* Grid & Cards */
    .grid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 10px;
    }}

    .card {{
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 11px 13px;
      page-break-inside: avoid;
    }}

    .card-title {{
      font-size: 11.5px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    .card ul {{
      list-style-type: none;
      padding-left: 0;
    }}

    .card ul li {{
      font-size: 10.5px;
      color: var(--text);
      margin-bottom: 5px;
      position: relative;
      padding-left: 12px;
      line-height: 1.4;
    }}

    .card ul li::before {{
      content: "•";
      position: absolute;
      left: 0;
      color: var(--accent);
      font-weight: bold;
    }}

    /* Tables */
    table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }}

    th, td {{
      padding: 7px 10px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }}

    th {{
      background: #f1f5f9;
      color: var(--primary);
      font-weight: 700;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }}

    tr:last-child td {{
      border-bottom: none;
    }}

    .highlight-cell {{
      font-weight: 700;
      color: var(--accent);
    }}

    /* Callouts */
    .callout {{
      background: #fffbeb;
      border-left: 3px solid #d97706;
      padding: 10px 12px;
      border-radius: 4px;
      margin-bottom: 12px;
      font-size: 11px;
      color: #92400e;
      line-height: 1.45;
    }}

    .callout strong {{
      color: #78350f;
    }}

    /* Page break helper */
    .page-break {{
      page-break-before: always;
      break-before: page;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px dashed #cbd5e1;
    }}

    @media print {{
      body {{
        background: #ffffff;
        padding: 0;
      }}
      .toolbar {{
        display: none !important;
      }}
      .sheet {{
        box-shadow: none;
        border: none;
        padding: 15px 20px;
        max-width: 100%;
        margin: 0;
      }}
      .page-break {{
        border-top: none;
        margin-top: 0;
        padding-top: 0;
      }}
    }}
  </style>
</head>
<body>

  <!-- Web Toolbar -->
  <div class="toolbar">
    <div class="toolbar-title">
      <span>Cooperative Society Contributions & Fund Pooling App Proposal</span>
    </div>
    <div class="toolbar-actions">
      <button class="btn btn-primary" onclick="window.print()">Print / Save PDF</button>
      <a href="/Cooperative-Society-Contributions-Wallet-App-Proposal.pdf" class="btn" download>Download PDF</a>
    </div>
  </div>

  <div class="sheet">
    <!-- PAGE 1 -->
    <!-- Corporate Letterhead -->
    <div class="letterhead">
      <div class="brand-left">
        <img class="brand-logo" src="data:image/png;base64,{b64_logo}" alt="Sales Cowboy Logo">
        <div class="brand-info">
          <h1>Sales Cowboy Marketing Solutions</h1>
          <p>Enterprise Digital & Software Solutions</p>
        </div>
      </div>
      <div class="meta-right">
        <div class="meta-badge">Commercial Proposal</div>
        <div><strong>Ref:</strong> SC-PROP-2026-COOP</div>
        <div><strong>Date:</strong> November 8, 2026</div>
        <div><strong>Validity:</strong> 30 Days</div>
      </div>
    </div>

    <!-- Document Title Block -->
    <div class="doc-title-block">
      <div class="doc-pre">Product Architecture & Commercial Proposal</div>
      <div class="doc-title">Cooperative Society Contributions & Fund Pooling Platform</div>
      <div class="doc-subtitle">Cross-Platform Member Mobile App (Android & iOS via React Native / Expo) + Master Executive Admin Console (Next.js)</div>
    </div>

    <!-- Section 1: Project Objective -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Objective</div>
      <p>
        The objective of this initiative is to build a modern, automated cooperative society management, member contribution, and fund pooling platform. The solution pairs a high-performance cross-platform mobile application for members (built with <strong>React Native / Expo</strong> for Android and iOS) with an executive administrative web management console (built with <strong>Next.js</strong>).
      </p>
      <p>
        The platform simplifies and automates periodic thrift contributions (Ajo, Esusu, and Rotating Savings), targeted project pooling (such as land acquisition, welfare funds, annual dividend accumulation, and emergency reserves), and multi-signatory fund disbursements. By digitizing inflows and linking them directly with double-entry ledgers, the solution eliminates manual bookkeeping errors, prevents contribution disputes, issues automated payment reminders, and provides complete financial transparency for cooperative executives and members alike.
      </p>
    </div>

    <!-- Section 2: Functional System Modules -->
    <div class="section">
      <div class="section-title">2. Functional System Scope</div>

      <div class="grid-2">
        <!-- Module 1: Mobile App -->
        <div class="card">
          <div class="card-title">
            <span>Module 1: Member Mobile App (React Native / Expo)</span>
          </div>
          <ul>
            <li><strong>Authentication & KYC:</strong> Instant mobile login via SMS OTP (Termii). Member profile onboarding with KYC documentation, photo upload, and next-of-kin records.</li>
            <li><strong>Periodic Thrift Savings:</strong> Automated tracking of recurring daily, weekly, or monthly savings cycles with real-time balance accumulation.</li>
            <li><strong>Target Fund Pools:</strong> Dedicated project pooling (Land Purchase, Welfare, Annual Dividend, Emergency Reserve) with personal and collective progress meters.</li>
            <li><strong>Payment Gateways:</strong> In-app debit card and dedicated virtual bank transfer processing via Paystack and Monnify with real-time wallet crediting upon webhook confirmation.</li>
            <li><strong>Offline Deposit Desk:</strong> Upload physical bank teller slips for members making in-person branch deposits, awaiting admin verification.</li>
            <li><strong>Digital Member Ledger:</strong> Complete transaction history with date/category filters and single-tap PDF statement exports.</li>
            <li><strong>Push Notifications & Alerts:</strong> Automated contribution due reminders, payment success confirmations, and broadcast executive announcements.</li>
          </ul>
        </div>

        <!-- Module 2: Admin Portal -->
        <div class="card">
          <div class="card-title">
            <span>Module 2: Master Executive Admin Console (Next.js)</span>
          </div>
          <ul>
            <li><strong>Membership Directory & Compliance:</strong> Comprehensive member registry, KYC document verification queue, and one-click account activation or suspension.</li>
            <li><strong>Contribution Schemes & Pool Engine:</strong> Create and configure target pools, periodic intervals, savings targets, and default penalty rules.</li>
            <li><strong>Automated Audit & Reconciliation:</strong> Real-time reconciliation matching payment gateway reference IDs against member balances, eliminating manual ledger tracking.</li>
            <li><strong>Offline Deposit Verification:</strong> Review and verify uploaded bank deposit slips and credit member balances with full audit trails.</li>
            <li><strong>Multi-Signatory Disbursement:</strong> Configurable authorization workflows for member withdrawal requests and cooperative project payouts.</li>
            <li><strong>Executive Financial Reports:</strong> Exportable accounting ledgers in Excel (XLSX) and CSV formats for general meetings, regulatory audits, and trustees.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- PAGE 2 -->
    <div class="page-break"></div>

    <!-- Section 3: Technical Architecture -->
    <div class="section">
      <div class="section-title">3. Enterprise Technical Architecture</div>
      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Layer / Component</th>
            <th style="width: 35%;">Technology Selected</th>
            <th style="width: 40%;">Core Purpose & Architecture Justification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Member Mobile App</strong></td>
            <td>React Native (Expo) - TypeScript</td>
            <td>Single cross-platform codebase compiled into native Android (APK/AAB) and iOS (IPA) binaries, providing smooth native UI performance and fast update cycles.</td>
          </tr>
          <tr>
            <td><strong>Admin Management Console</strong></td>
            <td>Next.js 14, React, Tailwind CSS</td>
            <td>Modern, responsive web application for desktop and tablet with secure server-side authentication, real-time data tables, and rapid financial filtering.</td>
          </tr>
          <tr>
            <td><strong>Backend API Engine</strong></td>
            <td>Node.js (NestJS / Express)</td>
            <td>Modular, robust RESTful API built on double-entry accounting principles to guarantee transaction balance integrity and prevent race conditions.</td>
          </tr>
          <tr>
            <td><strong>Database Layer</strong></td>
            <td>PostgreSQL with ACID Compliance</td>
            <td>Relational database with strict foreign keys, transactional boundaries, and automated daily cloud snapshots for enterprise auditability.</td>
          </tr>
          <tr>
            <td><strong>Payment Infrastructure</strong></td>
            <td>Paystack & Monnify Gateway APIs</td>
            <td>Secure tokenized card processing and automated dedicated virtual accounts with HMAC webhook signature verification.</td>
          </tr>
          <tr>
            <td><strong>Messaging & Alerts</strong></td>
            <td>Termii SMS API & Expo Push Notifications</td>
            <td>High-deliverability SMS gateway for OTP logins and critical financial notifications, complemented by free push notifications.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 4: Operational Costs -->
    <div class="section">
      <div class="section-title">4. Third-Party Infrastructure & Operational Costs</div>
      <p>
        The cooperative maintains direct billing and complete ownership of third-party infrastructure and service accounts:
      </p>
      <table>
        <thead>
          <tr>
            <th>Infrastructure / Service</th>
            <th>Recommended Provider</th>
            <th>Estimated Cost</th>
            <th>Billing Schedule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Cloud API & Managed Database Server</strong></td>
            <td>Render / Railway / DigitalOcean</td>
            <td>~$5 - $10 / month</td>
            <td>Monthly (scaled by usage)</td>
          </tr>
          <tr>
            <td><strong>Custom Domain & Managed SSL</strong></td>
            <td>Namecheap / Cloudflare</td>
            <td>~$10 / year</td>
            <td>Annual (Free SSL via Cloudflare)</td>
          </tr>
          <tr>
            <td><strong>Payment Gateway Inflows</strong></td>
            <td>Paystack / Monnify</td>
            <td>1.5% (capped at ₦2,000/inflow)</td>
            <td>Per Transaction (Zero setup or monthly fees)</td>
          </tr>
          <tr>
            <td><strong>SMS OTP & Alert Delivery</strong></td>
            <td>Termii</td>
            <td>~₦5.00 per SMS</td>
            <td>Per Transaction / Pre-funded credit wallet</td>
          </tr>
          <tr>
            <td><strong>Google Play Developer Account</strong></td>
            <td>Google Play Console</td>
            <td>$25 one-time fee</td>
            <td>Lifetime registration fee</td>
          </tr>
          <tr>
            <td><strong>Apple Developer Program Account</strong></td>
            <td>Apple Inc.</td>
            <td>$99 / year</td>
            <td>Annual developer membership</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGE 3 -->
    <div class="page-break"></div>

    <!-- Section 5: Work Breakdown Structure -->
    <div class="section">
      <div class="section-title">5. Implementation Roadmap & Milestones (4 Weeks)</div>
      <table>
        <thead>
          <tr>
            <th style="width: 15%;">Phase</th>
            <th style="width: 55%;">Scope of Execution</th>
            <th style="width: 30%;">Deliverable Handover</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Week 1</strong></td>
            <td>
              <strong>UX/UI Design, Architecture & KYC Engine</strong><br>
              Screen wireframing and design prototype. PostgreSQL double-entry database schema modeling. Termii SMS OTP authentication engine and member onboarding flow.
            </td>
            <td>Mobile UI Figma/mockups, staging backend environment, and working OTP authentication service.</td>
          </tr>
          <tr>
            <td><strong>Week 2</strong></td>
            <td>
              <strong>Contribution Pools & Payment Inflow Pipelines</strong><br>
              Implementation of periodic thrift savings logic, target project pooling, Paystack/Monnify payment integrations, webhook listener, and offline deposit upload workflow.
            </td>
            <td>Functional payment inflow engine with end-to-end sandbox card and transfer testing.</td>
          </tr>
          <tr>
            <td><strong>Week 3</strong></td>
            <td>
              <strong>React Native Mobile Client Deployment</strong><br>
              Cross-platform mobile application development for Android and iOS. Real-time member balances, automated ledger views, PDF statement generation, and push notification triggers.
            </td>
            <td>Internal test builds (Android APK and iOS TestFlight/Expo staging build).</td>
          </tr>
          <tr>
            <td><strong>Week 4</strong></td>
            <td>
              <strong>Executive Admin Console, Reconciliation & Go-Live</strong><br>
              Executive management web console, offline deposit audit desk, multi-signatory disbursement workflow, comprehensive UAT, production server deployment, and app store submission.
            </td>
            <td>Live cloud production deployment, finalized Android/iOS production binaries, and admin training.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 6: Commercial Terms -->
    <div class="section">
      <div class="section-title">6. Commercial Investment & Payment Schedule</div>
      <div class="callout">
        <strong>Total Fixed Development Investment:</strong> <strong>₦850,000 (Eight Hundred and Fifty Thousand Naira)</strong> covering complete development of the cross-platform React Native mobile application and the Master Executive Admin Web Console.
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Milestone Phase</th>
            <th style="width: 55%;">Milestone Deliverable Criteria</th>
            <th style="width: 20%;">Fee Breakdown</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Mobilization Deposit</strong></td>
            <td>Technical architecture, database design, backend setup, SMS OTP authentication, and complete UI/UX screen designs for mobile and admin.</td>
            <td class="highlight-cell">50% (₦425,000)</td>
          </tr>
          <tr>
            <td><strong>2. Functional Staging Milestone</strong></td>
            <td>Demonstration of working React Native mobile app with active contribution pools, live payment checkout integration, and staging admin console.</td>
            <td class="highlight-cell">30% (₦255,000)</td>
          </tr>
          <tr>
            <td><strong>3. Production Go-Live & Store Release</strong></td>
            <td>Cloud deployment, end-to-end payment audit verification, Android/iOS production binaries compilation, store release submission, and executive training.</td>
            <td class="highlight-cell">20% (₦170,000)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 7: Warranty & Sign-off -->
    <div class="section">
      <div class="section-title">7. Post-Launch Warranty & Acceptance</div>
      <p>
        Upon production deployment and store submission, Sales Cowboy provides <strong>thirty (30) days of complimentary technical warranty support</strong> covering bug remediation, security surveillance, calculation validation, and executive staff onboarding.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 18px; padding-top: 12px; border-top: 1px dashed var(--border);">
        <div>
          <div style="font-size: 10.5px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 20px;">For: Sales Cowboy (Developer)</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 5px;"></div>
          <div style="font-size: 10.5px; font-weight: 700; color: var(--primary);">Lead Systems Architect</div>
          <div style="font-size: 10px; color: var(--text-muted);">Sales Cowboy Marketing Solutions</div>
        </div>
        <div>
          <div style="font-size: 10.5px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 20px;">For: Cooperative Society Executive</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 5px;"></div>
          <div style="font-size: 10.5px; font-weight: 700; color: var(--primary);">Authorized Executive Representative</div>
          <div style="font-size: 10px; color: var(--text-muted);">Cooperative Society Management Committee</div>
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
pdf_name = "Cooperative-Society-Contributions-Wallet-App-Proposal.pdf"
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

doc = fitz.open(pdf_path)
print(f"[INFO] Total pages: {len(doc)}")
for i, p in enumerate(doc):
    print(f"Page {i+1}: {len(p.get_text())} characters, {len(p.get_images())} images")
