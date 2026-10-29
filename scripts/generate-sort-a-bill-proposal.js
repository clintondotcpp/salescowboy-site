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

const PAYMENT_INFO = "Bank Name: GLOBUS BANK\nAccount Name: CLINTON NNAMDI CHUKWUNYERE\nAccount Number: 9976907387";

const today = new Date();
const formatToday = today.toISOString().split("T")[0];
const propId = `PROP-${today.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

const proposalState = {
  proposalTitle: "Sort A Bill — Digital Bill-Relief & Philanthropic Settlement Platform",
  proposalId: propId,
  proposalDate: formatToday,
  
  ...DEFAULT_SENDER,
  
  clientName: "A Little Help Foundation",
  clientContact: "Executive Leadership & Board of Trustees",
  clientAddress: "Lagos, Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  projectOverview: "This technical proposal details the end-to-end design, custom engineering, and cloud deployment of 'Sort A Bill' (Small Bills. Big Relief.) for A Little Help Foundation. Built upon an enterprise NestJS (Node.js/TypeScript) modular architecture and PostgreSQL, the platform establishes a transparent, dignity-first bridge connecting financially constrained individuals with donors and corporate supporters. The system ensures requesting help is simple, donating is verifiable, and every approved payment settles directly to verified utility, education, and healthcare service providers with end-to-end auditability.",
  
  modules: [
    {
      id: "1",
      title: "Module 1: Enterprise NestJS Architecture, Security, RBAC & Applicant Onboarding",
      timeline: "Week 1 (Days 1 - 7)",
      cost: 180000,
      description: "Robust enterprise NestJS backend foundation, relational database architecture, role-based access control (RBAC), and applicant bill-submission workflow.",
      deliverables: [
        "Modular NestJS Backend Framework: High-performance TypeScript API architecture with dependency injection, global validation pipes, exception filters, and JWT authentication guards",
        "Role-Based Access Control (RBAC): Strict permission boundaries separating Applicants, Donors, Foundation Reviewers, and Super Administrators",
        "Applicant Registration & Dignity-First Privacy Engine: Secure applicant profile management with automated personal data redaction (full names, addresses, and private contact info are sealed from public view)",
        "Bill Submission & Document Vault: Multi-step bill upload workflow capturing bill category (Utilities, Education, Healthcare, Internet/Communication), amount, provider details, and support documentation (PDF/JPEG receipts)",
        "Duplicate & Fraud Detection Guardrail: Automated database hashing checks on bill account numbers and provider references to prevent double-submission of identical bills"
      ]
    },
    {
      id: "2",
      title: "Module 2: Administrative Bill Verification Desk, Provider Registry & Audit Trail",
      timeline: "Week 2 (Sprint A: Days 8 - 14)",
      cost: 185000,
      description: "Comprehensive back-office verification console giving foundation caseworkers full oversight to audit bills, verify service providers, and approve requests with human oversight.",
      deliverables: [
        "Interactive Caseworker Review Queue: Administrative verification panel displaying submitted bills, supporting documentation, requested amounts, and applicant hardship statements",
        "Verified Service Provider Registry: Central database of approved utility companies (DISCOs), water corporations, educational institutions, diagnostic centers, and telcos",
        "Two-Step Decision Engine: Human-in-the-loop review workflow allowing caseworkers to Approve, Request Additional Proof, or Decline applications with structured audit notes",
        "Eligible Allocation Matrix: Workflow categorizing approved requests for individual marketplace funding or general foundation pool settlement",
        "Full Administrative Audit Logs: Immutable activity records logging caseworker actions, review timestamps, approval notes, and system state transitions"
      ]
    },
    {
      id: "3",
      title: "Module 3: Privacy-Protected Donor Marketplace & Direct Provider Settlement Rails",
      timeline: "Week 2 (Sprint B) - Week 3 (Sprint A)",
      cost: 205000,
      description: "High-trust donor discovery portal and direct settlement engine routing contributions straight to verified third-party billing providers.",
      deliverables: [
        "Privacy-Protected Donor Marketplace: Anonymized discovery catalog enabling individual donors and corporate sponsors to browse approved bills by category, urgency, and amount without compromising beneficiary dignity",
        "Multi-Option Giving Desk: Support for full single-bill settlement, micro-contributions, and direct donations into the 'General Emergency Relief Pool'",
        "Secure Payment Gateway Integration: Multi-channel checkout via Paystack / Flutterwave / Moniepoint supporting debit cards, bank transfers, and USSD",
        "Direct Provider Settlement Workflow: Automated/semi-automated disbursement routing funds directly to verified service provider accounts (e.g., direct DISCO meter token generation, school bank accounts) rather than cash to applicants",
        "Digital Tax Receipts & Contribution Certificates: Automated branded PDF donation receipts generated immediately upon payment confirmation"
      ]
    },
    {
      id: "4",
      title: "Module 4: Impact Tracking, Real-Time Notifications, Reporting & Cloud Launch",
      timeline: "Week 3 (Days 15 - 21)",
      cost: 180000,
      description: "Applicant progress tracking, donor impact analytics, automated transactional notifications, executive financial reporting, and live production deployment.",
      deliverables: [
        "Applicant Real-Time Request Tracker: Visual status timeline (Submitted ➔ Under Review ➔ Approved & Listed ➔ Settled & Paid) with direct proof-of-settlement receipt access",
        "Donor Impact & Giving History Dashboard: Personalized donor profile tracking total lives impacted, categories supported, and live status of settled bills",
        "Multi-Channel Notification Gateway: Automated transactional Email and SMS notifications for application updates, approval milestones, donor contribution alerts, and provider settlement notices",
        "Executive Financial & Operational Reporting: Real-time foundation ledger tracking funds received, committed, disbursed, and remaining balances, with CSV/PDF reporting for board audit",
        "Production Cloud Deployment & Hardening: Turnkey cloud deployment on Railway container infrastructure with automated health monitoring, SSL encryption, and PostgreSQL database backup routines"
      ]
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentMilestones: [
    { label: "Milestone 1: Project Mobilization, NestJS Architecture, RBAC & Applicant Onboarding (50%)", percentage: 50 },
    { label: "Milestone 2: Admin Verification Engine, Provider Registry & Donor Marketplace (30%)", percentage: 30 },
    { label: "Milestone 3: Payment Gateway, Direct Provider Settlement, Reporting & Live Cloud Launch (20%)", percentage: 20 }
  ],
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦750,000 fixed price.\n2. Milestone Payment Schedule: 50% Kickoff Deposit (₦375,000), 30% Verification Desk & Donor Marketplace Milestone (₦225,000), 20% Direct Settlement, Testing & Cloud Handover (₦150,000).\n3. Cloud Hosting & Infrastructure: Client is responsible for their direct monthly cloud hosting fees (hosted on Railway with managed PostgreSQL at roughly $5 monthly, not included in the development fee).\n4. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere.\n5. Delivery Timeline: Exactly 3 weeks total delivery time structured into 3 sequential sprint milestones, including human-in-the-loop verification testing and production cloud deployment."
};

const baseUrl = "https://salescowboy.com.ng";
const proposalData = serializeState(proposalState);

const links = {
  proposal: {
    clientView: `${baseUrl}/proposal/?data=${proposalData}&mode=view`,
    editable: `${baseUrl}/proposal/?data=${proposalData}&mode=edit`
  }
};

fs.writeFileSync(path.join(__dirname, 'sort-a-bill-links.json'), JSON.stringify(links, null, 2));

console.log("Successfully generated Sort A Bill proposal links for A Little Help Foundation at ₦750k.");
