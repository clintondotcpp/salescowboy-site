const fs = require('fs');
const path = require('path');

// Safe UTF-8 Base64 serialization matching the frontend
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

// Default Corporate Details (Sender)
const DEFAULT_SENDER = {
  senderName: "Clinton Chukwunyere",
  senderDesignation: "Chief Software & Cloud Engineer",
  senderAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232",
  senderWebsite: "salescowboy.com.ng",
};

// Globus bank payment instructions
const PAYMENT_INFO = "Bank Name: GLOBUS BANK\nAccount Name: CLINTON NNAMDI CHUKWUNYERE\nAccount Number: 9976907387";

// Dates setup
const today = new Date();
const formatToday = today.toISOString().split("T")[0];
const fourteenDaysLater = new Date();
fourteenDaysLater.setDate(today.getDate() + 14);
const formatDueDate = fourteenDaysLater.toISOString().split("T")[0];

const propId = `PROP-${today.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
const invId = `SC-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

// Amounts (₦700,000 Total: 50% deposit = ₦350,000, 50% balance = ₦350,000)
const totalAmount = 700000;
const depositAmount = 350000;
const balanceAmount = 350000;

// 1. Proposal State
const proposalState = {
  proposalTitle: "Enterprise Academy Gateway, LMS Campus, Guild Community & CRM Automation Engine",
  proposalId: propId,
  proposalDate: formatToday,
  
  ...DEFAULT_SENDER,
  
  clientName: "Academy Executive Leadership",
  clientContact: "Director / Steering Committee",
  clientAddress: "Nigeria / Global",
  clientEmail: "",
  clientPhone: "",
  
  projectOverview: "This proposal details the end-to-end design, system architecture, integration middleware, and automated workflow deployment for a multi-tiered Academy Platform. The system seamlessly unifies a public marketing gateway, a full-featured LMS learning campus, a private community guild workspace, dual global/local payment checkout, Zoom virtual classroom integration, Single Sign-On (SSO) authentication, and CRM lead/student automation.",
  
  modules: [
    {
      id: "1",
      title: "1. Public Marketing Gateway, CMS & UI/UX Design System",
      timeline: "4-5 Days",
      cost: 180000,
      description: "Custom visual design system and public portal for marketing, resource media library, events, and student admissions intake.",
      deliverables: [
        "Bespoke UI/UX design wireframes and responsive frontend assets across all portals",
        "Public Gateway Portal (Home, About, Vision/Mission, Faculty & Leadership Directory)",
        "Resource & Media Library architecture (custom post types for podcasts, blog articles, whitepapers, downloadable guides)",
        "Events & Summits Hub (Event listings, ticketing/registration pages, agenda schedules)",
        "Admissions Intake Interface with preliminary document upload capabilities"
      ]
    },
    {
      id: "2",
      title: "2. LMS Campus Engine & Automated Credentialing System",
      timeline: "4-5 Days",
      cost: 200000,
      description: "Provisioning of LMS environment, interactive video course modules, testing engine, and digital certificates.",
      deliverables: [
        "LMS environment provisioning & white-labeled campus setup (Canvas/Teachable/Moodle)",
        "Course layout framework (video streaming player, interactive modules, reading assignments, workbook downloads)",
        "Academic testing engine (quizzes, peer-review assignment submission portals)",
        "Automated credentialing engine issuing dynamic digital certificates/diplomas upon course completion"
      ]
    },
    {
      id: "3",
      title: "3. Community Guild Platform & Multi-Currency Payment Infrastructure",
      timeline: "3-4 Days",
      cost: 170000,
      description: "Member directory guild platform, Venture Lab submission portal, and global/local payment checkout gateways.",
      deliverables: [
        "Community Guild platform workspace deployment & branding (Circle.so or Mighty Networks)",
        "Searchable global member directory with custom filtering by city chapter, industry, or discipline",
        "Venture & Innovation Lab portal (business/ministry plan submission forms & document review dashboards)",
        "Dual-Gateway Payment Checkout: Stripe / PayPal (US/Europe/global) paired with Paystack (African market)",
        "Checkout workflows for tuition installments, one-time course fees, recurring guild memberships, and event tickets"
      ]
    },
    {
      id: "4",
      title: "4. Single Sign-On (SSO), Zoom API & CRM Automation Pipelines",
      timeline: "3-4 Days",
      cost: 150000,
      description: "Unified authentication middleware, live video classroom integration, and automated CRM data pipelines.",
      deliverables: [
        "Unified Authentication & Single Sign-On (SSO) connecting Public Gateway, LMS, and Community without duplicate logins",
        "Virtual Classroom Zoom / Webex API integration for automated cohort room generation & scheduling",
        "Subdomain DNS mapping across `learn.domain.com`, `community.domain.com`, `apply.domain.com` with shared SSL",
        "CRM Data Schema & Student Pipeline in HubSpot/ActiveCampaign (Visitor → Applicant → Student → Alumni)",
        "Payment-triggered automated LMS enrollment, community invite generation, and transactional email notification alerts"
      ]
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentMilestones: [
    { label: "Milestone 1: 50% Kickoff Deposit (Paid Now) - ₦350,000", percentage: 50 },
    { label: "Milestone 2: 50% Final Balance Upon Completion & Handover - ₦350,000", percentage: 50 }
  ],
  paymentInfo: PAYMENT_INFO,
  notes: "1. Project development commences upon receipt of the 50% initial deposit (₦350,000).\n2. Total estimated delivery & integration timeline is 14–21 working days.\n3. Balance of ₦350,000 is due upon completion prior to final domain DNS cutover and admin credential handover.\n4. Third-party SaaS subscription fees (e.g. Circle.so, ActiveCampaign, Zoom API) or domain renewals are separate from engineering fees.",
};

// 2. Invoice State for 50% Kickoff Deposit (₦350,000)
const invoiceUpfrontState = {
  invoiceNumber: invId,
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  senderName: DEFAULT_SENDER.senderName + " (Sales Cowboy)",
  senderAddress: DEFAULT_SENDER.senderAddress,
  senderEmail: DEFAULT_SENDER.senderEmail,
  senderPhone: DEFAULT_SENDER.senderPhone,
  senderWebsite: DEFAULT_SENDER.senderWebsite,
  
  clientName: "Academy Executive Leadership",
  clientContact: "Director / Steering Committee",
  clientAddress: "Nigeria / Global",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "50% Initial Deposit (Milestone 1) - Enterprise Academy Gateway, LMS Campus, Guild Community & CRM Automation Engine",
      quantity: 1,
      rate: 350000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. 50% Kickoff Deposit Invoice (₦350,000). Remaining 50% balance (₦350,000) is due upon project completion.\n2. Expected development timeline: 14–21 working days.\n3. Please send payment confirmation to hello@salescowboy.com.ng to commence development.",
};

// 3. Full Estimate Invoice State (₦700,000)
const invoiceFullState = {
  invoiceNumber: invId + "-FULL",
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  senderName: DEFAULT_SENDER.senderName + " (Sales Cowboy)",
  senderAddress: DEFAULT_SENDER.senderAddress,
  senderEmail: DEFAULT_SENDER.senderEmail,
  senderPhone: DEFAULT_SENDER.senderPhone,
  senderWebsite: DEFAULT_SENDER.senderWebsite,
  
  clientName: "Academy Executive Leadership",
  clientContact: "Director / Steering Committee",
  clientAddress: "Nigeria / Global",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "Public Marketing Gateway, UI/UX Design System, Media Library, Events Hub & Admissions Portal",
      quantity: 1,
      rate: 180000
    },
    {
      id: "2",
      description: "LMS Learning Campus Setup, Video Player, Quiz Engine & Automated Digital Credentialing",
      quantity: 1,
      rate: 200000
    },
    {
      id: "3",
      description: "Community Guild Platform, Member Directory, Venture Lab & Multi-Currency Checkout (Stripe + Paystack)",
      quantity: 1,
      rate: 170000
    },
    {
      id: "4",
      description: "Single Sign-On (SSO), Zoom API Integration, Subdomain DNS Routing & CRM Workflow Automation Pipeline",
      quantity: 1,
      rate: 150000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦700,000. Terms: 50% deposit now (₦350,000), 50% balance upon completion (₦350,000).\n2. Payment account details are listed above.",
};

// Generate URLs
const baseUrl = "https://salescowboy.com.ng";
const localUrl = "http://localhost:3000";

const proposalData = serializeState(proposalState);
const invoiceUpfrontData = serializeState(invoiceUpfrontState);
const invoiceFullData = serializeState(invoiceFullState);

const output = [];
output.push("==================================================");
output.push("   SALES COWBOY PROPOSAL & INVOICE LINK GENERATOR  ");
output.push("==================================================\n");

output.push(`PROJECT: Enterprise Academy Gateway, LMS Campus, Guild Community & CRM Automation Engine`);
output.push("TOTAL COST: ₦700,000.00");
output.push("DEPOSIT (50%): ₦350,000.00 (Paid now)");
output.push("BALANCE (50%): ₦350,000.00 (Upon completion)\n");

output.push("--------------------------------------------------");
output.push("1. PROJECT PROPOSAL / SCOPE LINKS:");
output.push("--------------------------------------------------");
output.push(`- CLIENT VIEW LINK (Read-Only):\n  ${baseUrl}/proposal/?data=${proposalData}&mode=view\n`);
output.push(`- EDITABLE LINK (For Admin Adjustments):\n  ${baseUrl}/proposal/?data=${proposalData}&mode=edit\n`);
output.push(`- LOCAL DEV VIEW LINK:\n  ${localUrl}/proposal/?data=${proposalData}&mode=view\n`);

output.push("--------------------------------------------------");
output.push("2. 50% DEPOSIT INVOICE LINKS (₦350,000.00 Deposit):");
output.push("--------------------------------------------------");
output.push(`- CLIENT VIEW LINK (Read-Only):\n  ${baseUrl}/invoice/?data=${invoiceUpfrontData}&mode=view\n`);
output.push(`- EDITABLE LINK (For Admin Adjustments):\n  ${baseUrl}/invoice/?data=${invoiceUpfrontData}&mode=edit\n`);
output.push(`- LOCAL DEV VIEW LINK:\n  ${localUrl}/invoice/?data=${invoiceUpfrontData}&mode=view\n`);

output.push("--------------------------------------------------");
output.push("3. FULL PROJECT INVOICE LINKS (₦700,000.00 Total):");
output.push("--------------------------------------------------");
output.push(`- CLIENT VIEW LINK (Read-Only):\n  ${baseUrl}/invoice/?data=${invoiceFullData}&mode=view\n`);
output.push(`- EDITABLE LINK (For Admin Adjustments):\n  ${baseUrl}/invoice/?data=${invoiceFullData}&mode=edit\n`);
output.push(`- LOCAL DEV VIEW LINK:\n  ${localUrl}/invoice/?data=${invoiceFullData}&mode=view\n`);

output.push("==================================================");

const finalString = output.join("\n");
console.log(finalString);
fs.writeFileSync(path.join(__dirname, '../generated-links.md'), finalString);
