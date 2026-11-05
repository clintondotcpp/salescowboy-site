/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { 
  Printer, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Search, 
  MessageSquare, 
  Star, 
  Compass, 
  ShieldAlert,
  Building2,
  ArrowRight
} from "lucide-react";

export default function SymHotelsAuditPage() {
  const handlePrint = () => {
    window.print();
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
            Sym Hotels & Lodge — Revenue & Search Audit
          </span>
        </div>

        <div className="flex items-center gap-3">
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
                  Marketing Solutions • Hospitality Revenue Engineering
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-700" /> Ajah, Lagos</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-amber-700" /> +234 810 493 3232</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-amber-700" /> salescowboy.com.ng</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right bg-slate-50 p-3 rounded-lg border border-slate-200 w-full sm:w-auto">
              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-red-100 text-red-800 tracking-wider">
                CONFIDENTIAL AUDIT
              </span>
              <p className="text-xs font-mono font-bold text-slate-800 mt-1">REF: AUD-SYM-2026-003</p>
              <p className="text-[11px] text-slate-500">Date: November 05, 2026</p>
            </div>
          </div>

          {/* Audit Subject & Client Details */}
          <div className="mt-8 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">PREPARED FOR</p>
              <h2 className="text-xl font-extrabold text-slate-900">Sym Hotels and Lodge</h2>
              <p className="text-sm text-slate-600 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-800 flex-shrink-0" />
                Princess Adeja Road, Akaajime, Gboko, Benue State
              </p>
              <p className="text-xs text-slate-500 mt-1">Attention: Executive Board & General Management</p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-5 flex flex-col justify-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">PROJECT OBJECTIVE</p>
              <p className="text-xs font-semibold text-slate-800">Local Search Dominance & Direct Booking Infrastructure</p>
              <p className="text-xs text-emerald-700 font-bold mt-1">Projected ROI: +₦1.2M – ₦3.0M / month direct lift</p>
            </div>
          </div>

          {/* EXECUTIVE HEALTH SCORE HERO CARD (BIG IMPACT) */}
          <div className="mt-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border-2 border-red-950 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
              {/* Big Score Shape */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-2xl border-2 border-red-500/40 text-center min-w-[200px] w-full md:w-auto shadow-inner">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                  HEALTH SCORE
                </span>
                <div className="flex items-baseline justify-center my-2">
                  <span className="text-6xl font-black text-red-500 font-mono tracking-tighter">12</span>
                  <span className="text-2xl font-bold text-slate-400 font-mono">/100</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
                  VIRTUALLY INVISIBLE
                </span>
              </div>

              {/* Diagnosis Summary */}
              <div className="flex-1">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <h3 className="text-lg font-black uppercase tracking-wide">
                    Zero Google Map Footprint In Gboko
                  </h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Sym Hotels and Lodge is physically situated on the prime Princess Adeja Road corridor in Gboko, yet has virtually <strong className="text-white">NO Google Business Profile, NO local map ranking, and NO direct website</strong>. 
                  Travelers arriving in Gboko for weddings, state assemblies, cultural events, or agribusiness are completely unable to find or book you online, forfeiting bookings to competitors or surrendering <strong className="text-amber-300">15–20% in OTA commissions</strong> on Hotels.ng.
                </p>
              </div>
            </div>
          </div>

          {/* 4 BIG STAT SHAPES */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-red-50/80 border-t-4 border-red-600 rounded-xl p-4 text-center">
              <span className="text-3xl font-black text-slate-900 font-mono block">0</span>
              <span className="text-xs font-bold text-red-900 uppercase block mt-1">Google Maps Profile</span>
              <span className="text-[11px] text-slate-600 block mt-1">Zero local search verification</span>
            </div>

            <div className="bg-red-50/80 border-t-4 border-red-600 rounded-xl p-4 text-center">
              <span className="text-3xl font-black text-slate-900 font-mono block">0</span>
              <span className="text-xs font-bold text-red-900 uppercase block mt-1">Direct Website</span>
              <span className="text-[11px] text-slate-600 block mt-1">₦0 direct online collection</span>
            </div>

            <div className="bg-amber-50/80 border-t-4 border-amber-600 rounded-xl p-4 text-center">
              <span className="text-3xl font-black text-slate-900 font-mono block">0%</span>
              <span className="text-xs font-bold text-amber-900 uppercase block mt-1">WhatsApp Automation</span>
              <span className="text-[11px] text-slate-600 block mt-1">Manual replies; 80% inquiry drop</span>
            </div>

            <div className="bg-red-50/80 border-t-4 border-red-600 rounded-xl p-4 text-center">
              <span className="text-3xl font-black text-slate-900 font-mono block">-20%</span>
              <span className="text-xs font-bold text-red-900 uppercase block mt-1">OTA Commission</span>
              <span className="text-[11px] text-slate-600 block mt-1">Hotels.ng takes cut on every stay</span>
            </div>
          </div>

          {/* SECTION 1: THE GUEST BOOKING LEAK FUNNEL DIAGRAM */}
          <div className="mt-10">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-amber-700 rounded-sm"></span>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">
                1. The Guest Booking Leak Funnel (Where Revenue Escapes)
              </h3>
            </div>
            
            <p className="text-xs text-slate-600 mt-2 mb-4">
              Here is the exact journey of 100 potential guests seeking accommodation in Gboko today:
            </p>

            {/* Visual Funnel Cards / Steps */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-slate-50 border border-slate-200 rounded-xl p-4 gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-black font-mono flex-shrink-0 text-base">
                  01
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Stage 1: Google Search & Maps</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Traveler searches <span className="font-semibold text-slate-800">"Hotels in Gboko"</span> or <span className="font-semibold text-slate-800">"Lodge along Princess Adeja Rd"</span>. Sym Hotels has no Google Business Profile.
                  </p>
                </div>
                <div className="bg-red-100 text-red-800 font-bold text-xs px-3 py-1.5 rounded-lg text-right flex-shrink-0 border border-red-200">
                  70% GUESTS LEAK<br/><span className="text-[10px] font-medium">Book visible competitors</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-slate-50 border border-slate-200 rounded-xl p-4 gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-black font-mono flex-shrink-0 text-base">
                  02
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Stage 2: Social Media & Credibility Verification</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Remaining 30 guests check Facebook. Outdated posts with no real-time tariffs, room photos, or instant booking link.
                  </p>
                </div>
                <div className="bg-red-100 text-red-800 font-bold text-xs px-3 py-1.5 rounded-lg text-right flex-shrink-0 border border-red-200">
                  15% GUESTS LEAK<br/><span className="text-[10px] font-medium">Doubt quality & leave</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-slate-50 border border-slate-200 rounded-xl p-4 gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-black font-mono flex-shrink-0 text-base">
                  03
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Stage 3: Direct Inquiry & Late Night Arrival</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Remaining 15 guests attempt to call or WhatsApp front desk. No automated 24/7 concierge. Response takes 40+ minutes.
                  </p>
                </div>
                <div className="bg-amber-100 text-amber-800 font-bold text-xs px-3 py-1.5 rounded-lg text-right flex-shrink-0 border border-amber-200">
                  10% GUESTS LEAK<br/><span className="text-[10px] font-medium">Reserve nearby alternative</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-emerald-50 border border-emerald-200 rounded-xl p-4 gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-black font-mono flex-shrink-0 text-base">
                  04
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-black text-emerald-900 uppercase">Stage 4: OTA Intermediary Booking (Hotels.ng)</h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Only 5 out of 100 guests survive and book via Hotels.ng. Sym pays 15% – 20% commission on every room night.
                  </p>
                </div>
                <div className="bg-emerald-100 text-emerald-900 font-bold text-xs px-3 py-1.5 rounded-lg text-right flex-shrink-0 border border-emerald-300">
                  ONLY 5% CAPTURED<br/><span className="text-[10px] font-medium">At severely reduced margins</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: GBOKO SEARCH VISIBILITY MATRIX */}
          <div className="mt-10">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-amber-700 rounded-sm"></span>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">
                2. Gboko Local Search & Competitive Benchmark
              </h3>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-3 font-bold rounded-tl-lg">Growth Asset</th>
                    <th className="p-3 font-bold">Sym Hotels Status</th>
                    <th className="p-3 font-bold">Top Gboko Competitors</th>
                    <th className="p-3 font-bold">Optimal Standard</th>
                    <th className="p-3 font-bold rounded-tr-lg">Turnaround Solution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-red-50/50">
                    <td className="p-3 font-bold text-slate-900">Google Local 3-Pack</td>
                    <td className="p-3 font-bold text-red-700">MISSING / 0 MAP CARD</td>
                    <td className="p-3 text-slate-600">Active (10-35 reviews)</td>
                    <td className="p-3 text-slate-800">Top 3 Rank + 50+ Reviews</td>
                    <td className="p-3 text-emerald-700 font-bold">Claim, verify & dominate #1 rank</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Direct Web Booking Engine</td>
                    <td className="p-3 font-bold text-red-700">NONE (Hotels.ng only)</td>
                    <td className="p-3 text-slate-600">Phone numbers only</td>
                    <td className="p-3 text-slate-800">Mobile Instant Booking</td>
                    <td className="p-3 text-emerald-700 font-bold">Deploy 0% commission web engine</td>
                  </tr>
                  <tr className="bg-red-50/50">
                    <td className="p-3 font-bold text-slate-900">24/7 WhatsApp AI Desk</td>
                    <td className="p-3 font-bold text-amber-700">NONE (Manual phone)</td>
                    <td className="p-3 text-slate-600">Manual / erratic replies</td>
                    <td className="p-3 text-slate-800">&lt;15s instant auto-booking</td>
                    <td className="p-3 text-emerald-700 font-bold">Capture late-night road arrivals</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Guest Review Architecture</td>
                    <td className="p-3 font-bold text-red-700">0 Google Reviews</td>
                    <td className="p-3 text-slate-600">Unmonitored ratings</td>
                    <td className="p-3 text-slate-800">4.8 Stars / 50+ Ratings</td>
                    <td className="p-3 text-emerald-700 font-bold">Smart Gateway QR stands at desk</td>
                  </tr>
                  <tr className="bg-red-50/50">
                    <td className="p-3 font-bold text-slate-900">Transit & Road Wayfinding</td>
                    <td className="p-3 font-bold text-slate-700">Gateboard only</td>
                    <td className="p-3 text-slate-600">Basic directional signs</td>
                    <td className="p-3 text-slate-800">High-visibility junction signs</td>
                    <td className="p-3 text-emerald-700 font-bold">Transit signs along Akaajime corridor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 3: THE 5-PILLAR TURNKEY SOLUTION */}
          <div className="mt-10">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-amber-700 rounded-sm"></span>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">
                3. The 5-Pillar Turnkey Hospitality Growth System
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-900/10 text-amber-900 flex items-center justify-center font-bold flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase">1. Direct Web Booking Engine</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Custom-built, ultra-fast website for Nigerian networks. Room catalogs, executive suite showcases, standby generator guarantee, and integrated Paystack / Monnify checkout (0% commission).
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-900/10 text-amber-900 flex items-center justify-center font-bold flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase">2. 24/7 WhatsApp AI Concierge</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Automated booking assistant that responds in under 15 seconds. Sends room photos, verifies dates, handles tariff questions, and issues instant payment links to capture midnight arrivals.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-900/10 text-amber-900 flex items-center justify-center font-bold flex-shrink-0">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase">3. Google 3-Pack & Review Flywheel</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Establish and optimize Google Business Profile. Deploy acrylic Smart Gateway QR stands at reception to scale Sym Hotels from 0 to 50+ verified 5-star Google reviews in 60 days.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-900/10 text-amber-900 flex items-center justify-center font-bold flex-shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase">4. Transit Signage & Wayfinding</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Design and strategic placement of directional signage at Akaajime junction and Princess Adeja approach, guiding visiting motorists directly to the property without getting lost.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3 mt-4">
              <div className="w-9 h-9 rounded-lg bg-amber-900/10 text-amber-900 flex items-center justify-center font-bold flex-shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase">5. Social Media & Content Architecture</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Visual transformation of Facebook & Instagram handles with high-res photography of suites, restaurant & VIP bar. Targeted ad campaigns aimed at wedding organizers and corporate visitors.
                </p>
              </div>
            </div>
          </div>

          {/* BIG FINANCIAL ROI BANNER */}
          <div className="mt-8 bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-6 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
              PROJECTED MONTHLY REVENUE ACCELERATION
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-950 font-serif my-1">
              +₦1,200,000 – ₦3,000,000
            </div>
            <p className="text-xs text-emerald-700 max-w-xl mx-auto">
              Estimated incremental direct room revenue unlocked every month by capturing search traffic, automating WhatsApp bookings, and eliminating OTA commission losses within 90 days of launch.
            </p>
          </div>

          {/* SECTION 4: 4-WEEK ROLLOUT SCHEDULE */}
          <div className="mt-10">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-amber-700 rounded-sm"></span>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">
                4. 4-Week Rapid Deployment Schedule
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="font-mono font-bold text-amber-800 text-[10px] uppercase block">Week 1</span>
                <span className="font-black text-slate-900 block mt-1">Google Setup & Audit</span>
                <p className="text-[11px] text-slate-600 mt-1">GBP verification, photo shoot brief, local citation building.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="font-mono font-bold text-amber-800 text-[10px] uppercase block">Week 2</span>
                <span className="font-black text-slate-900 block mt-1">Direct Web Engine</span>
                <p className="text-[11px] text-slate-600 mt-1">Deploy mobile booking site & Paystack direct payments.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="font-mono font-bold text-amber-800 text-[10px] uppercase block">Week 3</span>
                <span className="font-black text-slate-900 block mt-1">WhatsApp Bot & QR</span>
                <p className="text-[11px] text-slate-600 mt-1">Configure 24/7 AI concierge and install acrylic QR stands.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="font-mono font-bold text-amber-800 text-[10px] uppercase block">Week 4</span>
                <span className="font-black text-slate-900 block mt-1">Signage & Launch</span>
                <p className="text-[11px] text-slate-600 mt-1">Install road transit boards, activate Meta ads & staff training.</p>
              </div>
            </div>
          </div>

          {/* OFFICIAL FOOTER SIGNATURE */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-500 gap-4">
            <div>
              <p className="font-bold text-slate-800 uppercase">SALES COWBOY MARKETING SOLUTIONS</p>
              <p>Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos</p>
              <p>Direct: +234 810 493 3232 • Email: hello@salescowboy.com.ng</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-mono text-[11px] text-slate-400">DOCUMENT ID: AUD-SYM-GBOKO-2026</p>
              <p className="text-emerald-700 font-bold mt-0.5">READY FOR IMMEDIATE DEPLOYMENT</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

