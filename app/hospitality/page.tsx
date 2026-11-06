"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Check,
  ArrowRight,
  Globe,
  Bot,
  MessageSquare,
  Building2,
  ShieldCheck,
  Hotel,
  KeyRound,
  FileDown,
  LayoutDashboard,
  MapPin,
  Video,
  QrCode,
  Star,
  Camera,
  CheckCircle2,
  Play,
  Layers,
  TrendingUp,
} from "lucide-react";

type AudienceMode = "hotels" | "shortlets";
type HeroTab = "website" | "bot" | "hms";

const WHATSAPP_NUMBER = "2348082697841";
const waUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function HospitalityPackagesPage() {
  const [audience, setAudience] = useState<AudienceMode>("hotels");
  const [heroTab, setHeroTab] = useState<HeroTab>("bot");
  const [launchAndRank, setLaunchAndRank] = useState<boolean>(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // 2-Step Bottom Audit & Demo Form State
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [leadName, setLeadName] = useState("");
  const [propertyNameCity, setPropertyNameCity] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [propertySize, setPropertySize] = useState("Hotel (1-20 Rooms)");
  const [interestedPackages, setInterestedPackages] = useState<string[]>([
    "24/7 AI Concierge Suite (₦420k)",
  ]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleInterest = (pkg: string) => {
    setInterestedPackages((prev) =>
      prev.includes(pkg) ? prev.filter((item) => item !== pkg) : [...prev, pkg]
    );
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !propertyNameCity.trim() || !leadPhone.trim()) return;
    setFormStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `Hello Sales Cowboy! I just completed the Hospitality Audit & Demo form.\n\n` +
      `• Name: ${leadName}\n` +
      `• Property & City: ${propertyNameCity}\n` +
      `• WhatsApp: ${leadPhone}\n` +
      `• Property Type: ${propertySize}\n` +
      `• Interested In: ${interestedPackages.join(", ") || "Custom Recommendation"}\n\n` +
      `Please send me the live AI Booking Bot demo and my property audit.`;
    window.open(waUrl(msg), "_blank", "noopener,noreferrer");
  };

  const powerUps = [
    {
      id: "review-bot",
      price: "+ ₦75,000 One-Time",
      amount: 75000,
      title: "Automated 5-Star Review & Repeat-Guest Bot",
      desc: "2 hours after a guest checks out in your HMS, our WhatsApp bot automatically thanks them, requests a Google Review, and issues a 10% repeat-booking discount code.",
      icon: Star,
    },
    {
      id: "qr-menu-pos",
      price: "+ ₦150,000 One-Time",
      amount: 150000,
      title: "Bar, Lounge & Room-Service QR Menu + POS Sync",
      desc: "Guests scan a table, poolside, or bedside QR code to order food and drinks from their phone. Orders print at the bar/kitchen and log straight into the owner's HMS ledger.",
      icon: QrCode,
    },
    {
      id: "content-shoot",
      price: "+ ₦120,000 One-Off",
      amount: 120000,
      title: "On-Site Property Content Shoot Day",
      desc: "We send a cameraman to your hotel or shortlets to film 30+ raw vertical clips and crisp room photos for the quarter so you don't have to lift a finger.",
      icon: Camera,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-foreground selection:text-background">
      <Header />

      <main className="flex-1 pt-16 md:pt-20">
        {/* STICKY NOTIFICATION & PDF BAR */}
        <div className="bg-slate-950 border-b border-slate-800 text-white py-3 px-4">
          <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-medium text-slate-200 text-center sm:text-left">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>
                Taking on <strong className="text-white">4 New Properties This Month</strong> for Custom HMS &amp; AI Booking Setup
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="/Sales-Cowboy-Hospitality-Packages.pdf"
                download="Sales-Cowboy-Hospitality-Packages.pdf"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-300 hover:text-white underline underline-offset-4"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download PDF Brochure</span>
              </a>
              <a
                href="#audit-form"
                className="font-bold text-white hover:text-slate-300 inline-flex items-center gap-1"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 1: EXECUTIVE HERO */}
        <section className="bg-slate-950 text-white py-16 sm:py-24 border-b border-slate-800">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Copy & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs font-bold uppercase tracking-wider">
                  FOR HOTELS, SERVICED APARTMENTS &amp; MULTI-UNIT AIRBNB HOSTS
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-black tracking-tight leading-[1.12] text-white">
                  Stop Losing Bookings to Slow WhatsApp Replies, Empty Mid-Week Rooms &amp; Front-Desk Leaks.
                </h1>

                <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
                  We build automated direct-booking engines, 24/7 WhatsApp AI receptionists, and anti-theft Property Management Systems, backed by aggressive Google Maps and Social Media growth that keeps your rooms booked year-round.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href="#packages"
                    className="px-7 py-4 rounded-xl bg-white text-slate-950 font-extrabold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:bg-slate-100 transition-all shadow-lg"
                  >
                    <span>View Packages &amp; Pricing</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={waUrl(
                      "Hello Sales Cowboy! I want to test your live 24/7 WhatsApp AI Booking Bot and view the Hospitality System demo."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-slate-700 inline-flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Test Live AI Booking Bot</span>
                  </a>

                  <a
                    href="/Sales-Cowboy-Hospitality-Packages.pdf"
                    download="Sales-Cowboy-Hospitality-Packages.pdf"
                    className="px-5 py-4 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 inline-flex items-center justify-center gap-2 transition-all"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>PDF Rate Card</span>
                  </a>
                </div>

                {/* Trust Micro-Copy */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    One-Time Software Ownership Available
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Paystack / Flutterwave Direct to Your Bank
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    7 to 14 Day Turnaround
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive 3-Tab Visual System Mockup */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  {/* 3 Switchable Tabs */}
                  <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1">
                    <button
                      type="button"
                      onClick={() => setHeroTab("bot")}
                      className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        heroTab === "bot"
                          ? "bg-white text-slate-950 shadow-xs"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      1. WhatsApp AI Bot
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroTab("website")}
                      className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        heroTab === "website"
                          ? "bg-white text-slate-950 shadow-xs"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      2. Booking Site
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroTab("hms")}
                      className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        heroTab === "hms"
                          ? "bg-white text-slate-950 shadow-xs"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      3. Owner HMS
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6 min-h-[340px] flex flex-col justify-between">
                    {heroTab === "bot" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div>
                            <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold block">
                              LIVE AUTONOMOUS RECEPTIONIST
                            </span>
                            <h3 className="text-sm font-bold text-white">
                              Replies in 3 Seconds • 24/7
                            </h3>
                          </div>
                          <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                            09:42 PM
                          </span>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div className="bg-slate-800 text-slate-200 p-3.5 rounded-xl rounded-tl-none max-w-[85%]">
                            <p className="font-semibold text-white mb-0.5">Guest Inquiry:</p>
                            &ldquo;Hi, do you have a 2-bedroom apartment or executive room available this Friday to Sunday?&rdquo;
                          </div>

                          <div className="bg-white text-slate-950 p-3.5 rounded-xl rounded-tr-none ml-auto max-w-[90%] shadow-md">
                            <p className="font-bold text-slate-950 mb-1">
                              AI Receptionist (Instant - 3s later):
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                              Welcome! Yes, our <strong>Executive Suite</strong> is available for Fri-Sun (2 Nights).
                            </p>
                            <div className="mt-2 pt-2 border-t border-slate-200 font-mono text-[11px] text-slate-900 space-y-1">
                              <div>• Rate: ₦85,000 / night (Total: ₦170,000)</div>
                              <div>• Instant Paystack Link: paystack.com/pay/suite-04</div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                          <span>Status: Payment Confirmed</span>
                          <span className="text-emerald-400 font-bold">Auto-Logged to HMS ✓</span>
                        </div>
                      </div>
                    )}

                    {heroTab === "website" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div>
                            <span className="font-mono text-[10px] uppercase text-slate-400 font-bold block">
                              0% COMMISSION DIRECT CHECKOUT
                            </span>
                            <h3 className="text-sm font-bold text-white">
                              Custom Direct Booking Engine
                            </h3>
                          </div>
                          <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-white">
                            Mobile-First
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {[
                            {
                              unit: "Deluxe King Room / Studio",
                              price: "₦45,000 / night",
                              status: "4 Available",
                            },
                            {
                              unit: "Executive Diplomatic Suite",
                              price: "₦85,000 / night",
                              status: "2 Available",
                            },
                            {
                              unit: "2-Bed Luxury Serviced Apartment",
                              price: "₦130,000 / night",
                              status: "1 Left",
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between"
                            >
                              <div>
                                <p className="text-xs font-bold text-white">{item.unit}</p>
                                <p className="font-mono text-xs text-slate-400 mt-0.5">
                                  {item.price}
                                </p>
                              </div>
                              <span className="px-3 py-1.5 rounded-lg bg-white text-slate-950 font-bold text-xs">
                                Book Direct
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-lg bg-slate-800/70 text-xs text-slate-300">
                          100% of guest payments settle directly into your corporate bank account via Paystack or Flutterwave.
                        </div>
                      </div>
                    )}

                    {heroTab === "hms" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div>
                            <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold block">
                              ANTI-LEAKAGE OWNER DASHBOARD
                            </span>
                            <h3 className="text-sm font-bold text-white">
                              Live Front-Desk &amp; Revenue OS
                            </h3>
                          </div>
                          <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-white">
                            Live Sync
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">
                              MONTHLY DIRECT REVENUE
                            </span>
                            <span className="font-mono text-xl font-black text-white mt-1 block">
                              ₦6,420,000
                            </span>
                          </div>
                          <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">
                              LIVE OCCUPANCY
                            </span>
                            <span className="font-mono text-xl font-black text-emerald-400 mt-1 block">
                              86% Booked
                            </span>
                          </div>
                        </div>

                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                          <div className="flex justify-between text-slate-300">
                            <span>Room 104 • Checked In (2:14 PM)</span>
                            <span className="font-mono font-bold text-white">₦65,000 Paid</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Suite 201 • WhatsApp Bot Booking</span>
                            <span className="font-mono font-bold text-white">₦120,000 Paid</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Unrecorded Cash / Staff Discrepancy</span>
                            <span className="font-mono font-bold text-emerald-400">₦0 Leakage</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE "3 LEAKS" PROBLEM AGITATION BLOCK */}
        <section className="py-20 sm:py-24 border-b border-border bg-card/40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-muted-foreground block mb-2">
                THE DIAGNOSTIC REALITY
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
                Why Most Properties Leave Millions on the Table Every Month
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-2xl p-7 sm:p-8 shadow-xs">
                <span className="font-mono text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-secondary text-foreground">
                  LEAK 01
                </span>
                <h3 className="text-xl font-black text-foreground mt-4 mb-3">
                  The 9:00 PM WhatsApp Ghost
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  A guest sees your reel at 9:30 PM and messages on WhatsApp to book for the weekend. Your receptionist replies 3 hours later or the next morning. By then, the guest has already paid the hotel down the street.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-7 sm:p-8 shadow-xs">
                <span className="font-mono text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-secondary text-foreground">
                  LEAK 02
                </span>
                <h3 className="text-xl font-black text-foreground mt-4 mb-3">
                  The &ldquo;Invisible on Google&rdquo; Trap
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Corporate travelers and diaspora guests don&apos;t scroll Instagram to find a place to stay. They search <em>&ldquo;Best hotel or shortlet in [City]&rdquo;</em> on Google Maps. If you aren&apos;t in the Top 3, they never even know you exist.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-7 sm:p-8 shadow-xs">
                <span className="font-mono text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-secondary text-foreground">
                  LEAK 03
                </span>
                <h3 className="text-xl font-black text-foreground mt-4 mb-3">
                  Manual Ledgers &amp; Front-Desk Leaks
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Relying on paper notebooks, Excel sheets, and manual bank transfer screenshots leads to double-bookings, unrecorded short-stays, and staff pocketing cash while you aren&apos;t on site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: STEP 1 - ONE-TIME INFRASTRUCTURE SETUPS */}
        <section id="packages" className="py-20 sm:py-28 scroll-mt-16">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Header + Audience Switcher */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-8 border-b border-border">
              <div>
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-muted-foreground block mb-2">
                  STEP 1: ONE-TIME INFRASTRUCTURE SETUPS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
                  Own Your Booking &amp; Management System
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mt-2">
                  Pay once. Own your system outright. Zero monthly software licensing fees.
                </p>
              </div>

              {/* Interactive Audience Switcher */}
              <div className="inline-flex p-1.5 rounded-xl bg-secondary border border-border self-start lg:self-auto">
                <button
                  type="button"
                  onClick={() => setAudience("hotels")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                    audience === "hotels"
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Hotel className="w-4 h-4" />
                  <span>For Hotels &amp; Resorts</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAudience("shortlets")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                    audience === "shortlets"
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>For Shortlets &amp; Airbnbs</span>
                </button>
              </div>
            </div>

            {/* 3 Primary One-Time Setup Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* CARD 1: DIRECT BOOKING FOUNDATION */}
              <div className="rounded-2xl border border-border bg-card p-7 sm:p-9 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="inline-block font-mono text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded bg-secondary text-foreground mb-4">
                    STARTER INFRASTRUCTURE
                  </span>
                  <h3 className="text-2xl font-black text-foreground">
                    {launchAndRank
                      ? 'The "Launch & Rank" Bundle'
                      : "The Direct Booking Foundation"}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono text-4xl sm:text-5xl font-black text-foreground">
                      {launchAndRank ? "₦250,000" : "₦200,000"}
                    </span>
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      One-Time Payment
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-muted-foreground pb-5 border-b border-border">
                    Best For: Single Shortlets, Guest Houses &amp; Boutique Hotels ready to take automated online bookings.
                  </p>

                  <ul className="mt-6 space-y-3.5 text-sm sm:text-base text-foreground">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                      <span>
                        <strong>Custom Direct Booking Website:</strong> Live{" "}
                        {audience === "hotels" ? "room & suite" : "apartment unit"} calendar, photo galleries, and instant Paystack/Flutterwave checkout direct to your bank.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                      <span>
                        <strong>Google Business Profile (GBP) Setup:</strong> Full verification and optimization so guests find you on Google Maps.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                      <span>
                        <strong>Local SEO Configuration:</strong> Search engine setup targeting high-intent travelers in your city.
                      </span>
                    </li>
                    {launchAndRank && (
                      <li className="flex items-start gap-3 bg-secondary/70 p-3 rounded-lg border border-border">
                        <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                        <span>
                          <strong>PLUS 1 Full Month of Active GBP &amp; Local SEO Management</strong> to push your rankings immediately.
                        </span>
                      </li>
                    )}
                  </ul>

                  {/* Interactive Upgrade Toggle Inside Card */}
                  <div className="mt-6 p-4 rounded-xl bg-secondary/60 border border-border">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={launchAndRank}
                        onChange={(e) => setLaunchAndRank(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-slate-950 rounded cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm leading-snug text-foreground">
                        <strong>Switch to &ldquo;Launch &amp; Rank&rdquo; Bundle (₦250,000):</strong> Adds 1 Full Month of active Google Business Profile &amp; Local SEO ranking push.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border">
                  <a
                    href={waUrl(
                      launchAndRank
                        ? "Hello Sales Cowboy! I want to order the ₦250,000 'Launch & Rank' Bundle (Website + Booking + 1 Month Active GBP SEO)."
                        : "Hello Sales Cowboy! I want to order the ₦200,000 'Direct Booking Foundation' Package."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-5 rounded-xl bg-foreground text-background font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                  >
                    <span>
                      {launchAndRank
                        ? "Select Launch & Rank (₦250k)"
                        : "Select Foundation Package"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* CARD 2: THE 24/7 AI CONCIERGE SUITE (FEATURED) */}
              <div className="rounded-2xl border-2 border-foreground bg-slate-950 text-white p-7 sm:p-9 flex flex-col justify-between shadow-2xl relative">
                <div>
                  <span className="inline-block font-mono text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded bg-white text-slate-950 mb-4">
                    MOST POPULAR • HOTELS &amp; SHORTLETS
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    The 24/7 AI Concierge Suite
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono text-4xl sm:text-5xl font-black text-white">
                      ₦420,000
                    </span>
                    <span className="text-xs font-bold uppercase text-slate-400">
                      One-Time • No Subscription
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-300 pb-5 border-b border-slate-800">
                    Best For: Busy 10-30 room hotels and multi-unit Airbnb hosts tired of replying to DMs manually day and night.
                  </p>

                  <ul className="mt-6 space-y-3.5 text-sm sm:text-base text-slate-200">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Complete Direct Booking Website:</strong> Full showcase, live availability engine, and instant payment integration.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">24/7 WhatsApp AI Booking Agent:</strong> Replies to guests in 3 seconds flat, checks live availability, answers FAQs, sends payment links, and confirms reservations automatically.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Live Reservation Sync:</strong> The bot reads and updates your booking calendar in real time with zero double-bookings.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        {audience === "shortlets" ? (
                          <>
                            <strong className="text-white">Shortlet Automation Built-In:</strong> Automated Caution-Fee prompts, ID upload collection, and smart gate-pass/Wi-Fi code delivery upon payment.
                          </>
                        ) : (
                          <>
                            <strong className="text-white">Hotel Front-Desk Sync:</strong> Automated room-tier upsells, breakfast/pool policy replies, and instant booking vouchers sent to reception.
                          </>
                        )}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 space-y-2.5">
                  <a
                    href={waUrl(
                      "Hello Sales Cowboy! I want to deploy the ₦420,000 '24/7 AI Concierge Suite' (Direct Booking Website + WhatsApp AI Booking Agent)."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-5 rounded-xl bg-white text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
                  >
                    <span>Deploy Website + AI Bot</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={waUrl(
                      "Hello Sales Cowboy! Please send me the 60-second live demo of the WhatsApp AI Booking Bot in action."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm border border-slate-800 flex items-center justify-center gap-2 transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Watch 60s Bot Demo on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* CARD 3: THE AUTONOMOUS HOSPITALITY OS */}
              <div className="rounded-2xl border border-border bg-card p-7 sm:p-9 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="inline-block font-mono text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded bg-secondary text-foreground mb-4">
                    ENTERPRISE &amp; MULTI-UNIT STANDARD
                  </span>
                  <h3 className="text-2xl font-black text-foreground">
                    The Autonomous Hospitality OS
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono text-4xl sm:text-5xl font-black text-foreground">
                      ₦800,000
                    </span>
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      One-Time • No Subscription
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-muted-foreground pb-5 border-b border-border">
                    Best For: Established Hotels (20-100+ Rooms) &amp; Multi-Property Shortlet Portfolios that want total control and zero staff leakage.
                  </p>

                  <ul className="mt-6 space-y-3.5 text-sm sm:text-base text-foreground">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                      <span>
                        <strong>Custom Direct Booking Website</strong> with integrated Paystack/Flutterwave payment gateway.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                      <span>
                        <strong>Full Hotel / Property Management Software (HMS):</strong>{" "}
                        {audience === "hotels"
                          ? "Front-desk check-in/check-out, room status & housekeeping tracker, staff role permissions, and a live Owner Revenue Dashboard on your phone."
                          : "Multi-property apartment calendar, cleaner & maintenance dispatch tracker, caution-fee ledger, and a live Owner Revenue Dashboard on your phone."}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                      <span>
                        <strong>Integrated 24/7 WhatsApp AI Chatbot:</strong> Directly wired into your HMS reservation ledger so every WhatsApp booking appears on the front-desk screen automatically.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                      <span>
                        <strong>100% License Ownership:</strong> Custom deployment on your domain with no per-room or monthly SaaS tax.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-border space-y-2.5">
                  <a
                    href={waUrl(
                      "Hello Sales Cowboy! I want to order the ₦800,000 'Autonomous Hospitality OS' (Website + Full HMS + 24/7 WhatsApp AI Bot)."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-5 rounded-xl bg-foreground text-background font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                  >
                    <span>Get the Full Hospitality OS</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={waUrl(
                      "Hello Sales Cowboy! I would like to book a live walkthrough of the Autonomous Hospitality OS (HMS + AI Bot)."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Book Live System Walkthrough</span>
                  </a>
                </div>
              </div>
            </div>

            {/* STANDALONE & SPECIALIZED INFRASTRUCTURE BANNER ROW */}
            <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8">
              <div className="mb-6">
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
                  SPECIALIZED &amp; STANDALONE SETUPS
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-foreground mt-1">
                  Already Have a Website, or Managing a Multi-Unit Airbnb Portfolio?
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Shortlet Portfolio Engine */}
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h4 className="text-lg font-black text-foreground">
                        Shortlet &amp; Airbnb Portfolio Engine
                      </h4>
                    </div>
                    <div className="font-mono text-2xl font-black text-foreground mb-3">
                      ₦350,000{" "}
                      <span className="text-xs font-semibold text-muted-foreground uppercase">
                        One-Time
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Built for hosts managing 3 to 15+ apartments: Multi-apartment booking site + WhatsApp Automated Caution-Fee &amp; ID-Verification Bot + Smart Check-In Guide (auto-sends Wi-Fi code &amp; gate pass once payment clears).
                    </p>
                  </div>
                  <a
                    href={waUrl(
                      "Hello Sales Cowboy! I want the ₦350,000 'Shortlet & Airbnb Portfolio Engine' for my apartments."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 py-3 px-4 rounded-lg bg-foreground text-background font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:opacity-90"
                  >
                    <span>Order Portfolio Engine</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Standalone HMS */}
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-black text-foreground mb-2">
                      Standalone Hotel / Property Management App
                    </h4>
                    <div className="font-mono text-2xl font-black text-foreground mb-3">
                      ₦500,000{" "}
                      <span className="text-xs font-semibold text-muted-foreground uppercase">
                        One-Time
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Already have a website you love? We custom-deploy our full HMS Web App on your server and integrate it seamlessly into your site. Includes front-desk OS, room inventory, housekeeping, and owner financial dashboard.
                    </p>
                  </div>
                  <a
                    href={waUrl(
                      "Hello Sales Cowboy! I already have a website and want to deploy the ₦500,000 Standalone Hotel/Property Management Software (HMS)."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 py-3 px-4 rounded-lg bg-foreground text-background font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:opacity-90"
                  >
                    <span>Request Standalone HMS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Basic 3-Page Site */}
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-black text-foreground mb-2">
                      Simple Corporate Presence Website
                    </h4>
                    <div className="font-mono text-2xl font-black text-foreground mb-3">
                      ₦85,000{" "}
                      <span className="text-xs font-semibold text-muted-foreground uppercase">
                        One-Time
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Need a clean, fast digital brochure first? Includes a 3-page mobile-ready hotel or apartment showcase website with room galleries, Google Maps pin, and direct WhatsApp enquiry routing.
                    </p>
                  </div>
                  <a
                    href={waUrl(
                      "Hello Sales Cowboy! I want to order the ₦85,000 Basic 3-Page Corporate Presence Website."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 py-3 px-4 rounded-lg bg-secondary text-foreground border border-border font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:bg-secondary/80"
                  >
                    <span>Order Basic 3-Page Site</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: STEP 2 - MONTHLY OCCUPANCY & GROWTH RETAINERS */}
        <section className="py-20 sm:py-28 bg-slate-950 text-white border-y border-slate-800">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-3xl mb-14">
              <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-emerald-400 block mb-2">
                STEP 2: MONTHLY OCCUPANCY &amp; GROWTH ENGINES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Fill Your Rooms Every Weekend
              </h2>
              <p className="text-base sm:text-lg text-slate-300 mt-3">
                Now that your booking engine is built, pour high-paying corporate and weekend guests into it every week with consistent visibility, creator video reels, and hands-off technical care.
              </p>
            </div>

            {/* 4-Column Monthly Retainers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {/* Tier 1 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase text-slate-400 block">
                    TIER 1: SYSTEM CARE
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    Website &amp; System Care Plan
                  </h3>
                  <div className="mt-4 font-mono text-3xl font-black text-white">
                    ₦50,000{" "}
                    <span className="text-xs font-normal text-slate-400">/ mo</span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 pb-4 border-b border-slate-800">
                    Keep your digital front door, AI bot, and HMS fast, secure, and updated.
                  </p>
                  <ul className="mt-5 space-y-3 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Unlimited room rate &amp; text updates</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Seasonal promo banner swaps</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Server hosting, SSL &amp; daily database backups</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>WhatsApp &amp; AI API health monitoring</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Priority support via Client Portal</span>
                    </li>
                  </ul>
                </div>
                <a
                  href={waUrl(
                    "Hello Sales Cowboy! I want to subscribe to the ₦50,000/mo Website & System Care Plan."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm text-center transition-all"
                >
                  Add Care Plan
                </a>
              </div>

              {/* Tier 2 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase text-slate-400 block">
                    TIER 2: LOCAL SEARCH
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    Google Maps Dominance
                  </h3>
                  <div className="mt-4 font-mono text-3xl font-black text-white">
                    ₦100,000{" "}
                    <span className="text-xs font-normal text-slate-400">/ mo</span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 pb-4 border-b border-slate-800">
                    Own the Top 3 spots when guests search Google Maps in your city.
                  </p>
                  <ul className="mt-5 space-y-3 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Weekly Google Business Profile updates &amp; offers</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Geo-tagged room &amp; facility photo optimization</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Automated 5-star guest review generation</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Monthly local citation &amp; Map Pack ranking push</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Monthly Call &amp; Direction analytics</span>
                    </li>
                  </ul>
                </div>
                <a
                  href={waUrl(
                    "Hello Sales Cowboy! I want to start the ₦100,000/mo Google Maps & Local SEO Dominance retainer."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm text-center transition-all"
                >
                  Start Ranking #1
                </a>
              </div>

              {/* Tier 3 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase text-slate-400 block">
                    TIER 3: BRAND PRESTIGE
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    Hospitality Social Engine
                  </h3>
                  <div className="mt-4 font-mono text-3xl font-black text-white">
                    ₦150,000{" "}
                    <span className="text-xs font-normal text-slate-400">/ mo</span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 pb-4 border-b border-slate-800">
                    Look like the most prestigious property in town across IG, FB &amp; TikTok.
                  </p>
                  <ul className="mt-5 space-y-3 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Full Social Media Management (IG, FB, TikTok)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Monthly content calendar &amp; high-end graphics</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Pro editing of your raw property clips into Reels</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Daily caption writing &amp; DM comment routing</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>1-Click approval in your Client Portal</span>
                    </li>
                  </ul>
                </div>
                <a
                  href={waUrl(
                    "Hello Sales Cowboy! I want to start the ₦150,000/mo Hospitality Social Media Engine."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm text-center transition-all"
                >
                  Start Social Engine
                </a>
              </div>

              {/* Tier 4: Best Seller */}
              <div className="rounded-2xl border-2 border-white bg-slate-900 p-6 sm:p-7 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="inline-block font-mono text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-white text-slate-950 mb-2">
                    TIER 4 • BEST SELLER
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Viral UGC + Social Suite
                  </h3>
                  <div className="mt-4 font-mono text-3xl font-black text-white">
                    ₦270,000{" "}
                    <span className="text-xs font-normal text-slate-400">/ mo</span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 pb-4 border-b border-slate-800">
                    Creator-led video walkthroughs that turn scrollers into paying guests.
                  </p>
                  <ul className="mt-5 space-y-3 text-xs sm:text-sm text-slate-100">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Everything in Hospitality Social Engine (₦150k value)</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>4 Custom UGC Videos / Month:</strong> Authentic creator videos showcasing your rooms, pool, bar, or apartment vibe
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        Engineered specifically to go viral organically and convert cold Paid Ad traffic
                      </span>
                    </li>
                  </ul>
                </div>
                <a
                  href={waUrl(
                    "Hello Sales Cowboy! I want to launch the ₦270,000/mo Viral UGC + Social Suite for my property."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 w-full py-3.5 px-4 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm text-center transition-all"
                >
                  Launch UGC + Social
                </a>
              </div>
            </div>

            {/* High-Ticket Monthly Bundle & Paid Ads Banner */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Full Occupancy All-In-One Bundle */}
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-extrabold uppercase text-emerald-400 block">
                    ALL-IN-ONE GROWTH DEPARTMENT • SAVE ₦40,000/MO
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    The &ldquo;Full Occupancy&rdquo; Monthly Bundle
                  </h3>
                  <div className="mt-3 font-mono text-3xl sm:text-4xl font-black text-white">
                    ₦380,000{" "}
                    <span className="text-sm font-normal text-slate-400">/ month</span>
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    Combines <strong>Viral UGC &amp; Social Suite (₦270k)</strong> +{" "}
                    <strong>Google Maps &amp; Local SEO (₦100k)</strong> +{" "}
                    <strong>Website &amp; System Care (₦50k)</strong> into one dominant monthly growth department.
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={waUrl(
                      "Hello Sales Cowboy! I want the ₦380,000/mo 'Full Occupancy' All-In-One Retainer Bundle."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-extrabold text-sm hover:bg-slate-100 transition-all"
                  >
                    <span>Lock In Full Occupancy Bundle</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Weekend Occupancy Paid Ads Accelerator */}
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-extrabold uppercase text-slate-400 block">
                    FILL ROOMS THIS FRIDAY
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    Weekend Occupancy &amp; Paid Ads Accelerator
                  </h3>
                  <div className="mt-3 font-mono text-3xl sm:text-4xl font-black text-white">
                    ₦200,000{" "}
                    <span className="text-sm font-normal text-slate-400">
                      / month (+ Ad Spend)
                    </span>
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    We build, manage, and optimize your <strong>Meta Ads</strong> (IG/WhatsApp direct-to-booking) + <strong>Google Search Ads</strong> (<em>&ldquo;Shortlet or Hotel in [City]&rdquo;</em>) + Retargeting pixel setup + Weekly ROAS reporting.
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={waUrl(
                      "Hello Sales Cowboy! I want the ₦200,000/mo Weekend Occupancy & Paid Ads Accelerator."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-extrabold text-sm transition-all"
                  >
                    <span>Launch Paid Ads Accelerator</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: OPTIONAL PROPERTY POWER-UPS (CHECKOUT BUMPS) */}
        <section className="py-20 sm:py-24 border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-muted-foreground block mb-2">
                  OPTIONAL CHECKOUT POWER-UPS
                </span>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
                  High-Margin Property Add-Ons (Add to Any Package)
                </h2>
              </div>
              <span className="font-mono text-xs font-bold text-muted-foreground">
                Click any box below to bundle with your setup
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {powerUps.map((item) => {
                const isSelected = selectedAddons.includes(item.id);
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleAddon(item.id)}
                    className={`rounded-2xl p-6 sm:p-7 border transition-all cursor-pointer select-none flex flex-col justify-between ${
                      isSelected
                        ? "border-2 border-foreground bg-secondary/70 shadow-md"
                        : "border-border bg-card hover:border-foreground/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="font-mono text-xs font-extrabold px-3 py-1 rounded bg-foreground text-background">
                          {item.price}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                            isSelected
                              ? "bg-foreground border-foreground text-background"
                              : "border-muted-foreground/40"
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4" />}
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <Icon className="w-5 h-5 text-foreground shrink-0" />
                        <h3 className="text-lg font-black text-foreground leading-snug">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-border text-xs font-bold text-foreground flex items-center justify-between">
                      <span>{isSelected ? "Added to selection" : "Click to select add-on"}</span>
                      <span>{isSelected ? "✓ Selected" : "+ Add"}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedAddons.length > 0 && (
              <div className="mt-8 p-5 rounded-xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm">
                  <span className="font-mono text-xs uppercase text-emerald-400 font-bold block">
                    SELECTED POWER-UPS ({selectedAddons.length})
                  </span>
                  <span className="font-bold">
                    {powerUps
                      .filter((p) => selectedAddons.includes(p.id))
                      .map((p) => p.title)
                      .join(" + ")}
                  </span>
                </div>
                <a
                  href={waUrl(
                    `Hello Sales Cowboy! I want to include these Property Power-Ups with my package: ${powerUps
                      .filter((p) => selectedAddons.includes(p.id))
                      .map((p) => `${p.title} (${p.price})`)
                      .join(", ")}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-white text-slate-950 font-extrabold text-xs sm:text-sm shrink-0 hover:bg-slate-100"
                >
                  Order Selected Power-Ups on WhatsApp →
                </a>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 6: THE "CLIENT PORTAL" TRUST DIFFERENTIATOR */}
        <section className="py-20 sm:py-24 border-b border-border bg-secondary/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-muted-foreground block">
                  STRUCTURED ENGINEERING • ZERO FREELANCER DRAMA
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
                  Zero Micromanagement. Full Transparency Inside Your Sales Cowboy Portal.
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Every hospitality client gets dedicated login access to the{" "}
                  <strong className="text-foreground">Sales Cowboy Client Dashboard</strong> from Day 1:
                </p>

                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-foreground text-background font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      01
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-foreground">
                        10-Minute Guided Setup Manual
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Upload your room prices, photos, and logos in one organized place with zero messy WhatsApp group chats.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-foreground text-background font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      02
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-foreground">
                        Live Project Tracker
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Watch your booking website, WhatsApp AI bot, and HMS build progress step-by-step in real time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-foreground text-background font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      03
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-foreground">
                        1-Click Ticket &amp; Rate Update System
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Need to change your December room rates or approve next week&apos;s Reels? Log in, click submit, and consider it done.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Portal Preview Mockup */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border-2 border-foreground bg-card p-6 sm:p-8 shadow-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="w-5 h-5 text-foreground" />
                      <span className="font-mono text-xs font-extrabold uppercase text-foreground">
                        SALES COWBOY CLIENT PORTAL v2.4
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                      Active Build
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="p-4 rounded-xl bg-secondary/60 border border-border">
                      <div className="flex justify-between text-xs font-bold text-foreground mb-2">
                        <span>Deployment Progress: Website + WhatsApp AI + HMS</span>
                        <span className="font-mono">85% Complete</span>
                      </div>
                      <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
                        <div className="bg-foreground h-full w-[85%] rounded-full" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl border border-border bg-background">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase block">
                          ONBOARDING CHECKLIST
                        </span>
                        <p className="font-bold text-foreground mt-1">
                          Room Tariffs &amp; Photos Uploaded ✓
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl border border-border bg-background">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase block">
                          PAYMENT GATEWAY
                        </span>
                        <p className="font-bold text-foreground mt-1">
                          Paystack Direct Settlement Live ✓
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border bg-background flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-foreground block">
                          Seasonal Rate Change Request
                        </span>
                        <span className="text-muted-foreground">
                          Submitted via 1-Click Portal Ticket
                        </span>
                      </div>
                      <span className="font-mono font-bold px-2.5 py-1 rounded bg-secondary text-foreground">
                        Completed in 14m
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FINAL CONVERSION TRAP (2-STEP AUDIT & DEMO FORM) */}
        <section id="audit-form" className="py-20 sm:py-28 scroll-mt-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="rounded-3xl border-2 border-foreground bg-slate-950 text-white p-8 sm:p-12 shadow-2xl">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-emerald-400 block mb-2">
                  FREE 5-MINUTE BOOKING &amp; OCCUPANCY AUDIT
                </span>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                  Not Sure Which Setup Fits Your Property?
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                  Enter your property details below. Within 60 seconds, our WhatsApp system will send you a live interactive demo link, followed by a custom audit of your property&apos;s Google &amp; Social Media presence.
                </p>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-4 mb-8 font-mono text-xs">
                <span
                  className={`px-3 py-1.5 rounded-md font-bold ${
                    formStep === 1
                      ? "bg-white text-slate-950"
                      : "bg-slate-800 text-emerald-400"
                  }`}
                >
                  Step 1: Property Details {formStep === 2 && "✓"}
                </span>
                <span className="text-slate-600">→</span>
                <span
                  className={`px-3 py-1.5 rounded-md font-bold ${
                    formStep === 2
                      ? "bg-white text-slate-950"
                      : "bg-slate-900 text-slate-500 border border-slate-800"
                  }`}
                >
                  Step 2: Customize Demo
                </span>
              </div>

              {formStep === 1 ? (
                <form onSubmit={handleStep1Submit} className="space-y-5 max-w-xl mx-auto">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="e.g., Chief / Mr. / Mrs. Adewale"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Property Name &amp; City *
                    </label>
                    <input
                      type="text"
                      required
                      value={propertyNameCity}
                      onChange={(e) => setPropertyNameCity(e.target.value)}
                      placeholder="e.g., Grand Suites, Owerri / Lekki / Abuja / PH"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      WhatsApp Phone Number (For Instant Demo &amp; Audit Delivery) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="e.g., 0803 000 0000"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Continue to Step 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleFinalSubmit} className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                      Select Your Property Type:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        "Hotel (1-20 Rooms)",
                        "Hotel (21-50+ Rooms)",
                        "Shortlet / Airbnb (1-5 Units)",
                        "Shortlet Portfolio (6+ Units)",
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropertySize(type)}
                          className={`py-3 px-4 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                            propertySize === type
                              ? "bg-white text-slate-950 border-white"
                              : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                      What are you most interested in right now?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {[
                        "Direct Booking Foundation (₦200k)",
                        "Launch & Rank Bundle (₦250k)",
                        "24/7 AI Concierge Suite (₦420k)",
                        "Autonomous Hospitality OS (₦800k)",
                        "Shortlet Portfolio Engine (₦350k)",
                        "Standalone HMS Web App (₦500k)",
                        "Google Maps SEO (₦100k/mo)",
                        "Viral UGC + Social Suite (₦270k/mo)",
                      ].map((pkg) => {
                        const checked = interestedPackages.includes(pkg);
                        return (
                          <div
                            key={pkg}
                            onClick={() => toggleInterest(pkg)}
                            className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 ${
                              checked
                                ? "bg-slate-800 border-white text-white font-bold"
                                : "bg-slate-900/60 border-slate-800 text-slate-300"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center border ${
                                checked ? "bg-white border-white text-slate-950" : "border-slate-600"
                              }`}
                            >
                              {checked && <Check className="w-3 h-3" />}
                            </div>
                            <span>{pkg}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="py-4 px-5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-bold text-xs sm:text-sm cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Unlock My Free Audit &amp; Live Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
