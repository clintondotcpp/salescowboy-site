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
  Package, 
  ShieldCheck, 
  ArrowLeft,
  Download,
  DollarSign,
  Scale
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

interface LogisticsProposalState {
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
  seoAdvantageOverview: string;
  
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

const DEFAULT_LOGISTICS_PROPOSAL: LogisticsProposalState = {
  proposalTitle: "Unified Logistics, Bank-Factored Haulage Transaction Engine, Consultant Licensing & Fleet Equipment Ecosystem",
  proposalId: "PROP-2026-SCM-P54-1.5M",
  proposalDate: "2026-11-02",
  
  senderName: "Sales Cowboy Marketing Solutions",
  senderDesignation: "Enterprise Systems & Mobile Engineering",
  senderAddress: "Ama-wire Ishi-Uzo, Roadsafety Junction, Egbu Road, Owerri, Imo state",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232 / +234 912 309 6853",
  senderWebsite: "salescowboy.com.ng",
  
  clientName: "PROJECT54 ENTREPRENEURS",
  clientContact: "Mr Lawson Israel (Lead Executive / Managing Director)",
  clientAddress: "Lagos, Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  executiveSummary: "To modernize commercial haulage in Nigeria, eliminate freight capital gridlock, integrate statutory risk mitigation, and structure protected broker/consultant networks, this platform is engineered as an enterprise-grade multi-tier digital ecosystem purpose-built for PROJECT54 ENTREPRENEURS:\n\n1. The Contractor & Freight Dispatch Hub: Enables verified cargo owners (Contractors) to post structured freight manifests with live capacity countdown decrementing logic, automated 24-hour Expression of Interest (EOI) expiration timers, and integrated Goods-in-Transit (GIT) policy procurement.\n2. The Transporter Fleet Vault & Gate-In Countdown Engine: Comprehensive vehicle profiling with mandatory truck video verification proofs, and a strict 48-Hour Depletion Clock that revokes job allocations if trucks fail to gate-in at loading depots on time.\n3. The Secure In-App Chat & Anti-Circumvention Engine (Disintermediation Shield): Real-time in-app communication between truckers and contractors for operational coordination (dock loading status, ETA, directions) fortified with an automated contact-redaction filter that blocks phone numbers, emails, bank accounts, and off-platform dealing to guarantee 100% platform retention.\n4. The Accredited GIT Insurance Underwriters Desk: Direct integration of licensed Goods-in-Transit (GIT) insurance companies into the freight lifecycle, enabling instant digital policy underwriting, automated per-trip premium deductions, and streamlined electronic claims verification.\n5. The Bank & Institutional Financing (Factoring) Desk: A secure financial underwriting portal where accredited banks review verified loading and offload waybills directly to disburse milestone freight financing and execute automated multi-way split deductions.\n6. The Consultant Onboarding & Quota Desk: A closed-loop referral and licensing engine where authorized freight consultants pay an onboarding fee, operate under dynamic client quota caps, and earn automated commission splits.\n7. The Heavy Equipment Leasing Engine: A full 14-step industrial machinery charter workflow (cranes, excavators, forklifts, lowbeds, barges) with inspection video archives, lease agreements, and caution deposit escrow.\n8. The Automobile & Heavy-Duty Spare Parts Marketplace: A dedicated B2B e-commerce catalog for prime movers, flatbeds, tippers, and genuine truck components backed by inspection-based escrow settlement.",
  
  seoAdvantageOverview: "While native mobile apps serve drivers on the highway, corporate cargo owners and heavy-equipment buyers discover services via Google Search. Building a dedicated Public Web Marketplace transforms the platform into an organic customer acquisition engine:\n\n• Nationwide Haulage & Equipment Discovery: Shippers, construction firms, and logistics coordinators across Nigeria can request freight quotes and browse verified equipment without needing an initial app install.\n• Programmatic Route & Cargo SEO Engine: Every freight corridor and equipment category automatically generates Google-optimized landing pages with Schema.org logistics metadata (e.g., '40ft Flatbed Truck Haulage from Apapa Port to Kano', 'Caterpillar Excavator Lease in Port Harcourt', 'Heavy-Duty Truck Tyres in Lagos'). This captures high-intent B2B search volume organically without continuous ad spend.\n• Verified Freight Rate Directory & Capacity Feed: A transparent freight index showing standard route rates across key Nigerian economic corridors (Lagos–Ibadan, Apapa–Onitsha, PH–Aba, Abuja–Kaduna), establishing the platform as the definitive authority in Nigerian commercial freight.",
  
  modules: [
    {
      id: "1",
      title: "Module 1: Consultant Onboarding & Quota Desk",
      timeline: "Week 1",
      cost: 650000,
      description: "Monetizes consultant network access and enforces closed-loop broker referral chains.",
      deliverables: [
        "Paid Consultant Licensing: Mandatory activation fee via Paystack/Moniepoint to unlock consultant dashboard and referral links",
        "Closed-Loop Referral Engine: Contractors and Transporters can register only via an authorized Consultant's invitation link",
        "Account Cap Enforcement: Admin-configured quotas limiting how many active Contractors and Transporters a single consultant can manage",
        "Automated Commission Engine: Automatically routes consultant splits on completed trips, leases, and vehicle sales to their wallet"
      ]
    },
    {
      id: "2",
      title: "Module 2: Contractor & Job Dispatch Hub",
      timeline: "Week 1",
      cost: 650000,
      description: "Structured cargo posting with live capacity decrementing and expression-of-interest expiration.",
      deliverables: [
        "Structured Haulage Manifests: Post cargo briefs detailing consignment type, geofenced loading/offloading coordinates, vehicle configuration, tonnage, trip rate, and mandatory GIT insurance",
        "Capacity Decrementing Logic: Remaining capacity counts down in real time as transporters commit trucks (e.g., Job requires 20 flatbeds → Transporter A commits 5 → 15 remaining)",
        "24-Hour EOI Timer: Transporter expressions of interest automatically expire and release truck holds if not approved within 24 hours"
      ]
    },
    {
      id: "3",
      title: "Module 3: Transporter Fleet Vault & 48-Hour Gate-In Clock",
      timeline: "Week 2",
      cost: 600000,
      description: "Asset video verification and automated allocation revocation countdown engine.",
      deliverables: [
        "Fleet Asset Onboarding: Comprehensive vehicle profile logging plate numbers, mandatory 360-degree truck walk-around video proof uploads, driver commercial licenses, phone contacts, proofs of ownership, and verified bank accounts (NUBAN)",
        "The 48-Hour Depletion Clock (Anti-Hoarding & Operational Assurance): Acceptance activates an automated 48-hour countdown state machine with real-time UI badges and alerts (T-24h, T-12h, T-2h). If the allocated vehicle fails to arrive at the designated depot and verify gate-in (via 150m GPS geofencing, driver QR scan, or digital gate sign-in) before the 48-hour clock reaches 00:00:00, the allocation automatically revokes without penalty to the contractor, returning capacity back to the open dispatch marketplace, while applying a reliability strike to the defaulting transporter",
        "Dual-Stage Waybill Verification: Stage 1 (Loading Waybill) verification with weighbridge receipt triggers initial advance payout; Stage 2 (Proof of Offloading / e-POD) triggers final multi-way balance settlement"
      ]
    },
    {
      id: "4",
      title: "Module 4: Secure In-App Chat & Anti-Circumvention Engine",
      timeline: "Week 2",
      cost: 450000,
      description: "Encrypted in-app messaging between truckers and contractors with automated contact obfuscation.",
      deliverables: [
        "Transaction-Bound Messaging: Real-time in-app communication thread between contractor and assigned trucker scoped strictly to active job manifests for dock updates, ETA, and gate directions",
        "Automated Contact Redaction (AI & Regex Filter): Automatically scrubs and blocks personal telephone numbers (Nigerian formats: 080, 081, 070, 090, 091, +234, spelled-out digits), personal emails, WhatsApp links, bank accounts (NUBAN), and external URLs",
        "Disintermediation Protection: Prevents truckers and contractors from transacting off-platform; automatically flags circumvention attempts to the Master Admin dashboard",
        "Masked Relay Audio Channels: Optional in-app VoIP or virtual masked call routing keeping personal contact numbers 100% confidential"
      ]
    },
    {
      id: "5",
      title: "Module 5: Accredited GIT Insurance Underwriting & Claims Desk",
      timeline: "Week 3",
      cost: 550000,
      description: "Integrated insurance company portal for instant digital policy issuance, premium splits, and claims.",
      deliverables: [
        "Institutional Insurer Onboarding: Dedicated portals for licensed insurance underwriters (Leadway, AIICO, Cornerstone, NEM) to audit cargo risk and manage policy issuance",
        "Dynamic Risk Matrix & Instant Trip Binders: Automated policy generation linked to trip value and route hazards, issuing electronic certificates of insurance prior to depot departure",
        "Automated Premium Deduction: Split settlement automatically carves out insurance premiums at source and remits directly into the underwriter's settlement ledger",
        "Accelerated Claims Vault: Direct insurer audit access to immutable pre-trip 360-degree inspection videos, weighbridge slips, GPS gate-in logs, and electronic POD for tamper-proof claim resolution"
      ]
    },
    {
      id: "6",
      title: "Module 6: Bank & Institutional Financing (Factoring) Desk",
      timeline: "Week 3",
      cost: 700000,
      description: "Direct financial underwriting integration for freight liquidity and automated loan recovery.",
      deliverables: [
        "Contractor-to-Bank Invitation: Contractors invite accredited financial institutions to finance their freight pipeline with a 5-day expiry state machine",
        "Financier Disbursement Desk: Banks inspect approved loading and offload waybill documents directly to authorize milestone disbursements",
        "Automated Multi-Way Split Deductions: Dynamically splits financing into Transporter Payment, Platform Service Charge, GIT Insurance Premium, and Consultant Commission"
      ]
    },
    {
      id: "7",
      title: "Module 7: Heavy Equipment Leasing Engine",
      timeline: "Week 4",
      cost: 500000,
      description: "Full 14-step workflow tailored for industrial plant, machinery, and maritime barges.",
      deliverables: [
        "Workflow Duplication: Tailored for cranes, excavators, forklifts, lowbeds, and barges with 360-degree video inspection archives",
        "Contracts & Escrow: Automated lease contract generation, caution deposit escrow holding, and scheduled maintenance sign-offs"
      ]
    },
    {
      id: "8",
      title: "Module 8: Automobile & Heavy-Duty E-Commerce Marketplace",
      timeline: "Week 4",
      cost: 400000,
      description: "B2B marketplace for prime movers, flatbeds, tippers, and genuine truck spare parts.",
      deliverables: [
        "Classified Vehicle & Parts Catalog: Comprehensive storefront for verified trucks and components",
        "Inspection-Based Escrow: Platform holds buyer funds in escrow until physical delivery inspection is signed off before releasing seller proceeds"
      ]
    }
  ],
  currency: "₦",
  
  infrastructureCosts: [
    { component: "Railway Cloud (API, Redis Queues, PostgreSQL DB & Storage Bucket)", provider: "Railway.app", estimatedCost: "$10 – $20 / month" },
    { component: "Automated SMS & OTP Dispatch", provider: "Termii", estimatedCost: "Pay-as-you-go (~₦5/alert)" },
    { component: "Payment Gateway & Split Disbursements", provider: "Paystack / Moniepoint", estimatedCost: "1.5% capped at ₦2,000" }
  ],
  infrastructureNotes: "Total estimated monthly cloud infrastructure cost: ~$10 – $20 / month + pay-as-you-go usage. App Store Developer fees: Google Play ($25 one-time), Apple Developer ($99/year), paid directly to providers without agency markup.",
  
  totalCost: 1500000,
  timeline: "4 Weeks (28 Calendar Days)",
  paymentMilestones: [
    { label: "50% Mobilization Deposit (Architecture, DB Schemas, Consultant Licensing & Multi-Portal UI/UX Layouts)", percentage: 50, amount: 750000 },
    { label: "50% Final Settlement (Paid after 2 months of verified functional operational use post App Store & Google Play upload)", percentage: 50, amount: 750000 }
  ],
  bankInfo: "Bank Name: Guaranty Trust Bank (GTBank)\nAccount Name: Sales Cowboy Marketing Solutions\nAccount Number: 3006086291",
  notes: "Includes 12 Months of complimentary post-launch technical support (monitoring & existing bug fixes within agreed scope) and 100% complete Client Intellectual Property (IP) ownership with full repository and credentials handover upon final settlement. Post-warranty technical support and maintenance is renewable at ₦800,000 / year."
};

function LogisticsProposalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [state, setState] = useState<LogisticsProposalState>(DEFAULT_LOGISTICS_PROPOSAL);
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

  // Recalculate milestone amounts if total cost changes
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
      {/* CSS Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body, html {
            background-color: white !important;
            color: black !important;
          }
          .no-print, header, .print\\:hidden {
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
          .break-inside-avoid {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          @page {
            size: A4 portrait;
            margin: 12mm 14mm;
          }
        }
      `}} />
      
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
                  PROJECT54 Logistics & Factoring Ecosystem (₦1,500,000)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {state.proposalId} • REF: P54-1.5M-ECOSYSTEM
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

            <Link
              href="/logistics-agreement"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
              title="View the formal Master Software Development Agreement for PROJECT54"
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">View</span> Agreement
            </Link>

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
                      placeholder="e.g. Dangote Logistics / ABC Haulage Ltd (or leave blank)" 
                      value={state.clientName} 
                      onChange={(e) => setState({ ...state, clientName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Authorized Contact / Attention</label>
                    <input 
                      type="text" 
                      placeholder="Managing Director / Operations Lead" 
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
            <div className="bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-200 max-w-[210mm] mx-auto print:shadow-none print:border-none print:p-0 print-full-width">
              
              {/* Header Letterhead */}
              <div className="border-b-2 border-slate-900 pb-5 mb-6 flex flex-wrap justify-between items-start gap-4">
                <div className="flex gap-3 items-center select-none">
                  <img 
                    src="/assets/salescowboy-logo.png" 
                    alt="Sales Cowboy Logo" 
                    className="h-14 w-auto object-contain block" 
                  />
                  <div className="flex flex-col leading-none">
                    <span className="text-xl font-bold tracking-wider uppercase font-serif text-[#7c4a1e]" style={{ fontFamily: "Rye, serif" }}>
                      Sales Cowboy
                    </span>
                    <span className="text-[10px] tracking-widest text-[#cca066] uppercase font-bold mt-1">
                      Marketing Solutions • Enterprise Web & Mobile Engineering
                    </span>
                    <p className="text-[10px] text-slate-500 leading-tight mt-1">
                      Ama-wire Ishi-Uzo, Roadsafety Junction, Egbu Road, Owerri, Imo state • +234 810 493 3232 / +234 912 309 6853
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
                  Unified Logistics, Haulage Transaction Management & Fleet Equipment Ecosystem (Android, iOS & Web)
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
                    Clinton Chukwunyere • Technical Director
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    GTBank Account: 3006086291
                  </p>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    PREPARED FOR (CLIENT / RECIPIENT)
                  </span>
                  <p className="font-bold text-slate-900 uppercase mt-0.5">
                    {state.clientName || "____________________________________"}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Attention / Rep: {state.clientContact || "____________________________________"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Address: {state.clientAddress || "____________________________________"}
                  </p>
                </div>
              </div>

              {/* Document Body Sections */}
              <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
                
                {/* 1. Executive Summary */}
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    1. Executive Summary & The 4-Tier Logistics Ecosystem
                  </h3>
                  <p className="whitespace-pre-line text-justify leading-relaxed">
                    {state.executiveSummary}
                  </p>
                </div>

                {/* 2. SEO Advantage */}
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    2. The Public Web Marketplace & Organic SEO Advantage
                  </h3>
                  <p className="whitespace-pre-line text-justify leading-relaxed">
                    {state.seoAdvantageOverview}
                  </p>
                </div>

                {/* 3. Modules Breakdown */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    3. Comprehensive Module Breakdown
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

                {/* 3. Security Guarantees & Statutory Financial Architecture (VAT & WHT) */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    3. Architectural Security Guarantees & Statutory Tax Architecture (VAT & WHT)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Security Guarantees */}
                    <div className="border border-slate-200 bg-slate-50/70 p-4 rounded-lg space-y-2">
                      <div className="text-[11px] font-bold text-slate-900 uppercase font-mono flex items-center gap-1.5">
                        <span className="text-amber-600">🛡️</span> System Security & Data Integrity
                      </div>
                      <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-slate-700 leading-relaxed">
                        <li>
                          <strong>Role-Based Access Control (RBAC):</strong> Strict firewalls isolate Contractors, Transporters, Consultants, Bank Factoring Officers, and Admins.
                        </li>
                        <li>
                          <strong>Factoring Token Security:</strong> Single-use cryptographically hashed invite tokens with 5-day state machine auto-expiry (strictly max 1 resend) for bank underwriters.
                        </li>
                        <li>
                          <strong>Mandatory 2FA OTP Guard:</strong> Payouts, bank changes, and gate-in verifications require 2FA OTP authentication via Termii SMS/Email.
                        </li>
                        <li>
                          <strong>Private Media Vault:</strong> Truck video proofs and waybills are stored in private cloud buckets with time-limited presigned URLs (never indexed or scrapable).
                        </li>
                        <li>
                          <strong>Immutable Audit Trail:</strong> Every action, timer expiry, and split records tamper-proof logs capturing User ID, IP, and timestamp for NDPC/SCUML compliance.
                        </li>
                        <li>
                          <strong>Payment Webhook Hardening:</strong> Paystack/Moniepoint webhooks use HMAC SHA-512 signatures to prevent replay attacks and fraudulent credit notifications.
                        </li>
                      </ul>
                    </div>

                    {/* Statutory Tax System Architecture */}
                    <div className="border border-slate-200 bg-slate-50/70 p-4 rounded-lg space-y-2">
                      <div className="text-[11px] font-bold text-slate-900 uppercase font-mono flex items-center gap-1.5">
                        <span className="text-amber-600">⚖️</span> Statutory Financial System (VAT & WHT)
                      </div>

                      {/* Tax Liability Rules Callout */}
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded p-2.5 text-[10.5px] text-amber-900 leading-snug space-y-1">
                        <div className="font-bold uppercase tracking-wider text-[10px] text-amber-950 font-mono">Tax Liability Breakdown (Per Transaction):</div>
                        <div>• <strong className="text-amber-950">VAT (7.5%):</strong> Paid by <strong>1 entity (The Contractor)</strong> on the platform service fee.</div>
                        <div>• <strong className="text-amber-950">WHT (5% or 10%):</strong> Deducted at source from <strong>2 entities (The Transporter & The Consultant)</strong>.</div>
                        <div>• <strong className="text-amber-950">PROJECT54:</strong> Withholding agent accumulating tax reserves for monthly FIRS / SIRS remittance.</div>
                      </div>

                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700 leading-relaxed">
                        <li>
                          <strong>Automated WHT Deductions at Source:</strong> Per FIRS/NRS guidelines, <strong>5% WHT</strong> is deducted on haulage brokerage and transporter earnings, and <strong>10% WHT</strong> on equipment lease proceeds prior to wallet crediting.
                        </li>
                        <li>
                          <strong>Statutory Holding Sub-Ledger:</strong> Withheld WHT automatically routes to a designated administrative tax holding ledger, issuing e-credit advice to beneficiaries.
                        </li>
                        <li>
                          <strong>Value Added Tax (VAT - 7.5%):</strong> Standard 7.5% VAT is calculated on platform brokerage charges and technology facilitation fees, itemized on all generated invoices.
                        </li>
                        <li>
                          <strong>Transparent Itemized Manifests:</strong> Invoices show Gross Freight &rarr; Transporter Net &rarr; Consultant Commission (Net of WHT) &rarr; Platform Fee &rarr; VAT &rarr; WHT.
                        </li>
                        <li>
                          <strong>One-Click Tax Schedules:</strong> Accounting portal exports pre-formatted monthly CSV/Excel schedules ready for direct filing with the Federal Inland Revenue Service (FIRS) and State Revenue Services.
                        </li>
                      </ul>
                    </div>
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
                    5. Total Project Investment & Milestone Payment Schedule
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        <strong className="text-slate-900">100% Complete Client IP Ownership:</strong> Upon final milestone settlement (₦1,500,000), 100% complete, exclusive, and unencumbered Intellectual Property ownership of all custom source code, mobile app codebases, backend APIs, database schemas, and admin keys vests exclusively in PROJECT54 ENTREPRENEURS.
                      </li>
                      <li>
                        <strong className="text-slate-900">12-Month Complimentary Technical Support & Bug-Fix Maintenance:</strong> Includes twelve (12) months of complimentary post-launch technical support strictly dedicated to server uptime surveillance, performance monitoring, background worker queue health, and bug-fix maintenance for existing features within the agreed scope (excludes adding new features).
                      </li>
                      <li>
                        <strong className="text-slate-900">Post-Warranty Annual Support Retainer (Year 2+):</strong> Following the expiration of the initial twelve (12) months of complimentary support, ongoing enterprise technical support, system health surveillance, database optimization, and bug-fix warranty is provided at a fixed retainer fee of <strong>₦800,000 / year (Eight Hundred Thousand Naira per year)</strong>, payable annually in advance by the Client.
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
                    Clinton Chukwunyere • Technical Director
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
                    {state.clientName || "____________________________________"}
                  </p>
                  <div className="space-y-1 pt-1 text-xs text-slate-600">
                    <p>Name: {state.clientContact || "________________________"}</p>
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

export default function LogisticsProposalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Logistics Proposal...</div>}>
      <LogisticsProposalContent />
    </Suspense>
  );
}
