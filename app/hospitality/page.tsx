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
  MessageCircle,
  Hotel,
  KeyRound,
  FileDown,
  Star,
  QrCode,
  Camera,
  HelpCircle,
  Clock,
  ShieldCheck,
  TrendingUp,
  Server,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AudienceMode = "hotels" | "shortlets";

const WHATSAPP_NUMBER = "2348104933232";
const waUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function HospitalityPackagesPage() {
  const [audience, setAudience] = useState<AudienceMode>("hotels");
  const [launchAndRank, setLaunchAndRank] = useState<boolean>(false);

  const faqs = [
    {
      q: "Can guests pay online using Nigerian debit cards and instant transfers?",
      a: "Yes. All our booking websites and WhatsApp AI bots are integrated directly with Paystack and Flutterwave. 100% of guest payments deposit straight into your corporate bank account with 0% OTA middleman commission.",
    },
    {
      q: "What are the running costs for websites with 24/7 WhatsApp AI bots?",
      a: "The booking software and code are one-time license fees (no software subscription). The continuous AI and cloud runtime costs approximately $10/month (~₦15,000/mo): $5/month for Railway 24/7 server hosting, and ~$5/month for WhatsApp Cloud API & OpenAI GPT tokens on pay-as-you-go. Alternatively, this is fully managed under our Website & System Care plan.",
    },
    {
      q: "How does the 24/7 WhatsApp AI Booking Concierge work?",
      a: "The AI agent is connected directly to your official WhatsApp phone number. It replies to guest inquiries in 3 seconds around the clock, checks live room availability, calculates totals, shares room photos, and sends Paystack payment links right inside WhatsApp.",
    },
    {
      q: "Can I manage multi-unit apartments or shortlets with the AI Concierge Suite?",
      a: "Yes! The 24/7 AI Concierge Suite (₦420,000) handles single and multi-unit shortlet portfolios seamlessly. It includes automated caution-fee prompts, guest ID collection, live calendar synchronization, and direct payment checkout.",
    },
    {
      q: "How fast is each package delivered?",
      a: "Standard booking websites and WhatsApp AI setups are deployed in 7 to 10 days once we receive your room prices and photos. Complete Hotel Management Systems (HMS) are configured within 14 days.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white">
      <Header />

      <main className="pt-28 pb-24 md:pt-36 md:pb-32">
        {/* TOP NOTICE & PDF BROCHURE DOWNLOAD BAR */}
        <div className="container mx-auto px-4 max-w-5xl mb-10">
          <div className="rounded-2xl border border-border bg-card/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 animate-pulse" />
              <span>
                <strong>2026 Hospitality Rate Card:</strong> Verified digital booking &amp; occupancy systems for Nigerian hotels &amp; shortlets.
              </span>
            </div>
            <a
              href="/Sales-Cowboy-Hospitality-Packages.pdf"
              download="Sales-Cowboy-Hospitality-Packages.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs sm:text-sm font-bold border border-border transition-all shrink-0"
            >
              <FileDown className="w-4 h-4 text-accent" />
              <span>Download PDF Brochure</span>
            </a>
          </div>
        </div>

        {/* HERO SECTION - BIG FONTS & BIG SPACING */}
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-6">
          <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-accent">
            FOR HOTELS, BOUTIQUE RESORTS &amp; SERVICED APARTMENTS
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.12]">
            Direct Booking, AI Automation &amp; Occupancy Systems
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-normal">
            Stop losing high-paying guests to slow WhatsApp replies, empty mid-week rooms, and 20% OTA commissions. Choose your direct booking infrastructure or monthly growth engine below.
          </p>

          {/* Quick Value Proof Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs sm:text-sm font-semibold text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              One-Time License Ownership (No Monthly Software Tax)
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              7 to 14 Day Turnaround
            </span>
            <span className="inline-flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              0% Commission Direct to Your Bank
            </span>
          </div>

          {/* AUDIENCE TOGGLE SWITCHER - CLEAN, PROMINENT, SPACIOUS */}
          <div className="pt-8 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-secondary border border-border shadow-xs">
              <button
                type="button"
                onClick={() => setAudience("hotels")}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
                  audience === "hotels"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Hotel className="w-4 h-4 text-accent" />
                <span>For Hotels &amp; Resorts</span>
              </button>
              <button
                type="button"
                onClick={() => setAudience("shortlets")}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
                  audience === "shortlets"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <KeyRound className="w-4 h-4 text-accent" />
                <span>For Shortlets &amp; Airbnbs</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 1: ONE-TIME SETUP PACKAGES (BIG CARDS, BIG FONTS) */}
        <div className="container mx-auto px-4 max-w-6xl mt-20 md:mt-28">
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-accent block">
              STEP 1: OWN YOUR INFRASTRUCTURE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              One-Time Booking &amp; Software Setups
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Pay once. Own your software and direct booking channels outright with zero monthly software licensing fees.
            </p>
          </div>

          {/* 3 Main Setup Packages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch">
            {/* Card 1: Direct Booking Foundation */}
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:border-foreground/30 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-3">
                  Starter Infrastructure
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {launchAndRank
                    ? 'The "Launch & Rank" Bundle'
                    : "Direct Booking Foundation"}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Best For: Single Shortlets, Guest Houses &amp; Boutique Hotels wanting automated direct reservations.
                </p>

                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black text-foreground tracking-tight font-mono">
                    {launchAndRank ? "₦250,000" : "₦200,000"}
                  </span>
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    / One-Time
                  </span>
                </div>

                <div className="mt-3 text-xs font-medium text-accent">
                  Renewal: ₦45,000 / year (Cloud Hosting, Domain &amp; SSL)
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                    What is Included:
                  </div>
                  <ul className="space-y-3.5 text-sm sm:text-base text-foreground/90">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
                      </div>
                      <span>
                        <strong>Custom Direct Booking Website:</strong> Live{" "}
                        {audience === "hotels" ? "room" : "apartment"} availability calendar, photo galleries, and instant Paystack / Flutterwave card &amp; transfer checkout.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
                      </div>
                      <span>
                        <strong>Google Business Profile (GBP):</strong> Complete setup and verification so guests find you on Google Maps.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
                      </div>
                      <span>
                        <strong>Local SEO Configuration:</strong> On-page search optimization targeting travelers in your city.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
                      </div>
                      <span>1 Year Cloud Hosting, .COM.NG Domain &amp; SSL Included.</span>
                    </li>
                  </ul>
                </div>

                {/* Upgrade Option Inside Card 1 */}
                <div className="mt-8 p-4 rounded-2xl bg-secondary/70 border border-border">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={launchAndRank}
                      onChange={(e) => setLaunchAndRank(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-accent rounded cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-foreground leading-snug">
                      <strong>Switch to &ldquo;Launch &amp; Rank&rdquo; (₦250,000):</strong> Adds 1 Full Month of active Google Business Profile &amp; Local SEO ranking push.
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href={waUrl(
                    launchAndRank
                      ? "Hello Sales Cowboy! I want to order the ₦250,000 'Launch & Rank' Hotel/Shortlet package."
                      : "Hello Sales Cowboy! I want to order the ₦200,000 'Direct Booking Foundation' package."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground text-background py-4 px-6 text-sm sm:text-base font-bold hover:opacity-90 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    Order {launchAndRank ? "Launch & Rank (₦250k)" : "Foundation (₦200k)"}
                  </span>
                </a>
              </div>
            </div>

            {/* Card 2: 24/7 AI Concierge Suite (FEATURED / MOST POPULAR - REPLACES SEPARATE SHORTLET ENGINE) */}
            <div className="rounded-3xl border-2 border-accent bg-card p-8 sm:p-10 flex flex-col justify-between shadow-lg relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm">
                Most Popular • Hotels &amp; Shortlets
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-3">
                  Website + 24/7 WhatsApp AI Bot
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  The 24/7 AI Concierge Suite
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Best For: Busy 10-30 room hotels and multi-unit Airbnb hosts (1-15+ units) wanting automated direct bookings without manual DM exhaustion.
                </p>

                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black text-foreground tracking-tight font-mono">
                    ₦420,000
                  </span>
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    / One-Time
                  </span>
                </div>

                <div className="mt-3 text-xs font-medium text-accent">
                  Zero monthly software license fee
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                    What is Included:
                  </div>
                  <ul className="space-y-3.5 text-sm sm:text-base text-foreground/90">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <span>
                        <strong>Complete Direct Booking Website:</strong> Multi-room/apartment catalog, live availability calendar, and instant Paystack / Flutterwave card &amp; transfer checkout.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <span>
                        <strong>24/7 WhatsApp AI Booking Agent:</strong> Replies to guest messages in 3 seconds flat, answers FAQs, shares room photos, and sends payment links directly in chat.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <span>
                        <strong>Live Reservation Sync:</strong> Reads and updates your booking calendar in real time with zero double-bookings.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <span>
                        {audience === "shortlets"
                          ? "Shortlet Automation: Automated Caution-Fee prompts and guest ID upload collection."
                          : "Hotel Front-Desk Sync: Automated room-tier upsells, breakfast/pool policy answers, and instant digital booking confirmation sent to guest & front desk."}
                      </span>
                    </li>
                  </ul>

                  {/* Cloud Runtime Transparency Note */}
                  <div className="mt-6 p-3.5 rounded-xl bg-secondary/60 border border-border flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                    <Server className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>
                      <strong>Cloud &amp; AI Runtime:</strong> Railway cloud hosting is $5/mo and WhatsApp/GPT API tokens are ~$5/mo pay-as-you-go (~$10/mo total), or fully covered under our Website &amp; System Care plan.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border space-y-3">
                <a
                  href={waUrl(
                    "Hello Sales Cowboy! I want to order the ₦420,000 '24/7 AI Concierge Suite' (Website + WhatsApp AI Booking Agent)."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-accent text-white py-4 px-6 text-sm sm:text-base font-bold hover:bg-accent/90 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order AI Concierge Suite (₦420k)</span>
                </a>
                <a
                  href={waUrl(
                    "Hello Sales Cowboy! Please send me the 60-second video demo of the WhatsApp AI Booking Bot in action."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-accent hover:underline transition-colors"
                >
                  <span>Watch 60s Live Bot Demo on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 3: Autonomous Hospitality OS */}
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:border-foreground/30 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-3">
                  Enterprise Full Stack
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Autonomous Hospitality OS
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Best For: Established Hotels (20-100+ Rooms) &amp; Multi-Property Shortlet Portfolios needing full operational control and zero staff cash leakage.
                </p>

                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black text-foreground tracking-tight font-mono">
                    ₦800,000
                  </span>
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    / One-Time
                  </span>
                </div>

                <div className="mt-3 text-xs font-medium text-accent">
                  100% License Ownership • No per-room SaaS tax
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                    What is Included:
                  </div>
                  <ul className="space-y-3.5 text-sm sm:text-base text-foreground/90">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
                      </div>
                      <span>
                        <strong>Custom Direct Booking Website</strong> with integrated Paystack/Flutterwave card &amp; transfer checkout.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
                      </div>
                      <span>
                        <strong>Full Hotel / Property Management Software (HMS):</strong> Front-desk check-in/out, room &amp; housekeeping status, staff role permissions, and live Owner Revenue Dashboard on phone.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
                      </div>
                      <span>
                        <strong>Integrated 24/7 WhatsApp AI Chatbot:</strong> Synced directly into your HMS reservation ledger—every booking shows on the front-desk screen instantly.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
                      </div>
                      <span>
                        <strong>Anti-Theft Cash Protection:</strong> Eliminates fake alerts and unrecorded stays while you are off-site.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border space-y-3">
                <a
                  href={waUrl(
                    "Hello Sales Cowboy! I want to order the ₦800,000 'Autonomous Hospitality OS' (Website + Full HMS + 24/7 WhatsApp AI Bot)."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground text-background py-4 px-6 text-sm sm:text-base font-bold hover:opacity-90 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Hospitality OS (₦800k)</span>
                </a>
                <a
                  href={waUrl(
                    "Hello Sales Cowboy! I would like to book a live walkthrough of the Autonomous Hospitality OS (HMS + WhatsApp Bot)."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-accent hover:underline transition-colors"
                >
                  <span>Book Live System Walkthrough</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* STANDALONE SYSTEMS ROW - CLEAN & SPACIOUS */}
          <div className="mt-14 rounded-3xl border border-border bg-card/60 p-8 sm:p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-accent block">
                SPECIALIZED STANDALONE SYSTEMS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                Already Have a Website You Love?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Standalone HMS */}
              <div className="rounded-2xl border border-border bg-card p-7 space-y-3">
                <h4 className="text-xl font-bold text-foreground">
                  Standalone Property Management Software (HMS)
                </h4>
                <div className="font-mono text-3xl font-black text-foreground">
                  ₦500,000{" "}
                  <span className="text-xs font-normal text-muted-foreground uppercase">
                    / One-Time
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Already have a website you love? We custom-deploy our full HMS Web App on your server and integrate it with your front desk, room inventory, and owner financial revenue tracking.
                </p>
                <a
                  href={waUrl(
                    "Hello Sales Cowboy! I already have a website and want to deploy the ₦500,000 Standalone HMS software."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline pt-2"
                >
                  <span>Request Standalone HMS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Basic 3-Page Site */}
              <div className="rounded-2xl border border-border bg-card p-7 space-y-3">
                <h4 className="text-xl font-bold text-foreground">
                  Basic 3-Page Corporate Presence Website
                </h4>
                <div className="font-mono text-3xl font-black text-foreground">
                  ₦85,000{" "}
                  <span className="text-xs font-normal text-muted-foreground uppercase">
                    / One-Time
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Need a simple corporate presence first? Clean, fast 3-page informational hotel or apartment showcase website with room galleries, Google Maps pin, and direct WhatsApp enquiry routing.
                </p>
                <a
                  href={waUrl(
                    "Hello Sales Cowboy! I want to order the ₦85,000 Basic 3-Page Corporate Website."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline pt-2"
                >
                  <span>Order Basic 3-Page Site</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: MONTHLY OCCUPANCY & GROWTH RETAINERS (BIG SPACING) */}
        <div className="container mx-auto px-4 max-w-6xl mt-24 md:mt-36">
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-accent block">
              STEP 2: MONTHLY OCCUPANCY &amp; VISIBILITY ENGINES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Fill Your Rooms Every Weekend
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Consistent Google Maps search ranking, creator video walkthroughs, and hands-off technical maintenance.
            </p>
          </div>

          {/* 4 Monthly Retainers Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Retainer 1 */}
            <div className="rounded-3xl border border-border bg-card p-7 flex flex-col justify-between shadow-xs hover:border-foreground/30 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">
                  Tier 1: Care
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  Website &amp; System Care
                </h3>
                <div className="mt-4 font-mono text-4xl font-extrabold text-foreground">
                  ₦50,000{" "}
                  <span className="text-xs font-semibold text-muted-foreground">/ mo</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Keep your booking site, AI bot, and HMS fast, secure, and updated.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Unlimited rate &amp; text updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Seasonal promo banner swaps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Server hosting, SSL &amp; daily backups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>WhatsApp &amp; AI API health checks</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl(
                  "Hello Sales Cowboy! I want to subscribe to the ₦50,000/mo Website & System Care Plan."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3 px-4 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs sm:text-sm text-center transition-all"
              >
                Add Care Plan
              </a>
            </div>

            {/* Retainer 2 */}
            <div className="rounded-3xl border border-border bg-card p-7 flex flex-col justify-between shadow-xs hover:border-foreground/30 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">
                  Tier 2: Search
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  Google Maps Dominance
                </h3>
                <div className="mt-4 font-mono text-4xl font-extrabold text-foreground">
                  ₦100,000{" "}
                  <span className="text-xs font-semibold text-muted-foreground">/ mo</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Own the Top 3 spots when travelers search Google Maps in your city.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Weekly GBP updates &amp; offers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Geo-tagged room photo optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Automated 5-star review generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Monthly local citation &amp; map rank push</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl(
                  "Hello Sales Cowboy! I want the ₦100,000/mo Google Maps & Local SEO Dominance retainer."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3 px-4 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs sm:text-sm text-center transition-all"
              >
                Start Ranking #1
              </a>
            </div>

            {/* Retainer 3 */}
            <div className="rounded-3xl border border-border bg-card p-7 flex flex-col justify-between shadow-xs hover:border-foreground/30 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">
                  Tier 3: Social
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  Hospitality Social Engine
                </h3>
                <div className="mt-4 font-mono text-4xl font-extrabold text-foreground">
                  ₦150,000{" "}
                  <span className="text-xs font-semibold text-muted-foreground">/ mo</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Look like the most prestigious property in town on IG, FB &amp; TikTok.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Full Social Media Management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Monthly calendar &amp; graphic design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Pro editing of raw clips into Reels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Daily captions &amp; DM comment routing</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl(
                  "Hello Sales Cowboy! I want to start the ₦150,000/mo Hospitality Social Media Engine."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3 px-4 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs sm:text-sm text-center transition-all"
              >
                Start Social Engine
              </a>
            </div>

            {/* Retainer 4: Viral UGC Videos (UPDATED: 4 UGC VIDEOS ONLY) */}
            <div className="rounded-3xl border-2 border-accent bg-card p-7 flex flex-col justify-between shadow-md relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                Video Production
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">
                  Tier 4: Creator Video
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  Viral UGC Video Suite
                </h3>
                <div className="mt-4 font-mono text-4xl font-extrabold text-foreground">
                  ₦270,000{" "}
                  <span className="text-xs font-semibold text-muted-foreground">/ mo</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  4 authentic creator video walkthroughs engineered to convert scrollers into paying guests.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>
                      <strong>4 Custom Creator UGC Videos / Month:</strong> High-converting walkthroughs of your rooms, pool, bar, or apartment vibe
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Professional script &amp; hook concepts engineered for organic viral reach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Delivered edited, color-graded &amp; ready-to-run for high-ROAS Paid Ads &amp; Reels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Includes sound design, on-screen text hooks &amp; caption copy</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl(
                  "Hello Sales Cowboy! I want to launch the ₦270,000/mo Viral UGC Video Suite for my property."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3 px-4 rounded-xl bg-accent text-white font-bold text-xs sm:text-sm text-center hover:bg-accent/90 transition-all"
              >
                Launch UGC Videos
              </a>
            </div>
          </div>

          {/* HIGH-TICKET BUNDLES ROW (UPDATED: BUNDLE REMOVED WEBSITE CARE, PAID ADS AT 100K/CAMPAIGN) */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Full Occupancy Bundle */}
            <div className="rounded-3xl border border-border bg-card p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-accent tracking-wider block">
                  ALL-IN-ONE MONTHLY DEPARTMENT (SAVE ₦20,000/MO)
                </span>
                <h4 className="text-2xl font-black text-foreground mt-2">
                  The &ldquo;Full Occupancy&rdquo; Monthly Bundle
                </h4>
                <div className="font-mono text-3xl font-black text-foreground mt-3">
                  ₦350,000 <span className="text-sm font-normal text-muted-foreground">/ month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  Combines <strong>Viral UGC Video Suite (₦270k)</strong> + <strong>Google Maps Dominance (₦100k)</strong> into one high-power monthly growth engine that keeps your property visible and viral.
                </p>
              </div>
              <a
                href={waUrl(
                  "Hello Sales Cowboy! I want to order the ₦350,000/mo 'Full Occupancy' Monthly Bundle (Viral UGC + Google Maps Dominance)."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-foreground text-background font-bold text-sm hover:opacity-90 transition-all"
              >
                <span>Lock In Full Occupancy Bundle</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Paid Ads Campaign Setup */}
            <div className="rounded-3xl border border-border bg-card p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-accent tracking-wider block">
                  FILL ROOMS THIS WEEKEND
                </span>
                <h4 className="text-2xl font-black text-foreground mt-2">
                  Paid Ads Campaign Setup
                </h4>
                <div className="font-mono text-3xl font-black text-foreground mt-3">
                  ₦100,000{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    / campaign setup
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  Full ad campaign setup + ad creative creation recommendation and copy guide. Direct Meta Ads (Instagram/WhatsApp booking) or Google Search Ads (<em>&ldquo;Shortlet / Hotel in [City]&rdquo;</em>).
                </p>
                <div className="mt-3 text-xs font-medium text-accent">
                  * Client funds their ad spend directly (Daily budget × number of days).
                </div>
              </div>
              <a
                href={waUrl(
                  "Hello Sales Cowboy! I want to book a ₦100,000 Paid Ads Campaign Setup for my hotel / shortlet."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-secondary text-foreground border border-border font-bold text-sm hover:bg-secondary/80 transition-all"
              >
                <span>Book Paid Ads Campaign (₦100k)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 3: OPTIONAL PROPERTY POWER-UPS */}
        <div className="container mx-auto px-4 max-w-6xl mt-24 md:mt-36">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-accent block">
              STEP 3: OPTIONAL PROPERTY POWER-UPS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              High-Impact Add-Ons
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Add any of these one-time power-ups to your booking website or HMS package.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-border bg-card p-8 space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <Star className="w-5 h-5" />
              </div>
              <div className="font-mono text-xl font-bold text-foreground">
                + ₦75,000{" "}
                <span className="text-xs font-normal text-muted-foreground uppercase">
                  One-Time
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Automated 5-Star Review &amp; Repeat-Guest Bot
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                2 hours after checkout in your HMS, our WhatsApp bot thanks the guest, requests a Google Review, and issues a 10% repeat-booking discount code.
              </p>
              <a
                href={waUrl(
                  "Hello Sales Cowboy! I want to include the +₦75,000 Automated 5-Star Review & Repeat-Guest Bot."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline pt-2"
              >
                <span>Add Review Bot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="font-mono text-xl font-bold text-foreground">
                + ₦150,000{" "}
                <span className="text-xs font-normal text-muted-foreground uppercase">
                  One-Time
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Bar, Lounge &amp; Room-Service QR Menu + POS
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Guests scan a table, poolside, or bedside QR code to order food and drinks from their phone. Orders print at the bar/kitchen and log into the HMS ledger.
              </p>
              <a
                href={waUrl(
                  "Hello Sales Cowboy! I want to include the +₦150,000 Bar, Lounge & Room QR Menu + POS."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline pt-2"
              >
                <span>Add QR Menu + POS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <Camera className="w-5 h-5" />
              </div>
              <div className="font-mono text-xl font-bold text-foreground">
                + ₦120,000{" "}
                <span className="text-xs font-normal text-muted-foreground uppercase">
                  One-Off
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">
                On-Site Property Content Shoot Day
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We send a cameraman to your hotel or shortlets to film 30+ raw vertical clips and crisp room photos for the quarter so you don&apos;t lift a finger.
              </p>
              <a
                href={waUrl(
                  "Hello Sales Cowboy! I want to book the ₦120,000 On-Site Property Content Shoot Day."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline pt-2"
              >
                <span>Book Content Shoot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 4: DETAILED COMPARISON TABLE */}
        <div className="container mx-auto px-4 max-w-5xl mt-24 md:mt-36">
          <div className="text-center mb-10 space-y-3">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Feature-by-Feature Comparison
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Review deliverables side-by-side to pick the perfect infrastructure setup.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="py-5 px-6 font-bold text-foreground">Deliverable / Feature</th>
                    <th className="py-5 px-6 font-bold text-foreground">Foundation (₦200k)</th>
                    <th className="py-5 px-6 font-bold text-accent">AI Concierge (₦420k)</th>
                    <th className="py-5 px-6 font-bold text-foreground">Hospitality OS (₦800k)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { f: "Custom Direct Booking Website", t1: true, t2: true, t3: true },
                    { f: "Direct Paystack/Flutterwave Checkout", t1: true, t2: true, t3: true },
                    { f: "Zero OTA Commission (100% Direct)", t1: true, t2: true, t3: true },
                    { f: "Google Business Profile Verification", t1: true, t2: true, t3: true },
                    { f: "24/7 WhatsApp AI Booking Concierge", t1: false, t2: true, t3: true },
                    { f: "Automated Caution-Fee & ID Verification", t1: false, t2: true, t3: true },
                    { f: "Live Calendar Sync (Zero Double Bookings)", t1: false, t2: true, t3: true },
                    { f: "Full Hotel / Property Management Software", t1: false, t2: false, t3: true },
                    { f: "Front-Desk Check-In/Out & Housekeeping", t1: false, t2: false, t3: true },
                    { f: "Live Owner Mobile Revenue Dashboard", t1: false, t2: false, t3: true },
                    { f: "Anti-Theft Front-Desk Reconciliation", t1: false, t2: false, t3: true },
                    { f: "Delivery Timeline", t1: "7 Days", t2: "7 to 10 Days", t3: "14 Days" },
                    { f: "Software Subscription Fee", t1: "₦0 / month", t2: "₦0 / month", t3: "₦0 / month" },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-6 font-semibold text-foreground">{row.f}</td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {typeof row.t1 === "boolean" ? (
                          row.t1 ? (
                            <Check className="w-5 h-5 text-accent" />
                          ) : (
                            <span className="text-muted-foreground/30">—</span>
                          )
                        ) : (
                          <span className="font-semibold text-foreground">{row.t1}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-accent">
                        {typeof row.t2 === "boolean" ? (
                          row.t2 ? (
                            <Check className="w-5 h-5 text-accent" />
                          ) : (
                            <span className="text-muted-foreground/30">—</span>
                          )
                        ) : (
                          <span className="font-bold text-accent">{row.t2}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-foreground">
                        {typeof row.t3 === "boolean" ? (
                          row.t3 ? (
                            <Check className="w-5 h-5 text-accent" />
                          ) : (
                            <span className="text-muted-foreground/30">—</span>
                          )
                        ) : (
                          <span className="font-bold text-foreground">{row.t3}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
        <div className="container mx-auto px-4 max-w-4xl mt-24 md:mt-36">
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Hospitality Questions</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Frequently Asked Questions
            </h3>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border border-border bg-card px-6 shadow-xs"
              >
                <AccordionTrigger className="text-left font-bold text-base sm:text-lg py-5 hover:no-underline text-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* FINAL CONVERSION BANNER - BIG, CLEAN, WARM */}
        <div className="container mx-auto px-4 max-w-5xl mt-24 md:mt-36">
          <div className="rounded-3xl border border-border bg-card p-10 sm:p-14 text-center space-y-6 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-widest text-accent block">
              READY TO SCALE DIRECT BOOKINGS?
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              Let&apos;s Upgrade Your Hotel or Shortlet This Week
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Message our team on WhatsApp to review your property requirements, test our live WhatsApp AI Booking Bot, or request an official invoice.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waUrl(
                  "Hello Sales Cowboy! I want to consult about upgrading my hotel / shortlet apartments."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-accent text-white font-extrabold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp (+234 810 493 3232)</span>
              </a>

              <a
                href="/Sales-Cowboy-Hospitality-Packages.pdf"
                download="Sales-Cowboy-Hospitality-Packages.pdf"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-secondary text-foreground hover:bg-secondary/80 font-bold text-sm sm:text-base border border-border inline-flex items-center justify-center gap-2 transition-all"
              >
                <FileDown className="w-4 h-4 text-accent" />
                <span>Download Rate Card PDF</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton message="Hello Sales Cowboy! I want to discuss packages for my hotel / shortlet." />
    </div>
  );
}
