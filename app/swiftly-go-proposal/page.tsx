/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Plus, 
  Trash2, 
  Share2, 
  Copy, 
  RotateCcw, 
  FileText, 
  Eye, 
  Edit2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Printer, 
  ChevronDown, 
  Truck, 
  Navigation, 
  UtensilsCrossed, 
  Package, 
  ShieldCheck, 
  ArrowLeft,
  DollarSign
} from "lucide-react";

interface ScopeModule {
  id: string;
  title: string;
  timeline: string;
  cost: number;
  description: string;
  deliverables: string[];
}

interface InfrastructureCost {
  component: string;
  provider: string;
  estimatedCost: string;
}

interface SwiftlyGoProposalState {
  proposalTitle: string;
  proposalId: string;
  proposalDate: string;
  
  // Developer Details (Sales Cowboy Marketing Solutions)
  senderName: string;
  senderDesignation: string;
  senderAddress: string;
  senderEmail: string;
  senderPhone: string;
  senderWebsite: string;
  
  // Client Details
  clientName: string;
  clientContact: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  
  // High Level Overview
  executiveSummary: string;
  sharedSupplyOverview: string;
  
  // Modules
  modules: ScopeModule[];
  currency: string;
  
  // Infrastructure Running Costs Table
  infrastructureCosts: InfrastructureCost[];
  infrastructureNotes: string;
  
  // Financial Milestones & Terms
  totalCost: number;
  timeline: string;
  paymentMilestones: { label: string; percentage: number; amount: number }[];
  bankInfo: string;
  notes: string;
}

const DEFAULT_SWIFTLY_GO_PROPOSAL: SwiftlyGoProposalState = {
  proposalTitle: "Swiftly Go: Abia’s Everyday Mobility & Commerce Super App (Move. Eat. Shop. Send. Connect)",
  proposalId: "PROP-2026-SCM-SWIFT2M",
  proposalDate: "2026-11-02",
  
  senderName: "Sales Cowboy Marketing Solutions",
  senderDesignation: "Enterprise Systems & Mobile Engineering",
  senderAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos, Nigeria",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232 / +234 912 309 6853",
  senderWebsite: "salescowboy.com.ng",
  
  clientName: "Swiftly Technologies",
  clientContact: "Executive Leadership",
  clientAddress: "Aba & Umuahia Corridors, Abia State",
  clientEmail: "",
  clientPhone: "",
  
  executiveSummary: "Swiftly Go is engineered to become Abia State’s premier on-demand consumer super app. Rather than building fragmented applications for passenger transportation, restaurant ordering, and parcel deliveries, Swiftly Go consolidates these high-frequency utilities into a single, cohesive super app ecosystem.\n\nBy anchoring on a shared local mobility fleet (Keke Napep / Tricycles and Dispatch Motorcycles), the platform achieves dual operating leverage:\n\n1. High Daily Frequency & Habit Retention: Driving high app opens through staple daily habits (morning commuting, afternoon office lunch, and commercial market parcel transfers).\n2. Zero Driver Idle Time (Cross-Dispatch): The same driver fleet handling peak-hour morning commuter transport is cross-dispatched to service midday restaurant deliveries and afternoon B2B market waybills, maximizing daily driver yield and Gross Merchandise Value (GMV).",
  
  sharedSupplyOverview: "Traditional standalone delivery apps struggle in non-metro areas due to supply fragmentation and driver idle time. Swiftly Go eliminates idle capacity through dynamic cross-dispatch synchronized with Abia State’s daily economic rhythm:\n\n• 07:00 – 10:00 (Commuter Peak): Keke Napep fleet dedicated to passenger transport across high-density routes (Faulks Rd, Brass, Osisioma, Tower Umuahia) for high ride volume and minimal driver downtime.\n• 11:30 – 14:30 (Lunch Hour & Office Orders): Dispatch bikes prioritized for quick-service restaurant & bakery meals, maintaining high average basket sizes and prompt hot food deliveries.\n• 14:30 – 17:30 (B2B Commercial Parcels): Bulk waybills and parcels transported from commercial markets (Ariaria, Cemetery, Ekeoha) directly to interstate motor parks and regional retail shops.\n• 17:30 – 21:00 (Evening Commute & Dinner): Second high-margin passenger rush combined with evening family dinner deliveries.",
  
  modules: [
    {
      id: "1",
      title: "1. Customer Super App (iOS & Android)",
      timeline: "Weeks 1 - 5",
      cost: 700000,
      description: "Single sign-on interface with seamless switching between three core habit utilities.",
      deliverables: [
        "Swiftly Rides (Keke Hailing): Upfront transparent distance/zone fares, driver photo/plate verification, union alignment ratings, and live vehicle approach tracking",
        "Swiftly Food Ordering: Curated restaurant menus, custom food modifiers, live kitchen order status, and temperature-conscious insulated box delivery routing",
        "Swiftly Send (P2P & B2B Logistics): Intra-city parcel dispatch under 25kg, live route map tracking, digital Proof of Delivery (OTP + recipient photo capture)",
        "Unified In-App Wallet: Fast wallet funding via Paystack/Moniepoint (Cards, USSD, Virtual Accounts) and instant peer-to-peer transfers"
      ]
    },
    {
      id: "2",
      title: "2. Driver & Fleet Partner App (Android-First)",
      timeline: "Weeks 3 - 6",
      cost: 500000,
      description: "Built for Nigerian commercial drivers with acoustic alerts and seamless cross-dispatch.",
      deliverables: [
        "Shift Toggle & Demand Radar: Online/Offline availability toggle with audible acoustic trip broadcasts and demand corridor heatmaps",
        "Dynamic Cross-Dispatch: Drivers switch effortlessly between passenger trips, restaurant pickups, and market parcels without app switching",
        "Driver Daily Ledger: Transparent earnings tracker showing trip totals, commission debits, and 24/7 bank withdrawals"
      ]
    },
    {
      id: "3",
      title: "3. Merchant & Restaurant Partner Hub (Web & Tablet)",
      timeline: "Weeks 4 - 7",
      cost: 400000,
      description: "Empowers local food vendors and retail stores to manage orders and kitchen operations.",
      deliverables: [
        "Menu & Inventory Desk: Real-time pricing updates, photo uploads, item variation toggles, and stock-out alerts",
        "Kitchen Order Display: Audible order chime, prep time countdown timers, and Bluetooth receipt printer integration",
        "Merchant Settlement Ledger: Daily gross sales tracking, net platform payout reports, and customer review monitoring"
      ]
    },
    {
      id: "4",
      title: "4. Master Operations, Dispatch & Admin Control Center (Web)",
      timeline: "Weeks 5 - 8",
      cost: 400000,
      description: "Central command system for monitoring city mobility, dynamic surge pricing, and revenue splits.",
      deliverables: [
        "Live City Heatmap: Real-time spatial tracking of all active Keke tricycles and dispatch bikes across Aba and Umuahia",
        "Geofencing & Corridor Pricing: Polygon mapping to configure operating corridors, base fares, night surge, and union levy fees",
        "KYC Verification Gate: Identity review for drivers (NIN, Driver’s License, union badges) with one-click verification approval",
        "Automated Split Revenue Ledger: Automated accounting tracking platform take-rates (12%–18% Rides, 15%–25% Food, 15%–20% Logistics)"
      ]
    }
  ],
  currency: "₦",
  
  infrastructureCosts: [
    { component: "Cloud Server, API Engine & PostgreSQL DB", provider: "Railway.app", estimatedCost: "$5 – $10 / month" },
    { component: "Media, Menu & Document Vault", provider: "Railway Storage Bucket / Volume", estimatedCost: "$0 / month" },
    { component: "SMS / OTP & WhatsApp Alerts", provider: "Termii", estimatedCost: "Pay-as-you-go (~₦5/SMS)" },
    { component: "Live Geolocation & Map Tiles", provider: "Mapbox / OpenStreetMap", estimatedCost: "$0 / month (Free tier)" },
    { component: "Payment Gateway (Card / Virtual Accounts)", provider: "Paystack / Moniepoint", estimatedCost: "1.5% capped at ₦2,000" }
  ],
  infrastructureNotes: "Total estimated monthly cloud running cost: ~$5 – $10 / month (Vault uses native Railway storage at $0). App Store Developer fees: Google Play ($25 one-time), Apple Developer ($99/year), paid directly to providers without agency markup.",
  
  totalCost: 2000000,
  timeline: "8 Weeks (56 Calendar Days / 2 Months)",
  paymentMilestones: [
    { label: "50% Mobilization Deposit (Weeks 1 - 4: Super App UI/UX, Geofencing, DB & Core APIs)", percentage: 50, amount: 1000000 },
    { label: "30% Staging & UAT (Weeks 5 - 6: Super App & Driver Beta, Merchant Hub & Pilot Testing)", percentage: 30, amount: 600000 },
    { label: "20% Final Launch & Handover (Weeks 7 - 8: Live Cloud Launch & App Store Submissions)", percentage: 20, amount: 400000 }
  ],
  bankInfo: "Bank Name: Guaranty Trust Bank (GTBank)\nAccount Name: Sales Cowboy Marketing Solutions\nAccount Number: 3006086291",
  notes: "Includes 12 Months of post-launch technical support (monitoring & existing bug fixes within agreed scope) and 100% complete Client Intellectual Property (IP) ownership with full repository and credentials handover upon final settlement."
};

function SwiftlyGoProposalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [state, setState] = useState<SwiftlyGoProposalState>(DEFAULT_SWIFTLY_GO_PROPOSAL);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("preview");
  const [copied, setCopied] = useState(false);

  // Load from URL query parameters if present
  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(dataParam))));
        setState(decoded);
      } catch (e) {
        console.error("Failed to parse proposal data from URL", e);
      }
    }
  }, [searchParams]);

  const handleTotalCostChange = (newTotal: number) => {
    const updatedMilestones = state.paymentMilestones.map((ms) => ({
      ...ms,
      amount: Math.round((newTotal * ms.percentage) / 100)
    }));
    setState((prev) => ({
      ...prev,
      totalCost: newTotal,
      paymentMilestones: updatedMilestones
    }));
  };

  const handleCopyLink = () => {
    try {
      const jsonStr = JSON.stringify(state);
      const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
      const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Error creating share link", e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-NG").format(num);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans print:bg-white print:text-black">
      
      {/* Top Application Bar - Hidden in Print */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Return to Sales Cowboy Homepage"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  SALES COWBOY
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 font-mono px-2 py-0.5 rounded border border-amber-500/20 font-semibold uppercase">
                  Swiftly Go Super App Proposal (₦2,000,000)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {state.proposalId} • REF: SWIFT2M-8WEEKS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab("edit")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeTab === "edit" 
                    ? "bg-amber-600 text-white shadow-sm" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Editor</span>
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeTab === "preview" 
                    ? "bg-amber-600 text-white shadow-sm" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Letterhead Preview</span>
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
              title="Copy shareable link with current proposal data"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? "Link Copied!" : "Share Link"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-amber-900/30"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* EDITOR FORM - Hidden in Print or when Preview tab is full */}
          {activeTab === "edit" && (
            <div className="lg:col-span-5 space-y-6 print:hidden">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Proposal Metadata & Client
                </h2>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Proposal Title</label>
                    <input 
                      type="text" 
                      value={state.proposalTitle} 
                      onChange={(e) => setState({ ...state, proposalTitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Proposal ID</label>
                      <input 
                        type="text" 
                        value={state.proposalId} 
                        onChange={(e) => setState({ ...state, proposalId: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Proposal Date</label>
                      <input 
                        type="date" 
                        value={state.proposalDate} 
                        onChange={(e) => setState({ ...state, proposalDate: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-3">
                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Client / Company Name</label>
                    <input 
                      type="text" 
                      value={state.clientName} 
                      onChange={(e) => setState({ ...state, clientName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Authorized Contact / Attention</label>
                    <input 
                      type="text" 
                      value={state.clientContact} 
                      onChange={(e) => setState({ ...state, clientContact: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Investment & Timeline Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Commercial Investment & Pricing
                </h2>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Total All-Inclusive Contract Fee (NGN)</label>
                    <input 
                      type="number" 
                      value={state.totalCost} 
                      onChange={(e) => handleTotalCostChange(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 font-mono text-sm font-bold focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Delivery Timeline</label>
                    <input 
                      type="text" 
                      value={state.timeline} 
                      onChange={(e) => setState({ ...state, timeline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="border-t border-slate-800 pt-3">
                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Official Remittance Bank Details</label>
                    <textarea 
                      rows={3}
                      value={state.bankInfo} 
                      onChange={(e) => setState({ ...state, bankInfo: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENT PREVIEW CONTAINER */}
          <div className={`${activeTab === "edit" ? "lg:col-span-7" : "lg:col-span-12"} transition-all`}>
            
            {/* The A4 Letterhead Sheet */}
            <div className="bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-200 max-w-[210mm] mx-auto print:shadow-none print:border-none print:p-0">
              
              {/* Header Letterhead */}
              <div className="border-b-2 border-slate-900 pb-5 mb-6 flex flex-wrap justify-between items-start gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg bg-slate-950 text-amber-500 flex items-center justify-center font-mono font-black text-xl border-2 border-amber-500 shadow-md">
                    SC
                  </div>
                  <div>
                    <h1 className="font-serif font-black text-xl tracking-tight text-slate-950 uppercase">
                      SALES COWBOY
                    </h1>
                    <p className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-widest">
                      Marketing Solutions • Enterprise Web & Mobile Engineering
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos • +234 810 493 3232 / +234 912 309 6853
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono text-[11px] bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-slate-600">
                  <div className="font-bold text-slate-950">REF: {state.proposalId}</div>
                  <div>DATE: {new Date(state.proposalDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</div>
                  <div className="text-amber-700 font-bold">TOTAL: {state.currency}{formatNumber(state.totalCost)} NGN</div>
                </div>
              </div>

              {/* Title Section */}
              <div className="mb-6 border-b border-slate-200 pb-4">
                <span className="inline-block bg-amber-100 text-amber-900 font-mono text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider mb-2">
                  Commercial & Technical Proposal
                </span>
                <h2 className="text-xl font-black text-slate-950 tracking-tight leading-snug">
                  {state.proposalTitle}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Abia’s Everyday Super App — Move. Eat. Shop. Send. Connect (Aba & Umuahia)
                </p>
              </div>

              {/* Recipient Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-6 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    PREPARED BY (DEVELOPER)
                  </span>
                  <p className="font-bold text-slate-900 uppercase mt-0.5">
                    {state.senderName}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Clinton Chukwunyere • Lead Technical Director
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    GTBank Account: 3006086291
                  </p>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    PREPARED FOR (CLIENT)
                  </span>
                  <p className="font-bold text-slate-900 uppercase mt-0.5">
                    {state.clientName || "____________________________________"}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Attention: {state.clientContact || "Executive Leadership"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Target Markets: {state.clientAddress || "Aba & Umuahia, Abia State"}
                  </p>
                </div>
              </div>

              {/* Document Body Sections */}
              <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
                
                {/* 1. Executive Summary */}
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    1. Executive Summary & The Unified Super App Vision
                  </h3>
                  <p className="whitespace-pre-line text-justify leading-relaxed">
                    {state.executiveSummary}
                  </p>
                </div>

                {/* 2. Shared Supply Advantage */}
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    2. The Shared-Supply Engine (Zero Driver Idle Time)
                  </h3>
                  <p className="whitespace-pre-line text-justify leading-relaxed">
                    {state.sharedSupplyOverview}
                  </p>
                </div>

                {/* 3. Modules Breakdown */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    3. Core Platform Deliverables (Phase 1 Ecosystem)
                  </h3>

                  <div className="space-y-3">
                    {state.modules.map((m) => (
                      <div key={m.id} className="border border-slate-200 bg-slate-50/50 p-3 rounded-lg space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="font-bold text-slate-900 text-[12px]">
                            {m.title}
                          </span>
                          <span className="text-[9px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                            {m.timeline}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {m.description}
                        </p>
                        <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-700">
                          {m.deliverables.map((d, dIdx) => (
                            <li key={dIdx}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Infrastructure Costs */}
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    4. Estimated Monthly App Running & Infrastructure Costs
                  </h3>
                  <p className="text-[11px] text-slate-500 italic">
                    (Paid directly by the Client to infrastructure providers; no agency markup added)
                  </p>

                  <div className="border border-slate-200 rounded-lg overflow-hidden text-[11px]">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-100 text-slate-900 font-mono text-[10px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3 border-b border-slate-200">Component</th>
                          <th className="py-2.5 px-3 border-b border-slate-200">Service Provider</th>
                          <th className="py-2.5 px-3 border-b border-slate-200 text-right">Estimated Monthly Cost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {state.infrastructureCosts.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-2 px-3 font-semibold text-slate-800">{item.component}</td>
                            <td className="py-2 px-3 text-slate-600">{item.provider}</td>
                            <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">{item.estimatedCost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[11px] text-slate-600 bg-amber-500/10 p-2.5 rounded border border-amber-500/20 font-medium leading-relaxed">
                    {state.infrastructureNotes}
                  </p>
                </div>

                {/* 5. Investment & Milestones */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    5. Total Project Investment & 8-Week Milestone Schedule
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {state.paymentMilestones.map((ms, idx) => (
                      <div key={idx} className="border border-slate-200 bg-slate-50/60 p-3.5 rounded-lg space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-700 uppercase">
                          <span>Stage {idx + 1}</span>
                          <span>{ms.percentage}%</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">
                          {ms.label.replace(/^\d+%\s*/, "")}
                        </p>
                        <p className="text-sm font-black font-mono text-slate-950 pt-1">
                          {state.currency}{formatNumber(ms.amount)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border border-slate-200 bg-slate-50 p-4 rounded-lg space-y-2 text-xs">
                    <span className="text-[10px] font-bold text-slate-900 uppercase font-mono tracking-wider block">
                      Contractual Guarantees & Intellectual Property Terms
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700 leading-relaxed text-[11px]">
                      <li>
                        <strong className="text-slate-900">100% Complete Client IP Ownership:</strong> Upon final milestone settlement (₦2,000,000), 100% complete, exclusive, and unencumbered Intellectual Property ownership of all custom source code, mobile app codebases, backend APIs, database schemas, and admin keys vests exclusively in the Client.
                      </li>
                      <li>
                        <strong className="text-slate-900">12-Month Technical Support & Maintenance:</strong> Includes twelve (12) months of post-launch technical support strictly dedicated to server uptime surveillance, performance monitoring, and bug-fix maintenance for existing features within the agreed scope (excludes adding new features).
                      </li>
                    </ul>
                  </div>

                  <div className="border border-slate-200 bg-slate-50 p-4 rounded-lg space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">
                      Remittance Information
                    </span>
                    <p className="font-mono text-slate-800 whitespace-pre-line font-medium leading-relaxed">
                      {state.bankInfo}
                    </p>
                  </div>
                </div>

              </div>

              {/* Bilateral Sign-Off */}
              <div className="mt-12 pt-6 border-t-2 border-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    ISSUED FOR AND ON BEHALF OF:
                  </span>
                  <p className="text-xs font-bold text-slate-900 mt-1 uppercase">
                    SALES COWBOY MARKETING SOLUTIONS
                  </p>
                  <p className="text-xs text-slate-600">
                    Clinton Chukwunyere • Lead Technical Director
                  </p>
                  <div className="pt-3 font-mono text-slate-400 text-xs">
                    Signature: ________________________
                  </div>
                  <div className="font-mono text-slate-400 text-[11px] mt-1">
                    Date: {new Date(state.proposalDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    ACCEPTED AND CONFIRMED (CLIENT):
                  </span>
                  <p className="text-xs font-bold text-slate-900 mt-1 uppercase">
                    {state.clientName || "SWIFTLY TECHNOLOGIES"}
                  </p>
                  <div className="space-y-1 pt-1 text-xs text-slate-600">
                    <p>Attention: {state.clientContact || "Executive Leadership"}</p>
                    <div className="pt-2 font-mono text-slate-400 text-xs">
                      Signature: ________________________
                    </div>
                    <div className="font-mono text-slate-400 text-[11px] mt-1">
                      Date: ________________________
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default function SwiftlyGoProposalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Swiftly Go Proposal...</div>}>
      <SwiftlyGoProposalContent />
    </Suspense>
  );
}
