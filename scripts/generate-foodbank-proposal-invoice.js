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
const fourteenDaysLater = new Date();
fourteenDaysLater.setDate(today.getDate() + 14);
const formatDueDate = fourteenDaysLater.toISOString().split("T")[0];

const propId = `PROP-${today.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
const invId = `SC-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

const totalCost = 350000;
const depositCost = 175000;

// 1. PROPOSAL STATE
const proposalState = {
  proposalTitle: "Target Savings & Layaway E-Commerce Platform — Food Bank Special Services Ltd",
  proposalId: propId,
  proposalDate: formatToday,
  
  ...DEFAULT_SENDER,
  
  clientName: "Food Bank Special Services Ltd",
  clientContact: "Executive Leadership & Management Board",
  clientAddress: "Lagos, Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  projectOverview: "This technical proposal details the end-to-end design, custom software engineering, payment infrastructure, and cloud deployment of an Automated Target Savings & Layaway E-Commerce Portal for Food Bank Special Services Ltd. Built to digitize traditional Nigerian commodity thrift and installment purchase schemes, the platform allows customers to select curated foodstuff bundles (e.g., 50kg rice, cooking oil, tomatoes) and consumer electronics (e.g., deep freezers, smart TVs, washing machines, generators), lock in structured daily, weekly, or monthly contribution plans, track cumulative balances in real time, and trigger warehouse dispatch or depot pickup passes upon 100% target completion. The system incorporates automated multi-rail payment gateways (Paystack/Moniepoint), dedicated dynamic virtual bank accounts, manual bank receipt verification desks, administrative inventory controls, and automated transactional SMS and Email notifications.",
  
  modules: [
    {
      id: "1",
      title: "Module 1: Public Storefront, Commodity & Electronics Catalog & Installment Calculator",
      timeline: "Week 1 (Days 1 - 6)",
      cost: 80000,
      description: "High-conversion, mobile-responsive storefront showcasing categorized foodstuff bundles and electronics packages with dynamic installment breakdown simulators.",
      deliverables: [
        "Responsive Public Storefront: Fast, modern user interface categorized by Foodstuff Packages (Rice, Cooking Oil, Tomato Paste, Flour combos) and Electronics Packages (Freezers, Washing Machines, Generators, Smart TVs)",
        "Dynamic Package Details Showcase: Clean display of total package price, itemized bill of contents, brand specifications, high-resolution media, and savings duration plans",
        "Interactive Installment Calculator: Visual calculator demonstrating flexible payment schedules across Daily (e.g., ₦2,000/day for 60 days), Weekly (e.g., ₦14,000/week for 9 weeks), or Monthly (e.g., ₦60,000/month for 2.5 months) frequencies",
        "How It Works & Trust Center: Transparent operational guidelines explaining contribution cycles, default grace periods, collection terms, and physical redemption policies",
        "Domain Integration & Cloud Edge Security: SSL padlock certificate, HTTP/2 optimizations, and transactional SMS/Email sender routing configuration"
      ]
    },
    {
      id: "2",
      title: "Module 2: Customer Onboarding, Secure Portal & Real-Time Savings Progress Ledger",
      timeline: "Week 2 (Days 7 - 13)",
      cost: 95000,
      description: "Dedicated member dashboard empowering customers to track their subscribed target packages, visual completion percentage, and running transaction statements.",
      deliverables: [
        "Instant Customer Registration & Authentication: Frictionless signup via Phone Number, Email, and Delivery Address with encrypted credentials and auto-generated customer wallet ID",
        "Savings Overview Dashboard: High-visibility dashboard displaying subscribed active package, Total Target Cost, Total Contributed to Date, and Outstanding Balance Remaining",
        "Dynamic Target Progress Bar: Visual percentage progress tracker (e.g., ₦85,000 / ₦150,000 - 56.7%) clearly showing milestones reached and installments remaining",
        "Schedule Status & Due Date Monitor: Dynamic countdown indicators showing Next Payment Due Date and status tags (Due Today, Up to Date, Overdue)",
        "Chronological Contribution Ledger: Comprehensive financial statement recording date, payment channel, gateway reference, credit amount, and running cumulative balance with downloadable PDF statements",
        "Multi-Package Rollover Architecture: Capability for customers to subscribe to concurrent packages or rollover completed savings into new foodstuff/electronics items"
      ]
    },
    {
      id: "3",
      title: "Module 3: Multi-Rail Payment Integration (Paystack/Moniepoint) & Manual POP Verification Desk",
      timeline: "Week 2 - Week 3 (Days 14 - 20)",
      cost: 95000,
      description: "Automated multi-channel payment gateway combined with dedicated virtual bank accounts and an administrative proof-of-payment (POP) review queue.",
      deliverables: [
        "Online Payment Gateway Checkout: Paystack / Moniepoint checkout integration supporting all Nigerian debit cards (Mastercard, Visa, Verve) and instant USSD banking strings",
        "Dedicated Dynamic Virtual Bank Accounts: Auto-generation of dedicated virtual account numbers for frictionless mobile bank app transfers with automated instant ledger credit",
        "Manual Bank Transfer & POP Upload Engine: Mobile-friendly receipt upload tool for customers depositing cash at physical bank branches or transferring from non-integrated accounts",
        "Administrative Payment Reconciliation Queue: Interactive back-office console allowing finance officers to inspect uploaded bank teller receipts and click 'Approve & Credit Ledger' or 'Decline with Note'",
        "Anti-Duplicate Ledger Protection: Transaction hash hashing and unique reference locking preventing accidental or fraudulent double-crediting of identical payment receipts",
        "Instant Automated Payment Receipts: Branded transaction confirmation receipts generated and delivered immediately upon payment verification"
      ]
    },
    {
      id: "4",
      title: "Module 4: 100% Target Fulfillment Desk, Multi-Channel SMS/Email Notification Engine & Admin Command Center",
      timeline: "Week 3 - Week 4 (Days 21 - 27)",
      cost: 80000,
      description: "Automated order fulfillment state machine upon 100% savings completion, multi-channel transactional SMS/Email notifications, and executive management console.",
      deliverables: [
        "100% Target Completion Trigger: Automated state machine transitioning accounts upon reaching 100% target to 'Target Completed ➔ Processing ➔ Ready for Pickup / Out for Delivery'",
        "Tamper-Evident Redemption Claim Pass: Automated generation of unique 6-digit claim codes and QR verification passes for physical collection at Food Bank distribution hubs or home dispatch",
        "Multi-Channel Notification Gateway (Strictly SMS & Email): Automated transactional SMS and Email notifications for account welcome, payment credits, installment schedule reminders, 100% target completion, and dispatch notices (no third-party chat dependency)",
        "Package & Inventory Management Portal: Back-office CRUD suite allowing Food Bank managers to create, edit, price, and archive foodstuff bundles and electronics packages with photo uploads",
        "Customer Ledger Audit & Fulfillment Dispatch Desk: Centralized management console tracking all registered contributors, total funds mobilized, pending dispatches, and fulfillment records",
        "Default & Dormancy Sentinel: Automated detection engine flagging accounts defaulting on daily/weekly schedules, triggering gentle re-engagement SMS and Email reminders",
        "Production Cloud Deployment on Railway: Containerized API deployment, managed PostgreSQL database provisioning, automated daily backup routines, and SSL encryption"
      ]
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentMilestones: [
    { label: "Milestone 1: Project Mobilization, Storefront Catalog & Database Architecture (50%)", percentage: 50 },
    { label: "Milestone 2: Customer Savings Dashboard, Progress Tracker & Paystack Virtual Accounts (30%)", percentage: 30 },
    { label: "Milestone 3: Manual POP Queue, 100% Fulfillment Engine, SMS/Email Alerts & Live Launch (20%)", percentage: 20 }
  ],
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦350,000 fixed price.\n2. Milestone Payment Schedule: 50% Upfront Kickoff Deposit (₦175,000), 30% Member Portal & Payment Rails Milestone (₦105,000), 20% Fulfillment, SMS/Email Alerts & Live Handover (₦70,000).\n3. Notifications Architecture: All transactional communication, payment credits, reminder schedules, and pickup claim passes are powered strictly via high-delivery SMS and Email gateways (no WhatsApp required).\n4. Cloud Infrastructure: Client is responsible for their direct monthly cloud hosting fees (hosted on Railway with managed PostgreSQL at roughly $5 monthly, excluded from development fee).\n5. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere.\n6. Delivery Timeline: Exactly 3 to 4 weeks total delivery structured into milestones."
};

// 2. INVOICE STATES
// A) 50% Mobilization Deposit Invoice
const invoiceDepositState = {
  invoiceNumber: `${invId}-DEP`,
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  senderName: DEFAULT_SENDER.senderName,
  senderAddress: DEFAULT_SENDER.senderAddress,
  senderEmail: DEFAULT_SENDER.senderEmail,
  senderPhone: DEFAULT_SENDER.senderPhone,
  senderWebsite: DEFAULT_SENDER.senderWebsite,
  
  clientName: "Food Bank Special Services Ltd",
  clientContact: "Executive Leadership & Management Board",
  clientAddress: "Lagos, Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "50% Project Mobilization Deposit — Target Savings & Layaway E-Commerce Platform (Public Foodstuff/Electronics Storefront, Customer Progress Dashboard, Paystack/Virtual Accounts Integration, Manual POP Review Desk, 100% Target Fulfillment Pass, and Automated SMS/Email Notification Engine)",
      quantity: 1,
      rate: depositCost
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. 50% Mobilization Deposit (₦175,000) to commence development for Food Bank Special Services Ltd. Remaining balance (₦175,000) is structured across progress milestones.\n2. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere.\n3. Notifications: Transactional alerts configured strictly via SMS and Email channels.\n4. Cloud hosting is deployed on Railway at roughly $5 monthly (billed directly to cloud provider)."
};

// B) Full Project Invoice (Itemized ₦350,000)
const invoiceFullState = {
  invoiceNumber: invId,
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  senderName: DEFAULT_SENDER.senderName,
  senderAddress: DEFAULT_SENDER.senderAddress,
  senderEmail: DEFAULT_SENDER.senderEmail,
  senderPhone: DEFAULT_SENDER.senderPhone,
  senderWebsite: DEFAULT_SENDER.senderWebsite,
  
  clientName: "Food Bank Special Services Ltd",
  clientContact: "Executive Leadership & Management Board",
  clientAddress: "Lagos, Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "Module 1: Public Storefront, Foodstuff & Electronics Catalog & Installment Calculator (Daily, Weekly, Monthly simulators, itemized bundles)",
      quantity: 1,
      rate: 80000
    },
    {
      id: "2",
      description: "Module 2: Customer Onboarding, Member Savings Dashboard & Live Progress Ledger (Visual progress bar, running balance ledger, due date monitor)",
      quantity: 1,
      rate: 95000
    },
    {
      id: "3",
      description: "Module 3: Multi-Rail Payment Integration (Paystack/Moniepoint) & Manual POP Verification Queue (Card, USSD, dedicated virtual accounts, bank receipt uploads)",
      quantity: 1,
      rate: 95000
    },
    {
      id: "4",
      description: "Module 4: 100% Target Fulfillment Desk, Multi-Channel SMS/Email Notification Engine & Admin Command Center (Claim passes, SMS/Email alerts, inventory management, Railway cloud launch)",
      quantity: 1,
      rate: 80000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦350,000 fixed price for Food Bank Special Services Ltd.\n2. Payment Terms: 50% upfront deposit (₦175,000) to begin engineering, 30% milestone 2 (₦105,000), 20% final deployment and handover (₦70,000).\n3. Notifications: All alerts, payment receipts, and pickup codes are delivered strictly via SMS and Email.\n4. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere."
};

const baseUrl = "https://salescowboy.com.ng";

const proposalEncoded = serializeState(proposalState);
const invoiceDepositEncoded = serializeState(invoiceDepositState);
const invoiceFullEncoded = serializeState(invoiceFullState);

const links = {
  client: "Food Bank Special Services Ltd",
  totalCost: "₦350,000",
  depositCost: "₦175,000",
  proposal: {
    clientView: `${baseUrl}/proposal/?data=${proposalEncoded}&mode=view`,
    editable: `${baseUrl}/proposal/?data=${proposalEncoded}&mode=edit`,
  },
  invoiceDeposit: {
    clientView: `${baseUrl}/invoice/?data=${invoiceDepositEncoded}&mode=view`,
    editable: `${baseUrl}/invoice/?data=${invoiceDepositEncoded}&mode=edit`,
  },
  invoiceFull: {
    clientView: `${baseUrl}/invoice/?data=${invoiceFullEncoded}&mode=view`,
    editable: `${baseUrl}/invoice/?data=${invoiceFullEncoded}&mode=edit`,
  }
};

const outputPath = path.join(__dirname, 'foodbank-links.json');
fs.writeFileSync(outputPath, JSON.stringify(links, null, 2));

console.log("=== FOOD BANK SPECIAL SERVICES LTD PROPOSAL & INVOICE GENERATED ===");
console.log("Proposal Client View:", links.proposal.clientView);
console.log("Proposal Edit View:", links.proposal.editable);
console.log("\nDeposit Invoice (50% - ₦175,000) Client View:", links.invoiceDeposit.clientView);
console.log("Deposit Invoice (50% - ₦175,000) Edit View:", links.invoiceDeposit.editable);
console.log("\nFull Invoice (₦350,000) Client View:", links.invoiceFull.clientView);
console.log("Full Invoice (₦350,000) Edit View:", links.invoiceFull.editable);
