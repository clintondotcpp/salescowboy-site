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
      --accent: #D97706;
      --accent-dark: #B45309;
      --accent-bg: #FFFBEB;
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

    .btn-accent {
      background: var(--accent-dark);
      border-color: var(--accent);
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
      background: linear-gradient(135deg, #090E1A 0%, #0F172A 60%, #1E293B 100%);
      color: #FFFFFF;
      padding: 18mm 22mm;
    }

    .cover-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(217, 119, 6, 0.35);
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
      color: #FBBF24;
      font-weight: 500;
    }

    .cover-pill {
      background: rgba(217, 119, 6, 0.18);
      border: 1px solid #FBBF24;
      color: #FBBF24;
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
      color: #FBBF24;
      margin-bottom: 5mm;
    }

    .cover-title {
      font-size: 40px;
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
      border-top: 1px solid rgba(217, 119, 6, 0.35);
      padding-top: 6mm;
    }

    .cf-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #FBBF24;
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
      border-bottom: 3.5px solid var(--accent);
    }

    .sh-kicker {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.3px;
      color: #FBBF24;
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
      border: 1px solid rgba(251, 191, 36, 0.45);
      color: #FBBF24;
      font-size: 12px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 5px;
    }

    .slide-body {
      padding: 8mm 16mm 6mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6mm;
    }

    .slide-footer {
      padding: 4mm 16mm;
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
      gap: 7mm;
    }

    .cols-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6mm;
    }

    .cols-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5.5mm;
    }

    .card {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 9px;
      padding: 6.5mm 7mm;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .card-accent {
      border-top: 4px solid var(--accent);
    }

    .card-title {
      font-size: 17px;
      font-weight: 800;
      color: var(--navy);
      margin-bottom: 3.5mm;
      line-height: 1.25;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .badge-num {
      background: var(--navy);
      color: #FBBF24;
      font-size: 12px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 4px;
    }

    .big-text {
      font-size: 15px;
      line-height: 1.55;
      color: var(--slate);
    }

    .big-list {
      list-style: none;
      padding: 0;
    }

    .big-list li {
      font-size: 14.5px;
      line-height: 1.5;
      color: var(--slate);
      margin-bottom: 3mm;
      padding-left: 16px;
      position: relative;
    }

    .big-list li:last-child {
      margin-bottom: 0;
    }

    .big-list li::before {
      content: "▪";
      position: absolute;
      left: 0;
      color: var(--accent);
      font-weight: 900;
      font-size: 16px;
    }

    /* Metric Stat Cards */
    .stat-box {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-left: 5px solid var(--accent);
      border-radius: 8px;
      padding: 6mm 6.5mm;
    }

    .stat-num {
      font-size: 28px;
      font-weight: 900;
      color: var(--navy);
      line-height: 1.1;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--accent-dark);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-sub {
      font-size: 13px;
      color: var(--muted);
      margin-top: 5px;
      line-height: 1.4;
    }

    /* Visual Process Flow */
    .flow-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      background: #F1F5F9;
      padding: 4.5mm 5.5mm;
      border-radius: 8px;
      border: 1px solid #CBD5E1;
    }

    .flow-node {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-top: 3px solid var(--navy);
      border-radius: 6px;
      padding: 10px 10px;
      text-align: center;
      flex: 1;
      font-size: 13.5px;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.3;
    }

    .flow-arr {
      font-size: 18px;
      font-weight: 900;
      color: var(--accent-dark);
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      background: #FFFFFF;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
    }

    th {
      background: var(--navy);
      color: #FFFFFF;
      text-align: left;
      padding: 3.8mm 5mm;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    td {
      padding: 3.4mm 5mm;
      font-size: 13.5px;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
      line-height: 1.4;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .callout {
      background: var(--accent-bg);
      border: 1px solid #FCD34D;
      border-left: 5px solid var(--accent-dark);
      padding: 4.5mm 6mm;
      border-radius: 7px;
      font-size: 14.5px;
      color: #78350F;
      line-height: 1.5;
    }

    .callout strong {
      color: var(--navy);
    }

    code {
      font-family: ui-monospace, monospace;
      background: #E2E8F0;
      padding: 1px 5px;
      border-radius: 4px;
      font-size: 12.5px;
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
        <span>Sales Cowboy Marketing Solutions | Multi-Vendor E-Commerce Marketplace Proposal</span>
      </div>
      <div class="sf-page">Slide {page_num:02d} / {total_pages:02d}</div>
    </div>
  </section>
"""

TOTAL_SLIDES = 11

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
      <div class="cover-pill">Commercial Product Proposal</div>
    </div>

    <div class="cover-main">
      <div class="cover-kicker">End-to-End Multi-Vendor Retail Ecosystem</div>
      <div class="cover-title">Multi-Vendor E-Commerce &amp;<br>Retail Marketplace Platform</div>
      <div class="cover-desc">
        Cross-Platform Customer Mobile Apps (Android &amp; iOS via React Native / Expo), Responsive Web Storefront (Next.js), Vendor Portal &amp; Central Master Admin Desk.
      </div>
    </div>

    <div class="cover-footer">
      <div>
        <div class="cf-label">Prepared By</div>
        <div class="cf-val">Sales Cowboy Marketing Solutions</div>
      </div>
      <div>
        <div class="cf-label">Total Development Investment</div>
        <div class="cf-val" style="color: #FBBF24;">₦850,000 (50/30/20 Milestones)</div>
      </div>
      <div>
        <div class="cf-label">Delivery Timeline</div>
        <div class="cf-val">4 to 5 Weeks</div>
      </div>
      <div>
        <div class="cf-label">Reference &amp; Date</div>
        <div class="cf-val">SC-2026-NOV-008 | Nov 11, 2026</div>
      </div>
    </div>
  </section>
"""

# SLIDE 2: PROJECT OBJECTIVE & MARKETPLACE VISION
slide_2 = slide_chrome(
    "01 | Project Objective",
    "Building a Jumia-Grade Multi-Vendor Retail Marketplace",
    "Ecosystem Overview",
    2, TOTAL_SLIDES,
    """
    <div class="callout">
      <strong>Core Objective:</strong> To build an end-to-end multi-vendor e-commerce marketplace where independent third-party merchants register, list inventory, and fulfill customer orders, while buyers shop effortlessly across Android, iOS, and Web.
    </div>
    <div class="cols-4">
      <div class="stat-box">
        <div class="stat-num">4 Apps</div>
        <div class="stat-label">Platform Surfaces</div>
        <div class="stat-sub">Customer iOS &amp; Android App, Web Storefront, Vendor Portal &amp; Admin Console.</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">Multi-Cart</div>
        <div class="stat-label">Unified Checkout</div>
        <div class="stat-sub">Buyers purchase from multiple distinct merchants in one single transaction.</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">Auto-Split</div>
        <div class="stat-label">Commission Engine</div>
        <div class="stat-sub">Dynamic category percentages deducted cleanly before vendor payouts.</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">₦850k</div>
        <div class="stat-label">Total Investment</div>
        <div class="stat-sub">Complete turnkey delivery within 4 to 5 weeks from mobilization.</div>
      </div>
    </div>
    """
)

# SLIDE 3: MODULE 1 (PART A) - CUSTOMER DISCOVERY & PRODUCT EXPERIENCE
slide_3 = slide_chrome(
    "02 | Module 1: Customer Storefront (Part A)",
    "Product Discovery, Smart Search & Rich Detail Pages",
    "Web & React Native App",
    3, TOTAL_SLIDES,
    """
    <div class="cols-3">
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">01</span>Multi-Level Categories</div>
        <ul class="big-list">
          <li>Browse organized departments (Electronics, Fashion, Home &amp; Living, Groceries, Beauty).</li>
          <li>Dynamic side filters for brand, price band, availability, and customer rating.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">02</span>Smart Autocomplete Search</div>
        <ul class="big-list">
          <li>Real-time instant search bar with typo-tolerant keyword matching.</li>
          <li>Displays recent search history and trending product suggestions automatically.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">03</span>Product Detail Desk</div>
        <ul class="big-list">
          <li>High-res multi-image gallery with interactive size, color &amp; spec selectors.</li>
          <li>Live stock indicator, verified customer reviews, and merchant storefront badge.</li>
        </ul>
      </div>
    </div>
    """
)

# SLIDE 4: MODULE 1 (PART B) - CART, PAYMENTS & ORDER TRACKING
slide_4 = slide_chrome(
    "03 | Module 1: Customer Storefront (Part B)",
    "Unified Multi-Vendor Checkout, Local Payments & Tracking",
    "Buyer Conversion",
    4, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">04</span>Unified Cart &amp; Promo Engine</div>
        <ul class="big-list">
          <li>Combine products from multiple separate vendors inside a single unified shopping cart.</li>
          <li>Saved delivery address book with auto-calculated shipping fees and coupon code discounts.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">05</span>Local Payments &amp; User Accounts</div>
        <ul class="big-list">
          <li>Seamless checkout via <strong>Paystack, Moniepoint &amp; Flutterwave</strong> (Cards, Bank Transfer, USSD).</li>
          <li>Full buyer account history, PDF invoice downloads, wishlists, and product rating submissions.</li>
        </ul>
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom: 3mm;"><span class="badge-num">06</span>4-Stage Visual Order Lifecycle Tracking</div>
      <div class="flow-wrap">
        <div class="flow-node">1. Order Placed</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">2. Confirmed by Vendor</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">3. Shipped / En Route</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">4. Delivered</div>
      </div>
    </div>
    """
)

# SLIDE 5: MODULE 2 (PART A) - MERCHANT ONBOARDING & CATALOG
slide_5 = slide_chrome(
    "04 | Module 2: Merchant & Vendor Portal (Part A)",
    "Seller KYC Onboarding & Inventory Catalog Manager",
    "Vendor Web / PWA",
    5, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">01</span>Merchant Onboarding &amp; KYC</div>
        <ul class="big-list">
          <li>Self-service merchant registration capturing business profile and contact verification.</li>
          <li>Dedicated storefront banner branding and verified Nigerian bank payout account setup.</li>
          <li>Clear onboarding checklist guiding vendors from sign-up to verified store activation.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">02</span>Product &amp; Inventory Manager</div>
        <ul class="big-list">
          <li>Create, edit, and categorize products with SKU codes, pricing, discount tags, and live stock counts.</li>
          <li>Automated image resizing and compression during upload for ultra-fast mobile storefront loading.</li>
          <li>Low-stock alerts helping vendors replenish top sellers before stockouts occur.</li>
        </ul>
      </div>
    </div>
    """
)

# SLIDE 6: MODULE 2 (PART B) - VENDOR FULFILLMENT & PAYOUT LEDGER
slide_6 = slide_chrome(
    "05 | Module 2: Merchant & Vendor Portal (Part B)",
    "Real-Time Order Fulfillment & Vendor Financial Ledger",
    "Seller Operations",
    6, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">03</span>Order Processing &amp; Fulfillment</div>
        <ul class="big-list">
          <li><strong>Audible Order Alerts:</strong> Instant sound and dashboard alerts whenever a new customer order lands.</li>
          <li><strong>Step-by-Step Fulfillment:</strong> Vendors advance sub-orders cleanly through <code>Package Order</code>, <code>Ready for Dispatch</code>, and <code>Dispatched</code>.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">04</span>Financial Ledger &amp; Payouts</div>
        <ul class="big-list">
          <li><strong>Transparent Earnings View:</strong> Real-time ledger of gross sales, platform commission deductions, and net withdrawable balance.</li>
          <li><strong>One-Tap Bank Payouts:</strong> Vendors request instant settlement transfers straight to their verified commercial bank account.</li>
        </ul>
      </div>
    </div>
    """
)

# SLIDE 7: MODULE 3 - MASTER ADMIN OPERATIONS & GOVERNANCE
slide_7 = slide_chrome(
    "06 | Module 3: Master Admin Operations Desk",
    "Complete Marketplace Control, Commissions & Analytics",
    "Platform Owner Console",
    7, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">01</span>Merchant Governance &amp; Moderation</div>
        <ul class="big-list">
          <li>Review, approve, audit, or suspend vendor stores before they sell publicly.</li>
          <li>Global product moderation queue to inspect listings and remove prohibited goods.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">02</span>Dynamic Commission &amp; Batch Payouts</div>
        <ul class="big-list">
          <li>Set custom percentage rates per category (e.g., 5% Electronics, 15% Fashion).</li>
          <li>Automated revenue splits and streamlined batch vendor payout approvals.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">03</span>Promotions &amp; Banner Manager</div>
        <ul class="big-list">
          <li>Configure homepage hero sliders, flash sales, and featured categories with zero code changes.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">04</span>GMV &amp; Executive Analytics</div>
        <ul class="big-list">
          <li>Live visibility into Gross Merchandise Value (GMV), net earnings, daily orders, and top items.</li>
        </ul>
      </div>
    </div>
    """
)

# SLIDE 8: PROPOSED TECHNICAL ARCHITECTURE
slide_8 = slide_chrome(
    "07 | Technical Architecture",
    "Modern Scalable Engineering Stack (Mobile, Web & API)",
    "Technology Stack",
    8, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">Mobile</span>React Native (Expo)</div>
        <div class="big-text">
          Compiled into native binaries for <strong>Google Android</strong> (<code>.apk</code> / <code>.aab</code>) and <strong>Apple iOS</strong> (<code>.ipa</code>), delivering smooth native shopping, push notifications, and fast image caching.
        </div>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">Web</span>Next.js 15 + Tailwind CSS</div>
        <div class="big-text">
          Powers the SEO-optimized Customer Web Storefront, responsive Vendor Portal, and Master Admin Console with sub-second page transitions.
        </div>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">Backend</span>Node.js (NestJS) API</div>
        <div class="big-text">
          Cloud-hosted order state machine managing multi-vendor cart splitting, payment gateway webhooks, commission math, and payout queues.
        </div>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">Data</span>PostgreSQL + Cloudflare R2</div>
        <div class="big-text">
          Transactional <strong>PostgreSQL</strong> for strict double-entry financial records paired with <strong>Cloudflare R2</strong> for fast, zero-egress product media hosting.
        </div>
      </div>
    </div>
    """
)

# SLIDE 9: THIRD-PARTY INFRASTRUCTURE & OPERATIONAL COSTS
slide_9 = slide_chrome(
    "08 | Third-Party Operational Costs",
    "Running & Infrastructure Fees (Paid Direct by Client)",
    "Operational Budget",
    9, TOTAL_SLIDES,
    """
    <table>
      <thead>
        <tr>
          <th style="width: 31%;">Infrastructure / Service Provider</th>
          <th style="width: 43%;">Operational Purpose</th>
          <th style="width: 26%;">Estimated Initial Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Cloud Server &amp; Database (Railway)</strong></td>
          <td>Runs NestJS backend API, PostgreSQL DB &amp; background queues</td>
          <td><strong>$10.00 - $20.00 / month</strong></td>
        </tr>
        <tr>
          <td><strong>Product Media Storage (Cloudflare R2)</strong></td>
          <td>High-resolution product catalogs with zero egress fees</td>
          <td><strong>Free tier / ~$5.00 / month</strong></td>
        </tr>
        <tr>
          <td><strong>Payment Gateway (Paystack / Moniepoint)</strong></td>
          <td>In-app local card, USSD &amp; bank transfer settlement</td>
          <td><strong>1.5% capped processing fee</strong></td>
        </tr>
        <tr>
          <td><strong>SMS OTP &amp; Alerts (Termii)</strong></td>
          <td>Customer &amp; vendor phone verification and order notices</td>
          <td><strong>Pay-as-you-go (~₦5.00 / SMS)</strong></td>
        </tr>
        <tr>
          <td><strong>Custom Domain &amp; SSL (Cloudflare)</strong></td>
          <td>Brand domain name (.com or .ng) with CDN &amp; SSL security</td>
          <td><strong>~$15.00 - $25.00 / year</strong></td>
        </tr>
        <tr>
          <td><strong>Google Play Developer Account</strong></td>
          <td>One-time Android app store publishing registration</td>
          <td><strong>$25.00 (One-off fee)</strong></td>
        </tr>
        <tr>
          <td><strong>Apple Developer Program (Optional)</strong></td>
          <td>Annual Apple account for direct iOS App Store release</td>
          <td><strong>$99.00 / year (Paid to Apple)</strong></td>
        </tr>
      </tbody>
    </table>
    """
)

# SLIDE 10: COMMERCIAL INVESTMENT & MILESTONE SCHEDULE
slide_10 = slide_chrome(
    "09 | Commercial Investment",
    "Development Pricing & 50 / 30 / 20 Milestone Schedule",
    "Investment: ₦850,000",
    10, TOTAL_SLIDES,
    """
    <div class="callout">
      <strong>Total Development Investment:</strong> <strong>₦850,000 (Eight Hundred and Fifty Thousand Naira)</strong> &nbsp;|&nbsp; <strong>Project Delivery Timeline:</strong> <strong>4 to 5 Weeks</strong>
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
          <td>Agreement signing. Covers React Native Expo setup, database schema design, and complete UI/UX layouts for mobile app, web storefront &amp; admin console.</td>
          <td><strong style="color:var(--accent-dark); font-size:15px;">50% (₦425,000)</strong></td>
        </tr>
        <tr>
          <td><strong>2. Functional Staging</strong></td>
          <td>Delivery of live customer catalog, multi-vendor cart checkout, payment gateway integration, vendor dashboard, and order state transitions on staging.</td>
          <td><strong style="color:var(--accent-dark); font-size:15px;">30% (₦255,000)</strong></td>
        </tr>
        <tr>
          <td><strong>3. Production Go-Live</strong></td>
          <td>Production Android &amp; iOS app builds, live web storefront deployment, custom domain configuration, and complete administrative handover.</td>
          <td><strong style="color:var(--accent-dark); font-size:15px;">20% (₦170,000)</strong></td>
        </tr>
      </tbody>
    </table>
    """
)

# SLIDE 11: DELIVERY TIMELINE, WARRANTY & SIGN-OFF
slide_11 = slide_chrome(
    "10 | Delivery, Warranty & Acceptance",
    "Execution Roadmap, Post-Launch Support & Project Authorization",
    "Next Steps",
    11, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">4 - 5 Wks</span>Execution Roadmap</div>
        <ul class="big-list">
          <li><strong>Week 1:</strong> Architecture, DB Schema &amp; UI/UX Wireframe Sign-Off.</li>
          <li><strong>Weeks 2-3:</strong> Storefront, Vendor Portal &amp; React Native Staging Builds.</li>
          <li><strong>Weeks 4-5:</strong> Payment Gateway QA, Store Packaging &amp; Go-Live Launch.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="card-title"><span class="badge-num">30 Days</span>Post-Launch Warranty &amp; Handover</div>
        <ul class="big-list">
          <li><strong>Complimentary Technical Warranty:</strong> 30 days covering bug fixes, commission math verification, and staff onboarding.</li>
          <li><strong>Full Handover:</strong> Master admin credentials, documentation &amp; team training.</li>
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
  <title>Multi-Vendor E-Commerce &amp; Retail Marketplace Platform - Sales Cowboy Marketing Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
{css}
  </style>
</head>
<body>

  <div class="toolbar">
    <div class="toolbar-title">Multi-Vendor E-Commerce Marketplace Platform | Presentation Slide Deck (16:9)</div>
    <div class="toolbar-actions">
      <button class="btn btn-accent" onclick="window.print()">Print / Save Slide PDF</button>
      <a href="/Multi-Vendor-Ecommerce-Marketplace-Proposal.pdf" class="btn" download>Download Slide PDF</a>
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

</body>
</html>
"""

html_name = "8-multivendor-ecommerce-slide-deck.html"
pdf_name = "Multi-Vendor-Ecommerce-Marketplace-Proposal.pdf"

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
