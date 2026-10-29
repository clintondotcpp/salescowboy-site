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

// Corporate Details (Sender)
const DEFAULT_SENDER = {
  senderName: "Clinton Chukwunyere",
  senderDesignation: "Chief Software & Cloud Engineer",
  senderAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232",
  senderWebsite: "salescowboy.com.ng",
};

// Payment instructions
const PAYMENT_INFO = "Bank Name: GLOBUS BANK\nAccount Name: CLINTON NNAMDI CHUKWUNYERE\nAccount Number: 9976907387";

// Dates
const today = new Date();
const formatToday = today.toISOString().split("T")[0];
const fourteenDaysLater = new Date();
fourteenDaysLater.setDate(today.getDate() + 14);
const formatDueDate = fourteenDaysLater.toISOString().split("T")[0];

const propId = `PROP-${today.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
const invId = `SC-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

// Total: ₦300,000
const totalAmount = 300000;
const depositAmount = 150000;
const balanceAmount = 150000;

// Proposal State
const proposalState = {
  proposalTitle: "My Daily Contribution: Digital ROSCA (Ajo/Esusu) Daily Savings & Automated Payout Platform",
  proposalId: propId,
  proposalDate: formatToday,
  
  ...DEFAULT_SENDER,
  
  clientName: "My Daily Contribution Team",
  clientContact: "Project Sponsors & Steering Committee",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  projectOverview: "This technical proposal covers the full-cycle engineering, architecture, frontend/backend development, financial reconciliation engine, and cloud deployment of 'My Daily Contribution'—a high-concurrency digital Rotating Savings and Credit Association (ROSCA / Ajo / Esusu) web application. The platform allows thousands of registered members to contribute ₦1,000 daily via secure payment rails (Card, USSD, and Bank Transfer via Paystack), manages dynamic rotating payout queues for 20 daily recipients (₦250,000 gross / ₦237,500 net), automates 5% platform management fee deductions (₦12,500 per recipient / ₦250,000 daily pool revenue), mitigates default risk, and equips administrators with a comprehensive operations suite.",
  
  modules: [
    {
      id: "1",
      title: "Module 1: Public Gateway, Plan Simulator & Legal Trust Center",
      timeline: "4 - 5 Days",
      cost: 50000,
      description: "High-trust, mobile-first public website featuring the brand identity, value proposition, plan transparent calculations, and regulatory notices.",
      deliverables: [
        "Responsive, modern web architecture (Home, About, How It Works, FAQ, Contact)",
        "Hero section: 'Small Contributions. Big Dreams.' value proposition with community visuals and instant CTA ('Join Now')",
        "Core feature value highlights: Secure Registration, Safe & Transparent, Daily Contributions, Scheduled Payouts",
        "Interactive Contribution Breakdown Calculator: Visual simulator modeling 5,000 members, ₦1,000 daily contribution, ₦5,000,000 daily gross pool, 20 recipients, ₦250k gross payout, 5% fee (₦12,500), and ₦237,500 net recipient payout",
        "Transparency & disclaimer framework: Test/sandbox disclaimer notice, payout verification criteria, and official platform URL protections",
        "Domain connection, SSL encryption padlock setup, and corporate email routing"
      ]
    },
    {
      id: "2",
      title: "Module 2: Member Authentication, Onboarding & Identity Guard (KYC)",
      timeline: "4 - 5 Days",
      cost: 55000,
      description: "Secure, tamper-resistant onboarding infrastructure capturing geographic and contact data while enforcing password encryption and session control.",
      deliverables: [
        "Registration engine ('Create Your Account'): Full Name, Email, Phone, State, LGA (Local Government Area) dropdowns, Password hashing",
        "Mandatory Terms & Conditions agreement checkbox binding members to contribution schedules",
        "Authentication portal ('Member Login'): Email/Phone login, 'Remember me' cookies, secure 'Forgot Password?' reset token workflow",
        "Security assurance indicators and fraud protection badges",
        "Member profile management: Contact updates, next of kin data, and verified bank account setup (NUBAN resolution for automated disbursements)"
      ]
    },
    {
      id: "3",
      title: "Module 3: Member Portal & Daily Contribution Engine (Multi-Rail Paystack)",
      timeline: "6 - 7 Days",
      cost: 70000,
      description: "Interactive user dashboard providing instant KPI visibility, multi-rail daily contribution checkout, and queue status tracking.",
      deliverables: [
        "Member Dashboard: Daily Contribution Due (₦1,000 & status), Total Contributed, and Assigned Payout Position (#12)",
        "Status and eligibility indicator banner with quick action shortcuts ('Contribute Now', 'View History', 'Check Payout Status')",
        "Multi-rail payment selector: Debit Card checkout, USSD banking codes, and Direct Bank Transfer via Paystack integration",
        "Automated payment webhook reconciliation: Instant ledger credit upon successful transaction verification with zero manual latency",
        "Tabular Contribution History ledger: Date, Amount, Reference ID, and Status tags (Success, Pending, Failed)",
        "Payout Position & Queue Inspector: Current position display (#12 out of 20 daily recipients), gross amount (₦250k), 5% platform fee (₦12.5k), net amount payable (₦237.5k), scheduled payout time (12:00 PM), and automated notification alerts"
      ]
    },
    {
      id: "4",
      title: "Module 4: ROSCA Rotation Engine, Queue Dynamics & Default Risk Logic",
      timeline: "6 - 8 Days",
      cost: 65000,
      description: "The core algorithmic backbone governing rotating payout queues, daily cycle resets, automated fee deductions, and anti-default protection.",
      deliverables: [
        "Algorithmic Queue Management Engine: Automated FIFO / structured rotation logic mapping registered members to daily payout slots",
        "Daily Cycle Engine: 12:00 PM daily cycle triggers managing the 20-recipient batch selection and disbursement preparation",
        "Automated Fee Split Accounting: Automatic 5% deduction (₦12,500 per recipient) credited to platform reserve wallet",
        "Default Handling & Dynamic Reordering Logic: Detection algorithms that identify members who default on daily ₦1,000 contributions and dynamically pause or reorder their queue position",
        "Post-Payout Default Mitigation Guard: Security rules flagging members who collect their lump sum (₦237,500) to enforce continuing daily obligations",
        "Ledger reconciliation engine verifying that 5,000 daily contributions match gross pool allocations"
      ]
    },
    {
      id: "5",
      title: "Module 5: Super-Admin Operations, Disbursement Management & Audit Suite",
      timeline: "5 - 6 Days",
      cost: 60000,
      description: "Comprehensive administrative control center enabling platform operators to verify payments, execute batch payouts, manage members, and track platform revenue.",
      deliverables: [
        "Admin KPI Command Center: Total Members (5,000), Today's Contributions (₦5,000,000), Today's Payouts Completion Ratio (20/20), and Total Management Fees Collected (₦250,000)",
        "Member Management & CRM: Full member registry, search by State/LGA, contribution compliance rating, and manual account freeze/unfreeze controls",
        "Payout Management & Batch Disbursement: Admin interface to review the 20 daily recipients, verify NUBAN details, and trigger bulk automated transfers via Paystack Transfer API or export verified banking batch lists",
        "Manual Payment Verification Override: Administrative approval queue for offline/un-reconciled bank transfers with one-click ledger adjustment",
        "Recent activity logs and comprehensive downloadable financial reports (collections, fees, defaults, and disbursements)"
      ]
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentMilestones: [
    { label: "Milestone 1: Project Kickoff & UI/Architecture Setup (50%)", percentage: 50 },
    { label: "Milestone 2: Final Testing, Webhook Verification & Production Deployment (50%)", percentage: 50 }
  ],
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦300,000. Terms: 50% Kickoff Deposit (₦150,000) and 50% Final Balance upon completion (₦150,000).\n2. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere.\n3. Turnaround Timeline: 2 to 3 weeks for full end-to-end development, automated testing, Paystack sandbox/live verification, and cloud hosting deployment."
};

// 2. Invoice States
const invoiceDepositState = {
  invoiceTitle: "Deposit Invoice: My Daily Contribution ROSCA Platform (50% Kickoff)",
  invoiceId: `${invId}-DEP`,
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  senderName: DEFAULT_SENDER.senderName,
  senderDesignation: DEFAULT_SENDER.senderDesignation,
  senderAddress: DEFAULT_SENDER.senderAddress,
  senderEmail: DEFAULT_SENDER.senderEmail,
  senderPhone: DEFAULT_SENDER.senderPhone,
  senderWebsite: DEFAULT_SENDER.senderWebsite,
  
  clientName: "My Daily Contribution Team",
  clientContact: "Project Sponsors & Steering Committee",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "50% Project Kickoff Deposit — My Daily Contribution Digital ROSCA Platform (Public Gateway, Auth/KYC, Member Portal, Paystack Integration, ROSCA Queue Engine, and Admin Management Suite)",
      quantity: 1,
      rate: depositAmount
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. 50% Mobilization Deposit to commence UI design, database architecture, Paystack webhook configuration, and core ROSCA rotation engine development.\n2. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere."
};

const invoiceFullState = {
  invoiceTitle: "Commercial Invoice: My Daily Contribution ROSCA Platform (Full Project)",
  invoiceId: invId,
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  senderName: DEFAULT_SENDER.senderName,
  senderDesignation: DEFAULT_SENDER.senderDesignation,
  senderAddress: DEFAULT_SENDER.senderAddress,
  senderEmail: DEFAULT_SENDER.senderEmail,
  senderPhone: DEFAULT_SENDER.senderPhone,
  senderWebsite: DEFAULT_SENDER.senderWebsite,
  
  clientName: "My Daily Contribution Team",
  clientContact: "Project Sponsors & Steering Committee",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "Module 1: Public Gateway, Interactive Plan Simulator & Legal Trust Center (Domain, SSL, Plan Breakdown)",
      quantity: 1,
      rate: 50000
    },
    {
      id: "2",
      description: "Module 2: Member Authentication, Onboarding & Identity Guard (State/LGA dropdowns, KYC, Password Reset)",
      quantity: 1,
      rate: 55000
    },
    {
      id: "3",
      description: "Module 3: Member Portal & Daily Contribution Engine (Paystack Card, USSD & Transfer Rails, Real-time Webhooks)",
      quantity: 1,
      rate: 70000
    },
    {
      id: "4",
      description: "Module 4: ROSCA Rotation Engine, Queue Dynamics & Default Risk Logic (FIFO queue, 5% fee split, reordering)",
      quantity: 1,
      rate: 65000
    },
    {
      id: "5",
      description: "Module 5: Super-Admin Operations, Batch Disbursement & Audit Suite (5,000 members, ₦5M pool, 20/20 payouts)",
      quantity: 1,
      rate: 60000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦300,000. Terms: 50% kickoff deposit (₦150,000), 50% balance upon final staging review and deployment (₦150,000).\n2. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere."
};

const baseUrl = "https://salescowboy.com.ng";

const proposalData = serializeState(proposalState);
const invoiceDepositData = serializeState(invoiceDepositState);
const invoiceFullData = serializeState(invoiceFullState);

const links = {
  proposal: {
    clientView: `${baseUrl}/proposal/?data=${proposalData}&mode=view`,
    editable: `${baseUrl}/proposal/?data=${proposalData}&mode=edit`
  },
  depositInvoice: {
    clientView: `${baseUrl}/invoice/?data=${invoiceDepositData}&mode=view`,
    editable: `${baseUrl}/invoice/?data=${invoiceDepositData}&mode=edit`
  },
  fullInvoice: {
    clientView: `${baseUrl}/invoice/?data=${invoiceFullData}&mode=view`,
    editable: `${baseUrl}/invoice/?data=${invoiceFullData}&mode=edit`
  }
};

fs.writeFileSync(path.join(__dirname, 'my-daily-contribution-links.json'), JSON.stringify(links, null, 2));

console.log("Successfully generated My Daily Contribution proposal and invoice links.");
