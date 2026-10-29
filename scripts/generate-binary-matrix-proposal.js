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
  proposalTitle: "2-Level Binary Matrix Referral & Foodstuff Empowerment Cooperative Platform",
  proposalId: propId,
  proposalDate: formatToday,
  
  ...DEFAULT_SENDER,
  
  clientName: "Agro-Cooperative & Food Empowerment Leadership",
  clientContact: "Project Director & Management Board",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  projectOverview: "This technical proposal details the end-to-end development and deployment of an automated 2-Level Binary Matrix referral and food empowerment platform. The system operates on a high-throughput referral logic model: members register through unique sponsor links, submit their activation deposits via bank transfer or automated virtual accounts, fill their 2-person binary tree (Left and Right downlines), trigger cycle-out qualifications to receive physical foodstuff incentive packages (rice, vegetable oil, provisions), and seamlessly re-enter new matrices upon completing reward cycles.",
  
  modules: [
    {
      id: "1",
      title: "Module 1: Member Onboarding, Referral Binding & Binary Matrix Tree Engine",
      timeline: "5 - 7 Days",
      cost: 85000,
      description: "High-performance member registration and deterministic binary tree engine that binds sponsor referral relationships and prevents orphan accounts.",
      deliverables: [
        "Referral URL Capture & Sponsor Binding: Query-string tracker (`/register?ref=username`) automatically locking and validating upline sponsors upon registration",
        "Orphan Node Prevention Guardrails: Fallback routing assigning unreferred registrations to master system admin root nodes to maintain tree structural integrity",
        "2-Child Binary Matrix Logic: Strict 1 → 2 parent-child relationship tree calculating left and right downline placement rules and active status validation",
        "Account State Machine: Real-time user status workflow tracking states: `INACTIVE_UNPAID` ➔ `ACTIVE_SEARCHING` ➔ `CYCLE_COMPLETED_ELIGIBLE` ➔ `REWARD_CLAIMED` ➔ `RE_ENTERED`",
        "Secure Member Authentication: Encrypted password hashing, mobile phone verification, and session token management"
      ]
    },
    {
      id: "2",
      title: "Module 2: Deposit Gateway, Proof of Payment (POP) Upload & Virtual Accounts",
      timeline: "4 - 5 Days",
      cost: 70000,
      description: "Flexible multi-channel payment gateway supporting both manual Nigerian bank transfers with receipt uploads and automated gateway webhooks.",
      deliverables: [
        "Manual Bank Transfer Desk: Dynamic member view displaying cooperative corporate bank account details (Bank Name, Account Number, Account Name)",
        "Proof of Payment (POP) Upload Engine: Mobile-friendly image and PDF receipt uploader with client-side compression and bank transaction reference logging",
        "Automated Payment Webhook Integration (Paystack/Moniepoint): Support for automated instant virtual account generation with instant callback account activation upon transfer",
        "Payment Audit Ledger: Immutable transactional database recording payment timestamps, approval operators, deposit amounts, and reference codes"
      ]
    },
    {
      id: "3",
      title: "Module 3: Responsive Member Portal, Live Matrix Visualizer & Reward Desk",
      timeline: "5 - 7 Days",
      cost: 75000,
      description: "Modern, mobile-first user dashboard giving members complete visibility over their referral growth, incentive qualification, and food pickup codes.",
      deliverables: [
        "Executive Member Dashboard: Snapshot view showing personal activation status, direct downline progress counter (0/2 or 2/2), and copyable personal referral link",
        "Interactive Binary Tree Visualizer: Graphical visual matrix displaying the user's root node and their two assigned child nodes with live payment/activation indicators",
        "Foodstuff Incentive Claim Center: Automated reward qualification badge generating secure, tamper-evident 6-digit claim codes and QR verification passes once 2 downlines activate",
        "Pick-Up Location Selector: State and Local Government pick-up center directory allowing members to choose their nearest partner food fulfillment hub",
        "One-Click Re-Entry Action: Self-service re-entry trigger allowing cycled-out members to submit a new deposit and spawn a fresh binary matrix node"
      ]
    },
    {
      id: "4",
      title: "Module 4: Super-Admin Control Center, Payment Approvals & Food Fulfillment Desk",
      timeline: "4 - 6 Days",
      cost: 70000,
      description: "Comprehensive administrative command room for cooperative managers to verify bank payments, audit tree structures, and dispatch foodstuff inventory.",
      deliverables: [
        "POP Verification Queue: Interactive review panel displaying pending payment receipts, member details, transfer amounts, and one-click 'Approve & Activate' or 'Decline' actions",
        "Referral Tree & Cycle Management Console: Master overview of all active binary matrices with search, filter, and manual node reassignment tools",
        "Foodstuff Inventory & Dispatch Manager: Order fulfillment ledger tracking foodstuff package statuses (`Pending Verification` ➔ `Packaged` ➔ `Shipped to Depot` ➔ `Collected`)",
        "Pick-Up Agent QR / Code Verifier: Lightweight validation tool for state coordinators to verify members' 6-digit claim codes upon physical food handover",
        "Re-entry Ledger & Financial Reports: Exportable CSV reports tracking total revenue, active member cycles, food packages distributed, and cooperative growth metrics"
      ]
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentMilestones: [
    { label: "Milestone 1: Project Mobilization, Database & Binary Matrix Tree Engine (50%)", percentage: 50 },
    { label: "Milestone 2: Member Portal, Deposit Gateway & Matrix Visualizer (30%)", percentage: 30 },
    { label: "Milestone 3: Admin Console, Food Fulfillment Desk, QA Testing & Live Deployment (20%)", percentage: 20 }
  ],
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦300,000 fixed price.\n2. Milestone Terms: 50% Kickoff Deposit (₦150,000), 30% Member Portal & Payment Milestone (₦90,000), 20% Admin Console, Testing & Production Cloud Handover (₦60,000).\n3. Cloud Infrastructure & Hosting: Client is responsible for their direct monthly cloud hosting fees (hosted on Railway at roughly $5 to $10 monthly based on active database and compute usage).\n4. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere.\n5. Delivery Timeline: 2 to 3 weeks total elapsed delivery schedule including testing and training."
};

const baseUrl = "https://salescowboy.com.ng";
const proposalData = serializeState(proposalState);

const links = {
  proposal: {
    clientView: `${baseUrl}/proposal/?data=${proposalData}&mode=view`,
    editable: `${baseUrl}/proposal/?data=${proposalData}&mode=edit`
  }
};

fs.writeFileSync(path.join(__dirname, 'binary-matrix-links.json'), JSON.stringify(links, null, 2));

console.log("Successfully generated Binary Matrix & Food Empowerment proposal links at ₦300k.");
