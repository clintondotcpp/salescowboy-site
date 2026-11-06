/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { Printer, Building2, Search, ArrowRight, MessageSquare, CheckCircle2, AlertTriangle } from "lucide-react";

export default function EkaboInnAuditPage() {
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
            margin: 10mm;
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
            Ek&apos;abo Inn Nigeria Limited, Oregun Ikeja : Executive Revenue Audit
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/2348104933232?text=Hello%20Sales%20Cowboy,%20we%20reviewed%20the%20Ek'abo%20Inn%20audit%20and%20want%20to%20discuss%20the%20turnaround%20plan."
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
              <p className="text-xs font-extrabold text-slate-950 mt-0.5">REF: AUD-EKB-2026-009</p>
              <p className="text-[10px] text-slate-500 mt-0.5">November 06, 2026</p>
            </div>
          </div>

          {/* Client Banner */}
          <div className="mt-7 pb-5 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block">
                PREPARED FOR MANAGEMENT &amp; OWNERSHIP
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 mt-1">
                Ek&apos;abo Inn Nigeria Limited
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                10, Hassan Street, Olusosun, Kudirat Abiola Way, Oregun, Ikeja, Lagos • Phone: +234 906 451 0867
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-[11px] font-bold px-3 py-1.5 rounded bg-slate-100 border border-slate-200 text-slate-950">
                Oregun, Ikeja Hub
              </span>
              <span className="font-mono text-[11px] font-bold px-3 py-1.5 rounded bg-slate-100 border border-slate-200 text-slate-950">
                3-Star Budget Hotel
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
                  stroke="#ef4444"
                  strokeWidth="10"
                  strokeDasharray="314"
                  strokeDashoffset="270"
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
                  14
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
              <span className="mt-3 font-mono text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded bg-red-950/60 text-red-200 border border-red-800/40">
                CRITICAL BLIND SPOT
              </span>
            </div>

            {/* 5-Axis Bars */}
            <div className="p-6 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  5-Pillar Digital Infrastructure Scorecard
                </h3>
                <span className="font-mono text-xs font-bold text-red-300">
                  Est. Uncaptured: ₦2.2M - ₦4.5M / Month
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: "1. Direct Website", pct: "2%", score: "0 / 100" },
                  { label: "2. Google Maps (GBP)", pct: "2%", score: "0 / 100" },
                  { label: "3. OTA Dependency Tax", pct: "20%", score: "20 / 100" },
                  { label: "4. Local Search (Ikeja)", pct: "15%", score: "15 / 100" },
                  { label: "5. Post-Stay Review Bot", pct: "2%", score: "0 / 100" },
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
                0 Sites
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                Owned Web Presence
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                No direct booking website; 100% dependent on aggregators
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="font-mono text-2xl font-extrabold text-slate-950 block leading-none">
                0 Reviews
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                Google Maps Pin
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                No GBP profile; totally invisible in Ikeja local search
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="font-mono text-2xl font-extrabold text-slate-950 block leading-none">
                25% Tax
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                OTA Commissions
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                Bleeding heavy margins on Hotels.ng &amp; Trip.com bookings
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="font-mono text-2xl font-extrabold text-slate-950 block leading-none">
                94% Loss
              </span>
              <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                Inquiry Drop-Off
              </span>
              <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                Lost to zero search presence and manual phone friction
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
                      <strong className="text-slate-950">Strategic Ikeja / Oregun Location:</strong> Fast connectivity to Kudirat Abiola Way, Daystar Christian Centre, Ikeja Mall, and Alausa Government Secretariat.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-950 min-w-[14px]">2.</span>
                    <div>
                      <strong className="text-slate-950">Complete 3-Star Hospitality Amenities:</strong> AC rooms, en-suite bathrooms, sofa, on-site restaurant &amp; bar, and 24h front desk.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-950 min-w-[14px]">3.</span>
                    <div>
                      <strong className="text-slate-950">Proven Aggregator Demand:</strong> Active listings on Hotels.ng and Trip.com prove travelers actively seek your rooms.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-950 min-w-[14px]">4.</span>
                    <div>
                      <strong className="text-slate-950">Registered Corporate Entity:</strong> Ek&apos;abo Inn Nigeria Limited possesses an established physical property with long-term goodwill.
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
                      <strong className="text-red-950">Zero Owned Direct Website:</strong> No website exists. Guests cannot inspect room categories, check live rates, or make direct payments.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-800 min-w-[14px]">2.</span>
                    <div>
                      <strong className="text-red-950">Invisible on Google Maps (No GBP):</strong> No Google profile exists. High-intent travelers searching for Oregun budget rooms find competitors.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-800 min-w-[14px]">3.</span>
                    <div>
                      <strong className="text-red-950">25% Commission Bleed to Middlemen:</strong> Surrendering massive revenue percentages to OTAs instead of direct bank settlements.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-800 min-w-[14px]">4.</span>
                    <div>
                      <strong className="text-red-950">Zero Review Collection Automation:</strong> Staff never trigger post-stay review requests, keeping social proof at zero.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* VISUAL 01: Live Google Search Simulation */}
          <div className="mt-10">
            <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  VISUAL DIAGNOSTIC 01
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                  Live Google Search Simulation
                </h3>
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-600 hidden sm:block">
                What Mainland Travelers Encounter Today
              </span>
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-300 rounded-lg p-4 sm:p-5">
              {/* Mock Search Input */}
              <div className="bg-white border border-slate-300 rounded-md px-4 py-2.5 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-950">
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Google Search: &ldquo;Hotels in Oregun Ikeja&rdquo; OR &ldquo;Budget Hotel near Ikeja Mall&rdquo;</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500 hidden sm:block">Ikeja, Lagos</span>
              </div>

              {/* SERP Cards */}
              <div className="space-y-2.5">
                <div className="bg-white border border-slate-200 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-slate-950">
                      1. Top Rated Oregun Commercial Hotel • Google 3-Pack Pin #1
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      4.4 ★ Rating (64 Reviews) • Direct call and website booking links
                    </p>
                  </div>
                  <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-950 whitespace-nowrap">
                    Capturing 50%+ Traffic
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-slate-950">
                      2. Kudirat Abiola Way Boutique Suites • Google 3-Pack Pin #2
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      4.2 ★ Rating (38 Reviews) • Live rates and direct photo gallery displayed
                    </p>
                  </div>
                  <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-950 whitespace-nowrap">
                    Stealing Daystar Guests
                  </span>
                </div>

                <div className="bg-red-50 border-2 border-dashed border-red-700 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-red-950">
                      3. Ek&apos;abo Inn Nigeria Limited
                    </p>
                    <p className="text-xs text-red-700 mt-0.5">
                      NO LISTING FOUND ON GOOGLE MAPS. Zero reviews, zero photos, zero map pins.
                    </p>
                    <p className="font-mono text-[11px] font-bold text-red-800 mt-1">
                      Critical Revenue Loss: High-intent guests assume the hotel does not exist or has permanently shut down
                    </p>
                  </div>
                  <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-red-800 text-white whitespace-nowrap">
                    100% Invisible
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL 02: The Ek'abo Guest Drop-off Funnel */}
          <div className="mt-10">
            <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  VISUAL DIAGNOSTIC 02
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                  Where 94 Out of 100 Ikeja Guests Drop Off
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
                  drop: "-62 lost to competing Google 3-pack pins",
                  dark: false,
                },
                {
                  count: "38",
                  unit: "OTA Visitors",
                  width: "38%",
                  label: "Stage 2: Hotels.ng / Trip.com Check",
                  drop: "-22 lost to OTA banners & lack of direct trust",
                  dark: false,
                },
                {
                  count: "16",
                  unit: "Callers",
                  width: "16%",
                  label: "Stage 3: Phone Inquiries",
                  drop: "-10 lost to manual phone verification delays",
                  dark: false,
                },
                {
                  count: "6",
                  unit: "Confirmed",
                  width: "6%",
                  label: "6%",
                  drop: "94% Potential Revenue Lost (+25% OTA fee)",
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
                        row.dark ? "bg-red-800" : "bg-slate-800"
                      }`}
                      style={{ width: row.width }}
                    >
                      {row.label}
                    </div>
                  </div>
                  <div
                    className={`font-mono text-[11px] sm:text-right ${
                      row.dark ? "font-extrabold text-red-950" : "font-bold text-slate-700"
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
                  Current Broken State vs. Proprietary Sales Cowboy System
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
                  100% Blind &amp; Dependent on OTAs
                </h4>
                <div className="space-y-2 text-xs font-semibold text-slate-800">
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>Website &amp; Checkout</span>
                    <span className="font-mono text-red-800">Non-Existent (0 Sites)</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>Google Maps Presence</span>
                    <span className="font-mono text-red-800">Non-Existent (0 Reviews)</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>OTA Commission Bleed</span>
                    <span className="font-mono text-red-800">15% - 25% Per Booking</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded px-3 py-2 flex justify-between">
                    <span>Room Availability Tracking</span>
                    <span className="font-mono text-slate-500">Manual Phone Calls Only</span>
                  </div>
                </div>
                <div className="mt-3.5 py-2.5 px-3 rounded bg-slate-200 text-slate-950 font-mono text-[11px] font-extrabold text-center">
                  RESULT: 94% Direct Revenue Lost
                </div>
              </div>

              {/* Upgraded State */}
              <div className="border-2 border-slate-950 rounded-lg p-5 bg-white">
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  SALES COWBOY UPGRADE
                </span>
                <h4 className="text-sm font-extrabold text-slate-950 mt-0.5 mb-3.5">
                  Automated Direct Booking Engine
                </h4>
                <div className="space-y-2 text-xs font-semibold text-slate-950">
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>Dedicated Owned Portal</span>
                    <span className="font-mono font-bold">ekaboinn.com.ng</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>Google 3-Pack Dominance</span>
                    <span className="font-mono font-bold">Verified Maps + 30+ Reviews</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>Direct Settlement Fee</span>
                    <span className="font-mono font-bold">0% Commission to OTAs</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-300 rounded px-3 py-2 flex justify-between">
                    <span>24/7 AI Concierge Bot</span>
                    <span className="font-mono font-bold">Replies in 3s on +234 906 451</span>
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
                  title: "Direct Booking Website + Live Calendar",
                  bullets: [
                    "Launch ekaboinn.com.ng to capture direct guest bookings at 0% OTA commission.",
                    "Live room availability calendar displays open vs booked dates in real time.",
                    "Integrated Paystack & bank transfer checkout deposits directly to your bank account.",
                  ],
                },
                {
                  num: "02",
                  title: "Google Business Profile Creation & 3-Pack Push",
                  bullets: [
                    "Register, verify, and optimize official GBP profile on Hassan Street, Oregun.",
                    "Upload geo-tagged room imagery and target Daystar, Alausa, and Ikeja Mall search terms.",
                    "Propels Ek'abo Inn into the local Google 3-Pack for high-intent budget room searches.",
                  ],
                },
                {
                  num: "03",
                  title: "24/7 WhatsApp AI Bot + Automated Review Triggers",
                  bullets: [
                    "Automatically triggers a polite WhatsApp message with a 1-click Google review link 2 hours post-checkout.",
                    "Includes a 10% repeat-stay incentive, scaling from 0 to 30+ verified Google reviews in 60 days.",
                    "Answers guest inquiries in 3 seconds 24/7 on +234 906 451 0867 and delivers booking links.",
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
                  Based on eliminating 25% OTA commissions and capturing 20 to 40 direct room nights per month in Oregun
                </p>
              </div>
              <div className="sm:text-right">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
                  +₦2.2M - ₦4.5M
                </span>
                <span className="font-mono text-[10px] uppercase text-slate-400 block mt-0.5">
                  Estimated Monthly Revenue Uplift
                </span>
              </div>
            </div>

            <div className="p-6 bg-slate-50 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Current Direct Capture (OTA Commissions &amp; Manual Phone Only)</span>
                  <span className="font-mono">~10% Digital Potential</span>
                </div>
                <div className="h-4 bg-slate-200 rounded overflow-hidden">
                  <div className="h-full bg-slate-500 w-[10%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-950 mb-1.5">
                  <span>
                    Post-Upgrade Capture (Direct Website + Google 3-Pack + WhatsApp AI Review Bot)
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
                  name: "Google Profile Setup",
                  desc: "Create & verify official GBP listing on Hassan Street, Oregun; upload geo-tagged room imagery.",
                },
                {
                  wk: "WEEK 02",
                  name: "Direct Booking Site",
                  desc: "Launch ekaboinn.com.ng with real-time room availability calendar engine and Paystack checkout.",
                },
                {
                  wk: "WEEK 03",
                  name: "WhatsApp AI Concierge",
                  desc: "Connect 24/7 AI reservation bot on +234 906 451 0867 with automated post-checkout review triggers.",
                },
                {
                  wk: "WEEK 04",
                  name: "Local 3-Pack Dominance",
                  desc: "Deploy front-desk smart review QR collateral, activate OTA-to-direct guest migration, and push into the Google 3-pack.",
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
                Ready to Stop Paying 25% OTA Taxes and Own Google Maps?
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                We handle the complete setup: Google Business Profile creation &amp; verification, direct booking website with room availability tracking, and 24/7 WhatsApp AI concierge with automated review collection.
              </p>
            </div>
            <a
              href="https://wa.me/2348104933232?text=Hello%20Sales%20Cowboy,%20we%20reviewed%20the%20Ek'abo%20Inn%20audit%20and%20want%20to%20discuss%20the%20turnaround%20plan."
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

