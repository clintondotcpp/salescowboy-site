/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { Printer, Building2, Search, ArrowRight, MessageSquare, CheckCircle2, AlertTriangle } from "lucide-react";

export default function GloverApartmentsAuditPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-950 flex flex-col antialiased">
      {/* CSS Print Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body, html {
            background-color: white !important;
            color: #090d16 !important;
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
      `,
        }}
      />

      {/* Floating Screen Toolbar */}
      <header className="bg-slate-950 border-b border-slate-800 text-white py-3.5 px-6 top-0 z-30 shadow-sm no-print flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-sm font-extrabold tracking-widest uppercase text-white font-mono">
              SALES COWBOY
            </span>
          </Link>
          <span className="h-4 w-px bg-slate-700 hidden sm:block"></span>
          <span className="text-xs text-slate-400 hidden sm:block font-medium">
            Glover Apartments, Ogudu Lagos Mainland : Executive Revenue Audit
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/2348104933232?text=Hello%20Sales%20Cowboy,%20we%20reviewed%20the%20Glover%20Apartments%20audit%20and%20want%20to%20discuss%20the%20turnaround%20plan."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Discuss on WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <button
            onClick={handlePrint}
            className="bg-white hover:bg-slate-100 text-slate-950 px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </header>

      {/* Main Executive Dossier Sheet */}
      <div className="flex-1 py-10 px-4 sm:px-6 flex justify-center">
        <div className="w-full max-w-[900px] bg-white text-slate-950 rounded-lg shadow-2xl border border-slate-200 overflow-hidden print-sheet p-8 sm:p-14">
          
          {/* Letterhead Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-[3px] border-slate-950 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center p-2 text-slate-950">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-950 uppercase">
                  SALES COWBOY
                </h1>
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
                  Marketing Solutions • Hospitality Revenue Engineering
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria • +234 810 493 3232 • salescowboy.com.ng
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right bg-slate-50 px-4 py-2.5 rounded-md border border-slate-200 w-full sm:w-auto font-mono">
              <span className="text-[9px] font-bold uppercase text-slate-500 tracking-wider block">
                EXECUTIVE DIAGNOSTIC
              </span>
              <p className="text-xs font-extrabold text-slate-950 mt-0.5">REF: AUD-GLV-2026-008</p>
              <p className="text-[10px] text-slate-500 mt-0.5">November 06, 2026</p>
            </div>
          </div>

          {/* Client Banner */}
          <div className="mt-7 pb-5 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block">
                PREPARED FOR MANAGEMENT & OWNERSHIP
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 mt-1">
                Glover Apartments
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Ogudu, Lagos Mainland, Nigeria • Subject: Booking Flow &amp; Local Dominance Engine
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-[11px] font-bold px-3 py-1.5 rounded bg-slate-100 border border-slate-200 text-slate-950">
                Ogudu, Lagos Mainland
              </span>
              <span className="font-mono text-[11px] font-bold px-3 py-1.5 rounded bg-slate-100 border border-slate-200 text-slate-950">
                Serviced Shortlet Apartments
              </span>
            </div>
          </div>

          {/* 1. Score Gauge + 5-Axis Diagnostic Matrix */}
          <div className="mt-7 bg-slate-950 text-white rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-[240px_1fr] border border-slate-800">
            
            {/* Radial SVG Gauge */}
            <div className="p-6 bg-[#05080f] border-b md:border-b-0 md:border-r border-slate-800 flex flex-col items-center justify-center text-center">
              <svg className="w-28 h-28" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="10"
                  strokeDasharray="314"
                  strokeDashoffset="226"
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <text
                  x="60"
                  y="58"
                  textAnchor="middle"
                  fill="#ffffff"
                  className="font-mono"
                  fontSize="30"
                  fontWeight="800"
                >
                  28
                </text>
                <text
                  x="60"
                  y="76"
                  textAnchor="middle"
                  fill="#94a3b8"
                  className="font-mono"
                  fontSize="11"
                  fontWeight="600"
                >
                  / 100 SCORE
                </text>
              </svg>
              <span className="mt-3 font-mono text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded bg-white/10 text-white">
                SEVERE REVENUE LEAKAGE
              </span>
            </div>

            {/* 5-Axis Bars */}
            <div className="p-6 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  5-Pillar Digital Infrastructure Scorecard
                </h3>
                <span className="font-mono text-xs font-bold text-slate-300">
                  Est. Uncaptured: ₦1.8M - ₦3.6M / Month
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: "1. Direct Website", pct: "25%", score: "25 / 100", note: "Exhausting multi-step form" },
                  { label: "2. Live Room Calendar", pct: "2%", score: "0 / 100", note: "No availability tracker" },
                  { label: "3. Google Profile (GBP)", pct: "15%", score: "15 / 100", note: "1 single review trap" },
                  { label: "4. Local SEO (Ogudu)", pct: "20%", score: "20 / 100", note: "Cannibalized by Ikoyi" },
                  { label: "5. Post-Stay Review Bot", pct: "2%", score: "0 / 100", note: "Zero automated triggers" },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-[165px_1fr_65px] items-center gap-3">
                    <span className="text-xs font-semibold text-slate-300">{item.label}</span>
                    <div className="h-2.5 bg-slate-800 rounded overflow-hidden">
                      <div className="h-full bg-white rounded" style={{ width: item.pct }} />
                    </div>
                    <span className="font-mono text-xs font-bold text-white text-right">
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Big KPI Callout Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-5">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="font-mono text-2xl font-extrabold text-slate-950 block leading-none">
                Multi-Step
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                Booking Friction
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                Too many form screens cause 70%+ visitor abandonment
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="font-mono text-2xl font-extrabold text-slate-950 block leading-none">
                0 Days
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                Live Availability
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                No calendar tracker forces manual phone verification
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="font-mono text-2xl font-extrabold text-slate-950 block leading-none">
                1 Review
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                Maps Trust Trap
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                1 solo review looks fake and blocks Google 3-Pack rank
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="font-mono text-2xl font-extrabold text-slate-950 block leading-none">
                Ikoyi Bleed
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                Search Hijacking
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                Glover Rd Ikoyi captures high-intent Ogudu searchers
              </span>
            </div>
          </div>

          {/* Genuine Strengths vs What You Are Doing Wrong */}
          <div className="mt-10">
            <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  OPERATIONAL DIAGNOSTIC
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                  Genuine Strengths vs. What You Are Doing Wrong
                </h3>
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-600 hidden sm:block">
                Transparent Foundation Assessment
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Genuine Strengths */}
              <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                    YOUR GENUINE STRENGTHS
                  </span>
                </div>
                <ul className="space-y-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-950 min-w-[14px]">1.</span>
                    <div>
                      <strong className="text-slate-950">High-Quality Professional Imagery:</strong> Clean, high-resolution interior and exterior photography already shot and ready to deploy.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-950 min-w-[14px]">2.</span>
                    <div>
                      <strong className="text-slate-950">Strategic Ogudu Location:</strong> Fast mainland connectivity to Ikeja, Maryland, and Third Mainland Bridge for island commuters.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-950 min-w-[14px]">3.</span>
                    <div>
                      <strong className="text-slate-950">Multi-Channel OTA Footprint:</strong> Indexed on Agoda, Trip.com, and Skyscanner, proving underlying market demand.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-950 min-w-[14px]">4.</span>
                    <div>
                      <strong className="text-slate-950">Existing Domain &amp; Brand Asset:</strong> Owned web URL gives you a solid platform for a high-converting direct booking engine.
                    </div>
                  </li>
                </ul>
              </div>

              {/* What You Are Doing Wrong */}
              <div className="border border-red-200 rounded-lg p-5 bg-red-50/60">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-red-700" />
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-red-800">
                    WHAT YOU ARE DOING WRONG
                  </span>
                </div>
                <ul className="space-y-3 text-xs text-red-950">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-800 min-w-[14px]">1.</span>
                    <div>
                      <strong className="text-red-950">Exhausting Multi-Step Form:</strong> The website booking section has excessive input fields and screens that tire the visitor, triggering massive checkout abandonment.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-800 min-w-[14px]">2.</span>
                    <div>
                      <strong className="text-red-950">Blind Room Availability:</strong> Visitors cannot see real-time open vs booked dates, forcing them to call or message staff manually.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-800 min-w-[14px]">3.</span>
                    <div>
                      <strong className="text-red-950">Single-Review Ghost Trap:</strong> 1 solitary review on Google Maps triggers traveler skepticism and keeps you buried beneath mainland competitors.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-800 min-w-[14px]">4.</span>
                    <div>
                      <strong className="text-red-950">Zero Review Collection Automation:</strong> Staff never trigger post-stay review requests, leaving dozens of happy guest experiences unrecorded.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* VISUAL 01: Live Google Search Hijacking Simulation */}
          <div className="mt-10">
            <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  VISUAL DIAGNOSTIC 01
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                  Live Google Search Hijacking Simulation
                </h3>
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-600 hidden sm:block">
                What Mainland Travelers Encounter
              </span>
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-300 rounded-lg p-4 sm:p-5">
              {/* Mock Search Input */}
              <div className="bg-white border border-slate-300 rounded-md px-4 py-2.5 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-950">
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Google Search: &ldquo;Glover Apartments Ogudu Lagos&rdquo;</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500 hidden sm:block">Lagos, Nigeria</span>
              </div>

              {/* SERP Cards */}
              <div className="space-y-2.5">
                <div className="bg-white border border-slate-200 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-slate-950">
                      1. Glover Road Luxury Apartments (Ikoyi, Lagos)
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      4.8 ★ Rating • N350k/night • High Search Authority Dominating Generic &ldquo;Glover&rdquo; Queries
                    </p>
                  </div>
                  <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-950 whitespace-nowrap">
                    Cannibalizing Your Traffic
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-slate-950">
                      2. Top Ogudu / Maryland Serviced Apartments (Local 3-Pack Listings)
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      4.6 ★ Verified Rating (48 Reviews) • Direct Links • High Map Visibility
                    </p>
                  </div>
                  <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-950 whitespace-nowrap">
                    Stealing Mainland Guests
                  </span>
                </div>

                <div className="bg-slate-100 border-2 border-slate-950 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-slate-950">
                      3. Glover Apartments (Your Listing - Ogudu)
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      1 Review Only • No Local Mainland Schema • Zero Review Velocity
                    </p>
                    <p className="font-mono text-[11px] font-bold text-red-800 mt-1">
                      Critical Weakness: Corporate travelers skip past 1-review listings to book verified alternatives
                    </p>
                  </div>
                  <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-slate-950 text-white whitespace-nowrap">
                    Buried Under Rivals
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL 02: Where 92 Out of 100 Mainland Guests Drop Off */}
          <div className="mt-10">
            <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  VISUAL DIAGNOSTIC 02
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                  Where 92 Out of 100 Mainland Guests Drop Off
                </h3>
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-600 hidden sm:block">
                Trajectory of 100 High-Intent Searchers
              </span>
            </div>

            <div className="mt-4 border border-slate-200 rounded-lg p-5 bg-white space-y-3.5">
              {[
                {
                  count: "100",
                  unit: "Searchers",
                  width: "100%",
                  label: "Stage 1: Search Google & Maps",
                  drop: "-52 lost to Ikoyi listings & rival 3-packs",
                  dark: false,
                },
                {
                  count: "48",
                  unit: "Visitors",
                  width: "48%",
                  label: "Stage 2: Glover Website Booking Flow",
                  drop: "-26 lost to exhausting form & no live calendar",
                  dark: false,
                },
                {
                  count: "22",
                  unit: "Inquiries",
                  width: "22%",
                  label: "Stage 3: Phone Calls / Manual WhatsApp",
                  drop: "-14 lost to delayed manual staff replies",
                  dark: false,
                },
                {
                  count: "8",
                  unit: "Confirmed",
                  width: "8%",
                  label: "8%",
                  drop: "92% Potential Revenue Lost",
                  dark: true,
                },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-[85px_1fr_210px] items-center gap-3"
                >
                  <div className="font-mono text-sm font-extrabold text-slate-950 leading-tight">
                    {row.count}
                    <span className="block text-[10px] font-semibold text-slate-500">
                      {row.unit}
                    </span>
                  </div>
                  <div className="h-9 bg-slate-100 rounded overflow-hidden flex items-center">
                    <div
                      className={`h-full flex items-center px-3 text-xs font-bold text-white whitespace-nowrap ${
                        row.dark ? "bg-slate-950" : "bg-slate-800"
                      }`}
                      style={{ width: row.width }}
                    >
                      {row.label}
                    </div>
                  </div>
                  <div
                    className={`font-mono text-[11px] sm:text-right ${
                      row.dark ? "font-extrabold text-slate-950" : "font-bold text-slate-700"
                    }`}
                  >
                    {row.drop}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VISUAL 03: Current Broken Flow vs Proprietary Sales Cowboy System */}
          <div className="mt-10">
            <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  VISUAL DIAGNOSTIC 03
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                  Current Broken Flow vs. Proprietary Sales Cowboy System
                </h3>
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-600 hidden sm:block">
                Side-by-Side Diagnostic
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current State */}
              <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  CURRENT STATE
                </span>
                <h4 className="text-sm font-extrabold text-slate-950 mt-0.5 mb-3.5">
                  Exhausting Steps &amp; 1-Review Ghost Listing
                </h4>
                <div className="space-y-2 text-xs font-semibold text-slate-800">
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>Website Booking Flow</span>
                    <span className="font-mono text-red-800">Multi-Step Form (Tiring)</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>Room Availability Tracking</span>
                    <span className="font-mono text-red-800">Blind / No Live Tracker</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>Google Maps Authority</span>
                    <span className="font-mono text-slate-500">1 Solitary Review</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>Post-Stay Review Follow-Up</span>
                    <span className="font-mono text-slate-500">Zero Automated Reminders</span>
                  </div>
                </div>
                <div className="mt-3.5 py-2.5 px-3 rounded bg-slate-200 text-slate-950 font-mono text-[11px] font-extrabold text-center">
                  RESULT: 92% Guest Abandonment
                </div>
              </div>

              {/* Upgraded State */}
              <div className="border-2 border-slate-950 rounded-lg p-5 bg-white">
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  SALES COWBOY UPGRADE
                </span>
                <h4 className="text-sm font-extrabold text-slate-950 mt-0.5 mb-3.5">
                  Streamlined Direct Engine &amp; AI Bot
                </h4>
                <div className="space-y-2 text-xs font-semibold text-slate-950">
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>Streamlined 2-Step Checkout</span>
                    <span className="font-mono font-bold">Fast Mobile Booking</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>Live Availability Calendar</span>
                    <span className="font-mono font-bold">Dynamic Sync per Unit</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>24/7 WhatsApp AI Concierge</span>
                    <span className="font-mono font-bold">Automated Review Triggers</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>Google 3-Pack Management</span>
                    <span className="font-mono font-bold">Local Ogudu Dominance</span>
                  </div>
                </div>
                <div className="mt-3.5 py-2.5 px-3 rounded bg-slate-950 text-white font-mono text-[11px] font-extrabold text-center">
                  RESULT: 3x Direct Occupancy at 0% Commission
                </div>
              </div>
            </div>
          </div>

          {/* Proprietary 3-Pillar Turnaround Architecture */}
          <div className="mt-10">
            <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  THE PROPRIETARY SOLUTION
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                  3-Pillar Proprietary Revenue Architecture
                </h3>
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-600 hidden sm:block">
                Exclusive Sales Cowboy Systems
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  num: "01",
                  title: "Streamlined Booking + Live Availability",
                  bullets: [
                    "Replaces the exhausting multi-page forms with a clean 2-step mobile checkout.",
                    "Live room availability calendar displays open vs booked dates in real time.",
                    "Integrated Paystack & transfer checkout with 0% commission straight to your account.",
                  ],
                },
                {
                  num: "02",
                  title: "24/7 AI Chatbot + Automated Review Reminders",
                  bullets: [
                    "Automatically triggers a polite WhatsApp message with a 1-click Google review link 2 hours post-checkout.",
                    "Includes a 10% repeat-stay incentive, generating 15 to 30 verified 5-star reviews every month.",
                    "Answers guest questions in 3 seconds 24/7, verifies unit dates, and delivers booking links.",
                  ],
                },
                {
                  num: "03",
                  title: "Google Business Profile Management",
                  bullets: [
                    "Weekly Google Maps management: geo-tagged photography, offers, and mainland citations.",
                    "Mainland keyword isolation terminates search cannibalisation by Glover Road, Ikoyi.",
                    "Propels Glover Apartments into the local Google 3-Pack for Ogudu and Maryland shortlets.",
                  ],
                },
              ].map((p, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-5 bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="w-6 h-6 rounded bg-slate-950 text-white font-mono text-xs font-extrabold flex items-center justify-center">
                        {p.num}
                      </span>
                      <h4 className="text-xs font-extrabold uppercase text-slate-950">
                        {p.title}
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 list-disc pl-4 leading-relaxed">
                      {p.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projected Revenue Recovery Box */}
          <div className="mt-8 border-2 border-slate-950 rounded-xl overflow-hidden">
            <div className="bg-slate-950 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className="text-base font-black uppercase">
                  Projected Monthly Revenue Recovery
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Based on recapturing 15 to 30 uncaptured room nights per month in Ogudu
                </p>
              </div>
              <div className="sm:text-right">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
                  +₦1.8M - ₦3.6M
                </span>
                <span className="font-mono text-[10px] uppercase text-slate-400 block mt-0.5">
                  Estimated Monthly Revenue Uplift
                </span>
              </div>
            </div>

            <div className="p-6 bg-slate-50 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Current Direct Capture (Exhausting Multi-Step Flow)</span>
                  <span className="font-mono">~25% Digital Potential</span>
                </div>
                <div className="h-4 bg-slate-200 rounded overflow-hidden">
                  <div className="h-full bg-slate-500 w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-950 mb-1.5">
                  <span>
                    Post-Upgrade Capture (Streamlined Site + Live Availability + WhatsApp Review Bot + Google 3-Pack)
                  </span>
                  <span className="font-mono">85%+ Direct Potential</span>
                </div>
                <div className="h-4 bg-slate-200 rounded overflow-hidden">
                  <div className="h-full bg-slate-950 w-[85%]" />
                </div>
              </div>
            </div>
          </div>

          {/* 4-Week Execution Roadmap */}
          <div className="mt-10">
            <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  IMPLEMENTATION
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                  4-Week Turnkey Execution Roadmap
                </h3>
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-600 hidden sm:block">
                Rapid Deployment
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  wk: "WEEK 01",
                  name: "Streamlined Web Engine",
                  desc: "Deploy 2-step mobile checkout with real-time room availability calendar tracking and Paystack integration.",
                },
                {
                  wk: "WEEK 02",
                  name: "WhatsApp AI Chatbot",
                  desc: "Connect 24/7 AI concierge with automated post-stay Google review triggers and instant inquiry responses.",
                },
                {
                  wk: "WEEK 03",
                  name: "Google Profile & SEO",
                  desc: "Geo-tag photography, build Ogudu citations, and isolate mainland keywords to permanently halt Ikoyi bleed.",
                },
                {
                  wk: "WEEK 04",
                  name: "Reviews & Direct Push",
                  desc: "Activate automated post-stay guest review cycle, deploy front-desk QR collateral, and push into the Google 3-pack.",
                },
              ].map((s, i) => (
                <div key={i} className="border border-slate-200 bg-slate-50 rounded-md p-3.5">
                  <span className="font-mono text-[10px] font-extrabold text-slate-500 block">
                    {s.wk}
                  </span>
                  <h5 className="text-xs font-extrabold text-slate-950 mt-1 mb-1.5">
                    {s.name}
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct CTA Block */}
          <div className="mt-10 p-6 rounded-xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 no-print">
            <div>
              <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block">
                NEXT OPERATIONAL STEP
              </span>
              <h4 className="text-lg font-black uppercase tracking-tight mt-1">
                Ready to Deploy the Glover Revenue Engine?
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                We handle the complete build: streamlined website with room availability tracking, 24/7 WhatsApp AI chatbot with automated review reminders, and Google Maps management.
              </p>
            </div>
            <a
              href="https://wa.me/2348104933232?text=Hello%20Sales%20Cowboy,%20we%20reviewed%20the%20Glover%20Apartments%20audit%20and%20want%20to%20discuss%20the%20turnaround%20plan."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-100 text-slate-950 px-5 py-3 rounded-lg text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all shadow-md"
            >
              <span>Schedule Implementation Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Footer Sign-Off */}
          <div className="mt-10 pt-5 border-t-2 border-slate-950 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[11px] text-slate-600">
            <div>
              <strong className="text-slate-950">SALES COWBOY MARKETING SOLUTIONS</strong> • Hospitality Revenue Engineering Division
              <br />
              36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria • +234 810 493 3232 • hello@salescowboy.com.ng
            </div>
            <div className="sm:text-right font-mono">
              <strong className="text-slate-950">STATUS:</strong> EXECUTIVE BRIEF
              <br />
              salescowboy.com.ng
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

