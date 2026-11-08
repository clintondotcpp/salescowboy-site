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
  <title>Technical & Commercial Proposal - On-Demand Home Healthcare & Doctor Dispatch Platform - Sales Cowboy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rye&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {{
      --primary: #0f172a;
      --accent: #0284c7;
      --accent-light: #e0f2fe;
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
      background: #0284c7;
      border-color: #0369a1;
      color: #ffffff;
    }}

    .btn-primary:hover {{
      background: #0369a1;
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
      color: #0284c7;
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
      color: #0369a1;
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
      background: #e0f2fe;
      color: #0369a1;
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
      color: #38bdf8;
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
      <span>On-Demand Home Healthcare & Doctor Dispatch Platform Proposal</span>
      <span style="color: #64748b;">•</span>
      <span style="color: #38bdf8; font-size: 11px; font-family: 'JetBrains Mono', monospace;">PROP-2026-SCM-MED-01</span>
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
          <div class="tagline">Enterprise Digital Engineering & Healthcare Systems</div>
          <div class="brand-contact">
            36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria<br>
            Email: hello@salescowboy.com.ng | Web: salescowboy.com.ng | Tel: +234 810 493 3232
          </div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="ref">PROP-2026-SCM-MED-01</div>
        <div>Date: November 8, 2026</div>
        <div>Status: Official Proposal</div>
      </div>
    </div>

    <!-- Title Block -->
    <div class="title-block">
      <span class="badge">Healthcare Systems Engineering Proposal</span>
      <h2>On-Demand Home Healthcare & Doctor Dispatch Platform</h2>
      <div class="subtext">Integrated Patient Web/PWA App, Medical Practitioner Portal & Central Operations Dashboard</div>
    </div>

    <!-- Recipient Info Grid -->
    <div class="recipient-grid">
      <div class="recipient-box">
        <div class="label">Prepared For (Client / Healthcare Enterprise)</div>
        <div class="name">Executive Healthcare Directorate</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Attn: Managing Director & Clinical Operations Team</div>
      </div>
      <div class="recipient-box">
        <div class="label">Project Scope & Deliverables</div>
        <div class="name">Tri-Platform Telemedicine Ecosystem</div>
        <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Patient Booking App + Medical Provider Portal + Master Admin Desk</div>
      </div>
    </div>

    <!-- Section 1: Executive Summary -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Clinical Objectives</div>
      <p>
        The objective of this engagement is to engineer and deploy a specialized on-demand home healthcare and medical practitioner dispatch platform. Traditional outpatient hospital visits in Nigerian urban centers are severely burdened by traffic gridlock, long queue times, and overcrowded clinical waiting rooms. For working professionals, elderly parents, chronic illness patients, and mothers with young children, visiting a hospital for routine checkups, nursing care, lab sample collection, or physiotherapy is exhausting and stressful.
      </p>
      <p>
        This platform bridges that gap by enabling patients and families to easily browse, book, schedule, and pay for accredited medical personnel (general practitioners, registered nurses, certified physiotherapists, and phlebotomists / lab technicians) to deliver healthcare directly in their homes.
      </p>
      <p>
        The ecosystem provides an intuitive, friction-free booking flow for patients while offering medical professionals clear visit itineraries, automated fee collection, and giving the business owner comprehensive clinical oversight and commission tracking.
      </p>
    </div>

    <!-- Section 2: Core Platform Modules (Module 1 & 2) -->
    <div class="section">
      <div class="section-title">2. Core Platform Modules</div>

      <!-- Module 1 -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 1: Patient Application (Mobile-Responsive Web / PWA)</div>
          <span class="module-badge">Patient Facing</span>
        </div>
        <ul class="feature-list">
          <li><strong>Service Selection Catalog:</strong> Browse available home visit services (e.g., General Consultation, Nursing Care, Blood Sample Collection/Lab Tests, Physical Therapy, Elderly Care).</li>
          <li><strong>Home Service Booking Flow:</strong>
            <br>• Select preferred clinical service and medical specialist type.
            <br>• Enter home address, landmark, and contact details with location mapping.
            <br>• Pick an immediate dispatch or schedule a specific date and time slot.
            <br>• Input primary symptoms, allergies, or medical notes for the attending practitioner.
          </li>
          <li><strong>Upfront Digital Payments:</strong> Secure payment integration via Paystack and Moniepoint (Card, Bank Transfer, USSD) to confirm and lock in appointments.</li>
          <li><strong>Booking Status & History:</strong> Real-time tracking of request status (`Pending Assignment`, `Practitioner Assigned`, `Practitioner En Route`, `Visit in Progress`, `Completed`), complete with past clinical visit logs.</li>
        </ul>
      </div>

      <!-- Module 2 -->
      <div class="module-card">
        <div class="module-header">
          <div class="module-title">Module 2: Medical Practitioner Portal (Web / Mobile Interface)</div>
          <span class="module-badge">Practitioner Facing</span>
        </div>
        <ul class="feature-list">
          <li><strong>Practitioner Onboarding & Vetting:</strong> Profile submission collecting license numbers, professional credentials (MBBS, Nursing council certs), ID verification, and bank details for payouts.</li>
          <li><strong>Duty Toggle & Dispatch Desk:</strong>
            <br>• Toggle availability (`Online` / `Offline`).
            <br>• Receive real-time notifications for new home service requests within their coverage area.
            <br>• Accept or decline requests with full access to patient address and initial visit notes.
          </li>
          <li><strong>Visit Completion & Notes:</strong> Mark appointments as completed and record clinical summary notes, vital signs, and treatment logs for follow-up.</li>
          <li><strong>Earnings Summary:</strong> View completed visits and accumulated earnings with automated payout requests to their registered Nigerian bank account.</li>
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
          <div class="module-title">Module 3: Central Administrative Dashboard (HQ Control Desk)</div>
          <span class="module-badge">Command & Control</span>
        </div>
        <ul class="feature-list">
          <li><strong>Medical Staff Credential Verification:</strong> Audit and approve or reject healthcare provider registrations and license validity before they can take home visits.</li>
          <li><strong>Central Dispatch & Booking Calendar:</strong> Master dashboard showing all scheduled, active, and completed home visits across operational coverage zones.</li>
          <li><strong>Financial Ledger & Commissions:</strong> Automated calculation of platform service commissions per home visit, payout tracking, and gross revenue reports.</li>
          <li><strong>Customer Support & Record Logs:</strong> Manage patient inquiries, handle rescheduled bookings, and inspect visit completion logs and clinical summaries.</li>
        </ul>
      </div>
    </div>

    <!-- Section 3: Technical Architecture -->
    <div class="section">
      <div class="section-title">3. Proposed Technical Architecture</div>
      <p>
        The platform is engineered on an enterprise, cost-controlled stack that delivers high clinical data security, fast responsiveness, and zero app store download barriers:
      </p>
      <ul class="feature-list">
        <li><strong>Frontend Apps (Patient & Practitioner):</strong> Built using <strong>Next.js (React)</strong> with Tailwind CSS, delivered as an installable <strong>Progressive Web App (PWA)</strong>. Works smoothly on any smartphone (Android/iOS) without requiring immediate App Store submissions or large downloads.</li>
        <li><strong>Backend API & Workflows:</strong> <strong>Node.js (NestJS)</strong> deployed on lightweight cloud infrastructure to manage secure data access, status state machines, and real-time notifications.</li>
        <li><strong>Database & Storage:</strong> <strong>PostgreSQL</strong> for patient and practitioner records, with encrypted medical notes and file storage.</li>
        <li><strong>Automated Alerts:</strong> Real-time SMS and WhatsApp notifications (via Termii) for appointment confirmations, practitioner en-route updates, and completion receipts.</li>
      </ul>
    </div>

    <!-- Section 4: Operational Costs -->
    <div class="section">
      <div class="section-title">4. Estimated Running & Third-Party Costs</div>
      <p>Third-party infrastructure fees are paid directly by the client to service providers at transparent cost:</p>
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
            <td><strong>Cloud Hosting & Backend API (Railway.app)</strong></td>
            <td>Runs core backend server, database, and dispatch workflows</td>
            <td class="highlight-cell">$5.00 - $10.00 / month</td>
          </tr>
          <tr>
            <td><strong>Database Storage (PostgreSQL)</strong></td>
            <td>Encrypted clinical records, user accounts, and visit ledgers</td>
            <td class="highlight-cell">Included in cloud tier (~$5/mo)</td>
          </tr>
          <tr>
            <td><strong>Domain Name & SSL Security (.ng / .com via Cloudflare)</strong></td>
            <td>Custom domain with Cloudflare SSL certificate & DDoS shield</td>
            <td class="highlight-cell">~$12.00 - $20.00 / year</td>
          </tr>
          <tr>
            <td><strong>SMS Alerts & OTPs (Termii)</strong></td>
            <td>Appointment confirmations and practitioner arrival alerts</td>
            <td class="highlight-cell">Pay-as-you-go (~₦5.00 / SMS)</td>
          </tr>
          <tr>
            <td><strong>Payment Gateway (Paystack / Moniepoint)</strong></td>
            <td>Upfront patient booking payments and practitioner payouts</td>
            <td class="highlight-cell">1.5% per local transaction</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 5: Commercial Investment -->
    <div class="section">
      <div class="section-title">5. Commercial Investment & Delivery Timeline</div>
      
      <div class="investment-box">
        <div>
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">Total Project Investment</div>
          <div class="amount">₦650,000</div>
        </div>
        <div class="timeline">
          <div style="font-weight: 700; color: #f1f5f9; font-size: 13px;">Delivery Timeline: 3 to 4 Weeks</div>
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
            <td>Paid at project kick-off; covers database schema design, architecture setup, and patient booking flow.</td>
            <td class="highlight-cell">50% (₦325,000)</td>
          </tr>
          <tr>
            <td><strong>2. Staging Milestone</strong></td>
            <td>Paid upon delivery of the practitioner portal, dispatch mechanism, and payment integration on staging.</td>
            <td class="highlight-cell">30% (₦195,000)</td>
          </tr>
          <tr>
            <td><strong>3. Handover & Go-Live</strong></td>
            <td>Paid upon production deployment, domain setup, payment gateway live testing, and admin handover.</td>
            <td class="highlight-cell">20% (₦130,000)</td>
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
          <div style="font-size: 10px; color: var(--text-muted);">Sales Cowboy Marketing Solutions</div>
        </div>
        <div>
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 24px;">For: Client Enterprise</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 6px;"></div>
          <div style="font-size: 11px; font-weight: 700; color: var(--primary);">Authorized Executive Representative</div>
          <div style="font-size: 10px; color: var(--text-muted);">Healthcare Operations Directorate</div>
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
pdf_name = "Telemedicine-Home-Healthcare-Platform-Proposal.pdf"
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
