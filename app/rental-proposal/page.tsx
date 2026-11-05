/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Printer, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Share2, 
  CheckCircle2, 
  Layers, 
  Truck, 
  Calendar, 
  ShieldCheck, 
  BarChart3, 
  Server, 
  CreditCard,
  Copy,
  Building2,
  FileText
} from "lucide-react";

export default function RentalProposalPage() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col antialiased">
      {/* CSS Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body, html {
            background-color: white !important;
            color: #0f172a !important;
          }
          .no-print {
            display: none !important;
          }
          .print-sheet {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
          }
          @page {
            size: A4 portrait;
            margin: 12mm;
          }
        }
      `}} />

      {/* Screen Toolbar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white py-3.5 px-6 top-0 z-30 shadow-md no-print flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-lg font-black tracking-wider uppercase text-amber-500 font-mono">
              SALES COWBOY
            </span>
          </Link>
          <span className="h-5 w-px bg-slate-700 hidden sm:block"></span>
          <span className="text-xs tracking-wider text-slate-300 uppercase hidden sm:block font-medium">
            The Party Rental Station (TPRS) — Commercial ERP Proposal
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-700"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied!" : "Share Link"}</span>
          </button>
          <button
            onClick={handlePrint}
            className="bg-amber-600 hover:bg-amber-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </header>

      {/* Document View */}
      <div className="flex-1 py-10 px-4 sm:px-6 flex justify-center">
        <div className="w-full max-w-[210mm] bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden print-sheet p-8 sm:p-12">
          
          {/* Executive Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-amber-800/20 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-900/10 border border-amber-800/30 flex items-center justify-center p-2 text-amber-900">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase font-serif">
                  SALES COWBOY
                </h1>
                <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  Marketing Solutions & Enterprise Software Engineering
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-700" /> Red Brick House, Ogombo, Ajah, Lagos</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-amber-700" /> +234 810 493 3232</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-amber-700" /> salescowboy.com.ng</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right bg-slate-50 p-3 rounded-lg border border-slate-200 w-full sm:w-auto">
              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-amber-100 text-amber-800 tracking-wider">
                COMMERCIAL PROPOSAL
              </span>
              <p className="text-xs font-mono font-bold text-slate-800 mt-1">REF: PROP-TPRS-2026-008</p>
              <p className="text-[11px] text-slate-500">Date: November 05, 2026</p>
            </div>
          </div>

          {/* Proposal Subject & Client Info */}
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
              CENTRALIZED OPERATIONS, FLEET & INVENTORY ERP SYSTEM
            </h2>
            <p className="text-xs sm:text-sm text-amber-800 font-semibold mt-1">
              Standard Operating Procedure (SOP) Digitization, Time-Windowed Equipment Vault & Gatehouse Loss Shield
            </p>
          </div>

          <div className="mt-6 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">PREPARED FOR (CLIENT)</p>
              <h3 className="text-lg font-extrabold text-slate-900">The Party Rental Station (TPRS)</h3>
              <p className="text-xs text-slate-600 mt-0.5">Commercial Event Infrastructure & High-Capacity Cooling Rentals</p>
              <p className="text-xs text-slate-500 mt-1">Attention: Executive Operations Directorate & Board of Directors</p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-5 flex flex-col justify-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">ENGAGEMENT SCOPE</p>
              <p className="text-xs font-semibold text-slate-800">5-Module SOP Automation & Centralized Management Portal</p>
              <p className="text-xs text-emerald-700 font-bold mt-1">Option A: ₦3,200,000 (7 Wks) • Option B: ₦2,000,000 (4 Wks)</p>
            </div>
          </div>

          {/* 1. PROJECT BACKGROUND */}
          <div className="mt-8">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-amber-700 rounded-sm"></span>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                1. Project Background & Operational Objective
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed">
              The Party Rental Station (TPRS) manages high-value commercial event assets across Nigeria—including 5-ton to 10-ton mobile cooling units, heavy generators, marquee structures, chillers, and luxury banqueting equipment. In rapid, event-driven environments, manual coordination through paper slips, phone calls, and informal chat groups introduces critical operational friction:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
              <div className="bg-red-50/70 border border-red-200 rounded-lg p-3">
                <strong className="text-red-900 block font-bold">1. Double-Bookings & Scheduling Clashes</strong>
                <span className="text-slate-600 mt-0.5 block">High-demand AC units booked for conflicting dates without teardown or transit buffers.</span>
              </div>
              <div className="bg-red-50/70 border border-red-200 rounded-lg p-3">
                <strong className="text-red-900 block font-bold">2. Missing Cables & Inventory Leakage</strong>
                <span className="text-slate-600 mt-0.5 block">Power distribution boxes, ducting, and 3-phase cabling disappearing without staff accountability.</span>
              </div>
              <div className="bg-red-50/70 border border-red-200 rounded-lg p-3">
                <strong className="text-red-900 block font-bold">3. Fleet Logistics Blind Spots</strong>
                <span className="text-slate-600 mt-0.5 block">Unmonitored truck fuel costs, expired roadworthiness documentation, and delayed site arrivals.</span>
              </div>
              <div className="bg-red-50/70 border border-red-200 rounded-lg p-3">
                <strong className="text-red-900 block font-bold">4. Gatehouse Security Dispatches</strong>
                <span className="text-slate-600 mt-0.5 block">Assets exiting the central depot without verified digital manifests or management approvals.</span>
              </div>
            </div>
            <p className="text-xs text-slate-700 mt-3 leading-relaxed">
              <strong>The Solution:</strong> Sales Cowboy will engineer a centralized <strong>Operations, Fleet & Inventory ERP</strong> that enforces TPRS’s Standard Operating Procedures (SOP) across all departments, establishing complete operational transparency and real-time asset control.
            </p>
          </div>

          {/* 2. CORE SYSTEM MODULES */}
          <div className="mt-8">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-amber-700 rounded-sm"></span>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                2. Core System Modules & SOP Architecture
              </h3>
            </div>

            <div className="space-y-4 mt-4">
              {/* Module 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase">
                  <Layers className="w-4 h-4 text-amber-700" />
                  <span>Module 1: Time-Windowed Asset & Inventory Vault</span>
                </div>
                <ul className="mt-2 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li><strong>Conflict-Free Reservation Engine:</strong> Algorithmic engine that calculates asset availability factoring in setup windows, transit buffers, teardown schedules, and maintenance cooling-off periods to eliminate double-bookings.</li>
                  <li><strong>Categorized Multi-Tier Asset Registry:</strong> Live condition tracking (<code className="bg-slate-200 px-1 rounded text-[11px]">AVAILABLE</code>, <code className="bg-slate-200 px-1 rounded text-[11px]">BOOKED</code>, <code className="bg-slate-200 px-1 rounded text-[11px]">IN_TRANSIT</code>, <code className="bg-slate-200 px-1 rounded text-[11px]">ON_SITE</code>, <code className="bg-slate-200 px-1 rounded text-[11px]">MAINTENANCE</code>, <code className="bg-slate-200 px-1 rounded text-[11px]">QUARANTINE</code>) with specialized profiles for heavy cooling units, package ACs, and power distribution systems.</li>
                  <li><strong>Digital Issue & Return Tracking:</strong> Barcode/QR-ready dispatch scanning and post-event return checklists with automatic variance reconciliation.</li>
                </ul>
              </div>

              {/* Module 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>Module 2: Fleet Management & Logistics Desk</span>
                </div>
                <ul className="mt-2 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li><strong>Vehicle Master Register:</strong> Centralized compliance vault tracking roadworthiness, hackney permits, and insurance with automated 30-day and 7-day expiration alerts.</li>
                  <li><strong>Trip Sheets & Dispatch Control:</strong> Driver assignments, pre-trip odometer and fuel-level logging, and live status tracking from depot to venue.</li>
                  <li><strong>Maintenance & Repair Authorization:</strong> Structured driver incident reporting, digital vendor quote uploads, and multi-tier management sign-offs.</li>
                </ul>
              </div>

              {/* Module 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase">
                  <Calendar className="w-4 h-4 text-amber-700" />
                  <span>Module 3: Event Operations & Site Delivery Engine</span>
                </div>
                <ul className="mt-2 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li><strong>Digital Job Cards:</strong> Mobile-friendly manifests linking venue constraints, power requirements, and assigned technician rosters to every booking.</li>
                  <li><strong>Pre-Dispatch & Setup Checklists:</strong> Mandatory pre-loading testing protocols for high-capacity ACs (compressor drawdown, airflow temperature, oil levels).</li>
                  <li><strong>Mobile Customer Handover:</strong> On-site digital signature capture from event organizers upon delivery and collection, generating instant legal handover receipts.</li>
                </ul>
              </div>

              {/* Module 4 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Module 4: Incident, Loss & Security Audit Vault</span>
                </div>
                <ul className="mt-2 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li><strong>Gatehouse Control Desk:</strong> Tablet portal for perimeter security; no truck or equipment can exit the compound without a digitally verified Job Card.</li>
                  <li><strong>Damage & Missing Items Registry:</strong> Mandatory high-resolution photo evidence capture directly within the mobile app with automatic repair cost estimates and liability tagging.</li>
                  <li><strong>Segregated Approval Matrix:</strong> Granular digital approval thresholds: Supervisor (≤₦20k), Operations Manager (≤₦100k), Executive Management (&gt;₦100k).</li>
                </ul>
              </div>

              {/* Module 5 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase">
                  <BarChart3 className="w-4 h-4 text-amber-700" />
                  <span>Module 5: COO Executive Intelligence & KPI Reporting</span>
                </div>
                <ul className="mt-2 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li><strong>Real-Time Operations Dashboard:</strong> Tracks Fleet Availability (≥95%), Inventory Accuracy (≥98%), and On-Time Setup Rates.</li>
                  <li><strong>Cost-Center Analytics:</strong> Aggregates fuel spend, maintenance overhead, and asset utilization rates per cooling unit against monthly budgets.</li>
                  <li><strong>One-Click Reporting:</strong> Instant export of PDF and Excel operational audit reports for executive board meetings.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. TECH STACK */}
          <div className="mt-8">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-amber-700 rounded-sm"></span>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                3. Proposed Tech Stack & Architecture
              </h3>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-2.5 font-bold rounded-tl-lg">Layer</th>
                    <th className="p-2.5 font-bold">Technology</th>
                    <th className="p-2.5 font-bold rounded-tr-lg">Enterprise Function & Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-2.5 font-bold text-slate-900">Frontend Application</td>
                    <td className="p-2.5 text-slate-800">Next.js 15 (React 19, Tailwind CSS)</td>
                    <td className="p-2.5 text-slate-600">Mobile-responsive PWA for field supervisors, drivers, and warehouse staff.</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">Backend API & Workflows</td>
                    <td className="p-2.5 text-slate-800">Node.js (NestJS Architecture)</td>
                    <td className="p-2.5 text-slate-600">Modular backend with strict transaction isolation and structured audit logging.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-2.5 font-bold text-slate-900">Database Engine</td>
                    <td className="p-2.5 text-slate-800">PostgreSQL (ACID Compliant)</td>
                    <td className="p-2.5 text-slate-600">Relational integrity ensuring zero double-bookings and immutable inventory ledgers.</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">Media & Evidence Vault</td>
                    <td className="p-2.5 text-slate-800">Cloudflare R2 Object Storage</td>
                    <td className="p-2.5 text-slate-600">Zero-egress cloud storage for damage photos, gatehouse proofs, and signed PDFs.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-2.5 font-bold text-slate-900">Automated SMS & Alerts</td>
                    <td className="p-2.5 text-slate-800">Termii API Gateway</td>
                    <td className="p-2.5 text-slate-600">High-delivery transactional SMS for dispatch alerts, gatehouse OTPs, and receipts.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. THIRD-PARTY INFRASTRUCTURE TABLE */}
          <div className="mt-8">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-amber-700 rounded-sm"></span>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                4. Estimated Third-Party Cloud Infrastructure Costs
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 italic mt-1 mb-3">
              (Paid directly by TPRS to infrastructure providers; zero agency markup added)
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-2.5 font-bold rounded-tl-lg">Service Component</th>
                    <th className="p-2.5 font-bold">Provider</th>
                    <th className="p-2.5 font-bold">Billing Model</th>
                    <th className="p-2.5 font-bold">Estimated Cost</th>
                    <th className="p-2.5 font-bold rounded-tr-lg">Role & Technical Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-2.5 font-bold text-slate-900">Railway Cloud App & Database</td>
                    <td className="p-2.5 text-slate-700">Railway.app</td>
                    <td className="p-2.5 text-slate-600">Monthly Plan</td>
                    <td className="p-2.5 font-bold text-amber-800">$10 / month</td>
                    <td className="p-2.5 text-slate-600">Hosts Next.js/Node.js app, managed PostgreSQL DB, Redis cache, and cron workers.</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">Cloudflare R2 Media Vault</td>
                    <td className="p-2.5 text-slate-700">Cloudflare</td>
                    <td className="p-2.5 text-slate-600">Zero-Egress</td>
                    <td className="p-2.5 font-bold text-slate-800">$0 – $5 / month</td>
                    <td className="p-2.5 text-slate-600">Secure storage for damage photos, gatehouse checks, and signed PDFs (10GB free/mo).</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-2.5 font-bold text-slate-900">Automated SMS & OTP Dispatch</td>
                    <td className="p-2.5 text-slate-700">Termii</td>
                    <td className="p-2.5 text-slate-600">Pay-As-You-Go</td>
                    <td className="p-2.5 font-bold text-slate-800">Pay-As-You-Go (~₦5/SMS)</td>
                    <td className="p-2.5 text-slate-600">Job assignment alerts, security gate-pass OTPs, and booking confirmations.</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">Payment Gateway (Optional)</td>
                    <td className="p-2.5 text-slate-700">Paystack / Moniepoint</td>
                    <td className="p-2.5 text-slate-600">Per Transaction</td>
                    <td className="p-2.5 font-bold text-slate-800">1.5% (max ₦2k)</td>
                    <td className="p-2.5 text-slate-600">Online booking deposits, caution fee holding, and invoice settlements.</td>
                  </tr>
                  <tr className="bg-amber-50 font-bold">
                    <td colSpan={3} className="p-2.5 text-amber-900">Total Estimated Monthly Third-Party Cloud Infrastructure</td>
                    <td colSpan={2} className="p-2.5 text-amber-900 font-mono">~$10 / month + pay-as-you-go SMS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. COMMERCIAL INVESTMENT & OPTIONS */}
          <div className="mt-8">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-amber-700 rounded-sm"></span>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                5. Commercial Investment & Deployment Options
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Option A */}
              <div className="bg-amber-50/70 border-2 border-amber-600 rounded-xl p-5 relative">
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-600 text-white">
                  RECOMMENDED
                </span>
                <p className="text-[11px] font-bold uppercase text-amber-900 tracking-wider">OPTION A</p>
                <h4 className="text-base font-black text-slate-900">Complete SOP Enterprise Suite</h4>
                <div className="text-2xl font-black text-amber-800 font-serif my-1">
                  ₦3,200,000
                </div>
                <p className="text-xs font-semibold text-slate-600">Timeline: 7 Weeks (49 Calendar Days)</p>
                <p className="text-xs text-slate-700 mt-2">
                  Full implementation of Modules 1–5: Time-Windowed Equipment Vault, Fleet Logistics Desk, Mobile Digital Signatures, Gatehouse Tablet Security Desk, Photo Damage Vault, and COO Executive KPI Analytics.
                </p>
              </div>

              {/* Option B */}
              <div className="bg-slate-50 border border-slate-300 rounded-xl p-5">
                <p className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">OPTION B</p>
                <h4 className="text-base font-black text-slate-900">Core Operations & Inventory ERP</h4>
                <div className="text-2xl font-black text-slate-800 font-serif my-1">
                  ₦2,000,000
                </div>
                <p className="text-xs font-semibold text-slate-600">Timeline: 4 Weeks (28 Calendar Days)</p>
                <p className="text-xs text-slate-700 mt-2">
                  Deployment of core asset reservation engine, booking calendar, warehouse issue/returns, basic fleet logging, and damage incident reporting. (Excludes digital customer signatures and gatehouse tablet portal).
                </p>
              </div>
            </div>

            {/* Milestones Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-2.5 font-bold rounded-tl-lg">Milestone Stage</th>
                    <th className="p-2.5 font-bold">Split</th>
                    <th className="p-2.5 font-bold">Option A</th>
                    <th className="p-2.5 font-bold">Option B</th>
                    <th className="p-2.5 font-bold rounded-tr-lg">Deliverable / Verification Trigger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-2.5 font-bold text-slate-900">1. Mobilization Deposit</td>
                    <td className="p-2.5 font-bold text-amber-800">50%</td>
                    <td className="p-2.5 font-bold text-slate-800">₦1,600,000</td>
                    <td className="p-2.5 font-bold text-slate-800">₦1,000,000</td>
                    <td className="p-2.5 text-slate-600">Contract signing, database architecture, schema setup, UX wireframes & server provisioning.</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">2. Beta Staging Milestone</td>
                    <td className="p-2.5 font-bold text-amber-800">30%</td>
                    <td className="p-2.5 font-bold text-slate-800">₦960,000</td>
                    <td className="p-2.5 font-bold text-slate-800">₦600,000</td>
                    <td className="p-2.5 text-slate-600">Deployment to private staging server for departmental testing by operations and warehouse heads.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-2.5 font-bold text-slate-900">3. Final Handover & Training</td>
                    <td className="p-2.5 font-bold text-amber-800">20%</td>
                    <td className="p-2.5 font-bold text-slate-800">₦640,000</td>
                    <td className="p-2.5 font-bold text-slate-800">₦400,000</td>
                    <td className="p-2.5 text-slate-600">Production deployment, mobile PWA rollout, staff onboarding training, and documentation handover.</td>
                  </tr>
                  <tr className="bg-slate-900 text-white font-bold">
                    <td className="p-2.5">Total Contract Value</td>
                    <td className="p-2.5">100%</td>
                    <td className="p-2.5">₦3,200,000</td>
                    <td className="p-2.5">₦2,000,000</td>
                    <td className="p-2.5">Fixed price guarantee. Zero hidden charges.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. CONTRACTUAL GUARANTEES */}
          <div className="mt-8">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-amber-700 rounded-sm"></span>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                6. Contractual Guarantees & Support Terms
              </h3>
            </div>
            <ul className="mt-3 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              <li><strong>100% Client Intellectual Property Ownership:</strong> Upon settlement of the final contract milestone, 100% complete and unencumbered IP ownership of all source code, databases, and system credentials vests exclusively in <strong>The Party Rental Station (TPRS)</strong>.</li>
              <li><strong>12 Months Complimentary Technical Support:</strong> Includes 12 consecutive months of complimentary post-launch support covering Railway server monitoring, database health surveillance, and bug fixes for all scoped features.</li>
              <li><strong>Post-Warranty Maintenance Retainer (Year 2+):</strong> Optional ongoing annual technical support, system health surveillance, and security patching at a fixed fee of <strong>₦600,000 / year</strong>.</li>
            </ul>
          </div>

          {/* 7. BANK DETAILS */}
          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">OFFICIAL REMITTANCE DETAILS</p>
              <p className="text-xs font-bold text-slate-900">Guaranty Trust Bank (GTBank)</p>
              <p className="text-xs text-slate-600">Account Name: Sales Cowboy Marketing Solutions</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">NUBAN ACCOUNT NUMBER</p>
              <p className="text-base font-black text-amber-800 font-mono">3006086291</p>
            </div>
          </div>

          {/* 8. SIGNATURES */}
          <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
            <div>
              <p className="font-bold text-slate-900 uppercase">ISSUED FOR AND ON BEHALF OF:</p>
              <p className="text-slate-600">SALES COWBOY MARKETING SOLUTIONS</p>
              <div className="border-b border-slate-300 w-3/4 my-6"></div>
              <p className="font-bold text-slate-800">Clinton Chukwunyere</p>
              <p className="text-slate-500">Lead Developer / Technical Director</p>
              <p className="text-slate-400 mt-1">Date: November 05, 2026</p>
            </div>

            <div>
              <p className="font-bold text-slate-900 uppercase">ACCEPTED AND CONFIRMED (CLIENT):</p>
              <p className="text-slate-600">THE PARTY RENTAL STATION (TPRS)</p>
              <p className="text-[11px] text-slate-500 mt-1">Selected Option: [ ] Option A &nbsp;&nbsp;&nbsp; [ ] Option B</p>
              <div className="border-b border-slate-300 w-3/4 my-4"></div>
              <p className="text-slate-500">Authorized Representative Signature</p>
              <p className="text-slate-400 mt-1">Date: ________________________</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
