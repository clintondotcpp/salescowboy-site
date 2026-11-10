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

pdf_name = "Cross-Border-Fintech-Settlement-Engine-Proposal.pdf"

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Institutional Proposal - Cross-Border Stablecoin & Multi-Currency Settlement Engine - Sales Cowboy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
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
      padding: 30px 20px;
      -webkit-font-smoothing: antialiased;
    }}

    .toolbar {{
      max-width: 210mm;
      margin: 0 auto 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      padding: 12px 20px;
      border-radius: 10px;
      border: 1px solid #334155;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }}

    .toolbar-title {{
      color: #f1f5f9;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .toolbar-actions {{
      display: flex;
      gap: 10px;
    }}

    .btn {{
      background: #0f172a;
      color: #f8fafc;
      border: 1px solid #475569;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
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
      margin: 0 auto 30px;
      background: var(--paper);
      padding: 34px 40px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
      border: 1px solid var(--border);
      position: relative;
    }}

    /* Corporate Letterhead */
    .letterhead {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 12px;
      margin-bottom: 16px;
    }}

    .brand-left {{
      display: flex;
      gap: 12px;
      align-items: center;
    }}

    .brand-logo {{
      height: 46px;
      width: auto;
      object-fit: contain;
      display: block;
    }}

    .brand-info h1 {{
      font-size: 17px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: var(--primary);
      text-transform: uppercase;
      line-height: 1.1;
    }}

    .brand-info p {{
      font-size: 10px;
      color: var(--text-muted);
      margin-top: 2px;
      letter-spacing: 0.2px;
    }}

    .meta-right {{
      text-align: right;
      font-size: 10px;
      color: var(--text-muted);
      line-height: 1.4;
    }}

    .meta-badge {{
      display: inline-block;
      background: var(--accent-light);
      color: var(--accent);
      font-weight: 700;
      font-size: 9px;
      padding: 2px 7px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }}

    .doc-title-block {{
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      padding: 15px 18px;
      border-radius: 7px;
      margin-bottom: 16px;
      border-left: 4px solid var(--accent);
    }}

    .doc-pre {{
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fbbf24;
      font-weight: 700;
      margin-bottom: 3px;
    }}

    .doc-title {{
      font-size: 16px;
      font-weight: 800;
      line-height: 1.25;
      letter-spacing: -0.3px;
    }}

    .doc-subtitle {{
      font-size: 10.5px;
      color: #94a3b8;
      margin-top: 4px;
    }}

    /* Section Styling */
    .section {{
      margin-bottom: 15px;
      page-break-inside: avoid;
    }}

    .section-title {{
      font-size: 12px;
      font-weight: 800;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-left: 3px solid var(--accent);
      padding-left: 8px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}

    p {{
      font-size: 10.5px;
      color: var(--text);
      line-height: 1.45;
      margin-bottom: 7px;
    }}

    /* Grid & Cards */
    .grid-3 {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      margin-bottom: 8px;
    }}

    .card {{
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 9px 11px;
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
      font-size: 9.8px;
      color: var(--text);
      margin-bottom: 4px;
      position: relative;
      padding-left: 11px;
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
      font-size: 10px;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }}

    th, td {{
      padding: 6px 9px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }}

    th {{
      background: #f1f5f9;
      color: var(--primary);
      font-weight: 700;
      font-size: 9.5px;
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
      padding: 9px 11px;
      border-radius: 4px;
      margin-bottom: 10px;
      font-size: 10.5px;
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
      margin-top: 15px;
      padding-top: 15px;
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
        padding: 15px 18px;
        max-width: 100%;
        margin: 0;
      }}
      .page-break {{
        border-top: none;
        margin-top: 0;
        padding-top: 0;
      }}
    }}
  </style>
</head>
<body>

  <!-- Web Toolbar -->
  <div class="toolbar">
    <div class="toolbar-title">
      <span>Cross-Border Fintech & Stablecoin Settlement Engine Proposal</span>
    </div>
    <div class="toolbar-actions">
      <button class="btn btn-primary" onclick="window.print()">Print / Save PDF</button>
      <a href="/{pdf_name}" class="btn" download>Download PDF</a>
    </div>
  </div>

  <div class="sheet">
    <!-- PAGE 1 -->
    <!-- Corporate Letterhead -->
    <div class="letterhead">
      <div class="brand-left">
        <img class="brand-logo" src="data:image/png;base64,{b64_logo}" alt="Sales Cowboy Logo">
        <div class="brand-info">
          <h1>Sales Cowboy Marketing Solutions</h1>
          <p>Enterprise Digital & Software Solutions</p>
        </div>
      </div>
      <div class="meta-right">
        <div class="meta-badge">Institutional Proposal</div>
        <div><strong>Ref:</strong> SC-PROP-2026-FINTECH</div>
        <div><strong>Date:</strong> November 8, 2026</div>
        <div><strong>Validity:</strong> 30 Days</div>
      </div>
    </div>

    <!-- Document Title Block -->
    <div class="doc-title-block">
      <div class="doc-pre">Institutional Product & Compliance Architecture</div>
      <div class="doc-title">Cross-Border Stablecoin & Multi-Currency Settlement Engine</div>
      <div class="doc-subtitle">Multi-Platform Client Apps (Web/PWA, iOS, Android) + Core Banking Engine + Institutional Liquidity & Compliance Hub</div>
    </div>

    <!-- Section 1: Executive Summary -->
    <div class="section">
      <div class="section-title">1. Executive Summary & Architectural Approach</div>
      <p>
        Deploying a multi-currency fiat-to-stablecoin payment processor across West Africa involves navigating two major challenges: fragmented inter-bank clearing rails (NGN NIBSS/NUBAN, GHS GhIPSS, XOF BCEAO/GIM-UEMOA) and strict AML/CFT/VASP regulatory regimes. Building proprietary banking rails, independent clearing networks, and separate financial licenses in every jurisdiction from day one requires tens of millions of dollars and multi-year licensing delays.
      </p>
      <p>
        The institutional approach utilized by modern African cross-border fintechs is a <strong>Licensed BaaS (Banking-as-a-Service) & Regulated Liquidity Proxy Model</strong>:
      </p>
      <p style="margin-left: 10px;">
        <strong>1. Fiat Rails & Local Clearing:</strong> Integrated via regulated tier-1 payment service providers and commercial banks holding local clearing licenses (Korapay, Flutterwave, Paystack, or Yellow Card across Nigeria, Ghana, Kenya, and UEMOA markets).<br>
        <strong>2. Crypto & Stablecoin Infrastructure:</strong> Built on dedicated MPC (Multi-Party Computation) custodial wallets (Fireblocks or BitGo API architecture) connected to institutional OTC desks for automated, zero-slippage USDT/USDC-to-fiat conversion.<br>
        <strong>3. Card Issuing & Bill Payments:</strong> Sourced via licensed card scheme infrastructure partners (Mastercard/Visa enablement bridges like Bridgecard or Maplerad).
      </p>
    </div>

    <!-- Section 2: Functional System Scope -->
    <div class="section">
      <div class="section-title">2. Functional System Scope</div>

      <div class="grid-3">
        <!-- Module 1 -->
        <div class="card">
          <div class="card-title">Module 1: Client Apps & Core Ledger</div>
          <ul>
            <li><strong>KYC / AML Engine:</strong> Tier 1 to 3 automated verification (BVN/NIN, Ghana Card, Passport, biometric liveness, PEP/Sanctions screening via Smile ID / Dojah).</li>
            <li><strong>Multi-Currency Wallets:</strong> Dedicated accounts for NGN, GHS, XOF alongside hybrid custodial USDT (TRC20, ERC20, Polygon).</li>
            <li><strong>On/Off Ramps:</strong> Dedicated Virtual Accounts (DVA) for instant bank deposits, local transfers, and Mobile Money (MTN, Telecel, Orange) payouts.</li>
            <li><strong>Instant FX Swaps:</strong> Real-time quote engine calculating cross-currency rates with dynamic spread margins (0.5% to 1.5%).</li>
            <li><strong>Cross-Border P2P & B2B:</strong> Instant corridors settlement bypassing correspondent banking delays.</li>
            <li><strong>Virtual Cards & VAS:</strong> USD/NGN virtual Mastercard/Visa issuance, airtime, data bundles, and cross-border utilities.</li>
          </ul>
        </div>

        <!-- Module 2 -->
        <div class="card">
          <div class="card-title">Module 2: Institutional Engine & Treasury</div>
          <ul>
            <li><strong>Double-Entry Ledger:</strong> ACID-compliant transaction isolation and automated reserve accounting preventing phantom balances.</li>
            <li><strong>Automated OTC Rebalancing:</strong> Webhook-driven auto-swaps via institutional OTC endpoints to hedge currency volatility upon crypto receipt.</li>
            <li><strong>MPC Custodial Security:</strong> Distributed key management splitting signing across independent nodes, eliminating single-point theft risk.</li>
            <li><strong>Automated Liquidity Sweeps:</strong> Threshold-based sweeping into cold storage vaults and high-yield reserve accounts.</li>
            <li><strong>High-Throughput Microservices:</strong> NestJS microservice mesh engineered for concurrent transaction execution.</li>
          </ul>
        </div>

        <!-- Module 3 -->
        <div class="card">
          <div class="card-title">Module 3: Compliance & Admin Hub</div>
          <ul>
            <li><strong>Transaction Monitoring (STR/SAR):</strong> Automated velocity limits, suspicious activity alerts, and AML watchlist checks.</li>
            <li><strong>On-Chain AML Screening:</strong> Real-time blockchain address screening via Chainalysis / Elliptic API bridge.</li>
            <li><strong>Treasury Float Dashboard:</strong> Unified balance visibility across partner commercial banks, OTC desks, and on-chain liquidity pools.</li>
            <li><strong>Dynamic Spread & Fee Matrix:</strong> Real-time configuration of swap spreads, gas markups, card issuance fees, and payout commissions.</li>
            <li><strong>Regulatory Audit Reporting:</strong> Automated export of daily transaction logs and compliance audit trails for Central Bank inspection.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- PAGE 2 -->
    <div class="page-break"></div>

    <!-- Section 3: Regulatory Framework & Licensing Roadmap -->
    <div class="section">
      <div class="section-title">3. Regulatory Framework & Licensing Roadmap</div>
      <p>
        Operating legally across West Africa requires a dual strategy: launching rapidly via <strong>authorized sponsorship licenses (Phase 1)</strong>, while initiating multi-stage corporate filings for proprietary recognition (Phase 2).
      </p>

      <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 6px; padding: 10px 12px; margin-bottom: 12px;">
        <div style="font-size: 11px; font-weight: 700; color: var(--primary); margin-bottom: 4px;">Phase 1: Operational Launch (License Sponsorship Model)</div>
        <p style="font-size: 10px; margin-bottom: 4px;">
          • <strong>Legal Setup:</strong> Corporate holding entity paired with local subsidiaries. Compliant AML/CFT policies, User Terms, Cross-Border Disclosures, and NDPR / African Data Privacy frameworks.<br>
          • <strong>Operational Sponsorship:</strong> Partnering with accredited institutions holding Nigerian PSSP / Switching and SEC VASP registrations, Bank of Ghana (BoG) PSP Enhanced licenses, and BCEAO-accredited Electronic Money Institutions (EMI).
        </p>
      </div>

      <div style="font-size: 11px; font-weight: 700; color: var(--primary); margin-bottom: 6px;">Phase 2: Proprietary Licensing & Direct Capital Requirements</div>
      <table>
        <thead>
          <tr>
            <th style="width: 18%;">Jurisdiction</th>
            <th style="width: 22%;">Regulatory Body</th>
            <th style="width: 25%;">Required License</th>
            <th style="width: 35%;">Statutory Capital & Official Filing Estimates</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Nigeria</strong></td>
            <td>Securities & Exchange Commission (SEC)</td>
            <td><strong>VASP License</strong> / ARIP Registration</td>
            <td>Minimum capital requirement (~₦1 Billion unimpaired capital) + SEC processing fees (~₦30M to ₦50M).</td>
          </tr>
          <tr>
            <td><strong>Nigeria</strong></td>
            <td>Central Bank of Nigeria (CBN)</td>
            <td><strong>PSSP / IMTO License</strong></td>
            <td>CBN statutory capital deposit (~$1M or ₦2B depending on tier) + official application fees.</td>
          </tr>
          <tr>
            <td><strong>Ghana</strong></td>
            <td>Bank of Ghana (BoG)</td>
            <td><strong>PSP Enhanced License</strong></td>
            <td>GHS 2M to GHS 5M capital requirements + technical and security audit vetting.</td>
          </tr>
          <tr>
            <td><strong>Global / Offshore</strong></td>
            <td>Financial Services Commission (BVI / Mauritius)</td>
            <td><strong>International Money Services / VASP</strong></td>
            <td>$25,000 to $60,000 legal formation, resident directorship, and statutory capital deposits.</td>
          </tr>
        </tbody>
      </table>
      <div style="font-size: 9.5px; color: var(--text-muted); margin-top: -6px; margin-bottom: 12px;">
        *(Note: Direct statutory capital reserves are corporate equity deposits held by Central Banks, not software development costs. Operations launch under Phase 1 sponsorship while funding Phase 2).*
      </div>
    </div>

    <!-- Section 4: Operational Costs -->
    <div class="section">
      <div class="section-title">4. Estimated Third-Party Operational Costs</div>
      <p>
        Recurring infrastructure, custodial, and compliance integration fees contracted directly with accredited providers:
      </p>
      <table>
        <thead>
          <tr>
            <th style="width: 28%;">Component / Service</th>
            <th style="width: 34%;">Recommended Provider</th>
            <th style="width: 38%;">Estimated Operational / Monthly Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Cloud Infrastructure (PCI-DSS Ready)</strong></td>
            <td>AWS / Google Cloud Enterprise Cluster + Redis</td>
            <td><strong>$250.00 to $600.00 / month</strong> (Scales with transaction volume)</td>
          </tr>
          <tr>
            <td><strong>Crypto Custody & MPC Vaults</strong></td>
            <td>Fireblocks / BitGo (or hybrid self-hosted MPC)</td>
            <td><strong>$1,000.00 to $2,500.00 / month</strong> (plus marginal volume tiers)</td>
          </tr>
          <tr>
            <td><strong>KYC / AML Screening Engine</strong></td>
            <td>Smile ID / Dojah / Sumsub</td>
            <td><strong>Pay-as-you-go</strong> (~$0.40 to $1.20 per verified user)</td>
          </tr>
          <tr>
            <td><strong>Blockchain Screening & Analytics</strong></td>
            <td>Chainalysis / Crystal / AMLBot API</td>
            <td><strong>$200.00 to $500.00 / month</strong> base subscription</td>
          </tr>
          <tr>
            <td><strong>Virtual Card Issuing Program</strong></td>
            <td>Bridgecard / Maplerad / Sudo Africa</td>
            <td><strong>$1,500 to $3,000 setup fee</strong> + interchange revenue-share</td>
          </tr>
          <tr>
            <td><strong>SMS OTP & Alert Delivery</strong></td>
            <td>Termii / Twilio Global Gateway</td>
            <td><strong>Pay-as-you-go</strong> (~₦5.00 local, ~$0.04 international per SMS)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGE 3 -->
    <div class="page-break"></div>

    <!-- Section 5: Engineering Investment -->
    <div class="section">
      <div class="section-title">5. Engineering Investment & Implementation Schedule</div>
      <div class="callout">
        <strong>Total Full-Stack Engineering Investment:</strong> <strong>₦12,000,000 (Twelve Million Naira)</strong> for end-to-end development of the cross-border stablecoin engine, multi-currency banking rails, mobile client apps (iOS/Android), and executive compliance console over 16 weeks.
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 22%;">Phase</th>
            <th style="width: 48%;">Scope & Key Deliverables</th>
            <th style="width: 15%;">Investment</th>
            <th style="width: 15%;">Timeline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Phase 1: Core Architecture & Liquidity Engine</strong></td>
            <td>PostgreSQL double-entry database schema, high-throughput NestJS microservices, USDT MPC custodial wallet engine, and automated OTC liquidity integration.</td>
            <td class="highlight-cell">₦4,500,000</td>
            <td>6 Weeks</td>
          </tr>
          <tr>
            <td><strong>Phase 2: Banking Rails & FX Swap Desk</strong></td>
            <td>Local fiat on/off ramps (NGN, GHS, XOF), instant cross-currency FX swap engine, international P2P transfer module, and automated KYC verification gates.</td>
            <td class="highlight-cell">₦4,000,000</td>
            <td>6 Weeks</td>
          </tr>
          <tr>
            <td><strong>Phase 3: Cards, VAS & Production Hardening</strong></td>
            <td>Virtual card provisioning, bill payments & VAS, cross-platform mobile apps (iOS & Android via React Native), Admin console, and security penetration audit.</td>
            <td class="highlight-cell">₦3,500,000</td>
            <td>4 Weeks</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Total Full-Stack Enterprise Deployment</strong></td>
            <td class="highlight-cell"><strong>₦12,000,000</strong></td>
            <td><strong>16 Weeks</strong></td>
          </tr>
        </tbody>
      </table>

      <div style="font-size: 11px; font-weight: 700; color: var(--primary); margin-top: 10px; margin-bottom: 6px;">Commercial Milestone Breakdown</div>
      <table>
        <thead>
          <tr>
            <th style="width: 28%;">Milestone Stage</th>
            <th style="width: 52%;">Deliverable Trigger</th>
            <th style="width: 20%;">Fee Breakdown</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Mobilization Deposit</strong></td>
            <td>System architecture, security model, database schema, and core ledger execution.</td>
            <td class="highlight-cell">35% (₦4,200,000)</td>
          </tr>
          <tr>
            <td><strong>2. Staging & Integration</strong></td>
            <td>Completion of fiat/crypto gateways, OTC swap mechanics, and staging deployment.</td>
            <td class="highlight-cell">35% (₦4,200,000)</td>
          </tr>
          <tr>
            <td><strong>3. Production Handover</strong></td>
            <td>Live mainnet and production banking rail testing, mobile app distribution setup, and administrative compliance handover.</td>
            <td class="highlight-cell">30% (₦3,600,000)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 6: Warranty & SLA -->
    <div class="section">
      <div class="section-title">6. Post-Launch Warranty & Enterprise SLA</div>
      <p>
        Following production deployment and mainnet handover, Sales Cowboy provides <strong>sixty (60) days of complimentary tier-1 technical warranty support</strong> covering:
      </p>
      <p style="font-size: 10px; margin-bottom: 14px;">
        • Real-time ledger audit monitoring, database integrity surveillance, and reconciliation validation.<br>
        • Zero-downtime hotfix deployments for critical bug remediation and edge-case transaction resolution.<br>
        • Third-party banking gateway and custodial webhook listener resilience and failover optimization.<br>
        • Dedicated technical onboarding sessions for executive compliance officers, treasury managers, and support desk staff.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 16px; padding-top: 12px; border-top: 1px dashed var(--border);">
        <div>
          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 20px;">For: Sales Cowboy (Developer)</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 5px;"></div>
          <div style="font-size: 10px; font-weight: 700; color: var(--primary);">Lead Fintech Architect & Systems Engineer</div>
          <div style="font-size: 9.5px; color: var(--text-muted);">Sales Cowboy Marketing Solutions</div>
        </div>
        <div>
          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 20px;">For: Institutional Client Enterprise</div>
          <div style="border-bottom: 1px solid #475569; width: 80%; margin-bottom: 5px;"></div>
          <div style="font-size: 10px; font-weight: 700; color: var(--primary);">Authorized Executive Representative</div>
          <div style="font-size: 9.5px; color: var(--text-muted);">Executive Treasury & Compliance Committee</div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
"""

html_path = os.path.join(base_dir, "proposal-letterhead.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"[OK] Written {html_path}")

# Render PDF using headless Chrome
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
pdf_path = os.path.join(base_dir, pdf_name)
file_url = "file:///" + html_path.replace("\\", "/")

cmd = [
    chrome,
    "--headless=new",
    "--disable-gpu",
    "--run-all-compositor-stages-before-draw",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    file_url
]
subprocess.run(cmd, check=True)
print(f"[OK] Rendered PDF: {pdf_path}")

# Copy to public and out
public_dir = os.path.join(root_dir, "public")
out_dir = os.path.join(root_dir, "out")
shutil.copy2(pdf_path, os.path.join(public_dir, pdf_name))
if os.path.exists(out_dir):
    shutil.copy2(pdf_path, os.path.join(out_dir, pdf_name))
print(f"[OK] Copied {pdf_name} to public and out")

doc = fitz.open(pdf_path)
print(f"[INFO] Total pages: {len(doc)}")
for i, p in enumerate(doc):
    print(f"Page {i+1}: {len(p.get_text())} characters, {len(p.get_images())} images")

