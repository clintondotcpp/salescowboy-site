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
LOGO_PATH = os.path.join(WORKSPACE_DIR, "public", "assets", "salescowboy-logo.png")

with open(LOGO_PATH, "rb") as f:
    logo_base64 = base64.b64encode(f.read()).decode("utf-8")
logo_data_uri = f"data:image/png;base64,{logo_base64}"

HTML_FILENAME = "10-home-visit-medical-consultation-slide-deck.html"
PDF_FILENAME = "On-Demand-Home-Visit-Medical-Consultation-Proposal.pdf"

html_out_path = os.path.join(PROPOSALS_DIR, HTML_FILENAME)
pdf_out_path = os.path.join(PROPOSALS_DIR, PDF_FILENAME)
public_pdf_path = os.path.join(WORKSPACE_DIR, "public", PDF_FILENAME)
out_pdf_path = os.path.join(WORKSPACE_DIR, "out", PDF_FILENAME)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>On-Demand Home-Visit Medical Consultation Platform - Sales Cowboy Marketing Solutions</title>
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

    /* Card Layouts */
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
    <div class="toolbar-title">On-Demand Home-Visit Medical Platform - Executive Presentation Slide Deck (12 Slides)</div>
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
      <div class="cover-category">Healthcare Dispatch &amp; Clinical Operations Technology</div>
      <h1 class="cover-title">On-Demand Home-Visit Medical Consultation Platform</h1>
      <p class="cover-subtitle">Single Unified Mobile App for Patients &amp; Practitioners, Direct House-Call Dispatch, Live GPS Tracking, Arrival Verification PIN, and Central Web Operations.</p>
    </div>
    <div class="cover-footer">
      <div>
        <div class="cover-meta-label">Client Target Delivery</div>
        <div class="cover-meta-val">1 Unified App (iOS &amp; Android) + Web Admin</div>
      </div>
      <div>
        <div class="cover-meta-label">Turnkey Investment</div>
        <div class="cover-meta-val">&#8358;550,000 NGN</div>
      </div>
      <div>
        <div class="cover-meta-label">Delivery Timeline</div>
        <div class="cover-meta-val">4 - 5 Weeks</div>
      </div>
      <div>
        <div class="cover-meta-label">Prepared By</div>
        <div class="cover-meta-val">Sales Cowboy Marketing Solutions</div>
      </div>
    </div>
  </div>

  <!-- SLIDE 2: PROJECT OBJECTIVE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">01 | Executive Summary</div>
        <div class="slide-title">Project Mission &amp; Market Need</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Physical Care vs Video Telemedicine</div>
          <p class="card-desc">While traditional telehealth focuses on video calls, physical medical treatment, sample collection, and elderly care require hands-on in-home evaluation.</p>
          <ul class="bullet-list">
            <li>Patients book licensed practitioners to their home or office.</li>
            <li>Eliminates crowded hospital queues and exhausting traffic delays.</li>
            <li>Guaranteed rapid emergency or scheduled home consultations.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Single App Architecture</div>
          <p class="card-desc">Both patients and healthcare practitioners share <strong>one unified mobile application</strong> with seamless role switching:</p>
          <ul class="bullet-list">
            <li><strong>Patient Workspace:</strong> Instant booking, upfront fees, live en-route tracking.</li>
            <li><strong>Practitioner Mode:</strong> Availability toggle, navigation handoff, earnings.</li>
            <li><strong>Web Operations Console:</strong> License vetting, live safety radar, ledger.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 2 of 12</div>
    </div>
  </div>

  <!-- SLIDE 3: PLATFORM HIGHLIGHTS -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">02 | Core Value Propositions</div>
        <div class="slide-title">Key Operational Differentiators</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-4">
        <div class="card card-accent">
          <div class="card-title">Single Shared App</div>
          <p class="card-desc">Patients and practitioners download one app. Vetted doctors switch into Practitioner Mode directly.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">MDCN / NMCN Gate</div>
          <p class="card-desc">Rigorous credential verification gate preventing unauthorized practitioners from receiving requests.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Live GPS En Route</div>
          <p class="card-desc">Patients track assigned medical practitioners on an interactive live map in real time.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Doorstep PIN</div>
          <p class="card-desc">4-digit verification code exchanged at the door ensuring patient and practitioner safety.</p>
        </div>
      </div>
      <div class="highlight-banner">
        <div><strong>High Efficiency Architecture:</strong> Publishing a single mobile application halves store submission friction and simplifies user acquisition.</div>
        <div class="badge-accent">Single App Publishing</div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 3 of 12</div>
    </div>
  </div>

  <!-- SLIDE 4: END-TO-END PATIENT & PRACTITIONER JOURNEY -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">03 | Workflow Architecture</div>
        <div class="slide-title">End-to-End House-Call Journey</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="flow-row">
        <div class="flow-step">
          <div class="flow-step-num">Step 1</div>
          <div class="flow-step-title">Select &amp; Pin</div>
          <div class="flow-step-desc">Patient selects medical specialty, notes symptoms, and pins exact home address.</div>
        </div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-step">
          <div class="flow-step-num">Step 2</div>
          <div class="flow-step-title">Pay &amp; Dispatch</div>
          <div class="flow-step-desc">Upfront payment secured via Paystack/Moniepoint; nearest available doctor alerted in-app.</div>
        </div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-step">
          <div class="flow-step-num">Step 3</div>
          <div class="flow-step-title">Live Tracking</div>
          <div class="flow-step-desc">Patient watches provider arrive in real time with turn-by-turn navigation.</div>
        </div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-step">
          <div class="flow-step-num">Step 4</div>
          <div class="flow-step-title">Verify PIN &amp; Care</div>
          <div class="flow-step-desc">Arrival OTP exchanged at the door; consultation conducted and summary recorded.</div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 4 of 12</div>
    </div>
  </div>

  <!-- SLIDE 5: MODULE 1 - PATIENT MODE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">04 | Mobile Experience</div>
        <div class="slide-title">Module 1: Unified App - Patient Mode</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">Medical Profile</div>
          <ul class="bullet-list">
            <li>Emergency data (blood group, allergies).</li>
            <li>Saved home and office addresses.</li>
            <li>Family member profile switching.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">House-Call Booking</div>
          <ul class="bullet-list">
            <li>Specialty categories (Doctor, Nurse, Lab).</li>
            <li>Immediate dispatch or scheduled slot.</li>
            <li>Upfront distance &amp; consultation fees.</li>
          </ul>
        </div>
        <div class="card card-accent">
          <div class="card-title">Live Safety &amp; History</div>
          <ul class="bullet-list">
            <li>Real-time practitioner arrival radar.</li>
            <li>4-digit doorstep verification PIN.</li>
            <li>Digital visit notes and past receipts.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 5 of 12</div>
    </div>
  </div>

  <!-- SLIDE 6: MODULE 2 - PRACTITIONER MODE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">05 | Mobile Experience</div>
        <div class="slide-title">Module 2: Unified App - Practitioner Mode</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">License &amp; Credentials</div>
          <ul class="bullet-list">
            <li>In-app switch to Practitioner Workspace.</li>
            <li>Upload MDCN / NMCN practicing license.</li>
            <li>Admin verification badge before dispatch.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Dispatch &amp; Navigation</div>
          <ul class="bullet-list">
            <li>Online / offline house-call toggle.</li>
            <li>Audible incoming dispatch alerts.</li>
            <li>One-tap Google Maps turn-by-turn handoff.</li>
          </ul>
        </div>
        <div class="card card-accent">
          <div class="card-title">Consultation &amp; Earnings</div>
          <ul class="bullet-list">
            <li>Doorstep PIN verification prompt.</li>
            <li>Quick clinical observation logger.</li>
            <li>Live wallet with bank payout withdrawals.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 6 of 12</div>
    </div>
  </div>

  <!-- SLIDE 7: MODULE 3 - MEDICAL OPERATIONS CONSOLE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">06 | Administrative Portal</div>
        <div class="slide-title">Module 3: Medical Operations Web Console</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Practitioner Vetting &amp; Safety Radar</div>
          <p class="card-desc">Comprehensive administrative controls ensuring regulatory compliance and passenger/provider security.</p>
          <ul class="bullet-list">
            <li><strong>License Desk:</strong> Approve, verify, or suspend MDCN/NMCN practitioner submissions.</li>
            <li><strong>Live Dispatch Radar:</strong> Map monitoring active visits and practitioner locations.</li>
            <li><strong>SOS &amp; Dispute Management:</strong> Emergency resolution desk for safety alerts.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Revenue &amp; Payout Ledger</div>
          <p class="card-desc">Automated financial control and transparent commission accounting.</p>
          <ul class="bullet-list">
            <li><strong>Zone Pricing Engine:</strong> Set house-call fees based on specialty and distance tier.</li>
            <li><strong>Commission Split:</strong> Automated 15% - 25% platform revenue retention.</li>
            <li><strong>Automated Settlement:</strong> Single-click approval of doctor/nurse payout requests.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 7 of 12</div>
    </div>
  </div>

  <!-- SLIDE 8: TECHNICAL ARCHITECTURE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">07 | Technology Stack</div>
        <div class="slide-title">Robust &amp; Cost-Effective Infrastructure</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-4">
        <div class="card card-accent">
          <div class="card-title">Single App</div>
          <p class="card-desc"><strong>React Native &amp; Expo</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">One codebase serving both Patients and Practitioners on Android &amp; iOS via role switching.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Web Portal</div>
          <p class="card-desc"><strong>Next.js (React)</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Server-side rendering, Tailwind CSS, and lightning-fast desktop admin operations.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Backend API</div>
          <p class="card-desc"><strong>Node.js / Express / Socket</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">WebSockets for live GPS practitioner coordinates and instantaneous booking dispatch.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Database &amp; Media</div>
          <p class="card-desc"><strong>PostgreSQL &amp; R2</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Relational visit history, encrypted user data, and Cloudflare R2 license document storage.</p>
        </div>
      </div>
      <div class="highlight-banner" style="margin-top:14px;">
        <div><strong>Zero Expensive Map Bills:</strong> OpenStreetMap tile rendering with native Google Maps external turn-by-turn navigation handoff.</div>
        <div class="badge-accent">Optimized Opex</div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 8 of 12</div>
    </div>
  </div>

  <!-- SLIDE 9: OPERATIONAL INFRASTRUCTURE COSTS -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">08 | Operational Transparency</div>
        <div class="slide-title">Third-Party Running &amp; Hosting Costs</div>
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
            <td>Hosts backend API, real-time GPS WebSockets, and PostgreSQL</td>
            <td><strong>$10.00 - $20.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Media Storage (Cloudflare R2)</strong></td>
            <td>Stores practitioner regulatory licenses and profile photos</td>
            <td><strong>Free tier / ~$5.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Push Alerts &amp; SMS OTP (Firebase / Termii)</strong></td>
            <td>Instant visit notifications and 4-digit arrival verification</td>
            <td><strong>Free push / Pay-as-you-go SMS</strong></td>
          </tr>
          <tr>
            <td><strong>Payment Gateway Processing</strong></td>
            <td>Paystack / Moniepoint consultation fee checkout</td>
            <td><strong>1.5% capped local processing fee</strong></td>
          </tr>
          <tr>
            <td><strong>App Store Accounts (Google &amp; Apple)</strong></td>
            <td>Single unified mobile application publishing on Play Store &amp; App Store</td>
            <td><strong>$25 one-off (Google) / $99/yr (Apple)</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 9 of 12</div>
    </div>
  </div>

  <!-- SLIDE 10: COMMERCIAL INVESTMENT -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">09 | Commercial Framework</div>
        <div class="slide-title">Project Investment &amp; Milestones</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="price-box">
          <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #94A3B8; font-weight: 700;">Total Development Investment</div>
          <div class="price-amount">&#8358;550,000</div>
          <div style="font-size: 14px; color: #CBD5E1;">Turnkey Engineering &bull; 4 to 5 Weeks Timeline</div>
          <div style="margin-top: 18px; text-align: left; background: rgba(255,255,255,0.06); padding: 14px 18px; border-radius: 8px;">
            <div style="font-size: 12.5px; color: #FCD34D; font-weight: 700; margin-bottom: 4px;">Investment Inclusions:</div>
            <div style="font-size: 12px; color: #E2E8F0; line-height: 1.45;">Single Unified Mobile App (Patient &amp; Practitioner Modes for Android &amp; iOS), Medical Operations Web Console, Real-time GPS sockets, and 30-day warranty.</div>
          </div>
        </div>
        <div class="card card-accent" style="display:flex; flex-direction:column; justify-content:center;">
          <div class="card-title">Structured Milestone Schedule</div>
          <div style="margin-top: 8px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid var(--border);">
              <div>
                <div style="font-weight:700; color:var(--navy);">50% Mobilization Deposit</div>
                <div style="font-size:12px; color:var(--muted);">UI/UX designs, DB architecture &amp; environment setup</div>
              </div>
              <div style="font-weight:800; font-size:16px; color:var(--navy);">&#8358;275,000</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid var(--border);">
              <div>
                <div style="font-weight:700; color:var(--navy);">30% Functional Staging Milestone</div>
                <div style="font-size:12px; color:var(--muted);">Booking flow, Paystack, live GPS tracking &amp; PIN check</div>
              </div>
              <div style="font-weight:800; font-size:16px; color:var(--navy);">&#8358;165,000</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:700; color:var(--navy);">20% Handover &amp; Go-Live</div>
                <div style="font-size:12px; color:var(--muted);">Production unified mobile builds, live admin web &amp; staff onboarding</div>
              </div>
              <div style="font-weight:800; font-size:16px; color:var(--navy);">&#8358;110,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 10 of 12</div>
    </div>
  </div>

  <!-- SLIDE 11: EXECUTION ROADMAP -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">10 | Delivery Roadmap</div>
        <div class="slide-title">4-Phase Implementation Schedule</div>
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
          <p class="card-desc">UI/UX prototype Figma screens for unified app modes, DB schema design, and server provisioning.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Phase 2: Booking</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Weeks 2 - 3</div>
          <p class="card-desc">Patient request flow, Paystack/Moniepoint checkout integration, and practitioner availability toggle.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Phase 3: Live Radar</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 4</div>
          <p class="card-desc">Real-time GPS en-route streaming, arrival verification PIN logic, and medical operations web console.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Phase 4: Launch</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 5</div>
          <p class="card-desc">Full end-to-end integration testing, payment verification, single app store build generation, and handover.</p>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 11 of 12</div>
    </div>
  </div>

  <!-- SLIDE 12: ACCEPTANCE & SIGN-OFF -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">11 | Next Steps</div>
        <div class="slide-title">Warranty, Acceptance &amp; Mobilization</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Post-Launch Warranty &amp; SLA</div>
          <p class="card-desc">We guarantee uninterrupted stability through our comprehensive post-delivery warranty package:</p>
          <ul class="bullet-list">
            <li><strong>30-Day Critical Bug-Fix Warranty:</strong> Immediate remediation for any functional defects.</li>
            <li><strong>Staff Training Session:</strong> Full administrative walkthrough for operations team.</li>
            <li><strong>Source Code Handover:</strong> 100% intellectual property and repository rights transfer.</li>
          </ul>
        </div>
        <div class="card card-navy" style="display:flex; flex-direction:column; justify-content:center; text-align:center;">
          <div class="card-title" style="justify-content:center;">Ready to Initiate Development</div>
          <p class="card-desc" style="margin-bottom:14px;">Review this proposal, authorize the project agreement, and submit the mobilization deposit to begin Week 1 sprint execution.</p>
          <div style="background:#F1F5F9; padding:12px; border-radius:6px; font-size:12.5px; color:var(--navy); font-weight:700;">
            Sales Cowboy Marketing Solutions &bull; hello@salescowboy.com.ng
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions</div>
      <div>Slide 12 of 12</div>
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
print("  Has 550,000:", "550,000" in all_text)
print("  Has em/en dash:", bool(re.search(r"[\u2013\u2014]", all_text)))
