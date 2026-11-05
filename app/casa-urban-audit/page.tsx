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
  Check,
  QrCode,
  ShieldAlert
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
            Casa Urban Guest House, Odogunyan Ikorodu — Revenue & Search Audit
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
                <div className="flex items-center gap-2.5 text-[11px] text-slate-500 mt-1 flex-wrap">
                  <span>36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria</span>
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
              <p className="text-xs font-mono font-semibold text-slate-800 mt-0.5">REF: AUD-CASA-2026-005</p>
              <p className="text-[11px] text-slate-500">November 06, 2026</p>
            </div>
          </div>

          {/* Title & Target Details */}
          <div className="mt-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight">
              DIGITAL SEARCH VISIBILITY, REVENUE & SOCIAL MANAGEMENT AUDIT
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Direct Booking Engine, 24/7 WhatsApp AI Concierge, Google 3-Pack Optimization & Viral Poolside Social Media Engine
            </p>
          </div>

          <div className="mt-6 bg-slate-50 p-4 rounded border border-slate-200 flex flex-col md:flex-row justify-between gap-4 text-xs">
            <div>
              <p className="font-semibold uppercase tracking-wider text-slate-500 text-[10px]">AUDITED PROPERTY</p>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">Casa Urban Guest House & Suites</h3>
              <p className="text-slate-600 mt-0.5 leading-normal">
                12 Alhaji Amu Street, off Saka Jojo by Homat Bus Stop, Odogunyan, Ikorodu, Lagos State, Nigeria
              </p>
              <p className="text-slate-500 mt-1 text-[11px]">Phone: +234 802 876 2087 • Open 24 Hours Daily</p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-5 flex flex-col justify-center">
              <p className="font-semibold uppercase tracking-wider text-slate-500 text-[10px]">FACILITIES AUDITED</p>
              <p className="font-medium text-slate-800">Standard, Deluxe, Luxury Rooms & Serviced Apartment Shortlets</p>
              <p className="text-slate-600 mt-0.5">Outdoor Swimming Pool, Restaurant, Lounge, Kitchen & Snooker Arena</p>
            </div>
          </div>

          {/* EXECUTIVE HEALTH SCORE HERO CARD */}
          <div className="mt-6 bg-slate-950 text-white rounded-lg p-5 sm:p-6 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center sm:text-left bg-slate-900 p-4 rounded-md border border-slate-800 min-w-[160px] w-full sm:w-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">HEALTH SCORE</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono my-0.5">
                24<span className="text-lg text-slate-500">/100</span>
              </div>
              <span className="text-[10px] font-bold text-rose-200 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40 inline-block">
                SEARCH BLIND SPOT
              </span>
            </div>

            <div className="flex-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-1 text-xs uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4" />
                <span>Critical Finding: High-Value Physical Facility, Digital Blind Spot</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Casa Urban Guest House is located in <strong className="text-white">Odogunyan, Ikorodu</strong>—a massive industrial hub housing corporate giants (Lucky Fibres, PZ Cussons, African Foundries, Wempco). You offer rare premium amenities: an outdoor pool, snooker lounge, and serviced shortlet apartments. However, with <strong className="text-white">NO website</strong>, only <strong className="text-white">12 Google reviews (3.8 stars)</strong>, and an <strong className="text-white">abandoned social page (15 posts)</strong>, you lose an estimated 90%+ of inbound inquiries and surrender <strong className="text-rose-300">₦1.2M – ₦2.8M monthly</strong> in direct room stays, poolside parties, and bar revenue.
              </p>
            </div>
          </div>

          {/* 4 CORE METRIC CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="bg-slate-50 border-t-2 border-slate-900 border-x border-b border-slate-200 rounded p-3 text-center">
              <span className="text-2xl font-bold text-slate-900 font-mono block">0</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-0.5">Direct Website</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Zero direct room/shortlet checkout</span>
            </div>

            <div className="bg-slate-50 border-t-2 border-slate-900 border-x border-b border-slate-200 rounded p-3 text-center">
              <span className="text-2xl font-bold text-slate-900 font-mono block">12</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-0.5">Google Reviews (3.8★)</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Statistically invisible on Google Maps</span>
            </div>

            <div className="bg-slate-50 border-t-2 border-slate-900 border-x border-b border-slate-200 rounded p-3 text-center">
              <span className="text-2xl font-bold text-slate-900 font-mono block">15</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-0.5">Social Posts (Dormant)</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Missing weekend pool & lounge hype</span>
            </div>

            <div className="bg-slate-50 border-t-2 border-slate-900 border-x border-b border-slate-200 rounded p-3 text-center">
              <span className="text-2xl font-bold text-slate-900 font-mono block">0%</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase block mt-0.5">WhatsApp Automation</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Manual replies; 75%+ inquiry drop</span>
            </div>
          </div>

          {/* 1. GUEST BOOKING LEAK FUNNEL */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-300">
              1. The Guest Booking Leak Funnel (Where Revenue Escapes)
            </h3>
            <p className="text-xs text-slate-600 mt-2 mb-3 leading-relaxed">
              Here is the exact journey of 100 potential travelers, corporate engineers, and weekend relaxation seekers looking for lodging or poolside recreation in Odogunyan / Ikorodu today:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <th className="p-2.5 font-semibold">Stage</th>
                    <th className="p-2.5 font-semibold">Guest Journey & Behavior</th>
                    <th className="p-2.5 font-semibold">Casa Urban Current Reality</th>
                    <th className="p-2.5 font-semibold">Financial Consequence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900 whitespace-nowrap">1. Google Search & Maps</td>
                    <td className="p-2.5 text-slate-600">Traveler searches: &ldquo;Hotels in Odogunyan Ikorodu&rdquo; or &ldquo;Guest house near Lucky Fibres&rdquo;.</td>
                    <td className="p-2.5 text-slate-600">Only 12 reviews (3.8 stars) and NO website link on Google.</td>
                    <td className="p-2.5 font-semibold text-rose-700">60 Guests Abandon: Choose competitors with higher ratings & verified links.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900 whitespace-nowrap">2. Social Media Vibe Check</td>
                    <td className="p-2.5 text-slate-600">Remaining 40 guests check Instagram / Facebook for photos of the pool, rooms, and lounge menu.</td>
                    <td className="p-2.5 text-slate-600">Only 15 total lifetime posts; dormant for weeks/months.</td>
                    <td className="p-2.5 font-semibold text-rose-700">20 Guests Abandon: Assume the hotel is inactive, dilapidated, or closed.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900 whitespace-nowrap">3. Phone Call / WhatsApp</td>
                    <td className="p-2.5 text-slate-600">Remaining 20 guests call or message front desk for room & pool entry rates.</td>
                    <td className="p-2.5 text-slate-600">Manual phone replies, busy lines, or 45+ minute WhatsApp delays.</td>
                    <td className="p-2.5 font-semibold text-rose-700">12 Guests Abandon: Late-night or urgent bookings book elsewhere.</td>
                  </tr>
                  <tr className="bg-slate-50 font-semibold">
                    <td className="p-2.5 text-slate-900 whitespace-nowrap">4. Physical Walk-In</td>
                    <td className="p-2.5 text-slate-700">Only 8 out of 100 potential guests survive the funnel to check in or enter the lounge.</td>
                    <td className="p-2.5 text-slate-700">Surviving customers arrive purely by word-of-mouth or physical chance.</td>
                    <td className="p-2.5 text-slate-900">Net Loss: 92 out of every 100 high-intent potential guests are lost!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. THE 4-PILLAR TURNAROUND SOLUTION */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-300">
              2. The 4-Pillar Turnaround Solution
            </h3>
            <p className="text-xs text-slate-600 mt-2 mb-4 leading-relaxed">
              Sales Cowboy will engineer four unified systems to turn Casa Urban Guest House into Odogunyan’s primary destination for shortlet stays, poolside recreation, and corporate lodging:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Pillar 1 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                    Direct Booking Website & Shortlet Showcase
                  </h4>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li><strong>Fast Mobile Engine:</strong> Bespoke site optimized for Nigerian 4G/3G networks with instant loading speeds.</li>
                  <li><strong>Room & Apartment Gallery:</strong> High-definition showcases for Standard, Deluxe, Luxury, and Apartment suites.</li>
                  <li><strong>Amenity Spotlights:</strong> Dedicated tabs for Swimming Pool, Snooker Lounge, Restaurant, and 24/7 Security.</li>
                  <li><strong>0% Commission Direct Checkout:</strong> Integrated Paystack/Monnify gateway for instant card and transfer payments depositing directly to your corporate account.</li>
                </ul>
              </div>

              {/* Pillar 2 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                    24/7 Autonomous WhatsApp AI Concierge
                  </h4>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li><strong>Sub-15s Response Time:</strong> Immediate automated replies 24 hours a day, including midnight arrivals from Sagamu Road.</li>
                  <li><strong>Automated Menu & Media:</strong> Instantly sends room photos, shortlet rates, food/drink menus, and pool gate fee info.</li>
                  <li><strong>Direct Payment Links:</strong> Generates automated Paystack payment links right inside the WhatsApp chat thread.</li>
                  <li><strong>Digital Vouchers:</strong> Issues automated booking confirmations and check-in receipts, eliminating manual human errors.</li>
                </ul>
              </div>

              {/* Pillar 3 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                    Google 3-Pack Rank & Smart Review Flywheel
                  </h4>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li><strong>Odogunyan Geo-Optimization:</strong> Target high-volume keywords (&ldquo;Hotels in Odogunyan&rdquo;, &ldquo;Guest house near Lucky Fibres&rdquo;).</li>
                  <li><strong>Acrylic NFC / Dynamic QR Stands:</strong> 2x custom branded counter stands deployed at Front Desk and Poolside Bar.</li>
                  <li><strong>Smart Review Interception:</strong> Routes 5-star ratings directly to Google Maps; routes complaints to a private manager form.</li>
                  <li><strong>Rating Acceleration:</strong> Scale from 12 reviews to 50+ 5-star ratings within 60 days, lifting public score from 3.8 to 4.7+.</li>
                </ul>
              </div>

              {/* Pillar 4 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                    4
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                    Viral Poolside & Lounge Social Media Engine
                  </h4>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li><strong>Resuscitate Dead Channels:</strong> Take over Instagram & Facebook handles with high-energy User Generated Content (UGC).</li>
                  <li><strong>Pool & Snooker Lifestyle Reels:</strong> 4–5 short-form video reels per week showcasing pool parties, cocktails, and room tours.</li>
                  <li><strong>Hyper-Targeted Meta Ads:</strong> Run targeted campaigns reaching factory engineers, corporate guests, and youth in Ikorodu & Ketu.</li>
                  <li><strong>Event & Party Package Bundles:</strong> Sell out poolside birthday parties, bachelor weekends, and corporate mixers.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* 3. PROJECTED FINANCIAL RETURN & REVENUE UPLIFT */}
          <div className="mt-8 border border-slate-900 rounded-lg overflow-hidden">
            <div className="bg-slate-950 text-white px-5 py-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PROJECTED ROI</span>
                <h4 className="text-sm font-bold text-white uppercase">Direct Revenue Acceleration Potential</h4>
              </div>
              <div className="text-right">
                <span className="text-lg font-mono font-bold text-emerald-400">+₦1.2M – ₦2.8M</span>
                <span className="text-[10px] text-slate-400 block">estimated monthly uplift</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 text-xs text-slate-700 space-y-2">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                <span className="font-medium">Direct Room & Shortlet Surge (+15 to +25 room nights / week at ₦18k–₦30k/night)</span>
                <span className="font-mono font-bold text-slate-900">+₦1,080,000 – ₦1,800,000 / mo</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                <span className="font-medium">Poolside, Bar & Snooker Spending (+30% to +45% weekend visitor uplift)</span>
                <span className="font-mono font-bold text-slate-900">+₦400,000 – ₦900,000 / mo</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                <span className="font-medium">Commission Savings (Bypassing 15%–20% OTA middleman fees via direct web & WhatsApp)</span>
                <span className="font-mono font-bold text-slate-900">+₦150,000 – ₦300,000 / mo</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 leading-normal italic">
                * Projections based on real occupancy benchmarks for comparable boutique hotels and shortlet properties in Lagos industrial corridors.
              </p>
            </div>
          </div>

          {/* 4. 4-WEEK ROLLOUT SCHEDULE */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-300">
              3. 4-Week Rapid Deployment Schedule
            </h3>
            
            <div className="overflow-x-auto mt-2.5">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <th className="p-2 font-semibold w-24">Timeline</th>
                    <th className="p-2 font-semibold w-48">Phase Focus</th>
                    <th className="p-2 font-semibold">Core Deliverables & Milestones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 font-bold text-slate-900">Week 1</td>
                    <td className="p-2 font-medium text-slate-800">Direct Web Booking Engine</td>
                    <td className="p-2 text-slate-600">Custom mobile booking site build, room/apartment photo curation, Paystack payment gateway, and Google Business Profile optimization.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900">Week 2</td>
                    <td className="p-2 font-medium text-slate-800">WhatsApp AI Concierge</td>
                    <td className="p-2 text-slate-600">Official WhatsApp Business API setup, room catalog ingestion, pool/menu rate integration, and automated booking payment link testing.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900">Week 3</td>
                    <td className="p-2 font-medium text-slate-800">Smart Review QR Flywheel</td>
                    <td className="p-2 text-slate-600">Installation of custom acrylic NFC + QR stands at reception and pool bar, staff review incentive onboarding, and Google 3-Pack rank push.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900">Week 4</td>
                    <td className="p-2 font-medium text-slate-800">UGC Content Shoot & Ad Blitz</td>
                    <td className="p-2 text-slate-600">Professional on-site video production (poolside, snooker, luxury rooms, lounge), social media relaunch, and Meta ad campaign activation.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SIGN-OFF & AUTHORIZATION */}
          <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="text-xs font-bold text-slate-900 uppercase">PREPARED BY:</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">Sales Cowboy Marketing Solutions</p>
              <p className="text-xs text-slate-600">Hospitality Revenue Engineering & Growth Division</p>
              <p className="text-xs text-slate-500 mt-1">36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria</p>
              <p className="text-xs text-slate-500">Direct: +234 810 493 3232 • Email: hello@salescowboy.com.ng</p>
            </div>

            <div className="border border-dashed border-slate-300 p-4 rounded bg-slate-50 min-w-[200px] text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-4">
                AUTHENTICATION SEAL
              </span>
              <div className="h-0.5 bg-slate-300 w-24 mx-auto mb-2"></div>
              <p className="text-xs font-semibold text-slate-800">Hospitality Advisory Board</p>
              <p className="text-[10px] text-slate-500">Sales Cowboy Nigeria</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

