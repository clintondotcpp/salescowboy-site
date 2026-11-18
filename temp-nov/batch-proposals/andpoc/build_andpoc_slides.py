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

HTML_FILENAME = "andpoc-comprehensive-three-tier-proposal-deck.html"
PDF_FILENAME = "ANDPOC-Educational-Ecosystem-Comprehensive-Proposal.pdf"

html_out_path = os.path.join(ANDPOC_DIR, HTML_FILENAME)
pdf_out_path = os.path.join(ANDPOC_DIR, PDF_FILENAME)
public_pdf_path = os.path.join(WORKSPACE_DIR, "public", PDF_FILENAME)
out_pdf_path = os.path.join(WORKSPACE_DIR, "out", PDF_FILENAME)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ANDPOC Institutional Educational Platform - Comprehensive 3-Tier Proposal</title>
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
      max-width: 920px;
    }}

    .cover-subtitle {{
      font-size: 18px;
      color: #CBD5E1;
      font-weight: 400;
      max-width: 860px;
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

    /* Grid Layouts */
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

    /* Airy Table */
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

    .badge-cumulative {{
      display: inline-block;
      background: #E2E8F0;
      color: var(--navy);
      font-weight: 700;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      margin-bottom: 8px;
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
      font-size: 38px;
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
    <div class="toolbar-title">ANDPOC Institutional Educational Platform - Comprehensive 3-Tier Proposal (14 Slides)</div>
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
      <div class="cover-tag">Executive Product Proposal</div>
    </div>
    <div class="cover-center">
      <div class="cover-category">Institutional Multi-Tier EdTech Transformation</div>
      <h1 class="cover-title">ANDPOC Institutional Mobile &amp; Academic ERP Ecosystem</h1>
      <p class="cover-subtitle">Unifying ANDPOC Royal Schools (K-12), ANDPOC Universal Study Center (University), and the ANDPOC Standard Educational Programs under a 3-Tier Growth Framework.</p>
    </div>
    <div class="cover-footer">
      <div>
        <div class="cover-meta-label">Target Entities</div>
        <div class="cover-meta-val">Royal Schools &amp; Universal Study Center</div>
      </div>
      <div>
        <div class="cover-meta-label">Delivery Framework</div>
        <div class="cover-meta-val">3 Scalable Investment Options</div>
      </div>
      <div>
        <div class="cover-meta-label">Mobile Target</div>
        <div class="cover-meta-val">Android &amp; iOS via React Native</div>
      </div>
      <div>
        <div class="cover-meta-label">Prepared By</div>
        <div class="cover-meta-val">Sales Cowboy Marketing Solutions</div>
      </div>
    </div>
  </div>

  <!-- SLIDE 2: INSTITUTIONAL CONTEXT & DUAL-WING STRUCTURE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">01 | Institutional Architecture</div>
        <div class="slide-title">Unifying K-12 &amp; Higher Education</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Wing A: ANDPOC Royal Schools (K-12)</div>
          <p class="card-desc">Nursery, Primary, and Secondary school branches requiring structured termly governance:</p>
          <ul class="bullet-list">
            <li>Termly continuous assessment (CA) + Examination score computation.</li>
            <li>Behavioral, affective, and psychomotor developmental evaluations.</li>
            <li>Automated terminal report cards downloadable in the mobile app.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Wing B: Universal Study Center (University)</div>
          <p class="card-desc">Tertiary education center serving university students across faculties:</p>
          <ul class="bullet-list">
            <li>Semester course registrations and credit-unit weighting.</li>
            <li>Nigerian 5-point GPA and CGPA computational engine.</li>
            <li>Digital transcript previews, syllabus access, and distance learning.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 2 of 14</div>
    </div>
  </div>

  <!-- SLIDE 3: 3-TIER SCALABILITY MODEL -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">02 | Growth Roadmap</div>
        <div class="slide-title">3-Tier Progressive Architecture</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">Option 1: Foundation</div>
          <div class="badge-cumulative">Tier 1: Base Platform</div>
          <p class="card-desc">Admissions engine, curriculum directory, Paystack/Moniepoint tuition checkout, and real-time push broadcasts.</p>
          <div style="margin-top:14px; font-weight:800; font-size:18px; color:var(--navy);">&#8358;700,000</div>
          <div style="font-size:12px; color:var(--muted);">3 - 4 Weeks Timeline</div>
        </div>
        <div class="card card-navy">
          <div class="card-title">Option 2: Unified ERP</div>
          <div class="badge-cumulative">Tier 2: Includes All Option 1</div>
          <p class="card-desc">Inherits all Tier 1 features + K-12 report cards, University CGPA/transcripts, virtual bank accounts &amp; staff portal.</p>
          <div style="margin-top:14px; font-weight:800; font-size:18px; color:var(--navy);">&#8358;1,350,000</div>
          <div style="font-size:12px; color:var(--muted);">5 - 6 Weeks Timeline</div>
        </div>
        <div class="card card-accent">
          <div class="card-title">Option 3: Enterprise LMS &amp; CBT</div>
          <div class="badge-cumulative">Tier 3: Includes Option 1 &amp; 2</div>
          <p class="card-desc">Inherits all Tier 1 &amp; Tier 2 features + ANDPOC curriculum LMS, video lectures, coursework, and timed CBT exams.</p>
          <div style="margin-top:14px; font-weight:800; font-size:18px; color:var(--navy);">&#8358;2,200,000</div>
          <div style="font-size:12px; color:var(--muted);">8 - 9 Weeks Timeline</div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 3 of 14</div>
    </div>
  </div>

  <!-- SLIDE 4: OPTION 1 - CORE FOUNDATIONAL MODULES -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">03 | Proposal Option 1</div>
        <div class="slide-title">Tier 1: Admissions &amp; Institutional Mobile Hub</div>
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
            <li>Dedicated tabs for Royal Schools &amp; Universal Study Center.</li>
            <li>Accredited faculties and program prospectus.</li>
            <li>Session calendars and campus directories.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Digital Admissions Flow</div>
          <ul class="bullet-list">
            <li>In-app application form for parents and students.</li>
            <li>Passport photograph and credential uploads.</li>
            <li>Application tracking with instant digital letters.</li>
          </ul>
        </div>
        <div class="card card-accent">
          <div class="card-title">Tuition &amp; Push Alerts</div>
          <ul class="bullet-list">
            <li>Paystack &amp; Moniepoint card/transfer checkout.</li>
            <li>Digital downloadable payment receipts.</li>
            <li>Real-time push broadcasts for resumptions &amp; exams.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 4 of 14</div>
    </div>
  </div>

  <!-- SLIDE 5: OPTION 1 - WEB ADMIN DESK & TERMS -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">04 | Proposal Option 1</div>
        <div class="slide-title">Tier 1: Central Admin &amp; Commercial Terms</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-navy">
          <div class="card-title">Web Admin Management Console</div>
          <p class="card-desc">Central Next.js desktop console for school registry staff:</p>
          <ul class="bullet-list">
            <li><strong>Applicant Review Desk:</strong> Vetting documents and approving admission statuses.</li>
            <li><strong>Curriculum Manager:</strong> Update fee rates, classes, programs, and calendar dates.</li>
            <li><strong>Payment Ledger:</strong> Real-time reconciliation of fee and admission receipts.</li>
          </ul>
        </div>
        <div class="price-box">
          <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#94A3B8;">Option 1 Turnkey Investment</div>
          <div class="price-amount">&#8358;700,000</div>
          <div style="font-size:13px; color:#CBD5E1; margin-bottom:12px;">3 to 4 Weeks Delivery Timeline</div>
          <div style="background:rgba(255,255,255,0.08); padding:10px 14px; border-radius:6px; font-size:12px; text-align:left;">
            <div>&bull; 50% Mobilization: <strong>&#8358;350,000</strong></div>
            <div>&bull; 30% Staging Demo: <strong>&#8358;210,000</strong></div>
            <div>&bull; 20% Go-Live Handover: <strong>&#8358;140,000</strong></div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 5 of 14</div>
    </div>
  </div>

  <!-- SLIDE 6: OPTION 2 - CUMULATIVE INHERITANCE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">05 | Proposal Option 2</div>
        <div class="slide-title">Tier 2: Unified Academic &amp; Bursary ERP Overview</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="highlight-banner" style="margin-top:0; margin-bottom:16px;">
        <div><strong>Includes 100% of Proposal Option 1:</strong> Full Mobile Admissions, Dual-Wing Hub, Curriculum Directory, Paystack Tuition Payments, and Central Push Alerts are automatically included.</div>
        <div class="badge-accent">Fully Cumulative</div>
      </div>
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">Dual Result Engine</div>
          <p class="card-desc">Separate computational logic for K-12 termly report cards and University semester GPA/CGPA weighting.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Automated Bursary</div>
          <p class="card-desc">Student-specific virtual bank accounts for automatic fee reconciliation, eliminating bank teller vetting.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Multi-Role Staff Portals</div>
          <p class="card-desc">Teacher attendance registers, score upload sheets, and executive multi-campus Super-Admin oversight.</p>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 6 of 14</div>
    </div>
  </div>

  <!-- SLIDE 7: OPTION 2 - ACADEMIC ENGINES & REPORT CARDS -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">06 | Proposal Option 2</div>
        <div class="slide-title">Dual-Architecture Academic Engine</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">K-12 Terminal Report Engine (Royal Schools)</div>
          <p class="card-desc">Tailored for Nursery, Primary, and Secondary academic scoring:</p>
          <ul class="bullet-list">
            <li>Configurable Continuous Assessment (CA1, CA2) + Exam weighting.</li>
            <li>Subject teacher grade inputs with automated total and class rank.</li>
            <li>Psychomotor, punctuality, and affective development ratings.</li>
            <li>Automated, printable official termly report card PDF generation.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Tertiary Credit-Unit Engine (Universal Study Center)</div>
          <p class="card-desc">Tailored for university diploma and degree academic structures:</p>
          <ul class="bullet-list">
            <li>Faculty and departmental level allocations (100L through 400L+).</li>
            <li>Semester course registration with credit-unit weighting per course.</li>
            <li>Automated 5-point GPA and Cumulative GPA (CGPA) computation.</li>
            <li>Instant digital unofficial transcript previews on web and mobile.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 7 of 14</div>
    </div>
  </div>

  <!-- SLIDE 8: OPTION 2 - BURSARY & TERMS -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">07 | Proposal Option 2</div>
        <div class="slide-title">Tier 2: Bursary Engine &amp; Commercial Terms</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-navy">
          <div class="card-title">Virtual Account Fee Reconciliation</div>
          <p class="card-desc">Complete financial automation across both campuses:</p>
          <ul class="bullet-list">
            <li><strong>Automated Virtual Accounts:</strong> Unique dedicated bank account per student for instant bank app transfers.</li>
            <li><strong>Zero Manual Teller Checks:</strong> Payments clear instantly and update student fee ledgers automatically.</li>
            <li><strong>Defaulter Management:</strong> Real-time tracking of paid, partial, and outstanding tuition balances.</li>
          </ul>
        </div>
        <div class="price-box">
          <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#94A3B8;">Option 2 Turnkey Investment</div>
          <div class="price-amount">&#8358;1,350,000</div>
          <div style="font-size:13px; color:#CBD5E1; margin-bottom:12px;">5 to 6 Weeks Delivery Timeline</div>
          <div style="background:rgba(255,255,255,0.08); padding:10px 14px; border-radius:6px; font-size:12px; text-align:left;">
            <div>&bull; 40% Mobilization: <strong>&#8358;540,000</strong></div>
            <div>&bull; 40% Staging Demo: <strong>&#8358;540,000</strong></div>
            <div>&bull; 20% Go-Live Handover: <strong>&#8358;270,000</strong></div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 8 of 14</div>
    </div>
  </div>

  <!-- SLIDE 9: OPTION 3 - ENTERPRISE LMS & CBT OVERVIEW -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">08 | Proposal Option 3</div>
        <div class="slide-title">Tier 3: Enterprise Curriculum LMS &amp; CBT Ecosystem</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="highlight-banner" style="margin-top:0; margin-bottom:16px;">
        <div><strong>Includes 100% of Option 1 AND Option 2:</strong> Incorporates all admissions, K-12 report cards, University CGPA engines, virtual bursary accounts, and staff portals into a full digital learning campus.</div>
        <div class="badge-accent">Flagship Tier</div>
      </div>
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">ANDPOC Curriculum LMS</div>
          <p class="card-desc">Digitizes the complete ANDPOC Standard Educational Curriculum into secure video, audio, and PDF modules.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Computer-Based Testing (CBT)</div>
          <p class="card-desc">Timed examination engine with question-shuffling, countdown locks, and instant auto-grading into CA sheets.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Blended / Distance Learning</div>
          <p class="card-desc">Empowers Universal Study Center students across Nigeria to study off-campus without geographical barriers.</p>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 9 of 14</div>
    </div>
  </div>

  <!-- SLIDE 10: OPTION 3 - DIGITAL CURRICULUM LMS MODULES -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">09 | Proposal Option 3</div>
        <div class="slide-title">Digital Learning &amp; Coursework Desk</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Digital Curriculum Content Delivery</div>
          <p class="card-desc">Transforming physical syllabi into interactive media modules:</p>
          <ul class="bullet-list">
            <li><strong>Video &amp; Audio Lectures:</strong> Secure, high-speed streaming via Cloudflare Stream with no external ads.</li>
            <li><strong>Coursework Notes &amp; Handouts:</strong> Downloadable PDF syllabus materials and schemes of work.</li>
            <li><strong>Student Learning Tracker:</strong> Lesson completion percentage tracking per course.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Assignments &amp; Teacher Grading Desk</div>
          <p class="card-desc">Paperless homework submission and digital teacher evaluations:</p>
          <ul class="bullet-list">
            <li><strong>Mobile Homework Submissions:</strong> Students submit essays and files via smartphone camera or upload.</li>
            <li><strong>Direct Teacher Feedback:</strong> Instructors review, assign scores, and leave feedback in-app.</li>
            <li><strong>Automated CA Integration:</strong> Approved assignment marks automatically transfer into termly report sheets.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 10 of 14</div>
    </div>
  </div>

  <!-- SLIDE 11: OPTION 3 - CBT ENGINE & TERMS -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">10 | Proposal Option 3</div>
        <div class="slide-title">Tier 3: CBT Examination Engine &amp; Terms</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-navy">
          <div class="card-title">Computer-Based Testing (CBT) Engine</div>
          <p class="card-desc">Rigorous, automated examination platform for mock exams and assessments:</p>
          <ul class="bullet-list">
            <li><strong>Question Bank &amp; Randomization:</strong> Shuffles question and option sequences to prevent exam malpractice.</li>
            <li><strong>Timed Exam Sessions:</strong> Hard-stop countdown timers with automatic submission upon expiry.</li>
            <li><strong>Instant Scoring:</strong> Immediate result compilation with grades pushed directly into student result files.</li>
          </ul>
        </div>
        <div class="price-box">
          <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#94A3B8;">Option 3 Turnkey Investment</div>
          <div class="price-amount">&#8358;2,200,000</div>
          <div style="font-size:13px; color:#CBD5E1; margin-bottom:12px;">8 to 9 Weeks Delivery Timeline</div>
          <div style="background:rgba(255,255,255,0.08); padding:10px 14px; border-radius:6px; font-size:12px; text-align:left;">
            <div>&bull; 40% Mobilization: <strong>&#8358;880,000</strong></div>
            <div>&bull; 40% Staging Demo: <strong>&#8358;880,000</strong></div>
            <div>&bull; 20% Go-Live Handover: <strong>&#8358;440,000</strong></div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 11 of 14</div>
    </div>
  </div>

  <!-- SLIDE 12: CUMULATIVE FEATURE COMPARISON MATRIX -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">11 | Side-by-Side Comparison</div>
        <div class="slide-title">Cumulative Feature &amp; Capability Matrix</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <table class="scanty-table">
        <thead>
          <tr>
            <th>Platform Capabilities</th>
            <th>Option 1: Base</th>
            <th>Option 2: Unified ERP</th>
            <th>Option 3: Enterprise LMS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Dual-Wing Mobile App (K-12 &amp; University)</strong></td>
            <td><span class="badge-accent">Included</span></td>
            <td><span class="badge-accent">Included</span></td>
            <td><span class="badge-accent">Included</span></td>
          </tr>
          <tr>
            <td><strong>Admissions Intake &amp; Paystack/Moniepoint Fees</strong></td>
            <td><span class="badge-accent">Included</span></td>
            <td><span class="badge-accent">Included</span></td>
            <td><span class="badge-accent">Included</span></td>
          </tr>
          <tr>
            <td><strong>K-12 Termly Report Cards &amp; University CGPA Engine</strong></td>
            <td style="color:var(--muted);">-</td>
            <td><span class="badge-accent">Included</span></td>
            <td><span class="badge-accent">Included</span></td>
          </tr>
          <tr>
            <td><strong>Automated Virtual Accounts &amp; Fee Defaulter Ledger</strong></td>
            <td style="color:var(--muted);">-</td>
            <td><span class="badge-accent">Included</span></td>
            <td><span class="badge-accent">Included</span></td>
          </tr>
          <tr>
            <td><strong>Digital Curriculum LMS (Video/PDF Modules &amp; CBT Exams)</strong></td>
            <td style="color:var(--muted);">-</td>
            <td style="color:var(--muted);">-</td>
            <td><span class="badge-accent">Included</span></td>
          </tr>
          <tr>
            <td><strong>Total Turnkey Investment</strong></td>
            <td><strong>&#8358;700,000</strong></td>
            <td><strong>&#8358;1,350,000</strong></td>
            <td><strong>&#8358;2,200,000</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 12 of 14</div>
    </div>
  </div>

  <!-- SLIDE 13: TECHNICAL ARCHITECTURE & OPERATIONAL OPEX -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">12 | Technical Foundation</div>
        <div class="slide-title">Technology Stack &amp; Operational Transparency</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-4">
        <div class="card card-accent">
          <div class="card-title">Mobile App</div>
          <p class="card-desc"><strong>React Native / Expo</strong></p>
          <p class="card-desc" style="margin-top:4px; font-size:12px;">Unified iOS &amp; Android app with role-based student, parent, and teacher views.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Web ERP Console</div>
          <p class="card-desc"><strong>Next.js 15 &amp; Tailwind</strong></p>
          <p class="card-desc" style="margin-top:4px; font-size:12px;">Blazing fast desktop administration, registry grading, and bursary accounting.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Backend API</div>
          <p class="card-desc"><strong>Node.js (NestJS)</strong></p>
          <p class="card-desc" style="margin-top:4px; font-size:12px;">High-concurrency microservices, WebSockets, and secure role authentication.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Database &amp; Media</div>
          <p class="card-desc"><strong>PostgreSQL &amp; R2</strong></p>
          <p class="card-desc" style="margin-top:4px; font-size:12px;">Relational multi-tenant academic database with Cloudflare R2 file storage.</p>
        </div>
      </div>
      <div class="highlight-banner" style="margin-top:14px;">
        <div><strong>Hosting Infrastructure (Railway / Cloudflare):</strong> Estimated at ~$15 to $35 / month paid directly to providers. Google Play ($25 one-off) &amp; Apple Store ($99/year).</div>
        <div class="badge-accent">Cost Controlled</div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 13 of 14</div>
    </div>
  </div>

  <!-- SLIDE 14: WARRANTY & ACCEPTANCE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">13 | Engagement Next Steps</div>
        <div class="slide-title">Warranty, Training &amp; Mobilization</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Comprehensive Warranty &amp; Handover Package</div>
          <p class="card-desc">Ensuring full operational independence and system stability:</p>
          <ul class="bullet-list">
            <li><strong>30-Day Critical Bug-Fix Warranty:</strong> Free technical remediation post-launch.</li>
            <li><strong>Administrative Staff Training:</strong> Hands-on training for teachers, registrars, and bursars.</li>
            <li><strong>100% Intellectual Property Ownership:</strong> Complete source code handover.</li>
          </ul>
        </div>
        <div class="card card-navy" style="display:flex; flex-direction:column; justify-content:center; text-align:center;">
          <div class="card-title" style="justify-content:center;">Ready to Begin Engagement</div>
          <p class="card-desc" style="margin-bottom:14px;">Select the preferred tier (Option 1, 2, or 3), sign the formal project scope, and release the initial mobilization deposit to commence development sprints.</p>
          <div style="background:#F1F5F9; padding:12px; border-radius:6px; font-size:12.5px; color:var(--navy); font-weight:700;">
            Sales Cowboy Marketing Solutions &bull; hello@salescowboy.com.ng
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 14 of 14</div>
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
print("  Has 1,350,000:", "1,350,000" in all_text)
print("  Has 2,200,000:", "2,200,000" in all_text)
print("  Has em/en dash:", bool(re.search(r"[\u2013\u2014]", all_text)))
