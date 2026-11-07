/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Printer,
  Building2,
  Search,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Check,
  Eye,
  Edit3,
  RefreshCw,
  Share2,
  Layers,
  FileText,
  RotateCcw,
  Sparkles,
  Plus,
  Trash2,
  Sliders,
  DollarSign,
  TrendingDown,
  Calendar,
  Save,
} from "lucide-react";

// Interface for Audit State
export interface AuditData {
  refNumber: string;
  date: string;
  hotelName: string;
  legalEntity: string;
  address: string;
  cityArea: string;
  phone: string;
  tier: string;

  // Digital Health & Scores
  healthScore: number;
  scoreStatus: string;
  scoreWebsite: number;
  scoreGbp: number;
  scoreOta: number;
  scoreLocalSearch: number;
  scoreReviewSystem: number;

  // Revenue Leakage
  monthlyLeakageMin: string;
  monthlyLeakageMax: string;

  // 4 KPI Cards
  kpis: {
    num: string;
    title: string;
    desc: string;
  }[];

  // Strengths & Mistakes
  strengths: { id: string; title: string; desc: string }[];
  mistakes: { id: string; title: string; desc: string }[];

  // Live Search Simulation
  searchQuery: string;
  searchLocation: string;
  competitor1: {
    title: string;
    badge: string;
    snippet: string;
  };
  competitor2: {
    title: string;
    badge: string;
    snippet: string;
  };
  clientSearchResult: {
    title: string;
    badge: string;
    snippet: string;
  };

  // Funnel Data
  funnel: {
    count: string;
    unit: string;
    label: string;
    drop: string;
    pct: number;
    isDark?: boolean;
  }[];

  // Comparison Diagnostic Table Rows
  comparisonRows: {
    channel: string;
    current: string;
    upgraded: string;
  }[];

  // 3 Proprietary Turnaround Pillars
  pillars: {
    num: string;
    title: string;
    desc: string;
    bullets: string[];
  }[];

  // 4-Week Roadmap
  roadmap: {
    week: string;
    title: string;
    desc: string;
  }[];
}

// Sanitizer to enforce zero em dashes
const cleanText = (text: string): string => {
  if (!text) return "";
  return text.replace(/[—–]/g, "-");
};

// Preset 1: Ek'abo Inn Nigeria Limited
const PRESET_EKABO: AuditData = {
  refNumber: "AUD-EKB-2026-009",
  date: "November 07, 2026",
  hotelName: "Ek'abo Inn Nigeria Limited",
  legalEntity: "Ek'abo Inn Nigeria Limited",
  address: "10, Hassan Street, Olusosun, Kudirat Abiola Way, Oregun, Ikeja, Lagos",
  cityArea: "Oregun, Ikeja",
  phone: "+234 906 451 0867",
  tier: "3-Star Budget Hotel",
  healthScore: 14,
  scoreStatus: "CRITICAL BLIND SPOT",
  scoreWebsite: 0,
  scoreGbp: 0,
  scoreOta: 20,
  scoreLocalSearch: 15,
  scoreReviewSystem: 0,
  monthlyLeakageMin: "₦2,200,000",
  monthlyLeakageMax: "₦4,500,000",
  kpis: [
    { num: "0 Sites", title: "Direct Web", desc: "No owned website; 100% reliant on OTA aggregators" },
    { num: "0 Reviews", title: "Google Maps", desc: "No GBP profile; totally invisible on local map pack" },
    { num: "25% Tax", title: "OTA Comm.", desc: "Bleeding heavy margins on Hotels.ng & Trip.com" },
    { num: "94% Loss", title: "Inquiry Drop", desc: "Lost to zero search presence and phone verification delays" },
  ],
  strengths: [
    {
      id: "s1",
      title: "Strategic Ikeja / Oregun Location",
      desc: "Minutes from Kudirat Abiola Way, Daystar Christian Centre, Ikeja Mall, and Alausa Secretariat.",
    },
    {
      id: "s2",
      title: "Complete 3-Star Physical Amenities",
      desc: "AC rooms, en-suite baths, sofa, on-site restaurant & bar, and 24h front desk.",
    },
    {
      id: "s3",
      title: "Proven Aggregator Demand",
      desc: "Active listings on Hotels.ng and Trip.com prove travelers actively seek your rooms.",
    },
    {
      id: "s4",
      title: "Registered Corporate Entity",
      desc: "Ek'abo Inn Nigeria Limited possesses an established physical hotel facility with recognized local goodwill.",
    },
  ],
  mistakes: [
    {
      id: "m1",
      title: "Zero Owned Direct Website",
      desc: "No website exists. Guests cannot inspect categories, check live rates, or make direct payments.",
    },
    {
      id: "m2",
      title: "Invisible on Google Maps (No GBP)",
      desc: "No Google profile exists. Searchers for Oregun budget rooms find competitors instead.",
    },
    {
      id: "m3",
      title: "25% Commission Bleed to Middlemen",
      desc: "Forfeiting heavy margins on every booking to OTAs instead of direct bank settlements.",
    },
    {
      id: "m4",
      title: "Zero Automated Post-Stay Review Reminders",
      desc: "Staff never trigger automated review requests, keeping social proof at zero.",
    },
  ],
  searchQuery: "Hotels in Oregun Ikeja OR Budget Hotel near Ikeja Mall",
  searchLocation: "Ikeja, Lagos",
  competitor1: {
    title: "Top Rated Oregun Commercial Hotel • Google 3-Pack Pin #1",
    badge: "3-Pack Dominator",
    snippet: "★★★★☆ 4.4 Rating (64 Reviews) • Direct call and website booking links. Captures over 50% of corporate, shopping, and church guest inquiries in Oregun.",
  },
  competitor2: {
    title: "Kudirat Abiola Way Boutique Suites • Google 3-Pack Pin #2",
    badge: "Local Competitor",
    snippet: "★★★★☆ 4.2 Rating (38 Reviews) • Live rates and photo gallery displayed. Steals visitors attending programs at Daystar and business meetings in Alausa.",
  },
  clientSearchResult: {
    title: "Ek'abo Inn Nigeria Limited",
    badge: "100% Invisible",
    snippet: "NO LISTING FOUND ON GOOGLE MAPS. Zero reviews, zero photos, zero map pins. High-intent travelers assume the hotel does not exist or has permanently shut down.",
  },
  funnel: [
    { count: "100", unit: "Searchers", label: "Stage 1: Google Search & Maps", drop: "-62 lost to competing Google 3-pack pins", pct: 100 },
    { count: "38", unit: "OTA Visitors", label: "Stage 2: Hotels.ng / Trip.com Check", drop: "-22 lost to OTA banners & lack of direct trust", pct: 38 },
    { count: "16", unit: "Callers", label: "Stage 3: Phone Inquiries", drop: "-10 lost to manual phone verification delays", pct: 16 },
    { count: "6", unit: "Confirmed", label: "Stage 4: Confirmed Stays", drop: "94% Potential Direct Revenue Lost (+25% OTA fee)", pct: 6, isDark: true },
  ],
  comparisonRows: [
    { channel: "Website & Checkout", current: "Non-Existent. No website or online checkout exists.", upgraded: "Dedicated Mobile Booking Site with instant Paystack card & transfer checkout at 0% commission." },
    { channel: "Google Maps Presence", current: "Non-Existent. 0 Google reviews; invisible in local map searches.", upgraded: "Verified Google 3-Pack Dominance with geo-tagged room imagery and weekly search updates." },
    { channel: "Room Availability", current: "Blind calendar. Guests cannot verify open rooms without calling.", upgraded: "Dynamic Real-Time Room Availability Calendar Sync. 100% self-serve booking." },
    { channel: "Review Generation", current: "Completely manual. No post-stay follow-up triggers after check-out.", upgraded: "Automated WhatsApp Review Bot: Fires 2 hours post-checkout with 1-click Google review link." },
    { channel: "Booking Inquiries", current: "Manual phone calls only. Late-night calls go completely unanswered.", upgraded: "24/7 WhatsApp AI Reservation Desk: Answers inquiries and delivers payment links in 3 seconds." },
  ],
  pillars: [
    {
      num: "01",
      title: "Direct Booking Website + Live Availability Engine",
      desc: "Launch ekaboinn.com.ng to capture direct guest payments at 0% OTA commission.",
      bullets: [
        "Dynamic real-time room availability calendar",
        "Instant Paystack card & transfer checkout",
        "0% OTA middleman commission direct to bank",
      ],
    },
    {
      num: "02",
      title: "Google Business Profile Creation & 3-Pack Push",
      desc: "Build, verify, and propel Ek'abo Inn to the top of Google Maps for Oregun & Ikeja.",
      bullets: [
        "Official GBP verification on Hassan Street",
        "Geo-tagged room & amenity photo optimization",
        "Target high-intent Daystar & Alausa search terms",
      ],
    },
    {
      num: "03",
      title: "24/7 WhatsApp AI Concierge + Automated Review Bot",
      desc: "Connected directly to +234 906 451 0867 to answer guests 24/7 and collect 5-star reviews.",
      bullets: [
        "Automated WhatsApp review prompt 2h post-checkout",
        "Replies to guest DMs in 3 seconds flat 24/7",
        "Sends direct booking links and answers FAQs",
      ],
    },
  ],
  roadmap: [
    { week: "WEEK 01", title: "Google Profile Setup", desc: "Create & verify GBP on Hassan Street; upload geo-tagged room imagery." },
    { week: "WEEK 02", title: "Direct Booking Site", desc: "Launch ekaboinn.com.ng with live availability engine & Paystack." },
    { week: "WEEK 03", title: "WhatsApp AI Concierge", desc: "Connect 24/7 bot on +234 906 451 0867 with review triggers." },
    { week: "WEEK 04", title: "Local 3-Pack Dominance", desc: "Deploy front-desk smart review QR stands and push into the Google 3-pack." },
  ],
};

// Preset 2: Glover Apartments (Ogudu)
const PRESET_GLOVER: AuditData = {
  refNumber: "AUD-GLV-2026-008",
  date: "November 06, 2026",
  hotelName: "Glover Apartments",
  legalEntity: "Glover Apartments Limited",
  address: "Ogudu, Lagos Mainland, Nigeria",
  cityArea: "Ogudu, Lagos Mainland",
  phone: "+234 810 493 3232",
  tier: "Serviced Shortlet Apartments",
  healthScore: 28,
  scoreStatus: "SEVERE REVENUE LEAKAGE",
  scoreWebsite: 25,
  scoreGbp: 15,
  scoreOta: 40,
  scoreLocalSearch: 20,
  scoreReviewSystem: 0,
  monthlyLeakageMin: "₦1,800,000",
  monthlyLeakageMax: "₦3,600,000",
  kpis: [
    { num: "Multi-Step", title: "Booking Friction", desc: "Too many form screens cause 70%+ visitor abandonment" },
    { num: "0 Days", title: "Live Availability", desc: "No calendar tracker forces manual phone verification" },
    { num: "1 Review", title: "Maps Trust Trap", desc: "1 solo review looks fake and blocks Google 3-Pack rank" },
    { num: "Ikoyi Bleed", title: "Search Hijacking", desc: "Glover Rd Ikoyi captures high-intent Ogudu searchers" },
  ],
  strengths: [
    { id: "s1", title: "High-Quality Professional Imagery", desc: "Clean, high-resolution interior and exterior photography already shot and ready." },
    { id: "s2", title: "Strategic Ogudu Location", desc: "Fast mainland connectivity to Ikeja, Maryland, and Third Mainland Bridge for island commuters." },
    { id: "s3", title: "Multi-Channel OTA Footprint", desc: "Indexed on Agoda, Trip.com, and Skyscanner, proving underlying market demand." },
    { id: "s4", title: "Existing Domain & Brand Asset", desc: "Owned web URL gives you a solid platform for a high-converting direct booking engine." },
  ],
  mistakes: [
    { id: "m1", title: "Exhausting Multi-Step Form", desc: "The website booking section has excessive input fields and screens that tire the visitor." },
    { id: "m2", title: "Blind Room Availability", desc: "Visitors cannot see real-time open vs booked dates, forcing them to call or message staff manually." },
    { id: "m3", title: "Single-Review Ghost Trap", desc: "1 solitary review on Google Maps triggers traveler skepticism and keeps you buried." },
    { id: "m4", title: "Zero Review Collection Automation", desc: "Staff never trigger post-stay review requests, leaving happy guest experiences unrecorded." },
  ],
  searchQuery: "Glover Apartments Ogudu Lagos OR Shortlets in Ogudu",
  searchLocation: "Lagos, Nigeria",
  competitor1: {
    title: "Glover Road Luxury Serviced Apartments • Ikoyi, Lagos",
    badge: "Cannibalizing Traffic",
    snippet: "4.8 ★ Rating (86 Reviews) • High domain authority intercepts your brand searches. Guests get confused and assume you are an Island development.",
  },
  competitor2: {
    title: "Top Rated Ogudu & Maryland Serviced Apartments • Google 3-Pack",
    badge: "Local Competitor",
    snippet: "4.6 ★ Rating (48 Reviews) • Active room photos and instant booking links. Reclaims 60%+ of mainland corporate travelers.",
  },
  clientSearchResult: {
    title: "Glover Apartments (Your Listing - Ogudu)",
    badge: "Buried Under Rivals",
    snippet: "1 Review Only • No Local Mainland Schema • Corporate travelers skip past 1-review listings to book verified alternatives.",
  },
  funnel: [
    { count: "100", unit: "Searchers", label: "Stage 1: Google Search & Maps", drop: "-52 lost to Ikoyi listings & rival 3-packs", pct: 100 },
    { count: "48", unit: "Visitors", label: "Stage 2: Glover Website Booking Flow", drop: "-26 lost to exhausting form & no live calendar", pct: 48 },
    { count: "22", unit: "Inquiries", label: "Stage 3: Phone Calls / Manual WhatsApp", drop: "-14 lost to delayed manual staff replies", pct: 22 },
    { count: "8", unit: "Confirmed", label: "Stage 4: Confirmed Check-Ins", drop: "92% Potential Revenue Lost", pct: 8, isDark: true },
  ],
  comparisonRows: [
    { channel: "Website Booking Flow", current: "Exhausting multi-step form with tedious input fields that tires visitors out.", upgraded: "2-Step Frictionless Mobile Checkout with instant Paystack/Flutterwave settlement." },
    { channel: "Room Availability", current: "Blind calendar. Guests cannot verify open dates without manual staff calls.", upgraded: "Dynamic Real-Time Room Availability Calendar Sync. 100% self-serve booking." },
    { channel: "Google Maps Profile", current: "1 review (5.0 stars). Zero review velocity kills local search rank.", upgraded: "Google 3-Pack Dominance with weekly geo-tagged photos and active review velocity." },
    { channel: "Review Generation", current: "Completely manual. No post-stay follow-up triggers after check-out.", upgraded: "Automated WhatsApp Review Bot: Fires 2 hours post-checkout with 1-click Google review link." },
    { channel: "Local Search Signals", current: "Cannibalized by Glover Road, Ikoyi. Ineligible for Ogudu/Maryland map packs.", upgraded: "Mainland Schema & Local Citation Push: Ranks #1 for Ogudu shortlet searches." },
  ],
  pillars: [
    {
      num: "01",
      title: "Streamlined Booking + Live Availability",
      desc: "Replaces the exhausting multi-page forms with a clean 2-step mobile checkout.",
      bullets: [
        "Live room availability calendar displays open vs booked dates in real time",
        "2-step friction-free mobile checkout",
        "Direct Paystack settlement at 0% commission straight to bank account",
      ],
    },
    {
      num: "02",
      title: "24/7 AI Chatbot + Automated Review Reminders",
      desc: "Custom-wired to your WhatsApp reservation desk to drive 5-star Google social proof.",
      bullets: [
        "Automated WhatsApp review prompt 2h post-checkout",
        "Replies to guest inquiries in 3 seconds flat 24/7",
        "Delivers direct booking links and answers FAQs",
      ],
    },
    {
      num: "03",
      title: "Google Business Profile (GBP) Management",
      desc: "Own the local Google 3-Pack for Ogudu and end the Ikoyi search cannibalisation.",
      bullets: [
        "Weekly GBP posts and geo-tagged room photos",
        "Local Ogudu and Maryland citation network push",
        "Keyword-rich Google review responses for SEO authority",
      ],
    },
  ],
  roadmap: [
    { week: "WEEK 01", title: "Streamlined Web Engine", desc: "Deploy 2-step mobile checkout with real-time room availability calendar." },
    { week: "WEEK 02", title: "WhatsApp AI Chatbot", desc: "Connect 24/7 AI concierge with automated post-stay Google review triggers." },
    { week: "WEEK 03", title: "Google Profile & SEO", desc: "Geo-tag photography, build Ogudu citations, and stop Ikoyi name bleed." },
    { week: "WEEK 04", title: "Reviews & Direct Push", desc: "Activate automated post-stay guest review cycle and push into the 3-pack." },
  ],
};

// Preset 3: Blank Template
const PRESET_BLANK: AuditData = {
  refNumber: `AUD-NEW-${new Date().getFullYear()}-001`,
  date: "November 07, 2026",
  hotelName: "New Hotel / Apartment Name",
  legalEntity: "New Hotel Company Limited",
  address: "Street Address, Area, City, State, Nigeria",
  cityArea: "Area, City",
  phone: "+234 810 493 3232",
  tier: "Boutique Hotel / Serviced Suites",
  healthScore: 20,
  scoreStatus: "SEVERE REVENUE LEAKAGE",
  scoreWebsite: 10,
  scoreGbp: 10,
  scoreOta: 25,
  scoreLocalSearch: 15,
  scoreReviewSystem: 0,
  monthlyLeakageMin: "₦2,000,000",
  monthlyLeakageMax: "₦4,000,000",
  kpis: [
    { num: "0 Sites", title: "Direct Web", desc: "No direct online checkout system" },
    { num: "0 Reviews", title: "Google Maps", desc: "Missing or unranked in local search" },
    { num: "25% Tax", title: "OTA Comm.", desc: "Surrendering high margin to aggregators" },
    { num: "90% Loss", title: "Inquiry Drop", desc: "Lost to friction and response delays" },
  ],
  strengths: [
    { id: "s1", title: "Prime Commercial Location", desc: "Walking distance to business hubs and major transport routes." },
    { id: "s2", title: "Quality Hospitality Facility", desc: "Clean, air-conditioned rooms with modern amenities and 24h reception." },
    { id: "s3", title: "Existing Guest Goodwill", desc: "Repeat offline guests and verified corporate client interest." },
  ],
  mistakes: [
    { id: "m1", title: "No Direct Booking Website", desc: "Forcing travelers to search OTAs or call manually to confirm availability." },
    { id: "m2", title: "Unverified Google Maps Profile", desc: "Zero review collection strategy, leaving searchers to book rivals." },
    { id: "m3", title: "Slow Response Friction", desc: "Delayed replies to phone and social inquiries cause immediate drop-off." },
  ],
  searchQuery: "Hotels in Area OR Shortlets nearby",
  searchLocation: "City, State",
  competitor1: {
    title: "Competing Commercial Hotel • Google 3-Pack Pin #1",
    badge: "3-Pack Dominator",
    snippet: "4.5 ★ Rating (52 Reviews) • Direct call and website links capture local search volume.",
  },
  competitor2: {
    title: "Rival Serviced Suites • Google 3-Pack Pin #2",
    badge: "Local Competitor",
    snippet: "4.3 ★ Rating (34 Reviews) • Active room galleries and instant booking buttons.",
  },
  clientSearchResult: {
    title: "New Hotel Listing",
    badge: "Invisible to Guests",
    snippet: "NO VERIFIED LISTING FOUND. Travelers assume the property is closed or unverified.",
  },
  funnel: [
    { count: "100", unit: "Searchers", label: "Stage 1: Google Search & Maps", drop: "-60 lost to rival 3-pack pins", pct: 100 },
    { count: "40", unit: "Visitors", label: "Stage 2: Aggregator / Social Check", drop: "-25 lost to competing discount banners", pct: 40 },
    { count: "15", unit: "Inquiries", label: "Stage 3: Phone / DM Inquiries", drop: "-9 lost to manual verification delays", pct: 15 },
    { count: "6", unit: "Confirmed", label: "Stage 4: Confirmed Stays", drop: "94% Potential Revenue Lost", pct: 6, isDark: true },
  ],
  comparisonRows: [
    { channel: "Website & Direct Booking", current: "Non-Existent or exhausting form without direct checkout.", upgraded: "2-Step Frictionless Mobile Checkout with instant Paystack/Flutterwave settlement." },
    { channel: "Room Availability Tracking", current: "Blind calendar. Requires manual front-desk verification.", upgraded: "Real-Time Room Availability Calendar Sync. 100% self-serve booking." },
    { channel: "Google Maps Presence", current: "Unverified or 0 reviews; invisible in local map pack.", upgraded: "Google 3-Pack Dominance with geo-tagged room imagery and weekly updates." },
    { channel: "Review Collection", current: "Completely manual. No post-stay follow-up triggers.", upgraded: "Automated WhatsApp Review Bot: Fires 2 hours post-checkout with 1-click link." },
    { channel: "Response Speed", current: "Manual phone calls. After-hours inquiries go unanswered.", upgraded: "24/7 WhatsApp AI Reservation Desk: Answers inquiries in 3 seconds." },
  ],
  pillars: [
    {
      num: "01",
      title: "Direct Booking Website + Live Availability Engine",
      desc: "Captures 100% direct guest payments at 0% OTA commission.",
      bullets: [
        "Real-time room availability calendar engine",
        "Mobile-first 2-step checkout flow",
        "Direct Paystack card & transfer settlement straight to hotel account",
      ],
    },
    {
      num: "02",
      title: "Google Business Profile Creation & Local 3-Pack Push",
      desc: "Propel the property to the top of Google Maps for high-intent area searches.",
      bullets: [
        "Official GBP registration, pin verification, and category optimization",
        "Geo-tagged photography and local area schema citations",
        "Weekly promotional updates targeting corporate and leisure travelers",
      ],
    },
    {
      num: "03",
      title: "24/7 WhatsApp AI Concierge + Automated Review Reminders",
      desc: "Autonomous booking desk and post-checkout 5-star review collection engine.",
      bullets: [
        "Automated WhatsApp review trigger sent 2 hours post-checkout",
        "10% repeat-stay incentive code driving verified 5-star Google reviews",
        "Replies to guest DMs in 3 seconds flat 24/7 with rates and booking links",
      ],
    },
  ],
  roadmap: [
    { week: "WEEK 01", title: "Google Profile & SEO", desc: "Create & verify Google profile; upload geo-tagged room photos and area schema." },
    { week: "WEEK 02", title: "Direct Booking Site", desc: "Deploy luxury direct booking site with live inventory calendar and Paystack." },
    { week: "WEEK 03", title: "WhatsApp AI Concierge", desc: "Connect 24/7 AI reservation bot with automated post-stay review triggers." },
    { week: "WEEK 04", title: "Local 3-Pack Dominance", desc: "Deploy front-desk smart review QR collateral and push into the Google 3-pack." },
  ],
};

// Helper to safely serialize audit state to URL base64
const serializeAudit = (data: AuditData): string => {
  try {
    const str = JSON.stringify(data);
    const bytes = new TextEncoder().encode(str);
    let binString = "";
    for (let i = 0; i < bytes.length; i++) {
      binString += String.fromCharCode(bytes[i]);
    }
    return btoa(binString);
  } catch (e) {
    console.error("Failed to serialize audit", e);
    return "";
  }
};

// Helper to safely deserialize audit state from URL base64
const deserializeAudit = (b64: string): AuditData | null => {
  try {
    const binString = atob(b64);
    const bytes = new Uint8Array(binString.length);
    for (let i = 0; i < binString.length; i++) {
      bytes[i] = binString.charCodeAt(i);
    }
    const str = new TextDecoder().decode(bytes);
    return JSON.parse(str) as AuditData;
  } catch (e) {
    console.error("Failed to deserialize audit", e);
    return null;
  }
};

function AuditGeneratorContent() {
  const searchParams = useSearchParams();

  // Mode: "editor" or "preview"
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [isClientMode, setIsClientMode] = useState(false);
  const [audit, setAudit] = useState<AuditData>(PRESET_EKABO);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load from URL query if present, else check localStorage
  useEffect(() => {
    const dataParam = searchParams.get("data");
    const viewParam = searchParams.get("view");

    if (viewParam === "client") {
      setIsClientMode(true);
      setActiveTab("preview");
    }

    if (dataParam) {
      const parsed = deserializeAudit(dataParam);
      if (parsed) {
        setAudit(parsed);
      }
    } else {
      // Check localStorage for saved draft
      try {
        const saved = localStorage.getItem("salescowboy_active_audit");
        if (saved) {
          const parsedSaved = JSON.parse(saved);
          if (parsedSaved && parsedSaved.hotelName) {
            setAudit(parsedSaved);
          }
        }
      } catch (err) {
        console.error("LocalStorage load error", err);
      }
    }
  }, [searchParams]);

  // Handle Input Changes with auto-clean for zero em dashes
  const updateField = (field: keyof AuditData, value: any) => {
    setAudit((prev) => {
      const updated = {
        ...prev,
        [field]: typeof value === "string" ? cleanText(value) : value,
      };
      // Autosave to localStorage
      try {
        localStorage.setItem("salescowboy_active_audit", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Recalculate Health Score
  const calculateScore = () => {
    const total =
      audit.scoreWebsite * 0.25 +
      audit.scoreGbp * 0.25 +
      audit.scoreOta * 0.15 +
      audit.scoreLocalSearch * 0.2 +
      audit.scoreReviewSystem * 0.15;
    const rounded = Math.round(total);
    let status = "CRITICAL BLIND SPOT";
    if (rounded >= 60) status = "MODERATE HEALTH";
    else if (rounded >= 30) status = "SEVERE REVENUE LEAKAGE";

    setAudit((prev) => {
      const updated = {
        ...prev,
        healthScore: rounded,
        scoreStatus: status,
      };
      try {
        localStorage.setItem("salescowboy_active_audit", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Save explicitly
  const handleSaveDraft = () => {
    try {
      localStorage.setItem("salescowboy_active_audit", JSON.stringify(audit));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    } catch (e) {}
  };

  // Print Action
  const handlePrint = () => {
    window.print();
  };

  // Copy Shareable Link Action
  const handleCopyLink = () => {
    const b64 = serializeAudit(audit);
    const url = `${window.location.origin}/audit-generator?data=${encodeURIComponent(b64)}&view=client`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Copy WhatsApp Pitch Message Action
  const handleCopyPitch = () => {
    const b64 = serializeAudit(audit);
    const url = `${window.location.origin}/audit-generator?data=${encodeURIComponent(b64)}&view=client`;
    const pitch = `Hello Management,

We prepared an Executive Digital Revenue & Infrastructure Audit for *${audit.hotelName}*.

*Key Findings:*
• Overall Digital Health Score: *${audit.healthScore}/100* (${audit.scoreStatus})
• Estimated Monthly Uncaptured Revenue: *${audit.monthlyLeakageMin} - ${audit.monthlyLeakageMax} / month*
• Critical Leaks Identified: Missing direct booking availability & uncollected Google reviews.

You can view the full diagnostic report, search simulation, and 4-week turnaround plan here:
${url}

Best regards,
Sales Cowboy Marketing Solutions
+234 810 493 3232`;

    navigator.clipboard.writeText(pitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-950 flex flex-col antialiased">
      {/* Comprehensive Print Styles for Exact 4-Page Output */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 10mm;
          }
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
          .page-break {
            page-break-before: always;
            break-before: page;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `,
        }}
      />

      {/* Floating Toolbar */}
      <header className="bg-slate-950 border-b border-slate-800 text-white py-3 px-4 sm:px-6 sticky top-0 z-40 shadow-md no-print flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-sm font-extrabold tracking-widest uppercase text-white font-mono">
              SALES COWBOY
            </span>
          </Link>
          <span className="h-4 w-px bg-slate-700 hidden sm:block"></span>
          <span className="text-xs text-slate-300 font-bold uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {isClientMode ? "Executive Audit Brief" : "Hotel Audit Engine"}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Preset Buttons (Hidden in Client View) */}
          {!isClientMode && (
            <div className="hidden lg:flex items-center gap-1.5 mr-2 bg-slate-900 p-1 rounded-md border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-400 px-2 font-bold">Presets:</span>
              <button
                onClick={() => setAudit(PRESET_EKABO)}
                className="text-[11px] font-bold px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                Ek&apos;abo Inn
              </button>
              <button
                onClick={() => setAudit(PRESET_GLOVER)}
                className="text-[11px] font-bold px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                Glover Apts
              </button>
              <button
                onClick={() => setAudit(PRESET_BLANK)}
                className="text-[11px] font-bold px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors"
              >
                + New Blank
              </button>
            </div>
          )}

          {/* Tab Switcher (Hidden in Client View) */}
          {!isClientMode && (
            <div className="flex items-center bg-slate-900 p-1 rounded-md border border-slate-800">
              <button
                onClick={() => setActiveTab("editor")}
                className={`text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-all ${
                  activeTab === "editor"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editor</span>
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-all ${
                  activeTab === "preview"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            </div>
          )}

          {/* Save Draft Button (Internal Mode Only) */}
          {!isClientMode && (
            <button
              onClick={handleSaveDraft}
              className="bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-700"
              title="Save draft to browser storage"
            >
              <Save className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">{savedSuccess ? "Saved!" : "Save"}</span>
            </button>
          )}

          {/* Copy Link Button */}
          {!isClientMode && (
            <button
              onClick={handleCopyLink}
              className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-700"
              title="Copy shareable link for client"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
            </button>
          )}

          {/* Copy WhatsApp Pitch Button */}
          {!isClientMode && (
            <button
              onClick={handleCopyPitch}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Copy WhatsApp pitch message"
            >
              {copiedPitch ? <Check className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedPitch ? "Pitch Copied!" : "WhatsApp Pitch"}</span>
            </button>
          )}

          {/* Client WhatsApp Button (in client view) */}
          {isClientMode && (
            <a
              href={`https://wa.me/2348104933232?text=Hello%20Sales%20Cowboy,%20we%20reviewed%20the%20${encodeURIComponent(audit.hotelName)}%20audit%20and%20want%20to%20discuss%20the%20turnaround%20plan.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discuss on WhatsApp</span>
            </a>
          )}

          {/* Print / Save PDF */}
          <button
            onClick={handlePrint}
            className="bg-white hover:bg-slate-100 text-slate-950 px-3.5 py-1.5 rounded-md text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex justify-center py-8 px-4 sm:px-6">
        {/* ======================= TAB 1: FORM EDITOR ======================= */}
        {!isClientMode && activeTab === "editor" && (
          <div className="w-full max-w-[1020px] bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 text-white shadow-2xl no-print">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                  INTERNAL EMPLOYEE SUITE
                </span>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1">
                  Hotel Revenue Audit Generator
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fill in the hotel details below. Everything is customizable: scores, strengths, mistakes, search results, and roadmap.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={calculateScore}
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold px-3 py-2 rounded-md flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Recalculate Score</span>
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className="bg-white text-slate-950 hover:bg-slate-100 text-xs font-extrabold px-4 py-2 rounded-md flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Final Audit</span>
                </button>
              </div>
            </div>

            {/* Form Sections Grid */}
            <div className="mt-6 space-y-8">
              
              {/* Section 1: Property Basics */}
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  1. Property Profile &amp; Location
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Hotel / Property Name</label>
                    <input
                      type="text"
                      value={audit.hotelName}
                      onChange={(e) => updateField("hotelName", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-medium focus:border-white focus:outline-none"
                      placeholder="e.g. Grand Sapphire Hotel"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Property Tier / Class</label>
                    <input
                      type="text"
                      value={audit.tier}
                      onChange={(e) => updateField("tier", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-medium focus:border-white focus:outline-none"
                      placeholder="e.g. 3-Star Budget Hotel / Serviced Apts"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">City &amp; Area</label>
                    <input
                      type="text"
                      value={audit.cityArea}
                      onChange={(e) => updateField("cityArea", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-medium focus:border-white focus:outline-none"
                      placeholder="e.g. Oregun, Ikeja"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 font-semibold mb-1">Full Physical Address</label>
                    <input
                      type="text"
                      value={audit.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-medium focus:border-white focus:outline-none"
                      placeholder="Street, Landmark, Area, City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Direct Phone Number</label>
                    <input
                      type="text"
                      value={audit.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-medium focus:border-white focus:outline-none"
                      placeholder="e.g. +234 810 493 3232"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Reference Number</label>
                    <input
                      type="text"
                      value={audit.refNumber}
                      onChange={(e) => updateField("refNumber", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-mono focus:border-white focus:outline-none"
                      placeholder="AUD-XYZ-2026-001"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Audit Date</label>
                    <input
                      type="text"
                      value={audit.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white focus:border-white focus:outline-none"
                      placeholder="e.g. November 07, 2026"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: 5-Pillar Scores & Revenue Leakage */}
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 mb-4 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  2. 5-Pillar Scores &amp; Revenue Leakage
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Website Score (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={audit.scoreWebsite}
                      onChange={(e) => {
                        updateField("scoreWebsite", Number(e.target.value));
                        calculateScore();
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Google Maps Score (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={audit.scoreGbp}
                      onChange={(e) => {
                        updateField("scoreGbp", Number(e.target.value));
                        calculateScore();
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">OTA Health Score (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={audit.scoreOta}
                      onChange={(e) => {
                        updateField("scoreOta", Number(e.target.value));
                        calculateScore();
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Local Search (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={audit.scoreLocalSearch}
                      onChange={(e) => {
                        updateField("scoreLocalSearch", Number(e.target.value));
                        calculateScore();
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Review Bot (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={audit.scoreReviewSystem}
                      onChange={(e) => {
                        updateField("scoreReviewSystem", Number(e.target.value));
                        calculateScore();
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-mono focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Overall Health Score (0-100)</label>
                    <input
                      type="number"
                      value={audit.healthScore}
                      onChange={(e) => updateField("healthScore", Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-mono font-bold text-base focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Score Badge Label</label>
                    <input
                      type="text"
                      value={audit.scoreStatus}
                      onChange={(e) => updateField("scoreStatus", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-mono font-bold focus:border-white focus:outline-none"
                      placeholder="CRITICAL BLIND SPOT"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Est. Monthly Leakage Range</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={audit.monthlyLeakageMin}
                        onChange={(e) => updateField("monthlyLeakageMin", e.target.value)}
                        className="w-1/2 bg-slate-900 border border-slate-700 rounded-md p-2 text-white font-mono text-xs focus:border-white focus:outline-none"
                        placeholder="₦2,000,000"
                      />
                      <span className="text-slate-500 font-mono">-</span>
                      <input
                        type="text"
                        value={audit.monthlyLeakageMax}
                        onChange={(e) => updateField("monthlyLeakageMax", e.target.value)}
                        className="w-1/2 bg-slate-900 border border-slate-700 rounded-md p-2 text-white font-mono text-xs focus:border-white focus:outline-none"
                        placeholder="₦4,500,000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: 4 Key Metric Callout Cards */}
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 mb-4">
                  3. Key Metric Cards (The 4 Header Stats)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  {audit.kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg space-y-2">
                      <span className="font-mono text-[10px] text-slate-500 block">CARD 0{idx + 1}</span>
                      <input
                        type="text"
                        value={kpi.num}
                        onChange={(e) => {
                          const newKpis = [...audit.kpis];
                          newKpis[idx].num = cleanText(e.target.value);
                          updateField("kpis", newKpis);
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-white font-mono font-bold"
                        placeholder="e.g. 0 Sites / 25% Tax"
                      />
                      <input
                        type="text"
                        value={kpi.title}
                        onChange={(e) => {
                          const newKpis = [...audit.kpis];
                          newKpis[idx].title = cleanText(e.target.value);
                          updateField("kpis", newKpis);
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-white font-bold"
                        placeholder="Title"
                      />
                      <textarea
                        value={kpi.desc}
                        rows={2}
                        onChange={(e) => {
                          const newKpis = [...audit.kpis];
                          newKpis[idx].desc = cleanText(e.target.value);
                          updateField("kpis", newKpis);
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-slate-300 text-[11px]"
                        placeholder="Brief diagnostic description"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Strengths & Mistakes Editor */}
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  4. Genuine Strengths vs. What They Are Doing Wrong
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* Strengths */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                        GENUINE STRENGTHS
                      </span>
                      <button
                        onClick={() => {
                          const newStrengths = [
                            ...audit.strengths,
                            { id: `s_${Date.now()}`, title: "New Hotel Strength", desc: "Description of the asset or location." },
                          ];
                          updateField("strengths", newStrengths);
                        }}
                        className="text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Strength
                      </button>
                    </div>

                    {audit.strengths.map((str, idx) => (
                      <div key={str.id || idx} className="bg-slate-950 p-2.5 rounded border border-slate-800 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <input
                            type="text"
                            value={str.title}
                            onChange={(e) => {
                              const list = [...audit.strengths];
                              list[idx].title = cleanText(e.target.value);
                              updateField("strengths", list);
                            }}
                            className="w-5/6 bg-transparent font-bold text-white text-xs border-b border-slate-700 focus:outline-none"
                            placeholder="Strength Title"
                          />
                          <button
                            onClick={() => {
                              const list = audit.strengths.filter((_, i) => i !== idx);
                              updateField("strengths", list);
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <textarea
                          value={str.desc}
                          rows={2}
                          onChange={(e) => {
                            const list = [...audit.strengths];
                            list[idx].desc = cleanText(e.target.value);
                            updateField("strengths", list);
                          }}
                          className="w-full bg-transparent text-slate-300 text-[11px] focus:outline-none"
                          placeholder="Strength details"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Mistakes */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-red-400 uppercase tracking-wider text-[11px]">
                        WHAT THEY ARE DOING WRONG
                      </span>
                      <button
                        onClick={() => {
                          const newMistakes = [
                            ...audit.mistakes,
                            { id: `m_${Date.now()}`, title: "New Critical Mistake", desc: "Description of the operational bottleneck." },
                          ];
                          updateField("mistakes", newMistakes);
                        }}
                        className="text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Mistake
                      </button>
                    </div>

                    {audit.mistakes.map((mis, idx) => (
                      <div key={mis.id || idx} className="bg-slate-950 p-2.5 rounded border border-slate-800 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <input
                            type="text"
                            value={mis.title}
                            onChange={(e) => {
                              const list = [...audit.mistakes];
                              list[idx].title = cleanText(e.target.value);
                              updateField("mistakes", list);
                            }}
                            className="w-5/6 bg-transparent font-bold text-red-300 text-xs border-b border-slate-700 focus:outline-none"
                            placeholder="Mistake Title"
                          />
                          <button
                            onClick={() => {
                              const list = audit.mistakes.filter((_, i) => i !== idx);
                              updateField("mistakes", list);
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <textarea
                          value={mis.desc}
                          rows={2}
                          onChange={(e) => {
                            const list = [...audit.mistakes];
                            list[idx].desc = cleanText(e.target.value);
                            updateField("mistakes", list);
                          }}
                          className="w-full bg-transparent text-slate-300 text-[11px] focus:outline-none"
                          placeholder="Mistake details"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 5: Live Google Search Simulation */}
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 mb-4 flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  5. Google Search Simulation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Simulated Search Query</label>
                    <input
                      type="text"
                      value={audit.searchQuery}
                      onChange={(e) => updateField("searchQuery", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white font-mono text-xs"
                      placeholder="e.g. Hotels in Oregun Ikeja"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Search City / State</label>
                    <input
                      type="text"
                      value={audit.searchLocation}
                      onChange={(e) => updateField("searchLocation", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-md p-2.5 text-white"
                      placeholder="e.g. Ikeja, Lagos"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Competitor 1 */}
                  <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg space-y-2">
                    <span className="font-mono text-[10px] text-slate-400 font-bold block">COMPETITOR #1</span>
                    <input
                      type="text"
                      value={audit.competitor1.title}
                      onChange={(e) =>
                        updateField("competitor1", { ...audit.competitor1, title: cleanText(e.target.value) })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-white font-bold"
                      placeholder="Competitor Title"
                    />
                    <textarea
                      value={audit.competitor1.snippet}
                      rows={3}
                      onChange={(e) =>
                        updateField("competitor1", { ...audit.competitor1, snippet: cleanText(e.target.value) })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-slate-300 text-[11px]"
                      placeholder="Rating and snippet"
                    />
                  </div>

                  {/* Competitor 2 */}
                  <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg space-y-2">
                    <span className="font-mono text-[10px] text-slate-400 font-bold block">COMPETITOR #2</span>
                    <input
                      type="text"
                      value={audit.competitor2.title}
                      onChange={(e) =>
                        updateField("competitor2", { ...audit.competitor2, title: cleanText(e.target.value) })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-white font-bold"
                      placeholder="Competitor Title"
                    />
                    <textarea
                      value={audit.competitor2.snippet}
                      rows={3}
                      onChange={(e) =>
                        updateField("competitor2", { ...audit.competitor2, snippet: cleanText(e.target.value) })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-slate-300 text-[11px]"
                      placeholder="Rating and snippet"
                    />
                  </div>

                  {/* Client Result */}
                  <div className="bg-slate-900 border border-red-900/60 p-3.5 rounded-lg space-y-2">
                    <span className="font-mono text-[10px] text-red-400 font-bold block">CLIENT RESULT (BROKEN/GHOST)</span>
                    <input
                      type="text"
                      value={audit.clientSearchResult.title}
                      onChange={(e) =>
                        updateField("clientSearchResult", { ...audit.clientSearchResult, title: cleanText(e.target.value) })
                      }
                      className="w-full bg-slate-950 border border-red-800 rounded p-1.5 text-red-300 font-bold"
                      placeholder="Client Title"
                    />
                    <textarea
                      value={audit.clientSearchResult.snippet}
                      rows={3}
                      onChange={(e) =>
                        updateField("clientSearchResult", { ...audit.clientSearchResult, snippet: cleanText(e.target.value) })
                      }
                      className="w-full bg-slate-950 border border-red-800 rounded p-1.5 text-slate-300 text-[11px]"
                      placeholder="Why searchers skip or fail to find client"
                    />
                  </div>
                </div>
              </div>

              {/* Section 6: Funnel Stages */}
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 mb-4 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  6. Guest Drop-off Funnel Stages
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  {audit.funnel.map((fn, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg space-y-2">
                      <span className="font-mono text-[10px] text-slate-500 block">STAGE {idx + 1}</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={fn.count}
                          onChange={(e) => {
                            const list = [...audit.funnel];
                            list[idx].count = cleanText(e.target.value);
                            updateField("funnel", list);
                          }}
                          className="w-1/2 bg-slate-950 border border-slate-700 rounded p-1.5 text-white font-mono font-bold"
                          placeholder="Count"
                        />
                        <input
                          type="number"
                          value={fn.pct}
                          onChange={(e) => {
                            const list = [...audit.funnel];
                            list[idx].pct = Number(e.target.value);
                            updateField("funnel", list);
                          }}
                          className="w-1/2 bg-slate-950 border border-slate-700 rounded p-1.5 text-white font-mono"
                          placeholder="Width %"
                        />
                      </div>
                      <input
                        type="text"
                        value={fn.label}
                        onChange={(e) => {
                          const list = [...audit.funnel];
                          list[idx].label = cleanText(e.target.value);
                          updateField("funnel", list);
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-white font-bold"
                        placeholder="Stage Label"
                      />
                      <input
                        type="text"
                        value={fn.drop}
                        onChange={(e) => {
                          const list = [...audit.funnel];
                          list[idx].drop = cleanText(e.target.value);
                          updateField("funnel", list);
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-slate-300 text-[11px]"
                        placeholder="Drop-off reason"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="mt-10 pt-6 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={handleSaveDraft}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-slate-700 transition-all"
              >
                <Save className="w-4 h-4 text-blue-400" />
                <span>{savedSuccess ? "Draft Saved to Storage!" : "Save Draft"}</span>
              </button>

              <button
                onClick={() => setActiveTab("preview")}
                className="bg-white hover:bg-slate-100 text-slate-950 px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <span>View Final Audit Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ======================= TAB 2: LIVE PREVIEW (EXECUTIVE LETTERHEAD) ======================= */}
        {(isClientMode || activeTab === "preview") && (
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
                <p className="text-xs font-extrabold text-slate-950 mt-0.5">REF: {audit.refNumber}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{audit.date}</p>
              </div>
            </div>

            {/* Client Banner */}
            <div className="mt-7 pb-5 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block">
                  PREPARED FOR MANAGEMENT &amp; OWNERSHIP
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 mt-1">
                  {audit.hotelName}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  {audit.address} • Phone: {audit.phone}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-[11px] font-bold px-3 py-1.5 rounded bg-slate-100 border border-slate-200 text-slate-950">
                  {audit.cityArea}
                </span>
                <span className="font-mono text-[11px] font-bold px-3 py-1.5 rounded bg-slate-100 border border-slate-200 text-slate-950">
                  {audit.tier}
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
                    stroke={audit.healthScore < 30 ? "#ef4444" : "#ffffff"}
                    strokeWidth="10"
                    strokeDasharray="314"
                    strokeDashoffset={Math.round(314 * (1 - audit.healthScore / 100))}
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
                    {audit.healthScore}
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
                  {audit.scoreStatus}
                </span>
              </div>

              {/* 5-Axis Bars */}
              <div className="p-6 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    5-Pillar Digital Infrastructure Scorecard
                  </h3>
                  <span className="font-mono text-xs font-bold text-red-300">
                    Est. Uncaptured: {audit.monthlyLeakageMin} - {audit.monthlyLeakageMax} / Month
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: "1. Direct Website", pct: `${Math.max(2, audit.scoreWebsite)}%`, score: `${audit.scoreWebsite} / 100` },
                    { label: "2. Google Maps (GBP)", pct: `${Math.max(2, audit.scoreGbp)}%`, score: `${audit.scoreGbp} / 100` },
                    { label: "3. OTA Dependency Tax", pct: `${Math.max(2, audit.scoreOta)}%`, score: `${audit.scoreOta} / 100` },
                    { label: "4. Local Search Signals", pct: `${Math.max(2, audit.scoreLocalSearch)}%`, score: `${audit.scoreLocalSearch} / 100` },
                    { label: "5. Post-Stay Review Bot", pct: `${Math.max(2, audit.scoreReviewSystem)}%`, score: `${audit.scoreReviewSystem} / 100` },
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
              {audit.kpis.map((kpi, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <span className="font-mono text-2xl font-extrabold text-slate-950 block leading-none">
                    {kpi.num}
                  </span>
                  <span className="text-[11px] font-extrabold text-slate-950 uppercase tracking-wide block mt-2">
                    {kpi.title}
                  </span>
                  <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                    {kpi.desc}
                  </span>
                </div>
              ))}
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
                    {audit.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-slate-950 min-w-[14px]">{i + 1}.</span>
                        <div>
                          <strong className="text-slate-950">{str.title}:</strong> {str.desc}
                        </div>
                      </li>
                    ))}
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
                    {audit.mistakes.map((mis, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-red-800 min-w-[14px]">{i + 1}.</span>
                        <div>
                          <strong className="text-red-950">{mis.title}:</strong> {mis.desc}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Page Break for clean multi-page print */}
            <div className="page-break"></div>

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
                {/* Search Bar */}
                <div className="bg-white border border-slate-300 rounded-md px-4 py-2.5 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-950">
                    <Search className="w-4 h-4 text-slate-500" />
                    <span>Google Search: &ldquo;{audit.searchQuery}&rdquo;</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500 hidden sm:block">{audit.searchLocation}</span>
                </div>

                {/* SERP Cards */}
                <div className="space-y-2.5">
                  <div className="bg-white border border-slate-200 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <p className="text-sm font-extrabold text-slate-950">
                        {audit.competitor1.title}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {audit.competitor1.snippet}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-950 whitespace-nowrap">
                      {audit.competitor1.badge}
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <p className="text-sm font-extrabold text-slate-950">
                        {audit.competitor2.title}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {audit.competitor2.snippet}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-950 whitespace-nowrap">
                      {audit.competitor2.badge}
                    </span>
                  </div>

                  <div className="bg-red-50 border-2 border-dashed border-red-700 rounded-md p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <p className="text-sm font-extrabold text-red-950">
                        {audit.clientSearchResult.title}
                      </p>
                      <p className="text-xs text-red-700 mt-0.5">
                        {audit.clientSearchResult.snippet}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-red-800 text-white whitespace-nowrap">
                      {audit.clientSearchResult.badge}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* VISUAL 02: Drop-off Funnel */}
            <div className="mt-10">
              <div className="flex justify-between items-end pb-2 border-b-2 border-slate-950">
                <div>
                  <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    VISUAL DIAGNOSTIC 02
                  </span>
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                    Where Guests Drop Off Today
                  </h3>
                </div>
                <span className="font-mono text-[11px] font-bold text-slate-600 hidden sm:block">
                  Trajectory of 100 High-Intent Searchers
                </span>
              </div>

              <div className="mt-4 border border-slate-200 rounded-lg p-5 bg-white space-y-3.5">
                {audit.funnel.map((row, idx) => (
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
                          row.isDark ? "bg-red-800" : "bg-slate-800"
                        }`}
                        style={{ width: `${row.pct}%` }}
                      >
                        {row.label}
                      </div>
                    </div>
                    <div
                      className={`font-mono text-[11px] sm:text-right ${
                        row.isDark ? "font-extrabold text-red-950" : "font-bold text-slate-700"
                      }`}
                    >
                      {row.drop}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Page Break for clean multi-page print */}
            <div className="page-break"></div>

            {/* VISUAL 03: Comparison Table */}
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

              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-white font-mono text-[11px] uppercase">
                      <th className="p-3 text-left w-1/4">Channel</th>
                      <th className="p-3 text-left w-3/8 text-red-300">Current Broken State</th>
                      <th className="p-3 text-left w-3/8 text-emerald-300">Sales Cowboy Upgrade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {audit.comparisonRows.map((row, i) => (
                      <tr key={i} className={`border-b border-slate-200 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                        <td className="p-3 font-bold text-slate-950 align-top">{row.channel}</td>
                        <td className="p-3 font-semibold text-red-800 align-top leading-relaxed">{row.current}</td>
                        <td className="p-3 font-semibold text-slate-950 align-top leading-relaxed">{row.upgraded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Page Break for clean multi-page print */}
            <div className="page-break"></div>

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
                {audit.pillars.map((p, i) => (
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
                      <p className="text-[11px] text-slate-600 mb-3">{p.desc}</p>
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
                    Captured through friction-free direct bookings, live calendars, and Google 3-Pack rank
                  </p>
                </div>
                <div className="sm:text-right">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
                    +{audit.monthlyLeakageMin} - {audit.monthlyLeakageMax}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-slate-400 block mt-0.5">
                    Estimated Monthly Revenue Uplift
                  </span>
                </div>
              </div>

              <div className="p-6 bg-slate-50 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Current Digital Capture</span>
                    <span className="font-mono">~10% - 25% Digital Potential</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded overflow-hidden">
                    <div className="h-full bg-slate-500 w-[15%]" />
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
                {audit.roadmap.map((s, i) => (
                  <div key={i} className="border border-slate-200 bg-slate-50 rounded-md p-3.5">
                    <span className="font-mono text-[10px] font-extrabold text-slate-500 block">
                      {s.week}
                    </span>
                    <h5 className="text-xs font-extrabold text-slate-950 mt-1 mb-1.5">
                      {s.title}
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
                  Ready to Deploy the {audit.hotelName} Revenue Engine?
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  We handle the complete setup: direct booking website with room availability tracking, 24/7 WhatsApp AI concierge with automated review reminders, and Google Maps management.
                </p>
              </div>
              <a
                href={`https://wa.me/2348104933232?text=Hello%20Sales%20Cowboy,%20we%20reviewed%20the%20${encodeURIComponent(audit.hotelName)}%20audit%20and%20want%20to%20discuss%20the%20turnaround%20plan.`}
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
        )}
      </div>
    </div>
  );
}

// Suspense wrapper for static compilation compliance
export default function AuditGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center font-sans">
          <div className="animate-pulse flex flex-col items-center gap-3">
            <span className="text-xl font-bold font-mono tracking-widest uppercase">
              Sales Cowboy
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              Loading Audit Engine...
            </span>
          </div>
        </div>
      }
    >
      <AuditGeneratorContent />
    </Suspense>
  );
}
