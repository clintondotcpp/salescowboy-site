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

const invoiceState = {
  invoiceNumber: invId,
  invoiceDate: formatToday,
  dueDate: formatDueDate,
  
  senderName: "Clinton Chukwunyere (Sales Cowboy)",
  senderAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232",
  senderWebsite: "salescowboy.com.ng",
  
  clientName: "Cee and Dee LTD",
  clientContact: "",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  items: [
    {
      id: "1",
      description: "Buy and hosting of the domain",
      quantity: 1,
      rate: 30000
    },
    {
      id: "2",
      description: "The website design and development",
      quantity: 1,
      rate: 170000
    },
    {
      id: "3",
      description: "Search engine optimization (SEO) implementation",
      quantity: 1,
      rate: 100000
    }
  ],
  currency: "₦",
  taxRate: 7.5,
  discount: 0,
  includeTax: false,
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Cost: ₦300,000.\n2. Please make payment to the account details provided above.",
};

const baseUrl = "https://salescowboy.com.ng";
const localUrl = "http://localhost:3000";

const invoiceData = serializeState(invoiceState);

const output = [];
output.push("==================================================");
output.push("   CEE AND DEE LTD INVOICE LINK GENERATOR  ");
output.push("==================================================\n");

output.push(`PROJECT: Website Design, Hosting & SEO`);
output.push("TOTAL COST: ₦300,000.00\n");

output.push("--------------------------------------------------");
output.push("INVOICE LINKS:");
output.push("--------------------------------------------------");
output.push(`- CLIENT VIEW LINK (Read-Only):\n  ${baseUrl}/invoice/?data=${invoiceData}&mode=view\n`);
output.push(`- EDITABLE LINK (For Admin Adjustments):\n  ${baseUrl}/invoice/?data=${invoiceData}&mode=edit\n`);
output.push(`- LOCAL DEV VIEW LINK:\n  ${localUrl}/invoice/?data=${invoiceData}&mode=view\n`);

output.push("==================================================");

console.log(output.join("\n"));
