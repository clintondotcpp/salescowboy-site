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

const invoiceState = {
  invoiceNumber: invId,
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  ...DEFAULT_SENDER,
  
  clientName: "Device Link",
  clientContact: "",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "Web Design and Development Services",
      quantity: 1,
      rate: 70000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Cost: ₦70,000.\n2. Please make payment to the account details provided above.",
};

const baseUrl = "https://salescowboy.com.ng";
const localUrl = "http://localhost:3000";

const invoiceData = serializeState(invoiceState);

const output = [];
output.push("==================================================");
output.push("   DEVICE LINK INVOICE LINK GENERATOR  ");
output.push("==================================================\n");

output.push(`PROJECT: Web Design and Development Services`);
output.push("TOTAL COST: ₦70,000.00\n");

output.push("--------------------------------------------------");
output.push("INVOICE LINKS (₦70,000.00 Total):");
output.push("--------------------------------------------------");
output.push(`- CLIENT VIEW LINK (Read-Only):\n  ${baseUrl}/invoice/?data=${invoiceData}&mode=view\n`);
output.push(`- EDITABLE LINK (For Admin Adjustments):\n  ${baseUrl}/invoice/?data=${invoiceData}&mode=edit\n`);
output.push(`- LOCAL DEV VIEW LINK:\n  ${localUrl}/invoice/?data=${invoiceData}&mode=view\n`);

output.push("==================================================");

console.log(output.join("\n"));
