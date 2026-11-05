/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Printer, 
  MapPin, 
  Phone, 
  Globe, 
  CheckCircle2, 
  Building2,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  Percent,
  Check,
  Share2
} from "lucide-react";

export default function MbaiseHotelChecklistPage() {
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
            New Hotel Pre-Launch Master Checklist — Oru, Ahiara Mbaise
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all border border-slate-700"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-slate-200" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied" : "Share Link"}</span>
          </button>
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
                  <span>36, Arochukwu Street, Uratta East, Owerri North, Imo</span>
                  <span>•</span>
                  <span>+234 810 493 3232</span>
                  <span>•</span>
                  <span>salescowboy.com.ng</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right bg-slate-50 p-2.5 rounded border border-slate-200 w-full sm:w-auto">
              <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider block">
                PRE-OPENING CHECKLIST
              </span>
              <p className="text-xs font-mono font-semibold text-slate-800 mt-0.5">REF: CHK-MBAISE-2026-001</p>
              <p className="text-[11px] text-slate-500">November 06, 2026</p>
            </div>
          </div>

          {/* Title & Target Details */}
          <div className="mt-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight">
              NEW HOTEL PRE-LAUNCH & DIGITAL REVENUE MASTER CHECKLIST
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              End-to-End Operational, Local Search Dominance & Zero-OTA Commission Setup for a Clean-Slate Launch
            </p>
          </div>

          <div className="mt-6 bg-slate-50 p-4 rounded border border-slate-200 flex flex-col md:flex-row justify-between gap-4 text-xs">
            <div>
              <p className="font-semibold uppercase tracking-wider text-slate-500 text-[10px]">TARGET PROPERTY</p>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">New Hotel & Suites (Pre-Opening)</h3>
              <p className="text-slate-600 mt-0.5 leading-normal">
                Oru, Ahiara Mbaise, Imo State, Nigeria (Owerri-Umuahia Expressway / Ahiara Junction Corridor)
              </p>
              <p className="text-slate-500 mt-1 text-[11px]">Clean Slate Advantage: Zero legacy errors, 100% direct bookings from Day 1</p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-5 flex flex-col justify-center">
              <p className="font-semibold uppercase tracking-wider text-slate-500 text-[10px]">CONSULTING OFFICE</p>
              <p className="font-medium text-slate-800">Sales Cowboy Hospitality Revenue Engineering</p>
              <p className="text-slate-600 mt-0.5">36, Arochukwu Street, Uratta East, Owerri North, Imo</p>
            </div>
          </div>

          {/* Clean Slate Preamble Card */}
          <div className="mt-6 bg-slate-950 text-white rounded-lg p-5 border border-slate-800">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              The "Clean Slate" Advantage in Mbaise
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Opening a brand-new hotel in Oru, Ahiara Mbaise means you have zero broken reputations, negative reviews, or faulty software to fix. Mbaise is world-renowned for its high-density diaspora and intense festive seasons (Iri Ji Mbaise, traditional weddings, Easter, and Christmas). During peak dates, hotel rooms book out at ₦25,000–₦60,000/night. Launching with this checklist ensures 100% direct bookings with <strong className="text-white">zero 20% commission loss to OTAs</strong>, automated 24/7 WhatsApp room sales, and Day-1 5-star Google review authority.
            </p>
          </div>

          {/* 8-PHASE CHECKLIST */}
          <div className="mt-8 space-y-4">
            
            {/* Phase 1 */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-900 uppercase">Phase 1: Brand Identity, Naming & Statutory Foundation</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">T-minus 60 Days</span>
              </div>
              <ul className="mt-3 text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Brand Naming & Domain Check:</strong> Confirm clean, available name and register official <code>.com</code> or <code>.com.ng</code> domain.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>CAC Corporate Registration:</strong> Register Limited Liability Company / Business Name for corporate banking and tax compliance.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Corporate Visual Suite:</strong> High-res logo, brand typography, signboards, staff uniform badges, and linen embroidery templates.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Commercial Banking Setup:</strong> Dedicated corporate NUBAN account with merchant settlement sub-accounts.</span>
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-900 uppercase">Phase 2: Google Maps & Local Search Dominance</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">T-minus 45 Days</span>
              </div>
              <ul className="mt-3 text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Google Business Profile (GBP) Creation:</strong> Drop exact GPS coordinates in Oru, Ahiara Mbaise along the expressway feeder route.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>GBP Address Verification:</strong> Complete video or postcard verification before gates open to ensure Day-1 search ranking.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Core Amenities Tagging:</strong> Standby 24/7 Generator, Air-Conditioned Suites, Gated Security, Pool, Restaurant & Bar, Breakfast.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Geo-Tagged Photography:</strong> Upload 25+ high-res architectural photos tagged to Ahiara Mbaise coordinates.</span>
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-900 uppercase">Phase 3: Direct Booking Website & 0% OTA Engine</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">T-minus 30 Days</span>
              </div>
              <ul className="mt-3 text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Mobile-First Booking Website:</strong> High-speed 5–8 page website showcasing room types, suite rates, and event halls.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Paystack / Monnify Checkout:</strong> Direct online payments (Debit Card, USSD, Bank Transfer) landing 100% of guest revenue in your account.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Eliminate 20% OTA Tax:</strong> Prevent ₦3,000–₦6,000 commission losses per room night to Hotels.ng and Booking.com.</span>
                </li>
              </ul>
            </div>

            {/* Phase 4 */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-900 uppercase">Phase 4: 24/7 Autonomous WhatsApp AI Concierge Bot</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">T-minus 25 Days</span>
              </div>
              <ul className="mt-3 text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Official WhatsApp Business API:</strong> Connect dedicated business line with automated sub-15s response speed.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Autonomous Room Sales:</strong> Sends room photos, live tariffs, bar/kitchen menus, and check-in policies inside WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Instant Payment Links:</strong> Dispatches Paystack payment links in chat and issues instant booking vouchers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Late-Night Arrival Alert:</strong> Automatically alerts front desk when midnight travelers are en route.</span>
                </li>
              </ul>
            </div>

            {/* Phase 5 */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-900 uppercase">Phase 5: Cloud Property Management System (PMS) & Multi-POS</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">T-minus 20 Days</span>
              </div>
              <ul className="mt-3 text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Visual Room Rack Calendar:</strong> Interactive cloud availability grid (Available, Occupied, Cleaning, Maintenance).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Integrated Restaurant & Bar POS:</strong> Direct drink and meal billing to guest room folio, settled upon checkout.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Multi-Channel OTA Calendar Sync:</strong> 2-way sync with Booking.com and Airbnb to eliminate double-bookings forever.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Daily Cashier Night Audit:</strong> Automated revenue reports reconciling POS slips, cash, and transfers against physical occupancy.</span>
                </li>
              </ul>
            </div>

            {/* Phase 6 */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-900 uppercase">Phase 6: Front-Desk Review Acceleration System</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">T-minus 15 Days</span>
              </div>
              <ul className="mt-3 text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Acrylic NFC + QR Stands:</strong> Heavy-duty branded review stands on reception desk, restaurant, and executive suites.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Smart 2-Way Review Gateway:</strong> Routes 5-star guests straight to Google Maps in 30 seconds; diverts complaints privately to management.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Automated Post-Checkout Follow-up:</strong> WhatsApp thank-you message delivered 2 hours after checkout with review link.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Front-Desk Incentive Matrix:</strong> ₦500 bonus for receptionists for every verified 5-star review mentioning their service.</span>
                </li>
              </ul>
            </div>

            {/* Phase 7 */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-900 uppercase">Phase 7: Physical Wayfinding & Transit Signage</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">T-minus 15 Days</span>
              </div>
              <ul className="mt-3 text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Ahiara Junction Approach Billboard:</strong> Clear directional sign at the major junction indicating distance and turnoff.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Oru Feeder Road Directional Signage:</strong> Reflective directional markers along the access road to eliminate traveler confusion.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Perimeter Gate Illuminated Signage:</strong> Floodlit / backlit exterior corporate gate sign visible at night.</span>
                </li>
              </ul>
            </div>

            {/* Phase 8 */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-900 uppercase">Phase 8: Launch Marketing & Diaspora/Wedding Campaign</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">T-minus 10 Days</span>
              </div>
              <ul className="mt-3 text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>4K Facility Video Shoot:</strong> Professional video reels highlighting suites, bar ambiance, and chef delicacies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Event Planner Database Outreach:</strong> Connect with wedding planners and church diocesan coordinators across Mbaise.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm mt-0.5 flex-shrink-0 bg-white"></span>
                  <span><strong>Targeted Meta Ad Blitz:</strong> Run Facebook/Instagram ads targeting Mbaise indigenes in Lagos, Abuja, Port Harcourt, and diaspora.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Turnkey Packages Table */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-300">
              Sales Cowboy Turnkey Launch Packages
            </h3>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <th className="p-2 font-semibold">Component</th>
                    <th className="p-2 font-semibold">Deliverables</th>
                    <th className="p-2 font-semibold">Delivery Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 font-medium text-slate-900">1. Direct Booking Website</td>
                    <td className="p-2 text-slate-600">5–8 Custom Pages, Room Catalog, Paystack/Monnify Checkout, Domain & 1 Yr Cloud Hosting</td>
                    <td className="p-2 font-semibold text-slate-800">7 Days</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">2. 24/7 WhatsApp AI Bot</td>
                    <td className="p-2 text-slate-600">Official WhatsApp API, Automated Room Photos, Rates, Instant Payment Links & Vouchers</td>
                    <td className="p-2 font-semibold text-slate-800">7 Days</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">3. Google Business Profile</td>
                    <td className="p-2 text-slate-600">Complete GBP Setup, Map Pin Drop, Verification & Geo-Tagged Photo Curation</td>
                    <td className="p-2 font-semibold text-slate-800">5 Days</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">4. Smart Review QR Stands</td>
                    <td className="p-2 text-slate-600">2x Custom Acrylic Front-Desk Stands (NFC + Dynamic QR) & Negative Review Gatekeeper</td>
                    <td className="p-2 font-semibold text-slate-800">5 Days</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">5. Cloud Hotel PMS Software</td>
                    <td className="p-2 text-slate-600">Room Rack Calendar, Front-Desk Check-In/Out, Bar/Restaurant POS & Multi-Channel Sync</td>
                    <td className="p-2 font-semibold text-slate-800">14 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Contact Details */}
          <div className="mt-8 pt-6 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-500 gap-4">
            <div>
              <p className="font-bold text-slate-800 uppercase">SALES COWBOY MARKETING SOLUTIONS</p>
              <p>36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria</p>
              <p>Direct: +234 810 493 3232 • Email: hello@salescowboy.com.ng</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-mono text-[11px] text-slate-400">CHK-MBAISE-2026-001</p>
              <p className="text-slate-700 font-semibold mt-0.5">HOSPITALITY SYSTEMS & REVENUE</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

