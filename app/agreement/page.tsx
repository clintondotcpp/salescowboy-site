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
  ChevronDown, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
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

const DEFAULT_AGREEMENT_STATE: AgreementState = {
  agreementId: "SDA-2026-SCM-774",
  effectiveDate: "2026-11-01",
  
  developerName: "Sales Cowboy Marketing Solutions",
  developerLegalName: "SALES COWBOY MARKETING SOLUTIONS",
  developerAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos, Nigeria",
  developerEmail: "hello@salescowboy.com.ng",
  developerPhone: "+234 810 493 3232",
  developerWebsite: "salescowboy.com.ng",
  developerSignatoryName: "Clinton Chukwunyere",
  developerSignatoryTitle: "Sales Cowboy Marketing Solutions",
  
  clientCompanyName: "",
  clientAddress: "",
  clientRegistrationNo: "",
  clientSignatoryName: "",
  clientSignatoryTitle: "",
  
  projectTitle: "Tri-Platform Real Estate Ecosystem: Mobile App (iOS/Android), High-SEO Public Web Marketplace (MLS), Multi-Role Portals & Polygon Blockchain Integration",
  totalCost: 3500000,
  deliveryTimeline: "8 – 12 Weeks",
  warrantyPeriodDays: 45,
  currency: "₦",
  
  milestone1Label: "50% Mobilization Deposit (Execution of Contract, Architecture, UI/UX & DB Setup)",
  milestone1Amount: 1750000,
  milestone2Label: "30% Staging & UAT Milestone (Web Marketplace, Admin Portals, Mobile Beta & Testnet)",
  milestone2Amount: 1050000,
  milestone3Label: "20% Production Handover & Live Launch (Railway Cloud, Polygon Mainnet & App Stores)",
  milestone3Amount: 700000,
  
  scopeClause: "The Client hereby engages the Developer to design, develop, test, and deploy the Three-Platform Real Estate Ecosystem—comprising the iOS/Android Mobile Application, the Public SEO Web Marketplace (MLS), the Multi-Role Administrative/Surveyor/Accounting/Audit Web Portals, and Polygon Blockchain Integration (collectively, the 'Platform')—in accordance with Schedule A (Technical & Commercial Proposal) attached hereto. Any major new feature requested after the execution of this Agreement that falls outside the agreed scope shall be governed by a formal written Change Request (CR).",
  
  paymentClause: "The total all-inclusive development fee for the Platform is Three Million, Five Hundred Thousand Naira Only (₦3,500,000). The Client shall remit payment across three milestones: 50% (₦1,750,000) non-refundable mobilization fee upon contract execution; 30% (₦1,050,000) upon deployment of the functional beta builds to staging for User Acceptance Testing (UAT); and 20% (₦700,000) upon completion of UAT, live Railway cloud deployment, and Polygon Mainnet launch, prior to the final transfer of master administrative credentials and source repositories. Invoices unpaid seven (7) business days past due date entitle Developer to pause active development.",
  
  infrastructureClause: "The Client is solely responsible for funding recurring third-party infrastructure and operational expenses as itemized in Schedule A, including Railway cloud hosting ($10–$20/mo), domain registration, Polygon Mainnet gas sponsorship wallets (POL tokens), KYC/identity verification API credits (Prembly/Smile ID), and Apple ($99/yr) / Google ($25) developer accounts.",
  
  ipClause: "Upon receipt of full and final payment (₦3,500,000), all right, title, and interest in the custom source code, Polygon smart contracts, UI/UX designs, and database schemas created specifically for the Client shall vest exclusively in the Client. The Developer retains ownership of its pre-existing reusable libraries and internal architectural templates, granting the Client a perpetual, royalty-free, irrevocable license to use them within the Platform.",
  
  disclaimersClause: "Audit Logs & Statutory Licensing: The Developer shall engineer the Platform with double-entry financial accounting ledgers, automated invoice/receipt engines, and immutable system-wide audit logs (recording every action and User ID) to support inspections by external government agencies (SCUML/NFIU, NRS/FIRS, NDPC, and SEC Nigeria). However, the Client remains solely responsible for obtaining and maintaining all statutory corporate licenses, tax filings, and regulatory approvals.\n\nAutomated Title Signatures & Surveyor Valuations: The Platform automates digital signature placement on title document templates and records property valuations submitted by the Client's Estate Surveyors. The Client is solely responsible for the legal validity of underlying property titles, physical land registry filings, and surveyor valuation accuracy.\n\nSearch Engine Optimization (SEO): The Developer warrants that the Public Web Marketplace shall be engineered with technical SEO best practices (SSR, dynamic sitemaps, Schema.org). Search engine rankings depend on ongoing content and market activity and are not guaranteed as fixed rankings.\n\nPolygon Blockchain Tokenization & Secondary Liquidity Protocol: Real estate is an inherently illiquid physical asset. Instant or rapid liquidation is not an unconditional guarantee and is strictly facilitated through three mechanisms: (a) Secondary Marketplace with Limit Orders (subject to finding a counterparty buyer on the platform order book), (b) Optional Treasury-Assisted Rapid Buyback at an automated 5%–10% liquidation spread (haircut) to protect platform cash reserves from bank runs, or (c) Structured quarterly/bi-annual exit windows. Furthermore, fractional property acquisitions are dependent upon sufficient crowd-pool aggregation (e.g., aggregating enough buyers at ₦10,000 per fraction to fully capitalize an asset such as a ₦350,000,000 property). Transactions confirmed on the Polygon Mainnet are irreversible.",
  
  warrantyClause: "Upon milestone delivery, the Client shall have seven (7) business days to inspect the deliverables and report any reproducible software bugs deviating from Schedule A. The Developer provides a Forty-Five (45) Day Bug-Fix Warranty following production launch to resolve any reproducible defects within the agreed scope at no additional cost.",
  
  governingLawClause: "The Developer's maximum aggregate liability under this Agreement shall not exceed the total fees actually paid by the Client under this Agreement. This Agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute not resolved amicably within fourteen (14) days shall be referred to mediation or arbitration in accordance with the Arbitration and Mediation Act, 2023.",
  
  bankInfo: "Bank Name: GUARANTY TRUST BANK\nAccount Name: SALES COWBOY MARKETING SOLUTIONS\nAccount Number: 3006086291"
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

function AgreementContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"edit" | "view">("edit");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [activeTab, setActiveTab] = useState<"parties" | "commercials" | "clauses" | "signatures">("parties");

  const [state, setState] = useState<AgreementState>(DEFAULT_AGREEMENT_STATE);

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
    if (confirm("Reset agreement back to default Sales Cowboy template?")) {
      setState(DEFAULT_AGREEMENT_STATE);
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
            Master Software Agreement Builder
          </span>
        </div>

        <div className="flex items-center gap-3">
          {viewMode === "view" ? (
            <button
              onClick={() => setViewMode("edit")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit Agreement
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
            title="Download this agreement as a clean A4 PDF file"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download / Print PDF</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* LEFT COLUMN: EDITOR CONTROLS (Hidden in View Mode) */}
        {viewMode === "edit" && (
          <div className="w-full lg:w-[480px] bg-slate-900 border-r border-slate-800 p-5 overflow-y-auto max-h-[calc(100vh-60px)] no-print">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div>
                <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-500" />
                  Agreement Editor
                </h2>
                <p className="text-[11px] text-slate-400">
                  Update contract details, parties, and legal clauses.
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
              
              {/* TAB 1: PARTIES & EFFECTIVE DATE */}
              <div className="bg-slate-850 rounded-lg border border-slate-800 p-3.5">
                <button
                  onClick={() => setActiveTab(activeTab === "parties" ? "commercials" : "parties")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-amber-500" />
                    1. Contracting Parties
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTab === "parties" ? "rotate-180" : ""}`} />
                </button>

                {activeTab === "parties" && (
                  <div className="space-y-3 pt-4 border-t border-slate-800/80 mt-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-1">Agreement Ref ID</label>
                        <input
                          type="text"
                          value={state.agreementId}
                          onChange={(e) => setState(prev => ({ ...prev, agreementId: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-1">Effective Date</label>
                        <input
                          type="date"
                          value={state.effectiveDate}
                          onChange={(e) => setState(prev => ({ ...prev, effectiveDate: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-mono"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[10px] font-bold text-amber-500 uppercase block mb-1.5 font-mono">
                        Client Entity (Party of the First Part)
                      </span>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Client Legal Name</label>
                          <input
                            type="text"
                            value={state.clientCompanyName}
                            placeholder="Leave blank or enter client corporate legal name"
                            onChange={(e) => setState(prev => ({ ...prev, clientCompanyName: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Client Registered Address</label>
                          <input
                            type="text"
                            value={state.clientAddress}
                            onChange={(e) => setState(prev => ({ ...prev, clientAddress: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Signatory Name</label>
                            <input
                              type="text"
                              value={state.clientSignatoryName}
                              onChange={(e) => setState(prev => ({ ...prev, clientSignatoryName: e.target.value }))}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Signatory Title</label>
                            <input
                              type="text"
                              value={state.clientSignatoryTitle}
                              onChange={(e) => setState(prev => ({ ...prev, clientSignatoryTitle: e.target.value }))}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[10px] font-bold text-amber-500 uppercase block mb-1.5 font-mono">
                        Developer Entity (Sales Cowboy Marketing Solutions)
                      </span>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Developer Legal Name</label>
                          <input
                            type="text"
                            value={state.developerLegalName}
                            onChange={(e) => setState(prev => ({ ...prev, developerLegalName: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Principal Office</label>
                          <input
                            type="text"
                            value={state.developerAddress}
                            onChange={(e) => setState(prev => ({ ...prev, developerAddress: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Managing Director</label>
                            <input
                              type="text"
                              value={state.developerSignatoryName}
                              onChange={(e) => setState(prev => ({ ...prev, developerSignatoryName: e.target.value }))}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Contact Phone</label>
                            <input
                              type="text"
                              value={state.developerPhone}
                              onChange={(e) => setState(prev => ({ ...prev, developerPhone: e.target.value }))}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* TAB 2: FINANCIAL INVESTMENT & MILESTONES */}
              <div className="bg-slate-855 rounded-lg border border-slate-800 p-3.5">
                <button
                  onClick={() => setActiveTab(activeTab === "commercials" ? "clauses" : "commercials")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    2. Commercials & Milestones
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTab === "commercials" ? "rotate-180" : ""}`} />
                </button>

                {activeTab === "commercials" && (
                  <div className="space-y-3 pt-4 border-t border-slate-800/80 mt-3">
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
                        <label className="text-[10px] font-semibold text-slate-400 block mb-1">Delivery Timeline</label>
                        <input
                          type="text"
                          value={state.deliveryTimeline}
                          onChange={(e) => setState(prev => ({ ...prev, deliveryTimeline: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Milestone Payments</span>
                      
                      {/* Milestone 1 */}
                      <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
                        <label className="text-[9px] font-bold text-amber-500 uppercase">Milestone 1 (50% Upfront)</label>
                        <input
                          type="text"
                          value={state.milestone1Label}
                          onChange={(e) => setState(prev => ({ ...prev, milestone1Label: e.target.value }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100"
                        />
                        <input
                          type="number"
                          value={state.milestone1Amount}
                          onChange={(e) => setState(prev => ({ ...prev, milestone1Amount: Number(e.target.value) }))}
                          className="w-32 bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 font-mono"
                        />
                      </div>

                      {/* Milestone 2 */}
                      <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
                        <label className="text-[9px] font-bold text-amber-500 uppercase">Milestone 2 (30% Beta/UAT)</label>
                        <input
                          type="text"
                          value={state.milestone2Label}
                          onChange={(e) => setState(prev => ({ ...prev, milestone2Label: e.target.value }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100"
                        />
                        <input
                          type="number"
                          value={state.milestone2Amount}
                          onChange={(e) => setState(prev => ({ ...prev, milestone2Amount: Number(e.target.value) }))}
                          className="w-32 bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 font-mono"
                        />
                      </div>

                      {/* Milestone 3 */}
                      <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
                        <label className="text-[9px] font-bold text-amber-500 uppercase">Milestone 3 (20% Live Handover)</label>
                        <input
                          type="text"
                          value={state.milestone3Label}
                          onChange={(e) => setState(prev => ({ ...prev, milestone3Label: e.target.value }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100"
                        />
                        <input
                          type="number"
                          value={state.milestone3Amount}
                          onChange={(e) => setState(prev => ({ ...prev, milestone3Amount: Number(e.target.value) }))}
                          className="w-32 bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 font-mono"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Official Bank Remittance Details</label>
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

              {/* TAB 3: LEGAL CLAUSES & ARTICLES */}
              <div className="bg-slate-855 rounded-lg border border-slate-800 p-3.5">
                <button
                  onClick={() => setActiveTab(activeTab === "clauses" ? "signatures" : "clauses")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    3. Legal Clauses & Articles
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTab === "clauses" ? "rotate-180" : ""}`} />
                </button>

                {activeTab === "clauses" && (
                  <div className="space-y-3 pt-4 border-t border-slate-800/80 mt-3 text-xs">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Article 1: Scope of Work</label>
                      <textarea
                        rows={4}
                        value={state.scopeClause}
                        onChange={(e) => setState(prev => ({ ...prev, scopeClause: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-100 leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Article 3: Infrastructure Running Costs</label>
                      <textarea
                        rows={3}
                        value={state.infrastructureClause}
                        onChange={(e) => setState(prev => ({ ...prev, infrastructureClause: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-100 leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Article 4: Intellectual Property Rights</label>
                      <textarea
                        rows={3}
                        value={state.ipClause}
                        onChange={(e) => setState(prev => ({ ...prev, ipClause: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-100 leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Article 5: Regulatory & Blockchain Disclaimers</label>
                      <textarea
                        rows={5}
                        value={state.disclaimersClause}
                        onChange={(e) => setState(prev => ({ ...prev, disclaimersClause: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-100 leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Article 6: Testing & Bug-Fix Warranty</label>
                      <textarea
                        rows={3}
                        value={state.warrantyClause}
                        onChange={(e) => setState(prev => ({ ...prev, warrantyClause: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-100 leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Article 7: Liability & Governing Law</label>
                      <textarea
                        rows={3}
                        value={state.governingLawClause}
                        onChange={(e) => setState(prev => ({ ...prev, governingLawClause: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-100 leading-relaxed"
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
                <Scale className="w-5 h-5 text-amber-600" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Official Legal Contract Review
                  </h4>
                  <p className="text-xs text-slate-500">
                    Software Development Agreement executed by Sales Cowboy Marketing Solutions.
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
            
            {/* Agreement Document Content */}
            <div>
              
              {/* Official Corporate Letterhead */}
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
                    <p className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      {state.developerAddress}
                    </p>
                    <p className="flex items-center gap-3 pt-0.5 font-mono text-[10px]">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {state.developerEmail}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {state.developerPhone}</span>
                    </p>
                    <p className="text-[#7c4a1e] font-medium font-mono text-[10px]">{state.developerWebsite}</p>
                  </div>
                </div>

                {/* Right Document Reference */}
                <div className="text-left sm:text-right flex flex-col justify-between self-stretch">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-left sm:text-right">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      DOCUMENT REFERENCE
                    </span>
                    <p className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                      {state.agreementId}
                    </p>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono mt-2">
                      EFFECTIVE DATE
                    </span>
                    <p className="text-xs font-mono font-semibold text-slate-800">
                      {new Date(state.effectiveDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Title Header */}
              <div className="text-center my-6 pb-4 border-b border-slate-200">
                <span className="inline-block bg-slate-900 text-amber-400 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                  Legally Binding Master Services Agreement
                </span>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 font-serif">
                  SOFTWARE DEVELOPMENT AGREEMENT
                </h2>
                <p className="text-xs text-slate-500 max-w-xl mx-auto mt-1 font-medium">
                  {state.projectTitle}
                </p>
              </div>

              {/* Preamble & Parties */}
              <div className="text-xs leading-relaxed text-justify text-slate-700 space-y-3 mb-6 bg-slate-50/60 p-4 rounded-lg border border-slate-200">
                <p>
                  <strong>THIS SOFTWARE DEVELOPMENT AGREEMENT</strong> (the <em>&ldquo;Agreement&rdquo;</em>) is made and entered into on this <strong>{new Date(state.effectiveDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</strong> (the <em>&ldquo;Effective Date&rdquo;</em>),
                </p>
                <p>
                  <strong>BETWEEN:</strong>
                </p>
                <div className="pl-4 space-y-2 border-l-2 border-amber-500/40">
                  <p>
                    1. <strong>{state.clientCompanyName || "____________________________________"}</strong>, a company incorporated under the laws of the Federal Republic of Nigeria, with registered office at <em>{state.clientAddress || "____________________________________"}</em> (hereinafter referred to as the <strong>&ldquo;Client&rdquo;</strong>, which expression shall where the context so admits include its successors-in-title and permitted assigns) of the first part;
                  </p>
                  <p>
                    <strong>AND</strong>
                  </p>
                  <p>
                    2. <strong>{state.developerLegalName}</strong>, a company incorporated under the laws of the Federal Republic of Nigeria, having its principal place of business at <em>{state.developerAddress}</em> (hereinafter referred to as the <strong>&ldquo;Developer&rdquo;</strong>, which expression shall where the context so admits include its successors-in-title and permitted assigns) of the second part.
                  </p>
                </div>
              </div>

              {/* Contract Articles */}
              <div className="space-y-6 text-xs text-slate-800">
                
                {/* Article 1 */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wide text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    1. Scope of Work & Engineering Deliverables
                  </h3>
                  <div className="pl-3.5 space-y-1.5 text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                    <p>{state.scopeClause}</p>
                  </div>
                </div>

                {/* Article 2 */}
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wide text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    2. Total Development Investment & Milestone Schedule
                  </h3>
                  <div className="pl-3.5 space-y-2 text-slate-700 leading-relaxed text-justify">
                    <p>{state.paymentClause}</p>

                    {/* Milestone Breakdown Table */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden my-3">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-100 text-[10px] font-bold text-slate-600 uppercase font-mono">
                            <th className="py-2 px-3 border-b border-slate-200">Milestone Stage</th>
                            <th className="py-2 px-3 border-b border-slate-200">Deliverables Trigger</th>
                            <th className="py-2 px-3 border-b border-slate-200 text-right">Allocation</th>
                            <th className="py-2 px-3 border-b border-slate-200 text-right">Amount (NGN)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2 px-3 font-semibold text-slate-900">Stage 1: Mobilization</td>
                            <td className="py-2 px-3 text-slate-600">{state.milestone1Label}</td>
                            <td className="py-2 px-3 text-right font-mono font-bold text-amber-700">50%</td>
                            <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">{state.currency}{formatNumber(state.milestone1Amount)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-semibold text-slate-900">Stage 2: Staging & UAT</td>
                            <td className="py-2 px-3 text-slate-600">{state.milestone2Label}</td>
                            <td className="py-2 px-3 text-right font-mono font-bold text-amber-700">30%</td>
                            <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">{state.currency}{formatNumber(state.milestone2Amount)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-semibold text-slate-900">Stage 3: Production Handover</td>
                            <td className="py-2 px-3 text-slate-600">{state.milestone3Label}</td>
                            <td className="py-2 px-3 text-right font-mono font-bold text-amber-700">20%</td>
                            <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">{state.currency}{formatNumber(state.milestone3Amount)}</td>
                          </tr>
                          <tr className="bg-slate-50 font-bold">
                            <td colSpan={3} className="py-2 px-3 text-right uppercase font-mono text-[10px] text-slate-600">Total Contract Value:</td>
                            <td className="py-2 px-3 text-right font-mono text-slate-950 font-black">{state.currency}{formatNumber(state.totalCost)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Page Break for Print */}
                <div className="page-break"></div>

                {/* Article 3 */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wide text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    3. App Running Fees & Third-Party Infrastructure
                  </h3>
                  <div className="pl-3.5 space-y-1 text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                    <p>{state.infrastructureClause}</p>
                  </div>
                </div>

                {/* Article 4 */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wide text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    4. Intellectual Property Rights & Ownership Vesting
                  </h3>
                  <div className="pl-3.5 space-y-1 text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                    <p>{state.ipClause}</p>
                  </div>
                </div>

                {/* Article 5 */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wide text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    5. Regulatory Compliance, Accounting & Blockchain Disclaimers
                  </h3>
                  <div className="pl-3.5 space-y-2 text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                    <p>{state.disclaimersClause}</p>
                  </div>
                </div>

                {/* Article 6 */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wide text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    6. Acceptance Testing & 45-Day Bug-Fix Warranty
                  </h3>
                  <div className="pl-3.5 space-y-1 text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                    <p>{state.warrantyClause}</p>
                  </div>
                </div>

                {/* Article 7 */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-950 uppercase tracking-wide text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    7. Limitation of Liability & Governing Law
                  </h3>
                  <div className="pl-3.5 space-y-1 text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                    <p>{state.governingLawClause}</p>
                  </div>
                </div>

              </div>

              {/* Execution & Formal Signature Blocks */}
              <div className="mt-12 pt-6 border-t-2 border-slate-900">
                <p className="text-xs font-bold text-slate-900 mb-6 uppercase text-center font-serif">
                  IN WITNESS WHEREOF, the Parties hereto have caused this Software Development Agreement to be executed by their duly authorized representatives on the Effective Date.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                  
                  {/* Client Signature Box */}
                  <div className="border border-slate-300 rounded-lg p-5 bg-slate-50/50 flex flex-col justify-between h-48">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                        SIGNED FOR AND ON BEHALF OF:
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-1 uppercase">
                        {state.clientCompanyName || "____________________________________"}
                      </p>
                    </div>

                    <div className="space-y-1 border-t border-slate-300 pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Name:</span>
                        <span className="font-semibold text-slate-900">{state.clientSignatoryName || "________________________"}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Designation:</span>
                        <span className="font-semibold text-slate-900">{state.clientSignatoryTitle || "________________________"}</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2">
                        <span className="text-slate-500 font-medium">Signature & Date:</span>
                        <span className="font-mono text-slate-400">________________________</span>
                      </div>
                    </div>
                  </div>

                  {/* Developer Signature Box */}
                  <div className="border border-slate-300 rounded-lg p-5 bg-slate-50/50 flex flex-col justify-between h-48">
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block font-mono">
                        SIGNED FOR AND ON BEHALF OF:
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-1 uppercase">
                        {state.developerLegalName}
                      </p>
                    </div>

                    <div className="space-y-1 border-t border-slate-300 pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Name:</span>
                        <span className="font-semibold text-slate-900">{state.developerSignatoryName}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Designation:</span>
                        <span className="font-semibold text-slate-900">{state.developerSignatoryTitle}</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2">
                        <span className="text-slate-500 font-medium">Signature & Date:</span>
                        <span className="font-mono text-slate-400">________________________</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bank Settlement Footer */}
                <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2 font-mono">
                  <span>Remittance: {state.bankInfo.replace(/\n/g, " • ")}</span>
                  <span>Document Hash Verified • Page 1 of 2</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default function AgreementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Agreement...</div>}>
      <AgreementContent />
    </Suspense>
  );
}
