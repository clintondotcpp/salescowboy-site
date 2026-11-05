"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Check,
  ArrowRight,
  Clock,
  Zap,
  Globe,
  Bot,
  MessageSquare,
  QrCode,
  Building2,
  ShieldCheck,
  Star,
  Hotel,
  Calendar,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Percent,
  CheckCircle2
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface HotelPackage {
  id: string;
  name: string;
  badge?: string;
  price: string;
  timeline: string;
  renewalNote: string;
  tagline: string;
  featured?: boolean;
  icon: React.ElementType;
  deliverables: string[];
  whatsappMessage: string;
}

const hotelPackages: HotelPackage[] = [
  {
    id: "just-website",
    name: "Just Website (Direct Booking Engine)",
    badge: "Essential Starter",
    price: "₦110,000",
    timeline: "Delivered in 7 Days",
    renewalNote: "₦45,000 / year (Cloud Hosting, Domain & SSL)",
    tagline: "Dedicated direct booking website designed to showcase rooms, display amenities, and capture zero-commission guest payments.",
    icon: Globe,
    deliverables: [
      "5 to 8 High-Speed Mobile-Responsive Pages",
      "Room & Executive Suite Showcase with High-Res Photo Galleries",
      "Real-Time Online Room Availability & Reservation Forms",
      "Direct Paystack / Flutterwave Instant Card & Bank Checkout",
      "Zero 20% OTA Commission Tax (100% of guest revenue goes to you)",
      "Hotel Amenities Showcase (Standby Generator, Pool, Bar, Gym, Security)",
      "Google Maps Embed & Clear Route Directions",
      "Front-Desk Contact Form & Instant WhatsApp Click-to-Chat",
      "Admin Dashboard to update room tariffs, photos, and availability",
      ".COM.NG Domain Name & SSL Certificate Included",
      "1 Year Managed Cloud Hosting Included",
    ],
    whatsappMessage:
      "Hello Sales Cowboy! I want to order the ₦110,000 'Just Website' Hotel & Shortlet booking package.",
  },
  {
    id: "website-chatbot",
    name: "Website + 24/7 AI Concierge Bot",
    badge: "Smart Automation",
    price: "₦150,000",
    timeline: "Delivered in 7 Days",
    renewalNote: "₦55,000 / year (Cloud Hosting, Domain, SSL & Bot API)",
    tagline: "High-converting booking website integrated with an intelligent on-site AI concierge answering guest FAQs around the clock.",
    icon: Bot,
    deliverables: [
      "Everything in the 'Just Website' Package",
      "24/7 On-Site Intelligent AI Concierge & Reservation Bot",
      "Trained on your specific room rates, policies, and breakfast menus",
      "Answers late-night visitor inquiries in under 10 seconds",
      "Automated Room Availability Lookup & Date Selection",
      "Pre-qualifies guest check-in dates and guest counts",
      "Instant Payment Link Dispatch via Paystack in chat",
      "Automated Guest Booking Lead Notification to Front Desk",
      "Desktop & Mobile Floating Interactive Chat Widget",
      "Full On-Page SEO Optimization & Google Indexing",
      "1 Year Managed Hosting, Domain & SSL Included",
    ],
    whatsappMessage:
      "Hello Sales Cowboy! I want to order the ₦150,000 'Website + AI Chatbot' Hotel & Shortlet package.",
  },
  {
    id: "website-gbp-whatsapp",
    name: "Website + GBP + WhatsApp AI Bot",
    badge: "Most Popular & Recommended",
    price: "₦195,000",
    timeline: "Delivered in 10 Days",
    renewalNote: "₦65,000 / year (Cloud Hosting, Domain, SSL & Bot API)",
    tagline: "The complete digital revenue flywheel: Local Google search dominance combined with autonomous 24/7 WhatsApp room reservations.",
    featured: true,
    icon: MessageSquare,
    deliverables: [
      "Everything in the 'Website + Chatbot' Package",
      "24/7 Autonomous WhatsApp AI Concierge (Official WhatsApp API)",
      "Instant Sub-15s response to incoming WhatsApp guest inquiries",
      "Shares high-res room photos, amenities, and current room tariffs directly inside WhatsApp",
      "Generates instant Paystack/Monnify card & bank transfer invoices",
      "Automated reservation confirmation receipts and check-in instructions",
      "Google Business Profile (GBP) Creation, Claiming & Map Verification",
      "Google Local 3-Pack SEO Optimization to rank #1 in your city/district",
      "Geo-tagged photography upload for high Google Maps search relevance",
      "Eliminates 15%–20% middleman commission surrendered to Hotels.ng & Booking.com",
      "Front-desk staff handover and onboarding training",
    ],
    whatsappMessage:
      "Hello Sales Cowboy! I want to order the ₦195,000 'Website + GBP + WhatsApp Chatbot' Flagship Hotel package.",
  },
  {
    id: "review-system",
    name: "Smart Review Acceleration System",
    badge: "Reputation Flywheel",
    price: "₦75,000",
    timeline: "Delivered in 5 Days",
    renewalNote: "One-Time Setup (Optional Annual QR Gateway: ₦25,000/yr)",
    tagline: "Physical acrylic front-desk Smart Gateway QR stands that rapidly scale verified 5-star Google guest ratings from 0 to 50+ in 60 days.",
    icon: QrCode,
    deliverables: [
      "2x Custom-Branded Acrylic Front-Desk QR Display Stands (Heavy-Duty Standee)",
      "Embedded NFC Tap-to-Review + High-Contrast Dynamic QR Code",
      "The Smart Review Gateway (Intelligent 2-Way Filtering Logic):",
      "• 5-Star Intent: One-click direct intent URL straight into Google Maps review compose box",
      "• Critical / Low Ratings: Routed to private management feedback form to resolve internally before public posting",
      "Automated 2-Hour Post-Checkout WhatsApp Review Trigger Setup",
      "Staff Incentive Gamification Matrix & Front-Desk Staff Script",
      "Dominates the Google Local 3-Pack by scaling verified guest authority",
      "Nationwide Courier Delivery to your hotel front desk included",
    ],
    whatsappMessage:
      "Hello Sales Cowboy! I want to order the ₦75,000 'Smart Review Acceleration System' for our hotel/apartments.",
  },
  {
    id: "hotel-management-software",
    name: "Hotel Management Software (Cloud PMS)",
    badge: "Operations ERP",
    price: "₦350,000",
    timeline: "Delivered in 14 Days",
    renewalNote: "₦85,000 / year (Dedicated Cloud Server & Database Backup)",
    tagline: "Comprehensive cloud Property Management System (PMS) unifying front desk, room rack inventory, housekeeping, POS billing, and multi-channel sync.",
    icon: Building2,
    deliverables: [
      "Full Cloud-Based Property Management System (PMS / HMS)",
      "Interactive Visual Room Rack Calendar & Availability Grid",
      "Front-Desk Check-In, Check-Out & Guest Folio Accounting",
      "Multi-Channel OTA Calendar Sync (2-way sync with Airbnb, Booking.com, Hotels.ng) preventing double-bookings",
      "Housekeeping & Room Status Tracker (Clean, Dirty, Under Service, Quarantine)",
      "Point of Sale (POS) module for Hotel Bar, Restaurant & Laundry folio billing",
      "Daily Cashier Reconciliation & Night Audit Reporting",
      "Multi-User Role Permissions (Front Desk, Housekeeping, Manager, Owner)",
      "Executive Revenue Analytics (Occupancy Rate, ADR, RevPAR)",
      "Automated Daily Database Backups & 100% Client Data Privacy",
      "Complete On-Site / Remote Staff Training & Operations Documentation",
    ],
    whatsappMessage:
      "Hello Sales Cowboy! I want to order the ₦350,000 'Hotel Management Software (Cloud PMS)' package.",
  },
];

interface ComparisonRow {
  feature: string;
  website: string | boolean;
  webChatbot: string | boolean;
  fullSuite: string | boolean;
  reviewSys: string | boolean;
  pms: string | boolean;
}

const comparisonRows: ComparisonRow[] = [
  {
    feature: "Direct Booking Website",
    website: "5–8 Pages",
    webChatbot: "5–8 Pages",
    fullSuite: "7–10 Custom Pages",
    reviewSys: false,
    pms: "Integrated Portal",
  },
  {
    feature: "Online Paystack Card / Transfer Pay",
    website: true,
    webChatbot: true,
    fullSuite: true,
    reviewSys: false,
    pms: true,
  },
  {
    feature: "20% OTA Commission Elimination",
    website: true,
    webChatbot: true,
    fullSuite: true,
    reviewSys: false,
    pms: true,
  },
  {
    feature: "24/7 On-Site Web AI Chatbot",
    website: false,
    webChatbot: true,
    fullSuite: true,
    reviewSys: false,
    pms: false,
  },
  {
    feature: "24/7 Autonomous WhatsApp Concierge",
    website: false,
    webChatbot: false,
    fullSuite: true,
    reviewSys: "Checkout Triggers",
    pms: "Optional Addon",
  },
  {
    feature: "Google Business Profile & Local 3-Pack",
    website: "Basic Setup",
    webChatbot: "Basic Setup",
    fullSuite: "Full Verification & SEO",
    reviewSys: "Ranking Optimization",
    pms: false,
  },
  {
    feature: "Acrylic Front-Desk Smart QR Stands",
    website: false,
    webChatbot: false,
    fullSuite: "1x Stand Included",
    reviewSys: "2x Stands Included",
    pms: false,
  },
  {
    feature: "Smart Negative Review Gatekeeper",
    website: false,
    webChatbot: false,
    fullSuite: true,
    reviewSys: true,
    pms: false,
  },
  {
    feature: "Front-Desk Room Rack & Booking Calendar",
    website: false,
    webChatbot: false,
    fullSuite: false,
    reviewSys: false,
    pms: true,
  },
  {
    feature: "Housekeeping & Room Status Ledger",
    website: false,
    webChatbot: false,
    fullSuite: false,
    reviewSys: false,
    pms: true,
  },
  {
    feature: "Bar / Restaurant POS Folio Billing",
    website: false,
    webChatbot: false,
    fullSuite: false,
    reviewSys: false,
    pms: true,
  },
  {
    feature: "Multi-Channel OTA Sync (Airbnb / Booking)",
    website: false,
    webChatbot: false,
    fullSuite: false,
    reviewSys: false,
    pms: true,
  },
  {
    feature: "Cloud Server, Domain & SSL Included",
    website: "1 Year Free",
    webChatbot: "1 Year Free",
    fullSuite: "1 Year Free",
    reviewSys: "No Domain Needed",
    pms: "1 Year Server Included",
  },
  {
    feature: "Delivery & Launch Timeline",
    website: "7 Days",
    webChatbot: "7 Days",
    fullSuite: "10 Days",
    reviewSys: "5 Days",
    pms: "14 Days",
  },
  {
    feature: "Package Investment (One-Time)",
    website: "₦110,000",
    webChatbot: "₦150,000",
    fullSuite: "₦195,000",
    reviewSys: "₦75,000",
    pms: "₦350,000",
  },
];

const faqs = [
  {
    q: "How does having our own direct website eliminate the 20% OTA commission?",
    a: "When travelers book via third-party platforms like Hotels.ng or Booking.com, you surrender between 15% and 20% of every room night booked (often ₦3,000 to ₦6,000 per night). With your own mobile-optimized direct booking website and WhatsApp bot, guests reserve directly with you, paying via Paystack (Debit Card, USSD, Instant Bank Transfer) where 100% of the booking funds land directly into your corporate bank account instantly.",
  },
  {
    q: "How does the 24/7 WhatsApp AI concierge work for late-night guest arrivals?",
    a: "When a traveler lands in your city late at night or searches for accommodation after front-desk operating hours, our autonomous WhatsApp bot responds in under 15 seconds. It displays room photos, explains tariffs, confirms availability, and generates an instant payment link. Once paid, it automatically delivers the booking confirmation receipt and check-in instructions to the guest while notifying your front-desk manager.",
  },
  {
    q: "How does the Smart Review Acceleration System get verified 5-star Google reviews?",
    a: "We deploy custom-branded acrylic stands with embedded NFC chips and dynamic QR codes at your reception desk and executive suites. When happy guests tap or scan the stand, our Smart Gateway directs high ratings directly to Google Maps' review compose box in 30 seconds. If a guest expresses dissatisfaction, the system routes them to a private internal management form, allowing your team to resolve their complaint before any negative feedback touches the public internet.",
  },
  {
    q: "Can the Hotel Management Software (PMS) sync with Airbnb, Booking.com, and Hotels.ng?",
    a: "Yes. The Hotel Management Software includes 2-way iCal / API channel synchronization. When a guest books a room or shortlet apartment directly via your website, the PMS automatically blocks those dates across Airbnb, Booking.com, and other connected channels in real time, eliminating double-bookings and manual calendar updating.",
  },
  {
    q: "Can we start with 'Just Website' and upgrade to the WhatsApp bot or PMS later?",
    a: "Absolutely. All our systems are built modularly on modern Next.js and PostgreSQL architecture. You can start with the ₦110,000 direct booking website today and seamlessly upgrade to the WhatsApp concierge bot, Review Gateway, or Cloud PMS as your occupancy and revenue expand.",
  },
  {
    q: "Do we own the software code and guest database?",
    a: "Yes, 100%. Unlike restrictive subscription platforms that lock you into monthly user fees, Sales Cowboy grants you 100% complete ownership of your custom website, customer database, and booking records with zero vendor lock-in.",
  },
];

export default function HotelPackagesPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const waUrl = (msg: string) =>
    `https://wa.me/2348082697841?text=${encodeURIComponent(msg)}`;

  const filteredPackages = hotelPackages.filter((pkg) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "online") return pkg.id === "just-website" || pkg.id === "website-chatbot" || pkg.id === "website-gbp-whatsapp";
    if (selectedFilter === "reviews") return pkg.id === "review-system" || pkg.id === "website-gbp-whatsapp";
    if (selectedFilter === "operations") return pkg.id === "hotel-management-software";
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white">
      <Header />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Hero Section */}
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-4">
            <Hotel className="w-3.5 h-3.5" />
            <span>Hospitality Revenue & Digital Growth</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Hotel & Shortlet Apartment Digital Packages
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Turnkey digital systems engineered to capture direct guest bookings, eliminate 15%–20% OTA commissions, automate 24/7 guest inquiries, and scale 5-star Google reviews.
          </p>

          {/* Quick Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-muted-foreground font-medium">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" /> Delivered in 5–14 Days
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-accent" /> 0% OTA Intermediary Commission
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-accent" /> 24/7 Automated WhatsApp Concierge
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" /> 100% System & Code Ownership
            </span>
          </div>

          {/* Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All 5 Packages" },
              { id: "online", label: "Online Booking & Web" },
              { id: "reviews", label: "Review & Search Dominance" },
              { id: "operations", label: "Full Operations (PMS)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedFilter === tab.id
                    ? "bg-foreground text-background shadow-xs"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Package Cards Grid */}
        <div className="container mx-auto px-4 max-w-6xl mt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredPackages.map((pkg) => {
              const IconComp = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-2xl border transition-all flex flex-col justify-between p-6 sm:p-7 relative ${
                    pkg.featured
                      ? "border-accent shadow-md bg-card ring-1 ring-accent/30 lg:-translate-y-2"
                      : "border-border bg-card/60 hover:border-foreground/30 shadow-xs"
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{pkg.badge}</span>
                    </div>
                  )}

                  <div>
                    {/* Header Info */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground">
                        <IconComp className="w-5 h-5 text-accent" />
                      </div>
                      {!pkg.featured && pkg.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-foreground mt-4 leading-snug">
                      {pkg.name}
                    </h3>

                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {pkg.tagline}
                    </p>

                    {/* Pricing */}
                    <div className="mt-5 pt-4 border-t border-border">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-serif">
                          {pkg.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-medium mt-1">
                        {pkg.renewalNote}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent">
                        <Clock className="w-3 h-3" />
                        <span>{pkg.timeline}</span>
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="mt-6 space-y-2.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Included Features:
                      </p>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {pkg.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="mt-8 pt-4 border-t border-border">
                    <a
                      href={waUrl(pkg.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        pkg.featured
                          ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm"
                          : "bg-secondary hover:bg-secondary/80 text-foreground"
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Order This Package</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REVENUE MATH & COMMISSION COMPARISON BANNER */}
        <div className="container mx-auto px-4 max-w-5xl mt-20">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-card via-card/80 to-card p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>The Real Hospitality Math</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-2">
                  Stop Paying a 20% Middleman Tax on Every Room
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  If an average room or apartment night costs ₦25,000, Hotels.ng or Booking.com takes ~₦5,000 in commission. 
                  Capturing just <strong className="text-foreground">15 direct bookings per month</strong> saves you <strong className="text-foreground">₦75,000 to ₦150,000 every single month</strong> in forfeited cash flow. 
                  Your custom website and WhatsApp bot pay for themselves within 30 to 60 days.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-secondary/60 border border-border text-center min-w-[200px] w-full md:w-auto">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Monthly Direct Savings
                </span>
                <span className="text-2xl sm:text-3xl font-black text-foreground font-serif block my-1">
                  +₦150,000+
                </span>
                <span className="text-[11px] text-accent font-semibold block">
                  100% Direct Guest Cash Flow
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FULL 5-PACKAGE COMPARISON TABLE */}
        <div className="container mx-auto px-4 max-w-6xl mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Comprehensive Feature Comparison
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Side-by-side technical and operational breakdown across all five hospitality packages.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card/60 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-secondary/80 border-b border-border text-foreground">
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">Feature / Capability</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">Just Website</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">Web + Chatbot</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] bg-accent/10 text-accent">
                    Website + GBP + WA
                  </th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">Review System</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">Cloud PMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? "bg-muted/20" : ""}>
                    <td className="p-3.5 font-semibold text-foreground">
                      {row.feature}
                    </td>

                    {/* Just Website */}
                    <td className="p-3.5 text-muted-foreground">
                      {typeof row.website === "boolean" ? (
                        row.website ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span>{row.website}</span>
                      )}
                    </td>

                    {/* Web + Chatbot */}
                    <td className="p-3.5 text-muted-foreground">
                      {typeof row.webChatbot === "boolean" ? (
                        row.webChatbot ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span>{row.webChatbot}</span>
                      )}
                    </td>

                    {/* Website + GBP + WA (Featured) */}
                    <td className="p-3.5 bg-accent/5 font-medium text-foreground">
                      {typeof row.fullSuite === "boolean" ? (
                        row.fullSuite ? (
                          <Check className="w-4 h-4 text-accent font-bold" />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span className="font-semibold text-accent">{row.fullSuite}</span>
                      )}
                    </td>

                    {/* Review System */}
                    <td className="p-3.5 text-muted-foreground">
                      {typeof row.reviewSys === "boolean" ? (
                        row.reviewSys ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span>{row.reviewSys}</span>
                      )}
                    </td>

                    {/* Cloud PMS */}
                    <td className="p-3.5 text-muted-foreground">
                      {typeof row.pms === "boolean" ? (
                        row.pms ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span className="font-semibold text-foreground">{row.pms}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div className="container mx-auto px-4 max-w-4xl mt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Hospitality Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border bg-card/60 px-5 shadow-xs"
              >
                <AccordionTrigger className="text-left font-semibold text-sm sm:text-base py-4 hover:no-underline text-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* BOTTOM CALL TO ACTION BANNER */}
        <div className="container mx-auto px-4 max-w-5xl mt-24">
          <div className="rounded-3xl border border-border bg-foreground text-background p-8 sm:p-12 text-center relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to Scale Direct Hotel & Apartment Bookings?
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-background/80 max-w-2xl mx-auto leading-relaxed">
              Message us on WhatsApp to discuss your property specifications, inspect live demos, or request a customized technical proposal.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waUrl("Hello Sales Cowboy! I want to consult about digital packages for my hotel / shortlet apartments.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent text-accent-foreground font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (+234 808 269 7841)</span>
              </a>
              <Link
                href="/#contact"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-background/10 hover:bg-background/20 text-background font-semibold text-xs sm:text-sm border border-background/20 transition-all"
              >
                Request Custom Proposal
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

