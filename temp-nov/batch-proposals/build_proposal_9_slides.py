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

css = """
    @page {
      size: 338.67mm 190.5mm;
      margin: 0;
    }

    :root {
      --navy: #0F172A;
      --navy-light: #1E293B;
      --emerald: #059669;
      --emerald-dark: #047857;
      --emerald-light: #D1FAE5;
      --amber: #D97706;
      --pearl: #F8FAFC;
      --white: #FFFFFF;
      --slate: #1E293B;
      --muted: #64748B;
      --border: #E2E8F0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #090D16;
      color: var(--slate);
      -webkit-font-smoothing: antialiased;
      padding: 24px 0;
    }

    .toolbar {
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
    }

    .toolbar-title {
      font-size: 14px;
      font-weight: 700;
    }

    .toolbar-actions {
      display: flex;
      gap: 10px;
    }

    .btn {
      background: #0F172A;
      color: #F8FAFC;
      border: 1px solid #475569;
      padding: 7px 15px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;
    }

    .btn-emerald {
      background: var(--emerald);
      border-color: var(--emerald-dark);
      color: #FFFFFF;
    }

    /* 16:9 Slide Container */
    .slide {
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
    }

    .slide:last-of-type {
      page-break-after: auto;
      break-after: auto;
    }

    /* Cover Slide */
    .slide-cover {
      background: linear-gradient(135deg, #061A14 0%, #0F172A 55%, #132E27 100%);
      color: #FFFFFF;
      padding: 18mm 22mm;
    }

    .cover-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(16, 185, 129, 0.35);
      padding-bottom: 6mm;
    }

    .cover-brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .cover-brand img {
      height: 50px;
      background: #FFFFFF;
      padding: 5px 8px;
      border-radius: 6px;
    }

    .cover-brand-name {
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #FFFFFF;
      text-transform: uppercase;
    }

    .cover-brand-sub {
      font-size: 12px;
      color: #34D399;
      font-weight: 500;
    }

    .cover-pill {
      background: rgba(16, 185, 129, 0.18);
      border: 1px solid #34D399;
      color: #34D399;
      padding: 7px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .cover-main {
      margin: auto 0;
      max-width: 90%;
    }

    .cover-kicker {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #34D399;
      margin-bottom: 5mm;
    }

    .cover-title {
      font-size: 38px;
      font-weight: 900;
      line-height: 1.15;
      color: #FFFFFF;
      margin-bottom: 6mm;
      letter-spacing: -0.5px;
    }

    .cover-desc {
      font-size: 17px;
      color: #CBD5E1;
      line-height: 1.55;
      max-width: 88%;
    }

    .cover-footer {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      border-top: 1px solid rgba(16, 185, 129, 0.35);
      padding-top: 6mm;
    }

    .cf-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #34D399;
      font-weight: 700;
      margin-bottom: 3px;
    }

    .cf-val {
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
    }

    /* Standard Content Slide Chrome */
    .slide-header {
      background: var(--navy);
      color: #FFFFFF;
      padding: 6.5mm 16mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3.5px solid var(--emerald);
    }

    .sh-kicker {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.3px;
      color: #34D399;
      margin-bottom: 2px;
    }

    .sh-title {
      font-size: 24px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.3px;
    }

    .sh-tag {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(52, 211, 153, 0.45);
      color: #34D399;
      font-size: 12px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 5px;
    }

    .slide-body {
      padding: 8mm 18mm 6mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6mm;
    }

    .slide-footer {
      padding: 4mm 18mm;
      background: #FFFFFF;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11.5px;
      color: var(--muted);
    }

    .sf-brand {
      display: flex;
      align-items: center;
      gap: 9px;
      font-weight: 700;
      color: var(--navy);
    }

    .sf-brand img {
      height: 20px;
    }

    .sf-page {
      font-weight: 800;
      color: var(--navy);
      background: #F1F5F9;
      padding: 3px 11px;
      border-radius: 4px;
    }

    /* Big Airy Typography & Cards */
    .cols-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8mm;
    }

    .cols-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 7mm;
    }

    .cols-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6mm;
    }

    .card {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 7mm 8mm;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .card-emerald {
      border-top: 4px solid var(--emerald);
    }

    .card-amber {
      border-top: 4px solid var(--amber);
    }

    .card-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--navy);
      margin-bottom: 4mm;
      line-height: 1.25;
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .badge-num {
      background: var(--navy);
      color: #34D399;
      font-size: 12px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 4px;
    }

    .big-text {
      font-size: 15.5px;
      line-height: 1.6;
      color: var(--slate);
    }

    .big-list {
      list-style: none;
      padding: 0;
    }

    .big-list li {
      font-size: 15px;
      line-height: 1.55;
      color: var(--slate);
      margin-bottom: 3.5mm;
      padding-left: 18px;
      position: relative;
    }

    .big-list li:last-child {
      margin-bottom: 0;
    }

    .big-list li::before {
      content: "▪";
      position: absolute;
      left: 0;
      color: var(--emerald);
      font-weight: 900;
      font-size: 17px;
    }

    /* Metric Stat Cards */
    .stat-box {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-left: 5px solid var(--emerald);
      border-radius: 9px;
      padding: 6.5mm 7mm;
    }

    .stat-num {
      font-size: 30px;
      font-weight: 900;
      color: var(--navy);
      line-height: 1.1;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 13px;
      font-weight: 800;
      color: var(--emerald-dark);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-sub {
      font-size: 13px;
      color: var(--muted);
      margin-top: 5px;
      line-height: 1.45;
    }

    /* Visual Process Flow */
    .flow-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: #F1F5F9;
      padding: 6mm 7mm;
      border-radius: 9px;
      border: 1px solid #CBD5E1;
    }

    .flow-node {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-top: 3.5px solid var(--navy);
      border-radius: 7px;
      padding: 12px 14px;
      text-align: center;
      flex: 1;
      font-size: 14.5px;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.35;
    }

    .flow-arr {
      font-size: 20px;
      font-weight: 900;
      color: var(--emerald);
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      background: #FFFFFF;
      border-radius: 9px;
      overflow: hidden;
      border: 1px solid var(--border);
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
    }

    th {
      background: var(--navy);
      color: #FFFFFF;
      text-align: left;
      padding: 4mm 5.5mm;
      font-size: 13.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    td {
      padding: 3.6mm 5.5mm;
      font-size: 14px;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
      line-height: 1.45;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .callout {
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      border-left: 5px solid var(--emerald);
      padding: 5mm 7mm;
      border-radius: 8px;
      font-size: 15px;
      color: #065F46;
      line-height: 1.55;
    }

    .callout strong {
      color: var(--navy);
    }

    code {
      font-family: ui-monospace, monospace;
      background: #E2E8F0;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 13px;
      color: var(--navy);
    }

    @media print {
      body {
        background: #FFFFFF;
        padding: 0;
      }
      .toolbar {
        display: none !important;
      }
      .slide {
        margin: 0;
        box-shadow: none;
      }
    }
"""

def slide_chrome(kicker, title, tag, page_num, total_pages, body_html):
    return f"""
  <section class="slide">
    <div class="slide-header">
      <div class="sh-left">
        <div class="sh-kicker">{kicker}</div>
        <div class="sh-title">{title}</div>
      </div>
      <div class="sh-right">
        <span class="sh-tag">{tag}</span>
      </div>
    </div>
    <div class="slide-body">
      {body_html}
    </div>
    <div class="slide-footer">
      <div class="sf-brand">
        <img src="data:image/png;base64,{b64_logo}" alt="Sales Cowboy">
        <span>Sales Cowboy Marketing Solutions | Smart Real Estate Marketplace Proposal</span>
      </div>
      <div class="sf-page">Slide {page_num:02d} / {total_pages:02d}</div>
    </div>
  </section>
"""

TOTAL_SLIDES = 13

# SLIDE 1: COVER
slide_1 = f"""
  <section class="slide slide-cover">
    <div class="cover-top">
      <div class="cover-brand">
        <img src="data:image/png;base64,{b64_logo}" alt="Sales Cowboy Logo">
        <div>
          <div class="cover-brand-name">Sales Cowboy Marketing Solutions</div>
          <div class="cover-brand-sub">Enterprise Digital &amp; Software Development</div>
        </div>
      </div>
      <div class="cover-pill">Product Architecture &amp; Development Proposal</div>
    </div>

    <div class="cover-main">
      <div class="cover-kicker">High-Trust Nigerian PropTech Ecosystem</div>
      <div class="cover-title">Smart Real Estate Marketplace &amp;<br>Pay-Per-Location Unlock Platform</div>
      <div class="cover-desc">
        Eliminating physical inspection fees through verified listings, micro-credit location unmasking (₦100 per unlock), automated landlord &amp; agent revenue sharing, and cross-platform mobile apps.
      </div>
    </div>

    <div class="cover-footer">
      <div>
        <div class="cf-label">Prepared By</div>
        <div class="cf-val">Sales Cowboy Marketing Solutions</div>
      </div>
      <div>
        <div class="cf-label">Total Development Investment</div>
        <div class="cf-val" style="color: #34D399;">₦850,000 (50/30/20 Milestones)</div>
      </div>
      <div>
        <div class="cf-label">Delivery Timeline</div>
        <div class="cf-val">5 Weeks Turnkey Delivery</div>
      </div>
      <div>
        <div class="cf-label">Reference &amp; Date</div>
        <div class="cf-val">SC-2026-NOV-009 | Nov 18, 2026</div>
      </div>
    </div>
  </section>
"""

# SLIDE 2: THE PROBLEM & THE SOLUTION
slide_2 = slide_chrome(
    "01 | Project Objective",
    "Eliminating ₦5,000+ Inspection Fees with ₦100 Unlocks",
    "Market Disruption",
    2, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-amber">
        <div class="card-title" style="color: var(--amber);"><span class="badge-num" style="background: var(--amber); color: #fff;">!</span>The Current Nigerian Reality</div>
        <ul class="big-list">
          <li><strong>Exorbitant Inspection Fees:</strong> Property seekers pay ₦5,000 to ₦10,000 upfront just to view apartments that often do not match photos.</li>
          <li><strong>Wasted Time &amp; Fatigue:</strong> Commuting across congested roads with rogue middlemen to inspect unavailable or overpriced units.</li>
          <li><strong>Zero Agent Accountability:</strong> Seekers lose money even when an agent shows substandard listings.</li>
        </ul>
      </div>
      <div class="card card-emerald">
        <div class="card-title" style="color: var(--emerald);"><span class="badge-num">✓</span>The Platform Solution</div>
        <ul class="big-list">
          <li><strong>Free Previews from Home:</strong> Seekers browse high-resolution photos, exact pricing, and verified amenities at zero cost.</li>
          <li><strong>Micro-Fee Location Unlock:</strong> Pay just <strong>₦100</strong> to unmask the exact street address, interactive map pin, and direct WhatsApp contact.</li>
          <li><strong>Shared Partner Revenue:</strong> Lister receives an automated commission split on every unlock, ensuring active, high-quality listings.</li>
        </ul>
      </div>
    </div>
    """
)

# SLIDE 3: PLATFORM OVERVIEW (4 STATS)
slide_3 = slide_chrome(
    "02 | Platform Highlights",
    "Core Commercial Pillars & Strategic Highlights",
    "Key Metrics",
    3, TOTAL_SLIDES,
    """
    <div class="callout">
      <strong>Platform Core Concept:</strong> A transparent Nigerian property exchange bridging renters, buyers, direct landlords, and verified agents with instant micro-credit location unlocks and automated financial splits.
    </div>
    <div class="cols-4">
      <div class="stat-box">
        <div class="stat-num">₦100</div>
        <div class="stat-label">Micro-Unlock Fee</div>
        <div class="stat-sub">Seekers pay per property unlock instead of paying costly physical agent fees.</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">Single App</div>
        <div class="stat-label">Unified Architecture</div>
        <div class="stat-sub">Adaptive mobile app supporting both Seekers and Listers seamlessly.</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">Auto-Split</div>
        <div class="stat-label">Revenue Engine</div>
        <div class="stat-sub">Automatic commission credited directly to the lister's in-app wallet.</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">₦850k</div>
        <div class="stat-label">Total Investment</div>
        <div class="stat-sub">Complete turnkey delivery across Android, iOS, Web &amp; Admin in 5 weeks.</div>
      </div>
    </div>
    """
)

# SLIDE 4: UNIFIED ROLE-BASED EXPERIENCE
slide_4 = slide_chrome(
    "03 | User Experience Architecture",
    "Unified Role-Based Experience (One Single App)",
    "Adaptive Interface",
    4, TOTAL_SLIDES,
    """
    <div class="callout" style="margin-bottom: 2mm;">
      <strong>Smart Role Switching:</strong> Rather than forcing users to download separate seeker and landlord apps, the platform operates as a <strong>single unified application</strong> that dynamically adapts its interface based on selected role.
    </div>
    <div class="cols-2">
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">01</span>Property Seekers (Renters &amp; Buyers)</div>
        <ul class="big-list">
          <li>Browse verified listings with transparent rental prices and detailed specs.</li>
          <li>Purchase unlock credit bundles via Paystack / Moniepoint wallet.</li>
          <li>One-tap unlock to reveal street address, map directions, and direct landlord contacts.</li>
          <li>Permanent unlocked history vault stored in their personal profile.</li>
        </ul>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">02</span>Property Listers (Landlords &amp; Agents)</div>
        <ul class="big-list">
          <li>Distinct verification badging separating <strong>Direct Landlords</strong> from <strong>Verified Agents</strong>.</li>
          <li>Quick upload studio for property photos, video walkthroughs, and GPS pins.</li>
          <li>Real-time commission wallet tracking total views, unlocks, and earnings.</li>
          <li>One-tap bank withdrawal request to any Nigerian commercial bank.</li>
        </ul>
      </div>
    </div>
    """
)

# SLIDE 5: HIERARCHICAL LOCATION FUNNEL
slide_5 = slide_chrome(
    "04 | Hyper-Local Search Engine",
    "Hierarchical Location & Transaction Intent Funnel",
    "Precision Search",
    5, TOTAL_SLIDES,
    """
    <div class="big-text" style="margin-bottom: 2mm;">
      Property seekers never waste time wading through irrelevant statewide listings. The platform guides users through an intuitive 3-step hyper-local funnel:
    </div>
    <div class="flow-wrap">
      <div class="flow-node">
        <div style="font-size:12px; color:var(--emerald); text-transform:uppercase; margin-bottom:4px;">Step 1</div>
        State &amp; City Selection<br>
        <span style="font-size:12px; color:var(--muted); font-weight:normal;">(e.g., Owerri / Imo, Abuja FCT, Port Harcourt)</span>
      </div>
      <div class="flow-arr">&rarr;</div>
      <div class="flow-node">
        <div style="font-size:12px; color:var(--emerald); text-transform:uppercase; margin-bottom:4px;">Step 2</div>
        Transaction Intent<br>
        <span style="font-size:12px; color:var(--muted); font-weight:normal;">(Rent, Buy, Commercial Lease, or List)</span>
      </div>
      <div class="flow-arr">&rarr;</div>
      <div class="flow-node">
        <div style="font-size:12px; color:var(--emerald); text-transform:uppercase; margin-bottom:4px;">Step 3</div>
        Hyper-Local Drill-Down<br>
        <span style="font-size:12px; color:var(--muted); font-weight:normal;">(LGA &rarr; Specific Ward / Neighborhood)</span>
      </div>
    </div>
    <div class="card" style="margin-top: 3mm;">
      <div class="card-title" style="margin-bottom: 2mm;">Example Hyper-Local Drill-Down:</div>
      <div class="big-text">
        <strong>Imo State</strong> &nbsp;&rarr;&nbsp; <strong>Owerri Municipal LGA</strong> &nbsp;&rarr;&nbsp; <strong>Ikenegbu / Aladinma / New Owerri / World Bank</strong> &nbsp;&rarr;&nbsp; Instant relevant listings with precise neighborhood proximity.
      </div>
    </div>
    """
)

# SLIDE 6: MODULE 1 - SEEKER DISCOVERY & LOCATION UNLOCK
slide_6 = slide_chrome(
    "05 | Module 1: Seeker Experience",
    "Seeker Discovery & Location Unlock Engine",
    "Customer App & Web",
    6, TOTAL_SLIDES,
    """
    <div class="cols-3">
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">01</span>Masked Preview</div>
        <ul class="big-list">
          <li>View high-res photos, rental price, specs, amenities, and lister badge for free.</li>
          <li>Exact street address, GPS pin, and direct phone contact remain securely locked.</li>
        </ul>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">02</span>Location Credit Wallet</div>
        <ul class="big-list">
          <li>Top up credit bundles (e.g., ₦1,000 for 10 unlocks, ₦5,000 for 50 unlocks).</li>
          <li>One-tap <strong>Unlock Location</strong> reveals street address, map directions, and WhatsApp button.</li>
        </ul>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">03</span>Unlocked Vault</div>
        <ul class="big-list">
          <li>All unlocked listings remain permanently saved in the seeker's account history.</li>
          <li>Seekers can revisit directions and contact listers anytime without paying twice.</li>
        </ul>
      </div>
    </div>
    """
)

# SLIDE 7: MODULE 2 - LANDLORD & AGENT DASHBOARD
slide_7 = slide_chrome(
    "06 | Module 2: Lister Experience",
    "Landlord & Agent Partner Dashboard",
    "Partner Web & App",
    7, TOTAL_SLIDES,
    """
    <div class="cols-3">
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">01</span>Role Badging &amp; KYC</div>
        <ul class="big-list">
          <li>Distinct onboarding tracks for <strong>Direct Landlords</strong> and <strong>Verified Agents</strong>.</li>
          <li>Trust verification badges displayed prominently on every listing to boost seeker confidence.</li>
        </ul>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">02</span>Upload Studio</div>
        <ul class="big-list">
          <li>Fast mobile upload tool for apartment photos, video walkthroughs, and rental terms.</li>
          <li>Exact map pin placement and Ward/LGA tagging for precise buyer matching.</li>
        </ul>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">03</span>Commission Wallet</div>
        <ul class="big-list">
          <li>Automatic revenue credit into lister wallet every time a seeker unlocks their location.</li>
          <li>Real-time earnings tracking with one-tap bank withdrawals to Nigerian accounts.</li>
        </ul>
      </div>
    </div>
    """
)

# SLIDE 8: MODULE 3 - MASTER ADMIN MODERATION
slide_8 = slide_chrome(
    "07 | Module 3: Master Admin Console",
    "Moderation, Dynamic Pricing & Anti-Fraud Governance",
    "Platform Operations",
    8, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">01</span>Listing Pre-Approval Queue</div>
        <div class="big-text">
          Zero unvetted listings go live. Admin team reviews every property upload, verifying title claims, photos, and lister identity before public publishing.
        </div>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">02</span>Dynamic Pricing &amp; Revenue Splits</div>
        <div class="big-text">
          Adjust location unlock credit prices (e.g., ₦100/unlock) and modify partner revenue split percentages (e.g., 50/50 or 70/30) at any time from the dashboard.
        </div>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">03</span>Anti-Fraud &amp; Penalty Controls</div>
        <div class="big-text">
          Seekers can flag fake or rented units. Admin tools allow instant agent suspension, automatic penalty wallet deductions, and credit refunds to seekers.
        </div>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">04</span>Financial &amp; Payout Ledger</div>
        <div class="big-text">
          Monitor total platform revenue across states and LGAs, review automated commission deductions, and approve partner withdrawal payouts in batches.
        </div>
      </div>
    </div>
    """
)

# SLIDE 9: TECHNICAL ARCHITECTURE
slide_9 = slide_chrome(
    "08 | Technical Architecture",
    "Cross-Platform Engineering & Modern Cloud Stack",
    "Technology Stack",
    9, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">Mobile</span>React Native (Expo)</div>
        <div class="big-text">
          Single clean codebase compiled for both <strong>Android</strong> (<code>.apk</code> / <code>.aab</code>) and <strong>iOS</strong> (<code>.ipa</code>) with native geolocation, interactive map pins, and smooth offline caching.
        </div>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">Web</span>Next.js 15 (React) + Tailwind</div>
        <div class="big-text">
          Fast, mobile-responsive web marketplace and administrative console optimized for search engine indexing (SEO) and low-data mobile connections.
        </div>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">Backend</span>Node.js (NestJS) on Railway</div>
        <div class="big-text">
          High-performance API handling automated wallet credit deductions, double-entry revenue splits, withdrawal queues, and role permissions.
        </div>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">Data</span>PostgreSQL + Cloudflare R2</div>
        <div class="big-text">
          <strong>PostgreSQL</strong> relational database for strict transactional financial integrity paired with <strong>Cloudflare R2</strong> for zero-egress property photo storage.
        </div>
      </div>
    </div>
    """
)

# SLIDE 10: THIRD-PARTY OPERATIONAL COSTS
slide_10 = slide_chrome(
    "09 | Operational Infrastructure Costs",
    "Running & Cloud Infrastructure Fees (Paid Direct by Client)",
    "Infrastructure Budget",
    10, TOTAL_SLIDES,
    """
    <table>
      <thead>
        <tr>
          <th style="width: 32%;">Infrastructure / Service Provider</th>
          <th style="width: 42%;">Operational Purpose</th>
          <th style="width: 26%;">Estimated Initial Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Cloud Application Server &amp; DB (Railway)</strong></td>
          <td>Runs NestJS backend API, PostgreSQL DB &amp; background tasks</td>
          <td><strong>$10.00 - $20.00 / month</strong></td>
        </tr>
        <tr>
          <td><strong>Property Media Storage (Cloudflare R2)</strong></td>
          <td>High-resolution property photos with zero egress bandwidth fees</td>
          <td><strong>Free tier / ~$5.00 / month</strong></td>
        </tr>
        <tr>
          <td><strong>Payment Gateway (Paystack / Moniepoint)</strong></td>
          <td>In-app wallet funding via Card, Bank Transfer, and USSD</td>
          <td><strong>1.5% capped local processing fee</strong></td>
        </tr>
        <tr>
          <td><strong>SMS OTP &amp; Alerts (Termii)</strong></td>
          <td>Seeker and lister phone verification and instant alerts</td>
          <td><strong>Pay-as-you-go (~₦5.00 / SMS)</strong></td>
        </tr>
        <tr>
          <td><strong>Custom Domain &amp; SSL (Cloudflare)</strong></td>
          <td>Brand domain name (.com or .ng) with global CDN &amp; SSL</td>
          <td><strong>~$15.00 - $25.00 / year</strong></td>
        </tr>
        <tr>
          <td><strong>Google Play Developer Account</strong></td>
          <td>One-time Android publishing registration fee to Google</td>
          <td><strong>$25.00 (One-off payment)</strong></td>
        </tr>
        <tr>
          <td><strong>Apple Developer Program (Optional)</strong></td>
          <td>Annual iOS publishing account fee paid directly to Apple</td>
          <td><strong>$99.00 / year (Paid to Apple)</strong></td>
        </tr>
      </tbody>
    </table>
    """
)

# SLIDE 11: COMMERCIAL INVESTMENT & MILESTONES
slide_11 = slide_chrome(
    "10 | Commercial Investment",
    "Milestone Payment Structure & Pricing (₦850,000)",
    "Investment: ₦850,000",
    11, TOTAL_SLIDES,
    """
    <div class="callout">
      <strong>Total Development Investment:</strong> <strong>₦850,000 (Eight Hundred and Fifty Thousand Naira)</strong> &nbsp;|&nbsp; <strong>Project Delivery Timeline:</strong> <strong>5 Weeks</strong>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Milestone Stage</th>
          <th style="width: 55%;">Triggering Deliverables</th>
          <th style="width: 20%;">Payment Due</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1. Mobilization Deposit</strong></td>
          <td>Agreement signing. Covers React Native Expo environment setup, database schema design, and complete UI/UX interface layouts for mobile app, web marketplace, and admin console.</td>
          <td><strong style="color:var(--emerald-dark); font-size:15px;">50% (₦425,000)</strong></td>
        </tr>
        <tr>
          <td><strong>2. Functional Staging</strong></td>
          <td>Delivery of live location search funnel, listing upload studio, credit wallet funding, ₦100 unlock unmasking logic, and agent commission splits on staging.</td>
          <td><strong style="color:var(--emerald-dark); font-size:15px;">30% (₦255,000)</strong></td>
        </tr>
        <tr>
          <td><strong>3. Production Go-Live</strong></td>
          <td>Delivery of production-ready Android/iOS app builds, live deployment of the web marketplace, custom domain configuration, and administrative handover.</td>
          <td><strong style="color:var(--emerald-dark); font-size:15px;">20% (₦170,000)</strong></td>
        </tr>
      </tbody>
    </table>
    """
)

# SLIDE 12: 5-WEEK ROADMAP & ANTI-ABANDONMENT
slide_12 = slide_chrome(
    "11 | Execution Roadmap",
    "5-Week Weekly Staging Plan & Anti-Abandonment Guarantee",
    "Delivery Plan",
    12, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">5 Wks</span>Weekly Milestone Roadmap</div>
        <ul class="big-list">
          <li><strong>Week 1:</strong> Architecture, DB Schema &amp; Figma UI/UX Blueprint Sign-Off.</li>
          <li><strong>Week 2:</strong> State &rarr; LGA &rarr; Ward Funnel &amp; Listing Upload on Staging.</li>
          <li><strong>Week 3:</strong> Paystack Wallet &amp; ₦100 Unlock Commission Split Engine.</li>
          <li><strong>Week 4:</strong> Anti-Fraud Dispute System &amp; React Native Mobile Staging Builds.</li>
          <li><strong>Week 5:</strong> End-to-End QA, Production Cloud Launch &amp; Store Packaging.</li>
        </ul>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">✓</span>Anti-Abandonment Commitment</div>
        <ul class="big-list">
          <li><strong>Weekly Live Staging Deployments:</strong> Test actual working software every week before releasing subsequent milestone funds.</li>
          <li><strong>Zero Milestone Blindness:</strong> You verify location filtering, listing uploads, and wallet deductions in real time.</li>
          <li><strong>Guaranteed Dedicated Engineering:</strong> Continuous technical execution until full production go-live.</li>
        </ul>
      </div>
    </div>
    """
)

# SLIDE 13: WARRANTY, HANDOVER & SIGN-OFF
slide_13 = slide_chrome(
    "12 | Warranty & Acceptance",
    "60-Day Support, Administrative Handover & Project Authorization",
    "Next Steps",
    13, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">60 Days</span>Post-Launch Warranty</div>
        <ul class="big-list">
          <li><strong>Complimentary Technical Support:</strong> 60 days covering bug fixes, wallet split calculation checks, and cloud monitoring.</li>
          <li><strong>Zero Additional Labor Cost:</strong> Prompt resolution of any functional anomalies post-launch.</li>
        </ul>
      </div>
      <div class="card card-emerald">
        <div class="card-title"><span class="badge-num">Admin</span>Full Team Handover</div>
        <ul class="big-list">
          <li><strong>Super-Admin Credentials:</strong> Full master ownership of database, cloud hosting, and payment gateways from Day One.</li>
          <li><strong>Documentation &amp; Training:</strong> Step-by-step administrative guides for moderation and wallet management.</li>
        </ul>
      </div>
    </div>

    <div class="card" style="padding: 5.5mm 7mm;">
      <div class="card-title" style="margin-bottom: 4mm; text-transform: uppercase; font-size: 14px; letter-spacing: 0.5px;">Formal Proposal Acceptance &amp; Project Authorization (₦850,000)</div>
      <div class="cols-2" style="gap: 18mm;">
        <div>
          <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; margin-bottom: 10mm;">For: Sales Cowboy Marketing Solutions</div>
          <div style="border-bottom: 1.5px solid var(--navy); margin-bottom: 5px;"></div>
          <div style="font-size: 13px; font-weight: 800; color: var(--navy);">Lead Systems Architect | Date</div>
        </div>
        <div>
          <div style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; margin-bottom: 10mm;">For: Marketplace Project Sponsor</div>
          <div style="border-bottom: 1.5px solid var(--navy); margin-bottom: 5px;"></div>
          <div style="font-size: 13px; font-weight: 800; color: var(--navy);">Authorized Representative | Date</div>
        </div>
      </div>
    </div>
    """
)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Real Estate Marketplace &amp; Pay-Per-Location Unlock Platform - Sales Cowboy Marketing Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
{css}
  </style>
</head>
<body>

  <div class="toolbar">
    <div class="toolbar-title">Smart Real Estate Marketplace | Pay-Per-Location Unlock Platform Deck (16:9)</div>
    <div class="toolbar-actions">
      <button class="btn btn-emerald" onclick="window.print()">Print / Save Slide PDF</button>
      <a href="/Smart-Real-Estate-Pay-Per-Location-Unlock-Proposal.pdf" class="btn" download>Download Slide PDF</a>
    </div>
  </div>

  {slide_1}
  {slide_2}
  {slide_3}
  {slide_4}
  {slide_5}
  {slide_6}
  {slide_7}
  {slide_8}
  {slide_9}
  {slide_10}
  {slide_11}
  {slide_12}
  {slide_13}

</body>
</html>
"""

html_name = "9-smart-real-estate-marketplace-slide-deck.html"
pdf_name = "Smart-Real-Estate-Pay-Per-Location-Unlock-Proposal.pdf"

html_out = os.path.join(base_dir, html_name)
with open(html_out, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"[OK] Written Slide HTML: {html_out}")

pdf_out = os.path.join(base_dir, pdf_name)
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
print(f"[OK] Compiled Landscape Slide PDF: {pdf_out}")

shutil.copy2(pdf_out, os.path.join(public_dir, pdf_name))
if os.path.exists(out_dir):
    shutil.copy2(pdf_out, os.path.join(out_dir, pdf_name))
print(f"[OK] Copied {pdf_name} to public and out")

doc = fitz.open(pdf_out)
print(f"[VERIFY] {pdf_name}: {len(doc)} slides (pages)")
for idx, pg in enumerate(doc):
    r = pg.rect
    txt = pg.get_text().strip()
    first = txt.splitlines()[0] if txt else ""
    print(f"  Slide {idx+1}: {r.width:.0f}x{r.height:.0f}pt | {len(txt)} chars | {first[:55]}")

full = " ".join(p.get_text() for p in doc)
print("  Has Trade Infrastructure:", "Trade Infrastructure" in full)
print("  Has Sales Cowboy MS:", "Sales Cowboy Marketing Solutions" in full)
print("  Has 850,000:", "850,000" in full)
print("  Has em/en dash:", "\u2014" in full or "\u2013" in full)
