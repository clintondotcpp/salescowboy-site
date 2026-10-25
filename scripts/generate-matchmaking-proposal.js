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
  proposalTitle: "Curated Matchmaking & Compatibility Intake Web Platform",
  proposalId: propId,
  proposalDate: formatToday,
  
  ...DEFAULT_SENDER,
  
  clientName: "Prospective Client",
  clientContact: "Founder / Executive Director",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  projectOverview: "This proposal outlines the design, development, and deployment of a bespoke Curated Matchmaking & Compatibility Intake Platform. The web application allows singles to confidentially submit detailed demographic, biological, and lifestyle criteria (location, relationship goals, genotype compatibility, religion/denomination, core ethics, and values). It includes a secure administrative management suite enabling matchmaking coordinators to filter, match, and curate physical or virtual introductions with total privacy and discretion.",
  
  modules: [
    {
      id: "1",
      title: "1. Brand Identity, Public Landing Page & Secure Hosting Setup",
      timeline: "3 - 4 Days",
      cost: 45000,
      description: "Elegant, high-trust responsive landing page establishing confidentiality and discretion, complete with domain, hosting, and SSL security.",
      deliverables: [
        "Modern, responsive web layout optimized for mobile, tablet, and desktop",
        "Trust-building sections: 'How It Works', Privacy & Discretion Guarantee, and FAQ",
        "1-Year .com.ng custom domain registration and setup",
        "1-Year high-speed secure cloud hosting with SSL padlock security",
        "Branded corporate business email setup (e.g. match@yourbrand.com.ng)"
      ]
    },
    {
      id: "2",
      title: "2. Compatibility Intake Questionnaire & Data Collection Engine",
      timeline: "4 - 5 Days",
      cost: 65000,
      description: "Comprehensive multi-step intake flow collecting essential relationship, biological, and cultural parameters.",
      deliverables: [
        "Multi-step interactive registration form with progress indicator",
        "Core demographic fields: Age, Location (State/City), Occupation, Education",
        "Biological & health criteria: Genotype selection (AA, AS, AC, etc.) with compatibility guidance",
        "Faith & Cultural parameters: Religion, denomination, and lifestyle practices",
        "Ethics, Values & Relationship Intent: Long-term marriage vs. intentional dating, personal values, deal-breakers",
        "Secure file/photo upload handler (private verification submission)",
        "Automated confirmation email dispatched to candidates upon intake completion"
      ]
    },
    {
      id: "3",
      title: "3. Admin Matchmaking Portal & Filterable Candidate Database",
      timeline: "4 - 5 Days",
      cost: 55000,
      description: "Private administrative dashboard enabling the matchmaking team to query, filter, evaluate candidates, and manage introduction workflows.",
      deliverables: [
        "Secure password-protected Admin Dashboard for candidate review",
        "Multi-criteria filtering engine (filter simultaneously by Genotype, Religion, Location, and Relationship Intent)",
        "Candidate profile dossiers for side-by-side compatibility evaluation",
        "Match lifecycle tracker (Status: New Submission, Verified, Shortlisted, Introduced Physically/Online)",
        "Admin instant alert notification (email/instant ping) whenever a new candidate profile is submitted",
        "Data export capabilities (Excel/CSV) and privacy compliance safeguards"
      ]
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentMilestones: [
    { label: "Milestone 1: 50% Kickoff Deposit (Paid to Commence Development) - ₦82,500", percentage: 50 },
    { label: "Milestone 2: 50% Final Balance (Upon Project Completion & Deployment) - ₦82,500", percentage: 50 }
  ],
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦165,000 (inclusive of 1-year domain, hosting, and SSL).\n2. Payment Structure: 50% kickoff deposit (₦82,500) to begin design and architecture, and 50% balance (₦82,500) upon project completion and handover.\n3. Turnaround Time: Estimated delivery within 10 to 14 business days from project kickoff.\n4. Account Details: GLOBUS BANK | Clinton Nnamdi Chukwunyere | 9976907387.",
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
  
  clientName: "Prospective Client",
  clientContact: "Founder / Executive Director",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "50% Initial Deposit (Milestone 1) - Curated Matchmaking & Compatibility Intake Web Platform",
      quantity: 1,
      rate: 82500
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. 50% Kickoff Deposit Invoice (₦82,500). Remaining 50% balance (₦82,500) is due upon project completion and live handover.\n2. Includes 1-year domain registration, cloud hosting, and SSL certificate setup.\n3. Remit payment to the Globus Bank details provided above.",
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
  
  clientName: "Prospective Client",
  clientContact: "Founder / Executive Director",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "Brand Identity, Public Landing Page, Domain & Secure Hosting Setup (1-Yr Domain, SSL, Business Email)",
      quantity: 1,
      rate: 45000
    },
    {
      id: "2",
      description: "Compatibility Intake Questionnaire & Data Collection Engine (Multi-step form, Genotype, Religion, Values, Location)",
      quantity: 1,
      rate: 65000
    },
    {
      id: "3",
      description: "Admin Matchmaking Portal & Filterable Candidate Database (Multi-criteria filter, dossier review, status tracking)",
      quantity: 1,
      rate: 55000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦165,000. Terms: 50% kickoff deposit (₦82,500), 50% balance upon completion (₦82,500).\n2. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere.",
};

const baseUrl = "https://salescowboy.com.ng";
const localUrl = "http://localhost:3000";

const proposalData = serializeState(proposalState);
const invoiceUpfrontData = serializeState(invoiceUpfrontState);
const invoiceFullData = serializeState(invoiceFullState);

fs.writeFileSync(path.join(__dirname, 'matchmaking-links.json'), JSON.stringify({
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

console.log("Successfully generated matchmaking proposal and invoice links.");
