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

HTML_FILENAME = "11-jamsador-b2b-trade-sales-logistics-slide-deck.html"
PDF_FILENAME = "Jamsador-Integrated-B2B-Trade-Sales-Logistics-Proposal.pdf"

html_out_path = os.path.join(PROPOSALS_DIR, HTML_FILENAME)
pdf_out_path = os.path.join(PROPOSALS_DIR, PDF_FILENAME)
public_pdf_path = os.path.join(WORKSPACE_DIR, "public", PDF_FILENAME)
out_pdf_path = os.path.join(WORKSPACE_DIR, "out", PDF_FILENAME)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jamsador Integrated B2B Trade, Sales &amp; Logistics Web Ecosystem - Sales Cowboy Marketing Solutions</title>
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
      max-width: 840px;
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
    <div class="toolbar-title">Jamsador Integrated B2B Trade, Sales &amp; Logistics Ecosystem - Slide Deck (12 Slides)</div>
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
      <div class="cover-tag">Product Architecture &amp; Commercial Proposal</div>
    </div>
    <div class="cover-center">
      <div class="cover-category">Phase 1 MVP &bull; B2B Distribution &amp; Supply Chain Technology</div>
      <h1 class="cover-title">Jamsador Integrated B2B Trade, Sales &amp; Logistics Web Ecosystem</h1>
      <p class="cover-subtitle">Unifying Jamsador TradeHub, Jamsador SalesHub, and Jamsador LogisticsHub into a Single Mobile-Responsive Cloud Platform for Rapid Market Rollout.</p>
    </div>
    <div class="cover-footer">
      <div>
        <div class="cover-meta-label">Prepared For</div>
        <div class="cover-meta-val">Jamsador Distribution &amp; Market Solutions</div>
      </div>
      <div>
        <div class="cover-meta-label">Turnkey Investment</div>
        <div class="cover-meta-val">&#8358;650,000 NGN</div>
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

  <!-- SLIDE 2: PROJECT OBJECTIVE & LEAN LAUNCH STRATEGY -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">01 | Executive Summary</div>
        <div class="slide-title">Project Objective &amp; Lean Launch Strategy</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Three Hubs, One Unified Cloud System</div>
          <p class="card-desc">Engineer and launch a unified web ecosystem connecting wholesale ordering, field sales execution, and warehouse fulfillment under one database:</p>
          <ul class="bullet-list">
            <li><strong>Jamsador TradeHub:</strong> B2B wholesale catalog, MOQ pricing, and checkout.</li>
            <li><strong>Jamsador SalesHub:</strong> Mobile field rep ordering, retailer CRM, and commissions.</li>
            <li><strong>Jamsador LogisticsHub:</strong> Stock ledger, digital waybills, and 4-stage delivery tracking.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Why Unified Mobile-Responsive Web?</div>
          <p class="card-desc">Delivering all three hubs as role-based workspaces inside one web app accelerates rollout and cuts overhead:</p>
          <ul class="bullet-list">
            <li>Instant browser access on any smartphone, tablet, or desktop.</li>
            <li>Zero Apple App Store or Google Play review delays.</li>
            <li>Optimized for low-data Nigerian mobile networks in the field.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions &bull; Prepared for Jamsador Distribution &amp; Market Solutions Limited</div>
      <div>Slide 2 of 12</div>
    </div>
  </div>

  <!-- SLIDE 3: END-TO-END B2B SUPPLY CHAIN FLOW -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">02 | Ecosystem Workflow</div>
        <div class="slide-title">End-to-End B2B Order-to-Delivery Lifecycle</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="flow-row">
        <div class="flow-step">
          <div class="flow-step-num">Stage 1</div>
          <div class="flow-step-title">Bulk Order</div>
          <div class="flow-step-desc">Retailer orders directly on TradeHub or a Field Rep logs the order via SalesHub.</div>
        </div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-step">
          <div class="flow-step-num">Stage 2</div>
          <div class="flow-step-title">Payment &amp; Stock</div>
          <div class="flow-step-desc">Paystack or bank transfer clears; invoice generates and inventory deducts automatically.</div>
        </div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-step">
          <div class="flow-step-num">Stage 3</div>
          <div class="flow-step-title">Pack &amp; Waybill</div>
          <div class="flow-step-desc">Warehouse packs the batch, prints digital waybill, and assigns a logistics partner.</div>
        </div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-step">
          <div class="flow-step-num">Stage 4</div>
          <div class="flow-step-title">Confirmed Delivery</div>
          <div class="flow-step-desc">Recipient verifies delivery code; order closes and rep commission is credited.</div>
        </div>
      </div>
      <div class="highlight-banner">
        <div><strong>Single Source of Truth:</strong> Every order, stock movement, waybill, and commission updates in real time across one PostgreSQL database.</div>
        <div class="badge-accent">Zero Data Silos</div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions &bull; Prepared for Jamsador Distribution &amp; Market Solutions Limited</div>
      <div>Slide 3 of 12</div>
    </div>
  </div>

  <!-- SLIDE 4: CORE FOUNDATION - IDENTITY & MASTER ADMIN -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">03 | Core Foundation</div>
        <div class="slide-title">Unified Identity (RBAC) &amp; Master Admin Console</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Single Sign-On &amp; Role-Based Access</div>
          <p class="card-desc">Centralized user onboarding and strict permission controls tailored for every supply-chain participant:</p>
          <ul class="bullet-list">
            <li>Manufacturers / Suppliers &amp; Distributors.</li>
            <li>Wholesalers &amp; Retail Store Owners.</li>
            <li>Field Sales Representatives.</li>
            <li>Warehouse Packers &amp; Logistics Partners.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Central Administration Desk</div>
          <p class="card-desc">Executive command center providing complete visibility across Jamsador operations:</p>
          <ul class="bullet-list">
            <li>Monitor total wholesale order volumes and daily revenue summaries.</li>
            <li>Track live warehouse inventory levels and low-stock triggers.</li>
            <li>Review field rep sales performance and pending dispatch queues.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions &bull; Prepared for Jamsador Distribution &amp; Market Solutions Limited</div>
      <div>Slide 4 of 12</div>
    </div>
  </div>

  <!-- SLIDE 5: MODULE 1 - JAMSADOR TRADEHUB -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">04 | B2B Wholesale Marketplace</div>
        <div class="slide-title">Module 1: Jamsador TradeHub</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">Bulk Wholesale Catalog</div>
          <ul class="bullet-list">
            <li>Categorized B2B product directory.</li>
            <li>Unit and carton wholesale pricing tiers.</li>
            <li>Minimum Order Quantities (MOQ) rules.</li>
            <li>Live stock availability indicators.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">B2B Cart &amp; Checkout</div>
          <ul class="bullet-list">
            <li>Streamlined bulk ordering for retailers.</li>
            <li>Paystack card &amp; bank transfer checkout.</li>
            <li>Automated digital invoice generation.</li>
            <li>Instant downloadable payment receipts.</li>
          </ul>
        </div>
        <div class="card card-accent">
          <div class="card-title">Quick Reorder History</div>
          <ul class="bullet-list">
            <li>Complete archive of past purchases.</li>
            <li>One-click reorder from prior invoices.</li>
            <li>Accelerates repeat weekly restocking.</li>
            <li>Reduces manual ordering friction.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions &bull; Prepared for Jamsador Distribution &amp; Market Solutions Limited</div>
      <div>Slide 5 of 12</div>
    </div>
  </div>

  <!-- SLIDE 6: MODULE 2 - JAMSADOR SALESHUB -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">05 | Field Sales &amp; Distributor Portal</div>
        <div class="slide-title">Module 2: Jamsador SalesHub</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">Field Rep Workspace</div>
          <ul class="bullet-list">
            <li>Mobile-first web interface for market runs.</li>
            <li>Onboard and register new retailers on-site.</li>
            <li>Place bulk orders directly on buyer's behalf.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Retailer &amp; Distributor CRM</div>
          <ul class="bullet-list">
            <li>Structured directory of assigned accounts.</li>
            <li>Complete customer order history at a glance.</li>
            <li>Log field visit notes and follow-up tasks.</li>
          </ul>
        </div>
        <div class="card card-accent">
          <div class="card-title">Sales &amp; Commission Tracker</div>
          <ul class="bullet-list">
            <li>Real-time tally of closed wholesale orders.</li>
            <li>Automated rep commission calculation.</li>
            <li>Transparent earnings &amp; target visibility.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions &bull; Prepared for Jamsador Distribution &amp; Market Solutions Limited</div>
      <div>Slide 6 of 12</div>
    </div>
  </div>

  <!-- SLIDE 7: MODULE 3 - JAMSADOR LOGISTICSHUB -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">06 | Inventory &amp; Dispatch Coordination</div>
        <div class="slide-title">Module 3: Jamsador LogisticsHub</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-3">
        <div class="card card-accent">
          <div class="card-title">Stock &amp; Batch Ledger</div>
          <ul class="bullet-list">
            <li>Real-time stock-in and stock-out logs.</li>
            <li>Auto-deduction upon order confirmation.</li>
            <li>Automated low-stock threshold alerts.</li>
          </ul>
        </div>
        <div class="card card-navy">
          <div class="card-title">Waybill &amp; Dispatch Desk</div>
          <ul class="bullet-list">
            <li>Assign orders to warehouse packers.</li>
            <li>Dispatch handoff to logistics partners.</li>
            <li>Printable digital waybills per shipment.</li>
          </ul>
        </div>
        <div class="card card-accent">
          <div class="card-title">4-Stage Delivery Tracking</div>
          <ul class="bullet-list">
            <li>Confirmed &rarr; Packed &rarr; Out for Delivery.</li>
            <li>Final Delivered status with recipient code.</li>
            <li>Verified proof-of-delivery confirmation.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions &bull; Prepared for Jamsador Distribution &amp; Market Solutions Limited</div>
      <div>Slide 7 of 12</div>
    </div>
  </div>

  <!-- SLIDE 8: TECHNICAL ARCHITECTURE -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">07 | Technology Stack</div>
        <div class="slide-title">Modern, Low-Data Cloud Architecture</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-4">
        <div class="card card-accent">
          <div class="card-title">Frontend Web</div>
          <p class="card-desc"><strong>Next.js 15 &amp; Tailwind</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Ultra-fast, mobile-responsive interface tuned for low-data mobile networks across Nigeria.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Unified Backend</div>
          <p class="card-desc"><strong>Node.js (NestJS)</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Modular API powering RBAC permissions, wholesale checkout, commissions, and waybills.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Central Database</div>
          <p class="card-desc"><strong>PostgreSQL (Railway)</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Transactional relational database ensuring accurate stock deductions and financial audit trails.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Payments &amp; Media</div>
          <p class="card-desc"><strong>Paystack &amp; R2</strong></p>
          <p class="card-desc" style="margin-top:6px; font-size:12.5px;">Paystack online collections paired with Cloudflare R2 for product photos and waybill PDFs.</p>
        </div>
      </div>
      <div class="highlight-banner" style="margin-top:14px;">
        <div><strong>Future-Ready Scalability:</strong> Built on a clean modular API ready to power native mobile apps or ERP integrations in Phase 2.</div>
        <div class="badge-accent">Phase 2 Ready</div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions &bull; Prepared for Jamsador Distribution &amp; Market Solutions Limited</div>
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
            <th>Estimated Cost (Paid Directly by Client)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Cloud Server &amp; Database (Railway)</strong></td>
            <td>Hosts Next.js web app, NestJS API, and PostgreSQL database</td>
            <td><strong>$10.00 - $15.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Media &amp; Document Storage (Cloudflare R2)</strong></td>
            <td>Stores wholesale catalog images, invoices, and digital waybills</td>
            <td><strong>Free tier / ~$5.00 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Custom Domain &amp; SSL Protection</strong></td>
            <td>Official Jamsador web domain (.com or .com.ng) with HTTPS</td>
            <td><strong>~&#8358;15,000 / year</strong></td>
          </tr>
          <tr>
            <td><strong>Payment Gateway Processing (Paystack)</strong></td>
            <td>Automated card and bank transfer wholesale order collections</td>
            <td><strong>1.5% capped local processing fee</strong></td>
          </tr>
        </tbody>
      </table>
      <div class="highlight-banner" style="margin-top:14px;">
        <div><strong>Zero App Store Maintenance Overhead:</strong> Web-first deployment avoids recurring Apple Developer ($99/yr) fees during Phase 1 MVP.</div>
        <div class="badge-accent">Lean Opex</div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions &bull; Prepared for Jamsador Distribution &amp; Market Solutions Limited</div>
      <div>Slide 9 of 12</div>
    </div>
  </div>

  <!-- SLIDE 10: COMMERCIAL INVESTMENT -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">09 | Commercial Framework</div>
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
          <div class="price-amount">&#8358;650,000</div>
          <div style="font-size: 14px; color: #CBD5E1;">Phase 1 MVP Delivery &bull; 3 to 4 Weeks Timeline</div>
          <div style="margin-top: 18px; text-align: left; background: rgba(255,255,255,0.06); padding: 14px 18px; border-radius: 8px;">
            <div style="font-size: 12.5px; color: #FCD34D; font-weight: 700; margin-bottom: 4px;">Investment Inclusions:</div>
            <div style="font-size: 12px; color: #E2E8F0; line-height: 1.45;">Unified RBAC Admin Console, Jamsador TradeHub, Jamsador SalesHub, Jamsador LogisticsHub, Paystack integration, and 30-day post-launch warranty.</div>
          </div>
        </div>
        <div class="card card-accent" style="display:flex; flex-direction:column; justify-content:center;">
          <div class="card-title">Structured Milestone Schedule</div>
          <div style="margin-top: 12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:14px; border-bottom:1px solid var(--border);">
              <div>
                <div style="font-weight:700; font-size:15px; color:var(--navy);">60% Mobilization Deposit</div>
                <div style="font-size:12.5px; color:var(--muted); margin-top:3px;">Paid upon contract signing. Covers DB architecture, unified role permissions, UI/UX setup, and core product/inventory engine.</div>
              </div>
              <div style="font-weight:800; font-size:18px; color:var(--navy); padding-left:14px; white-space:nowrap;">&#8358;390,000</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:700; font-size:15px; color:var(--navy);">40% Final Handover &amp; Go-Live</div>
                <div style="font-size:12.5px; color:var(--muted); margin-top:3px;">Paid upon live staging demo of TradeHub, SalesHub, LogisticsHub waybill tracking, payment verification, and production launch.</div>
              </div>
              <div style="font-weight:800; font-size:18px; color:var(--navy); padding-left:14px; white-space:nowrap;">&#8358;260,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions &bull; Prepared for Jamsador Distribution &amp; Market Solutions Limited</div>
      <div>Slide 10 of 12</div>
    </div>
  </div>

  <!-- SLIDE 11: EXECUTION ROADMAP -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">10 | Delivery Roadmap</div>
        <div class="slide-title">4-Week Implementation Schedule</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-4">
        <div class="card card-accent">
          <div class="card-title">Phase 1: Core</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 1</div>
          <p class="card-desc">Database architecture, RBAC authentication across all 6 roles, UI/UX design system, and core product catalog.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Phase 2: Trade &amp; Sales</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 2</div>
          <p class="card-desc">Jamsador TradeHub bulk cart, MOQ pricing, Paystack checkout, plus SalesHub field rep ordering and CRM.</p>
        </div>
        <div class="card card-accent">
          <div class="card-title">Phase 3: Logistics</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 3</div>
          <p class="card-desc">Warehouse stock ledger, auto-deductions, digital waybill printing, 4-stage tracking, and commission tallying.</p>
        </div>
        <div class="card card-navy">
          <div class="card-title">Phase 4: Launch</div>
          <div class="flow-step-num" style="text-align:left; margin-bottom:8px;">Week 4</div>
          <p class="card-desc">End-to-end staging review, live Paystack verification, production deployment, and Jamsador staff onboarding.</p>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions &bull; Prepared for Jamsador Distribution &amp; Market Solutions Limited</div>
      <div>Slide 11 of 12</div>
    </div>
  </div>

  <!-- SLIDE 12: ACCEPTANCE & SIGN-OFF -->
  <div class="slide">
    <div class="slide-header">
      <div class="header-left">
        <div class="slide-num">11 | Next Steps</div>
        <div class="slide-title">Warranty, Handover &amp; Mobilization</div>
      </div>
      <div class="header-right">
        <img src="{logo_data_uri}" alt="Logo">
      </div>
    </div>
    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-accent">
          <div class="card-title">Post-Launch Warranty &amp; Ownership</div>
          <p class="card-desc">We ensure seamless transition for the Jamsador team with full operational support:</p>
          <ul class="bullet-list">
            <li><strong>30-Day Critical Bug-Fix Warranty:</strong> Prompt remediation of any functional defects post-launch.</li>
            <li><strong>Team Onboarding Session:</strong> Guided walkthrough for admin, sales reps, and warehouse staff.</li>
            <li><strong>100% IP Ownership:</strong> Complete source code and cloud infrastructure handover upon completion.</li>
          </ul>
        </div>
        <div class="card card-navy" style="display:flex; flex-direction:column; justify-content:center; text-align:center;">
          <div class="card-title" style="justify-content:center;">Ready to Initiate Phase 1 MVP</div>
          <p class="card-desc" style="margin-bottom:14px;">Approve this proposal, execute the project agreement, and submit the 60% mobilization deposit (&#8358;390,000) to kick off Week 1 engineering.</p>
          <div style="background:#F1F5F9; padding:12px; border-radius:6px; font-size:12.5px; color:var(--navy); font-weight:700;">
            Sales Cowboy Marketing Solutions &bull; hello@salescowboy.com.ng
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div>Sales Cowboy Marketing Solutions &bull; Prepared for Jamsador Distribution &amp; Market Solutions Limited</div>
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
    title_line = [line.strip() for line in text.splitlines() if line.strip()][:2]
    rect = page.rect
    print(f"  Slide {idx+1}: {int(rect.width)}x{int(rect.height)}pt | {len(text)} chars | {' - '.join(title_line)}")

print("  Has Trade Infrastructure:", "trade infrastructure" in all_text.lower())
print("  Has Sales Cowboy MS:", "sales cowboy" in all_text.lower())
print("  Has 650,000:", "650,000" in all_text)
print("  Has 390,000:", "390,000" in all_text)
print("  Has 260,000:", "260,000" in all_text)
print("  Has em/en dash:", bool(re.search(r"[\u2013\u2014]", all_text)))
