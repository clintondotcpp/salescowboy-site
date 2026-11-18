import os
import sys
import subprocess
import shutil
import base64
import re
import fitz

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
WORKSPACE_DIR = r"c:\Users\nnamd\Desktop\salescowboy-site"
PROPOSALS_DIR = os.path.join(WORKSPACE_DIR, "temp-nov", "batch-proposals")
ANDPOC_DIR = os.path.join(PROPOSALS_DIR, "andpoc")
LOGO_PATH = os.path.join(WORKSPACE_DIR, "public", "assets", "salescowboy-logo.png")

with open(LOGO_PATH, "rb") as f:
    logo_base64 = base64.b64encode(f.read()).decode("utf-8")
logo_data_uri = f"data:image/png;base64,{logo_base64}"

HTML_FILENAME = "andpoc-1-institutional-mobile-app-slide-deck.html"
PDF_FILENAME = "ANDPOC-Institutional-Mobile-App-Proposal.pdf"

html_out_path = os.path.join(ANDPOC_DIR, HTML_FILENAME)
pdf_out_path = os.path.join(ANDPOC_DIR, PDF_FILENAME)
public_pdf_path = os.path.join(WORKSPACE_DIR, "public", PDF_FILENAME)
out_pdf_path = os.path.join(WORKSPACE_DIR, "out", PDF_FILENAME)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ANDPOC Institutional Mobile Application &amp; Web Admin Console - Sales Cowboy Marketing Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: 338.67mm 190.5mm;
      margin: 0;
    }}

    :root {{
      --navy: #0F172A;
      --navy-light: #1E293B;
      --accent: #D97706;
      --accent-dark: #B45309;
      --accent-light: #FEF3C7;
      --accent-bg: #FFFBEB;
      --pearl: #F8FAFC;
      --white: #FFFFFF;
      --slate: #1E293B;
      --muted: #64748B;
      --border: #E2E8F0;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #090D16;
      color: var(--slate);
      -webkit-font-smoothing: antialiased;
      padding: 24px 0;
    }}

    .toolbar {{
      width: 338.67mm;
      margin: 0 auto 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1E293B;
      padding: 12px 20px;
      border-radius: 8px;
      border: 1px solid #334155;
      color: #F8FAFC;
    }}

    .toolbar-title {{
      font-size: 14px;
      font-weight: 700;
    }}

    .toolbar-actions {{
      display: flex;
      gap: 10px;
    }}

    .btn {{
      background: #0F172A;
      color: #F8FAFC;
      border: 1px solid #475569;
      padding: 7px 15px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;
    }}

    .btn-accent {{
      background: var(--accent);
      border-color: var(--accent-dark);
      color: #FFFFFF;
    }}

    .slide {{
      width: 338.67mm;
      height: 190.5mm;
      margin: 0 auto 24px;
      background: var(--pearl);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
      page-break-after: always;
      break-after: page;
    }}

    .slide:last-of-type {{
      page-break-after: auto;
      break-after: auto;
    }}

    /* Cover Slide */
    .slide-cover {{
      background: linear-gradient(135deg, #090E1A 0%, #0F172A 60%, #1E293B 100%);
      color: #FFFFFF;
      padding: 18mm 22mm;
    }}

    .cover-top {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(217, 119, 6, 0.35);
      padding-bottom: 6mm;
    }}

    .cover-brand {{
      display: flex;
      align-items: center;
      gap: 14px;
    }}

    .cover-brand img {{
      height: 50px;
      background: #FFFFFF;
      padding: 5px 8px;
      border-radius: 6px;
    }}

    .cover-brand-name {{
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #FFFFFF;
      text-transform: uppercase;
    }}

    .cover-tag {{
      background: rgba(217, 119, 6, 0.15);
      border: 1px solid var(--accent);
      color: #FCD34D;
      padding: 5px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }}

    .cover-center {{
      margin-top: 10mm;
    }}

    .cover-category {{
      font-size: 13px;
      font-weight: 800;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }}

    .cover-title {{
      font-size: 38px;
      font-weight: 900;
      line-height: 1.15;
      color: #FFFFFF;
      margin-bottom: 14px;
      max-width: 900px;
    }}

    .cover-subtitle {{
      font-size: 18px;
      color: #CBD5E1;
      font-weight: 400;
      max-width: 820px;
      line-height: 1.45;
    }}

    .cover-footer {{
      border-top: 1px solid rgba(255,255,255,0.12);
      padding-top: 6mm;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }}

    .cover-meta-label {{
      font-size: 10.5px;
      text-transform: uppercase;
      color: #94A3B8;
      font-weight: 700;
      letter-spacing: 0.8px;
      margin-bottom: 3px;
    }}

    .cover-meta-val {{
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
    }}

    /* Standard Slide Header */
    .slide-header {{
      padding: 10mm 18mm 4mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid var(--border);
    }}

    .header-left {{
      display: flex;
      flex-direction: column;
    }}

    .slide-num {{
      font-size: 11px;
      font-weight: 800;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 3px;
    }}

    .slide-title {{
      font-size: 26px;
      font-weight: 800;
      color: var(--navy);
      letter-spacing: -0.5px;
    }}

    .header-right {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .header-right img {{
      height: 30px;
    }}

    /* Slide Body */
    .slide-body {{
      padding: 8mm 18mm 6mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }}

    /* Slide Footer */
    .slide-footer {{
      padding: 3mm 18mm 6mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border);
      font-size: 10.5px;
      color: var(--muted);
      font-weight: 500;
    }}

    /* Grids */
    .grid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 22px;
    }}

    .grid-3 {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }}

    .grid-4 {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
    }}

    .card {{
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px 22px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);
    }}

    .card-accent {{
      border-top: 4px solid var(--accent);
    }}

    .card-navy {{
      border-top: 4px solid var(--navy);
    }}

    .card-title {{
      font-size: 17px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .card-desc {{
      font-size: 13.5px;
      color: #334155;
      line-height: 1.55;
    }}

    .bullet-list {{
      list-style: none;
      margin-top: 8px;
    }}

    .bullet-list li {{
      position: relative;
      padding-left: 18px;
      font-size: 13.5px;
      color: #334155;
      line-height: 1.5;
      margin-bottom: 6px;
    }}

    .bullet-list li::before {{
      content: "\\2022";
      color: var(--accent);
      font-size: 20px;
      position: absolute;
      left: 0;
      top: -2px;
    }}

    /* Process Flow */
    .flow-row {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 8px;
    }}

    .flow-step {{
      flex: 1;
      background: var(--white);
      border: 1px solid var(--border);
      border-top: 4px solid var(--accent);
      border-radius: 8px;
      padding: 18px;
      text-align: center;
    }}

    .flow-step-num {{
      font-size: 11px;
      font-weight: 800;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }}

    .flow-step-title {{
      font-size: 15.5px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 6px;
    }}

    .flow-step-desc {{
      font-size: 12.5px;
      color: #475569;
      line-height: 1.4;
    }}

    .flow-arrow {{
      font-size: 22px;
      color: var(--accent);
      font-weight: 800;
    }}

    .scanty-table {{
      width: 100%;
      border-collapse: collapse;
      background: var(--white);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
    }}

    .scanty-table th {{
      background: #F1F5F9;
      color: var(--navy);
      font-size: 13px;
      font-weight: 700;
      padding: 13px 18px;
      text-align: left;
      border-bottom: 2px solid var(--border);
    }}

    .scanty-table td {{
      padding: 13px 18px;
      font-size: 13.5px;
      color: #334155;
      border-bottom: 1px solid var(--border);
    }}

    .scanty-table tr:last-child td {{
      border-bottom: none;
    }}

    .badge-accent {{
      display: inline-block;
      background: var(--accent-light);
      color: var(--accent-dark);
      font-weight: 700;
      font-size: 11.5px;
      padding: 3px 9px;
      border-radius: 4px;
    }}

    .highlight-banner {{
      background: var(--navy);
      color: #FFFFFF;
      padding: 16px 22px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
    }}

    .price-box {{
      background: var(--navy);
      color: #FFFFFF;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
    }}

    .price-amount {{
      font-size: 42px;
      font-weight: 900;
      color: #FCD34D;
      letter-spacing: -1px;
      margin: 8px 0;
    }}

    @media print {{
      body {{
        background-color: #FFFFFF;
        padding: 0;
      }}
      .toolbar {{
        display: none !important;
      }}
      .slide {{
        box-shadow: none;
        margin: 0;
        page-break-after: always;
        break-after: page;
      }}
    }}
  </style>
</head>
<body>

  <div class="toolbar">
    <div class="toolbar-title">ANDPOC Institutional Mobile App &amp; Web Admin Console (Proposal 1 Deck - 10 Slides)</div>
    <div class="toolbar-actions">
      <button onclick="window.print()" class="btn btn-accent">Print / Export PDF</button>
    </div>
  </div>

  <!-- SLIDE 1: COVER -->
  <div class="slide slide-cover">
    <div class="cover-top">
      <div class="cover-brand">
        <img src="{logo_data_uri}" alt="Sales Cowboy Logo">
        <div class="cover-brand-name">Sales Cowboy Marketing Solutions</div>
      </div>
      <div class="cover-tag">Proposal 1 of 3 &bull; Foundational Platform</div>
    </div>
    <div class="cover-center">
      <div class="cover-category">Institutional Mobile &amp; Admissions Technology</div>
      <h1 class="cover-title">ANDPOC Institutional Mobile Application &amp; Web Admin Console</h1>
      <p class="cover-subtitle">Official Mobile App for Android &amp; iOS uniting ANDPOC Royal Schools and ANDPOC Universal Study Center with Digital Admissions, Mobile Tuition Checkout, and Push Broadcasts.</p>
    </div>
    <div class="cover-footer">
      <div>
        <div class="cover-meta-label">Target Delivery</div>
        <div class="cover-meta-val">Android &amp; iOS App + Web Admin</div>
      </div>
      <div>
        <div class="cover-meta-label">Turnkey Investment</div>
        <div class="cover-meta-val">&#8358;700,000 NGN</div>
      </div>
      <div>
        <div class="cover-meta-label">Delivery Timeline</div>
        <div class="cover-meta-val">3 - 4 Weeks</div>
      </div>
      <div>
        <div class="cover-meta-label">Prepared By</div>
        <div class="cover-meta-val">Sales Cowboy Marketing Solutions</div>
      </div>
    </div>
  </div>

  <!-- SLIDE 2: OBJECTIVE & INSTITUTIONAL REACH -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">01 | Project Objective</div>
        <div class="slide-title">Mission &amp; Unified Ecosystem</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Dual-Wing Mobile Foundation</div>
          <p class="card-desc">To establish the official mobile flagship uniting both branches of ANDPOC educational institutions under a single brand presence on Google Play and Apple App Store:</p>
          <ul class="bullet-list">
            <li><strong>ANDPOC Royal Schools:</strong> Nursery, Primary, and Secondary school portal.</li>
            <li><strong>ANDPOC Universal Study Center:</strong> University distance learning and study center portal.</li>
            <li><strong>ANDPOC Standard Educational Programs:</strong> Full curriculum and prospectus visibility.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Core Institutional Value</div>
          <p class="card-desc">Eliminates paperwork bottlenecks across registration and communication:</p>
          <ul class="bullet-list">
            <li>Paperless admissions for prospective students and parents.</li>
            <li>Guaranteed tuition fee collection via direct debit card/bank transfer.</li>
            <li>Zero SMS costs: broadcast instant push notifications to all users.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 2 of 10</div>
    </div>
  </div>

  <!-- SLIDE 3: APPLICANT & PARENT JOURNEY -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">02 | User Flow Architecture</div>
        <div class="slide-title">End-to-End Mobile Experience</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="flow-row">
        <div class="flow-step">
          <div class="flow-step-num">Step 1</div>
          <div class="flow-step-title">Explore Hub</div>
          <div class="flow-step-desc">Parent or student selects Royal Schools or Universal Study Center to browse programs.</div>
        </div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-step">
          <div class="flow-step-num">Step 2</div>
          <div class="flow-step-title">Apply Online</div>
          <div class="flow-step-desc">Fills out digital admission form, captures photo, and uploads birth certificate/results.</div>
        </div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-step">
          <div class="flow-step-num">Step 3</div>
          <div class="flow-step-title">Instant Payment</div>
          <div class="flow-step-desc">Pays application or termly fees via Paystack/Moniepoint with digital receipt issued.</div>
        </div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-step">
          <div class="flow-step-num">Step 4</div>
          <div class="flow-step-title">Receive Alerts</div>
          <div class="flow-step-desc">Gets instant push notifications on admission approvals, exam schedules, and resumptions.</div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 3 of 10</div>
    </div>
  </div>

  <!-- SLIDE 4: MODULE 1 - MOBILE APP CAPABILITIES -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">03 | Mobile Platform</div>
        <div class="slide-title">Module 1: ANDPOC Mobile App (Android &amp; iOS)</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">Dual-Wing Hub</div>
          <ul class="bullet-list">
            <li>Dedicated portal switch for K-12 and University.</li>
            <li>Course &amp; curriculum catalog directories.</li>
            <li>Study center locations &amp; academic calendars.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Admission Engine</div>
          <ul class="bullet-list">
            <li>Step-by-step mobile student registration.</li>
            <li>Passport photo &amp; document attachment.</li>
            <li>Real-time application status tracker.</li>
          </ul>
        </div>
        <div class="card card-accent">
          <div class="card-title">Fee Checkout &amp; Push</div>
          <ul class="bullet-list">
            <li>Instant Paystack / Moniepoint checkout.</li>
            <li>Downloadable digital payment receipts.</li>
            <li>Direct broadcast push notification receiver.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 4 of 10</div>
    </div>
  </div>

  <!-- SLIDE 5: MODULE 2 - WEB ADMIN CONSOLE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">04 | Administration</div>
        <div class="slide-title">Module 2: Central Web Admin Console (Next.js)</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card card-navy">
          <div class="card-title">Admissions Desk</div>
          <p class="card-desc">Review submitted student applications across Royal Schools and University. Verify credentials, approve candidates, and generate official admission letters.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Curriculum Manager</div>
          <p class="card-desc">Dynamically manage faculties, subjects, fee schedules, class tiers, session term dates, and announcements without writing any code.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Payment &amp; Audit Ledger</div>
          <p class="card-desc">Live financial ledger capturing all application fee and tuition payments processed through Paystack with exportable accounting spreadsheets.</p>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 5 of 10</div>
    </div>
  </div>

  <!-- SLIDE 6: TECHNICAL ARCHITECTURE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">05 | Technical Architecture</div>
        <div class="slide-title">Engineered for Performance &amp; Low Maintenance</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-4">
        <div class="card card-accent">
          <div class="card-title">Mobile App</div>
          <p class="card-desc"><strong>React Native &amp; Expo</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Compiled for both Android (.apk/.aab) and iOS (.ipa) ensuring high speed and responsiveness.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Web Admin</div>
          <p class="card-desc"><strong>Next.js 15 &amp; Tailwind</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Modern React server components with desktop and tablet responsive administrative panels.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Backend API</div>
          <p class="card-desc"><strong>Node.js (NestJS)</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Secure REST API hosted on Railway with JWT authentication and instant webhook processors.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Database &amp; Files</div>
          <p class="card-desc"><strong>PostgreSQL &amp; R2</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">PostgreSQL relational database for records paired with Cloudflare R2 for passport storage.</p>
        </div>
      </div>
      <div class="highlight-banner" style="margin-top:14px;">
        <div><strong>Unlimited Free Push Alerts:</strong> Firebase Cloud Messaging provides unlimited instant mobile alerts to parents and students at zero cost.</div>
        <div class="badge-accent">Zero SMS Bills</div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 6 of 10</div>
    </div>
  </div>

  <!-- SLIDE 7: OPERATIONAL TRANSPARENCY -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">06 | Infrastructure</div>
        <div class="slide-title">Third-Party Hosting &amp; Operational Costs</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <table class="scanty-table">
        <thead>
          <tr>
            <th>Infrastructure / Service</th>
            <th>Operational Purpose</th>
            <th>Estimated Initial Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Cloud Server &amp; Database (Railway)</strong></td>
            <td>Hosts backend API, PostgreSQL database, and web admin</td>
            <td><strong>$10.00 - $18.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Media &amp; Document Storage (Cloudflare R2)</strong></td>
            <td>Stores student passport photos and admission certificates</td>
            <td><strong>Free tier / ~$5.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Push Notification Delivery (Firebase)</strong></td>
            <td>Instant institutional broadcast alerts to parent phones</td>
            <td><strong>$0.00 (Free unlimited tier)</strong></td>
          </tr>
          <tr>
            <td><strong>Payment Processing (Paystack / Moniepoint)</strong></td>
            <td>In-app admission and school fee collection</td>
            <td><strong>1.5% capped local processing fee</strong></td>
          </tr>
          <tr>
            <td><strong>Google Play &amp; Apple Developer Accounts</strong></td>
            <td>Official mobile app publishing under institutional name</td>
            <td><strong>$25 one-off (Google) / $99/yr (Apple)</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 7 of 10</div>
    </div>
  </div>

  <!-- SLIDE 8: COMMERCIAL INVESTMENT -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">07 | Commercials</div>
        <div class="slide-title">Turnkey Investment &amp; Milestone Schedule</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="price-box">
          <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #94A3B8; font-weight: 700;">Total Development Investment</div>
          <div class="price-amount">&#8358;700,000</div>
          <div style="font-size: 14px; color: #CBD5E1;">Turnkey Engineering &bull; 3 to 4 Weeks Timeline</div>
          <div style="margin-top: 18px; text-align: left; background: rgba(255,255,255,0.06); padding: 14px 18px; border-radius: 8px;">
            <div style="font-size: 12.5px; color: #FCD34D; font-weight: 700; margin-bottom: 4px;">Inclusions in Proposal 1:</div>
            <div style="font-size: 12px; color: #E2E8F0; line-height: 1.45;">Full Cross-Platform Mobile App (Android &amp; iOS), Next.js Web Admin Console, Paystack Integration, Unlimited Push Broadcasts, and 30-Day Post-Launch Warranty.</div>
          </div>
        </div>
        <div class="card card-accent" style="display:flex; flex-direction:column; justify-content:center;">
          <div class="card-title">Structured Milestone Schedule</div>
          <div style="margin-top: 8px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid var(--border);">
              <div>
                <div style="font-weight:700; color:var(--navy);">50% Mobilization Deposit</div>
                <div style="font-size:12px; color:var(--muted);">UI/UX screen flows, DB schema &amp; project kick-off</div>
              </div>
              <div style="font-weight:800; font-size:16px; color:var(--navy);">&#8358;350,000</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid var(--border);">
              <div>
                <div style="font-weight:700; color:var(--navy);">30% Functional Staging Milestone</div>
                <div style="font-size:12px; color:var(--muted);">Working admissions flow, Paystack checkout &amp; admin web</div>
              </div>
              <div style="font-weight:800; font-size:16px; color:var(--navy);">&#8358;210,000</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:700; color:var(--navy);">20% Handover &amp; App Submission</div>
                <div style="font-size:12px; color:var(--muted);">Store submission (.apk/.ipa), live deploy &amp; staff onboarding</div>
              </div>
              <div style="font-weight:800; font-size:16px; color:var(--navy);">&#8358;140,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 8 of 10</div>
    </div>
  </div>

  <!-- SLIDE 9: EXECUTION ROADMAP -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">08 | Delivery Roadmap</div>
        <div class="slide-title">4-Phase Implementation Schedule (3-4 Weeks)</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-4">
        <div class="card card-accent">
          <div class="card-title">Phase 1: Setup</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 1</div>
          <p class="card-desc">UI/UX brand design for dual-wing layout, institutional curriculum mapping, and Railway database setup.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Phase 2: Mobile Flow</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 2</div>
          <p class="card-desc">Digital admission application forms, photo upload logic, and Paystack/Moniepoint fee payment integration.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Phase 3: Web Admin</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 3</div>
          <p class="card-desc">Registry application review desk, curriculum management console, and broadcast push notification triggers.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Phase 4: Launch</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 4</div>
          <p class="card-desc">Full staging verification, Play Store &amp; App Store build generation, staff training, and go-live.</p>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 9 of 10</div>
    </div>
  </div>

  <!-- SLIDE 10: ACCEPTANCE & SIGN-OFF -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">09 | Acceptance</div>
        <div class="slide-title">Warranty, Training &amp; Next Steps</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Comprehensive Warranty &amp; Handover Package</div>
          <p class="card-desc">We back our delivery with complete operational support:</p>
          <ul class="bullet-list">
            <li><strong>30-Day Critical Bug-Fix Warranty:</strong> Immediate remediation for any technical errors.</li>
            <li><strong>Administrative Staff Training:</strong> Video and live walkthrough for registry and bursary staff.</li>
            <li><strong>100% Intellectual Property Ownership:</strong> Full source code and asset transfer.</li>
          </ul>
        </div>
        <div class="card card-navy" style="display:flex; flex-direction:column; justify-content:center; text-align:center;">
          <div class="card-title" style="justify-content:center;">Ready to Initiate Proposal 1</div>
          <p class="card-desc" style="margin-bottom:14px;">Review and authorize this proposal agreement, and provide the mobilization deposit to begin Week 1 sprint execution.</p>
          <div style="background:#F1F5F9; padding:12px; border-radius:6px; font-size:12.5px; color:var(--navy); font-weight:700;">
            Sales Cowboy Marketing Solutions &bull; hello@salescowboy.com.ng
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 10 of 10</div>
    </div>
  </div>

</body>
</html>
"""

with open(html_out_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"[OK] Written Slide HTML: {html_out_path}")

cmd = [
    CHROME_PATH,
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--print-to-pdf-no-header",
    f"--print-to-pdf={pdf_out_path}",
    html_out_path
]

res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode != 0:
    print(f"[ERROR] Chrome headless failed: {res.stderr}")
    sys.exit(1)

print(f"[OK] Compiled Landscape Slide PDF: {pdf_out_path}")

shutil.copy2(pdf_out_path, public_pdf_path)
shutil.copy2(pdf_out_path, out_pdf_path)
print(f"[OK] Copied {PDF_FILENAME} to public and out")

doc = fitz.open(pdf_out_path)
print(f"[VERIFY] {PDF_FILENAME}: {len(doc)} slides (pages)")
all_text = ""
for idx, page in enumerate(doc):
    text = page.get_text()
    all_text += text

print("  Has Trade Infrastructure:", "trade infrastructure" in all_text.lower())
print("  Has Sales Cowboy MS:", "sales cowboy" in all_text.lower())
print("  Has 700,000:", "700,000" in all_text)
print("  Has em/en dash:", bool(re.search(r"[\u2013\u2014]", all_text)))
