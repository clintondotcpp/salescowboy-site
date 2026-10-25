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
  proposalTitle: "Custom Real Estate Lead Tracker & CRM",
  proposalId: propId,
  proposalDate: formatToday,
  
  ...DEFAULT_SENDER,
  
  clientName: "Client Leadership",
  clientContact: "Director / Steering Committee",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  projectOverview: "This proposal details the development of a Custom Real Estate Lead Tracker & CRM. It includes a Next.js frontend with isolated views for Admin and Marketing Staff, a lead database and tracking engine, proof-of-work file infrastructure for secure document uploads, and comprehensive deployment, testing, and team training.",
  
  modules: [
    {
      id: "1",
      title: "1. Authentication & UI Dashboards",
      timeline: "3-4 Days",
      cost: 150000,
      description: "Next.js frontend with isolated views for Admin oversight and Marketing Staff data entry.",
      deliverables: [
        "Secure authentication system",
        "Admin oversight dashboard",
        "Marketing Staff data entry interface"
      ]
    },
    {
      id: "2",
      title: "2. Lead Database & Tracking Engine",
      timeline: "3-4 Days",
      cost: 200000,
      description: "Schema design for categorization (outbound, referral) and staff attribution.",
      deliverables: [
        "Database schema design",
        "Lead categorization (outbound, referral)",
        "Staff attribution tracking"
      ]
    },
    {
      id: "3",
      title: "3. Proof-of-Work File Infrastructure",
      timeline: "2-3 Days",
      cost: 150000,
      description: "Integration with object storage (e.g., DigitalOcean Spaces or AWS S3) to handle image/document uploads securely.",
      deliverables: [
        "Secure object storage integration",
        "Image and document upload handlers",
        "Proof-of-Work file linking to leads"
      ]
    },
    {
      id: "4",
      title: "4. Deployment, Testing & Training",
      timeline: "2 Days",
      cost: 100000,
      description: "Production server configuration, QA, and onboarding the marketing team.",
      deliverables: [
        "Production server setup and configuration",
        "Quality Assurance (QA) testing",
        "Marketing team onboarding and training"
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
  notes: "1. Project development commences upon receipt of the 50% initial deposit (₦300,000).\n2. Balance of ₦300,000 is due upon completion prior to final handover.",
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
  
  clientName: "Client Leadership",
  clientContact: "Director / Steering Committee",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "50% Initial Deposit (Milestone 1) - Custom Real Estate Lead Tracker & CRM",
      quantity: 1,
      rate: 300000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. 50% Kickoff Deposit Invoice (₦300,000). Remaining 50% balance (₦300,000) is due upon project completion.\n2. Please send payment confirmation to hello@salescowboy.com.ng to commence development.",
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
  
  clientName: "Client Leadership",
  clientContact: "Director / Steering Committee",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "Authentication & UI Dashboards (Next.js frontend with isolated views)",
      quantity: 1,
      rate: 150000
    },
    {
      id: "2",
      description: "Lead Database & Tracking Engine (Schema design for categorization and staff attribution)",
      quantity: 1,
      rate: 200000
    },
    {
      id: "3",
      description: "Proof-of-Work File Infrastructure (Object storage integration for uploads)",
      quantity: 1,
      rate: 150000
    },
    {
      id: "4",
      description: "Deployment, Testing & Training (Server setup, QA, and team onboarding)",
      quantity: 1,
      rate: 100000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦600,000. Terms: 50% deposit now (₦300,000), 50% balance upon completion (₦300,000).\n2. Payment account details are listed above.",
};

const baseUrl = "https://salescowboy.com.ng";
const localUrl = "http://localhost:3000";

const proposalData = serializeState(proposalState);
const invoiceUpfrontData = serializeState(invoiceUpfrontState);
const invoiceFullData = serializeState(invoiceFullState);

const output = [];
output.push("==================================================");
output.push("   CRM PROPOSAL & INVOICE LINK GENERATOR  ");
output.push("==================================================\n");

output.push(`PROJECT: Custom Real Estate Lead Tracker & CRM`);
output.push("TOTAL COST: ₦600,000.00\n");

output.push("--------------------------------------------------");
output.push("1. PROJECT PROPOSAL LINKS:");
output.push("--------------------------------------------------");
output.push(`- CLIENT VIEW LINK (Read-Only):\n  ${baseUrl}/proposal/?data=${proposalData}&mode=view\n`);
output.push(`- EDITABLE LINK (For Admin Adjustments):\n  ${baseUrl}/proposal/?data=${proposalData}&mode=edit\n`);
output.push(`- LOCAL DEV VIEW LINK:\n  ${localUrl}/proposal/?data=${proposalData}&mode=view\n`);

output.push("--------------------------------------------------");
output.push("2. 50% DEPOSIT INVOICE LINKS (₦300,000.00 Deposit):");
output.push("--------------------------------------------------");
output.push(`- CLIENT VIEW LINK (Read-Only):\n  ${baseUrl}/invoice/?data=${invoiceUpfrontData}&mode=view\n`);
output.push(`- EDITABLE LINK (For Admin Adjustments):\n  ${baseUrl}/invoice/?data=${invoiceUpfrontData}&mode=edit\n`);
output.push(`- LOCAL DEV VIEW LINK:\n  ${localUrl}/invoice/?data=${invoiceUpfrontData}&mode=view\n`);

output.push("--------------------------------------------------");
output.push("3. FULL PROJECT INVOICE LINKS (₦600,000.00 Total):");
output.push("--------------------------------------------------");
output.push(`- CLIENT VIEW LINK (Read-Only):\n  ${baseUrl}/invoice/?data=${invoiceFullData}&mode=view\n`);
output.push(`- EDITABLE LINK (For Admin Adjustments):\n  ${baseUrl}/invoice/?data=${invoiceFullData}&mode=edit\n`);
output.push(`- LOCAL DEV VIEW LINK:\n  ${localUrl}/invoice/?data=${invoiceFullData}&mode=view\n`);

output.push("==================================================");

console.log(output.join("\n"));
