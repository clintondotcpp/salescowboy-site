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
      padding: 30px 38px;
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
      margin-bottom: 14px;
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
      font-weight: 700;
      font-size: 8.5px;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
    }}

    .doc-title-block {{
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      padding: 13px 16px;
      border-radius: 6px;
      margin-bottom: 14px;
      border-left: 4px solid var(--accent);
    }}

    .doc-pre {{
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fbbf24;
      font-weight: 700;
      margin-bottom: 2px;
    }}

    .doc-title {{
      font-size: 15.5px;
      font-weight: 800;
      line-height: 1.25;
      letter-spacing: -0.3px;
    }}

    .doc-subtitle {{
      font-size: 10px;
      color: #94a3b8;
      margin-top: 3px;
    }}

    /* Section Styling */
    .section {{
      margin-bottom: 12px;
      page-break-inside: avoid;
    }}

    .section-title {{
      font-size: 11.5px;
      font-weight: 800;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-left: 3px solid var(--accent);
      padding-left: 7px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}

    p {{
      font-size: 10px;
      color: var(--text);
      line-height: 1.45;
      margin-bottom: 6px;
    }}

    /* Grid & Cards */
    .grid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 8px;
    }}

    .grid-3 {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 8px;
    }}

    .card {{
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 5px;
      padding: 8px 11px;
      page-break-inside: avoid;
    }}

    .card-title {{
      font-size: 10.5px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
    }}

    .card ul {{
      list-style-type: none;
      padding-left: 0;
    }}

    .card ul li {{
      font-size: 9.5px;
      color: var(--text);
      margin-bottom: 4px;
      position: relative;
      padding-left: 10px;
      line-height: 1.35;
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
      font-size: 9.5px;
      margin-bottom: 9px;
      page-break-inside: avoid;
    }}

    th, td {{
      padding: 5px 8px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }}

    th {{
      background: #f1f5f9;
      color: var(--primary);
      font-weight: 700;
      font-size: 9px;
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
      padding: 8px 10px;
      border-radius: 4px;
      margin-bottom: 9px;
      font-size: 10px;
      color: #92400e;
      line-height: 1.4;
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

proposals_data = [
    # 1. Cooperative Membership & Loan Platform
    {
        "num": 1,
        "ref": "SC-PROP-2026-COOP-LOAN",
        "title": "Nationwide Cooperative Membership & Loan Application Platform",
        "subtitle": "Cross-Platform Mobile Apps (Android & iOS via React Native / Expo) + Member & Executive Web Portal (Next.js)",
        "pdf_name": "Cooperative-Membership-Loan-Platform-Proposal.pdf",
        "html_file": "1-cooperative-loan-proposal.html",
        "client_for": "Cooperative Society National Executive Committee",
        "client_role": "National Executive Representative",
        "content_page1": """
    <!-- Section 1: Project Objective -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Objective</div>
      <p>
        To develop an accessible multi-platform digital system for a nationwide cooperative society. The platform enables prospective members across diverse state chapters to submit formal membership applications, upload required KYC credentials, and apply for cooperative loans directly from their smartphones or web browsers.
      </p>
      <p>
        For cooperative executives, it provides a centralized portal to review applicants by state/chapter, enforce creditworthiness guidelines, and manage loan approvals and disbursements efficiently without paperwork delays.
      </p>
    </div>

    <!-- Section 2: Functional System Modules -->
    <div class="section">
      <div class="section-title">2. Functional System Scope</div>
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Module 1: Member Onboarding Desk</div>
          <ul>
            <li><strong>Nationwide Chapter Selection:</strong> Applicants select state, local branch chapter, and member classification.</li>
            <li><strong>Digital KYC & Identity Profiling:</strong> Full personal details, government ID upload, passport photograph, utility proof of address, and next-of-kin records.</li>
            <li><strong>Fee & Share Capital Checkout:</strong> Automated registration dues and share capital payment collection via Paystack / Monnify.</li>
            <li><strong>Live Application Tracker:</strong> Real-time status tracker (Submitted, Under Review, Approved, Action Required).</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-title">Module 2: Loan Engine & Assessment</div>
          <ul>
            <li><strong>Dynamic Loan Product Catalog:</strong> Configurable products (Soft Loans, Business Expansion, Emergency, Asset Acquisition) with interest rates and tenors.</li>
            <li><strong>Interactive Loan Calculator:</strong> Real-time breakdown of monthly principal, interest, and total repayment obligations.</li>
            <li><strong>Guarantor Nomination:</strong> Nominate registered co-members as loan guarantors with in-app confirmation prompts.</li>
            <li><strong>Repayment Schedule Ledger:</strong> Active loan statements, upcoming due dates, and repayment histories.</li>
          </ul>
        </div>
      </div>
      <div class="card" style="margin-top: 6px;">
        <div class="card-title">Module 3: Executive Administration & State Chapter Console (Web)</div>
        <ul>
          <li><strong>Multi-State Filtering:</strong> Review membership applications and loan requests grouped by state, branch, or nationwide aggregate.</li>
          <li><strong>Loan Underwriting Desk:</strong> Inspect savings histories, guarantor compliance, and multi-tier approval actions (Chapter Lead -> State Exco -> Central Sign-off).</li>
          <li><strong>Audit Accounting & Export:</strong> One-click financial statement generation and data export (CSV/Excel) for executive board meetings.</li>
        </ul>
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
            <td><strong>Cross-Platform Mobile Apps</strong></td>
            <td>React Native (Expo) - TypeScript</td>
            <td>Unified native mobile application for Android (.apk/.aab) and iOS (.ipa) with offline caching and camera document capture.</td>
          </tr>
          <tr>
            <td><strong>Executive Web Portal</strong></td>
            <td>Next.js 14, React, Tailwind CSS</td>
            <td>Responsive desktop/tablet portal for chapter executives and administrative vetting staff.</td>
          </tr>
          <tr>
            <td><strong>Backend Engine & DB</strong></td>
            <td>Node.js (NestJS) + PostgreSQL</td>
            <td>Role-based permissions, transactional loan assessment ledgers, and automated notification triggers.</td>
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
            <td>Runs backend API and database</td>
            <td><strong>$5.00 - $10.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Custom Domain & Managed SSL</strong></td>
            <td>Brand domain name (.com or .ng)</td>
            <td><strong>~$10.00 - $20.00 / year</strong></td>
          </tr>
          <tr>
            <td><strong>SMS OTP & Alerts (Termii)</strong></td>
            <td>Phone verification and loan notices</td>
            <td><strong>Pay-as-you-go (~₦5.00 per SMS)</strong></td>
          </tr>
          <tr>
            <td><strong>Payment Gateway (Paystack/Monnify)</strong></td>
            <td>Processing membership registration dues</td>
            <td><strong>1.5% capped local processing fee</strong></td>
          </tr>
          <tr>
            <td><strong>Google Play Developer Account</strong></td>
            <td>One-time Android publishing fee</td>
            <td><strong>$25.00 (One-off fee)</strong></td>
          </tr>
          <tr>
            <td><strong>Apple Developer Program Account</strong></td>
            <td>Annual iOS App Store distribution</td>
            <td><strong>$99.00 / year</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 5: Commercial Investment -->
    <div class="section">
      <div class="section-title">5. Commercial Investment & Payment Schedule</div>
      <div class="callout">
        <strong>Total Development Investment:</strong> <strong>₦850,000 (Eight Hundred and Fifty Thousand Naira)</strong> | Timeline: <strong>4 Weeks</strong>
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
            <td>React Native setup, database schema design, and complete UI/UX interface layouts for mobile and web.</td>
            <td class="highlight-cell">50% (₦425,000)</td>
          </tr>
          <tr>
            <td><strong>2. Functional Staging Milestone</strong></td>
            <td>Delivery of working onboarding forms, KYC document uploads, loan calculation logic, and administrative review consoles.</td>
            <td class="highlight-cell">30% (₦255,000)</td>
          </tr>
          <tr>
            <td><strong>3. Production Handover</strong></td>
            <td>Production-ready Android and iOS app builds, deployment of live web portal, and administrative handover.</td>
            <td class="highlight-cell">20% (₦170,000)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 6: Warranty -->
    <div class="section">
      <div class="section-title">6. Post-Launch Warranty & Support</div>
      <p>
        Sales Cowboy provides <strong>30 days of complimentary technical warranty support</strong> covering bug remediation, calculation validation, and executive staff onboarding.
      </p>
    </div>
        """
    },

    # 2. Fleet Tracking & Dispatch Management Platform
    {
        "num": 2,
        "ref": "SC-PROP-2026-FLEET",
        "title": "Fleet Tracking & Dispatch Management Platform",
        "subtitle": "Driver & Rider Mobile Tracking App (Android & iOS via React Native / Expo) + Master Web Control Dashboard (Next.js)",
        "pdf_name": "Fleet-Tracking-Dispatch-Management-Proposal.pdf",
        "html_file": "2-fleet-tracking-proposal.html",
        "client_for": "Logistics & Fleet Transport Enterprise",
        "client_role": "Authorized Executive Representative",
        "content_page1": """
    <!-- Section 1: Project Objective -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Objective</div>
      <p>
        To develop a streamlined, lightweight logistics tracking and dispatch system for transport and courier operations. The system turns the rider or driver's smartphone into a live GPS tracker via a dedicated mobile app streaming coordinates in the background.
      </p>
      <p>
        Dispatch managers retain live visibility and control via a central web dashboard, allowing them to monitor active routes, assign delivery jobs, and manage driver operational status in real time.
      </p>
    </div>

    <!-- Section 2: Functional System Scope -->
    <div class="section">
      <div class="section-title">2. Functional System Scope</div>
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Module 1: Driver & Rider Mobile App</div>
          <ul>
            <li><strong>Shift Toggle & Login:</strong> Simple driver authentication with one-tap Start Shift (Online) and End Shift (Offline) toggle.</li>
            <li><strong>Background GPS Streaming:</strong> Transmits real-time coordinates (latitude, longitude, speed, heading) with battery and data optimization.</li>
            <li><strong>Assigned Delivery Tasks:</strong> Clean task list showing pending pickups, customer phone contact, and drop-off points with one-tap calling.</li>
            <li><strong>Task Progression:</strong> Accept Task -> Arrived at Pickup -> En Route -> Delivered.</li>
            <li><strong>Turn-by-Turn Navigation:</strong> One-touch handoff opening Google Maps or Apple Maps directly to delivery coordinates.</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-title">Module 2: Master Web Control Dashboard</div>
          <ul>
            <li><strong>Live Fleet Tracking Map:</strong> Interactive map (Leaflet / OpenStreetMap) showing all active riders, live vehicle coordinates, and status (Available, Busy, Offline).</li>
            <li><strong>Vehicle Marker Inspector:</strong> Click on any marker to inspect driver identity, speed, battery level, and assigned order reference.</li>
            <li><strong>Dispatch & Task Assignment:</strong> Create delivery jobs with pickup/drop-off addresses and assign manually to the closest available rider.</li>
            <li><strong>Driver Master Directory:</strong> Register and manage rider profiles, vehicle types, and license plate records.</li>
            <li><strong>Trip History & Logs:</strong> Searchable archive of past deliveries, completion timestamps, and delivery proof records.</li>
          </ul>
        </div>
      </div>
    </div>
        """,
        "content_page2": """
    <!-- Section 3: Technical Architecture -->
    <div class="section">
      <div class="section-title">3. Proposed Technical Architecture</div>
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
            <td><strong>Mobile Tracking App</strong></td>
            <td>React Native (Expo) - Android & iOS</td>
            <td>Low-memory mobile app compiled into native Android (.apk) and iOS (.ipa) with background geolocation services.</td>
          </tr>
          <tr>
            <td><strong>Fleet Control Dashboard</strong></td>
            <td>Next.js 14, React, Tailwind CSS</td>
            <td>Fast desktop/tablet dispatch portal featuring live tile rendering and instant vehicle status filtering.</td>
          </tr>
          <tr>
            <td><strong>Backend & Real-Time Sync</strong></td>
            <td>Node.js (NestJS) + WebSockets</td>
            <td>Bi-directional WebSocket connection broadcasting rider coordinates to the dashboard map in real time without page refreshing.</td>
          </tr>
          <tr>
            <td><strong>Database & Coordinate Cache</strong></td>
            <td>PostgreSQL + Redis</td>
            <td>PostgreSQL for delivery records and driver profiles paired with Redis for sub-second location coordinate caching.</td>
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
            <td>Runs backend API and real-time socket listeners</td>
            <td><strong>$5.00 - $10.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Custom Domain & SSL Protection</strong></td>
            <td>Brand domain name (.com or .ng) with managed SSL</td>
            <td><strong>~$10.00 - $20.00 / year</strong></td>
          </tr>
          <tr>
            <td><strong>Mapping & Routing APIs</strong></td>
            <td>OpenStreetMap / Leaflet tile infrastructure</td>
            <td><strong>$0.00 (Free baseline tier)</strong></td>
          </tr>
          <tr>
            <td><strong>Google Play Developer Account</strong></td>
            <td>One-time Android publishing fee to Google</td>
            <td><strong>$25.00 (One-off fee)</strong></td>
          </tr>
          <tr>
            <td><strong>Apple Developer Program Account</strong></td>
            <td>Annual membership required to publish directly to iOS App Store</td>
            <td><strong>$99.00 / year (Paid to Apple)</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 5: Commercial Investment -->
    <div class="section">
      <div class="section-title">5. Commercial Investment & Payment Schedule</div>
      <div class="callout">
        <strong>Total Development Investment:</strong> <strong>₦750,000 (Seven Hundred and Fifty Thousand Naira)</strong> | Timeline: <strong>3 to 4 Weeks</strong>
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
            <td>React Native setup, database schema, map server bridge, and UI/UX interface design.</td>
            <td class="highlight-cell">50% (₦375,000)</td>
          </tr>
          <tr>
            <td><strong>2. Functional Staging Milestone</strong></td>
            <td>Driver app background GPS tracker, live dispatch map, and order creation flow on staging.</td>
            <td class="highlight-cell">30% (₦225,000)</td>
          </tr>
          <tr>
            <td><strong>3. Production Handover</strong></td>
            <td>Production app builds (Android & iOS), live web dashboard deployment, domain setup, and administrative onboarding.</td>
            <td class="highlight-cell">20% (₦150,000)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 6: Warranty -->
    <div class="section">
      <div class="section-title">6. Post-Launch Warranty & Support</div>
      <p>
        Sales Cowboy provides <strong>30 days of complimentary technical warranty support</strong> covering bug resolution, socket connection optimization, and operational training.
      </p>
    </div>
        """
    },

    # 3. Digital Media, Culture & Sports Engagement Platform
    {
        "num": 3,
        "ref": "SC-PROP-2026-MEDIA",
        "title": "Digital Media, Culture & Sports Engagement Platform",
        "subtitle": "Cross-Platform Mobile Application (Android & iOS via React Native) + Administrative Operations Console (Next.js)",
        "pdf_name": "Digital-Media-Culture-Sports-Platform-Proposal.pdf",
        "html_file": "3-media-culture-sports-proposal.html",
        "client_for": "Media & Sports Entertainment Client",
        "client_role": "Executive Project Director",
        "content_page1": """
    <!-- Section 1: Project Objective -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Overview</div>
      <p>
        Culture, music, and sports represent high-engagement digital verticals that require clean user experience, real-time media/content delivery, and low-latency interaction.
      </p>
      <p>
        Because proprietary platforms in this space range from curated cultural media feeds to talent marketplaces, ticketed live events, and fan engagement hubs, this proposal establishes our modular architecture options, recommended tech stack, and tiered investment frameworks to define your exact project scope.
      </p>
    </div>

    <!-- Section 2: Modular Architecture Options -->
    <div class="section">
      <div class="section-title">2. Modular Architecture Options</div>
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Track A: Media, Content & Community</div>
          <ul>
            <li><strong>Digital Media Engine:</strong> High-performance streaming for audio tracks, video highlights, and cultural podcasts.</li>
            <li><strong>Creator Profiles:</strong> Dedicated portals for artists and curators to manage media submissions.</li>
            <li><strong>Community Interaction:</strong> In-app likes, comments, social sharing, and community engagement feeds.</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-title">Track B: Events, Venues & Fan Engagement</div>
          <ul>
            <li><strong>Event Calendars:</strong> Interactive schedules for cultural showcases, tours, and sports tournaments.</li>
            <li><strong>Digital Ticketing:</strong> In-app ticket booking, dynamic QR code generation for gate entry, and receipts.</li>
            <li><strong>Fan Voting & Polling:</strong> Interactive fan polls, award voting, and match prediction contests.</li>
          </ul>
        </div>
      </div>
      <div class="grid-2" style="margin-top: 6px;">
        <div class="card">
          <div class="card-title">Track C: Marketplace & Monetization</div>
          <ul>
            <li><strong>Talent Profiles:</strong> Verified athlete/artist rosters, statistics, portfolios, and scouting inquiry channels.</li>
            <li><strong>Merchandise Storefront:</strong> Built-in ecommerce for kits, cultural merchandise, and creator products.</li>
            <li><strong>Integrated Payments:</strong> Multi-channel payment checkout (Paystack, cards, bank transfers).</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-title">Track D: Master Admin & Analytics</div>
          <ul>
            <li><strong>Content Publishing Desk:</strong> Review, schedule, and approve user-generated and proprietary content.</li>
            <li><strong>User & Role Permissions:</strong> Manage fan tiers, verified creator badges, and staff accounts.</li>
            <li><strong>Revenue & Traffic Analytics:</strong> Real-time tracking of active users (DAU), engagement, and gross revenue.</li>
          </ul>
        </div>
      </div>
    </div>
        """,
        "content_page2": """
    <!-- Section 3: Technical Stack -->
    <div class="section">
      <div class="section-title">3. Recommended Technical Stack</div>
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
            <td><strong>Cross-Platform Mobile Apps</strong></td>
            <td>React Native (Expo) - Android & iOS</td>
            <td>Single performant codebase deployed natively to both Android (.apk/.aab) and iOS (.ipa).</td>
          </tr>
          <tr>
            <td><strong>Web Admin Portal</strong></td>
            <td>Next.js 14, React, Tailwind CSS</td>
            <td>Modern responsive desktop portal for content moderation, ticketing control, and analytics.</td>
          </tr>
          <tr>
            <td><strong>Backend API & Media Storage</strong></td>
            <td>Node.js (NestJS) + PostgreSQL + Cloudflare R2</td>
            <td>Scalable microservice API with PostgreSQL for transactional data and Cloudflare R2 for zero-egress media storage.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 4: Operational Costs -->
    <div class="section">
      <div class="section-title">4. Estimated Third-Party Operational Costs</div>
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
            <td>Runs backend API and database</td>
            <td><strong>$5.00 - $15.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Media Storage (Cloudflare R2)</strong></td>
            <td>High-performance audio/video CDN delivery</td>
            <td><strong>Free tier / ~$5.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Custom Domain & SSL</strong></td>
            <td>Brand domain name (.com or .ng)</td>
            <td><strong>~$10.00 - $20.00 / year</strong></td>
          </tr>
          <tr>
            <td><strong>Payment Gateway (Paystack)</strong></td>
            <td>Ticketing and subscription fee processing</td>
            <td><strong>1.5% capped local processing fee</strong></td>
          </tr>
          <tr>
            <td><strong>Google Play & Apple Accounts</strong></td>
            <td>Store publishing fees (Google one-off, Apple annual)</td>
            <td><strong>$25 one-time + $99 / year</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 5: Budget Tiers & Milestones -->
    <div class="section">
      <div class="section-title">5. Estimated Budget Tiers & Engagement Scopes</div>
      <table>
        <thead>
          <tr>
            <th style="width: 30%;">Development Tier</th>
            <th style="width: 42%;">Typical Scope & Functionality</th>
            <th style="width: 15%;">Investment</th>
            <th style="width: 13%;">Timeline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Tier 1: Foundational Community</strong></td>
            <td>Curated media feed, audio preview, user profiles, voting/polls, and web admin.</td>
            <td class="highlight-cell">₦850k - ₦1.2M</td>
            <td>4 - 5 Weeks</td>
          </tr>
          <tr>
            <td><strong>Tier 2: Interactive Commercial</strong></td>
            <td>Full media streaming, event ticketing with QR codes, wallet credits, and subscriptions.</td>
            <td class="highlight-cell">₦1.5M - ₦2.2M</td>
            <td>6 - 8 Weeks</td>
          </tr>
          <tr>
            <td><strong>Tier 3: Enterprise Fan Ecosystem</strong></td>
            <td>Live match/score data, video streaming engine, multi-tier marketplace, and custom analytics.</td>
            <td class="highlight-cell">₦3.0M+</td>
            <td>8 - 12 Weeks</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size: 9.5px; color: var(--text-muted); margin-top: 4px;">
        *Standard Milestone Structure: 50% Mobilization Deposit | 30% Functional Staging Milestone | 20% Production Handover & Store Release.
      </p>
    </div>

    <!-- Section 6: Warranty -->
    <div class="section">
      <div class="section-title">6. Post-Launch Warranty & Support</div>
      <p>
        Sales Cowboy provides <strong>30 to 60 days of complimentary technical warranty support</strong> covering bug resolution, CDN caching optimization, and administrative onboarding.
      </p>
    </div>
        """
    },

    # 4. Integrated Church Management Suite & Member Engagement Platform
    {
        "num": 4,
        "ref": "SC-PROP-2026-CHURCH",
        "title": "Integrated Church Management Suite & Member Engagement Platform",
        "subtitle": "Cross-Platform Mobile App (Android & iOS via React Native / Expo) + Administrative Web Console with AI Sermon Assistant (Next.js)",
        "pdf_name": "Church-Management-AI-Engagement-Platform-Proposal.pdf",
        "html_file": "4-church-management-proposal.html",
        "client_for": "Church Leadership & Ministry Board",
        "client_role": "Authorized Executive Representative",
        "content_page1": """
    <!-- Section 1: Project Objective -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Overview</div>
      <p>
        The goal is to design, develop, and deploy a church digital ecosystem combining administrative efficiency with deep congregational engagement.
      </p>
      <p>
        The platform delivers a dedicated mobile app for church members (community feeds, live streaming, AI Bible assistant, and announcements) and a centralized administrative web console for ministry leadership, featuring an automated <strong>AI Sermon Assistant</strong> designed to help the Lead Pastor research scriptures, structure message outlines, and archive sermon notes effortlessly.
      </p>
    </div>

    <!-- Section 2: Functional System Specifications -->
    <div class="section">
      <div class="section-title">2. Functional System Scope</div>
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Module 1: Pastor & Leadership Console</div>
          <ul>
            <li><strong>AI Sermon Preparation Assistant:</strong> Topic and scripture research assistant powered by targeted OpenAI integration. Suggests cross-references, historical context, and outlines.</li>
            <li><strong>Integrated Sermon Archive:</strong> Save, edit, tag, and export sermon notes for pulpit delivery.</li>
            <li><strong>Membership Directory & Analytics:</strong> Centralized database with contact info, baptism status, home cells, and joining dates.</li>
            <li><strong>Birthday Detection Algorithm:</strong> Generates daily celebrant rosters for leadership pastoral follow-up.</li>
            <li><strong>Broadcast & Live Service Manager:</strong> Schedule targeted event announcements and link YouTube / Facebook Live video streams directly.</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-title">Module 2: Member Mobile Application</div>
          <ul>
            <li><strong>Member Onboarding & Digital ID:</strong> Phone/email sign-up, profile photo, and personal details (birthday, department, cell group).</li>
            <li><strong>AI Bible & Devotional Hub:</strong> Scripture reader (KJV and modern translations) paired with in-app AI Bible Study Assistant for topical queries.</li>
            <li><strong>Live Stream & Sermon Media Vault:</strong> Integrated video player for live services without external ad interruptions, plus sermon audio/video archive.</li>
            <li><strong>Community & Fellowship Feed:</strong> Interactive church wall for testimonies, prayer requests, and birthday celebrant well-wishes.</li>
            <li><strong>Push Notifications:</strong> Instant alerts for service start reminders, flyers, and leadership pastoral broadcasts.</li>
          </ul>
        </div>
      </div>
    </div>
        """,
        "content_page2": """
    <!-- Section 3: Technical Architecture -->
    <div class="section">
      <div class="section-title">3. Technical Architecture & Infrastructure</div>
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
            <td><strong>Member Mobile App</strong></td>
            <td>React Native (Expo) - Android & iOS</td>
            <td>Native Android (.apk/.aab) and iOS (.ipa) builds providing smooth video streaming and offline Bible caching.</td>
          </tr>
          <tr>
            <td><strong>Leadership Web Console</strong></td>
            <td>Next.js 15 (React), Tailwind CSS</td>
            <td>Desktop and tablet management portal for pastoral research, announcements, and member directories.</td>
          </tr>
          <tr>
            <td><strong>Backend API & AI Gateway</strong></td>
            <td>Node.js (NestJS) + OpenAI API</td>
            <td>Secure backend interfacing with OpenAI API endpoints for the Sermon Assistant and Member AI Bible queries.</td>
          </tr>
          <tr>
            <td><strong>Database & Storage</strong></td>
            <td>PostgreSQL + Cloud Storage (Railway)</td>
            <td>Structured records for members, announcements, and sermon media vaults.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 4: Operational Costs -->
    <div class="section">
      <div class="section-title">4. Estimated Third-Party Operational Costs</div>
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
            <td>Runs backend API, database, and background tasks</td>
            <td><strong>$10.00 - $20.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Media & File Storage</strong></td>
            <td>Stores sermon notes, flyers, and profile avatars</td>
            <td><strong>Included in cloud tier / ~$5.00 / mo</strong></td>
          </tr>
          <tr>
            <td><strong>AI API Usage (OpenAI API)</strong></td>
            <td>Powers Sermon Assistant & AI Bible queries</td>
            <td><strong>Pay-as-you-go (~$5.00 - $15.00 / mo)</strong></td>
          </tr>
          <tr>
            <td><strong>Push Notifications (FCM)</strong></td>
            <td>In-app announcements and birthday alerts</td>
            <td><strong>$0.00 (Free unlimited tier)</strong></td>
          </tr>
          <tr>
            <td><strong>Custom Domain & SSL</strong></td>
            <td>Church domain (.org or .ng) with Cloudflare CDN</td>
            <td><strong>~$15.00 - $25.00 / year</strong></td>
          </tr>
          <tr>
            <td><strong>Google Play & Apple Accounts</strong></td>
            <td>Store publishing fees (Google one-off, Apple annual)</td>
            <td><strong>$25 one-time + $99 / year</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 5: Commercial Investment -->
    <div class="section">
      <div class="section-title">5. Commercial Investment & Payment Schedule</div>
      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Milestone Stage</th>
            <th style="width: 45%;">Scope Deliverables</th>
            <th style="width: 15%;">Baseline</th>
            <th style="width: 15%;">Full Scope</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Mobilization Deposit (50%)</strong></td>
            <td>React Native setup, database schema design, and complete UI/UX interface layouts.</td>
            <td class="highlight-cell">₦375,000</td>
            <td class="highlight-cell">₦425,000</td>
          </tr>
          <tr>
            <td><strong>2. Functional Staging (30%)</strong></td>
            <td>Member registration, AI Bible, Sermon Assistant, live stream video player, and admin dashboard.</td>
            <td class="highlight-cell">₦225,000</td>
            <td class="highlight-cell">₦255,000</td>
          </tr>
          <tr>
            <td><strong>3. Production Handover (20%)</strong></td>
            <td>Android and iOS production builds, live web portal deployment, push testing, and handover.</td>
            <td class="highlight-cell">₦150,000</td>
            <td class="highlight-cell">₦170,000</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Total Development Investment (4 to 5 Weeks)</strong></td>
            <td class="highlight-cell"><strong>₦750,000</strong></td>
            <td class="highlight-cell"><strong>₦850,000</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 6: Warranty -->
    <div class="section">
      <div class="section-title">6. Post-Launch Warranty & Support</div>
      <p>
        Sales Cowboy provides <strong>30 days of complimentary technical warranty support</strong> covering bug resolution, live stream feed optimization, and administrative onboarding for church leaders.
      </p>
    </div>
        """
    },

    # 5. On-Demand Out-of-Home & Digital Signage AdTech Marketplace
    {
        "num": 5,
        "ref": "SC-PROP-2026-ADTECH",
        "title": "On-Demand Out-of-Home (OOH) & Digital Signage AdTech Marketplace",
        "subtitle": "Advertiser Portal + Outpost Host Portal + Transit Syndicate Desk + Master Operations Console (Web & Mobile PWA)",
        "pdf_name": "OOH-Digital-Signage-AdTech-Marketplace-Proposal.pdf",
        "html_file": "5-ooh-adtech-marketplace-proposal.html",
        "client_for": "AdTech Marketplace Enterprise",
        "client_role": "Authorized Executive Representative",
        "content_page1": """
    <!-- Section 1: Project Objective -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Overview</div>
      <p>
        The platform is an on-demand ad space marketplace bridging two primary market participants:
      </p>
      <p style="margin-left: 8px;">
        <strong>1. Advertisers & Vendors:</strong> Businesses seeking to place promotional campaigns across physical locations (hotel lobbies, shopping malls, corporate offices, restaurants) and mobile transit corridors (commercial vehicles, taxis, buses).<br>
        <strong>2. Outpost Hosts:</strong> Property managers, business owners, and commercial vehicle operators looking to monetize their existing TV screens, LED boards, and vehicle exterior surfaces.
      </p>
      <p>
        The system provides an automated booking engine, built-in AI creative design tools, and a multi-stage proof-of-placement verification workflow to protect campaign investments.
      </p>
    </div>

    <!-- Section 2: Functional System Specifications -->
    <div class="section">
      <div class="section-title">2. Functional System Scope</div>
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Module 1: Advertiser / Vendor Portal</div>
          <ul>
            <li><strong>Outpost Marketplace:</strong> Search and filter ad spaces by city, corridor, venue type (Hotels, Malls, Banks, Gyms), and vehicle routes.</li>
            <li><strong>AI Creative Studio:</strong> Input offer details and themes to automatically generate professional display flyers, or upload custom video clips.</li>
            <li><strong>Campaign Escrow Checkout:</strong> Duration selection (e.g. 7, 30 days) with funds held in platform escrow until placement is verified.</li>
            <li><strong>Proof-of-Placement Feed:</strong> Real-time dashboard showing photo/video proof submitted by outpost owners.</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-title">Module 2: Outpost Host Portal</div>
          <ul>
            <li><strong>Space Listing:</strong> Register screen displays (Smart TV, LED billboard) or vehicle assets (saloon cars, minibuses, commercial taxis).</li>
            <li><strong>Campaign Acceptance:</strong> Receive booking alerts with approved media files and download for Smart TV playback.</li>
            <li><strong>Proof-of-Play Submission:</strong> Mandatory upload of photo/video evidence showing the ad active to release escrow payouts.</li>
            <li><strong>Earnings Wallet:</strong> Track campaign earnings with automated withdrawals to local bank accounts.</li>
          </ul>
        </div>
      </div>
      <div class="grid-2" style="margin-top: 6px;">
        <div class="card">
          <div class="card-title">Module 3: Transit Wrap Syndicate</div>
          <ul>
            <li><strong>Branding Dispatch:</strong> Automated dispatch desk for professional vinyl installation agents to coordinate vehicle drop-off and material application.</li>
            <li><strong>Installation Sign-Off:</strong> Field technician and driver dual sign-off with multi-angle vehicle inspection photos.</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-title">Module 4: Master Admin Operations</div>
          <ul>
            <li><strong>Listing Verification:</strong> Review and approve new venues, screens, and vehicles before public listing.</li>
            <li><strong>Ad Content Moderation:</strong> Review queue to filter out prohibited materials before media reaches host screens.</li>
            <li><strong>Commission Settlement:</strong> Configure platform commission splits (e.g., 15% to 25%), manage payout batches, and handle dispute resolutions.</li>
          </ul>
        </div>
      </div>
    </div>
        """,
        "content_page2": """
    <!-- Section 3: Technical Architecture -->
    <div class="section">
      <div class="section-title">3. Technical Architecture & Stack</div>
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
            <td><strong>Client & Host Portal</strong></td>
            <td>Next.js 15 (React), Tailwind CSS</td>
            <td>Responsive Progressive Web App (PWA) installable on mobile devices and desktop computers.</td>
          </tr>
          <tr>
            <td><strong>Backend Workflows</strong></td>
            <td>Node.js (NestJS) on Railway</td>
            <td>Booking state machines, proof verification queues, and role-based operational permissions.</td>
          </tr>
          <tr>
            <td><strong>Database & Storage</strong></td>
            <td>PostgreSQL + Cloudflare R2</td>
            <td>PostgreSQL for transactional ledgers combined with Cloudflare R2 for zero-egress video and high-resolution ad storage.</td>
          </tr>
          <tr>
            <td><strong>AI Image Generation</strong></td>
            <td>OpenAI Image API Engine</td>
            <td>Automated generation of professional advertising flyers from text prompts and business profiles.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 4: Operational Costs -->
    <div class="section">
      <div class="section-title">4. Estimated Third-Party Operational Costs</div>
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
            <td>Runs marketplace API, database, and tasks</td>
            <td><strong>$10.00 - $20.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Media Storage (Cloudflare R2)</strong></td>
            <td>High-resolution image/video ad storage</td>
            <td><strong>Free tier / ~$5.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>AI Creative API (OpenAI)</strong></td>
            <td>Powers the in-app AI flyer/copy generator</td>
            <td><strong>Pay-as-you-go (~$10.00 - $25.00 / mo)</strong></td>
          </tr>
          <tr>
            <td><strong>SMS OTP & Alerts (Termii)</strong></td>
            <td>User verification and campaign alerts</td>
            <td><strong>Pay-as-you-go (~₦5.00 per SMS)</strong></td>
          </tr>
          <tr>
            <td><strong>Custom Domain & SSL</strong></td>
            <td>Brand domain name (.com or .ng) with CDN</td>
            <td><strong>~$15.00 - $25.00 / year</strong></td>
          </tr>
          <tr>
            <td><strong>Payment Gateway (Paystack)</strong></td>
            <td>Escrow payment collection</td>
            <td><strong>1.5% capped local processing fee</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 5: Commercial Investment -->
    <div class="section">
      <div class="section-title">5. Commercial Investment & Payment Schedule</div>
      <div class="callout">
        <strong>Total Development Investment:</strong> <strong>₦1,250,000 (One Million Two Hundred and Fifty Thousand Naira)</strong> | Timeline: <strong>5 Weeks</strong>
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
            <td>System architecture, database schema, marketplace UX/UI layouts, and AI generator integration setup.</td>
            <td class="highlight-cell">40% (₦500,000)</td>
          </tr>
          <tr>
            <td><strong>2. Functional Staging Milestone</strong></td>
            <td>Marketplace search, outpost onboarding, AI flyer generation, booking checkout, and proof-of-placement workflows.</td>
            <td class="highlight-cell">40% (₦500,000)</td>
          </tr>
          <tr>
            <td><strong>3. Production Handover</strong></td>
            <td>Live deployment, payment gateway verification, administrative onboarding, and delivery of documentation.</td>
            <td class="highlight-cell">20% (₦250,000)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 6: Warranty -->
    <div class="section">
      <div class="section-title">6. Post-Launch Warranty & Support</div>
      <p>
        Sales Cowboy provides <strong>30 days of complimentary technical warranty support</strong> covering bug resolution, escrow workflow adjustments, and administrative staff onboarding.
      </p>
    </div>
        """
    }
]

for p in proposals_data:
    html_markup = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{p['title']} - Sales Cowboy</title>
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
      <span>{p['title']}</span>
    </div>
    <div class="toolbar-actions">
      <button class="btn btn-primary" onclick="window.print()">Print / Save PDF</button>
      <a href="/{p['pdf_name']}" class="btn" download>Download PDF</a>
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
        <div><strong>Ref:</strong> {p['ref']}</div>
        <div><strong>Date:</strong> November 10, 2026</div>
        <div><strong>Validity:</strong> 30 Days</div>
      </div>
    </div>

    <div class="doc-title-block">
      <div class="doc-pre">Product Architecture & Commercial Proposal</div>
      <div class="doc-title">{p['title']}</div>
      <div class="doc-subtitle">{p['subtitle']}</div>
    </div>

    {p['content_page1']}

    <!-- PAGE 2 -->
    <div class="page-break"></div>

    {p['content_page2']}

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
          <div style="font-size: 9.5px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 18px;">For: {p['client_for']}</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 5px;"></div>
          <div style="font-size: 10px; font-weight: 700; color: var(--primary);">{p['client_role']}</div>
          <div style="font-size: 9px; color: var(--text-muted);">{p['client_for']}</div>
        </div>
      </div>
    </div>

  </div>

</body>
</html>
"""
    html_out = os.path.join(base_dir, p["html_file"])
    with open(html_out, "w", encoding="utf-8") as f:
        f.write(html_markup)
    print(f"[OK] Written HTML: {html_out}")

    # Compile PDF
    pdf_out = os.path.join(base_dir, p["pdf_name"])
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
    shutil.copy2(pdf_out, os.path.join(public_dir, p["pdf_name"]))
    if os.path.exists(out_dir):
        shutil.copy2(pdf_out, os.path.join(out_dir, p["pdf_name"]))
    print(f"[OK] Copied {p['pdf_name']} to public and out")

    # Verify pages
    doc = fitz.open(pdf_out)
    print(f"[VERIFY] {p['pdf_name']}: {len(doc)} pages, {len(doc[0].get_images())} logo images on page 1")
    for idx, pg in enumerate(doc):
        print(f"  Page {idx+1}: {len(pg.get_text())} characters")

print("[ALL COMPLETED SUCCESSFULLY]")

