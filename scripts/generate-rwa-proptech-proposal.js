const fs = require('fs');
const path = require('path');

// Safe UTF-8 Base64 serialization matching frontend
const serializeState = (state) => {
  try {
    const str = JSON.stringify(state);
    const bytes = new TextEncoder().encode(str);
    let binString = "";
    for (let i = 0; i < bytes.length; i++) {
      binString += String.fromCharCode(bytes[i]);
    }
    return btoa(binString);
  } catch (e) {
    console.error("Failed to serialize state", e);
    return "";
  }
};

const DEFAULT_SENDER = {
  senderName: "Clinton Chukwunyere",
  senderDesignation: "Chief Software & Cloud Engineer",
  senderAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232",
  senderWebsite: "salescowboy.com.ng",
};

const today = new Date();
const formatToday = today.toISOString().split("T")[0];
const propId = `PROP-${today.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

const proposalState = {
  proposalTitle: "Enterprise Real World Asset (RWA) Tokenization & PropTech Construction ERP Ecosystem",
  proposalId: propId,
  proposalDate: formatToday,
  
  ...DEFAULT_SENDER,
  
  clientName: "Real Estate Development & Tokenization Sponsors",
  clientContact: "Executive Board & Product Leadership",
  clientAddress: "Nigeria & Global Operations",
  clientEmail: "",
  clientPhone: "",
  
  projectOverview: "This architectural scope and engineering proposal details the complete technical blueprint for an end-to-end PropTech lifecycle ecosystem (Land Acquisition → Construction PM → Facility Tenancy) fused with a fractional liquidity Real World Asset (RWA) Tokenization engine. The platform connects three client portals (Investor/Buyer, Contractor/Field, and Tenant/Resident) to a central high-throughput API gateway, combining traditional relational construction ERP ledgers (PostgreSQL), IoT utility telemetry, and permissioned Ethereum Virtual Machine (EVM) security token smart contracts (ERC-3643/ERC-1400) for compliant yield distribution.",
  
  modules: [
    {
      id: "1",
      title: "Module 1: Land Acquisition, Document Vault & Due Diligence Pipeline",
      timeline: "Phase 1 (Sprint 1 - 2)",
      cost: 0,
      description: "Secure, tamper-evident digital repository and workflow tracker managing pre-construction land acquisition, title verification, municipal zoning approvals, and land purchase escrow accounts.",
      deliverables: [
        "Cryptographic Title & Survey Vault: SHA-256 document hashing engine storing Deeds of Assignment, Governor's Consent, C of O, and digital survey plans with immutable audit trails",
        "Zoning & Feasibility Stage Tracker: Multi-stage pipeline tracking Environmental Impact Assessments (EIA), geotechnical soil tests, and state town-planning clearance permits",
        "Land Purchase Escrow Protocol: Milestone-governed disbursement engine holding land acquisition funds until legal due diligence and deed transfer milestones are satisfied",
        "Role-Based Legal Access Portal: Restricted portal enabling solicitors, surveyors, and government liaison officers to upload and counter-sign title certificates"
      ]
    },
    {
      id: "2",
      title: "Module 2: Construction Project Management ERP & Field Proof-of-Work",
      timeline: "Phase 2 (Sprint 3 - 4)",
      cost: 0,
      description: "Enterprise construction management engine tracking Bills of Quantities (BOQ), subcontractor procurement, purchase orders, and GPS-geofenced mobile field inspections.",
      deliverables: [
        "Dynamic Bill of Quantities (BOQ) Ledger: Hierarchical line-item cost tracker calculating material variances against actual real-time disbursements across civil, structural, and MEP works",
        "Subcontractor & Vendor Procurement Desk: Request-for-Quote (RFQ) dispatch, competitive bid evaluation matrix, purchase order tracking, and vendor rating logs",
        "Geofenced Mobile Field Inspection Suite: Dedicated mobile app for on-site project engineers requiring geofenced GPS verification and time-stamped photo/video uploads before milestone fund drawdowns are unlocked",
        "Site Material Inventory & Delivery Reconciliation: Delivery receipt capture, low-stock threshold alerts, and wastage tracking for cement, steel, and electrical fittings"
      ]
    },
    {
      id: "3",
      title: "Module 3: Facility Management, Tenancy Lifecycle & IoT Smart Metering",
      timeline: "Phase 3 (Sprint 5 - 6)",
      cost: 0,
      description: "Comprehensive property management and tenant experience system automating digital leasing, recurring rent collection, maintenance dispatch, and smart utility metering.",
      deliverables: [
        "Digital Leasing & Auto-Debit Engine: Digital lease agreement generation, legally binding e-signatures, automated card/bank debit rent collection, and condition inspection logs",
        "Work Order & Maintenance Desk: Self-service resident ticketing system for HVAC, electrical, plumbing, and structural repairs with automated routing to assigned facility technicians",
        "IoT Smart Metering & Energy Auditing: Bi-directional telemetry integration with smart electricity/water meters providing automated utility billing, consumption analytics, and leakage alerts",
        "Visitor Access & Gate Pass Engine: Resident-generated short-code / QR access passes integrated with estate security checkpoints for gated communities"
      ]
    },
    {
      id: "4",
      title: "Module 4: Real World Asset (RWA) Tokenization & Smart Contract Yield Distribution",
      timeline: "Phase 4 (Sprint 7 - 8)",
      cost: 0,
      description: "Permissioned security token infrastructure mapping off-chain property Special Purpose Vehicles (SPVs) into compliant digital asset tokens on Layer-2 blockchain networks.",
      deliverables: [
        "Off-Chain SPV Legal-to-Code Mapping: Contractual architecture mapping physical property title deeds into legally insulated SPVs, where tokens represent fractional shares in the legal holding entity",
        "Permissioned Security Token Standard (ERC-3643 / ERC-1400): On-chain compliance smart contracts enforcing investor wallet whitelisting, jurisdiction locks, and transfer restrictions",
        "Biometric KYC/AML Identity Gateway: Automated investor verification (Sumsub / Persona) automatically syncing verified national ID/passport credentials with the smart contract compliance registry",
        "Automated Smart Contract Yield Distribution: Automated dividend disbursement routing collected tenant rents into net yield payouts (minus maintenance reserve and management fees) to investor wallets",
        "Decentralized Document Custody (IPFS / Arweave): Permanent, decentralized storage of verified title deeds, valuation reports, and audit certificates"
      ]
    },
    {
      id: "5",
      title: "Module 5: Multi-Portal Experience Suite & Super-Admin Command Center",
      timeline: "Phase 5 (Sprint 9 - 10)",
      cost: 0,
      description: "High-performance cross-platform portal suite tailored for Investors, Field Engineers, Residents, and Senior Platform Administrators.",
      deliverables: [
        "Investor & Buyer Web/Mobile Portal: Interactive property marketplace, fractional equity calculator, title deed viewer, wallet portfolio tracker, and historical rental yield performance",
        "Contractor & Field Engineer App: Low-bandwidth, mobile-optimized site dashboard for updating BOQ completion percentages, logging worker logs, and uploading inspection media",
        "Tenant & Resident App: Streamlined resident mobile app for one-tap rent payments, maintenance requests, visitor passes, and real-time utility usage tracking",
        "Super-Admin Enterprise Command Center: Executive analytics tracking Gross Asset Value (GAV), total tokenized square footage, active rental yields, investor KYC approvals, and construction disbursement milestones"
      ]
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentMilestones: [
    { label: "Phase 1: Land Acquisition & Due Diligence Subsystem", percentage: 20 },
    { label: "Phase 2: Construction Management ERP & Field Proof-of-Work", percentage: 25 },
    { label: "Phase 3: Facility Management & IoT Smart Metering Hub", percentage: 25 },
    { label: "Phase 4: RWA Tokenization Smart Contracts & Yield Engine", percentage: 20 },
    { label: "Phase 5: Unified Portals Suite, Security Audit & Cloud Launch", percentage: 10 }
  ],
  
  paymentInfo: "Commercial budget & resource allocation to be established following architectural review and regulatory alignment.",
  notes: "1. Scope Objective: This document serves as a comprehensive technical architecture and functional decomposition proposal for the client, breaking down the 5 core operational pillars without commercial costs attached.\n2. Regulatory & Securities Counsel: Fractional real estate tokens constitute securities under global and regional frameworks (SEC Nigeria, US SEC, UK FCA). An off-chain Special Purpose Vehicle (SPV) legal structure and regulatory sandboxing or accredited investor registration is required prior to mainnet token issuance.\n3. Custody & Onboarding Model: To achieve mass market adoption among traditional real estate investors, a hybrid-custodial wallet model is strongly advised, allowing investors to purchase using debit cards / bank transfers without mandatory MetaMask handling.\n4. Phased Launch Recommendation: Due to the enterprise scale of both an ERP and a tokenized secondary market, we recommend launching Phase 4 (Investor Tokenization & Rental Yield on completed properties) first, followed by Phase 2 (Construction ERP) and Phase 3 (Facility IoT).\n5. Cloud Hosting: Production infrastructure to be deployed on enterprise clusters (e.g., AWS / Railway) with dedicated PostgreSQL, Redis queues, and IPFS document nodes."
};

const baseUrl = "https://salescowboy.com.ng";
const proposalData = serializeState(proposalState);

const links = {
  proposal: {
    clientView: `${baseUrl}/proposal/?data=${proposalData}&mode=view`,
    editable: `${baseUrl}/proposal/?data=${proposalData}&mode=edit`
  }
};

fs.writeFileSync(path.join(__dirname, 'rwa-proptech-links.json'), JSON.stringify(links, null, 2));

console.log("Successfully generated RWA PropTech ERP & Tokenization proposal links.");
