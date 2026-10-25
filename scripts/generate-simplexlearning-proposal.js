const fs = require('fs');
const path = require('path');

const serializeState = (state) => {
  const str = JSON.stringify(state);
  const bytes = new TextEncoder().encode(str);
  let binString = "";
  for (let i = 0; i < bytes.length; i++) {
    binString += String.fromCharCode(bytes[i]);
  }
  return btoa(binString);
};

const PAYMENT_INFO = "Bank Name: GLOBUS BANK\nAccount Name: CLINTON NNAMDI CHUKWUNYERE\nAccount Number: 9976907387";

const today = new Date();
const formatToday = today.toISOString().split("T")[0];
const fourteenDaysLater = new Date();
fourteenDaysLater.setDate(today.getDate() + 14);
const formatDueDate = fourteenDaysLater.toISOString().split("T")[0];

const propId = `PROP-${today.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
const invId = `SC-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

const DEFAULT_SENDER = {
  senderName: "Clinton Chukwunyere",
  senderDesignation: "Chief Software & Cloud Engineer",
  senderAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232",
  senderWebsite: "salescowboy.com.ng",
};

const proposalState = {
  proposalTitle: "Simplexlearning Interactive EdTech Platform & Canvas Engine",
  proposalId: propId,
  proposalDate: formatToday,
  
  ...DEFAULT_SENDER,
  
  clientName: "Simplexlearning",
  clientContact: "Executive Management & Product Team",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  projectOverview: "This proposal details the end-to-end design, system architecture, custom development, and cloud deployment of the Simplexlearning Interactive EdTech Platform. The platform delivers an advanced in-browser Interactive Canvas Engine for real-time annotation and mathematical tools, a 4-tier subscription & multi-tenant access control architecture powered by Paystack (Individual, Teacher, Family, School), secure slide/PDF document management with anti-download DRM content protection, and standard web application infrastructure with student/teacher dashboards.",
  
  modules: [
    {
      id: "1",
      title: "1. The Interactive Canvas Engine & Mathematical Tooling",
      timeline: "7 - 10 Days",
      cost: 250000,
      description: "In-browser drawing and mathematical application featuring high-performance canvas rendering, real-time annotation, virtual instruments, and smooth erasing over imported educational slides and PDFs.",
      deliverables: [
        "HTML5 Canvas engine with sub-millisecond drawing latency and state management",
        "Virtual interactive mathematical tools: virtual rulers, protractors, and coordinate grids",
        "Real-time stroke rendering, multi-color pen palettes, highlighter, and smooth eraser engine",
        "Imported slide and PDF background rendering with fluid zoom, pan, and page switching",
        "Cross-device stylus and touch optimization for tablets, iPads, and interactive displays"
      ]
    },
    {
      id: "2",
      title: "2. Multi-Tier Subscription & Multi-Tenant Access Control",
      timeline: "5 - 7 Days",
      cost: 150000,
      description: "Tiered subscription logic using Paystack across 4 distinct tiers, featuring multi-tenant parent/child account management for Families and Schools.",
      deliverables: [
        "Paystack subscription integration with automated recurring billing and webhooks",
        "4-tier access control logic: Individual, Teacher, Family, and School tiers",
        "Multi-tenant architecture: 'Parent'/'School Admin' accounts managing and provisioning 'Student' sub-accounts",
        "Automated access provisioning, receipt generation, and expired license enforcement",
        "Role-based permission middleware safeguarding premium educational resources"
      ]
    },
    {
      id: "3",
      title: "3. Document Management & Advanced DRM Content Protection",
      timeline: "4 - 5 Days",
      cost: 120000,
      description: "Cloud document processing pipeline with robust content protection to prevent unauthorized downloading or inspection of proprietary teaching materials.",
      deliverables: [
        "Cloud storage integration for storing and streaming slides and PDFs securely",
        "Anti-piracy protection layer: right-click disabling, keyboard shortcut blocking, and dev-tools prevention",
        "Direct-to-canvas document rendering (prevents raw PDF file extraction and DOM inspection)",
        "Dynamic session watermarking on canvas viewport (user identifier stamped on live view)",
        "Optimized asset streaming for rapid loading on low-bandwidth networks"
      ]
    },
    {
      id: "4",
      title: "4. Core Web App, Dashboards, Booking & Railway Cloud Deployment",
      timeline: "3 - 5 Days",
      cost: 80000,
      description: "Responsive public web portal, student/teacher dashboards, booking system, business emails, and production cloud provisioning on Railway.",
      deliverables: [
        "Responsive marketing landing pages and educational booking/inquiry forms",
        "Teacher and Student account management dashboards",
        "Domain setup, SSL padlock configuration, and custom business emails",
        "Railway cloud production environment setup ($5/month ~ ₦6,500/month)",
        "Comprehensive end-to-end QA testing, performance audit, and launch handover"
      ]
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentMilestones: [
    { label: "Milestone 1: 50% Kickoff Deposit (Paid Now) - ₦300,000", percentage: 50 },
    { label: "Milestone 2: 50% Final Balance Upon Completion & Handover - ₦300,000", percentage: 50 }
  ],
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦600,000.\n2. Cloud Infrastructure: Hosted on Railway at $5 / month (~₦6,500 / month) for high-availability cloud servers and managed database.\n3. Payment Terms: 50% kickoff deposit (₦300,000) upon signing, and 50% balance (₦300,000) upon project completion and deployment.\n4. Delivery Timeline: Estimated 3 to 4 weeks from project kickoff.",
};

const invoiceUpfrontState = {
  invoiceNumber: invId,
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  senderName: DEFAULT_SENDER.senderName + " (Sales Cowboy)",
  senderAddress: DEFAULT_SENDER.senderAddress,
  senderEmail: DEFAULT_SENDER.senderEmail,
  senderPhone: DEFAULT_SENDER.senderPhone,
  senderWebsite: DEFAULT_SENDER.senderWebsite,
  
  clientName: "Simplexlearning",
  clientContact: "Executive Management & Product Team",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "50% Initial Deposit (Milestone 1) - Simplexlearning Interactive EdTech Platform & Canvas Engine",
      quantity: 1,
      rate: 300000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. 50% Kickoff Deposit Invoice (₦300,000). Remaining 50% balance (₦300,000) is due upon project completion and deployment.\n2. Cloud Infrastructure: Railway hosting is $5 / month (~₦6,500 / month).\n3. Please send payment confirmation to hello@salescowboy.com.ng to commence development.",
};

const invoiceFullState = {
  invoiceNumber: invId + "-FULL",
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  senderName: DEFAULT_SENDER.senderName + " (Sales Cowboy)",
  senderAddress: DEFAULT_SENDER.senderAddress,
  senderEmail: DEFAULT_SENDER.senderEmail,
  senderPhone: DEFAULT_SENDER.senderPhone,
  senderWebsite: DEFAULT_SENDER.senderWebsite,
  
  clientName: "Simplexlearning",
  clientContact: "Executive Management & Product Team",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "The Interactive Canvas Engine & Mathematical Tooling (In-browser canvas, annotation, virtual rulers/protractors, slide/PDF background)",
      quantity: 1,
      rate: 250000
    },
    {
      id: "2",
      description: "Multi-Tier Subscription & Multi-Tenant Access Control (Paystack integration, Individual/Teacher/Family/School tiers, parent-child sub-accounts)",
      quantity: 1,
      rate: 150000
    },
    {
      id: "3",
      description: "Document Management & Advanced DRM Content Protection (Secure PDF/slide storage, anti-download DRM, canvas rendering, dynamic watermarking)",
      quantity: 1,
      rate: 120000
    },
    {
      id: "4",
      description: "Core Web App, Dashboards, Booking & Railway Cloud Deployment (Portals, dashboards, custom email, Railway production setup)",
      quantity: 1,
      rate: 80000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦600,000. Terms: 50% deposit (₦300,000) to commence, 50% balance (₦300,000) upon completion.\n2. Cloud Infrastructure: Hosted on Railway at $5 / month (~₦6,500 / month).\n3. Remit payment to the Globus Bank details above.",
};

const baseUrl = "https://salescowboy.com.ng";
const localUrl = "http://localhost:3000";

const proposalData = serializeState(proposalState);
const invoiceUpfrontData = serializeState(invoiceUpfrontState);
const invoiceFullData = serializeState(invoiceFullState);

fs.writeFileSync(path.join(__dirname, 'simplexlearning-links.json'), JSON.stringify({
  proposal: {
    clientView: `${baseUrl}/proposal/?data=${proposalData}&mode=view`,
    editable: `${baseUrl}/proposal/?data=${proposalData}&mode=edit`
  },
  depositInvoice: {
    clientView: `${baseUrl}/invoice/?data=${invoiceUpfrontData}&mode=view`,
    editable: `${baseUrl}/invoice/?data=${invoiceUpfrontData}&mode=edit`
  },
  fullInvoice: {
    clientView: `${baseUrl}/invoice/?data=${invoiceFullData}&mode=view`,
    editable: `${baseUrl}/invoice/?data=${invoiceFullData}&mode=edit`
  }
}, null, 2));

console.log("Proposal Client Link:\n" + `${baseUrl}/proposal/?data=${proposalData}&mode=view\n`);
console.log("Proposal Edit Link:\n" + `${baseUrl}/proposal/?data=${proposalData}&mode=edit\n`);
console.log("Deposit Client Link:\n" + `${baseUrl}/invoice/?data=${invoiceUpfrontData}&mode=view\n`);
console.log("Deposit Edit Link:\n" + `${baseUrl}/invoice/?data=${invoiceUpfrontData}&mode=edit\n`);

