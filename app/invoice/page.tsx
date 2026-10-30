/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Plus, 
  Trash2, 
  Download, 
  Share2, 
  Copy, 
  RotateCcw, 
  FileText, 
  Check, 
  Eye, 
  Edit2, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Sparkles,
  Printer,
  ChevronDown,
  Cloud
} from "lucide-react";

// Interface for Invoice Line Item
interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

// Interface for entire Invoice state
interface InvoiceState {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  
  senderName: string;
  senderAddress: string;
  senderEmail: string;
  senderPhone: string;
  senderWebsite: string;
  
  clientName: string;
  clientContact: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  
  items: LineItem[];
  currency: string;
  taxRate: number; // percentage
  discount: number; // percentage
  includeTax: boolean;
  
  paymentInfo: string;
  notes: string;
}

const DEFAULT_SENDER = {
  senderName: "Sales Cowboy Marketing Solutions",
  senderAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232",
  senderWebsite: "salescowboy.com.ng",
};

const PRESETS = [
  {
    name: "Food Bank Special Services Ltd - 50% Deposit (₦175k)",
    description: "50% Project Mobilization Deposit — Food Bank Target Savings & Layaway Platform (Public Storefront, Member Savings Progress Dashboard, Paystack Virtual Accounts, Manual POP Queue, 100% Fulfillment Claim Pass, and SMS/Email Notification Engine)",
    rate: 175000,
  },
  {
    name: "Food Bank Special Services Ltd - Full Project (₦350k)",
    description: "Full Custom Development — Food Bank Target Savings & Layaway E-Commerce Platform (Public Foodstuff & Electronics Catalog, Member Progress Dashboard, Multi-Rail Payments, POP Audit Queue, SMS/Email Alerts & Railway Cloud Deployment)",
    rate: 350000,
  },
  {
    name: "₦75k Website Bundle",
    description: "₦75k Website Bundle (Includes 1-Year .com.ng Domain Registration, 1-Year Cloud Hosting, SSL Certificate, Custom Brand Email, and Professional 5-Page Website Build)",
    rate: 75000,
  },
  {
    name: "Core Web App Package",
    description: "Core Custom Web App Development (Includes custom database architecture, responsive frontend build, admin console, API integrations, and cloud hosting setup)",
    rate: 500000,
  },
  {
    name: "Enterprise Software Suite",
    description: "Enterprise Software Package (Includes complex systems engineering, multi-branch databases, customized automation, Paystack payment integration, and staff training)",
    rate: 1200000,
  },
  {
    name: "Monthly SEO & Ad Retainer",
    description: "Monthly SEO Dominance & Ads Campaign Management (High-ROI Facebook & Google Ads management, landing page optimization, monthly performance reporting)",
    rate: 150000,
  },
];

// Helper to safely serialize JSON to base64
const serializeState = (state: InvoiceState): string => {
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

// Helper to safely deserialize base64 to JSON
const deserializeState = (base64Str: string): InvoiceState | null => {
  try {
    const binString = atob(base64Str);
    const bytes = new Uint8Array(binString.length);
    for (let i = 0; i < binString.length; i++) {
      bytes[i] = binString.charCodeAt(i);
    }
    const str = new TextDecoder().decode(bytes);
    return JSON.parse(str);
  } catch (e) {
    console.error("Failed to deserialize state", e);
    return null;
  }
};

// Currency symbols and codes
const CURRENCIES = [
  { symbol: "₦", code: "NGN", label: "Naira (₦)" },
  { symbol: "$", code: "USD", label: "US Dollar ($)" },
  { symbol: "£", code: "GBP", label: "British Pound (£)" },
  { symbol: "€", code: "EUR", label: "Euro (€)" },
];

function InvoiceGeneratorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Mode state: 'edit' (dashboard + preview) or 'view' (just preview/client mode)
  const [viewMode, setViewMode] = useState<"edit" | "view">("edit");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Form state
  const [state, setState] = useState<InvoiceState>({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    
    ...DEFAULT_SENDER,
    
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
        rate: 175000,
      }
    ],
    currency: "₦",
    taxRate: 7.5, // Standard Nigerian VAT
    discount: 0,
    includeTax: false,
    
    paymentInfo: "Bank Name: GLOBUS BANK\nAccount Name: CLINTON NNAMDI CHUKWUNYERE\nAccount Number: 9976907387",
    notes: "1. 50% Mobilization Deposit (₦175,000) to commence development for Food Bank Special Services Ltd. Remaining balance (₦175,000) is structured across progress milestones.\n2. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere.\n3. Notifications: Transactional alerts configured strictly via SMS and Email channels.\n4. Cloud hosting is deployed on Railway at roughly $5 monthly (billed directly to cloud provider).",
  });

  // Load from URL query if present
  useEffect(() => {
    const dataParam = searchParams.get("data");
    const modeParam = searchParams.get("mode");
    
    if (dataParam) {
      const decoded = deserializeState(dataParam);
      if (decoded) {
        setState(decoded);
      }
    } else {
      // Auto-generate invoice date and due date
      const today = new Date();
      const formatToday = today.toISOString().split("T")[0];
      
      const twoWeeksLater = new Date();
      twoWeeksLater.setDate(today.getDate() + 14);
      const formatDueDate = twoWeeksLater.toISOString().split("T")[0];
      
      // Auto-generate invoice number
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const randomInvoiceNumber = `SC-${today.getFullYear()}-${randomId}`;

      setState(prev => ({
        ...prev,
        invoiceDate: formatToday,
        dueDate: formatDueDate,
        invoiceNumber: randomInvoiceNumber
      }));
    }

    if (modeParam === "view") {
      setViewMode("view");
    }
  }, [searchParams]);

  // Sync state to URL without reloading to support bookmarking/sharing
  const generateShareableLink = (onlyView = false) => {
    const serialized = serializeState(state);
    const mode = onlyView ? "view" : "edit";
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}?data=${serialized}&mode=${mode}`;
      return url;
    }
    return "";
  };

  const [cloudStatus, setCloudStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const saveInvoiceToCloud = async (customState?: InvoiceState) => {
    const currentState = customState || state;
    if (!currentState.invoiceNumber) return;
    try {
      setCloudStatus("saving");
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentState.invoiceNumber,
          invoiceNumber: currentState.invoiceNumber,
          clientName: currentState.clientName,
          clientEmail: currentState.clientEmail,
          totalAmount: getGrandTotal(),
          currency: currentState.currency,
          invoiceDate: currentState.invoiceDate,
          dueDate: currentState.dueDate,
          status: "issued",
          data: currentState,
        }),
      });
      if (res.ok) {
        setCloudStatus("saved");
        setTimeout(() => setCloudStatus("idle"), 3000);
      } else {
        setCloudStatus("error");
        setTimeout(() => setCloudStatus("idle"), 3000);
      }
    } catch (e) {
      console.error("Cloud save failed", e);
      setCloudStatus("error");
      setTimeout(() => setCloudStatus("idle"), 3000);
    }
  };

  const handleCopyLink = async (onlyView = false) => {
    const link = generateShareableLink(onlyView);
    saveInvoiceToCloud();
    try {
      await navigator.clipboard.writeText(link);
      if (onlyView) {
        setCopiedText(true);
        setTimeout(() => setCopiedText(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handlePrint = () => {
    saveInvoiceToCloud();
    window.print();
  };

  const resetForm = () => {
    const today = new Date();
    const formatToday = today.toISOString().split("T")[0];
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(today.getDate() + 14);
    const formatDueDate = twoWeeksLater.toISOString().split("T")[0];
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const randomInvoiceNumber = `SC-${today.getFullYear()}-${randomId}`;

    setState({
      invoiceNumber: randomInvoiceNumber,
      invoiceDate: formatToday,
      dueDate: formatDueDate,
      ...DEFAULT_SENDER,
      clientName: "",
      clientContact: "",
      clientAddress: "",
      clientEmail: "",
      clientPhone: "",
      items: [
        {
          id: "1",
          description: "₦75k Website Bundle (Includes 1-Year .com.ng Domain, 1-Year Hosting, SSL, Brand Email, and Professional 5-Page Build)",
          quantity: 1,
          rate: 75000,
        }
      ],
      currency: "₦",
      taxRate: 7.5,
      discount: 0,
      includeTax: true,
      paymentInfo: "Bank Name: GLOBUS BANK\nAccount Name: CLINTON NNAMDI CHUKWUNYERE\nAccount Number: 9976907387",
      notes: "1. Payment Terms: 50% upfront deposit to begin development, 50% balance due upon project completion and staging delivery.\n2. Cloud & Server Infrastructure: Client is responsible for their direct monthly cloud hosting fees (hosted on Railway at roughly $5 to $10 monthly) unless an inclusive package is selected.\n3. Invoice validity is 30 days from the invoice date.",
    });
    
    // Clear URL parameters
    router.replace("/invoice");
  };

  // Add line item
  const addLineItem = () => {
    const newId = (state.items.length + 1).toString();
    setState(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, description: "", quantity: 1, rate: 0 }]
    }));
  };

  // Remove line item
  const removeLineItem = (id: string) => {
    if (state.items.length === 1) {
      // Keep at least one item, just clear it
      setState(prev => ({
        ...prev,
        items: [{ id: "1", description: "", quantity: 1, rate: 0 }]
      }));
      return;
    }
    setState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  // Update line item
  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setState(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            [field]: field === "description" ? value : Number(value)
          };
        }
        return item;
      })
    }));
  };

  // Preset loader
  const loadPreset = (preset: typeof PRESETS[0]) => {
    // Generate a unique id
    const newId = Date.now().toString();
    setState(prev => {
      // If the first item is empty, replace it. Otherwise, append.
      const isFirstItemEmpty = prev.items.length === 1 && prev.items[0].description === "" && prev.items[0].rate === 0;
      if (isFirstItemEmpty) {
        return {
          ...prev,
          items: [{ id: "1", description: preset.description, quantity: 1, rate: preset.rate }]
        };
      } else {
        return {
          ...prev,
          items: [...prev.items, { id: newId, description: preset.description, quantity: 1, rate: preset.rate }]
        };
      }
    });
  };

  // Calculations
  const getSubtotal = () => {
    return state.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    return subtotal * (state.discount / 100);
  };

  const getTaxAmount = () => {
    if (!state.includeTax) return 0;
    const subtotal = getSubtotal();
    const discountAmount = getDiscountAmount();
    return (subtotal - discountAmount) * (state.taxRate / 100);
  };

  const getGrandTotal = () => {
    const subtotal = getSubtotal();
    const discountAmount = getDiscountAmount();
    const taxAmount = getTaxAmount();
    return subtotal - discountAmount + taxAmount;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-text">
      {/* Inject custom CSS styles for print mode */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body, html {
            background-color: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-full-width {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            transform: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 12mm;
          }
        }
      `}} />

      {/* Interactive Top Banner Header */}
      <header className="bg-slate-900 text-white py-4 px-6 top-0 z-30 shadow-md no-print flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-xl font-bold tracking-wider uppercase text-[#cca066] font-serif" style={{ fontFamily: "Rye, serif" }}>
              Sales Cowboy
            </span>
          </Link>
          <span className="h-6 w-px bg-slate-700 hidden sm:block"></span>
          <span className="text-xs tracking-wider text-slate-400 uppercase hidden sm:block font-medium">
            Invoice Hub
          </span>
        </div>

        <div className="flex items-center gap-3">
          {viewMode === "view" ? (
            <button
              onClick={() => setViewMode("edit")}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-700"
            >
              <Edit2 className="w-3.5 h-3.5 text-amber-500" />
              Switch to Editor
            </button>
          ) : (
            <button
              onClick={() => setViewMode("view")}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-amber-500" />
              Client Preview
            </button>
          )}

          <button
            onClick={handlePrint}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-md text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / PDF
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-8xl mx-auto flex flex-col lg:flex-row relative">
        
        {/* LEFT COLUMN: EDITOR CONTROL PANEL (Hidden in View Mode) */}
        {viewMode === "edit" && (
          <div className="w-full lg:w-[40%] bg-slate-900 text-slate-100 p-6 lg:p-8 border-r border-slate-800 overflow-y-auto lg:max-h-[calc(100vh-68px)] sticky top-[68px] no-print">
            
            {/* Quick Actions Card */}
            <div className="mb-6 bg-slate-800 border border-slate-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                  Share & Export Actions
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => handleCopyLink(false)}
                  className="bg-slate-850 hover:bg-slate-700 text-slate-100 p-2.5 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all border border-slate-700 text-center"
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  {copiedLink ? "Copied!" : "Editable Link"}
                </button>
                <button
                  onClick={() => handleCopyLink(true)}
                  className="bg-slate-850 hover:bg-slate-700 text-slate-100 p-2.5 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all border border-slate-700 text-center"
                >
                  <Copy className="w-4 h-4 text-emerald-400" />
                  {copiedText ? "Copied!" : "Client View Link"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => saveInvoiceToCloud()}
                  disabled={cloudStatus === "saving"}
                  className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Cloud className="w-3.5 h-3.5" />
                  {cloudStatus === "saving" ? "Saving..." : cloudStatus === "saved" ? "Saved to D1 & R2!" : "Save to Cloud"}
                </button>
                <button
                  onClick={resetForm}
                  className="w-full py-2 bg-slate-900/40 hover:bg-red-950/20 hover:text-red-300 hover:border-red-900/30 text-slate-400 border border-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear All
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {/* Presets Loader Section */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Click to Add Pricing Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => loadPreset(preset)}
                      className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left p-2.5 rounded-lg text-xs hover:border-amber-500/40 transition-all flex flex-col justify-between h-full group"
                    >
                      <span className="font-semibold text-slate-200 group-hover:text-amber-400 transition-colors block mb-1">
                        {preset.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {state.currency}{preset.rate.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-slate-800/80" />

              {/* Invoice Meta Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Invoice Specifications
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Invoice ID</label>
                    <input
                      type="text"
                      value={state.invoiceNumber}
                      onChange={(e) => setState(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Currency</label>
                    <select
                      value={state.currency}
                      onChange={(e) => setState(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      {CURRENCIES.map((curr) => (
                        <option key={curr.symbol} value={curr.symbol}>
                          {curr.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Invoice Date</label>
                    <input
                      type="date"
                      value={state.invoiceDate}
                      onChange={(e) => setState(prev => ({ ...prev, invoiceDate: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Due Date</label>
                    <input
                      type="date"
                      value={state.dueDate}
                      onChange={(e) => setState(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-800/80" />

              {/* Client Info Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Client Information
                </h3>
                <div>
                  <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Al-Ameen Schools"
                    value={state.clientName}
                    onChange={(e) => setState(prev => ({ ...prev, clientName: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Alhaji Nnamdi"
                    value={state.clientContact}
                    onChange={(e) => setState(prev => ({ ...prev, clientContact: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 15 Ikoyi Road, Lagos"
                    value={state.clientAddress}
                    onChange={(e) => setState(prev => ({ ...prev, clientAddress: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Email</label>
                    <input
                      type="email"
                      placeholder="client@company.com"
                      value={state.clientEmail}
                      onChange={(e) => setState(prev => ({ ...prev, clientEmail: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Phone</label>
                    <input
                      type="text"
                      placeholder="+234..."
                      value={state.clientPhone}
                      onChange={(e) => setState(prev => ({ ...prev, clientPhone: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-800/80" />

              {/* Line Items Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Line Items
                  </h3>
                  <button
                    onClick={addLineItem}
                    className="bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Row
                  </button>
                </div>

                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                  {state.items.map((item, idx) => (
                    <div key={item.id} className="bg-slate-800/80 p-3 rounded-lg border border-slate-800 space-y-2 relative group/item">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Item #{idx + 1}</span>
                        <button
                          onClick={() => removeLineItem(item.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          title="Delete Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <label className="text-[9px] font-semibold text-slate-400 block mb-0.5">Description</label>
                        <textarea
                          rows={2}
                          value={item.description}
                          placeholder="What work is this for?"
                          onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500 resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] font-semibold text-slate-400 block mb-0.5">Qty</label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(item.id, "quantity", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-semibold text-slate-400 block mb-0.5">Rate ({state.currency})</label>
                          <input
                            type="number"
                            min="0"
                            value={item.rate}
                            onChange={(e) => updateLineItem(item.id, "rate", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-slate-800/80" />

              {/* Taxation & Discount Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  VAT & Discount Settings
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="includeTax"
                    checked={state.includeTax}
                    onChange={(e) => setState(prev => ({ ...prev, includeTax: e.target.checked }))}
                    className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="includeTax" className="text-xs font-semibold text-slate-300 cursor-pointer select-none">
                    Include VAT (Tax)
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">VAT/Tax Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      disabled={!state.includeTax}
                      value={state.taxRate}
                      onChange={(e) => setState(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Discount (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={state.discount}
                      onChange={(e) => setState(prev => ({ ...prev, discount: Number(e.target.value) }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-800/80" />

              {/* Payment Info & Notes Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Payment Instructions & Notes
                </h3>
                <div>
                  <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Bank Payment Details</label>
                  <textarea
                    rows={3}
                    value={state.paymentInfo}
                    onChange={(e) => setState(prev => ({ ...prev, paymentInfo: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Invoice Notes / Terms</label>
                  <textarea
                    rows={3}
                    value={state.notes}
                    onChange={(e) => setState(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-sans"
                  />
                </div>
              </div>

              <hr className="border-slate-800/80" />

              {/* Sender Details (Prefilled defaults, editable if necessary) */}
              <div className="space-y-3">
                <details className="cursor-pointer group">
                  <summary className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between select-none">
                    <span>Edit Sender Corporate Info</span>
                    <ChevronDown className="w-3.5 h-3.5 group-open:rotate-180 transition-transform text-slate-400" />
                  </summary>
                  <div className="space-y-3 pt-3 cursor-default" onClick={(e) => e.stopPropagation()}>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Corporate Name</label>
                      <input
                        type="text"
                        value={state.senderName}
                        onChange={(e) => setState(prev => ({ ...prev, senderName: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Address</label>
                      <input
                        type="text"
                        value={state.senderAddress}
                        onChange={(e) => setState(prev => ({ ...prev, senderAddress: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Email</label>
                        <input
                          type="email"
                          value={state.senderEmail}
                          onChange={(e) => setState(prev => ({ ...prev, senderEmail: e.target.value }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Phone</label>
                        <input
                          type="text"
                          value={state.senderPhone}
                          onChange={(e) => setState(prev => ({ ...prev, senderPhone: e.target.value }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Website</label>
                      <input
                        type="text"
                        value={state.senderWebsite}
                        onChange={(e) => setState(prev => ({ ...prev, senderWebsite: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </details>
              </div>

            </div>
          </div>
        )}

        {/* RIGHT COLUMN: PREVIEW PANEL (A4 SHEET RENDER) */}
        <div className={`flex-1 flex flex-col items-center justify-start py-8 px-4 sm:px-6 md:py-12 bg-slate-100 select-text overflow-y-auto print-full-width`}>
          
          {/* Client mode header banner (Only shown in Client View Mode) */}
          {viewMode === "view" && (
            <div className="w-full max-w-[210mm] mb-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 no-print shadow-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Client Invoice View
                  </h4>
                  <p className="text-xs text-slate-500">
                    This is a read-only invoice format generated by Sales Cowboy.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow"
                >
                  <Printer className="w-4 h-4" />
                  Print / Download PDF
                </button>
                <button
                  onClick={() => handleCopyLink(true)}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Copy className="w-4 h-4" />
                  {copiedText ? "Link Copied!" : "Copy Page Link"}
                </button>
              </div>
            </div>
          )}

          {/* PAGE SHEET CARD (A4 Paper Aspect Ratio Preview) */}
          <div className="w-full max-w-[210mm] min-h-[297mm] bg-white border border-slate-200 shadow-xl p-8 sm:p-12 md:p-16 flex flex-col justify-between text-slate-800 relative rounded-none print-container print-full-width">
            
            {/* Header elements: Logo & Meta details */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-slate-100 pb-8">
                
                {/* Branding Left */}
                <div>
                  {/* Brand Logo */}
                  <div className="flex items-center gap-2.5 mb-3 select-none">
                    <img 
                      src="/assets/salescowboy-logo.png" 
                      alt="Sales Cowboy Logo" 
                      className="h-14 w-auto object-contain block" 
                    />
                    <div className="flex flex-col leading-none">
                      <span className="text-xl font-bold tracking-wider uppercase font-serif text-[#7c4a1e]" style={{ fontFamily: "Rye, serif" }}>
                        Sales Cowboy
                      </span>
                      <span className="text-[10px] tracking-widest text-[#cca066] uppercase font-bold mt-0.5">
                        Marketing Nigeria
                      </span>
                    </div>
                  </div>
                  
                  {/* Sender Details */}
                  <div className="text-[11px] text-slate-500 space-y-0.5 leading-relaxed">
                    <p className="font-semibold text-slate-700">{state.senderName}</p>
                    <p className="max-w-[280px]">{state.senderAddress}</p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-1">
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-400" /> {state.senderEmail}</span>
                      <span className="text-slate-300">|</span>
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" /> {state.senderPhone}</span>
                    </div>
                    <p className="flex items-center gap-1 text-[#7c4a1e] font-medium"><Globe className="w-3.5 h-3.5 text-[#7c4a1e]" /> {state.senderWebsite}</p>
                  </div>
                </div>

                {/* Invoice Meta Right */}
                <div className="text-left sm:text-right flex flex-col justify-between h-full self-stretch">
                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight uppercase text-slate-900 font-serif mb-1" style={{ fontFamily: "Rye, serif" }}>
                      INVOICE
                    </h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                      #{state.invoiceNumber || "SC-XXXX"}
                    </p>
                  </div>
                  
                  <div className="mt-6 sm:mt-auto space-y-1.5 text-xs text-slate-500 leading-normal">
                    <p className="flex sm:justify-end gap-2">
                      <span className="font-semibold text-slate-700">Date Issued:</span> 
                      <span className="font-mono text-slate-800">{state.invoiceDate ? new Date(state.invoiceDate).toLocaleDateString("en-NG", { year: 'numeric', month: 'long', day: 'numeric' }) : "—"}</span>
                    </p>
                    <p className="flex sm:justify-end gap-2">
                      <span className="font-semibold text-[#7c4a1e]">Due Date:</span> 
                      <span className="font-mono text-slate-900 font-bold">{state.dueDate ? new Date(state.dueDate).toLocaleDateString("en-NG", { year: 'numeric', month: 'long', day: 'numeric' }) : "—"}</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Billed To / Client section */}
              <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-[#cca066] uppercase tracking-widest block mb-2 font-mono">
                    BILLED TO:
                  </span>
                  {state.clientName ? (
                    <div className="text-xs leading-relaxed text-slate-600">
                      <p className="text-sm font-bold text-slate-900">{state.clientName}</p>
                      {state.clientContact && <p className="font-medium text-slate-700">Attn: {state.clientContact}</p>}
                      {state.clientAddress && <p className="mt-1">{state.clientAddress}</p>}
                      <div className="flex flex-col gap-0.5 mt-2">
                        {state.clientEmail && <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {state.clientEmail}</span>}
                        {state.clientPhone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {state.clientPhone}</span>}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No client details provided.</p>
                  )}
                </div>

                <div className="flex sm:justify-end items-end no-print">
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-[11px] text-slate-500 max-w-[280px]">
                    <span className="font-bold text-[#7c4a1e] block mb-1">Invoice Status</span>
                    <p>This invoice is outstanding and payable on or before the due date shown.</p>
                  </div>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="py-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      <th className="pb-3 w-8 text-center">#</th>
                      <th className="pb-3 pl-2">Description</th>
                      <th className="pb-3 text-center w-16">Qty</th>
                      <th className="pb-3 text-right w-28">Rate</th>
                      <th className="pb-3 text-right w-28">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.items.map((item, idx) => {
                      const amount = item.quantity * item.rate;
                      return (
                        <tr key={item.id} className="border-b border-slate-100 text-xs">
                          <td className="py-4 text-center text-slate-400 font-mono">{idx + 1}</td>
                          <td className="py-4 pl-2 font-medium text-slate-800 leading-relaxed break-words max-w-[280px]">
                            {item.description || <span className="text-slate-350 italic">No description entered</span>}
                          </td>
                          <td className="py-4 text-center text-slate-600 font-mono">{item.quantity}</td>
                          <td className="py-4 text-right text-slate-600 font-mono">
                            {state.currency}{formatNumber(item.rate)}
                          </td>
                          <td className="py-4 text-right font-bold text-slate-900 font-mono">
                            {state.currency}{formatNumber(amount)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Financial Breakdowns */}
              <div className="flex flex-col sm:flex-row justify-between gap-6 border-t border-slate-200 pt-6">
                
                {/* Notes/Terms Left */}
                <div className="flex-1 max-w-sm text-[10px] text-slate-500 space-y-3">
                  {state.notes && (
                    <div>
                      <span className="font-bold text-slate-600 block uppercase tracking-wider mb-1 font-mono">
                        Notes & Terms
                      </span>
                      <p className="leading-relaxed whitespace-pre-line text-justify">{state.notes}</p>
                    </div>
                  )}
                </div>

                {/* Subtotal, tax, discounts, grand total */}
                <div className="w-full sm:w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span className="font-mono text-slate-800">{state.currency}{formatNumber(getSubtotal())}</span>
                  </div>

                  {state.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({state.discount}%):</span>
                      <span className="font-mono font-medium">-{state.currency}{formatNumber(getDiscountAmount())}</span>
                    </div>
                  )}

                  {state.includeTax && state.taxRate > 0 && (
                    <div className="flex justify-between text-slate-500">
                      <span>VAT ({state.taxRate}%):</span>
                      <span className="font-mono text-slate-800">+{state.currency}{formatNumber(getTaxAmount())}</span>
                    </div>
                  )}

                  <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
                    <span className="text-slate-800">Grand Total:</span>
                    <span className="text-lg font-mono font-extrabold text-[#7c4a1e]">
                      {state.currency}{formatNumber(getGrandTotal())}
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom section: Bank details / signatures & brand stamp */}
            <div className="mt-16 border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-[10px] text-slate-500">
              
              {/* Left: Payment details */}
              <div className="space-y-1">
                <span className="font-bold text-slate-700 block uppercase tracking-wider font-mono">
                  PAYMENT DETAILS
                </span>
                <p className="whitespace-pre-line leading-relaxed font-mono bg-slate-50 border border-slate-100 p-2.5 rounded text-slate-600 max-w-[280px]">
                  {state.paymentInfo}
                </p>
              </div>

              {/* Right: Signature Placeholder / Sign-off */}
              <div className="text-left sm:text-right flex flex-col items-start sm:items-end gap-1.5 self-stretch justify-between">
                <span className="text-[#cca066] font-bold uppercase tracking-widest font-mono text-[9px]">
                  AUTHORISED SIGNATURE
                </span>
                <div className="h-9 flex items-center select-none pt-1">
                  <span className="font-serif italic text-base text-[#7c4a1e] font-semibold" style={{ fontFamily: "Rye, serif" }}>
                    Clinton Chukwunyere
                  </span>
                </div>
                <div className="w-40 border-b border-slate-300"></div>
                <p className="text-[9px] text-slate-400 font-medium">Sales Cowboy Marketing Solutions</p>
              </div>

            </div>

          </div>

          {/* Page shadow visual footer details */}
          <p className="mt-8 text-center text-xs text-slate-400 font-medium tracking-wide no-print">
            © 2026 Sales Cowboy Marketing Solutions. All invoices print clean to portrait A4 page sizes.
          </p>

        </div>

      </main>
    </div>
  );
}

// Main component with URL Search parameters wrapped in Suspense for static build compliance
export default function InvoiceGeneratorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center font-sans">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <span className="text-2xl font-serif text-amber-500 font-bold" style={{ fontFamily: "Rye, serif" }}>
            Sales Cowboy
          </span>
          <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
            Loading Invoice Hub...
          </span>
        </div>
      </div>
    }>
      <InvoiceGeneratorContent />
    </Suspense>
  );
}
