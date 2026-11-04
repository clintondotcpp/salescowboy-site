/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FileText, 
  Printer, 
  Copy, 
  RotateCcw, 
  Eye, 
  Edit2, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Award,
  Download
} from "lucide-react";

interface AgreementState {
  agreementId: string;
  effectiveDate: string;
  
  // Developer Details (Sales Cowboy Marketing Solutions)
  developerName: string;
  developerLegalName: string;
  developerAddress: string;
  developerEmail: string;
  developerPhone: string;
  developerWebsite: string;
  developerSignatoryName: string;
  developerSignatoryTitle: string;
  
  // Client Details
  clientCompanyName: string;
  clientAddress: string;
  clientRegistrationNo: string;
  clientSignatoryName: string;
  clientSignatoryTitle: string;
  
  // Contract Particulars
  projectTitle: string;
  totalCost: number;
  deliveryTimeline: string;
  warrantyPeriodDays: number;
  currency: string;
  
  // Milestones
  milestone1Label: string;
  milestone1Amount: number;
  milestone2Label: string;
  milestone2Amount: number;
  milestone3Label: string;
  milestone3Amount: number;
  
  // Clauses Content (Editable)
  scopeClause: string;
  paymentClause: string;
  infrastructureClause: string;
  ipClause: string;
  disclaimersClause: string;
  warrantyClause: string;
  governingLawClause: string;
  
  // Bank Info for Milestone Settlements
  bankInfo: string;
}

const DEFAULT_LOGISTICS_AGREEMENT_STATE: AgreementState = {
  agreementId: "SDA-2026-AMS-882",
  effectiveDate: "2026-11-02",
  
  developerName: "Sales Cowboy Marketing Solutions",
  developerLegalName: "SALES COWBOY MARKETING SOLUTIONS",
  developerAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos, Nigeria",
  developerEmail: "hello@salescowboy.com.ng",
  developerPhone: "+234 810 493 3232",
  developerWebsite: "salescowboy.com.ng",
  developerSignatoryName: "Clinton Chukwunyere",
  developerSignatoryTitle: "Lead Developer / Technical Director",
  
  clientCompanyName: "AMS Haulage and Logistics",
  clientAddress: "Ama-wire Ishi-Uzo, Roadsafety Junction, Egbu Road, Owerri, Imo state",
  clientRegistrationNo: "RC Pending / Accredited",
  clientSignatoryName: "Mr. Lawrence",
  clientSignatoryTitle: "CEO / Managing Director",
  
  projectTitle: "AMS Haulage & Heavy Logistics Multi-Portal Platform (Consultant Licensing, Dispatch Hub, Transporter Fleet Vault with 48h Gate-In, In-App Disintermediation Chat, Accredited GIT Insurance Desk, Bank Factoring Desk, Equipment Leasing Engine & Heavy-Duty Marketplace)",
  totalCost: 1500000,
  deliveryTimeline: "4 Weeks (28 Calendar Days)",
  warrantyPeriodDays: 365,
  currency: "₦",
  
  milestone1Label: "50% Mobilization Deposit (Architecture, Database Schema Design, Consultant Licensing Engine & Multi-Portal UI/UX Design)",
  milestone1Amount: 750000,
  milestone2Label: "50% Final Settlement (Paid after 2 months of verified functional operational use post App Store & Google Play upload)",
  milestone2Amount: 750000,
  milestone3Label: "",
  milestone3Amount: 0,
  
  scopeClause: "The Client hereby engages the Developer to design, engineer, test, and deploy the AMS Haulage and Heavy Logistics Enterprise Platform across eight (8) core modules: Module 1: Consultant Onboarding & Quota Desk (Paid Licensing via Paystack/Moniepoint, Closed-Loop Referral Engine, Dynamic Quota Caps, Automated Commission Engine); Module 2: Contractor & Job Dispatch Hub (Structured Haulage Manifests, Geofenced Coordinates, Real-Time Capacity Decrementing Logic, 24-Hour EOI Timer); Module 3: Transporter Fleet Vault & 48-Hour Gate-In Clock (Fleet Asset Onboarding with Video Proofs, 48-Hour Gate-In Depletion Clock with Automatic Revocation, Dual-Stage Waybill Verification for Loading Advance and Proof of Offloading / e-POD); Module 4: Secure In-App Chat & Anti-Circumvention Engine (Encrypted in-app messaging between truckers and contractors with automated contact obfuscation and regex filtering of phone numbers, emails, bank accounts, and URLs to prevent platform disintermediation); Module 5: Accredited GIT Insurance Underwriting & Claims Desk (Institutional onboarding for licensed insurance underwriters, dynamic risk premium matrix, instant digital trip policy binders, automated premium deduction at source, and digital claims vault); Module 6: Bank & Institutional Financing (Factoring) Desk (Contractor-to-Bank Invitation Flow, 5-Day Expiry State Machine with Max 1 Resend, Financier Waybill Audit Desk, Automated Multi-Way Split Deductions); Module 7: Heavy Equipment Leasing Engine (Replication of 14-Step Workflow for Cranes, Excavators, Forklifts, Lowbeds, and Barges with 360° Inspection Videos, Digital Lease Contracts, and Escrow Caution Deposits); and Module 8: Automobile & Heavy-Duty E-Commerce Marketplace (Prime Movers, Flatbeds, Tippers, Genuine Spare Parts with Inspection-Based Escrow Release)—all as itemized in Schedule A. Any major scope expansion requested post-execution shall be governed by a formal written Change Request (CR).",
  
  paymentClause: "The total all-inclusive contract fee for the engineering and deployment of the Platform is One Million, Five Hundred Thousand Naira Only (₦1,500,000). The total project delivery timeline is four (4) weeks (twenty-eight [28] calendar days) from the Effective Date. The Client shall remit payment across two (2) contractual milestones: 50% (₦750,000) initial mobilization fee upon contract execution; and 50% (₦750,000) final settlement payable after two (2) months of verified functional operational use following successful mobile app upload and live deployment on Google Play and Apple App Store (post-launch operational validation). Invoices unpaid seven (7) business days past due date entitle Developer to pause active development.",
  
  infrastructureClause: "The Client is solely responsible for funding recurring third-party cloud infrastructure and operational expenses required to operate the Platform, estimated at: Railway Cloud (API, Redis Queues, PostgreSQL DB & Storage Bucket) at ~$10 – $20 / month (handles backend API, workers, cron timers, managed DB, and high-volume video proof & document storage bucket); Automated SMS & OTP Dispatch (Termii) on pay-as-you-go basis (~₦5 per notification / alert); Payment Processing (Paystack / Moniepoint) at standard 1.5% fee capped at ₦2,000 per local transaction; and one-time/annual App Store registrations: Google Play Console ($25 one-time) and Apple Developer Program ($99/year).",
  
  ipClause: "The Client shall own 100% complete, exclusive, and unencumbered Intellectual Property (IP) rights in the Platform. Upon receipt of full and final payment (₦1,500,000), all right, title, and interest in and to the Platform—including all custom source code, frontend and backend architectures, database schemas, API interfaces, state-machine countdown algorithms, UI/UX designs, visual assets, documentation, and technical deliverables—shall vest completely and exclusively in AMS Haulage and Logistics. The Developer waives and transfers all claims, proprietary rights, and title therein to the Client. Upon final milestone settlement, the Developer shall execute complete handover of all Git source code repositories, master administrative credentials, server deployment scripts, and database access keys directly to the Client, free of any ongoing licensing restrictions, royalties, or developer encumbrances.",
  
  disclaimersClause: "Bank Factoring, Credit Underwriting & Statutory Compliance: The Platform provides technical software infrastructure, invitation state machines, and document verification desks to connect Contractors with Banks and Institutional Financiers for invoice factoring and milestone disbursements. The Developer does not operate as a financial institution, credit bureau, or lending entity. Credit approval, factoring fee percentages, underwriting risk assessments, and financing disbursements are strictly governed by bilateral contractual agreements between accredited financing institutions and contractors.\n\nGoods-in-Transit (GIT) Insurance & Underwriting: The Platform integrates digital APIs and split payment mechanisms for accredited third-party insurance underwriters to issue policies and audit claims. The Developer is not an insurance underwriter or broker. Policy terms, risk assessment, coverage scopes, and claim settlements remain exclusively between participating insurance underwriters and the insured parties.\n\nVehicle Roadworthiness, Operational Safety & Inspection: The Platform provides digital compliance workflows (including truck inspection video proof uploads, driver license logs, proof of ownership records, and Goods-in-Transit [GIT] insurance policy documentation). The Platform and Developer do not inspect physical vehicles and assume no legal or operational liability for vehicle mechanical failure, road accidents, highway transit delays, transit cargo loss/damage, or transporter non-performance. Physical operational safety, driver vetting, and insurance claims remain the direct responsibility of the respective transporters and contractor consignors.\n\nIn-App Messaging & Disintermediation Shield: The Platform incorporates automated algorithmic keyword and regex filtering to obfuscate personal contact details and prevent disintermediation between truckers and contractors. While the Developer engineers robust anti-circumvention filters, the Client is responsible for enforcing platform terms of service, merchant compliance, and executing sanctions or account suspensions against offending participants.",
  
  warrantyClause: "Upon milestone delivery, the Client shall have seven (7) business days to inspect the deliverables and report any reproducible software bugs deviating from Schedule A. The Developer shall provide twelve (12) months of complimentary post-launch technical support and maintenance commencing from live production launch. This support is strictly confined to system monitoring, server uptime surveillance, database integrity checks, background worker queue health, and diagnosing and resolving any existing bugs or defects arising within the agreed Schedule A scope. This support expressly excludes the design, engineering, or deployment of new features, architectural scope additions, or third-party add-ons, which shall be treated as new feature requests governed by separate written Change Requests (CRs).\n\nPost-Warranty Annual Support Retainer (₦800,000 / Year): Following the expiration of the initial twelve (12) months of complimentary support, the Client may retain the Developer for ongoing annual enterprise technical support, system health surveillance, database optimization, and bug-fix warranty at an agreed retainer fee of Eight Hundred Thousand Naira Only (₦800,000 / year), payable annually in advance by the Client.",
  
  governingLawClause: "The Developer's maximum aggregate liability under this Agreement shall not exceed the total fees actually paid by the Client under this Agreement. This Agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute not resolved amicably within fourteen (14) days shall be referred to mediation or arbitration in accordance with the Arbitration and Mediation Act, 2023.",
  
  bankInfo: "Bank Name: GUARANTY TRUST BANK (GTBank)\nAccount Name: SALES COWBOY MARKETING SOLUTIONS\nAccount Number: 3006086291"
};

// UTF-8 Base64 serialization
const serializeState = (state: AgreementState): string => {
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

const deserializeState = (base64Str: string): AgreementState | null => {
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

function LogisticsAgreementContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"edit" | "view">("view");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [activeTab, setActiveTab] = useState<"parties" | "commercials" | "clauses" | "signatures">("parties");

  const [state, setState] = useState<AgreementState>(DEFAULT_LOGISTICS_AGREEMENT_STATE);

  useEffect(() => {
    const dataParam = searchParams.get("data");
    const modeParam = searchParams.get("mode");

    if (dataParam) {
      const decoded = deserializeState(dataParam);
      if (decoded) setState(decoded);
    }

    if (modeParam === "edit") {
      setViewMode("edit");
    }
  }, [searchParams]);

  const generateLink = (onlyView = true) => {
    const serialized = serializeState(state);
    const mode = onlyView ? "view" : "edit";
    if (typeof window !== "undefined") {
      return `${window.location.origin}${window.location.pathname}?data=${serialized}&mode=${mode}`;
    }
    return "";
  };

  const handleCopyLink = async (onlyView = true) => {
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
    if (confirm("Reset agreement back to default AMS Haulage template?")) {
      setState(DEFAULT_LOGISTICS_AGREEMENT_STATE);
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

      {/* Top Header Bar */}
      <header className="bg-slate-900 text-white py-3.5 px-6 top-0 z-30 shadow-md no-print flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-lg font-black tracking-wider uppercase text-amber-500 font-mono">
              SALES COWBOY
            </span>
          </Link>
          <span className="h-5 w-px bg-slate-700 hidden sm:block"></span>
          <span className="text-xs tracking-wider text-slate-300 uppercase hidden sm:block font-medium">
            AMS Haulage & Logistics — Master Software Agreement
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/logistics-proposal"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">View</span> Proposal
          </Link>

          {viewMode === "view" ? (
            <button
              onClick={() => setViewMode("edit")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit
            </button>
          ) : (
            <button
              onClick={() => setViewMode("view")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview Document
            </button>
          )}

          <button
            onClick={() => handleCopyLink(true)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            {copiedText ? "Copied!" : "Share"}
          </button>

          <button
            onClick={handlePrint}
            title="Download or Print this agreement as a clean A4 PDF"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* EDIT SIDEBAR (no-print) */}
        {viewMode === "edit" && (
          <aside className="w-full md:w-96 bg-slate-900 border-r border-slate-800 p-5 overflow-y-auto no-print space-y-6 flex-shrink-0 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="font-bold text-sm text-slate-200 uppercase tracking-wide">Agreement Editor</h2>
              <button
                onClick={resetToDefault}
                className="text-slate-400 hover:text-amber-400 flex items-center gap-1 text-[11px]"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Editor Tabs */}
            <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {(["parties", "commercials", "clauses", "signatures"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-1.5 text-center font-medium capitalize rounded transition-colors text-[11px] ${
                    activeTab === tab
                      ? "bg-amber-600 text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB: PARTIES */}
            {activeTab === "parties" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Agreement Reference ID</label>
                  <input
                    type="text"
                    value={state.agreementId}
                    onChange={(e) => setState({ ...state, agreementId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Effective Date</label>
                  <input
                    type="date"
                    value={state.effectiveDate}
                    onChange={(e) => setState({ ...state, effectiveDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-3">
                  <h3 className="font-bold text-amber-500 uppercase text-[11px]">Client Particulars</h3>
                  <div className="space-y-1">
                    <label className="text-slate-400">Company Name</label>
                    <input
                      type="text"
                      value={state.clientCompanyName}
                      onChange={(e) => setState({ ...state, clientCompanyName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Authorized Signatory Name</label>
                    <input
                      type="text"
                      value={state.clientSignatoryName}
                      onChange={(e) => setState({ ...state, clientSignatoryName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Signatory Title</label>
                    <input
                      type="text"
                      value={state.clientSignatoryTitle}
                      onChange={(e) => setState({ ...state, clientSignatoryTitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Company Address</label>
                    <input
                      type="text"
                      value={state.clientAddress}
                      onChange={(e) => setState({ ...state, clientAddress: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: COMMERCIALS */}
            {activeTab === "commercials" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Project Title</label>
                  <textarea
                    rows={2}
                    value={state.projectTitle}
                    onChange={(e) => setState({ ...state, projectTitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-slate-400">Total Contract (₦)</label>
                    <input
                      type="number"
                      value={state.totalCost}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setState({
                          ...state,
                          totalCost: val,
                          milestone1Amount: Math.round(val * 0.5),
                          milestone2Amount: Math.round(val * 0.5),
                          milestone3Amount: 0
                        });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Timeline</label>
                    <input
                      type="text"
                      value={state.deliveryTimeline}
                      onChange={(e) => setState({ ...state, deliveryTimeline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-3">
                  <h3 className="font-bold text-amber-500 uppercase text-[11px]">Milestones (50% / 50%)</h3>
                  <div className="space-y-1">
                    <label className="text-slate-400">Milestone 1 (50% Mobilization)</label>
                    <input
                      type="number"
                      value={state.milestone1Amount}
                      onChange={(e) => setState({ ...state, milestone1Amount: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Milestone 2 (50% Post 2-Month Upload)</label>
                    <input
                      type="number"
                      value={state.milestone2Amount}
                      onChange={(e) => setState({ ...state, milestone2Amount: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CLAUSES */}
            {activeTab === "clauses" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Article 1: Scope of Work</label>
                  <textarea
                    rows={4}
                    value={state.scopeClause}
                    onChange={(e) => setState({ ...state, scopeClause: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 text-[11px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Article 3: Infrastructure</label>
                  <textarea
                    rows={3}
                    value={state.infrastructureClause}
                    onChange={(e) => setState({ ...state, infrastructureClause: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 text-[11px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Article 4: Intellectual Property</label>
                  <textarea
                    rows={4}
                    value={state.ipClause}
                    onChange={(e) => setState({ ...state, ipClause: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 text-[11px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Article 5: Disclaimers & Factoring</label>
                  <textarea
                    rows={4}
                    value={state.disclaimersClause}
                    onChange={(e) => setState({ ...state, disclaimersClause: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 text-[11px]"
                  />
                </div>
              </div>
            )}

            {/* TAB: SIGNATURES & BANK */}
            {activeTab === "signatures" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Developer Signatory Name</label>
                  <input
                    type="text"
                    value={state.developerSignatoryName}
                    onChange={(e) => setState({ ...state, developerSignatoryName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Bank Remittance Particulars</label>
                  <textarea
                    rows={3}
                    value={state.bankInfo}
                    onChange={(e) => setState({ ...state, bankInfo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>
              </div>
            )}
          </aside>
        )}

        {/* DOCUMENT PREVIEW CONTAINER */}
        <main className="flex-1 bg-slate-900/40 p-4 md:p-8 overflow-y-auto flex justify-center">
          <div className="print-container bg-white text-slate-900 w-full max-w-4xl p-8 md:p-14 shadow-2xl rounded-sm border border-slate-200 relative text-justify leading-relaxed">
            
            {/* Document Header & Crest */}
            <div className="border-b-2 border-slate-900 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="flex items-center gap-3 select-none">
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
                    Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos, Nigeria • +234 810 493 3232
                  </p>
                </div>
              </div>

              <div className="text-right text-xs text-slate-600 font-mono space-y-0.5">
                <div className="font-bold text-slate-900 uppercase">OFFICIAL BILATERAL CONTRACT</div>
                <div className="text-amber-800 font-bold">REF: {state.agreementId}</div>
                <div>DATE: {state.effectiveDate}</div>
              </div>
            </div>

            {/* Recitals / Preamble */}
            <div className="mb-8 text-xs leading-relaxed text-slate-700 space-y-3">
              <p>
                <strong>THIS MASTER SOFTWARE DEVELOPMENT AGREEMENT</strong> (the &ldquo;Agreement&rdquo;) is executed on this <strong>{state.effectiveDate}</strong>, by and between:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-md my-3 font-sans">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-amber-700 uppercase font-mono">DEVELOPER / EXECUTOR:</div>
                  <div className="font-bold text-slate-900">{state.developerLegalName}</div>
                  <div className="text-[11px] text-slate-600">{state.developerAddress}</div>
                  <div className="text-[11px] text-slate-600">Represented by: <strong>{state.developerSignatoryName}</strong></div>
                </div>

                <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
                  <div className="text-[10px] font-bold text-amber-700 uppercase font-mono">CLIENT / SPONSOR:</div>
                  <div className="font-bold text-slate-900">{state.clientCompanyName}</div>
                  <div className="text-[11px] text-slate-600">{state.clientAddress}</div>
                  <div className="text-[11px] text-slate-600">Represented by: <strong>{state.clientSignatoryName}</strong> ({state.clientSignatoryTitle})</div>
                </div>
              </div>

              <p className="italic text-slate-600">
                WHEREAS, the Client desires to engage the Developer to architect, engineer, and deploy the enterprise digital infrastructure described herein, and the Developer possesses the requisite engineering competencies to fulfill such obligations under the terms and conditions outlined below:
              </p>
            </div>

            {/* Contract Body Clauses */}
            <div className="space-y-6 text-xs text-slate-800">
              
              {/* Article 1 */}
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2 font-mono flex items-center gap-2">
                  <span className="text-amber-700">1.0</span> SCOPE OF WORK & SYSTEM MODULES
                </h2>
                <p className="mb-2">{state.scopeClause}</p>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1 text-[11.5px]">
                  <div><strong>• Module 1: Consultant Onboarding & Quota Desk</strong> — Paid Licensing via Paystack/Moniepoint, closed-loop invite referrals, admin account cap enforcement, automated wallet splits.</div>
                  <div><strong>• Module 2: Contractor & Job Dispatch Hub</strong> — Structured cargo briefs, geofenced loading/offload points, real-time capacity decrementing countdown, 24h EOI timer.</div>
                  <div><strong>• Module 3: Transporter Fleet Vault & 48-Hour Gate-In Clock</strong> — Fleet asset profiles with mandatory truck video uploads, automated 48-hour gate-in countdown state machine with real-time UI badges and alerts (T-24h/12h/2h), automated job revocation without contractor penalty if unverified at depot within 48h (instantly returning capacity to open pool), and dual-stage waybills (loading advance & e-POD offload payout).</div>
                  <div><strong>• Module 4: Secure In-App Chat & Anti-Circumvention Engine</strong> — Transaction-bound encrypted messaging between truckers and contractors with automated contact-redaction filter (phone/email/NUBAN/URL scrubbing) enforcing 100% platform retention.</div>
                  <div><strong>• Module 5: Accredited GIT Insurance Underwriting & Claims Desk</strong> — Institutional insurer portal, dynamic risk matrix, automated trip policy binders, at-source premium deductions, and digital claims audit vault.</div>
                  <div><strong>• Module 6: Bank & Institutional Financing (Factoring) Desk</strong> — Contractor-to-bank invite pipeline, 5-day state machine (max 1 resend), financier waybill audit desk, dynamic multi-way split settlement.</div>
                  <div><strong>• Module 7: Heavy Equipment Leasing Engine</strong> — 14-step machinery workflow (cranes, excavators, forklifts, lowbeds, barges) with inspection videos and caution escrow.</div>
                  <div><strong>• Module 8: Automobile & Heavy-Duty Marketplace</strong> — Classified catalog for prime movers, flatbeds, tippers, genuine parts with inspection-based escrow release.</div>
                </div>
              </div>

              {/* Article 2 */}
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2 font-mono flex items-center gap-2">
                  <span className="text-amber-700">2.0</span> TOTAL COMMERCIAL INVESTMENT & MILESTONE SCHEDULE
                </h2>
                <p className="mb-3">{state.paymentClause}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                  <div className="border border-slate-300 p-3 rounded bg-slate-50 text-center">
                    <div className="text-[10px] font-bold text-amber-800 uppercase font-mono">MILESTONE 1 (50%)</div>
                    <div className="text-base font-extrabold text-slate-900 font-mono mt-1">₦{formatNumber(state.milestone1Amount)}</div>
                    <div className="text-[10.5px] text-slate-600 mt-1">Mobilization Deposit (Architecture, DB Schemas, Consultant Licensing & Multi-Portal UI/UX Layouts)</div>
                  </div>

                  <div className="border border-slate-300 p-3 rounded bg-slate-50 text-center">
                    <div className="text-[10px] font-bold text-amber-800 uppercase font-mono">MILESTONE 2 (50%)</div>
                    <div className="text-base font-extrabold text-slate-900 font-mono mt-1">₦{formatNumber(state.milestone2Amount)}</div>
                    <div className="text-[10.5px] text-slate-600 mt-1">Final Settlement (Paid after 2 months of verified functional operational use post App Store & Google Play upload)</div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded text-amber-900 font-mono text-[11px] whitespace-pre-line">
                  {state.bankInfo}
                </div>
              </div>

              {/* Article 3 */}
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2 font-mono flex items-center gap-2">
                  <span className="text-amber-700">3.0</span> APP RUNNING FEES & THIRD-PARTY INFRASTRUCTURE
                </h2>
                <p className="mb-2">{state.infrastructureClause}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 border border-slate-200 rounded">
                  <div><strong>• Railway Cloud (API, Redis, Postgres DB & Storage Bucket):</strong> ~$10 – $20 / month</div>
                  <div><strong>• Automated SMS & OTP Dispatch (Termii):</strong> Pay-as-you-go (~₦5/notification)</div>
                  <div><strong>• Payment Processing (Paystack / Moniepoint):</strong> 1.5% capped at ₦2,000 / transaction</div>
                  <div><strong>• Developer Accounts:</strong> Google Play ($25 one-time), Apple Developer ($99/yr)</div>
                </div>
              </div>

              {/* Article 4 */}
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2 font-mono flex items-center gap-2">
                  <span className="text-amber-700">4.0</span> 100% INTELLECTUAL PROPERTY (IP) OWNERSHIP
                </h2>
                <p>{state.ipClause}</p>
              </div>

              {/* Article 5 */}
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2 font-mono flex items-center gap-2">
                  <span className="text-amber-700">5.0</span> OPERATIONAL, FACTORING & REGULATORY DISCLAIMERS
                </h2>
                <div className="space-y-2 whitespace-pre-line">
                  {state.disclaimersClause}
                </div>
              </div>

              {/* Article 6 */}
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2 font-mono flex items-center gap-2">
                  <span className="text-amber-700">6.0</span> ACCEPTANCE TESTING & 12-MONTH TECHNICAL SUPPORT
                </h2>
                <p>{state.warrantyClause}</p>
              </div>

              {/* Article 7 */}
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2 font-mono flex items-center gap-2">
                  <span className="text-amber-700">7.0</span> LIMITATION OF LIABILITY & GOVERNING LAW
                </h2>
                <p>{state.governingLawClause}</p>
              </div>

            </div>

            {/* Signatures Block */}
            <div className="mt-12 pt-8 border-t-2 border-slate-900 page-break">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-6 font-mono">
                IN WITNESS WHEREOF, THE PARTIES HERETO HAVE DULY EXECUTED THIS AGREEMENT:
              </div>

              <div className="grid grid-cols-2 gap-8 text-xs">
                {/* Developer Signatory */}
                <div className="space-y-3">
                  <div className="text-[10px] font-bold text-amber-800 uppercase font-mono">FOR THE DEVELOPER:</div>
                  <div className="font-bold text-slate-900">{state.developerLegalName}</div>
                  
                  <div className="pt-8 border-b border-slate-400 w-4/5"></div>
                  
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-900">{state.developerSignatoryName}</div>
                    <div className="text-slate-600">{state.developerSignatoryTitle}</div>
                    <div className="text-slate-500 font-mono text-[10px]">Date: {state.effectiveDate}</div>
                  </div>
                </div>

                {/* Client Signatory */}
                <div className="space-y-3">
                  <div className="text-[10px] font-bold text-amber-800 uppercase font-mono">FOR THE CLIENT:</div>
                  <div className="font-bold text-slate-900">{state.clientCompanyName}</div>
                  
                  <div className="pt-8 border-b border-slate-400 w-4/5"></div>
                  
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-900">{state.clientSignatoryName}</div>
                    <div className="text-slate-600">{state.clientSignatoryTitle}</div>
                    <div className="text-slate-500 font-mono text-[10px]">Date: ____________________</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-10 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-500 font-mono flex justify-between">
              <span>AMS HAULAGE & LOGISTICS — MASTER SERVICES AGREEMENT</span>
              <span>CONFIDENTIAL & PROPRIETARY</span>
              <span>PAGE 1 OF 1</span>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default function LogisticsAgreementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading agreement...</div>}>
      <LogisticsAgreementContent />
    </Suspense>
  );
}
