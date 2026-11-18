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

HTML_FILENAME = "andpoc-2-unified-academic-bursary-erp-slide-deck.html"
PDF_FILENAME = "ANDPOC-Unified-Academic-Bursary-ERP-Proposal.pdf"

html_out_path = os.path.join(ANDPOC_DIR, HTML_FILENAME)
pdf_out_path = os.path.join(ANDPOC_DIR, PDF_FILENAME)
public_pdf_path = os.path.join(WORKSPACE_DIR, "public", PDF_FILENAME)
out_pdf_path = os.path.join(WORKSPACE_DIR, "out", PDF_FILENAME)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ANDPOC Unified Academic &amp; Bursary Mobile ERP - Sales Cowboy Marketing Solutions</title>
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
    <div class="toolbar-title">ANDPOC Unified Academic &amp; Bursary Mobile ERP (Proposal 2 Deck - 11 Slides)</div>
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
      <div class="cover-tag">Proposal 2 of 3 &bull; Comprehensive ERP</div>
    </div>
    <div class="cover-center">
      <div class="cover-category">Multi-Institutional Academic &amp; Bursary ERP</div>
      <h1 class="cover-title">ANDPOC Unified Academic &amp; Bursary Mobile ERP</h1>
      <p class="cover-subtitle">Complete Institutional Mobile App + Dual Result Engines (K-12 Terminal Report Cards &amp; University Credit-Unit CGPA), Dedicated Virtual Accounts, and Multi-Role Staff Portals.</p>
    </div>
    <div class="cover-footer">
      <div>
        <div class="cover-meta-label">Target Entities</div>
        <div class="cover-meta-val">Royal Schools &amp; Universal Study Center</div>
      </div>
      <div>
        <div class="cover-meta-label">Turnkey Investment</div>
        <div class="cover-meta-val">&#8358;1,350,000 NGN</div>
      </div>
      <div>
        <div class="cover-meta-label">Delivery Timeline</div>
        <div class="cover-meta-val">5 - 6 Weeks</div>
      </div>
      <div>
        <div class="cover-meta-label">Prepared By</div>
        <div class="cover-meta-val">Sales Cowboy Marketing Solutions</div>
      </div>
    </div>
  </div>

  <!-- SLIDE 2: OBJECTIVE & SCOPE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">01 | Project Objective</div>
        <div class="slide-title">Mission &amp; Dual-Institutional Governance</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Dual-Architecture Challenge</div>
          <p class="card-desc">Educational institutions operating both K-12 and tertiary programs face incompatible grading and bursary structures:</p>
          <ul class="bullet-list">
            <li><strong>K-12 Termly Systems:</strong> Termly continuous assessments, exams, positions, and psychomotor behavioral remarks.</li>
            <li><strong>University Semester Systems:</strong> Semester course registration, credit-unit weights, and 5-point CGPA standards.</li>
            <li>Proposal 2 bridges both structures inside a single unified multi-role database.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Includes 100% of Proposal 1</div>
          <p class="card-desc">Proposal 2 contains the entire foundational tier and builds directly on top of it:</p>
          <ul class="bullet-list">
            <li>Dual-Wing Mobile App Hub (Royal Schools &amp; Universal Study Center).</li>
            <li>Digital Admission Intake &amp; Credential Uploads.</li>
            <li>Instant Paystack / Moniepoint checkout &amp; unlimited push alerts.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 2 of 11</div>
    </div>
  </div>

  <!-- SLIDE 3: CUMULATIVE FOUNDATION HIGHLIGHT -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">02 | Cumulative Inheritance</div>
        <div class="slide-title">Complete Proposal 1 Base Foundation (Included)</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="highlight-banner" style="margin-top:0; margin-bottom:16px;">
        <div><strong>Proposal 1 Features Included:</strong> Proposal 2 includes all admissions, digital brochures, curriculum directories, payment checkouts, and mobile push notification broadcasts.</div>
        <div class="badge-accent">Fully Included</div>
      </div>
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">Dual-Wing Mobile App</div>
          <p class="card-desc">Published Android and iOS apps showcasing faculties, programs, study centers, and academic calendars.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Digital Admissions Flow</div>
          <p class="card-desc">End-to-end mobile admissions intake, passport attachments, and digital letter generation.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Tuition &amp; Push Hub</div>
          <p class="card-desc">Instant online payment gateway with instant digital receipts and zero-cost broadcast push notifications.</p>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 3 of 11</div>
    </div>
  </div>

  <!-- SLIDE 4: DUAL RESULT ENGINE - K-12 REPORT CARDS -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">03 | Academic Engine</div>
        <div class="slide-title">Module 2A: K-12 Terminal Report Card System</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">Score Configuration</div>
          <ul class="bullet-list">
            <li>Continuous Assessment (CA 30% / 40%).</li>
            <li>Terminal exam score entry (60% / 70%).</li>
            <li>Automated total, class averages &amp; ranks.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Developmental Ratings</div>
          <ul class="bullet-list">
            <li>Psychomotor skill evaluation (1 to 5 scale).</li>
            <li>Affective behavior and punctuality.</li>
            <li>Class teacher &amp; principal remark fields.</li>
          </ul>
        </div>
        <div class="card card-accent">
          <div class="card-title">Digital Delivery</div>
          <ul class="bullet-list">
            <li>Automated, watermarked report card PDFs.</li>
            <li>Viewable &amp; downloadable in mobile app.</li>
            <li>Access gated by bursary fee clearance.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 4 of 11</div>
    </div>
  </div>

  <!-- SLIDE 5: DUAL RESULT ENGINE - UNIVERSITY CGPA -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">04 | Academic Engine</div>
        <div class="slide-title">Module 2B: Tertiary Credit-Unit &amp; CGPA Engine</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">Course Registration</div>
          <ul class="bullet-list">
            <li>Faculty, Department &amp; Level hierarchy.</li>
            <li>Semester course registration portal.</li>
            <li>Credit-unit allocations per course.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">CGPA Computational Logic</div>
          <ul class="bullet-list">
            <li>Nigerian university 5-point GPA scale.</li>
            <li>Automated Grade Point calculation.</li>
            <li>Cumulative CGPA progression tracking.</li>
          </ul>
        </div>
        <div class="card card-accent">
          <div class="card-title">Digital Transcripts</div>
          <ul class="bullet-list">
            <li>Unofficial semester result slips.</li>
            <li>Complete digital academic transcripts.</li>
            <li>Direct verification code for employers.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 5 of 11</div>
    </div>
  </div>

  <!-- SLIDE 6: BURSARY AUTOMATION & VIRTUAL ACCOUNTS -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">05 | Bursary Automation</div>
        <div class="slide-title">Module 3: Dedicated Virtual Account Reconciliation</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Automated Virtual Accounts</div>
          <p class="card-desc">Every student receives a unique dedicated virtual bank account number tied to their student ID:</p>
          <ul class="bullet-list">
            <li>Parents transfer fees directly from any Nigerian banking app.</li>
            <li>Invoices reconcile instantly within seconds via webhook notification.</li>
            <li>Eliminates fake bank alerts and physical teller submission lines.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Debtor &amp; Defaulter Management</div>
          <p class="card-desc">Executive bursary dashboard tracking cross-campus revenue:</p>
          <ul class="bullet-list">
            <li>Real-time breakdown of paid, installment, and overdue accounts.</li>
            <li>Automated result card withholding for unpaid balances.</li>
            <li>Exportable daily, monthly, and session financial audit sheets.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 6 of 11</div>
    </div>
  </div>

  <!-- SLIDE 7: MULTI-ROLE STAFF & ADMIN CONSOLE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">06 | Administrative Hierarchy</div>
        <div class="slide-title">Module 4: Multi-Role Web Admin &amp; Staff Console</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card card-navy">
          <div class="card-title">Super-Admin Console</div>
          <p class="card-desc">Cross-campus command desk for the Proprietor and Board: monitor live student enrollment, fee collections, academic performance, and branch operations.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Teacher / Lecturer Desk</div>
          <p class="card-desc">Secure web portal for subject teachers to mark daily attendance, input CA/Exam scores, upload term schemes, and submit report remarks.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Bursary Control Portal</div>
          <p class="card-desc">Dedicated ledger for school bursars to configure tuition, development levies, exam fees, and issue official stamped receipts.</p>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 7 of 11</div>
    </div>
  </div>

  <!-- SLIDE 8: TECHNICAL ARCHITECTURE & OPEX -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">07 | Technical Infrastructure</div>
        <div class="slide-title">Scalable Multi-Tenant Architecture &amp; Hosting</div>
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
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Role-based student and parent mobile access with downloadable PDF report viewers.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Web ERP Portals</div>
          <p class="card-desc"><strong>Next.js 15 &amp; Tailwind</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Super-Admin, Bursary, and Teacher workspaces with lightning-fast responsive layouts.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Backend API</div>
          <p class="card-desc"><strong>Node.js (NestJS)</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Multi-tenant database isolation, virtual account listeners, and secure PDF generators.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Database &amp; Files</div>
          <p class="card-desc"><strong>PostgreSQL &amp; R2</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Encrypted academic records on Railway with Cloudflare R2 watermarked PDF storage.</p>
        </div>
      </div>
      <div class="highlight-banner" style="margin-top:14px;">
        <div><strong>Hosting Infrastructure (Railway / Cloudflare):</strong> Estimated at ~$15 to $25 / month paid directly to providers. Google Play ($25 one-off) &amp; Apple Store ($99/year).</div>
        <div class="badge-accent">Cost Controlled</div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 8 of 11</div>
    </div>
  </div>

  <!-- SLIDE 9: COMMERCIAL INVESTMENT -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">08 | Commercial Framework</div>
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
          <div class="price-amount">&#8358;1,350,000</div>
          <div style="font-size: 14px; color: #CBD5E1;">Turnkey Engineering &bull; 5 to 6 Weeks Timeline</div>
          <div style="margin-top: 18px; text-align: left; background: rgba(255,255,255,0.06); padding: 14px 18px; border-radius: 8px;">
            <div style="font-size: 12.5px; color: #FCD34D; font-weight: 700; margin-bottom: 4px;">Inclusions in Proposal 2:</div>
            <div style="font-size: 12px; color: #E2E8F0; line-height: 1.45;">Everything in Proposal 1 + K-12 Termly Report Cards, University CGPA / Transcripts, Dedicated Virtual Accounts, Multi-Role Staff Portals, and 30-day warranty.</div>
          </div>
        </div>
        <div class="card card-accent" style="display:flex; flex-direction:column; justify-content:center;">
          <div class="card-title">Structured Milestone Schedule</div>
          <div style="margin-top: 8px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid var(--border);">
              <div>
                <div style="font-weight:700; color:var(--navy);">40% Mobilization Deposit</div>
                <div style="font-size:12px; color:var(--muted);">UI/UX designs, dual academic schema &amp; setup</div>
              </div>
              <div style="font-weight:800; font-size:16px; color:var(--navy);">&#8358;540,000</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid var(--border);">
              <div>
                <div style="font-weight:700; color:var(--navy);">40% Functional Staging Milestone</div>
                <div style="font-size:12px; color:var(--muted);">Working result computation, virtual accounts &amp; staff desk</div>
              </div>
              <div style="font-weight:800; font-size:16px; color:var(--navy);">&#8358;540,000</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:700; color:var(--navy);">20% Handover &amp; App Submission</div>
                <div style="font-size:12px; color:var(--muted);">Store submission (.apk/.ipa), live deploy &amp; staff onboarding</div>
              </div>
              <div style="font-weight:800; font-size:16px; color:var(--navy);">&#8358;270,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 9 of 11</div>
    </div>
  </div>

  <!-- SLIDE 10: EXECUTION ROADMAP -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">09 | Delivery Roadmap</div>
        <div class="slide-title">4-Phase Implementation Schedule (5-6 Weeks)</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-4">
        <div class="card card-accent">
          <div class="card-title">Phase 1: Setup</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Weeks 1 - 2</div>
          <p class="card-desc">UI/UX wireframes, dual academic database schema, and Proposal 1 admissions &amp; mobile app base.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Phase 2: Academic</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Weeks 3 - 4</div>
          <p class="card-desc">K-12 Continuous Assessment &amp; report card logic + University semester credit-unit CGPA computation.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Phase 3: Bursary</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 5</div>
          <p class="card-desc">Dedicated virtual bank accounts, Paystack automated reconciliation, and defaulter tracking ledgers.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Phase 4: Launch</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 6</div>
          <p class="card-desc">Teacher &amp; bursar training, Play Store &amp; App Store submission, data migration, and live rollout.</p>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 10 of 11</div>
    </div>
  </div>

  <!-- SLIDE 11: ACCEPTANCE & SIGN-OFF -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">10 | Acceptance</div>
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
          <p class="card-desc">We ensure complete staff confidence and operational stability:</p>
          <ul class="bullet-list">
            <li><strong>30-Day Critical Bug-Fix Warranty:</strong> Immediate remediation for any technical errors.</li>
            <li><strong>Comprehensive Staff Training:</strong> Dedicated hands-on training for teachers, bursars, and admin.</li>
            <li><strong>100% Intellectual Property Ownership:</strong> Full source code and database ownership transfer.</li>
          </ul>
        </div>
        <div class="card card-navy" style="display:flex; flex-direction:column; justify-content:center; text-align:center;">
          <div class="card-title" style="justify-content:center;">Ready to Initiate Proposal 2</div>
          <p class="card-desc" style="margin-bottom:14px;">Review and authorize this proposal agreement, and provide the mobilization deposit to begin sprint execution.</p>
          <div style="background:#F1F5F9; padding:12px; border-radius:6px; font-size:12.5px; color:var(--navy); font-weight:700;">
            Sales Cowboy Marketing Solutions &bull; hello@salescowboy.com.ng
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 11 of 11</div>
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
print("  Has 1,350,000:", "1,350,000" in all_text)
print("  Has em/en dash:", bool(re.search(r"[\u2013\u2014]", all_text)))
