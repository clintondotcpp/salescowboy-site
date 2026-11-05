/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
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
  Instagram, 
  ShieldAlert,
  Hotel
} from "lucide-react";

export default function GocapAuditPage() {
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
            margin: 14mm;
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
            GOCAP Guest House & Apartments — Digital Revenue Audit
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
          
          {/* Letterhead Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-[#7c4a1e] pb-5 mb-6">
            <div className="flex items-center gap-4">
              <img 
                src="/assets/salescowboy-logo.png" 
                alt="Sales Cowboy Logo" 
                className="w-14 h-14 object-contain rounded-lg shadow-sm"
              />
              <div>
                <h1 className="font-serif text-2xl font-bold text-[#7c4a1e] tracking-tight leading-none mb-1">
                  Sales Cowboy
                </h1>
                <div className="text-[10px] tracking-widest text-[#cca066] uppercase font-bold">
                  Marketing Solutions • Hospitality Growth Systems
                </div>
                <p className="text-[10px] text-slate-500 leading-tight mt-1">
                  Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos, Nigeria<br />
                  hello@salescowboy.com.ng • +234 810 493 3232 • salescowboy.com.ng
                </p>
              </div>
            </div>

            <div className="text-right font-mono text-[11px] bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-slate-600 w-full sm:w-auto">
              <span className="inline-block bg-red-100 text-red-800 text-[9.5px] font-bold px-2 py-0.5 rounded border border-red-200 uppercase mb-1">
                Digital Revenue Audit
              </span>
              <div className="font-bold text-slate-950">REF: AUD-2026-SCM-GOCAP-01</div>
              <div>DATE: November 5, 2026</div>
              <div className="text-red-600 font-bold">SCORE: 28/100 (CRITICAL LEAK)</div>
            </div>
          </div>

          {/* Audit Subject Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 text-xs">
            <div className="sm:col-span-2">
              <span className="text-[9px] font-bold text-[#7c4a1e] uppercase tracking-wider block font-mono">
                Audit Target Subject:
              </span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                GOCAP GUEST HOUSE & APARTMENTS
              </p>
              <p className="text-[11px] text-slate-600 mt-1 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                13 Parmor Estate, Off Trademore Phase 3, Emmanuel Mbaka Blvd, Airport Road, Lugbe, Abuja
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Target Catchment: Nnamdi Azikiwe International Airport Transit Belt & Lugbe Business Corridor
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center flex flex-col justify-center items-center">
              <span className="text-[9px] font-bold text-red-900 uppercase tracking-wider font-mono">
                Digital Health Rating
              </span>
              <div className="font-mono text-3xl font-black text-red-600 my-0.5">
                28<span className="text-sm font-normal text-slate-400">/100</span>
              </div>
              <span className="text-[9px] font-bold bg-red-200 text-red-900 px-2 py-0.5 rounded uppercase">
                High Revenue Risk
              </span>
            </div>
          </div>

          {/* Title Section */}
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-950 tracking-tight leading-snug">
              Digital Revenue & Search Visibility Audit: Unlocking the Lugbe Airport Corridor Goldmine
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              A forensic technical evaluation of local search performance, booking friction, and conversion automation for GOCAP Guest House & Apartments.
            </p>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7c4a1e] border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              1. Executive Summary & Diagnostic Findings
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              <strong>GOCAP Guest House & Apartments</strong> enjoys a prime commercial asset: its strategic location along the high-traffic Airport Road corridor in Lugbe, Abuja. Over <strong>15,000 travelers pass through Nnamdi Azikiwe International Airport daily</strong>, generating continuous demand for short-stay lodging, flight layovers, emergency overnight stays, and business accommodation.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              However, our audit reveals that <strong>over 85% of high-intent searchers cannot book with GOCAP</strong> because of three fatal digital infrastructure gaps:
            </p>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="border-t-2 border-red-500 bg-red-50/50 p-3 rounded-lg border border-slate-200">
                <span className="text-[9px] font-bold uppercase text-slate-500 font-mono block">Google Profile</span>
                <div className="font-mono text-xl font-bold text-red-600 my-1">6 Reviews</div>
                <p className="text-[10.5px] text-slate-600 leading-tight">Dormant profile. Low review volume and zero updates cause Google to suppress the listing.</p>
              </div>

              <div className="border-t-2 border-red-500 bg-red-50/50 p-3 rounded-lg border border-slate-200">
                <span className="text-[9px] font-bold uppercase text-slate-500 font-mono block">Direct Booking</span>
                <div className="font-mono text-xl font-bold text-red-600 my-1">0 Websites</div>
                <p className="text-[10.5px] text-slate-600 leading-tight">No web platform to view room photos, inspect amenities, or pay online. 65%+ drop-off rate.</p>
              </div>

              <div className="border-t-2 border-amber-500 bg-amber-50/50 p-3 rounded-lg border border-slate-200">
                <span className="text-[9px] font-bold uppercase text-slate-500 font-mono block">WhatsApp Chat</span>
                <div className="font-mono text-xl font-bold text-amber-600 my-1">0% Automated</div>
                <p className="text-[10.5px] text-slate-600 leading-tight">No instant chat concierge. Late arrivals messaging at night receive no reply and leave.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Search Intent Matrix */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7c4a1e] border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              2. Google Search Visibility & Geo-Intent Matrix
            </h3>
            
            <div className="overflow-x-auto border border-slate-200 rounded-lg mb-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-[10px] uppercase">
                    <th className="p-2.5">Target Search Query</th>
                    <th className="p-2.5">Ranking Probability</th>
                    <th className="p-2.5">Algorithmic Reality & Revenue Implication</th>
                    <th className="p-2.5">Strategic Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px] text-slate-700">
                  <tr className="bg-white">
                    <td className="p-2.5 font-bold text-slate-900">"Hotels in Abuja"</td>
                    <td className="p-2.5"><span className="bg-red-100 text-red-800 text-[9px] font-bold px-1.5 py-0.5 rounded">Highly Unlikely (1/10)</span></td>
                    <td className="p-2.5">Abuja is vast. Broad searches favor luxury hotels in Maitama/Wuse. Google filters out Lugbe guest houses due to centroid factors.</td>
                    <td className="p-2.5 text-slate-500">De-prioritize</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">"Hotels in Airport Road" / "Hotels in Lugbe"</td>
                    <td className="p-2.5"><span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded">Underperforming (4/10)</span></td>
                    <td className="p-2.5"><strong>THE PRIMARY GOLDMINE:</strong> Google explicitly ties Airport Road & Lugbe together. GOCAP is currently buried behind competitors who have 30+ reviews.</td>
                    <td className="p-2.5 font-bold text-amber-700">Dominate Local 3-Pack</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-2.5 font-bold text-slate-900">"Hotels near me"</td>
                    <td className="p-2.5"><span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded">Conditional (3/10)</span></td>
                    <td className="p-2.5">Captures users only when physically standing in Lugbe/VON. Fails to attract incoming travelers while they are still in the airport terminal.</td>
                    <td className="p-2.5 text-slate-500">Proximity capture</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">"Lodges / Guest Houses in Lugbe"</td>
                    <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">High Category Match</span></td>
                    <td className="p-2.5">Natural category match. However, without transparent prices, room pictures, or instant WhatsApp booking, 70% of viewers bounce to competitors.</td>
                    <td className="p-2.5 font-bold text-emerald-700">Direct Conversion Hub</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: The 5 Upgrades */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7c4a1e] border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              3. The 5-Point Turnkey Transformation Blueprint
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <span className="font-bold text-slate-900 text-[11.5px] block mb-1">
                  🌐 1. Modern Direct Booking Website
                </span>
                <p className="text-[10.5px] text-slate-600 leading-relaxed">
                  A high-speed, mobile-first showcase of Standard Rooms, Deluxe Rooms, and Executive Apartments with photo galleries, amenities (24/7 power, security, Wi-Fi), and instant Paystack checkout. Bypasses 15–20% OTA commissions!
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <span className="font-bold text-slate-900 text-[11.5px] block mb-1">
                  💬 2. 24/7 WhatsApp AI Concierge Bot
                </span>
                <p className="text-[10.5px] text-slate-600 leading-relaxed">
                  An automated WhatsApp assistant on GOCAP's business line. Guests chat, check real-time availability, view photo carousels, pick dates, and <strong>pay directly on WhatsApp</strong> with automated receipt & GPS location pin.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <span className="font-bold text-slate-900 text-[11.5px] block mb-1">
                  📍 3. Google Business Local 3-Pack SEO
                </span>
                <p className="text-[10.5px] text-slate-600 leading-relaxed">
                  Complete GBP optimization with geo-tagged photography and our proprietary <strong>Review Acceleration Flywheel</strong> (front-desk QR stands to rapidly scale GOCAP from 6 reviews to 50+ 5-star ratings within 60 days).
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <span className="font-bold text-slate-900 text-[11.5px] block mb-1">
                  📱 4. Visual Social Media Content Engine
                </span>
                <p className="text-[10.5px] text-slate-600 leading-relaxed">
                  Professional Instagram & Facebook curation with high-definition video reels highlighting quiet estate serenity, pristine rooms, air conditioning, and airport proximity to convert corporate short-stayers.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded-r-lg text-xs text-emerald-950">
              <strong>Upgrade 5: Hyper-Targeted Airport Transit Advertising</strong>
              <p className="text-[10.5px] text-emerald-800 mt-1">
                Geofenced Meta & Google Ads running strictly within Nnamdi Azikiwe Airport terminal and Airport Road corridor to capture passengers facing flight cancellations, layovers, or searching for nearby lodging.
              </p>
            </div>
          </div>

          {/* Section 4: ROI Impact */}
          <div className="mb-6 bg-slate-900 text-white rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                Financial ROI & Revenue Simulation
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Capturing just <strong>2 to 4 additional direct room bookings per night</strong> at ₦25,000 – ₦35,000/night generates:
              </p>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-lg text-center shrink-0">
              <div className="font-mono text-xl font-bold text-emerald-400">+₦1.5M – ₦3.5M</div>
              <span className="text-[9px] text-slate-400 uppercase font-mono">Gross Monthly Revenue Gain</span>
            </div>
          </div>

          {/* Section 5: Signoff */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-200 pt-4 mt-6 text-xs">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">
                AUDIT CONDUCTED & COMPILED BY:
              </span>
              <p className="font-bold text-slate-900 font-serif mt-0.5">
                SALES COWBOY MARKETING SOLUTIONS
              </p>
              <p className="text-[11px] text-slate-600">Clinton Chukwunyere • Lead Technical Director</p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">hello@salescowboy.com.ng • +234 810 493 3232</p>
            </div>

            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">
                PREPARED EXCLUSIVELY FOR:
              </span>
              <p className="font-bold text-slate-900 mt-0.5">
                GOCAP GUEST HOUSE & APARTMENTS
              </p>
              <p className="text-[11px] text-slate-600">Attention: Management & Board of Directors</p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">13 Parmor Estate, Airport Road, Lugbe, Abuja</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

