/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { 
  Printer, 
  MapPin, 
  Phone, 
  Globe, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Search, 
  MessageSquare, 
  Star, 
  Building2,
  Bot,
  Video,
  Layers,
  Percent,
  Check
} from "lucide-react";

export default function OlympusHotelAuditPage() {
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
      <header className="bg-slate-950 border-b border-slate-800 text-white py-3.5 px-6 top-0 z-30 shadow-sm no-print flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-base font-bold tracking-wider uppercase text-white font-mono">
              SALES COWBOY
            </span>
          </Link>
          <span className="h-4 w-px bg-slate-700 hidden sm:block"></span>
          <span className="text-xs tracking-wider text-slate-400 uppercase hidden sm:block font-medium">
            Olympus Hotel & Suites, Ibadan — Digital Revenue Audit
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="bg-slate-100 hover:bg-white text-slate-900 px-3.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </header>

      {/* Document View */}
      <div className="flex-1 py-10 px-4 sm:px-6 flex justify-center">
        <div className="w-full max-w-[210mm] bg-white text-slate-900 rounded-lg shadow-xl border border-slate-300 overflow-hidden print-sheet p-8 sm:p-14">
          
          {/* Executive Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-900 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center p-2 text-slate-800">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase font-serif">
                  SALES COWBOY
                </h1>
                <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  Marketing Solutions • Hospitality Revenue Engineering
                </p>
                <div className="flex items-center gap-2.5 text-[11px] text-slate-500 mt-1">
                  <span>Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos</span>
                  <span>•</span>
                  <span>+234 810 493 3232</span>
                  <span>•</span>
                  <span>salescowboy.com.ng</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right bg-slate-50 p-2.5 rounded border border-slate-200 w-full sm:w-auto">
              <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider block">
                HOSPITALITY REVENUE AUDIT
              </span>
              <p className="text-xs font-mono font-semibold text-slate-800 mt-0.5">REF: AUD-OLY-2026-004</p>
              <p className="text-[11px] text-slate-500">November 06, 2026</p>
            </div>
          </div>

          {/* Title & Target Details */}
          <div className="mt-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight">
              DIGITAL SEARCH VISIBILITY, REVENUE & OPERATIONS AUDIT
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Monetizing 418 Google Reviews, Direct Booking Engine, 24/7 WhatsApp AI Concierge & Hotel Management Software
            </p>
          </div>

          <div className="mt-6 bg-slate-50 p-4 rounded border border-slate-200 flex flex-col md:flex-row justify-between gap-4 text-xs">
            <div>
              <p className="font-semibold uppercase tracking-wider text-slate-500 text-[10px]">AUDITED PROPERTY</p>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">Olympus Hotel & Suites</h3>
              <p className="text-slate-600 mt-0.5 leading-normal">
                27 / 29 Ibadan-Abeokuta Road, Fatimah Bus Stop, by 110 Roundabout, Akinyemi Exit, Off Ring Road, Oluyole, Ibadan, Oyo State
              </p>
              <p className="text-slate-500 mt-1 text-[11px]">Phone: +234 913 905 2671 / +234 815 951 1334</p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-5 flex flex-col justify-center">
              <p className="font-semibold uppercase tracking-wider text-slate-500 text-[10px]">FACILITIES AUDITED</p>
              <p className="font-medium text-slate-800">Rooms, Restaurant, Bar, Outdoor Pool, Club & Snooker Lounge</p>
              <p className="text-slate-600 mt-0.5">Near The Palms Mall (3km), Lekan Salami Stadium & Agodi Gardens</p>
            </div>
          </div>

          {/* EXECUTIVE HEALTH SCORE HERO CARD */}
          <div className="mt-6 bg-slate-950 text-white rounded-lg p-5 sm:p-6 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center sm:text-left bg-slate-900 p-4 rounded-md border border-slate-800 min-w-[150px] w-full sm:w-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">HEALTH SCORE</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono my-0.5">
                48<span className="text-lg text-slate-500">/100</span>
              </div>
              <span className="text-[10px] font-bold text-amber-200 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 inline-block">
                UNMONETIZED ASSET
              </span>
            </div>

            <div className="flex-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1 text-xs uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4" />
                <span>Critical Finding: Massive Search Footprint, Zero Direct Conversion</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Olympus Hotel & Suites holds a massive organic advantage: <strong className="text-white">418 Google Business Profile reviews</strong>, generating thousands of monthly search views. However, because you currently have <strong className="text-white">NO official website</strong> and <strong className="text-white">NO 24/7 WhatsApp booking bot</strong>, you are surrendering 15%–20% in OTA commissions to Hotels.ng and losing over 70% of late-night and weekend nightlife inquiries.
              </p>
            </div>
          </div>

          {/* 4 CORE METRIC CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="bg-slate-50 border-t-2 border-slate-900 border-x border-b border-slate-200 rounded p-3 text-center">
              <span className="text-2xl font-bold text-slate-900 font-mono block">418</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-0.5">Google Reviews</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Top-tier search visibility in Ibadan</span>
            </div>

            <div className="bg-slate-50 border-t-2 border-slate-900 border-x border-b border-slate-200 rounded p-3 text-center">
              <span className="text-2xl font-bold text-slate-900 font-mono block">0</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-0.5">Direct Website</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Zero direct digital room booking</span>
            </div>

            <div className="bg-slate-50 border-t-2 border-slate-900 border-x border-b border-slate-200 rounded p-3 text-center">
              <span className="text-2xl font-bold text-slate-900 font-mono block">0%</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-0.5">WhatsApp AI Bot</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Manual replies; 70%+ inquiry drop</span>
            </div>

            <div className="bg-slate-50 border-t-2 border-slate-900 border-x border-b border-slate-200 rounded p-3 text-center">
              <span className="text-2xl font-bold text-slate-900 font-mono block">20%</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-0.5">OTA Commission</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Forfeited to third-party directories</span>
            </div>
          </div>

          {/* 1. GUEST BOOKING LEAK FUNNEL */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-300">
              1. The Guest Booking Leak Funnel (Where Revenue Escapes)
            </h3>
            <p className="text-xs text-slate-600 mt-2 mb-3 leading-relaxed">
              Here is what currently happens to 100 travelers and local visitors discovering Olympus Hotel & Suites on Google:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <th className="p-2 font-semibold">Stage</th>
                    <th className="p-2 font-semibold">Guest Journey & Behavior</th>
                    <th className="p-2 font-semibold">Olympus Hotel Current Reality</th>
                    <th className="p-2 font-semibold">Financial Consequence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 font-medium text-slate-900">1. Google Search</td>
                    <td className="p-2 text-slate-600">Traveler finds Olympus Hotel on Maps (attracted by 418 reviews).</td>
                    <td className="p-2 text-slate-600">No official website link exists on the Google profile.</td>
                    <td className="p-2 font-semibold text-slate-800">Search Bottleneck: Guest must hunt for external links.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">2. OTA Directory</td>
                    <td className="p-2 text-slate-600">45 guests click Hotels.ng or Booking.com directory listings.</td>
                    <td className="p-2 text-slate-600">OTAs showcase competing Oluyole hotels right alongside Olympus.</td>
                    <td className="p-2 text-slate-800">25 Guests Diverted to rivals; 20 book at 20% commission loss.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">3. Direct WhatsApp</td>
                    <td className="p-2 text-slate-600">35 guests message or call front-desk for rates or pool/club access.</td>
                    <td className="p-2 text-slate-600">No 24/7 AI bot. Front-desk phone is busy or message takes 40+ mins.</td>
                    <td className="p-2 text-slate-800">22 Guests Abandon inquiry and reserve alternative lodging nearby.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">4. Direct Walk-In</td>
                    <td className="p-2 text-slate-600">Only 20 guests successfully arrive as walk-ins or navigate phone calls.</td>
                    <td className="p-2 text-slate-600">Manual payment reconciliation between front desk, bar, and pool.</td>
                    <td className="p-2 font-semibold text-slate-900">Net Result: You lose 47 out of 100 guests and pay 20% on others!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. THE 4-PILLAR REVENUE SOLUTION */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-300">
              2. The 4-Pillar Revenue Monetization Solution
            </h3>

            <div className="space-y-3 mt-3">
              <div className="border border-slate-200 rounded p-3.5 bg-slate-50/50">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                  <Globe className="w-3.5 h-3.5 text-slate-700" />
                  <span>Pillar 1: High-Converting Direct Booking Website</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Mobile-first direct booking website linked to your 418 Google reviews. High-resolution suite galleries, amenity spotlights (outdoor pool, restaurant, club, snooker section), and integrated Paystack card & bank transfer checkout (0% intermediary commission).
                </p>
              </div>

              <div className="border border-slate-200 rounded p-3.5 bg-slate-50/50">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                  <Bot className="w-3.5 h-3.5 text-slate-700" />
                  <span>Pillar 2: 24/7 Autonomous WhatsApp AI Concierge</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Autonomous WhatsApp reservation bot responding in under 15 seconds. Ingests room catalogs, pool tariffs, and bar menus. Generates instant payment links, confirms reservations, and issues digital check-in receipts 24 hours a day, 7 days a week.
                </p>
              </div>

              <div className="border border-slate-200 rounded p-3.5 bg-slate-50/50">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                  <Building2 className="w-3.5 h-3.5 text-slate-700" />
                  <span>Pillar 3: Custom Cloud Hotel Management Software (Cloud PMS & Multi-POS)</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Centralized property management system unifying the front-desk room rack, housekeeping status, multi-channel OTA calendar sync (Booking.com & Airbnb), and integrated POS billing for the poolside bar, restaurant, club, and upper-floor snooker lounge.
                </p>
              </div>

              <div className="border border-slate-200 rounded p-3.5 bg-slate-50/50">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                  <Video className="w-3.5 h-3.5 text-slate-700" />
                  <span>Pillar 4: Social Media Management & Viral UGC Video Engine</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Production of trendy, high-engagement User Generated Content (UGC) video reels and TikToks highlighting the outdoor pool vibe, club nightlife, snooker competitions, and dining delicacies—paired with targeted Meta ad campaigns.
                </p>
              </div>
            </div>
          </div>

          {/* 3. FINANCIAL ROI */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-300">
              3. Projected Financial Return & Direct Revenue Uplift
            </h3>
            
            <div className="mt-3 bg-slate-50 border border-slate-200 rounded p-4 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                PROJECTED MONTHLY REVENUE ACCELERATION
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif my-1">
                +₦1,800,000 – ₦4,200,000 / month
              </div>
              <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
                Estimated incremental direct room, poolside, and nightlife cash flow captured by converting searchers directly into paying guests and eliminating 20% OTA intermediary commissions within 60 days of launch.
              </p>
            </div>
          </div>

          {/* 4. 4-WEEK ROLLOUT SCHEDULE */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-300">
              4. 4-Week Rapid Deployment Schedule
            </h3>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <th className="p-2 font-semibold">Timeline</th>
                    <th className="p-2 font-semibold">Core Phase</th>
                    <th className="p-2 font-semibold">Deliverables</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 font-medium text-slate-900">Week 1</td>
                    <td className="p-2 font-medium text-slate-900">Direct Booking Website</td>
                    <td className="p-2 text-slate-600">Custom mobile website build, room photo curation, Paystack gateway integration, and linking to Google profile.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">Week 2</td>
                    <td className="p-2 font-medium text-slate-900">WhatsApp AI Concierge</td>
                    <td className="p-2 text-slate-600">WhatsApp Business API setup, room catalog ingestion, automated payment links, and front-desk testing.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">Week 3</td>
                    <td className="p-2 font-medium text-slate-900">Cloud PMS & Multi-POS</td>
                    <td className="p-2 text-slate-600">Room rack calendar setup, front-desk check-in workflow, poolside bar/snooker POS integration, and OTA sync.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">Week 4</td>
                    <td className="p-2 font-medium text-slate-900">UGC Video & Campaign</td>
                    <td className="p-2 text-slate-600">On-site video production (pool, club, snooker, rooms), social media rollout, and Meta ad campaign activation.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatures */}
          <div className="mt-8 pt-6 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-500 gap-4">
            <div>
              <p className="font-bold text-slate-800 uppercase">SALES COWBOY MARKETING SOLUTIONS</p>
              <p>Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos</p>
              <p>Direct: +234 810 493 3232 • Email: hello@salescowboy.com.ng</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-mono text-[11px] text-slate-400">AUD-OLY-2026-004</p>
              <p className="text-slate-700 font-semibold mt-0.5">HOSPITALITY REVENUE ENGINEERING</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

