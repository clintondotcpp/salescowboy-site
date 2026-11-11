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
      --navy: #0A192F;
      --navy-light: #112240;
      --gold: #C5A880;
      --gold-dark: #9A7B4F;
      --gold-bg: #FBF7F0;
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
      background: #112240;
      padding: 12px 20px;
      border-radius: 8px;
      border: 1px solid #233554;
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
      background: #0A192F;
      color: #F8FAFC;
      border: 1px solid #475569;
      padding: 7px 15px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;
    }

    .btn-gold {
      background: var(--gold-dark);
      border-color: var(--gold);
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
      background: linear-gradient(135deg, #071120 0%, #0A192F 60%, #112240 100%);
      color: #FFFFFF;
      padding: 18mm 22mm;
    }

    .cover-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(197, 168, 128, 0.3);
      padding-bottom: 6mm;
    }

    .cover-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cover-brand img {
      height: 46px;
      background: #FFFFFF;
      padding: 4px 7px;
      border-radius: 6px;
    }

    .cover-brand-name {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #FFFFFF;
      text-transform: uppercase;
    }

    .cover-brand-sub {
      font-size: 11px;
      color: var(--gold);
      font-weight: 500;
    }

    .cover-pill {
      background: rgba(197, 168, 128, 0.15);
      border: 1px solid var(--gold);
      color: var(--gold);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .cover-main {
      margin: auto 0;
      max-width: 88%;
    }

    .cover-kicker {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--gold);
      margin-bottom: 5mm;
    }

    .cover-title {
      font-size: 38px;
      font-weight: 900;
      line-height: 1.15;
      color: #FFFFFF;
      margin-bottom: 5mm;
      letter-spacing: -0.5px;
    }

    .cover-desc {
      font-size: 15.5px;
      color: #CBD5E1;
      line-height: 1.5;
      max-width: 85%;
    }

    .cover-footer {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      border-top: 1px solid rgba(197, 168, 128, 0.3);
      padding-top: 6mm;
    }

    .cf-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--gold);
      font-weight: 700;
      margin-bottom: 2px;
    }

    .cf-val {
      font-size: 13.5px;
      font-weight: 700;
      color: #FFFFFF;
    }

    /* Standard Content Slide Chrome */
    .slide-header {
      background: var(--navy);
      color: #FFFFFF;
      padding: 6mm 14mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid var(--gold);
    }

    .sh-left {
      display: flex;
      flex-direction: column;
    }

    .sh-kicker {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: var(--gold);
    }

    .sh-title {
      font-size: 21px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.2px;
    }

    .sh-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .sh-tag {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(197,168,128,0.4);
      color: var(--gold);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
    }

    .slide-body {
      padding: 7mm 14mm 5mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4.5mm;
    }

    .slide-footer {
      padding: 3.5mm 14mm;
      background: #FFFFFF;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10.5px;
      color: var(--muted);
    }

    .sf-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      color: var(--navy);
    }

    .sf-brand img {
      height: 18px;
    }

    .sf-page {
      font-weight: 800;
      color: var(--navy);
      background: #F1F5F9;
      padding: 2px 9px;
      border-radius: 4px;
    }

    /* Grids & Cards */
    .cols-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5mm;
    }

    .cols-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4.5mm;
    }

    .cols-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4mm;
    }

    .card {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 7px;
      padding: 4.5mm 5.5mm;
      box-shadow: 0 2px 6px rgba(10, 25, 47, 0.04);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .card-accent {
      border-top: 3px solid var(--gold);
    }

    .card-navy {
      background: var(--navy);
      color: #FFFFFF;
      border-color: var(--navy-light);
    }

    .q-head {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 2.5mm;
    }

    .q-badge {
      background: var(--navy);
      color: var(--gold);
      font-size: 10.5px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .q-title {
      font-size: 13px;
      font-weight: 800;
      color: var(--navy);
      line-height: 1.25;
    }

    .q-question {
      font-size: 11px;
      font-weight: 600;
      color: var(--gold-dark);
      margin-bottom: 2mm;
      font-style: italic;
    }

    .a-text {
      font-size: 11.5px;
      line-height: 1.45;
      color: var(--slate);
    }

    .a-list {
      list-style: none;
      padding: 0;
      margin-top: 1.5mm;
    }

    .a-list li {
      font-size: 11.2px;
      line-height: 1.4;
      color: var(--slate);
      margin-bottom: 1.5mm;
      padding-left: 12px;
      position: relative;
    }

    .a-list li::before {
      content: "▪";
      position: absolute;
      left: 0;
      color: var(--gold-dark);
      font-weight: 900;
    }

    /* Metric Boxes */
    .stat-box {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-left: 4px solid var(--gold);
      border-radius: 6px;
      padding: 4.5mm 5mm;
    }

    .stat-num {
      font-size: 24px;
      font-weight: 900;
      color: var(--navy);
      line-height: 1.1;
      margin-bottom: 2px;
    }

    .stat-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--gold-dark);
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .stat-sub {
      font-size: 10.5px;
      color: var(--muted);
      margin-top: 3px;
    }

    /* Flow Diagram */
    .flow-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      background: #F1F5F9;
      padding: 3.5mm 4.5mm;
      border-radius: 6px;
      border: 1px solid #CBD5E1;
    }

    .flow-node {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-top: 2px solid var(--navy);
      border-radius: 5px;
      padding: 6px 8px;
      text-align: center;
      flex: 1;
      font-size: 10.5px;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.25;
    }

    .flow-arr {
      font-size: 15px;
      font-weight: 900;
      color: var(--gold-dark);
    }

    /* Swatches */
    .swatches {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-top: 2mm;
    }

    .swatch {
      background: #F8FAFC;
      border: 1px solid var(--border);
      border-radius: 5px;
      padding: 5px 7px;
      font-size: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .swatch-box {
      width: 14px;
      height: 14px;
      border-radius: 3px;
      border: 1px solid rgba(0,0,0,0.15);
      flex-shrink: 0;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      background: #FFFFFF;
      border-radius: 7px;
      overflow: hidden;
      border: 1px solid var(--border);
    }

    th {
      background: var(--navy);
      color: #FFFFFF;
      text-align: left;
      padding: 3mm 4mm;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    td {
      padding: 2.8mm 4mm;
      font-size: 11.2px;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .price-callout {
      background: var(--gold-bg);
      border: 1px solid var(--gold);
      border-left: 5px solid var(--gold-dark);
      padding: 3.5mm 5mm;
      border-radius: 6px;
      font-size: 12px;
      color: #5C4422;
      line-height: 1.45;
    }

    .price-callout strong {
      color: var(--navy);
    }

    code {
      font-family: ui-monospace, monospace;
      background: #E2E8F0;
      padding: 1px 4px;
      border-radius: 3px;
      font-size: 10px;
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
        <span>Sales Cowboy Marketing Solutions | Prepared Exclusively for Ken-Saleem Consulting Limited</span>
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
          <div class="cover-brand-sub">Enterprise Digital & Software Development</div>
        </div>
      </div>
      <div class="cover-pill">Commercial Proposal & 31-Point Response</div>
    </div>

    <div class="cover-main">
      <div class="cover-kicker">Executive Digital Advisory Platform</div>
      <div class="cover-title">Ken-Saleem Consulting Limited:<br>Platform Proposal &amp; Pre-Approval Q&amp;A Deck</div>
      <div class="cover-desc">
        A high-conversion, edge-rendered Next.js 15 &amp; Headless CMS client acquisition engine designed for HNW corporate decision-makers, paired with clear answers to all 31 pre-approval questions, development-only pricing, and transparent hosting costs.
      </div>
    </div>

    <div class="cover-footer">
      <div>
        <div class="cf-label">Prepared For</div>
        <div class="cf-val">CEO, Ken-Saleem Consulting Ltd</div>
      </div>
      <div>
        <div class="cf-label">Development Investment</div>
        <div class="cf-val" style="color: var(--gold);">₦350,000 (Dev Cost Only)</div>
      </div>
      <div>
        <div class="cf-label">Delivery Timeline</div>
        <div class="cf-val">3 to 4 Weeks Turnkey</div>
      </div>
      <div>
        <div class="cf-label">Reference & Date</div>
        <div class="cf-val">SC-2026-NOV-007 | Nov 11, 2026</div>
      </div>
    </div>
  </section>
"""

# SLIDE 2: EXECUTIVE SUMMARY & PLATFORM PILLARS
slide_2 = slide_chrome(
    "01 | Executive Summary",
    "Not a Brochure: A High-Conversion Client Acquisition Engine",
    "Overview",
    2, TOTAL_SLIDES,
    """
    <div class="price-callout">
      <strong>Purpose of This Deck:</strong> Directly answers every technical, UX, security, SEO, and commercial question raised by Ken-Saleem Consulting Limited while presenting our simplified <strong>₦350,000 development-only commercial offer</strong> (with third-party hosting and domain accounts itemized separately under your corporate ownership).
    </div>
    <div class="cols-4">
      <div class="stat-box">
        <div class="stat-num">&lt; 1.2s</div>
        <div class="stat-label">4G Load Target</div>
        <div class="stat-sub">Static/Edge speed across MTN &amp; Airtel 4G with green Google Core Web Vitals.</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">90 Sec</div>
        <div class="stat-label">Conversion Funnel</div>
        <div class="stat-sub">Proof, practice clarity, lead qualification gate, Paystack payment &amp; Calendly slot.</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">100%</div>
        <div class="stat-label">Day-One Ownership</div>
        <div class="stat-sub">Domain, GitHub repo, CMS, hosting &amp; Figma files sit directly under your credentials.</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">₦350k</div>
        <div class="stat-label">Dev Investment Only</div>
        <div class="stat-sub">Covers UI/UX, build, CMS, security &amp; launch. Hosting &amp; domain billed direct at cost.</div>
      </div>
    </div>
    <div class="cols-3">
      <div class="card card-accent">
        <div class="q-title" style="margin-bottom: 4px;">Boardroom Authority Design</div>
        <div class="a-text">Editorial typography, intentional whitespace, and verifiable trust badges tailored for C-suite and HNW buyers rather than noisy agency templates.</div>
      </div>
      <div class="card card-accent">
        <div class="q-title" style="margin-bottom: 4px;">Automated Retainer Revenue</div>
        <div class="a-text">Qualified prospects pay consultation retainers via Paystack before unlocking Calendly calendar slots, protecting executive time from unqualified calls.</div>
      </div>
      <div class="card card-accent">
        <div class="q-title" style="margin-bottom: 4px;">Search &amp; AI Ready (SEO + GEO)</div>
        <div class="a-text">Full in-CMS SEO controls, JSON-LD corporate schema, and LLM-readable insight summaries for Google, ChatGPT Search, and Perplexity discovery.</div>
      </div>
    </div>
    """
)

# SLIDE 3: SECTION A - BUSINESS ALIGNMENT & CONVERSION (Q1 - Q4)
slide_3 = slide_chrome(
    "02 | Section A: Business Alignment & Conversion",
    "Turning High-Net-Worth Visitors Into Paid Retainers (Q1 - Q4)",
    "Questions 1 - 4",
    3, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q1</span><div class="q-title">How do you convert HNW visitors within 90 seconds?</div></div>
        <ul class="a-list">
          <li><strong>0-15s (Authority Proof):</strong> Hero states clear advisory positioning, regulatory credentials, and transaction volume advised.</li>
          <li><strong>15-45s (Outcome Alignment):</strong> Scannable practice areas (Strategy, Regulatory Risk, Capital Restructuring) without generic fluff.</li>
          <li><strong>45-90s (Gated Qualification):</strong> Primary CTA loads a fast qualification modal (Revenue, Scope, Budget) before checkout and booking.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q3 &amp; Q4</span><div class="q-title">How do we outclass 500 Lagos firms &amp; structure CTAs?</div></div>
        <ul class="a-list">
          <li><strong>Q3 (Design Psychology):</strong> "Restraint of Authority" with Financial Times / McKinsey editorial grids, real credentials, zero stock clutter.</li>
          <li><strong>Q4 Primary CTA:</strong> <em>"Book Advisory Session"</em> (header + sticky bar).</li>
          <li><strong>Q4 Secondary CTA:</strong> <em>"Download Industry Report"</em> (lead-captured).</li>
          <li><strong>Q4 Tertiary CTA:</strong> <em>"Executive WhatsApp Desk"</em> (pre-filled API routing).</li>
        </ul>
      </div>
    </div>
    <div class="card">
      <div class="q-head" style="margin-bottom: 3mm;"><span class="q-badge">Q2</span><div class="q-title">End-to-End Customer Journey Map (Search to Retainer Settlement)</div></div>
      <div class="flow-wrap">
        <div class="flow-node">1. Organic / AI Search Intent</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">2. Edge Landing Page (&lt;1.2s)</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">3. Practice Area Case Proof</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">4. Qualification Audit Gate</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">5. Paystack Retainer Payment</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">6. Calendly Slot + NDPA Memo</div>
      </div>
    </div>
    """
)

# SLIDE 4: SECTION B - DESIGN, UX & PERFORMANCE (Q5 - Q9)
slide_4 = slide_chrome(
    "03 | Section B: Design, UX & 2026 Performance",
    "Speed, Design System, Accessibility & Navigation Clarity (Q5 - Q9)",
    "Questions 5 - 9",
    4, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q5</span><div class="q-title">What Core Web Vitals &amp; mobile standards do you guarantee?</div></div>
        <ul class="a-list">
          <li><strong>Mobile-First Fluid Engineering:</strong> Built for smartphones first, scaling up seamlessly to executive desktop displays.</li>
          <li><strong>Contractual Green Metrics:</strong> LCP &le; <code>1.2s</code>, INP &le; <code>100ms</code>, and CLS &le; <code>0.05</code> (zero jarring visual shifts).</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q6</span><div class="q-title">How fast will pages load on Nigerian 4G networks?</div></div>
        <ul class="a-list">
          <li><strong>Target Speed:</strong> Under <strong>1.2 seconds</strong> on MTN &amp; Airtel 4G connections.</li>
          <li><strong>How We Achieve It:</strong> Next.js Static Generation (SSG/ISR), WebP/AVIF image compression, self-hosted fonts, and Cloudflare Edge caching.</li>
        </ul>
      </div>
    </div>
    <div class="card">
      <div class="q-head"><span class="q-badge">Q7</span><div class="q-title">What color palette, typography &amp; grid system will define the brand?</div></div>
      <div class="a-text">Editorial Serif Display headings (<em>Playfair Display / Cinzel</em>) paired with clean Neo-Grotesque body typography (<em>Inter</em>) over a 12-column responsive 8pt grid:</div>
      <div class="swatches">
        <div class="swatch"><span class="swatch-box" style="background:#0A192F;"></span>Oxford Navy (#0A192F) - Authority</div>
        <div class="swatch"><span class="swatch-box" style="background:#C5A880;"></span>Champagne Gold (#C5A880) - Wealth</div>
        <div class="swatch"><span class="swatch-box" style="background:#F8F9FA;"></span>Pearl White (#F8F9FA) - Clarity</div>
        <div class="swatch"><span class="swatch-box" style="background:#1E293B;"></span>Slate Charcoal (#1E293B) - Legibility</div>
      </div>
    </div>
    <div class="cols-2">
      <div class="card">
        <div class="q-head"><span class="q-badge">Q8</span><div class="q-title">Does the site meet WCAG 2.2 AA accessibility rules?</div></div>
        <div class="a-text">Yes. Semantic HTML5 markup, &ge; 4.5:1 text contrast ratios, full keyboard tab navigation, screen-reader ARIA labels, and zero intrusive auto-playing audio/video.</div>
      </div>
      <div class="card">
        <div class="q-head"><span class="q-badge">Q9</span><div class="q-title">How do you serve both quick visitors and analytical executives?</div></div>
        <div class="a-text">Dual-spectrum UX: plain-language navigation labels (<em>"What We Do"</em>, <em>"Speak to a Consultant"</em>) for rapid action, backed by downloadable executive research briefs.</div>
      </div>
    </div>
    """
)

# SLIDE 5: SECTION C - TECHNOLOGY & ARCHITECTURE (Q10 - Q14)
slide_5 = slide_chrome(
    "04 | Section C: Technology, Ownership & Reliability",
    "Enterprise Headless Stack & 100% Client Control (Q10 - Q14)",
    "Questions 10 - 14",
    5, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q10</span><div class="q-title">Why Headless Next.js 15 + Headless CMS vs WordPress/Webflow?</div></div>
        <ul class="a-list">
          <li><strong>No WordPress Risk:</strong> Eliminates plugin vulnerabilities, SQL hacks, and slow PHP database bottlenecks.</li>
          <li><strong>No Webflow Lock-in:</strong> Avoids rigid templates, recurring platform taxes, and restricted local payment webhooks.</li>
          <li><strong>Headless Advantage:</strong> Unmatched edge performance, zero exposed DB, full API extensibility, and 5-year modular scalability.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q11 &amp; Q12</span><div class="q-title">Who owns accounts, and what is the Uptime SLA &amp; Backup plan?</div></div>
        <ul class="a-list">
          <li><strong>Q11 (100% Ownership):</strong> Domain, hosting, CMS, GitHub repo, and Figma files are registered directly under Ken-Saleem credentials from Day One.</li>
          <li><strong>Q12 (SLA &amp; Backups):</strong> Hosted across 300+ Cloudflare/Vercel Edge nodes with <strong>99.99% Uptime SLA</strong> + automated daily immutable S3 backups (&lt;15m RTO).</li>
        </ul>
      </div>
    </div>
    <div class="card">
      <div class="q-head" style="margin-bottom: 2.5mm;"><span class="q-badge">Q13</span><div class="q-title">How are updates deployed safely without risking the live production site?</div></div>
      <div class="flow-wrap">
        <div class="flow-node">1. Local Git Branching</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">2. Staging URL (staging.ken-saleem.com)</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">3. Client QA Approval</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">4. Automated Zero-Downtime Push</div>
      </div>
    </div>
    <div class="card">
      <div class="q-head"><span class="q-badge">Q14</span><div class="q-title">Can the platform integrate future CRMs, AI assistants &amp; ERPs?</div></div>
      <div class="a-text">Yes. Built as a decoupled REST/GraphQL consumer with pre-structured webhook routes ready to connect HubSpot, Zoho CRM, Paystack events, Calendly, and custom AI desks with zero core rewrites.</div>
    </div>
    """
)

# SLIDE 6: SECTION D - SECURITY & DATA PROTECTION (Q15 - Q18)
slide_6 = slide_chrome(
    "05 | Section D: Security, Privacy & Disaster Recovery",
    "Hardened Defense, NDPA 2023 Compliance & Email Trust (Q15 - Q18)",
    "Questions 15 - 18",
    6, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q15</span><div class="q-title">How is the platform protected from cyberattacks?</div></div>
        <ul class="a-list">
          <li>Mandatory <strong>SSL/TLS 1.3</strong> encryption with strict HSTS preloading.</li>
          <li><strong>Cloudflare Enterprise WAF</strong> filtering SQL injections, XSS, and bad bots.</li>
          <li>Automated DDoS absorption and strict rate-limiting on intake forms.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q16</span><div class="q-title">Does the site comply with NDPA 2023 &amp; GDPR rules?</div></div>
        <ul class="a-list">
          <li>Explicit opt-in Cookie Consent banner gating all analytics scripts.</li>
          <li>Comprehensive NDPA 2023 &amp; UK/EU GDPR compliant Privacy Policy.</li>
          <li>Built-in Subject Access Request (SAR) and data erasure submission flow.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q17</span><div class="q-title">How are consultation notes encrypted &amp; corporate emails delivered?</div></div>
        <ul class="a-list">
          <li>Client briefs encrypted in transit (TLS 1.3) and at rest (<strong>AES-256</strong>); restricted purely to authorized Ken-Saleem admins.</li>
          <li>Full <strong>SPF, DKIM, and DMARC</strong> DNS authentication ensuring booking emails land in Microsoft 365 / Google Workspace inboxes, never spam.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q18</span><div class="q-title">What is the Incident Response &amp; Disaster Recovery plan?</div></div>
        <ul class="a-list">
          <li>24/7 automated uptime alerts notifying administrators of any anomaly.</li>
          <li><strong>120-Second Rollback:</strong> Instant DNS and Git rollback to immutable static snapshots prevents prolonged downtime.</li>
        </ul>
      </div>
    </div>
    """
)

# SLIDE 7: SECTION E - SEO, CMS & AI DISCOVERABILITY (Q19 - Q23)
slide_7 = slide_chrome(
    "06 | Section E: SEO, Headless CMS & AI Discoverability",
    "Owning Google Search & AI Answer Engines (GEO) (Q19 - Q23)",
    "Questions 19 - 23",
    7, TOTAL_SLIDES,
    """
    <div class="cols-2">
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q19</span><div class="q-title">Can our team manage SEO independently inside the CMS?</div></div>
        <ul class="a-list">
          <li><strong>Global Defaults:</strong> Master sitewide titles, brand descriptions &amp; fallback OpenGraph share cards.</li>
          <li><strong>Per-Page / Per-Article Editors:</strong> Custom Meta Titles, Descriptions (live character counts), canonical URLs &amp; social cards.</li>
          <li><strong>Indexing Controls:</strong> Simple <code>index, follow</code> vs <code>noindex</code> toggles for private VIP briefings.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q20</span><div class="q-title">How will Ken-Saleem rank in AI search (ChatGPT, Perplexity, Google AI)?</div></div>
        <ul class="a-list">
          <li><strong>Generative Engine Optimization (GEO):</strong> Every research insight opens with clean factual executive abstracts engineered for LLM citation.</li>
          <li>Strong semantic topic entities linking Ken-Saleem directly to corporate strategy, risk, and capital advisory queries.</li>
        </ul>
      </div>
    </div>
    <div class="cols-3">
      <div class="card">
        <div class="q-head"><span class="q-badge">Q21</span><div class="q-title">JSON-LD Schema Markup</div></div>
        <div class="a-text">Dynamic structured data injected automatically: <code>Organization</code>, <code>Corporation</code>, <code>Person</code> (CEO/Partners), <code>ConsultingService</code>, <code>FAQPage</code> &amp; <code>Article</code> schemas.</div>
      </div>
      <div class="card">
        <div class="q-head"><span class="q-badge">Q22</span><div class="q-title">Instant Search Indexing</div></div>
        <div class="a-text">Automated XML sitemaps integrated with Google Search Console and Bing Webmaster Tools to index new publications rapidly.</div>
      </div>
      <div class="card">
        <div class="q-head"><span class="q-badge">Q23</span><div class="q-title">Malicious AI Scraper Defense</div></div>
        <div class="a-text">Custom <code>robots.txt</code> + Cloudflare Bot Rules allowing Googlebot &amp; Bingbot while blocking unauthorized proprietary content harvesters.</div>
      </div>
    </div>
    """
)

# SLIDE 8: SECTION F - WORKFLOWS, PAYMENTS & LEAD AUTOMATION (Q24 - Q26)
slide_8 = slide_chrome(
    "07 | Section F: Integrations & Workflow Automation",
    "Paystack Payments, Smart Calendly & Lead Qualification (Q24 - Q26)",
    "Questions 24 - 26",
    8, TOTAL_SLIDES,
    """
    <div class="cols-3">
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q24</span><div class="q-title">How do Payments, Scheduling &amp; WhatsApp connect?</div></div>
        <ul class="a-list">
          <li><strong>Paystack Checkout:</strong> Direct debit card &amp; bank transfer collection on site.</li>
          <li><strong>Smart Webhook Unlock:</strong> Payment verification webhook automatically unlocks Calendly time slots (stops unpaid bookings).</li>
          <li><strong>WhatsApp Business API:</strong> Floating executive desk pre-populates inquiry context for rapid routing.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q25</span><div class="q-title">How do Analytics &amp; Ad Pixels work legally?</div></div>
        <ul class="a-list">
          <li>Integrates Google Analytics 4 (GA4), Search Console, LinkedIn Insight Tag, and Meta Pixel.</li>
          <li>Wrapped in <strong>Google Consent Mode v2</strong> so zero user-tracking cookies fire before visitor opt-in under NDPA/GDPR.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q26</span><div class="q-title">How do you filter out unqualified leads automatically?</div></div>
        <ul class="a-list">
          <li>Intake gate segments inquiries by corporate revenue tier (<code>&lt;$50k</code>, <code>$50k-$250k</code>, <code>$250k+</code>).</li>
          <li>High-ticket prospects route straight to CEO/Partner booking; lower tiers auto-route to executive whitepapers &amp; newsletters.</li>
        </ul>
      </div>
    </div>
    <div class="card">
      <div class="q-title" style="margin-bottom: 2.5mm;">Automated Retainer Revenue &amp; Calendar Protection Workflow</div>
      <div class="flow-wrap">
        <div class="flow-node">Client Submits Revenue &amp; Scope</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">Automated Tier Qualification</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">Paystack Retainer Checkout</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">Webhook Verifies Funds</div>
        <div class="flow-arr">&rarr;</div>
        <div class="flow-node">Calendly Slot Unlocked</div>
      </div>
    </div>
    """
)

# SLIDE 9: SECTION G - COMMERCIAL PROPOSAL & DEVELOPMENT BOQ (Q27)
slide_9 = slide_chrome(
    "08 | Section G: Commercial Investment (Q27)",
    "Development Cost Scope & Milestone Payment Schedule",
    "Question 27",
    9, TOTAL_SLIDES,
    """
    <div class="price-callout">
      <strong>Important Commercial Notice:</strong> Total Investment of <strong>₦350,000 (Three Hundred &amp; Fifty Thousand Naira)</strong> covers <strong>Software Design &amp; Engineering Development Cost ONLY</strong>. All third-party hosting, custom domain, CMS, and gateway charges are separate and paid directly to infrastructure providers under your company's accounts (itemized on Slide 10).
    </div>
    <div class="cols-2" style="grid-template-columns: 1.35fr 1fr;">
      <table>
        <thead>
          <tr>
            <th>Bill of Quantities (BOQ) - Deliverable Scope</th>
            <th style="width: 22%;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>1. Bespoke Figma UI/UX System</strong> (Mobile, Tablet &amp; Desktop)</td><td><strong style="color:var(--gold-dark);">Included</strong></td></tr>
          <tr><td><strong>2. Headless Next.js 15 Frontend</strong> (&lt;1.2s Load, Green Core Web Vitals)</td><td><strong style="color:var(--gold-dark);">Included</strong></td></tr>
          <tr><td><strong>3. Headless CMS &amp; Native SEO Suite</strong> (Articles, Bios, Meta Controls)</td><td><strong style="color:var(--gold-dark);">Included</strong></td></tr>
          <tr><td><strong>4. Paystack + Calendly Retainer Engine</strong> (Qualification + Webhook Slot)</td><td><strong style="color:var(--gold-dark);">Included</strong></td></tr>
          <tr><td><strong>5. Security, DNS &amp; Compliance</strong> (WAF, SSL, SPF/DKIM, JSON-LD, NDPA)</td><td><strong style="color:var(--gold-dark);">Included</strong></td></tr>
          <tr style="background: var(--gold-bg);">
            <td><strong>Total Development Investment (Development Cost Only)</strong></td>
            <td><strong style="color:var(--navy); font-size:13px;">₦350,000</strong></td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Payment Milestone</th>
            <th>Trigger</th>
            <th style="width: 25%;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>50% Deposit</strong></td>
            <td>Agreement sign-off; Figma UI/UX &amp; setup</td>
            <td><strong style="color:var(--gold-dark);">₦175,000</strong></td>
          </tr>
          <tr>
            <td><strong>30% Staging</strong></td>
            <td>Staging demo (<code>staging.ken-saleem.com</code>)</td>
            <td><strong style="color:var(--gold-dark);">₦105,000</strong></td>
          </tr>
          <tr>
            <td><strong>20% Go-Live</strong></td>
            <td>Launch, DNS cutover, training &amp; IP NDA</td>
            <td><strong style="color:var(--gold-dark);">₦70,000</strong></td>
          </tr>
          <tr style="background: #F1F5F9;">
            <td colspan="2"><strong>Total Development Fee (3-4 Weeks)</strong></td>
            <td><strong style="color:var(--navy);">₦350,000</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    """
)

# SLIDE 10: THIRD-PARTY HOSTING & INFRASTRUCTURE COSTS (Q28)
slide_10 = slide_chrome(
    "09 | Third-Party Operational Budget (Q28)",
    "Hosting, Domain, CMS & Infrastructure Costs (Paid Direct at Cost)",
    "Client Direct Costs",
    10, TOTAL_SLIDES,
    """
    <div class="a-text" style="font-size: 12px;">
      Per our Day-One Ownership Policy (Q11), all infrastructure accounts are registered in <strong>Ken-Saleem Consulting Limited's</strong> corporate name so you retain 100% control with zero agency markup:
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 28%;">Third-Party Service</th>
          <th style="width: 44%;">Operational Purpose</th>
          <th style="width: 28%;">Estimated Client-Direct Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Custom Corporate Domain (.com / .com.ng)</strong></td>
          <td>Primary domain name registration &amp; annual renewal</td>
          <td><strong>~₦15,000 - ₦25,000 / year</strong></td>
        </tr>
        <tr>
          <td><strong>Edge Hosting &amp; CDN (Cloudflare / Vercel)</strong></td>
          <td>Global serverless web hosting, Enterprise WAF, DDoS defense &amp; SSL 1.3</td>
          <td><strong>$0 (Free Tier) or $20.00 / mo (Pro)</strong></td>
        </tr>
        <tr>
          <td><strong>Headless CMS &amp; Database (Sanity / Railway)</strong></td>
          <td>Content editor for articles/SEO &amp; automated PostgreSQL backups</td>
          <td><strong>$0 (Free Tier) - $15.00 / month</strong></td>
        </tr>
        <tr>
          <td><strong>Cloud Object Storage (Cloudflare R2)</strong></td>
          <td>Whitepaper PDFs, executive case documents &amp; immutable snapshots</td>
          <td><strong>$0 (Free Tier) / ~$1.00 - $5.00 / mo</strong></td>
        </tr>
        <tr>
          <td><strong>Transactional Email (Resend / Microsoft 365)</strong></td>
          <td>Consultation confirmations with SPF, DKIM &amp; DMARC authentication</td>
          <td><strong>$0 (up to 3,000 emails/mo) or M365</strong></td>
        </tr>
        <tr>
          <td><strong>Smart Calendar (Calendly Standard / Pro)</strong></td>
          <td>Automated consultation slot booking after Paystack verification</td>
          <td><strong>$0 (Basic Free) / $12.00 per seat/mo</strong></td>
        </tr>
        <tr>
          <td><strong>Payment Gateway (Paystack Live Merchant)</strong></td>
          <td>Direct local card &amp; bank transfer settlement into your corporate account</td>
          <td><strong>1.5% + ₦100 (capped at ₦2,000/txn)</strong></td>
        </tr>
      </tbody>
    </table>
    """
)

# SLIDE 11: DELIVERY ROADMAP, WARRANTY, HANDOVER & IP SIGN-OFF (Q29 - Q31)
slide_11 = slide_chrome(
    "10 | Delivery, Support & Legal Assurance",
    "Execution Roadmap, 90-Day Support, IP Covenant & Sign-Off (Q29 - Q31)",
    "Questions 29 - 31",
    11, TOTAL_SLIDES,
    """
    <div class="cols-3">
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q29</span><div class="q-title">3 to 4 Week Delivery Schedule</div></div>
        <ul class="a-list">
          <li><strong>Week 1:</strong> Architecture, Wireframes &amp; Figma UI/UX Sign-Off.</li>
          <li><strong>Weeks 2-3:</strong> Next.js Build, Headless CMS, Paystack &amp; Calendly Staging.</li>
          <li><strong>Week 4:</strong> WAF/SSL Security, SEO/GEO Audit, DNS &amp; Live Launch.</li>
          <li><strong>Commitment:</strong> 2% per-day discount on final balance for unexcused delays.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q30</span><div class="q-title">Hypercare &amp; Team Handover</div></div>
        <ul class="a-list">
          <li><strong>90 Days Free Hypercare:</strong> Post-launch bug fixes, tuning &amp; tech advisory.</li>
          <li><strong>Optional Post-90d Support:</strong> ₦50k/mo retainer or ₦15k/hr ad-hoc.</li>
          <li><strong>Full Handover:</strong> Super-admin logins, operations manual &amp; recorded video guides for zero developer dependency.</li>
        </ul>
      </div>
      <div class="card card-accent">
        <div class="q-head"><span class="q-badge">Q31</span><div class="q-title">IP Assignment &amp; Strict NDA</div></div>
        <ul class="a-list">
          <li>Formal <strong>Intellectual Property Assignment &amp; NDA</strong> executed prior to mobilization.</li>
          <li>100% of custom code, UI tokens, and system architecture belong solely to Ken-Saleem Consulting Limited and will never be resold.</li>
        </ul>
      </div>
    </div>

    <div class="card" style="background: #FFFFFF; padding: 5mm 7mm;">
      <div class="q-title" style="margin-bottom: 3.5mm; text-transform: uppercase; letter-spacing: 0.5px;">Formal Proposal Acceptance &amp; Project Authorization (₦350,000 Development Fee)</div>
      <div class="cols-2" style="gap: 18mm;">
        <div>
          <div style="font-size: 10px; font-weight: 700; color: var(--muted); text-transform: uppercase; margin-bottom: 9mm;">For: Sales Cowboy Marketing Solutions</div>
          <div style="border-bottom: 1.5px solid var(--navy); margin-bottom: 4px;"></div>
          <div style="font-size: 11.5px; font-weight: 800; color: var(--navy);">Lead Systems Architect | Date</div>
        </div>
        <div>
          <div style="font-size: 10px; font-weight: 700; color: var(--muted); text-transform: uppercase; margin-bottom: 9mm;">For: Ken-Saleem Consulting Limited</div>
          <div style="border-bottom: 1.5px solid var(--navy); margin-bottom: 4px;"></div>
          <div style="font-size: 11.5px; font-weight: 800; color: var(--navy);">Chief Executive Officer / Authorized Signatory | Date</div>
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
  <title>Ken-Saleem Consulting Limited - Executive Proposal & 31-Point Q&A Slide Deck</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
{css}
  </style>
</head>
<body>

  <div class="toolbar">
    <div class="toolbar-title">Ken-Saleem Consulting Limited | Executive Proposal &amp; 31-Point Response Slide Deck (16:9)</div>
    <div class="toolbar-actions">
      <button class="btn btn-gold" onclick="window.print()">Print / Save Slide PDF</button>
      <a href="/Ken-Saleem-Consulting-Proposal-And-Technical-Response.pdf" class="btn" download>Download Slide PDF</a>
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

html_name = "7-ken-saleem-slide-deck.html"
pdf_name = "Ken-Saleem-Consulting-Proposal-And-Technical-Response.pdf"

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
