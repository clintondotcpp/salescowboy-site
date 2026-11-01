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
  Calendar, 
  Building2, 
  Server, 
  Coins, 
  ShieldCheck, 
  ArrowLeft,
  Download 
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

interface RealEstateProposalState {
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

const DEFAULT_REAL_ESTATE_PROPOSAL: RealEstateProposalState = {
  proposalTitle: "Tri-Platform Real Estate Ecosystem: Mobile App, High-SEO Web Marketplace, ERP & Polygon Blockchain Platform",
  proposalId: "PROP-2026-SCM-982",
  proposalDate: "2026-11-01",
  
  senderName: "Sales Cowboy Marketing Solutions",
  senderDesignation: "Enterprise Systems & Software Engineering",
  senderAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos, Nigeria",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232",
  senderWebsite: "salescowboy.com.ng",
  
  clientName: "",
  clientContact: "",
  clientAddress: "",
  clientEmail: "",
  clientPhone: "",
  
  executiveSummary: "To dominate the Nigerian real estate market and bring offline property transactions online, this project is engineered as a comprehensive three-platform digital ecosystem rather than a standalone mobile app:\n\n1. The Public Web Marketplace & Google SEO Engine: A Zillow-style open property marketplace built with Server-Side Rendering (SSR) specifically to rank on Google Search, capture organic buyer traffic across Nigeria for free, and track real-time property transactions (MLS).\n2. The Native Mobile Application (iOS & Android): A dedicated transactional and portfolio management app for property buyers, investors, sellers, tenants, and field personnel.\n3. The Multi-Role Web Control Portals: Dedicated web dashboards for Marketplace Moderators, Accredited Estate Surveyors, Corporate Accountants, System Administrators, and External Government Auditors.",
  
  seoAdvantageOverview: "Mobile apps sit behind App Store walls and cannot be indexed by Google Search. By building a dedicated Public Web Marketplace, the platform becomes an organic customer acquisition engine:\n\n• Open Free-to-List Marketplace: Any property owner, developer, or realtor in Nigeria can post properties for free, rapidly building a massive nationwide inventory.\n• Programmatic Location & Property SEO: Every approved listing and neighborhood automatically generates Google-optimized web pages with Schema.org real estate metadata (e.g., 'Verified Land with C of O in Lekki', 'Properties for Sale in Abuja'). This drives continuous, free search traffic without relying purely on paid advertising.\n• Zillow-Style 'Nigerian MLS' Live Transaction Feed: Captures both online and offline real estate closings. Moderators and realtors update transaction statuses in real time (Listed, Under Offer, Sold, Transferred), creating Nigeria's definitive source of truth for real estate activity.",
  
  modules: [
    {
      id: "1",
      title: "Module 1: Property Detail Page, Title Showcase & Ownership History",
      timeline: "Sprint 1 (Days 1 - 10)",
      cost: 450000,
      description: "Dedicated property pages featuring media galleries, map coordinates, structural specs, valuation badges, and transparent title document verification.",
      deliverables: [
        "Dedicated Property Detail Pages: Rich media galleries, map coordinates, structural specs, valuation badges, and direct purchase/offer triggers",
        "Mandatory Title Document Showcase: Every listed property displays verified badges and encrypted previews of the exact title documents it holds (Certificate of Occupancy [C of O], Governor's Consent, Registered Deed of Assignment, Gazette, or Survey Plan)",
        "Complete Ownership History (Chain of Title): Every property page displays a transparent chronological record of all past and present owners, transaction dates, verified valuations, and Polygon blockchain links"
      ]
    },
    {
      id: "2",
      title: "Module 2: Public Web Marketplace (MLS), Moderation Desk & Offline Catchment",
      timeline: "Sprint 2 (Days 11 - 18)",
      cost: 350000,
      description: "Zillow-style open public property marketplace engineered for Google SEO dominance, nationwide listing discovery, moderator verification, and offline sales catchment.",
      deliverables: [
        "Public Open-to-All Marketplace: Fast, responsive web storefront allowing developers, licensed realtors, and individual property owners to discover and browse nationwide verified properties",
        "Programmatic Location & Property SEO Engine: Automated Google Search ranking landing pages with Schema.org RealEstate metadata targeting high-intent queries (e.g. 'Verified Land with C of O in Lekki', 'Properties for Sale in Abuja')",
        "Zillow-Style 'Nigerian MLS' Live Transaction Feed: Real-time status updates (Listed, Under Offer, Sold, Transferred) capturing and indexing both digital platform sales and physical offline closings",
        "Moderator Verification Console: Administrative gate where platform officers inspect submitted property listings, cross-check uploaded survey plan coordinates, and review title deeds before approving public visibility",
        "Duplicate & Anti-Fraud Coordinate Filter: Algorithmic check on survey beacons, plot boundaries, and title document numbers preventing fraudulent multi-listing of identical land parcels"
      ]
    },
    {
      id: "3",
      title: "Module 3: Accredited Estate Surveyor ('Source of Truth') Portal",
      timeline: "Sprint 3 (Days 19 - 26)",
      cost: 400000,
      description: "Mandatory valuation workflow where licensed company estate surveyors inspect, value, and digitally stamp property prices prior to marketplace certification.",
      deliverables: [
        "Mandatory Valuation Gate: The Company Estate Surveyor acts as the official source of truth for property values. Every property must be inspected, valued, and digitally stamped by the Estate Surveyor inside their dedicated portal before its value is certified on the platform",
        "Digital Valuation Stamping: Cryptographically signed valuation certificates attached to property records with surveyor license verification",
        "Historical Valuation Logs: Tracking property appreciation over time to compute historical yield curves for investors"
      ]
    },
    {
      id: "4",
      title: "Module 4: Automated Title Transfer, Digital Signing & Billing Engine",
      timeline: "Sprint 4 (Days 27 - 36)",
      cost: 500000,
      description: "Dynamic generation of transfer instruments, auto-signature stamping with verified IDs, and automated invoicing.",
      deliverables: [
        "Swift Title Transfer & Auto-Signature: When a customer purchases a property or document, the system dynamically generates the transfer instrument, automatically appends the Buyer's legal name, verified ID, and digital signatures onto the title documents, and immediately updates ownership across the platform and the buyer's dashboard",
        "Auto-Generated Invoices & Receipts: Instant automated generation of branded PDF Invoices, Official Payment Receipts, Tax Withholding Slips, and Closing Statements for every transaction",
        "Multi-Rail Payment Rails: Integration with Paystack / Moniepoint for card checkout, bank transfers, and dedicated virtual bank accounts"
      ]
    },
    {
      id: "5",
      title: "Module 5: Polygon Blockchain Tokenization, Fractional Sales & Secondary Liquidity Protocol",
      timeline: "Sprint 5 (Days 37 - 48)",
      cost: 550000,
      description: "Polygon Mainnet smart contracts for digital deed tokenization, fractional co-ownership syndication, and structured secondary liquidity protocols.",
      deliverables: [
        "Polygon Blockchain Tokenization: Digital title deed representations (ERC-721/ERC-1155) minted on Polygon Mainnet providing immutable on-chain proof of ownership with near-zero gas fees",
        "Fractional Ownership Syndication: Enables fractional property purchases (e.g., ₦10,000 unit fractions), subject to crowd-pooling thresholds to fully fund high-value assets (e.g., pooling 35,000 contributors at ₦10,000 to acquire a ₦350,000,000 commercial property)",
        "Secondary Marketplace with Limit Orders: Internal peer-to-peer bulletin board and order book where token holders can list their fractional shares or whole deeds for sale at their desired price to other willing platform buyers",
        "Treasury-Assisted Rapid Buyback (Optional): Instant liquidation facility powered by a dedicated platform liquidity reserve, executed at an automated 5%–10% liquidation spread (haircut) to prevent treasury depletion and protect against bank runs",
        "Structured Liquidity Exit Windows: Scheduled quarterly or bi-annual liquidity redemption rounds where the platform treasury or institutional partners redeem secondary units from verified holders at certified surveyor valuations",
        "Embedded Non-Custodial Web3 Wallets: Frictionless user onboarding via email or social login (Privy / Dynamic), automatically provisioning Polygon wallets without requiring manual seed phrases"
      ]
    },
    {
      id: "6",
      title: "Module 6: Integrated Financial Accounting Module",
      timeline: "Sprint 6 (Days 49 - 58)",
      cost: 450000,
      description: "Automated double-entry accounting ledger managing property acquisitions, escrow balances, broker commissions, and statutory tax deductions.",
      deliverables: [
        "Double-Entry Accounting Ledger: Tracks every financial movement across the platform—property purchases, escrow holdings, commissions, contractor disbursements, facility management fees, VAT (7.5%), and Withholding Tax (10%)",
        "Financial Reporting: Real-time revenue tracking, trial balances, reconciliation logs, and exportable financial statements for corporate auditors",
        "Broker Commission Splits: Automated calculation and disbursement of agent commissions upon successful closing verification"
      ]
    },
    {
      id: "7",
      title: "Module 7: Immutable Audit Logging & External Government Compliance",
      timeline: "Sprint 7 (Days 59 - 68)",
      cost: 400000,
      description: "Permanent audit logging of every system action and exportable compliance modules for statutory regulatory agencies.",
      deliverables: [
        "100% Action & ID Logging: Every single action, User ID, login, KYC verification, moderator approval, surveyor valuation, document signature, and accounting entry is permanently logged with Timestamp and IP Address",
        "Regulatory Compliance Readiness: Built-in audit trails and export engines engineered for seamless inspection by external government agencies, including SCUML/NFIU (AML/KYC logs), NRS/FIRS (Tax ledgers), NDPC (Data protection), and SEC Nigeria",
        "Tamper-Evident SHA-256 Checksums: Cryptographic sealing of audit entries ensuring historical integrity cannot be retroactively altered"
      ]
    },
    {
      id: "8",
      title: "Module 8: End-to-End Asset Lifecycle (Acquisition, Construction & Facility Management)",
      timeline: "Sprint 8 (Days 69 - 80)",
      cost: 400000,
      description: "Full ERP tracking covering land due diligence, construction bill-of-quantities milestones, and tenant facility operations.",
      deliverables: [
        "Complete ERP Workflow: Tracks properties from initial Land Acquisition and due diligence through Construction milestone tracking to post-build Facility & Tenant Management",
        "Construction Milestone Progress: Contractor work log uploader, inspection photos, and milestone disbursement release gates",
        "Facility & Tenancy Desk: Service charge payment tracking, maintenance ticket logging, and automated rent renewal reminders"
      ]
    }
  ],
  currency: "₦",
  
  infrastructureCosts: [
    { component: "Cloud Server, PostgreSQL DB & Redis", provider: "Railway.app", estimatedCost: "$10 – $20 / month (Starts on $10/mo tier)" },
    { component: "Title Document & Media Vault", provider: "Cloudflare R2 + IPFS (Pinata)", estimatedCost: "$0 – $15 / month (Free tier up to 10GB)" },
    { component: "Polygon Blockchain RPC Node", provider: "Alchemy", estimatedCost: "$0 / month (Free Tier covers up to 300M compute units)" },
    { component: "Polygon Gas Fees (Paymaster Wallet)", provider: "Polygon Network (POL)", estimatedCost: "$10 – $25 / month (~$0.005 per transaction)" },
    { component: "Embedded Web3 Wallets", provider: "Privy / Dynamic", estimatedCost: "$0 / month (Free up to initial 1,000 active users)" },
    { component: "KYC / BVN / NIN Identity Verification", provider: "Prembly / Smile ID", estimatedCost: "Pay-as-you-go (~₦150 – ₦350 per check)" }
  ],
  infrastructureNotes: "Total Estimated Monthly Running Cost: ~$20 – $60 / month. Note: Paid directly by the Client to infrastructure providers; no markup added by Developer. One-time/annual app store registration fees: Google Play Console ($25 one-time), Apple Developer Account ($99/year).",
  
  totalCost: 3500000,
  timeline: "8 – 12 Weeks (Sprint-based deliveries across all 3 platforms)",
  paymentMilestones: [
    { label: "Milestone 1: 50% Mobilization Deposit (System Architecture, UI/UX, DB Setup & Initial Sprints)", percentage: 50, amount: 1750000 },
    { label: "Milestone 2: 30% Staging & UAT Milestone (Web Marketplace, Admin Portals, Mobile Beta & Testnet)", percentage: 30, amount: 1050000 },
    { label: "Milestone 3: 20% Final Launch & Handover (Production Railway, Polygon Mainnet & App Stores)", percentage: 20, amount: 700000 }
  ],
  bankInfo: "Bank Name: GUARANTY TRUST BANK\nAccount Name: SALES COWBOY MARKETING SOLUTIONS\nAccount Number: 3006086291",
  notes: "1. Total Project Investment: ₦3,500,000 all-inclusive custom development fee.\n2. Milestone Payments: 50% Mobilization (₦1,750,000) upon contract execution; 30% Staging & UAT (₦1,050,000); 20% Handover & Production Deployment (₦700,000).\n3. Bank Details: Guaranty Trust Bank, Account No: 3006086291, Sales Cowboy Marketing Solutions.\n4. Warranty: Includes 45 days post-launch bug-fix warranty and handover documentation.\n5. IP Rights: 100% full code ownership and smart contract keys transferred upon final milestone settlement.\n6. Secondary Liquidity & Fractional Syndication: Real estate is an inherently illiquid physical asset. Rapid liquidation is strictly facilitated through (a) Secondary Marketplace with Limit Orders, (b) Treasury-Assisted Rapid Buyback at an automated 5%–10% liquidation spread (haircut) to protect platform cash reserves, or (c) Structured quarterly/bi-annual exit windows. Fractional property acquisitions are dependent upon sufficient pool aggregation (e.g., pooling ₦10,000 fractions to acquire a ₦350M asset)."
};

// UTF-8 Base64 serialization
const serializeState = (state: RealEstateProposalState): string => {
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

const deserializeState = (base64Str: string): RealEstateProposalState | null => {
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

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-NG").format(num);
};

function RealEstateProposalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"edit" | "view">("edit");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "modules" | "infrastructure" | "commercials">("overview");

  const [state, setState] = useState<RealEstateProposalState>(DEFAULT_REAL_ESTATE_PROPOSAL);

  useEffect(() => {
    const dataParam = searchParams.get("data");
    const modeParam = searchParams.get("mode");

    if (dataParam) {
      const decoded = deserializeState(dataParam);
      if (decoded) setState(decoded);
    }

    if (modeParam === "view") {
      setViewMode("view");
    }
  }, [searchParams]);

  const generateLink = (onlyView = false) => {
    const serialized = serializeState(state);
    const mode = onlyView ? "view" : "edit";
    if (typeof window !== "undefined") {
      return `${window.location.origin}${window.location.pathname}?data=${serialized}&mode=${mode}`;
    }
    return "";
  };

  const handleCopyLink = async (onlyView = false) => {
    const url = generateLink(onlyView);
    try {
      await navigator.clipboard.writeText(url);
      if (onlyView) {
        setCopiedText(true);
        setTimeout(() => setCopiedText(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetToDefault = () => {
    if (confirm("Reset proposal back to default Sales Cowboy template?")) {
      setState(DEFAULT_REAL_ESTATE_PROPOSAL);
      router.push(window.location.pathname);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col antialiased">
      {/* CSS Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body, html {
            background-color: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            transform: none !important;
          }
          .page-break {
            page-break-before: always;
            margin-top: 15mm;
          }
          @page {
            size: A4 portrait;
            margin: 18mm 14mm 18mm 14mm;
          }
        }
      `}} />

      {/* Top Header Bar */}
      <header className="bg-slate-900 text-white py-3.5 px-6 top-0 z-30 shadow-md no-print flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-lg font-black tracking-wider uppercase text-amber-500 font-mono">
              SALES COWBOY
            </span>
          </Link>
          <span className="h-5 w-px bg-slate-700 hidden sm:block"></span>
          <span className="text-xs tracking-wider text-slate-400 uppercase hidden sm:block font-medium">
            Real Estate Ecosystem Proposal Builder (₦3.5M)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/agreement"
            className="text-xs text-amber-400 hover:text-amber-300 underline hidden md:inline font-mono mr-2"
          >
            Go to Legal Agreement →
          </Link>

          {viewMode === "view" ? (
            <button
              onClick={() => setViewMode("edit")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit Proposal
            </button>
          ) : (
            <button
              onClick={() => setViewMode("view")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview Document
            </button>
          )}

          <button
            onClick={() => handleCopyLink(false)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            {copiedLink ? "Link Copied!" : "Share Link"}
          </button>

          <button
            onClick={handlePrint}
            title="Download this proposal as a clean A4 PDF file"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download / Print PDF</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* LEFT COLUMN: EDITOR CONTROLS */}
        {viewMode === "edit" && (
          <div className="w-full lg:w-[480px] bg-slate-900 border-r border-slate-800 p-5 overflow-y-auto max-h-[calc(100vh-60px)] no-print">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div>
                <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-500" />
                  Proposal Editor
                </h2>
                <p className="text-[11px] text-slate-400">
                  Customize client details, scope modules, and commercial terms.
                </p>
              </div>

              <button
                onClick={resetToDefault}
                className="text-[11px] text-slate-400 hover:text-red-400 flex items-center gap-1"
                title="Reset to default template"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-3">
              
              {/* TAB 1: OVERVIEW & CLIENT */}
              <div className="bg-slate-850 rounded-lg border border-slate-800 p-3.5">
                <button
                  onClick={() => setActiveTab(activeTab === "overview" ? "modules" : "overview")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none"
                >
                  <span>1. Overview & Client Info</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTab === "overview" ? "rotate-180" : ""}`} />
                </button>

                {activeTab === "overview" && (
                  <div className="space-y-3 pt-4 border-t border-slate-800/80 mt-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-1">Proposal Ref</label>
                        <input
                          type="text"
                          value={state.proposalId}
                          onChange={(e) => setState(prev => ({ ...prev, proposalId: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-1">Date</label>
                        <input
                          type="date"
                          value={state.proposalDate}
                          onChange={(e) => setState(prev => ({ ...prev, proposalDate: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Project Title</label>
                      <input
                        type="text"
                        value={state.proposalTitle}
                        onChange={(e) => setState(prev => ({ ...prev, proposalTitle: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-semibold"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[10px] font-bold text-amber-500 uppercase block mb-1.5 font-mono">
                        Client Information
                      </span>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Client Company Name</label>
                          <input
                            type="text"
                            value={state.clientName}
                            placeholder="Leave blank or enter client corporate name"
                            onChange={(e) => setState(prev => ({ ...prev, clientName: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Attention / Contact</label>
                          <input
                            type="text"
                            value={state.clientContact}
                            onChange={(e) => setState(prev => ({ ...prev, clientContact: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Address</label>
                          <input
                            type="text"
                            value={state.clientAddress}
                            onChange={(e) => setState(prev => ({ ...prev, clientAddress: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Executive Summary</label>
                      <textarea
                        rows={4}
                        value={state.executiveSummary}
                        onChange={(e) => setState(prev => ({ ...prev, executiveSummary: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-100 leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* TAB 2: 8 MODULES LIST */}
              <div className="bg-slate-855 rounded-lg border border-slate-800 p-3.5">
                <button
                  onClick={() => setActiveTab(activeTab === "modules" ? "infrastructure" : "modules")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none"
                >
                  <span>2. Core Modules ({state.modules.length})</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTab === "modules" ? "rotate-180" : ""}`} />
                </button>

                {activeTab === "modules" && (
                  <div className="space-y-4 pt-4 border-t border-slate-800/80 mt-3">
                    {state.modules.map((mod, idx) => (
                      <div key={mod.id} className="bg-slate-900 p-3 rounded border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-500 font-mono">Module {idx + 1}</span>
                          <span className="text-[10px] font-mono text-slate-400">{state.currency}{formatNumber(mod.cost)}</span>
                        </div>
                        <input
                          type="text"
                          value={mod.title}
                          onChange={(e) => {
                            const newMods = [...state.modules];
                            newMods[idx].title = e.target.value;
                            setState(prev => ({ ...prev, modules: newMods }));
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 font-semibold"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={mod.timeline}
                            onChange={(e) => {
                              const newMods = [...state.modules];
                              newMods[idx].timeline = e.target.value;
                              setState(prev => ({ ...prev, modules: newMods }));
                            }}
                            className="bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 font-mono"
                          />
                          <input
                            type="number"
                            value={mod.cost}
                            onChange={(e) => {
                              const newMods = [...state.modules];
                              newMods[idx].cost = Number(e.target.value);
                              setState(prev => ({ ...prev, modules: newMods }));
                            }}
                            className="bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 font-mono text-right"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={mod.description}
                          onChange={(e) => {
                            const newMods = [...state.modules];
                            newMods[idx].description = e.target.value;
                            setState(prev => ({ ...prev, modules: newMods }));
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-slate-200"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* TAB 3: INFRASTRUCTURE RUNNING COSTS */}
              <div className="bg-slate-855 rounded-lg border border-slate-800 p-3.5">
                <button
                  onClick={() => setActiveTab(activeTab === "infrastructure" ? "commercials" : "infrastructure")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-amber-500" />
                    3. Monthly Infrastructure Costs
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTab === "infrastructure" ? "rotate-180" : ""}`} />
                </button>

                {activeTab === "infrastructure" && (
                  <div className="space-y-3 pt-4 border-t border-slate-800/80 mt-3 text-xs">
                    {state.infrastructureCosts.map((item, idx) => (
                      <div key={idx} className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
                        <input
                          type="text"
                          value={item.component}
                          onChange={(e) => {
                            const newCosts = [...state.infrastructureCosts];
                            newCosts[idx].component = e.target.value;
                            setState(prev => ({ ...prev, infrastructureCosts: newCosts }));
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 font-semibold"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={item.provider}
                            onChange={(e) => {
                              const newCosts = [...state.infrastructureCosts];
                              newCosts[idx].provider = e.target.value;
                              setState(prev => ({ ...prev, infrastructureCosts: newCosts }));
                            }}
                            className="bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100"
                          />
                          <input
                            type="text"
                            value={item.estimatedCost}
                            onChange={(e) => {
                              const newCosts = [...state.infrastructureCosts];
                              newCosts[idx].estimatedCost = e.target.value;
                              setState(prev => ({ ...prev, infrastructureCosts: newCosts }));
                            }}
                            className="bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 font-mono text-right"
                          />
                        </div>
                      </div>
                    ))}
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Infrastructure Notes</label>
                      <textarea
                        rows={3}
                        value={state.infrastructureNotes}
                        onChange={(e) => setState(prev => ({ ...prev, infrastructureNotes: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-100"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* TAB 4: COMMERCIALS & PAYMENT */}
              <div className="bg-slate-855 rounded-lg border border-slate-800 p-3.5">
                <button
                  onClick={() => setActiveTab(activeTab === "commercials" ? "overview" : "commercials")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    4. Total Investment & Remittance
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTab === "commercials" ? "rotate-180" : ""}`} />
                </button>

                {activeTab === "commercials" && (
                  <div className="space-y-3 pt-4 border-t border-slate-800/80 mt-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-1">Total Fee (₦)</label>
                        <input
                          type="number"
                          value={state.totalCost}
                          onChange={(e) => setState(prev => ({ ...prev, totalCost: Number(e.target.value) }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-1">Total Timeline</label>
                        <input
                          type="text"
                          value={state.timeline}
                          onChange={(e) => setState(prev => ({ ...prev, timeline: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-mono"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Remittance Bank Details</label>
                      <textarea
                        rows={3}
                        value={state.bankInfo}
                        onChange={(e) => setState(prev => ({ ...prev, bankInfo: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* RIGHT COLUMN: LIVE LETTERHEAD PREVIEW SHEET */}
        <div className="flex-1 flex flex-col items-center justify-start py-8 px-4 sm:px-6 md:py-12 bg-slate-100 select-text overflow-y-auto print-full-width">
          
          {/* Read-only notification banner (In Client View Mode) */}
          {viewMode === "view" && (
            <div className="w-full max-w-[210mm] mb-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 no-print shadow-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Official Technical & Commercial Proposal
                  </h4>
                  <p className="text-xs text-slate-500">
                    Issued by Sales Cowboy Marketing Solutions • Tri-Platform Real Estate Ecosystem.
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
                  {copiedText ? "Link Copied!" : "Copy Link"}
                </button>
              </div>
            </div>
          )}

          {/* PAGE SHEET CARD (A4 Aspect Ratio Container) */}
          <div className="w-full max-w-[210mm] min-h-[297mm] bg-white border border-slate-200 shadow-2xl p-8 sm:p-12 md:p-16 flex flex-col justify-between text-slate-800 relative rounded-none print-container print-full-width">
            
            {/* Proposal Content */}
            <div>
              
              {/* Corporate Letterhead Header */}
              <div className="border-b-2 border-slate-900 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <img 
                      src="/assets/salescowboy-logo.png" 
                      alt="Sales Cowboy Logo" 
                      className="h-14 w-auto object-contain block" 
                    />
                    <div>
                      <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-slate-900 leading-none font-serif" style={{ fontFamily: "Rye, serif" }}>
                        SALES COWBOY
                      </h1>
                      <p className="text-[10px] font-bold text-[#cca066] tracking-widest uppercase mt-1 font-mono">
                        Marketing Solutions & Enterprise Software Systems
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-0.5 leading-relaxed font-sans">
                    <p className="font-semibold text-slate-700">{state.senderName}</p>
                    <p className="max-w-[320px]">{state.senderAddress}</p>
                    <p className="flex items-center gap-3 pt-0.5 font-mono text-[10px]">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {state.senderEmail}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {state.senderPhone}</span>
                    </p>
                    <p className="text-[#7c4a1e] font-medium font-mono text-[10px]">{state.senderWebsite}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right flex flex-col justify-between self-stretch">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-left sm:text-right">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      PROPOSAL REFERENCE
                    </span>
                    <p className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                      {state.proposalId}
                    </p>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono mt-2">
                      DATE OF ISSUANCE
                    </span>
                    <p className="text-xs font-mono font-semibold text-slate-800">
                      {new Date(state.proposalDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Banner / Prepared For (Blank by default or customized) */}
              <div className="border border-slate-200 rounded-xl p-5 mb-6 bg-slate-50/70">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1 w-full">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-2 font-mono">
                      PREPARED FOR / CLIENT RECIPIENT:
                    </span>
                    {state.clientName ? (
                      <div>
                        <h2 className="text-base font-bold text-slate-900 uppercase">
                          {state.clientName}
                        </h2>
                        <p className="text-xs text-slate-600 font-medium mt-0.5">
                          {state.clientContact && <span>Attn: {state.clientContact} • </span>}
                          {state.clientAddress}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-xs font-mono text-slate-500">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-semibold min-w-[120px]">Client / Company:</span>
                          <span className="border-b border-slate-300 flex-1 pb-0.5 text-slate-400 italic">______________________________________________________</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-semibold min-w-[120px]">Attention / Contact:</span>
                          <span className="border-b border-slate-300 flex-1 pb-0.5 text-slate-400 italic">______________________________________________________</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-semibold min-w-[120px]">Corporate Address:</span>
                          <span className="border-b border-slate-300 flex-1 pb-0.5 text-slate-400 italic">______________________________________________________</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-left sm:text-right font-mono text-xs bg-white border border-slate-200 p-3 rounded-lg min-w-[190px]">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Total Development Value</span>
                    <span className="text-slate-950 font-black text-lg block mt-0.5">{state.currency}{formatNumber(state.totalCost)}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Fixed All-Inclusive Investment</span>
                  </div>
                </div>
              </div>

              {/* Proposal Document Body */}
              <div className="space-y-6 text-xs text-slate-800">
                
                {/* 1. Executive Summary */}
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    1. Executive Summary & The 3-Platform Ecosystem
                  </h3>
                  <div className="text-slate-700 leading-relaxed text-justify whitespace-pre-line bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                    {state.executiveSummary}
                  </div>
                </div>

                {/* 2. SEO Advantage */}
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    2. The Public Web Marketplace & Organic Google SEO Advantage
                  </h3>
                  <div className="text-slate-700 leading-relaxed text-justify whitespace-pre-line bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                    {state.seoAdvantageOverview}
                  </div>
                </div>

                {/* Page Break for Print */}
                <div className="page-break"></div>

                {/* 3. Comprehensive Module Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    3. Comprehensive Module Breakdown & Functional Scope
                  </h3>

                  <div className="space-y-3.5">
                    {state.modules.map((mod, idx) => (
                      <div key={mod.id} className="border border-slate-200 rounded-lg p-3.5 bg-white space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 border-b border-slate-100">
                          <h4 className="font-bold text-slate-900 text-xs uppercase">
                            Module {idx + 1}: {mod.title.replace(/^Module \d+:\s*/, "")}
                          </h4>
                          <div className="flex items-center gap-2 font-mono text-[10px]">
                            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                              {mod.timeline}
                            </span>
                            <span className="bg-slate-100 text-slate-900 px-2 py-0.5 rounded font-bold">
                              {state.currency}{formatNumber(mod.cost)}
                            </span>
                          </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-justify">
                          {mod.description}
                        </p>

                        <div className="space-y-1 pt-1">
                          <span className="text-[9px] font-bold text-amber-700 uppercase font-mono block">
                            Key Deliverables:
                          </span>
                          <ul className="list-disc pl-4 space-y-1 text-slate-600">
                            {mod.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="leading-snug">{del}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Page Break for Print */}
                <div className="page-break"></div>

                {/* 4. Estimated Infrastructure Costs */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-600"></span>
                    4. Estimated Monthly App Running & Infrastructure Costs
                  </h3>
                  <p className="text-[11px] text-slate-500 italic">
                    (Note: Paid directly by the Client to third-party providers; no markup added by Developer)
                  </p>

                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 text-[10px] font-bold text-slate-600 uppercase font-mono">
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
                    5. Total Project Investment & Milestone Schedule
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
                    Clinton Chukwunyere • Sales Cowboy Marketing Solutions
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

export default function RealEstateProposalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Proposal...</div>}>
      <RealEstateProposalContent />
    </Suspense>
  );
}
