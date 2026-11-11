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

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
public_dir = os.path.join(root_dir, "public")
out_dir = os.path.join(root_dir, "out")

common_css = f"""
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
      line-height: 1.45;
      padding: 24px 16px;
      -webkit-font-smoothing: antialiased;
    }}

    .toolbar {{
      max-width: 210mm;
      margin: 0 auto 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      padding: 10px 16px;
      border-radius: 8px;
      border: 1px solid #334155;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }}

    .toolbar-title {{
      color: #f1f5f9;
      font-size: 12.5px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .toolbar-actions {{
      display: flex;
      gap: 8px;
    }}

    .btn {{
      background: #0f172a;
      color: #f8fafc;
      border: 1px solid #475569;
      padding: 6px 14px;
      font-size: 11.5px;
      font-weight: 600;
      border-radius: 5px;
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
      margin: 0 auto 24px;
      background: var(--paper);
      padding: 28px 36px;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
      border: 1px solid var(--border);
      position: relative;
    }}

    /* Corporate Letterhead */
    .letterhead {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 10px;
      margin-bottom: 12px;
    }}

    .brand-left {{
      display: flex;
      gap: 10px;
      align-items: center;
    }}

    .brand-logo {{
      height: 44px;
      width: auto;
      object-fit: contain;
      display: block;
    }}

    .brand-info h1 {{
      font-size: 16.5px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: var(--primary);
      text-transform: uppercase;
      line-height: 1.1;
    }}

    .brand-info p {{
      font-size: 9.5px;
      color: var(--text-muted);
      margin-top: 2px;
      letter-spacing: 0.2px;
    }}

    .meta-right {{
      text-align: right;
      font-size: 9.5px;
      color: var(--text-muted);
      line-height: 1.35;
    }}

    .meta-badge {{
      display: inline-block;
      background: var(--accent-light);
      color: var(--accent);
      font-size: 8.5px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
      border: 1px solid #fde68a;
    }}

    /* Document Title Block */
    .doc-title-block {{
      margin-bottom: 12px;
      border-left: 4px solid var(--accent);
      padding-left: 10px;
    }}

    .doc-pre {{
      font-size: 8.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--accent);
      margin-bottom: 2px;
    }}

    .doc-title {{
      font-size: 15px;
      font-weight: 900;
      color: var(--primary);
      line-height: 1.2;
      letter-spacing: -0.3px;
    }}

    .doc-subtitle {{
      font-size: 9.5px;
      color: var(--text-muted);
      margin-top: 3px;
      font-weight: 500;
    }}

    /* Sections */
    .section {{
      margin-bottom: 10px;
      page-break-inside: avoid;
    }}

    .section-title {{
      font-size: 11px;
      font-weight: 800;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-left: 3px solid var(--accent);
      padding-left: 7px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}

    p {{
      font-size: 9.5px;
      color: var(--text);
      line-height: 1.4;
      margin-bottom: 5px;
    }}

    /* Grid & Cards */
    .grid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 6px;
    }}

    .grid-3 {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 7px;
      margin-bottom: 6px;
    }}

    .card {{
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 5px;
      padding: 7px 10px;
      page-break-inside: avoid;
    }}

    .card-title {{
      font-size: 10px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }}

    .card ul {{
      list-style-type: none;
      padding-left: 0;
    }}

    .card ul li {{
      font-size: 9px;
      color: var(--text);
      margin-bottom: 3px;
      position: relative;
      padding-left: 9px;
      line-height: 1.3;
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
      font-size: 9px;
      margin-bottom: 8px;
      page-break-inside: avoid;
    }}

    th, td {{
      padding: 4px 7px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }}

    th {{
      background: #f1f5f9;
      color: var(--primary);
      font-weight: 700;
      font-size: 8.5px;
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
      padding: 7px 9px;
      border-radius: 4px;
      margin-bottom: 8px;
      font-size: 9.5px;
      color: #92400e;
      line-height: 1.35;
    }}

    .callout strong {{
      color: #78350f;
    }}

    /* Page break helper */
    .page-break {{
      page-break-before: always;
      break-before: page;
      margin-top: 10px;
      padding-top: 10px;
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
        padding: 14px 18px;
        max-width: 100%;
        margin: 0;
      }}
      .page-break {{
        border-top: none;
        margin-top: 0;
        padding-top: 0;
      }}
    }}
"""

proposal_data = {
    "title": "Unified Real Estate Value-Chain & PropTech Ecosystem",
    "subtitle": "Cross-Platform iOS & Android Mobile Applications (React Native) + Central Web Operations Console",
    "ref": "SC-2026-NOV-006",
    "html_file": "6-proptech-ecosystem-proposal.html",
    "pdf_name": "PropTech-Unified-Value-Chain-Proposal.pdf",
    "client_for": "Project Sponsor / PropTech Ecosystem Client",
    "client_role": "Executive Director / Authorizing Official",
    "content_page1": """
    <!-- Section 1: Executive Summary & Objective -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Objective</div>
      <p>
        To develop an integrated PropTech ecosystem that addresses systemic inefficiencies, title uncertainty, middleman commission inflation, and fragmented services across the Nigerian property landscape. The solution combines high-performance <strong>React Native mobile applications for iOS and Android</strong> with a unified <strong>Next.js operations management console</strong>.
      </p>
      <p>
        The platform consolidates five distinct commercial verticals into one streamlined marketplace: direct property sales/lettings, verified shortlets and hospitality bookings, vetted trade artisans, building materials procurement, and an official land title search and verification request desk.
      </p>
    </div>

    <!-- Section 2: Functional System Scope -->
    <div class="section">
      <div class="section-title">2. Functional System Scope (Six Key Modules)</div>
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Module 1: Property Sales & Lettings (Direct)</div>
          <ul>
            <li><strong>Verified Property Catalog:</strong> Land, residential flats, duplexes, and commercial spaces with documentation badges (Title Inspected, Direct Mandate).</li>
            <li><strong>Direct Developer/Buyer Channels:</strong> Direct inquiry and inspection scheduling flow to eliminate multi-layered intermediary commissions.</li>
            <li><strong>Multi-Parameter Filter Engine:</strong> Filter by State, LGA, neighborhood, price band, property condition, and title type (C of O, Gazette, Deed).</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-title">Module 2: Land Registry & Title Verification Desk</div>
          <ul>
            <li><strong>Digital Intake Engine:</strong> Prospective buyers request pre-purchase land title search and legal coordinate charting.</li>
            <li><strong>Secure Document Upload:</strong> Upload survey plans, Deed of Assignment, Gazette references, and Governor's Consent documents.</li>
            <li><strong>Live Tracking Pipeline:</strong> Review progress stages (Received, Registry Search, Coordinate Charting, Report Ready) with PDF download.</li>
          </ul>
        </div>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Module 3: Vetted Artisans & Maintenance Hub</div>
          <ul>
            <li><strong>Certified Trade Directory:</strong> Plumbers, electricians, AC/refrigeration technicians, carpenters, painters, and masons.</li>
            <li><strong>Job Request & Dispatch Flow:</strong> Specify trade, describe fault, upload photos, provide site address, and receive matched artisan profile.</li>
            <li><strong>Escrow Sign-off & Mutual Ratings:</strong> Dual confirmation on completion and 5-star artisan rating system.</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-title">Module 4: Building Materials & Tool Procurement</div>
          <ul>
            <li><strong>Direct Supply Catalog:</strong> Transparent price listings for cement, rebar, gravel/sand, tiles, electrical wiring, and power tools.</li>
            <li><strong>Bulk Order Quote & Cart:</strong> Add items, request site delivery freight quotes, and checkout via verified regional supplier hubs.</li>
            <li><strong>Supplier Dispatch Ledger:</strong> Track order routing, site dispatch, and driver verification.</li>
          </ul>
        </div>
      </div>
      <div class="grid-2" style="margin-bottom: 0;">
        <div class="card">
          <div class="card-title">Module 5: Verified Shortlets & Hospitality</div>
          <ul>
            <li><strong>Verified Inventory:</strong> High-res photo galleries, 24/7 power, security, Wi-Fi amenity checklists, and nightly rates.</li>
            <li><strong>Calendar Booking Engine:</strong> Real-time date availability to prevent double-booking.</li>
            <li><strong>In-App Escrow Checkout:</strong> Automated payment processing with security deposit release.</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-title">Module 6: Master Operations Dashboard (Web)</div>
          <ul>
            <li><strong>Vetting & Accreditation Desk:</strong> Review and verify artisan credentials, supplier price sheets, and host property deeds.</li>
            <li><strong>Title Workflow Management:</strong> Assign title search requests to surveying partners and upload signed search reports.</li>
            <li><strong>Consolidated Commercial Ledger:</strong> Commission tracking, dispute resolution, and platform transaction audit trails.</li>
          </ul>
        </div>
      </div>
    </div>
    """,
    "content_page2": """
    <!-- Section 3: Technical Architecture -->
    <div class="section">
      <div class="section-title">3. Technical Architecture & Platform Stack</div>
      <table>
        <thead>
          <tr>
            <th style="width: 28%;">Layer</th>
            <th style="width: 32%;">Technology</th>
            <th style="width: 40%;">Core Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Mobile Applications (iOS & Android)</strong></td>
            <td>React Native (Expo / React Native CLI) - TypeScript</td>
            <td>Unified native mobile app on Apple App Store (.ipa) and Google Play Store (.apk/.aab) featuring push notifications, camera scanning, and geolocation.</td>
          </tr>
          <tr>
            <td><strong>Central Web & Admin Console</strong></td>
            <td>Next.js 15, React, Tailwind CSS</td>
            <td>High-performance responsive web dashboard for property developers, bulk procurement buyers, and back-office verification staff.</td>
          </tr>
          <tr>
            <td><strong>Backend API Engine & DB</strong></td>
            <td>Node.js (NestJS) + PostgreSQL</td>
            <td>Modular REST API managing listings, booking calendars, escrow workflows, and role-based permissions.</td>
          </tr>
          <tr>
            <td><strong>Media & Document Storage</strong></td>
            <td>Cloudflare R2 Storage (S3-Compatible)</td>
            <td>Zero-egress cloud storage for property photos, title deeds, and artisan identity verification documents.</td>
          </tr>
          <tr>
            <td><strong>Payment & Escrow Engine</strong></td>
            <td>Paystack / Monnify Gateway</td>
            <td>Automated local card processing, virtual bank accounts, instant payment webhooks, and escrow settlements.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 4: Operational Costs -->
    <div class="section">
      <div class="section-title">4. Third-Party Infrastructure & Operational Costs</div>
      <table>
        <thead>
          <tr>
            <th>Infrastructure / Service</th>
            <th>Purpose</th>
            <th>Estimated Initial Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Cloud Server & DB (Railway)</strong></td>
            <td>Runs backend API, database, and background queues</td>
            <td><strong>$10.00 - $20.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Media Storage (Cloudflare R2)</strong></td>
            <td>High-resolution property photos and deed uploads</td>
            <td><strong>Free tier / ~$5.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Custom Domain & Managed SSL</strong></td>
            <td>Brand domain name (.com or .ng) with Cloudflare CDN</td>
            <td><strong>~$15.00 - $25.00 / year</strong></td>
          </tr>
          <tr>
            <td><strong>SMS OTP & Alerts (Termii)</strong></td>
            <td>User phone verification and transaction notifications</td>
            <td><strong>Pay-as-you-go (~₦5.00 per SMS)</strong></td>
          </tr>
          <tr>
            <td><strong>Apple Developer Program</strong></td>
            <td>Annual iOS App Store distribution account</td>
            <td><strong>$99.00 / year</strong></td>
          </tr>
          <tr>
            <td><strong>Google Play Developer Account</strong></td>
            <td>One-time Android Play Store publishing account</td>
            <td><strong>$25.00 (One-off fee)</strong></td>
          </tr>
          <tr>
            <td><strong>Payment Gateway Processing</strong></td>
            <td>In-app payment collection via Paystack/Monnify</td>
            <td><strong>1.5% capped local processing fee</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 5: Commercial Investment -->
    <div class="section">
      <div class="section-title">5. Commercial Investment & Milestone Payment Schedule</div>
      <div class="callout">
        <strong>Total Development Investment:</strong> <strong>₦850,000 (Eight Hundred and Fifty Thousand Naira)</strong> | Project Timeline: <strong>4 to 5 Weeks</strong>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Milestone Stage</th>
            <th style="width: 55%;">Deliverable Scope</th>
            <th style="width: 20%;">Fee Breakdown</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Mobilization Deposit</strong></td>
            <td>System architecture, database schema design, and complete UI/UX interface layouts for React Native mobile apps and web console.</td>
            <td class="highlight-cell">50% (₦425,000)</td>
          </tr>
          <tr>
            <td><strong>2. Functional Staging Milestone</strong></td>
            <td>Delivery of property listings, title request intake, service booking flows, materials catalog, and mobile staging builds (iOS/Android TestFlight/APK).</td>
            <td class="highlight-cell">30% (₦255,000)</td>
          </tr>
          <tr>
            <td><strong>3. Production Handover</strong></td>
            <td>Production cloud deployment, custom domain setup, live payment gateway integration, app store submission packages, and administrative handover.</td>
            <td class="highlight-cell">20% (₦170,000)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 6: Warranty -->
    <div class="section">
      <div class="section-title">6. Post-Launch Technical Warranty & Support</div>
      <p>
        Sales Cowboy Marketing Solutions provides <strong>30 days of comprehensive post-launch warranty support</strong> covering bug remediation, calculation integrity checks, server monitoring, and administrative onboarding at zero additional cost.
      </p>
    </div>
    """
}

# Generate HTML
html_markup = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{proposal_data['title']} - Sales Cowboy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
{common_css}
  </style>
</head>
<body>

  <!-- Web Toolbar -->
  <div class="toolbar">
    <div class="toolbar-title">
      <span>{proposal_data['title']}</span>
    </div>
    <div class="toolbar-actions">
      <button class="btn btn-primary" onclick="window.print()">Print / Save PDF</button>
      <a href="/{proposal_data['pdf_name']}" class="btn" download>Download PDF</a>
    </div>
  </div>

  <div class="sheet">
    <!-- PAGE 1 -->
    <div class="letterhead">
      <div class="brand-left">
        <img class="brand-logo" src="data:image/png;base64,{b64_logo}" alt="Sales Cowboy Logo">
        <div class="brand-info">
          <h1>Sales Cowboy Marketing Solutions</h1>
          <p>Enterprise Digital & Software Development</p>
        </div>
      </div>
      <div class="meta-right">
        <div class="meta-badge">Commercial Proposal</div>
        <div><strong>Ref:</strong> {proposal_data['ref']}</div>
        <div><strong>Date:</strong> November 11, 2026</div>
        <div><strong>Validity:</strong> 30 Days</div>
      </div>
    </div>

    <div class="doc-title-block">
      <div class="doc-pre">Product Architecture & Commercial Proposal</div>
      <div class="doc-title">{proposal_data['title']}</div>
      <div class="doc-subtitle">{proposal_data['subtitle']}</div>
    </div>

    {proposal_data['content_page1']}

    <!-- PAGE 2 -->
    <div class="page-break"></div>

    {proposal_data['content_page2']}

    <!-- Section 7: Sign-off -->
    <div class="section" style="margin-top: 10px;">
      <div class="section-title">7. Project Acceptance & Authorization</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 14px; padding-top: 10px; border-top: 1px dashed var(--border);">
        <div>
          <div style="font-size: 9.5px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 18px;">For: Sales Cowboy (Developer)</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 5px;"></div>
          <div style="font-size: 10px; font-weight: 700; color: var(--primary);">Lead Systems Architect</div>
          <div style="font-size: 9px; color: var(--text-muted);">Sales Cowboy Marketing Solutions</div>
        </div>
        <div>
          <div style="font-size: 9.5px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 18px;">For: {proposal_data['client_for']}</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 5px;"></div>
          <div style="font-size: 10px; font-weight: 700; color: var(--primary);">{proposal_data['client_role']}</div>
          <div style="font-size: 9px; color: var(--text-muted);">{proposal_data['client_for']}</div>
        </div>
      </div>
    </div>

  </div>

</body>
</html>
"""

html_out = os.path.join(base_dir, proposal_data["html_file"])
with open(html_out, "w", encoding="utf-8") as f:
    f.write(html_markup)
print(f"[OK] Written HTML: {html_out}")

# Compile PDF
pdf_out = os.path.join(base_dir, proposal_data["pdf_name"])
file_url = "file:///" + html_out.replace("\\", "/")
cmd = [
    chrome,
    "--headless=new",
    "--disable-gpu",
    "--run-all-compositor-stages-before-draw",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_out}",
    file_url
]
subprocess.run(cmd, check=True)
print(f"[OK] Compiled PDF: {pdf_out}")

# Copy to public and out
shutil.copy2(pdf_out, os.path.join(public_dir, proposal_data["pdf_name"]))
if os.path.exists(out_dir):
    shutil.copy2(pdf_out, os.path.join(out_dir, proposal_data["pdf_name"]))
print(f"[OK] Copied {proposal_data['pdf_name']} to public and out")

# Verify pages with PyMuPDF
doc = fitz.open(pdf_out)
print(f"[VERIFY] {proposal_data['pdf_name']}: {len(doc)} pages, {len(doc[0].get_images())} logo images on page 1")
for idx, pg in enumerate(doc):
    print(f"  Page {idx+1}: {len(pg.get_text())} characters")

# Check content
full_text = " ".join([pg.get_text() for pg in doc])
has_trade_infra = "Trade Infrastructure" in full_text
has_sales_cowboy = "Sales Cowboy Marketing Solutions" in full_text
has_react_native = "React Native" in full_text
has_850k = "850,000" in full_text

print(f"  Has 'Trade Infrastructure': {has_trade_infra}")
print(f"  Has 'Sales Cowboy Marketing Solutions': {has_sales_cowboy}")
print(f"  Has 'React Native': {has_react_native}")
print(f"  Has '850,000': {has_850k}")

