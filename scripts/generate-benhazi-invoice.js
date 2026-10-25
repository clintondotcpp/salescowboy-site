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

const invId = `SC-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

const DEFAULT_SENDER = {
  senderName: "Clinton Chukwunyere (Sales Cowboy)",
  senderAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232",
  senderWebsite: "salescowboy.com.ng",
};

const invoiceUpfrontState = {
  invoiceNumber: invId,
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  ...DEFAULT_SENDER,
  
  clientName: "Benhazi Investment Ltd",
  clientContact: "",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "Initial Deposit - Website Design and Domain Purchase",
      quantity: 1,
      rate: 45000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Initial Deposit Invoice (₦45,000). Remaining balance (₦40,000) is due upon project completion.\n2. Please make payment to the account details provided above.",
};

const invoiceFullState = {
  invoiceNumber: invId + "-FULL",
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  ...DEFAULT_SENDER,
  
  clientName: "Benhazi Investment Ltd",
  clientContact: "",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "Website design",
      quantity: 1,
      rate: 75000
    },
    {
      id: "2",
      description: "Domain",
      quantity: 1,
      rate: 10000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Cost: ₦85,000. Terms: Initial deposit (₦45,000), balance upon completion (₦40,000).\n2. Payment account details are listed above.",
};

const baseUrl = "https://salescowboy.com.ng";
const localUrl = "http://localhost:3000";

const invoiceUpfrontData = serializeState(invoiceUpfrontState);
const invoiceFullData = serializeState(invoiceFullState);

const output = [];
output.push("==================================================");
output.push("   BENHAZI INVESTMENT LTD INVOICE LINK GENERATOR  ");
output.push("==================================================\n");

output.push(`PROJECT: Website Design and Domain`);
output.push("TOTAL COST: ₦85,000.00\n");

output.push("--------------------------------------------------");
output.push("1. INITIAL DEPOSIT INVOICE LINKS (₦45,000.00 Deposit):");
output.push("--------------------------------------------------");
output.push(`- CLIENT VIEW LINK (Read-Only):\n  ${baseUrl}/invoice/?data=${invoiceUpfrontData}&mode=view\n`);
output.push(`- EDITABLE LINK (For Admin Adjustments):\n  ${baseUrl}/invoice/?data=${invoiceUpfrontData}&mode=edit\n`);
output.push(`- LOCAL DEV VIEW LINK:\n  ${localUrl}/invoice/?data=${invoiceUpfrontData}&mode=view\n`);

output.push("--------------------------------------------------");
output.push("2. FULL PROJECT INVOICE LINKS (₦85,000.00 Total):");
output.push("--------------------------------------------------");
output.push(`- CLIENT VIEW LINK (Read-Only):\n  ${baseUrl}/invoice/?data=${invoiceFullData}&mode=view\n`);
output.push(`- EDITABLE LINK (For Admin Adjustments):\n  ${baseUrl}/invoice/?data=${invoiceFullData}&mode=edit\n`);
output.push(`- LOCAL DEV VIEW LINK:\n  ${localUrl}/invoice/?data=${invoiceFullData}&mode=view\n`);

output.push("==================================================");

console.log(output.join("\n"));
