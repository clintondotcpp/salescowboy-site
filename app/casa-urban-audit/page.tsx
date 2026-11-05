/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { 
  Printer, 
  Building2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

export default function CasaUrbanAuditPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-900 flex flex-col antialiased">
      {/* CSS Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
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
      `}} />

      {/* Screen Toolbar */}
      <header className="bg-slate-950 border-b border-slate-800 text-white py-3.5 px-6 top-0 z-30 shadow-sm no-print flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-base font-bold tracking-wider uppercase text-white font-mono">
              SALES COWBOY
            </span>
          </Link>
          <span className="h-4 w-px bg-slate-700 hidden sm:block"></span>
          <span className="text-xs tracking-wider text-slate-400 uppercase hidden sm:block font-medium">
            Casa Urban Guest House, Odogunyan Ikorodu : Digital Revenue Audit
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="bg-white hover:bg-slate-100 text-slate-950 px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </header>

      {/* Document View */}
      <div className="flex-1 py-10 px-4 sm:px-6 flex justify-center">
        <div className="w-full max-w-[210mm] bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 overflow-hidden print-sheet p-8 sm:p-14">
          
          {/* Executive Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-slate-950 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center p-2 text-slate-900">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-950 uppercase font-sans">
                  SALES COWBOY
                </h1>
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Marketing Solutions • Hospitality Revenue Engineering
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 flex-wrap">
                  <span>36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria</span>
                  <span>•</span>
                  <span>+234 810 493 3232</span>
                  <span>•</span>
                  <span>salescowboy.com.ng</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right bg-slate-50 p-3 rounded border border-slate-200 w-full sm:w-auto">
              <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider block">
                AUDIT REFERENCE
              </span>
              <p className="text-xs font-mono font-bold text-slate-950 mt-0.5">AUD-CASA-2026-005</p>
              <p className="text-[11px] text-slate-500">November 06, 2026</p>
            </div>
          </div>

          {/* Audited Property Details */}
          <div className="mt-8 bg-slate-50 p-5 rounded-lg border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">AUDITED PROPERTY</span>
              <h2 className="text-lg font-bold text-slate-950 mt-0.5">Casa Urban Guest House & Suites</h2>
              <p className="text-xs text-slate-600 mt-1">
                12 Alhaji Amu Street, off Saka Jojo by Homat Bus Stop, Odogunyan, Ikorodu, Lagos State
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Facilities: Pool, Restaurant, Lounge, Kitchen, Snooker Arena, Standard/Deluxe/Luxury Rooms & Serviced Apartments
              </p>
            </div>
            <div className="bg-slate-950 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded self-start md:self-auto">
              Open 24 Hours
            </div>
          </div>

          {/* EXECUTIVE HEALTH SCORE HERO CARD */}
          <div className="mt-6 bg-slate-950 text-white rounded-lg p-6 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center sm:text-left bg-slate-900 p-5 rounded-md border border-slate-800 min-w-[160px] w-full sm:w-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">HEALTH SCORE</span>
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono my-1">
                24<span className="text-lg text-slate-500">/100</span>
              </div>
              <span className="text-[10px] font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 inline-block uppercase">
                CRITICAL SEARCH BLIND SPOT
              </span>
            </div>

            <div className="flex-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wide">
                High-Value Physical Amenities, Critical Digital Invisibility
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Casa Urban operates in Odogunyan: home to manufacturing giants like Lucky Fibres, African Foundries, PZ Cussons, and Wempco. However, with <strong className="text-white">NO website</strong>, only <strong className="text-white">12 Google reviews (3.8 stars)</strong>, and <strong className="text-white">15 social posts</strong>, 92 out of 100 potential guests drop off and choose rivals. Monthly revenue leakage is estimated at <strong className="text-white font-mono">₦1,200,000 to ₦2,800,000</strong>.
              </p>
            </div>
          </div>

          {/* 4 CORE METRIC CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-5">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <span className="text-3xl font-extrabold text-slate-950 font-mono block">0</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-1">Website</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Zero direct room/shortlet checkout</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <span className="text-3xl font-extrabold text-slate-950 font-mono block">12</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-1">Google Reviews</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">3.8 score creates buyer hesitation</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <span className="text-3xl font-extrabold text-slate-950 font-mono block">15</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-1">Social Posts</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Dormant page; misses pool hype</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <span className="text-3xl font-extrabold text-slate-950 font-mono block">0%</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-1">WhatsApp Bot</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Manual replies; 75%+ lead drop</span>
            </div>
          </div>

          {/* 1. VISUAL GUEST LEAK FUNNEL */}
          <div className="mt-9">
            <div className="flex justify-between items-baseline pb-2 border-b border-slate-200">
              <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-wider">
                1. Guest Drop-Off Visual Funnel
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">
                Trajectory of 100 Searchers in Odogunyan
              </span>
            </div>

            {/* Visual Funnel Bars */}
            <div className="mt-4 border border-slate-200 rounded-lg p-4 bg-white space-y-3">
              
              {/* Step 1 */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-extrabold text-slate-950 w-12 text-right">100</span>
                <div className="flex-1 bg-slate-100 rounded h-7 overflow-hidden relative flex items-center">
                  <div className="bg-slate-800 h-full w-full flex items-center px-3 text-[11px] font-bold text-white">
                    Step 1: Search Google Maps for Hotels in Odogunyan
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-700 w-48 text-right">-60 leave (3.8 stars, no site)</span>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-extrabold text-slate-950 w-12 text-right">40</span>
                <div className="flex-1 bg-slate-100 rounded h-7 overflow-hidden relative flex items-center">
                  <div className="bg-slate-800 h-full w-[40%] flex items-center px-3 text-[11px] font-bold text-white">
                    Step 2: Check Social Media
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-700 w-48 text-right">-20 leave (only 15 posts)</span>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-extrabold text-slate-950 w-12 text-right">20</span>
                <div className="flex-1 bg-slate-100 rounded h-7 overflow-hidden relative flex items-center">
                  <div className="bg-slate-800 h-full w-[20%] flex items-center px-3 text-[11px] font-bold text-white">
                    Step 3: Call / WhatsApp
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-700 w-48 text-right">-12 leave (delayed response)</span>
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-extrabold text-slate-950 w-12 text-right">8</span>
                <div className="flex-1 bg-slate-100 rounded h-7 overflow-hidden relative flex items-center">
                  <div className="bg-slate-950 h-full w-[8%] flex items-center px-2 text-[11px] font-bold text-white">
                    Check In
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-slate-950 w-48 text-right">92% Potential Revenue Lost</span>
              </div>

            </div>

            {/* Rating Comparison Bar */}
            <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="w-full sm:w-1/2">
                <div className="flex justify-between font-bold text-[11px] text-slate-700 mb-1">
                  <span>Casa Urban Rating</span>
                  <span className="font-mono">3.8 / 5.0 (12 Reviews)</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-slate-700 h-full w-[76%] rounded-full"></div>
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <div className="flex justify-between font-bold text-[11px] text-slate-950 mb-1">
                  <span>Market Benchmark</span>
                  <span className="font-mono">4.7 / 5.0 (65+ Reviews)</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-slate-950 h-full w-[94%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. THE 4-PILLAR REVENUE TURNAROUND PLAN */}
          <div className="mt-9">
            <div className="flex justify-between items-baseline pb-2 border-b border-slate-200">
              <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-wider">
                2. The 4-Pillar Turnaround Plan
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">
                Complete Commercial System Upgrade
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              
              {/* Pillar 1 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded bg-slate-950 text-white flex items-center justify-center text-[10px] font-bold font-mono">
                    1
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-950 uppercase tracking-tight">
                    Direct Booking Mobile Site
                  </h4>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>Fast mobile engine built for Nigerian 4G and 3G networks.</li>
                  <li>Galleries for Standard, Deluxe, Luxury, and Serviced Apartments.</li>
                  <li>Showcase tabs for Swimming Pool, Snooker Lounge, and Dining.</li>
                  <li>Paystack checkout with 0% OTA middleman commission.</li>
                </ul>
              </div>

              {/* Pillar 2 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded bg-slate-950 text-white flex items-center justify-center text-[10px] font-bold font-mono">
                    2
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-950 uppercase tracking-tight">
                    24/7 WhatsApp AI Concierge
                  </h4>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>Responds in under 15 seconds, 24 hours daily.</li>
                  <li>Sends room photos, pool entry fees, and menus instantly.</li>
                  <li>Generates automated Paystack payment links in the chat.</li>
                  <li>Captures late-night arrivals without front-desk delay.</li>
                </ul>
              </div>

              {/* Pillar 3 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded bg-slate-950 text-white flex items-center justify-center text-[10px] font-bold font-mono">
                    3
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-950 uppercase tracking-tight">
                    Google 3-Pack & Smart QR Stands
                  </h4>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>Target Odogunyan, Homat Bus Stop, and Sagamu Road search terms.</li>
                  <li>2 custom acrylic NFC and QR stands at Reception and Pool Bar.</li>
                  <li>Directs 5-star guests to Google; routes complaints privately.</li>
                  <li>Scale from 12 reviews to 50+ five-star ratings within 60 days.</li>
                </ul>
              </div>

              {/* Pillar 4 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded bg-slate-950 text-white flex items-center justify-center text-[10px] font-bold font-mono">
                    4
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-950 uppercase tracking-tight">
                    Poolside & Lounge Content Engine
                  </h4>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>Take over Instagram and Facebook with active short-form reels.</li>
                  <li>Showcase weekend pool parties, cocktail specials, and snooker.</li>
                  <li>Consistent publishing schedule (4-5 videos and posts weekly).</li>
                  <li>Targeted local ads for corporate staff and weekend visitors.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* 3. PROJECTED FINANCIAL RETURN CARD */}
          <div className="mt-8 border-2 border-slate-950 rounded-lg bg-slate-50 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                PROJECTED REVENUE ACCELERATION POTENTIAL
              </span>
              <div className="text-xs text-slate-700 mt-1.5 space-y-1">
                <div>• <strong className="text-slate-950">Room & Shortlet Surge:</strong> +15 to +25 nights/wk (+₦1,080,000 to ₦1,800,000/mo)</div>
                <div>• <strong className="text-slate-950">Poolside & Lounge Spend:</strong> +30% to +45% weekend volume (+₦400,000 to ₦900,000/mo)</div>
                <div>• <strong className="text-slate-950">Commission Savings:</strong> 0% OTA fees via direct booking (+₦150,000 to ₦300,000/mo)</div>
              </div>
            </div>

            <div className="text-left md:text-right border-t md:border-t-0 md:border-l border-slate-300 pt-3 md:pt-0 md:pl-5 min-w-[170px]">
              <span className="text-2xl font-mono font-extrabold text-slate-950 block">
                +₦1.2M - ₦2.8M
              </span>
              <span className="text-[10px] font-bold text-slate-600 uppercase block mt-0.5">
                Estimated Monthly Gain
              </span>
            </div>
          </div>

          {/* 4. 4-WEEK ROLLOUT SCHEDULE */}
          <div className="mt-9">
            <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-wider pb-2 border-b border-slate-200">
              3. 4-Week Rapid Rollout Timeline
            </h3>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                    <th className="p-2.5 font-bold w-24">Week</th>
                    <th className="p-2.5 font-bold w-48">Phase Focus</th>
                    <th className="p-2.5 font-bold">Core Deliverables</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-slate-950">Week 1</td>
                    <td className="p-2.5 font-bold text-slate-900">Mobile Booking Engine</td>
                    <td className="p-2.5 text-slate-700">Build mobile booking site, upload room photos, integrate Paystack, and optimize Google profile.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-slate-950">Week 2</td>
                    <td className="p-2.5 font-bold text-slate-900">WhatsApp AI Concierge</td>
                    <td className="p-2.5 text-slate-700">Connect WhatsApp Business API, ingest room and menu catalogs, and test automated chat payments.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-slate-950">Week 3</td>
                    <td className="p-2.5 font-bold text-slate-900">Smart Review Stands</td>
                    <td className="p-2.5 text-slate-700">Deploy 2 custom acrylic NFC and QR stands at Reception and Pool Bar, launch staff review incentives.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-slate-950">Week 4</td>
                    <td className="p-2.5 font-bold text-slate-900">Content Shoot & Ads</td>
                    <td className="p-2.5 text-slate-700">Shoot on-site video reels (pool, snooker, luxury rooms), relaunch social media, and start local ads.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SIGN-OFF & AUTHORIZATION */}
          <div className="mt-10 pt-6 border-t-2 border-slate-950 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="text-xs font-extrabold text-slate-950 uppercase">PREPARED BY:</p>
              <p className="text-sm font-bold text-slate-950 mt-0.5">Sales Cowboy Marketing Solutions</p>
              <p className="text-xs text-slate-600">Hospitality Revenue Engineering & Growth Division</p>
              <p className="text-xs text-slate-500 mt-1">36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria</p>
              <p className="text-xs text-slate-500">Direct Line: +234 810 493 3232 • Email: hello@salescowboy.com.ng</p>
            </div>

            <div className="border border-slate-300 p-4 rounded bg-slate-50 min-w-[200px] text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
                AUTHENTICATED AUDIT
              </span>
              <div className="h-0.5 bg-slate-400 w-20 mx-auto mb-2"></div>
              <p className="text-xs font-bold text-slate-950">Hospitality Division</p>
              <p className="text-[10px] text-slate-500">Sales Cowboy Nigeria</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
