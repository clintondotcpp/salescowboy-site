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

common_css = """
    :root {
      --primary: #0f172a;
      --accent: #b45309;
      --accent-light: #fef3c7;
      --text: #1e293b;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --bg: #f8fafc;
      --paper: #ffffff;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #0b0f19;
      color: var(--text);
      line-height: 1.42;
      padding: 24px 16px;
      -webkit-font-smoothing: antialiased;
    }

    .toolbar {
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
    }

    .toolbar-title {
      color: #f1f5f9;
      font-size: 12.5px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toolbar-actions {
      display: flex;
      gap: 8px;
    }

    .btn {
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
    }

    .btn:hover {
      background: #334155;
      border-color: #64748b;
    }

    .btn-primary {
      background: #d97706;
      border-color: #b45309;
      color: #ffffff;
    }

    .btn-primary:hover {
      background: #b45309;
    }

    /* A4 Paper Sheet */
    .sheet {
      width: 100%;
      max-width: 210mm;
      margin: 0 auto 24px;
      background: var(--paper);
      padding: 26px 34px;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
      border: 1px solid var(--border);
      position: relative;
    }

    /* Corporate Letterhead */
    .letterhead {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 10px;
      margin-bottom: 12px;
    }

    .brand-left {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .brand-logo {
      height: 44px;
      width: auto;
      object-fit: contain;
      display: block;
    }

    .brand-info h1 {
      font-size: 16.5px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: var(--primary);
      text-transform: uppercase;
      line-height: 1.1;
    }

    .brand-info p {
      font-size: 9.5px;
      color: var(--text-muted);
      margin-top: 2px;
      letter-spacing: 0.2px;
    }

    .meta-right {
      text-align: right;
      font-size: 9px;
      color: var(--text-muted);
      line-height: 1.35;
    }

    .meta-badge {
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
    }

    /* Document Title Block */
    .doc-title-block {
      margin-bottom: 12px;
      border-left: 4px solid var(--accent);
      padding-left: 10px;
    }

    .doc-pre {
      font-size: 8.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--accent);
      margin-bottom: 2px;
    }

    .doc-title {
      font-size: 15px;
      font-weight: 900;
      color: var(--primary);
      line-height: 1.2;
      letter-spacing: -0.3px;
    }

    .doc-subtitle {
      font-size: 9.5px;
      color: var(--text-muted);
      margin-top: 3px;
      font-weight: 500;
    }

    .memo-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 5px;
      padding: 7px 10px;
      margin-bottom: 10px;
      font-size: 9px;
    }

    .memo-label {
      font-size: 7.8px;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 0.4px;
    }

    .memo-value {
      font-weight: 700;
      color: var(--primary);
    }

    /* Sections */
    .section {
      margin-bottom: 10px;
    }

    .section-title {
      font-size: 10.5px;
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
      page-break-after: avoid;
    }

    .section-badge {
      font-size: 8px;
      background: #e2e8f0;
      color: #334155;
      padding: 1px 6px;
      border-radius: 3px;
      font-weight: 700;
    }

    p {
      font-size: 9.2px;
      color: var(--text);
      line-height: 1.4;
      margin-bottom: 5px;
    }

    /* QA Blocks & Cards */
    .qa-block {
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 5px;
      padding: 7px 10px;
      margin-bottom: 6px;
      page-break-inside: avoid;
    }

    .qa-title {
      font-size: 9.5px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .qa-num {
      display: inline-block;
      background: var(--primary);
      color: #ffffff;
      font-size: 8px;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 3px;
    }

    .qa-block ul {
      list-style-type: none;
      padding-left: 0;
      margin-top: 2px;
    }

    .qa-block ul li {
      font-size: 8.8px;
      color: var(--text);
      margin-bottom: 2.5px;
      position: relative;
      padding-left: 9px;
      line-height: 1.32;
    }

    .qa-block ul li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: var(--accent);
      font-weight: bold;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      margin-bottom: 6px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 7px;
      margin-bottom: 6px;
    }

    .flow-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
      margin-top: 3px;
    }

    .flow-step {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 8.2px;
      font-weight: 600;
      color: var(--primary);
    }

    .flow-arrow {
      font-size: 9px;
      color: var(--accent);
      font-weight: 900;
    }

    .swatch-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 3px;
    }

    .swatch-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #ffffff;
      border: 1px solid var(--border);
      padding: 1.5px 6px;
      border-radius: 3px;
      font-size: 8.2px;
      font-weight: 600;
    }

    .swatch-dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      display: inline-block;
      border: 1px solid rgba(0,0,0,0.15);
    }

    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 8.2px;
      background: #e2e8f0;
      padding: 0.5px 3.5px;
      border-radius: 3px;
      color: #0f172a;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.8px;
      margin-bottom: 7px;
      page-break-inside: avoid;
    }

    th, td {
      padding: 4px 7px;
      text-align: left;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
    }

    th {
      background: #f1f5f9;
      color: var(--primary);
      font-weight: 700;
      font-size: 8.2px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .highlight-cell {
      font-weight: 700;
      color: var(--accent);
    }

    /* Callouts */
    .callout {
      background: #fffbeb;
      border-left: 3px solid #d97706;
      padding: 7px 10px;
      border-radius: 4px;
      margin-bottom: 7px;
      font-size: 9px;
      color: #92400e;
      line-height: 1.38;
      page-break-inside: avoid;
    }

    .callout strong {
      color: #78350f;
    }

    .callout-dark {
      background: #f1f5f9;
      border-left: 3px solid #0f172a;
      padding: 7px 10px;
      border-radius: 4px;
      margin-bottom: 7px;
      font-size: 8.8px;
      color: #1e293b;
      line-height: 1.38;
      page-break-inside: avoid;
    }

    /* Page break helper */
    .page-break {
      page-break-before: always;
      break-before: page;
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px dashed #cbd5e1;
    }

    @media print {
      body {
        background: #ffffff;
        padding: 0;
      }
      .toolbar {
        display: none !important;
      }
      .sheet {
        box-shadow: none;
        border: none;
        padding: 12px 18px;
        max-width: 100%;
        margin: 0;
      }
      .page-break {
        border-top: none;
        margin-top: 0;
        padding-top: 0;
      }
    }
"""

html_markup = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ken-Saleem Consulting Limited - Commercial Proposal & 31-Point Technical Response</title>
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
      <span>Ken-Saleem Consulting Limited - Commercial Proposal & 31-Point Response</span>
    </div>
    <div class="toolbar-actions">
      <button class="btn btn-primary" onclick="window.print()">Print / Save PDF</button>
      <a href="/Ken-Saleem-Consulting-Proposal-And-Technical-Response.pdf" class="btn" download>Download PDF</a>
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
        <div class="meta-badge">Proposal & Technical Defense</div>
        <div><strong>Ref:</strong> SC-2026-NOV-007</div>
        <div><strong>Date:</strong> November 11, 2026</div>
        <div><strong>Validity:</strong> 30 Days</div>
      </div>
    </div>

    <div class="doc-title-block">
      <div class="doc-pre">Commercial Proposal & 31-Point Pre-Approval Interrogation Response</div>
      <div class="doc-title">High-Conversion Digital Advisory Platform for Ken-Saleem Consulting Limited</div>
      <div class="doc-subtitle">Headless Next.js 15 + Headless CMS Architecture, Paystack & Calendly Conversion Engine, Security & Commercial Terms</div>
    </div>

    <div class="memo-grid">
      <div>
        <div class="memo-label">Prepared For</div>
        <div class="memo-value">Chief Executive Officer, Ken-Saleem Consulting Ltd</div>
      </div>
      <div>
        <div class="memo-label">Prepared & Owned By</div>
        <div class="memo-value">Sales Cowboy Marketing Solutions</div>
      </div>
      <div>
        <div class="memo-label">Development Investment</div>
        <div class="memo-value" style="color: var(--accent);">₦350,000 (Development Cost Only)</div>
      </div>
    </div>

    <!-- Executive Summary -->
    <div class="section">
      <div class="section-title">Executive Summary <span class="section-badge">Overview</span></div>
      <p>
        Ken-Saleem Consulting Limited operates in an advisory market where institutional credibility, intellectual distinction, and immediate technical competence dictate whether high-net-worth (HNW) decision-makers convert or exit. We do not build static digital brochures; we engineer <strong>high-performance client acquisition engines</strong>. Below is our formal <strong>₦350,000 Commercial Proposal</strong> paired with our point-by-point architectural, security, SEO, and operational responses to your 31-point pre-approval interrogation.
      </p>
    </div>

    <!-- SECTION A -->
    <div class="section">
      <div class="section-title">Section A: Business Alignment & Conversion Strategy <span class="section-badge">Questions 1 - 4</span></div>

      <div class="qa-block">
        <div class="qa-title"><span class="qa-num">Q1</span> Conversion Strategy & The 90-Second Rule for HNW Visitors</div>
        <p style="margin-bottom: 2px;">Corporate board directors do not browse sprawling 15-page menus. The architecture enforces a <strong>frictionless 2-tier qualification funnel</strong>:</p>
        <ul>
          <li><strong>Seconds 0-15 (Authority Proof):</strong> Above-the-fold hero delivers an unmistakable value proposition, accreditations, and institutional proof metrics.</li>
          <li><strong>Seconds 15-45 (Problem-Solution Alignment):</strong> Scannable, outcome-driven practice verticals (Strategy, Regulatory Risk, Capital Restructuring) with zero generic jargon.</li>
          <li><strong>Seconds 45-90 (Qualification & Checkout):</strong> Persistent CTA (<em>"Book Executive Advisory Consultation"</em>) opens a gated micro-modal (Revenue, Scope, Budget) before routing to payment and calendar slots.</li>
        </ul>
      </div>

      <div class="qa-block">
        <div class="qa-title"><span class="qa-num">Q2</span> Customer Journey Map (Organic Search to Retainer Settlement)</div>
        <div class="flow-bar">
          <span class="flow-step">1. High-Intent Organic / AI Search</span>
          <span class="flow-arrow">&rarr;</span>
          <span class="flow-step">2. Ultra-Fast Landing (&lt;1.2s)</span>
          <span class="flow-arrow">&rarr;</span>
          <span class="flow-step">3. Practice Area Case Insight</span>
          <span class="flow-arrow">&rarr;</span>
          <span class="flow-step">4. Audit Qualification Gate</span>
          <span class="flow-arrow">&rarr;</span>
          <span class="flow-step">5. Paystack Retainer Settlement</span>
          <span class="flow-arrow">&rarr;</span>
          <span class="flow-step">6. Calendly Slot + NDPA Intake Memo</span>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom: 0;">
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q3</span> Design Psychology vs. 500 Lagos Competitors</div>
          <ul>
            <li><strong>Restraint of Authority:</strong> Intentional whitespace, sharp typographic contrast, zero noisy animations.</li>
            <li><strong>Editorial Boardroom Grids:</strong> Asymmetrical layouts modeled after Financial Times and McKinsey Briefings.</li>
            <li><strong>Micro-Trust Signals:</strong> Regulatory badges, data-backed case study outcomes, and verified client citations.</li>
          </ul>
        </div>
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q4</span> Call-To-Action (CTA) Hierarchy</div>
          <ul>
            <li><strong>Primary (Conversion):</strong> <em>"Book Advisory Session"</em> (header, sticky desktop bar, embedded consultation funnel).</li>
            <li><strong>Secondary (Nurture):</strong> <em>"Download Executive Industry Report"</em> (gated by executive email, role, and phone).</li>
            <li><strong>Tertiary (Direct Line):</strong> <em>"Connect via Executive WhatsApp Desk"</em> (pre-filled context routing via API).</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- PAGE 2 -->
    <div class="page-break"></div>

    <!-- SECTION B -->
    <div class="section">
      <div class="section-title">Section B: Design, UX & Performance [2026 Standards] <span class="section-badge">Questions 5 - 9</span></div>

      <div class="grid-2">
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q5</span> Mobile-First & Guaranteed Core Web Vitals</div>
          <ul>
            <li><strong>LCP (Largest Contentful Paint):</strong> &le; 1.2 seconds</li>
            <li><strong>INP (Interaction to Next Paint):</strong> &le; 100 milliseconds</li>
            <li><strong>CLS (Cumulative Layout Shift):</strong> &le; 0.05 (near-zero layout shift)</li>
          </ul>
        </div>
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q6</span> Target Load Time on Nigerian 4G Networks</div>
          <ul>
            <li><strong>Target:</strong> Under <strong>1.2 seconds</strong> on MTN / Airtel 4G.</li>
            <li><strong>Mechanism:</strong> Next.js Static Site Generation (SSG) + ISR, WebP/AVIF media compression, self-hosted fonts, and Cloudflare Edge caching.</li>
          </ul>
        </div>
      </div>

      <div class="qa-block">
        <div class="qa-title"><span class="qa-num">Q7</span> Design System, Modular Grids, Typography & Color Theory</div>
        <ul>
          <li><strong>Typography & Grid:</strong> Serif Display Headings (<em>Playfair Display / Cinzel</em>) paired with Neo-Grotesque Sans-Serif Body (<em>Inter / Plus Jakarta Sans</em>) over a 12-column fluid grid (8pt baseline rhythm).</li>
        </ul>
        <div class="swatch-row">
          <span class="swatch-chip"><span class="swatch-dot" style="background: #0A192F;"></span>Oxford Navy (#0A192F - Trust)</span>
          <span class="swatch-chip"><span class="swatch-dot" style="background: #C5A880;"></span>Champagne Gold (#C5A880 - Advisory Precision)</span>
          <span class="swatch-chip"><span class="swatch-dot" style="background: #F8F9FA;"></span>Pearl White (#F8F9FA - Contrast)</span>
          <span class="swatch-chip"><span class="swatch-dot" style="background: #1E293B;"></span>Slate Charcoal (#1E293B - Legibility)</span>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom: 0;">
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q8</span> Accessibility Compliance (WCAG 2.2 AA)</div>
          <p style="margin-bottom: 0;">Semantic HTML5, minimum 4.5:1 text contrast (3:1 headings), full keyboard navigation, screen-reader ARIA attributes, and zero auto-playing media.</p>
        </div>
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q9</span> Dual-Spectrum UI/UX Navigation</div>
          <p style="margin-bottom: 0;">Plain-language anchors (<em>"What We Do"</em>, <em>"Speak to a Consultant"</em>) with visual icons for fast clarity, alongside deep executive whitepapers for C-suite diligence.</p>
        </div>
      </div>
    </div>

    <!-- SECTION C -->
    <div class="section">
      <div class="section-title">Section C: Technology Stack & Hosting Architecture <span class="section-badge">Questions 10 - 14</span></div>

      <div class="qa-block">
        <div class="qa-title"><span class="qa-num">Q10</span> Proposed Architecture: Headless Next.js 15 + Headless CMS</div>
        <ul>
          <li><strong>Why NOT WordPress:</strong> Vulnerable to plugin exploits, database security patches, slow PHP runtime, and heavy maintenance overhead.</li>
          <li><strong>Why NOT Webflow:</strong> Proprietary lock-in fees, restricted custom webhook processing, and poor support for localized Nigerian payment flows.</li>
          <li><strong>The Choice (Headless Next.js 15 + Headless CMS):</strong> Edge-rendered speed, zero publicly exposed database, unrestricted API integration, and 5-year modular scalability.</li>
        </ul>
      </div>

      <div class="grid-2">
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q11</span> 100% Day-One Asset Ownership</div>
          <p style="margin-bottom: 0;">Ken-Saleem Consulting Limited owns every account from Day One: domain registrar, cloud hosting, CMS workspace, GitHub repository, and Figma design files are registered directly under your corporate credentials.</p>
        </div>
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q12</span> Edge Hosting, 99.99% Uptime SLA & Backups</div>
          <p style="margin-bottom: 0;">Deployed across Cloudflare / Vercel Edge CDN (300+ nodes) with <strong>99.99% Uptime SLA</strong>. Automated immutable daily database snapshots are stored on S3-compatible storage (RTO &lt; 15 minutes).</p>
        </div>
      </div>

      <div class="qa-block">
        <div class="qa-title"><span class="qa-num">Q13</span> Version Control, GitHub CI/CD & Staging Workflow</div>
        <div class="flow-bar">
          <span class="flow-step">Local Dev (Git)</span>
          <span class="flow-arrow">&rarr;</span>
          <span class="flow-step">Staging (staging.ken-saleem.com)</span>
          <span class="flow-arrow">&rarr;</span>
          <span class="flow-step">Client QA Sign-Off</span>
          <span class="flow-arrow">&rarr;</span>
          <span class="flow-step">Zero-Downtime Production Push</span>
        </div>
      </div>

      <div class="qa-block" style="margin-bottom: 0;">
        <div class="qa-title"><span class="qa-num">Q14</span> Future-Proof REST/GraphQL API Architecture</div>
        <p style="margin-bottom: 0;">Decoupled API consumer pre-structured for seamless integration with CRM suites (HubSpot, Zoho), Paystack webhooks, Calendly scheduling feeds, and AI assistants without core rewrites.</p>
      </div>
    </div>

    <!-- SECTION D -->
    <div class="section">
      <div class="section-title">Section D: Security, NDPA 2023 & Disaster Recovery <span class="section-badge">Questions 15 - 18</span></div>

      <div class="grid-2" style="margin-bottom: 0;">
        <div class="qa-block">
          <div class="qa-title"><span class="qa-num">Q15</span> Security Hardening Stack</div>
          <ul>
            <li>Automated SSL/TLS 1.3 encryption with strict HSTS preloading.</li>
            <li>Cloudflare Enterprise WAF blocking SQLi, XSS, and bot attacks.</li>
            <li>Automated DDoS mitigation and endpoint rate-limiting.</li>
          </ul>
        </div>
        <div class="qa-block">
          <div class="qa-title"><span class="qa-num">Q16</span> NDPA 2023 & GDPR Compliance</div>
          <ul>
            <li>Granular cookie consent gating tracking scripts until opt-in.</li>
            <li>Plain-language Privacy Policy aligned with NDPA 2023 and GDPR.</li>
            <li>Dedicated Subject Access Request (SAR) and Erasure channels.</li>
          </ul>
        </div>
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q17</span> Encrypted Storage & DNS Authentication</div>
          <ul>
            <li>Consultation notes encrypted in transit (TLS 1.3) and at rest (AES-256).</li>
            <li>Strict SPF, DKIM, and DMARC DNS setup for inbox deliverability (Microsoft 365 / Google Workspace).</li>
          </ul>
        </div>
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q18</span> Incident Response & Instant Rollback</div>
          <ul>
            <li>Real-time automated uptime monitoring with instant alerts.</li>
            <li>Instant DNS rollback to immutable static fallbacks within 120 seconds.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- PAGE 3 -->
    <div class="page-break"></div>

    <!-- SECTION E -->
    <div class="section">
      <div class="section-title">Section E: SEO, Headless CMS Controls & AI Discoverability (GEO) <span class="section-badge">Questions 19 - 23</span></div>

      <div class="qa-block">
        <div class="qa-title"><span class="qa-num">Q19</span> Native In-CMS SEO Configuration Suite</div>
        <ul>
          <li><strong>Global Defaults:</strong> Master sitewide meta titles, descriptions, fallback OpenGraph cards, and verified corporate schema.</li>
          <li><strong>Per-Page Controls:</strong> Independent editors for Meta Titles, Meta Descriptions (with live character counters), OpenGraph thumbnails, and canonical URLs.</li>
          <li><strong>Indexing Toggles:</strong> Per-page toggles for <code>index, follow</code> vs. <code>noindex, nofollow</code> on private briefings or gated reports.</li>
        </ul>
      </div>

      <div class="grid-2">
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q20</span> Generative Engine Optimization (GEO)</div>
          <p style="margin-bottom: 0;">Structured for both traditional search (Google, Bing) and AI answer engines (ChatGPT Search, Perplexity, Google AI Overviews) via top-of-article factual executive abstracts and semantic entities.</p>
        </div>
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q21</span> Automated JSON-LD Schema Markup</div>
          <p style="margin-bottom: 0;">Dynamic Next.js metadata injection for <code>Organization</code>, <code>Corporation</code>, <code>Person</code> (CEO/Partners), <code>ConsultingService</code>, <code>FAQPage</code>, <code>BreadcrumbList</code>, and <code>Article</code> schema.</p>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom: 0;">
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q22</span> Indexing Acceleration</div>
          <p style="margin-bottom: 0;">Automated XML sitemaps that notify Google Search Console and Bing Webmaster Tools instantly whenever new case studies or whitepapers go live.</p>
        </div>
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q23</span> Protection Against Malicious Scrapers</div>
          <p style="margin-bottom: 0;">Custom <code>robots.txt</code> rules paired with Cloudflare Bot Management allowing verified search crawlers while blocking unauthorized content harvesting bots.</p>
        </div>
      </div>
    </div>

    <!-- SECTION F -->
    <div class="section">
      <div class="section-title">Section F: Workflow Integration, Payments & Lead Automation <span class="section-badge">Questions 24 - 26</span></div>

      <div class="qa-block">
        <div class="qa-title"><span class="qa-num">Q24</span> Paystack Checkout, Smart Calendly Scheduling & WhatsApp Business API</div>
        <ul>
          <li><strong>Direct Fee Collection:</strong> Native Paystack checkout supporting debit cards and corporate bank transfers for advisory retainers.</li>
          <li><strong>Smart Webhook Unlock:</strong> Upon verified Paystack webhook settlement, the embedded Calendly scheduler unlocks automatically, preventing unpaid calendar blocking.</li>
          <li><strong>Executive WhatsApp Desk:</strong> Floating advisory dispatch widget routing inquiries directly to assigned consultants with pre-filled brief parameters.</li>
        </ul>
      </div>

      <div class="grid-2" style="margin-bottom: 0;">
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q25</span> Analytics & Consent Mode v2</div>
          <p style="margin-bottom: 0;">Integrated Google Analytics 4 (GA4), Search Console, LinkedIn Insight Tag, and Meta Pixel wrapped in Google Consent Mode v2 to enforce zero pre-consent tracking.</p>
        </div>
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q26</span> Lead Qualification & Segmentation</div>
          <p style="margin-bottom: 0;">Intake gates score revenue tiers (&lt;$50k, $50k-$250k, $250k+). Sub-threshold inquiries auto-route to whitepapers and newsletters, shielding the CEO's calendar.</p>
        </div>
      </div>
    </div>

    <!-- SECTION G (PART 1): COMMERCIAL PROPOSAL & BOQ -->
    <div class="section">
      <div class="section-title">Section G: Commercial Proposal, Hosting Costs & Contract Terms <span class="section-badge">Questions 27 - 31</span></div>

      <div class="callout">
        <strong>Q27. Total Development Investment: ₦350,000 (Three Hundred and Fifty Thousand Naira)</strong> | Timeline: <strong>3 to 4 Weeks</strong><br>
        <strong>Commercial Clarification:</strong> The <strong>₦350,000 fee covers software engineering, UI/UX design, CMS integration, and deployment labor ONLY (development cost)</strong>. Third-party infrastructure costs (hosting, custom domain registration, storage, email, and payment gateway transaction fees) are excluded and paid directly by Ken-Saleem Consulting Limited to providers under your own accounts.
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 30%;">Bill of Quantities (BOQ) - Deliverable</th>
            <th style="width: 55%;">Technical Description & Functional Scope</th>
            <th style="width: 15%;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Bespoke UI/UX & Figma System</strong></td>
            <td>Executive design system across mobile, tablet, and desktop views with brand typography and palette.</td>
            <td class="highlight-cell">Included</td>
          </tr>
          <tr>
            <td><strong>2. Headless Next.js 15 Frontend</strong></td>
            <td>Mobile-first SSG/ISR application engineered for &lt;1.2s 4G load time and green Core Web Vitals.</td>
            <td class="highlight-cell">Included</td>
          </tr>
          <tr>
            <td><strong>3. Headless CMS & Native SEO Desk</strong></td>
            <td>Intuitive admin portal for publishing case studies, insights, team bios, and full per-page SEO meta tags.</td>
            <td class="highlight-cell">Included</td>
          </tr>
          <tr>
            <td><strong>4. Paystack + Calendly Retainer Flow</strong></td>
            <td>Lead qualification funnel connected to Paystack checkout webhooks unlocking Calendly booking slots.</td>
            <td class="highlight-cell">Included</td>
          </tr>
          <tr>
            <td><strong>5. Security, DNS & Compliance Setup</strong></td>
            <td>Cloudflare WAF, TLS 1.3 SSL, SPF/DKIM/DMARC records, GA4 Consent Mode v2, and JSON-LD schema.</td>
            <td class="highlight-cell">Included</td>
          </tr>
          <tr style="background: #fef3c7;">
            <td><strong>Total Development Cost</strong></td>
            <td><strong>Complete Custom Software Design & Engineering Turnkey Delivery (Development Cost Only)</strong></td>
            <td class="highlight-cell" style="font-size: 9.5px;">₦350,000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGE 4 -->
    <div class="page-break"></div>

    <div class="section">
      <div class="section-title">Third-Party Hosting, Domain & Operational Infrastructure Costs <span class="section-badge">Client Direct Accounts</span></div>
      <p>
        Per Question 11 (Day-One Ownership), all third-party hosting and domain accounts are registered directly in Ken-Saleem Consulting Limited's corporate name. Estimated operational costs paid directly to service providers are itemized below:
      </p>
      <table>
        <thead>
          <tr>
            <th style="width: 31%;">Third-Party Service / Provider</th>
            <th style="width: 44%;">Operational Purpose</th>
            <th style="width: 25%;">Estimated Cost (Client Direct)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Custom Corporate Domain (.com / .com.ng)</strong></td>
            <td>Primary corporate domain name registration and annual renewal</td>
            <td><strong>~₦15,000 - ₦25,000 / year</strong></td>
          </tr>
          <tr>
            <td><strong>Edge Web Hosting (Cloudflare Pages / Vercel)</strong></td>
            <td>Global CDN hosting, WAF firewall, DDoS protection & SSL/TLS 1.3</td>
            <td><strong>$0 (Free Tier) / $20.00 per mo (Pro)</strong></td>
          </tr>
          <tr>
            <td><strong>Headless CMS & Database (Sanity / Railway)</strong></td>
            <td>Editorial content engine, intake lead records & automated DB snapshots</td>
            <td><strong>$0 (Free Tier) - $15.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Cloud Media & Backup Storage (Cloudflare R2)</strong></td>
            <td>Executive whitepaper PDFs, encrypted intake backups & zero-egress media</td>
            <td><strong>$0 (Free Tier) / ~$1.00 - $5.00 / mo</strong></td>
          </tr>
          <tr>
            <td><strong>Transactional Email (Resend / Microsoft 365)</strong></td>
            <td>Consultation alerts & SPF/DKIM authenticated client email delivery</td>
            <td><strong>$0 (Free up to 3,000/mo) or M365</strong></td>
          </tr>
          <tr>
            <td><strong>Smart Scheduling (Calendly Standard/Pro)</strong></td>
            <td>Real-time calendar availability sync & automated meeting invites</td>
            <td><strong>$0 (Basic Free) / $12.00 per seat/mo</strong></td>
          </tr>
          <tr>
            <td><strong>Payment Gateway (Paystack Live Merchant)</strong></td>
            <td>Card and bank transfer processing for consultation retainers</td>
            <td><strong>1.5% + ₦100 (capped at ₦2,000/txn)</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-title">Milestone Payment Schedule (₦350,000 Development Fee)</div>
      <table>
        <thead>
          <tr>
            <th style="width: 27%;">Milestone Stage</th>
            <th style="width: 53%;">Triggering Deliverables</th>
            <th style="width: 20%;">Payment Due</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Mobilization Deposit (50%)</strong></td>
            <td>Contract signing; covers architectural schema, Figma UI/UX system design, and GitHub/Cloud staging setup.</td>
            <td class="highlight-cell">₦175,000</td>
          </tr>
          <tr>
            <td><strong>2. Functional Staging (30%)</strong></td>
            <td>Delivery of Next.js build, Headless CMS publishing portal, and Paystack/Calendly flows on <code>staging.ken-saleem.com</code>.</td>
            <td class="highlight-cell">₦105,000</td>
          </tr>
          <tr>
            <td><strong>3. Production Go-Live (20%)</strong></td>
            <td>Security hardening, Core Web Vitals verification, DNS cutover, staff video training, and IP/NDA handover.</td>
            <td class="highlight-cell">₦70,000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-title">Execution Timeline, Warranty & Intellectual Property <span class="section-badge">Questions 28 - 31</span></div>

      <div class="qa-block">
        <div class="qa-title"><span class="qa-num">Q28</span> Delivery Timeline (3 to 4 Weeks) & Service Commitment</div>
        <ul>
          <li><strong>Week 1:</strong> Architectural System Plan, Wireframes & Figma UI/UX Review. <strong>Weeks 2-3:</strong> Next.js Build, CMS, Paystack/Calendly Staging. <strong>Week 4:</strong> Security Hardening, SEO/GEO Audit, DNS Setup & Launch.</li>
          <li><strong>Accountability Covenant:</strong> A <strong>2% contract discount per business day</strong> applies to the final milestone balance in the event of any unexcused delivery overrun attributable to the developer.</li>
          <li><strong>Content Provision:</strong> Ken-Saleem provides approved copy, bios, and manuscripts; Sales Cowboy provides copy-editing, SEO formatting, and layout engineering.</li>
        </ul>
      </div>

      <div class="grid-2" style="margin-bottom: 0;">
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q29 &amp; Q30</span> Hypercare Support & Handover</div>
          <p style="margin-bottom: 0;">Includes <strong>90 Days (3 Months) of complimentary Hypercare Technical Support</strong> post-launch (optional retainer afterwards at ₦50,000/mo or ₦15,000/hr ad-hoc). Full super-admin credentials, operations manual, and recorded training videos provided at handover.</p>
        </div>
        <div class="qa-block" style="margin-bottom: 0;">
          <div class="qa-title"><span class="qa-num">Q31</span> Intellectual Property & NDA Covenant</div>
          <p style="margin-bottom: 0;">A formal <strong>IP Assignment &amp; Non-Disclosure Agreement (NDA)</strong> guarantees all custom code, design tokens, and architecture created for Ken-Saleem Consulting Limited remain exclusively yours and will never be reused or resold.</p>
        </div>
      </div>
    </div>

    <!-- Sign-off -->
    <div class="section" style="margin-top: 8px; margin-bottom: 0;">
      <div class="section-title">Project Acceptance &amp; Authorization</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 12px; padding-top: 8px; border-top: 1px dashed var(--border);">
        <div>
          <div style="font-size: 9px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 18px;">For: Sales Cowboy Marketing Solutions</div>
          <div style="border-bottom: 1px solid #475569; width: 85%; margin-bottom: 4px;"></div>
          <div style="font-size: 9.5px; font-weight: 700; color: var(--primary);">Lead Systems Architect</div>
          <div style="font-size: 8.5px; color: var(--text-muted);">Sales Cowboy Marketing Solutions</div>
        </div>
        <div>
          <div style="font-size: 9px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 18px;">For: Ken-Saleem Consulting Limited</div>
          <div style="border-bottom: 1px solid #475569; width: 85%; margin-bottom: 4px;"></div>
          <div style="font-size: 9.5px; font-weight: 700; color: var(--primary);">Chief Executive Officer / Authorized Signatory</div>
          <div style="font-size: 8.5px; color: var(--text-muted);">Ken-Saleem Consulting Limited</div>
        </div>
      </div>
    </div>

  </div>

</body>
</html>
"""

html_name = "7-ken-saleem-proposal-and-response.html"
pdf_name = "Ken-Saleem-Consulting-Proposal-And-Technical-Response.pdf"

html_out = os.path.join(base_dir, html_name)
with open(html_out, "w", encoding="utf-8") as f:
    f.write(html_markup)
print(f"[OK] Written HTML: {html_out}")

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
print(f"[OK] Compiled PDF: {pdf_out}")

shutil.copy2(pdf_out, os.path.join(public_dir, pdf_name))
if os.path.exists(out_dir):
    shutil.copy2(pdf_out, os.path.join(out_dir, pdf_name))
print(f"[OK] Copied {pdf_name} to public and out")

doc = fitz.open(pdf_out)
print(f"[VERIFY] {pdf_name}: {len(doc)} pages, {len(doc[0].get_images())} logo images on page 1")
for idx, pg in enumerate(doc):
    txt = pg.get_text()
    first_line = txt.strip().splitlines()[0] if txt.strip() else ""
    print(f"  Page {idx+1}: {len(txt)} chars | starts with: {first_line[:60]}")

full_text = " ".join([pg.get_text() for pg in doc])
print("  Has 'Trade Infrastructure':", "Trade Infrastructure" in full_text)
print("  Has 'Sales Cowboy Marketing Solutions':", "Sales Cowboy Marketing Solutions" in full_text)
print("  Has '350,000':", "350,000" in full_text)
print("  Has 'em dash':", "\u2014" in full_text or "\u2013" in full_text)
