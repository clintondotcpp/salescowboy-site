/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { Printer, Building2, Search } from "lucide-react";

export default function LaMaisonAuditPage() {
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
            La Maison Apartments, Maitama Abuja : Executive Digital Revenue Audit
          </span>
        </div>

        <button
          onClick={handlePrint}
          className="bg-white hover:bg-slate-100 text-slate-950 px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save as PDF</span>
        </button>
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
              <p className="text-xs font-extrabold text-slate-950 mt-0.5">REF: AUD-LMA-2026-006</p>
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
                La Maison Apartments
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Tennessee Crescent, Maitama, Abuja • Direct Line: 0814 199 6466
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-[11px] font-bold px-3 py-1.5 rounded bg-slate-100 border border-slate-200 text-slate-950">
                Maitama Luxury Tier
              </span>
              <span className="font-mono text-[11px] font-bold px-3 py-1.5 rounded bg-slate-100 border border-slate-200 text-slate-950">
                Short-Let &amp; Executive Suites
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
                  strokeDashoffset="257"
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
                  18
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
                CRITICAL BLIND SPOT
              </span>
            </div>

            {/* 5-Axis Bars */}
            <div className="p-6 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  5-Pillar Digital Infrastructure Scorecard
                </h3>
                <span className="font-mono text-xs font-bold text-slate-300">
                  Est. Monthly Leakage: ₦2.4M - ₦4.8M
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: "1. Direct Website", pct: "2%", score: "0 / 100" },
                  { label: "2. Google Maps (GBP)", pct: "10%", score: "10 / 100" },
                  { label: "3. OTA Syndication", pct: "15%", score: "15 / 100" },
                  { label: "4. Brand Protection", pct: "20%", score: "20 / 100" },
                  { label: "5. Booking Automation", pct: "25%", score: "25 / 100" },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-[150px_1fr_65px] items-center gap-3">
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
              <span className="font-mono text-3xl font-extrabold text-slate-950 block leading-none">
                0
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                Owned Website
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                No domain or automated direct booking checkout
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="font-mono text-3xl font-extrabold text-slate-950 block leading-none">
                0
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                Google Reviews
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                Ghost Maps listing; invisible in Google 3-Pack
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="font-mono text-3xl font-extrabold text-slate-950 block leading-none">
                2
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                Name Hijackers
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                EEVA Maison &amp; de Jay capture your brand searches
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="font-mono text-3xl font-extrabold text-slate-950 block leading-none">
                92%
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                Inquiry Drop-Off
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                Lost to dead OTA links and slow manual IG DMs
              </span>
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
                What diplomats &amp; executives see today
              </span>
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-300 rounded-lg p-4 sm:p-5">
              {/* Mock Search Input */}
              <div className="bg-white border border-slate-300 rounded-md px-4 py-2.5 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-950">
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Google Search: &ldquo;La Maison Apartments Maitama Abuja&rdquo;</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500 hidden sm:block">Abuja, FCT</span>
              </div>

              {/* SERP Cards */}
              <div className="space-y-2.5">
                <div className="bg-white border border-slate-200 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-slate-950">
                      1. EEVA Maison Apartments (28 Tennessee Crescent, Maitama)
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      4.7 ★ Verified Rating • Active Photo Gallery • Instant Online Booking
                    </p>
                  </div>
                  <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-950 whitespace-nowrap">
                    Stealing Your Traffic
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-slate-950">
                      2. La Maison de Jay (Katampe, Abuja)
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      4.5 ★ Verified Rating • Direct Booking Links • Active Reviews
                    </p>
                  </div>
                  <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-950 whitespace-nowrap">
                    Hijacking Your Name
                  </span>
                </div>

                <div className="bg-slate-100 border-2 border-slate-950 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-slate-950">
                      3. La Maison Apartments (Your Property - Maitama)
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      0.0 ★ (0 Google Reviews) • No Website Link • Unverified Profile
                    </p>
                    <p className="font-mono text-[11px] font-bold text-red-800 mt-1">
                      OTA Warning on Getaroom / Hotel.com.au: &ldquo;Property may have changed names or is no longer bookable&rdquo;
                    </p>
                  </div>
                  <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-slate-950 text-white whitespace-nowrap">
                    Looks Shut Down
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL 02: Where 92 Out of 100 Maitama Guests Drop Off */}
          <div className="mt-10">
            <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  VISUAL DIAGNOSTIC 02
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                  Where 92 Out of 100 Maitama Guests Drop Off
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
                  label: 'Stage 1: Search Google for "La Maison" or "Shortlet Maitama"',
                  drop: "-55 lost to EEVA Maison & rivals",
                  dark: false,
                },
                {
                  count: "45",
                  unit: "Remaining",
                  width: "45%",
                  label: "Stage 2: Check OTA Aggregators",
                  drop: '-20 lost ("No longer bookable" tag)',
                  dark: false,
                },
                {
                  count: "25",
                  unit: "Remaining",
                  width: "25%",
                  label: "Stage 3: Instagram DM / WhatsApp",
                  drop: "-17 lost (Manual reply friction)",
                  dark: false,
                },
                {
                  count: "8",
                  unit: "Check-Ins",
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

          {/* VISUAL 03: Current Broken Patch vs Automated Direct System */}
          <div className="mt-10">
            <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  VISUAL DIAGNOSTIC 03
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                  Current Broken Patch vs. Automated Direct System
                </h3>
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-600 hidden sm:block">
                Structural Comparison
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current State */}
              <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  CURRENT STATE
                </span>
                <h4 className="text-sm font-extrabold text-slate-950 mt-0.5 mb-3.5">
                  Manual Instagram &amp; Ghost Profile
                </h4>
                <div className="space-y-2 text-xs font-semibold text-slate-800">
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>Google Maps Profile</span>
                    <span className="font-mono text-slate-500">0 Reviews / No Site</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>Third-Party OTAs</span>
                    <span className="font-mono text-red-800">&ldquo;No Longer Bookable&rdquo;</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>Instagram Bio Link</span>
                    <span className="font-mono text-slate-500">Manual Phone / DM</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>Staff Availability Check</span>
                    <span className="font-mono text-slate-500">Slow Manual Replies</span>
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
                  Automated Direct Booking Ecosystem
                </h4>
                <div className="space-y-2 text-xs font-semibold text-slate-950">
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>Google 3-Pack Dominance</span>
                    <span className="font-mono font-bold">45+ 5-Star Reviews</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>Dedicated Luxury Website</span>
                    <span className="font-mono font-bold">Live Calendar + Paystack</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>24/7 WhatsApp &amp; IG AI Bot</span>
                    <span className="font-mono font-bold">Replies in 10 Seconds</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>Synced Tier-1 OTAs</span>
                    <span className="font-mono font-bold">Airbnb &amp; Booking.com Live</span>
                  </div>
                </div>
                <div className="mt-3.5 py-2.5 px-3 rounded bg-slate-950 text-white font-mono text-[11px] font-extrabold text-center">
                  RESULT: 3x Direct Occupancy at 0% Commission
                </div>
              </div>
            </div>
          </div>

          {/* 4-Pillar Turnaround Plan */}
          <div className="mt-10">
            <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  THE SOLUTION
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                  4-Pillar Commercial Turnaround Architecture
                </h3>
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-600 hidden sm:block">
                Turnkey Implementation
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  num: "01",
                  title: "Direct Luxury Booking Website",
                  bullets: [
                    "Launch dedicated domain (lamaisonapartments.com) tailored for diplomats and executives.",
                    "Interactive apartment galleries, amenities showcase, and live availability calendar.",
                    "Integrated Paystack checkout for instant card and bank transfer bookings at 0% commission.",
                  ],
                },
                {
                  num: "02",
                  title: "Google 3-Pack & Brand Defense",
                  bullets: [
                    'Verify and optimize your Google Business Profile to rank #1 for "shortlet Maitama Abuja".',
                    "Eliminate traffic hijacking by EEVA Maison and La Maison de Jay.",
                    "Deploy in-suite Smart Review NFC/QR stands to scale from 0 to 45+ five-star reviews in 60 days.",
                  ],
                },
                {
                  num: "03",
                  title: "24/7 WhatsApp & IG AI Concierge",
                  bullets: [
                    "Connect an autonomous AI Reservation Desk to 0814 199 6466 and your Instagram DMs.",
                    "Replies in under 10 seconds 24/7: sends video tours, checks dates, and issues payment links.",
                    "Eliminates late-night inquiry drop-offs and manual front-desk bottlenecks.",
                  ],
                },
                {
                  num: "04",
                  title: "OTA Clean-Up & Channel Sync",
                  bullets: [
                    'Remove dead aggregator warnings ("no longer bookable") on Hotel.com.au and Getaroom.',
                    "Build verified, high-ranking profiles on Airbnb and Booking.com.",
                    "Sync all calendars centrally so direct web bookings and OTAs never double-book.",
                  ],
                },
              ].map((p, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-5 bg-white">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-6 h-6 rounded bg-slate-950 text-white font-mono text-xs font-extrabold flex items-center justify-center">
                      {p.num}
                    </span>
                    <h4 className="text-xs font-extrabold uppercase text-slate-950">
                      {p.title}
                    </h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4 leading-relaxed">
                    {p.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
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
                  Based on recovering just 20 to 35 lost executive apartment nights per month in Maitama
                </p>
              </div>
              <div className="sm:text-right">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
                  +₦2.4M - ₦4.8M
                </span>
                <span className="font-mono text-[10px] uppercase text-slate-400 block mt-0.5">
                  Estimated Monthly Revenue Uplift
                </span>
              </div>
            </div>

            <div className="p-6 bg-slate-50 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Current Digital Capture (Instagram DM Only)</span>
                  <span className="font-mono">~25% Digital Potential</span>
                </div>
                <div className="h-4 bg-slate-200 rounded overflow-hidden">
                  <div className="h-full bg-slate-500 w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-950 mb-1.5">
                  <span>
                    Post-Upgrade Capture (Direct Website + Google 3-Pack + 24/7 AI Bot + Synced OTAs)
                  </span>
                  <span className="font-mono">85%+ Digital Potential</span>
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
                  name: "Brand Defense & GBP",
                  desc: "Verify Google listing, inject Maitama SEO schema, upload suite photos, reclaim brand traffic.",
                },
                {
                  wk: "WEEK 02",
                  name: "Direct Booking Site",
                  desc: "Launch luxury web portal with live inventory calendar and Paystack checkout integration.",
                },
                {
                  wk: "WEEK 03",
                  name: "WhatsApp & IG AI Bot",
                  desc: "Deploy 24/7 automated reservation concierge on 0814 199 6466 and Instagram DMs.",
                },
                {
                  wk: "WEEK 04",
                  name: "OTA Sync & QR Stands",
                  desc: "Purge broken OTA warnings, sync Airbnb/Booking.com, install in-suite review QR stands.",
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

