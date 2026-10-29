/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Plus, 
  Trash2, 
  Share2, 
  Copy, 
  RotateCcw, 
  FileText, 
  Eye, 
  Edit2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Sparkles,
  Printer,
  ChevronDown,
  Calendar,
  DollarSign,
  CheckCircle2,
  ListPlus,
  Send,
  Cloud
} from "lucide-react";

// Interfaces
interface ScopeModule {
  id: string;
  title: string;
  timeline: string;
  cost: number;
  description: string;
  deliverables: string[];
}

interface ProposalState {
  proposalTitle: string;
  proposalId: string;
  proposalDate: string;
  
  senderName: string;
  senderDesignation: string;
  senderAddress: string;
  senderEmail: string;
  senderPhone: string;
  senderWebsite: string;
  
  clientName: string;
  clientContact: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  
  projectOverview: string;
  modules: ScopeModule[];
  currency: string;
  taxRate: number;
  discount: number;
  includeTax: boolean;
  
  paymentMilestones: { label: string; percentage: number }[];
  paymentInfo: string;
  notes: string;
}

const DEFAULT_SENDER = {
  senderName: "Clinton Chukwunyere",
  senderDesignation: "Chief Software & Cloud Engineer",
  senderAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232",
  senderWebsite: "salescowboy.com.ng",
};

const PRESETS = [
  {
    name: "On-Demand Geolocation Dispatch (₦750k)",
    title: "On-Demand Geolocation Dispatch, Real-Time Tracking & Provider Booking Ecosystem",
    overview: "This technical proposal details the end-to-end design, system architecture, custom development, and cloud deployment of a real-time on-demand service and dispatch ecosystem (comparable to Uber/Bolt architecture). The system interconnects three synchronized applications: a Customer App (discovery, booking, live tracking, and escrow checkout), a Provider App (online/offline toggle, radar dispatch notifications, background GPS emission, and job lifecycle execution), and a central Backend Infrastructure featuring Redis Geospatial indexing, WebSocket event streams, a strict Finite State Machine (FSM), and an Admin Control Console.",
    modules: [
      {
        id: "1",
        title: "Module 1: Real-Time Geospatial Indexing, Location Cache & WebSockets Infrastructure",
        timeline: "Week 1 (Days 1 - 7)",
        cost: 160000,
        description: "High-throughput backend infrastructure engineered to handle real-time geospatial queries, provider location pings, and low-latency bidirectional location streaming without database lockups.",
        deliverables: [
          "In-memory Redis Geospatial Indexing (GEOADD, GEORADIUS/GEOSEARCH) handling high-frequency provider (lat, lng) pings with automated TTL expiration to prevent PostgreSQL write contention",
          "Radial geofenced query engine filtering active providers within 5km/10km radius with metadata (base fee, hourly rate, rating, ETA)",
          "WebSocket / PubSub gateway (Socket.io/Redis PubSub) multiplexing sub-second location updates into dedicated 'job:{id}:tracking' channels",
          "Event throttling pipeline (emitting coordinates every 3-5 seconds or 10 meters) to optimize server bandwidth and prevent client battery drain",
          "PostgreSQL + PostGIS persistent master database schema for user profiles, transaction ledgers, service categories, and polygon service boundaries"
        ]
      },
      {
        id: "2",
        title: "Module 2: Customer Client Application (Discovery, Booking, Escrow Checkout & Live Tracking)",
        timeline: "Week 2 (Days 8 - 14)",
        cost: 165000,
        description: "Responsive, mobile-optimized cross-platform application empowering customers to discover nearby verified providers, compare transparent rates, book, and track approaching providers on a live interactive map.",
        deliverables: [
          "Location Discovery & Radial Map View: Interactive map rendering nearby available service providers with dynamic category filtering and price tags",
          "Provider Dossier & Rate Card: Detailed provider profiles displaying verified badges, past client ratings/reviews, base call-out fees, and estimated arrival times (ETA)",
          "Direct & Broadcast Booking Checkout: Dual booking flow supporting both direct provider selection (with 30-45s accept timer) and auto-pool broadcast dispatch",
          "Live Interactive Turn-by-Turn Map Tracking: Smooth vector marker interpolation showing the provider's vehicle/marker approaching along calculated route polylines",
          "Payment & Escrow Integration: Card / USSD / Bank Transfer payment capture with automated platform escrow hold (funds locked until service delivery confirmation)",
          "Security Handshake (OTP): 4-digit verification code generated for the customer to give to the provider upon physical arrival"
        ]
      },
      {
        id: "3",
        title: "Module 3: Provider Partner Application (Radar Dispatch, Turn Navigation & Background GPS)",
        timeline: "Week 3 (Days 15 - 21)",
        cost: 165000,
        description: "Dedicated mobile partner interface providing gig workers with real-time job radar dispatch alerts, turn-by-turn route guidance, earnings tracking, and hardened background location tracking.",
        deliverables: [
          "Availability State Manager: Single-tap Online / Offline toggle broadcasting availability to the Redis Geospatial cache",
          "Incoming Dispatch Radar: Audio/visual modal alert with countdown timer (30-45s) displaying customer distance, service type, and estimated earnings",
          "Persistent Background Location Service: Foreground service (Android) & background location tracking (iOS) with persistent notification channel preventing OS battery-saver killing",
          "Integrated Route Navigation: One-tap launch to Google Maps / Mapbox turn navigation directly to customer destination",
          "In-App Arrival Handshake & OTP Verification: Arrival trigger requiring input of customer's 4-digit OTP to transition status to IN_PROGRESS",
          "Partner Wallet & Instant Payouts: In-app ledger displaying daily completed jobs, tips, gross earnings, platform commission deductions, and withdrawal triggers"
        ]
      },
      {
        id: "4",
        title: "Module 4: Booking Finite State Machine (FSM), Dispatch Logic & Escrow Settlement Engine",
        timeline: "Week 4 (Sprint A)",
        cost: 140000,
        description: "The core deterministic business logic engine managing job transitions, dispatch queue algorithms, cancellation windows, dead-mileage penalties, and automated wallet settlements.",
        deliverables: [
          "Strict Finite State Machine (FSM) implementation: PENDING_ACCEPTANCE ➔ ACCEPTED ➔ ON_ROUTE ➔ ARRIVED ➔ IN_PROGRESS ➔ COMPLETED ➔ PAID / CANCELLED",
          "Automated Dispatch Waterfall Logic: Nearest 3-5 providers ranked by distance and rating; sequential 35s timeout fallback to next provider",
          "Cancellation Window & Dead-Mileage Fee Engine: Automated cancellation penalty applied if customer cancels after provider has traveled for >3 minutes, compensating provider's transit fuel/time",
          "Map API Cost-Optimization Architecture: Routing polylines computed once upon job acceptance; client-side vector bearing calculations handle real-time marker rotation to eliminate third-party API fee burn",
          "Automated Escrow Release: Automatic split logic releasing customer escrow hold to provider wallet (minus configurable platform commission 15-20%) upon verified job completion"
        ]
      },
      {
        id: "5",
        title: "Module 5: Super-Admin Control Console, Fleet Oversight, Dispute Resolution & Analytics",
        timeline: "Week 4 (Sprint B)",
        cost: 120000,
        description: "Comprehensive back-office administrative portal providing operational oversight over active bookings, provider KYC verification, dispute resolution, and platform revenue metrics.",
        deliverables: [
          "Live Fleet Radar: Real-time map dashboard monitoring all active jobs, online providers, and current transit status across the city",
          "Provider KYC & Onboarding Review: Verification portal for driver's licenses, government IDs, background checks, and vehicle/equipment inspection photos",
          "Manual Dispatch & Emergency Override: Capability for support agents to reassign jobs, cancel stalled bookings, or manually reroute dispatch orders",
          "Dispute & Refund Management Console: Structured dispute workflow with access to GPS route breadcrumbs, chat history, and one-click escrow refund or partial payout allocation",
          "Financial Analytics & Settlement Reports: Executive KPIs tracking gross booking volume (GMV), platform net commission, provider payouts, cancellation rates, and exportable financial ledgers"
        ]
      }
    ]
  },
  {
    name: "₦75k Website Proposal",
    title: "₦75k Professional Business Website Build",
    overview: "This proposal covers the design, domain setup, hosting activation, search engine optimization, and custom business email setup for your company. It delivers a fast, responsive, 5-page website to kickstart your online brand presence in Nigeria.",
    modules: [
      {
        id: "1",
        title: "Phase 1: Setup, Domain Mapping & Secure Hosting Setup",
        timeline: "3 Days",
        cost: 30000,
        description: "Procurement of your desired .com.ng domain name, setting up private cloud servers, installing secure SSL certificates, and configuring custom business emails.",
        deliverables: [
          "1-Year .com.ng domain registration",
          "1-Year secure cloud hosting setup",
          "SSL security padlock configuration",
          "Branded corporate emails (e.g. info@company.com)"
        ]
      },
      {
        id: "2",
        title: "Phase 2: Frontend Design, Content Mapping & SEO Launch",
        timeline: "4 Days",
        cost: 45000,
        description: "Creating a fully responsive website layout (up to 5 pages) optimized for mobile and desktop, integrating text/image copywriting, linking contact forms, and launching on Google search index.",
        deliverables: [
          "5 responsive web pages (Home, About, Services, Gallery, Contact)",
          "WhatsApp chat widgets & contact form integrations",
          "Local SEO keyword indexing",
          "Google search console registration"
        ]
      }
    ]
  },
  {
    name: "Courier Tracker App (₦600k)",
    title: "Custom Logistics & Courier Dispatch Tracker Engine",
    overview: "This proposal outlines the design, database architecture, backend dispatch admin panels, and driver portal APIs to deploy a secure web-based shipment tracker. It enables real-time parcel updates and automated SMS tracking notifications for clients.",
    modules: [
      {
        id: "1",
        title: "Phase 1: Database Architecture, APIs & Public Customer Portal",
        timeline: "2 Weeks",
        cost: 250000,
        description: "Setting up relational cloud databases, defining driver and courier tracking endpoints, and building the public customer tracking check page.",
        deliverables: [
          "Relational D1 cloud database setup",
          "Customer parcel status lookup page",
          "Driver location API updates",
          "Clean responsive UI layouts"
        ]
      },
      {
        id: "2",
        title: "Phase 2: Admin Dispatch Room, SMS Alerts & Paystack Gateways",
        timeline: "2 Weeks",
        cost: 350000,
        description: "Developing the master administrative console to manage dispatch runs, integrating Twilio SMS auto-messages, setting up Paystack card processor, and launching the system.",
        deliverables: [
          "Admin dispatch control center",
          "Twilio automated SMS tracking link sender",
          "Paystack card/bank payment gateways",
          "Staff training and handoff documentation"
        ]
      }
    ]
  },
  {
    name: "School Portal & Fees (₦950k)",
    title: "Unified School Portal & Fee Installment Ledger System",
    overview: "A comprehensive school database system allowing management, bursars, and parents to track academic profiles, calculate report sheets, publish calendars, and track installment payment receipts through automated gateways.",
    modules: [
      {
        id: "1",
        title: "Phase 1: Academic Calendars, Student Database & Teacher Portals",
        timeline: "3 Weeks",
        cost: 400000,
        description: "Structuring student, parent, and teacher directories, academic grade logs, auto-averaging report sheets, and public calendar listings.",
        deliverables: [
          "Student directory database",
          "Teacher grading & result-input console",
          "Auto-averaging report sheet generator",
          "Interactive school calendar dashboard"
        ]
      },
      {
        id: "2",
        title: "Phase 2: Installment Fee Tracker, Bursar Console & Paystack API",
        timeline: "3 Weeks",
        cost: 550000,
        description: "Developing the installment tracker, integrating Paystack payment gateway, building the bursar audit panel, and sending automatic payment reminders to parent phone numbers.",
        deliverables: [
          "Bursary ledger panel",
          "Installment payment selector for parents",
          "Paystack billing API integrations",
          "Parent automated SMS payment receipts"
        ]
      }
    ]
  },
  {
    name: "Multi-Branch POS Suite (₦1.5M)",
    title: "Multi-Branch POS & Centralized Cloud Inventory Suite",
    overview: "A centralized Point-of-Sale (POS) and inventory control solution for stores, supermarkets, or distribution hubs operating multiple physical branches. Enables offline sales, barcode scanning, cloud sync, and centralized reporting.",
    modules: [
      {
        id: "1",
        title: "Phase 1: Offline POS Terminal, Stock Registers & Barcodes",
        timeline: "4 Weeks",
        cost: 700000,
        description: "Designing offline-ready cashier terminals, configuring hardware scanner APIs, setting up automatic stock alert triggers, and building branch databases.",
        deliverables: [
          "Offline cashier checkout view",
          "Barcode scanner driver integration",
          "Low-stock email/SMS alert configurations",
          "Individual branch inventory directories"
        ]
      },
      {
        id: "2",
        title: "Phase 2: Master Cloud Audit Console & Live Sync Protocols",
        timeline: "4 Weeks",
        cost: 800000,
        description: "Developing the central administration control room for multi-branch reporting, building real-time synchronization, and integrating centralized profit analytics.",
        deliverables: [
          "Centralized branch performance dashboard",
          "Real-time database sync protocols",
          "Financial profit/loss auditing metrics",
          "User permission control panels"
        ]
      }
    ]
  }
];

// Helper to safely serialize JSON to base64
const serializeState = (state: ProposalState): string => {
  try {
    const str = JSON.stringify(state);
    const bytes = new TextEncoder().encode(str);
    let binString = "";
    for (let i = 0; i < bytes.length; i++) {
      binString += String.fromCharCode(bytes[i]);
    }
    return btoa(binString);
  } catch (e) {
    console.error("Failed to serialize state", e);
    return "";
  }
};

// Helper to safely deserialize base64 to JSON
const deserializeState = (base64Str: string): ProposalState | null => {
  try {
    const binString = atob(base64Str);
    const bytes = new Uint8Array(binString.length);
    for (let i = 0; i < binString.length; i++) {
      bytes[i] = binString.charCodeAt(i);
    }
    const str = new TextDecoder().decode(bytes);
    return JSON.parse(str);
  } catch (e) {
    console.error("Failed to deserialize state", e);
    return null;
  }
};

function ProposalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"edit" | "view">("edit");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  
  // Track active accordion tab in editor
  const [activeTab, setActiveTab] = useState<"project" | "modules" | "milestones" | "sender">("project");

  // Form State
  const [state, setState] = useState<ProposalState>({
    proposalTitle: "On-Demand Geolocation Dispatch, Real-Time Tracking & Provider Booking Ecosystem",
    proposalId: "",
    proposalDate: "",
    
    ...DEFAULT_SENDER,
    
    clientName: "On-Demand Platform Sponsors",
    clientContact: "Founding Team & Product Leadership",
    clientAddress: "Nigeria",
    clientEmail: "",
    clientPhone: "",
    
    projectOverview: "This technical proposal details the end-to-end design, system architecture, custom development, and cloud deployment of a real-time on-demand service and dispatch ecosystem (comparable to Uber/Bolt architecture). The system interconnects three synchronized applications: a Customer App (discovery, booking, live tracking, and escrow checkout), a Provider App (online/offline toggle, radar dispatch notifications, background GPS emission, and job lifecycle execution), and a central Backend Infrastructure featuring Redis Geospatial indexing, WebSocket event streams, a strict Finite State Machine (FSM), and an Admin Control Console.",
    modules: [
      {
        id: "1",
        title: "Module 1: Real-Time Geospatial Indexing, Location Cache & WebSockets Infrastructure",
        timeline: "Week 1 (Days 1 - 7)",
        cost: 160000,
        description: "High-throughput backend infrastructure engineered to handle real-time geospatial queries, provider location pings, and low-latency bidirectional location streaming without database lockups.",
        deliverables: [
          "In-memory Redis Geospatial Indexing (GEOADD, GEORADIUS/GEOSEARCH) handling high-frequency provider (lat, lng) pings with automated TTL expiration to prevent PostgreSQL write contention",
          "Radial geofenced query engine filtering active providers within 5km/10km radius with metadata (base fee, hourly rate, rating, ETA)",
          "WebSocket / PubSub gateway (Socket.io/Redis PubSub) multiplexing sub-second location updates into dedicated 'job:{id}:tracking' channels",
          "Event throttling pipeline (emitting coordinates every 3-5 seconds or 10 meters) to optimize server bandwidth and prevent client battery drain",
          "PostgreSQL + PostGIS persistent master database schema for user profiles, transaction ledgers, service categories, and polygon service boundaries"
        ]
      },
      {
        id: "2",
        title: "Module 2: Customer Client Application (Discovery, Booking, Escrow Checkout & Live Tracking)",
        timeline: "Week 2 (Days 8 - 14)",
        cost: 165000,
        description: "Responsive, mobile-optimized cross-platform application empowering customers to discover nearby verified providers, compare transparent rates, book, and track approaching providers on a live interactive map.",
        deliverables: [
          "Location Discovery & Radial Map View: Interactive map rendering nearby available service providers with dynamic category filtering and price tags",
          "Provider Dossier & Rate Card: Detailed provider profiles displaying verified badges, past client ratings/reviews, base call-out fees, and estimated arrival times (ETA)",
          "Direct & Broadcast Booking Checkout: Dual booking flow supporting both direct provider selection (with 30-45s accept timer) and auto-pool broadcast dispatch",
          "Live Interactive Turn-by-Turn Map Tracking: Smooth vector marker interpolation showing the provider's vehicle/marker approaching along calculated route polylines",
          "Payment & Escrow Integration: Card / USSD / Bank Transfer payment capture with automated platform escrow hold (funds locked until service delivery confirmation)",
          "Security Handshake (OTP): 4-digit verification code generated for the customer to give to the provider upon physical arrival"
        ]
      },
      {
        id: "3",
        title: "Module 3: Provider Partner Application (Radar Dispatch, Turn Navigation & Background GPS)",
        timeline: "Week 3 (Days 15 - 21)",
        cost: 165000,
        description: "Dedicated mobile partner interface providing gig workers with real-time job radar dispatch alerts, turn-by-turn route guidance, earnings tracking, and hardened background location tracking.",
        deliverables: [
          "Availability State Manager: Single-tap Online / Offline toggle broadcasting availability to the Redis Geospatial cache",
          "Incoming Dispatch Radar: Audio/visual modal alert with countdown timer (30-45s) displaying customer distance, service type, and estimated earnings",
          "Persistent Background Location Service: Foreground service (Android) & background location tracking (iOS) with persistent notification channel preventing OS battery-saver killing",
          "Integrated Route Navigation: One-tap launch to Google Maps / Mapbox turn navigation directly to customer destination",
          "In-App Arrival Handshake & OTP Verification: Arrival trigger requiring input of customer's 4-digit OTP to transition status to IN_PROGRESS",
          "Partner Wallet & Instant Payouts: In-app ledger displaying daily completed jobs, tips, gross earnings, platform commission deductions, and withdrawal triggers"
        ]
      },
      {
        id: "4",
        title: "Module 4: Booking Finite State Machine (FSM), Dispatch Logic & Escrow Settlement Engine",
        timeline: "Week 4 (Sprint A)",
        cost: 140000,
        description: "The core deterministic business logic engine managing job transitions, dispatch queue algorithms, cancellation windows, dead-mileage penalties, and automated wallet settlements.",
        deliverables: [
          "Strict Finite State Machine (FSM) implementation: PENDING_ACCEPTANCE ➔ ACCEPTED ➔ ON_ROUTE ➔ ARRIVED ➔ IN_PROGRESS ➔ COMPLETED ➔ PAID / CANCELLED",
          "Automated Dispatch Waterfall Logic: Nearest 3-5 providers ranked by distance and rating; sequential 35s timeout fallback to next provider",
          "Cancellation Window & Dead-Mileage Fee Engine: Automated cancellation penalty applied if customer cancels after provider has traveled for >3 minutes, compensating provider's transit fuel/time",
          "Map API Cost-Optimization Architecture: Routing polylines computed once upon job acceptance; client-side vector bearing calculations handle real-time marker rotation to eliminate third-party API fee burn",
          "Automated Escrow Release: Automatic split logic releasing customer escrow hold to provider wallet (minus configurable platform commission 15-20%) upon verified job completion"
        ]
      },
      {
        id: "5",
        title: "Module 5: Super-Admin Control Console, Fleet Oversight, Dispute Resolution & Analytics",
        timeline: "Week 4 (Sprint B)",
        cost: 120000,
        description: "Comprehensive back-office administrative portal providing operational oversight over active bookings, provider KYC verification, dispute resolution, and platform revenue metrics.",
        deliverables: [
          "Live Fleet Radar: Real-time map dashboard monitoring all active jobs, online providers, and current transit status across the city",
          "Provider KYC & Onboarding Review: Verification portal for driver's licenses, government IDs, background checks, and vehicle/equipment inspection photos",
          "Manual Dispatch & Emergency Override: Capability for support agents to reassign jobs, cancel stalled bookings, or manually reroute dispatch orders",
          "Dispute & Refund Management Console: Structured dispute workflow with access to GPS route breadcrumbs, chat history, and one-click escrow refund or partial payout allocation",
          "Financial Analytics & Settlement Reports: Executive KPIs tracking gross booking volume (GMV), platform net commission, provider payouts, cancellation rates, and exportable financial ledgers"
        ]
      }
    ],
    currency: "₦",
    taxRate: 7.5,
    discount: 0,
    includeTax: false,
    
    paymentMilestones: [
      { label: "Milestone 1: Project Mobilization, Database & Geospatial Architecture Setup (50%)", percentage: 50 },
      { label: "Milestone 2: Mobile Apps Core, Dispatch Radar & Live Tracking Integration (30%)", percentage: 30 },
      { label: "Milestone 3: Admin Console, Escrow Settlements, Field Testing & Live Deployment (20%)", percentage: 20 },
    ],
    paymentInfo: "Bank Name: GLOBUS BANK\nAccount Name: CLINTON NNAMDI CHUKWUNYERE\nAccount Number: 9976907387",
    notes: "1. Total Project Investment: ₦750,000 fixed price.\n2. Milestone Terms: 50% Kickoff Deposit (₦375,000), 30% Mobile Core & Tracking Milestone (₦225,000), 20% Final Testing & Cloud Production Deployment (₦150,000).\n3. Cloud Infrastructure & Hosting: Client is responsible for their direct monthly cloud hosting fees (hosted on Railway at roughly $5 to $10 monthly based on active database and compute usage).\n4. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere.\n5. Delivery Timeline: Exactly 4 weeks total elapsed sprint time (28 calendar days) structured into 4 sequential 1-week sprint phases, including end-to-end integration, real-world field GPS stress testing, and production cloud deployment.",
  });

  // Load state from URL parameters
  useEffect(() => {
    const dataParam = searchParams.get("data");
    const modeParam = searchParams.get("mode");
    
    if (dataParam) {
      const decoded = deserializeState(dataParam);
      if (decoded) {
        setState(decoded);
      }
    } else {
      // Prefill date, proposal ID
      const today = new Date();
      const formatToday = today.toISOString().split("T")[0];
      const randomId = Math.floor(100 + Math.random() * 900);
      const propId = `PROP-${today.getFullYear()}-${randomId}`;

      setState(prev => ({
        ...prev,
        proposalDate: formatToday,
        proposalId: propId
      }));
    }

    if (modeParam === "view") {
      setViewMode("view");
    }
  }, [searchParams]);

  // Calculations
  const getSubtotal = () => {
    return state.modules.reduce((sum, mod) => sum + mod.cost, 0);
  };

  const getDiscountAmount = () => {
    return getSubtotal() * (state.discount / 100);
  };

  const getTaxAmount = () => {
    if (!state.includeTax) return 0;
    return (getSubtotal() - getDiscountAmount()) * (state.taxRate / 100);
  };

  const getGrandTotal = () => {
    return getSubtotal() - getDiscountAmount() + getTaxAmount();
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Preset loader
  const loadPreset = (preset: typeof PRESETS[0]) => {
    setState(prev => ({
      ...prev,
      proposalTitle: preset.title,
      projectOverview: preset.overview,
      modules: preset.modules.map((m, i) => ({
        ...m,
        id: (i + 1).toString()
      }))
    }));
  };

  // Milestone actions
  const updateMilestone = (index: number, field: "label" | "percentage", value: any) => {
    setState(prev => {
      const newMilestones = [...prev.paymentMilestones];
      newMilestones[index] = {
        ...newMilestones[index],
        [field]: field === "percentage" ? Number(value) : value
      };
      return {
        ...prev,
        paymentMilestones: newMilestones
      };
    });
  };

  const addMilestone = () => {
    setState(prev => ({
      ...prev,
      paymentMilestones: [...prev.paymentMilestones, { label: "New Milestone Milestone", percentage: 0 }]
    }));
  };

  const removeMilestone = (index: number) => {
    setState(prev => ({
      ...prev,
      paymentMilestones: prev.paymentMilestones.filter((_, i) => i !== index)
    }));
  };

  // Scope Module Actions
  const addModule = () => {
    const newId = (state.modules.length + 1).toString();
    setState(prev => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          id: newId,
          title: "New Development Phase",
          timeline: "1 Week",
          cost: 0,
          description: "Description of the development work and features to build in this phase.",
          deliverables: ["Deliverable item 1"]
        }
      ]
    }));
  };

  const removeModule = (id: string) => {
    if (state.modules.length === 1) {
      setState(prev => ({
        ...prev,
        modules: [{
          id: "1",
          title: "",
          timeline: "",
          cost: 0,
          description: "",
          deliverables: [""]
        }]
      }));
      return;
    }
    setState(prev => ({
      ...prev,
      modules: prev.modules.filter(m => m.id !== id)
    }));
  };

  const updateModule = (id: string, field: keyof ScopeModule, value: any) => {
    setState(prev => ({
      ...prev,
      modules: prev.modules.map(m => {
        if (m.id === id) {
          return {
            ...m,
            [field]: field === "cost" ? Number(value) : value
          };
        }
        return m;
      })
    }));
  };

  const addDeliverable = (moduleId: string) => {
    setState(prev => ({
      ...prev,
      modules: prev.modules.map(m => {
        if (m.id === moduleId) {
          return {
            ...m,
            deliverables: [...m.deliverables, ""]
          };
        }
        return m;
      })
    }));
  };

  const removeDeliverable = (moduleId: string, delIndex: number) => {
    setState(prev => ({
      ...prev,
      modules: prev.modules.map(m => {
        if (m.id === moduleId) {
          return {
            ...m,
            deliverables: m.deliverables.filter((_, i) => i !== delIndex)
          };
        }
        return m;
      })
    }));
  };

  const updateDeliverable = (moduleId: string, delIndex: number, value: string) => {
    setState(prev => ({
      ...prev,
      modules: prev.modules.map(m => {
        if (m.id === moduleId) {
          const newDels = [...m.deliverables];
          newDels[delIndex] = value;
          return {
            ...m,
            deliverables: newDels
          };
        }
        return m;
      })
    }));
  };

  // URL Generation
  const generateLink = (onlyView = false) => {
    const serialized = serializeState(state);
    const mode = onlyView ? "view" : "edit";
    if (typeof window !== "undefined") {
      return `${window.location.origin}${window.location.pathname}?data=${serialized}&mode=${mode}`;
    }
    return "";
  };

  const [cloudStatus, setCloudStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const saveProposalToCloud = async (customState?: ProposalState) => {
    const currentState = customState || state;
    if (!currentState.proposalId) return;
    try {
      setCloudStatus("saving");
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentState.proposalId,
          proposalId: currentState.proposalId,
          title: currentState.proposalTitle,
          clientName: currentState.clientName,
          clientEmail: currentState.clientEmail,
          totalAmount: getGrandTotal(),
          currency: currentState.currency,
          proposalDate: currentState.proposalDate,
          status: "issued",
          data: currentState,
        }),
      });
      if (res.ok) {
        setCloudStatus("saved");
        setTimeout(() => setCloudStatus("idle"), 3000);
      } else {
        setCloudStatus("error");
        setTimeout(() => setCloudStatus("idle"), 3000);
      }
    } catch (e) {
      console.error("Cloud save failed", e);
      setCloudStatus("error");
      setTimeout(() => setCloudStatus("idle"), 3000);
    }
  };

  const handleCopyLink = async (onlyView = false) => {
    const url = generateLink(onlyView);
    saveProposalToCloud();
    try {
      await navigator.clipboard.writeText(url);
      if (onlyView) {
        setCopiedText(true);
        setTimeout(() => setCopiedText(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // WhatsApp Redirect url
  const getWhatsAppAcceptLink = () => {
    const cleanPhone = state.senderPhone.replace(/\D/g, "");
    const baseMsg = `Hi ${state.senderName.split(" ")[0]}! I reviewed the project scope & proposal for "${state.proposalTitle || "Software Project"}" (Proposal ID: ${state.proposalId || "—"}).\n\nI accept the deliverables and timeline listed. Total investment is ${state.currency}${formatNumber(getGrandTotal())}.\n\nLet's get started on Milestone 1! Please send over the contract and onboarding onboarding details.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(baseMsg)}`;
  };

  const handlePrint = () => {
    saveProposalToCloud();
    window.print();
  };

  const clearForm = () => {
    const today = new Date();
    const formatToday = today.toISOString().split("T")[0];
    const randomId = Math.floor(100 + Math.random() * 900);
    const propId = `PROP-${today.getFullYear()}-${randomId}`;

    setState({
      proposalTitle: "",
      proposalId: propId,
      proposalDate: formatToday,
      ...DEFAULT_SENDER,
      clientName: "",
      clientContact: "",
      clientAddress: "",
      clientEmail: "",
      clientPhone: "",
      projectOverview: "This proposal details the estimated development modules, timelines, deliverables, and total financial investment to build your custom software system. The solutions proposed herein will be fully optimized, hosted on high-performance cloud clusters, and handed over with complete source codes.",
      modules: [
        {
          id: "1",
          title: "Phase 1: System Design & Setup",
          timeline: "1 Week",
          cost: 100000,
          description: "Database structures, hosting layout setups, and staging environments.",
          deliverables: ["Initial UI mockup", "Hosting server config"]
        }
      ],
      currency: "₦",
      taxRate: 7.5,
      discount: 0,
      includeTax: false,
      paymentMilestones: [
        { label: "Milestone 1: Project Kick-off (Advance)", percentage: 50 },
        { label: "Milestone 2: Database Setup & Staging Delivery", percentage: 30 },
        { label: "Milestone 3: QA Approvals & Live Handover", percentage: 20 },
      ],
      paymentInfo: "Bank Name: GLOBUS BANK\nAccount Name: CLINTON NNAMDI CHUKWUNYERE\nAccount Number: 9976907387",
      notes: "1. Work begins immediately upon receipt of the Milestone 1 upfront deposit (50%).\n2. Infrastructure & Hosting: Client covers direct monthly cloud fees (Railway at roughly $5 to $10 monthly).\n3. Timelines listed above are contingent upon the timely feedback of technical inputs.\n4. Estimated proposal is valid for 30 days.",
    });
    router.replace("/proposal");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-text">
      {/* CSS Print Overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body, html {
            background-color: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            transform: none !important;
          }
          .page-break {
            page-break-before: always;
            margin-top: 15mm;
          }
          @page {
            size: A4 portrait;
            margin: 15mm 12mm 15mm 12mm;
          }
        }
      `}} />

      {/* Header bar */}
      <header className="bg-slate-900 text-white py-4 px-6 top-0 z-30 shadow-md no-print flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-xl font-bold tracking-wider uppercase text-[#cca066] font-serif" style={{ fontFamily: "Rye, serif" }}>
              Sales Cowboy
            </span>
          </Link>
          <span className="h-6 w-px bg-slate-700 hidden sm:block"></span>
          <span className="text-xs tracking-wider text-slate-400 uppercase hidden sm:block font-medium">
            Proposal & Scope Builder
          </span>
        </div>

        <div className="flex items-center gap-3">
          {viewMode === "view" ? (
            <button
              onClick={() => setViewMode("edit")}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-700"
            >
              <Edit2 className="w-3.5 h-3.5 text-amber-500" />
              Switch to Editor
            </button>
          ) : (
            <button
              onClick={() => setViewMode("view")}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-amber-500" />
              Client Preview
            </button>
          )}

          <button
            onClick={handlePrint}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-md text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / PDF
          </button>
        </div>
      </header>

      {/* Main split dashboard view */}
      <main className="flex-1 w-full max-w-8xl mx-auto flex flex-col lg:flex-row relative">
        
        {/* LEFT PANEL: CONFIG EDITOR */}
        {viewMode === "edit" && (
          <div className="w-full lg:w-[40%] bg-slate-900 text-slate-100 p-6 lg:p-8 border-r border-slate-800 overflow-y-auto lg:max-h-[calc(100vh-68px)] sticky top-[68px] no-print">
            
            {/* Quick Actions Panel */}
            <div className="mb-6 bg-slate-800 border border-slate-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                  Share & Export Options
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => handleCopyLink(false)}
                  className="bg-slate-850 hover:bg-slate-700 text-slate-100 p-2.5 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all border border-slate-700 text-center"
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  {copiedLink ? "Copied!" : "Editable Link"}
                </button>
                <button
                  onClick={() => handleCopyLink(true)}
                  className="bg-slate-850 hover:bg-slate-700 text-slate-100 p-2.5 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all border border-slate-700 text-center"
                >
                  <Copy className="w-4 h-4 text-emerald-400" />
                  {copiedText ? "Copied!" : "Client Share Link"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => saveProposalToCloud()}
                  disabled={cloudStatus === "saving"}
                  className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Cloud className="w-3.5 h-3.5" />
                  {cloudStatus === "saving" ? "Saving..." : cloudStatus === "saved" ? "Saved to D1 & R2!" : "Save to Cloud"}
                </button>
                <button
                  onClick={clearForm}
                  className="w-full py-2 bg-slate-900/40 hover:bg-red-950/20 hover:text-red-300 hover:border-red-900/30 text-slate-400 border border-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear Form
                </button>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="mb-6 space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Load Software Project Scope Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadPreset(preset)}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left p-2.5 rounded-lg text-xs hover:border-amber-500/40 transition-all flex flex-col justify-between h-full group"
                  >
                    <span className="font-semibold text-slate-200 group-hover:text-amber-400 transition-colors block mb-1">
                      {preset.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {preset.modules.length} Phases
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-800/80 mb-5" />

            {/* Accordion Tabs */}
            <div className="space-y-4">
              
              {/* TAB 1: PROJECT & CLIENT DETAILS */}
              <div className="bg-slate-800/40 rounded-lg border border-slate-800 p-4">
                <button
                  onClick={() => setActiveTab(activeTab === "project" ? "sender" : "project")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none"
                >
                  <span>1. Project & Client Info</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTab === "project" ? "rotate-180" : ""}`} />
                </button>
                
                {activeTab === "project" && (
                  <div className="space-y-3 pt-4">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Proposal Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Custom Logistics Mobile App"
                        value={state.proposalTitle}
                        onChange={(e) => setState(prev => ({ ...prev, proposalTitle: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Proposal ID</label>
                        <input
                          type="text"
                          value={state.proposalId}
                          onChange={(e) => setState(prev => ({ ...prev, proposalId: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Date</label>
                        <input
                          type="date"
                          value={state.proposalDate}
                          onChange={(e) => setState(prev => ({ ...prev, proposalDate: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>
                    </div>
                    <hr className="border-slate-800/80 my-2" />
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Client Business Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Ibim71 Nigeria Limited"
                        value={state.clientName}
                        onChange={(e) => setState(prev => ({ ...prev, clientName: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Contact Person Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Mr. Ibrahim"
                        value={state.clientContact}
                        onChange={(e) => setState(prev => ({ ...prev, clientContact: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Client Address</label>
                      <input
                        type="text"
                        placeholder="e.g. Plot 42, Trans Amadi, Port Harcourt"
                        value={state.clientAddress}
                        onChange={(e) => setState(prev => ({ ...prev, clientAddress: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Client Email</label>
                        <input
                          type="email"
                          placeholder="client@ibim71.com"
                          value={state.clientEmail}
                          onChange={(e) => setState(prev => ({ ...prev, clientEmail: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Client Phone</label>
                        <input
                          type="text"
                          placeholder="+234..."
                          value={state.clientPhone}
                          onChange={(e) => setState(prev => ({ ...prev, clientPhone: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Project Overview Intro</label>
                      <textarea
                        rows={3}
                        value={state.projectOverview}
                        onChange={(e) => setState(prev => ({ ...prev, projectOverview: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 resize-y"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* TAB 2: DEVELOPMENT SCOPE MODULES */}
              <div className="bg-slate-800/40 rounded-lg border border-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setActiveTab(activeTab === "modules" ? "project" : "modules")}
                    className="flex-1 text-left text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none"
                  >
                    <span>2. Scope & Cost Modules</span>
                  </button>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTab === "modules" ? "rotate-180" : ""}`} />
                </div>
                
                {activeTab === "modules" && (
                  <div className="space-y-4 pt-4">
                    <button
                      onClick={addModule}
                      className="w-full py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 rounded text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Scope Phase
                    </button>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                      {state.modules.map((mod, modIdx) => (
                        <div key={mod.id} className="bg-slate-800/80 p-3 rounded-lg border border-slate-800 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Phase #{modIdx + 1}</span>
                            <button
                              onClick={() => removeModule(mod.id)}
                              className="text-slate-500 hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div>
                            <label className="text-[9px] font-semibold text-slate-400 block mb-0.5">Phase Title</label>
                            <input
                              type="text"
                              value={mod.title}
                              onChange={(e) => updateModule(mod.id, "title", e.target.value)}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] font-semibold text-slate-400 block mb-0.5">Timeline (Est.)</label>
                              <input
                                type="text"
                                placeholder="e.g. 2 Weeks"
                                value={mod.timeline}
                                onChange={(e) => updateModule(mod.id, "timeline", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-semibold text-slate-400 block mb-0.5">Cost ({state.currency})</label>
                              <input
                                type="number"
                                min="0"
                                value={mod.cost}
                                onChange={(e) => updateModule(mod.id, "cost", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[9px] font-semibold text-slate-400 block mb-0.5">Phase Description</label>
                            <textarea
                              rows={2}
                              value={mod.description}
                              onChange={(e) => updateModule(mod.id, "description", e.target.value)}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500 resize-none font-sans"
                            />
                          </div>
                          
                          {/* Deliverables lists */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <label className="text-[9px] font-bold text-slate-400 uppercase">Deliverables (Bullets)</label>
                              <button
                                onClick={() => addDeliverable(mod.id)}
                                className="text-[9px] text-amber-500 hover:text-amber-400 font-bold uppercase"
                              >
                                + Add Bullet
                              </button>
                            </div>
                            <div className="space-y-1.5">
                              {mod.deliverables.map((del, delIdx) => (
                                <div key={delIdx} className="flex items-center gap-1.5">
                                  <input
                                    type="text"
                                    placeholder="deliverable item..."
                                    value={del}
                                    onChange={(e) => updateDeliverable(mod.id, delIdx, e.target.value)}
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 focus:outline-none"
                                  />
                                  <button
                                    onClick={() => removeDeliverable(mod.id, delIdx)}
                                    className="text-slate-500 hover:text-red-400 p-0.5"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* TAB 3: FINANCIALS, DISCOUNT & MILESTONES */}
              <div className="bg-slate-800/40 rounded-lg border border-slate-800 p-4">
                <button
                  onClick={() => setActiveTab(activeTab === "milestones" ? "project" : "milestones")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none"
                >
                  <span>3. Cost settings & Milestones</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTab === "milestones" ? "rotate-180" : ""}`} />
                </button>
                
                {activeTab === "milestones" && (
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Currency</label>
                        <select
                          value={state.currency}
                          onChange={(e) => setState(prev => ({ ...prev, currency: e.target.value }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        >
                          {CURRENCIES.map((curr) => (
                            <option key={curr.symbol} value={curr.symbol}>
                              {curr.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Discount (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={state.discount}
                          onChange={(e) => setState(prev => ({ ...prev, discount: Number(e.target.value) }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        id="includeTax"
                        checked={state.includeTax}
                        onChange={(e) => setState(prev => ({ ...prev, includeTax: e.target.checked }))}
                        className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <label htmlFor="includeTax" className="text-xs font-semibold text-slate-300 cursor-pointer select-none">
                        Add VAT (7.5% Tax)
                      </label>
                    </div>

                    <hr className="border-slate-800/80 my-2" />

                    {/* Milestones Scheduler */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Payment Milestones (%)
                        </label>
                        <button
                          onClick={addMilestone}
                          className="text-[10px] text-[#cca066] hover:text-amber-500 font-bold uppercase"
                        >
                          + Add Milestone
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Sum should equal 100%. Total: {state.paymentMilestones.reduce((s, m) => s + m.percentage, 0)}%
                      </p>
                      
                      <div className="space-y-2">
                        {state.paymentMilestones.map((ms, idx) => (
                          <div key={idx} className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-bold text-slate-500 uppercase">Milestone #{idx + 1}</span>
                              <button
                                onClick={() => removeMilestone(idx)}
                                className="text-slate-600 hover:text-red-400"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={ms.label}
                                placeholder="Milestone description..."
                                onChange={(e) => updateMilestone(idx, "label", e.target.value)}
                                className="flex-1 bg-slate-850 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 focus:outline-none"
                              />
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={ms.percentage}
                                onChange={(e) => updateMilestone(idx, "percentage", e.target.value)}
                                className="w-16 bg-slate-850 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 focus:outline-none font-mono text-center"
                              />
                              <span className="text-slate-400 self-center text-xs">%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Bank Information</label>
                      <textarea
                        rows={3}
                        value={state.paymentInfo}
                        onChange={(e) => setState(prev => ({ ...prev, paymentInfo: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-300 block mb-0.5">Notes & Timeline Assumptions</label>
                      <textarea
                        rows={3}
                        value={state.notes}
                        onChange={(e) => setState(prev => ({ ...prev, notes: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* TAB 4: SENDER SETTINGS */}
              <div className="bg-slate-800/40 rounded-lg border border-slate-800 p-4">
                <button
                  onClick={() => setActiveTab(activeTab === "sender" ? "project" : "sender")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none"
                >
                  <span>4. Prepared By (Sender Info)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTab === "sender" ? "rotate-180" : ""}`} />
                </button>
                
                {activeTab === "sender" && (
                  <div className="space-y-3 pt-4">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Prepared By Name</label>
                      <input
                        type="text"
                        value={state.senderName}
                        onChange={(e) => setState(prev => ({ ...prev, senderName: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Designation</label>
                      <input
                        type="text"
                        value={state.senderDesignation}
                        onChange={(e) => setState(prev => ({ ...prev, senderDesignation: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Office Address</label>
                      <input
                        type="text"
                        value={state.senderAddress}
                        onChange={(e) => setState(prev => ({ ...prev, senderAddress: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Email</label>
                        <input
                          type="email"
                          value={state.senderEmail}
                          onChange={(e) => setState(prev => ({ ...prev, senderEmail: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Phone</label>
                        <input
                          type="text"
                          value={state.senderPhone}
                          onChange={(e) => setState(prev => ({ ...prev, senderPhone: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-0.5">Website</label>
                      <input
                        type="text"
                        value={state.senderWebsite}
                        onChange={(e) => setState(prev => ({ ...prev, senderWebsite: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* RIGHT PANEL: LIVE PREVIEW PAPER SHEET */}
        <div className="flex-1 flex flex-col items-center justify-start py-8 px-4 sm:px-6 md:py-12 bg-slate-100 select-text overflow-y-auto print-full-width">
          
          {/* Client Proposal Accept Banner (Only in View Mode) */}
          {viewMode === "view" && (
            <div className="w-full max-w-[210mm] mb-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 no-print shadow-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600 animate-bounce-subtle" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Project Proposal & Scope Review
                  </h4>
                  <p className="text-xs text-slate-500">
                    Review the deliverables and milestones. Accept below to initiate kickoff.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={getWhatsAppAcceptLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
                >
                  <Send className="w-4 h-4" />
                  Accept & Start Project
                </a>
                <button
                  onClick={handlePrint}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </button>
              </div>
            </div>
          )}

          {/* PAGE SHEET CARD (A4 paper styled) */}
          <div className="w-full max-w-[210mm] min-h-[297mm] bg-white border border-slate-200 shadow-xl p-8 sm:p-12 md:p-16 flex flex-col justify-between text-slate-800 relative rounded-none print-container print-full-width">
            
            {/* Front Page Content */}
            <div>
              
              {/* Proposal Corporate Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-slate-100 pb-8">
                <div>
                  <div className="flex items-center gap-2.5 mb-3 select-none">
                    <img 
                      src="/assets/salescowboy-logo.png" 
                      alt="Sales Cowboy Logo" 
                      className="h-14 w-auto object-contain block" 
                    />
                    <div className="flex flex-col leading-none">
                      <span className="text-xl font-bold tracking-wider uppercase font-serif text-[#7c4a1e]" style={{ fontFamily: "Rye, serif" }}>
                        Sales Cowboy
                      </span>
                      <span className="text-[10px] tracking-widest text-[#cca066] uppercase font-bold mt-0.5">
                        Software & Marketing
                      </span>
                    </div>
                  </div>
                  
                  {/* Prepared By details */}
                  <div className="text-[11px] text-slate-500 space-y-0.5 leading-relaxed">
                    <p className="font-semibold text-slate-700">{state.senderName}</p>
                    <p className="text-[#7c4a1e] font-medium">{state.senderDesignation}</p>
                    <p className="max-w-[285px]">{state.senderAddress}</p>
                    <p className="pt-1 flex items-center gap-1 font-mono"><Mail className="w-3 h-3" /> {state.senderEmail}</p>
                    <p className="flex items-center gap-1 font-mono"><Phone className="w-3 h-3" /> {state.senderPhone}</p>
                  </div>
                </div>

                {/* Proposal Title Meta */}
                <div className="text-left sm:text-right flex flex-col justify-between h-full self-stretch">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-slate-900 font-serif leading-tight max-w-[250px] sm:ml-auto" style={{ fontFamily: "Rye, serif" }}>
                      PROJECT PROPOSAL
                    </h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mt-1">
                      ID: {state.proposalId || "PROP-XXXX"}
                    </p>
                  </div>
                  
                  <div className="mt-6 sm:mt-auto space-y-1 text-xs text-slate-500">
                    <p className="flex sm:justify-end gap-2">
                      <span className="font-semibold text-slate-700">Prepared For:</span>
                      <span className="font-semibold text-slate-800">{state.clientName || "—"}</span>
                    </p>
                    <p className="flex sm:justify-end gap-2">
                      <span className="font-semibold text-slate-700">Issued Date:</span>
                      <span className="font-mono text-slate-800">{state.proposalDate ? new Date(state.proposalDate).toLocaleDateString("en-NG", { year: 'numeric', month: 'long', day: 'numeric' }) : "—"}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Client specifications */}
              <div className="py-6 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-bold text-[#cca066] uppercase tracking-widest block mb-2 font-mono">
                    PROPOSAL PREPARED FOR:
                  </span>
                  {state.clientName ? (
                    <div className="text-xs leading-relaxed text-slate-600">
                      <p className="text-sm font-bold text-slate-900">{state.clientName}</p>
                      {state.clientContact && <p className="font-medium text-slate-700">Attn: {state.clientContact}</p>}
                      {state.clientAddress && <p className="mt-0.5">{state.clientAddress}</p>}
                      <div className="flex flex-col gap-0.5 mt-2 font-mono text-[11px]">
                        {state.clientEmail && <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {state.clientEmail}</span>}
                        {state.clientPhone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {state.clientPhone}</span>}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No client details entered.</p>
                  )}
                </div>
                
                <div className="flex sm:justify-end items-end no-print">
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-3.5 text-[11px] text-slate-500 max-w-[280px]">
                    <span className="font-bold text-[#7c4a1e] block mb-1">Scope Approval Workflow</span>
                    <p>To accept this proposal and initialize the kickoff sprint, tap the "Accept & Start" action above or sign the back page.</p>
                  </div>
                </div>
              </div>

              {/* Project Overview */}
              <div className="py-6">
                <span className="text-[10px] font-bold text-[#cca066] uppercase tracking-widest block mb-2 font-mono">
                  1. PROJECT OVERVIEW & SCOPE
                </span>
                <p className="text-xs leading-relaxed text-justify text-slate-600 whitespace-pre-line">
                  {state.projectOverview}
                </p>
              </div>

              {/* Scope Phases / Modules */}
              <div className="py-4 space-y-6">
                <span className="text-[10px] font-bold text-[#cca066] uppercase tracking-widest block mb-1 font-mono">
                  2. PROPOSED PHASES & DELIVERABLES
                </span>
                
                <div className="space-y-6">
                  {state.modules.map((mod, idx) => (
                    <div key={mod.id} className="bg-slate-50/50 border border-slate-100 p-5 rounded-lg space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/60">
                        <h3 className="text-xs font-bold text-slate-900 uppercase">
                          Phase {idx + 1}: {mod.title || "Untitled Development Phase"}
                        </h3>
                        <div className="flex gap-3 text-[10px] font-mono font-bold">
                          <span className="bg-amber-100 text-[#7c4a1e] px-2 py-0.5 rounded">
                            {mod.timeline || "—"}
                          </span>
                          <span className="bg-slate-200/80 text-slate-800 px-2 py-0.5 rounded">
                            {state.currency}{formatNumber(mod.cost)}
                          </span>
                        </div>
                      </div>
                      
                      {mod.description && (
                        <p className="text-xs text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                          {mod.description}
                        </p>
                      )}

                      {mod.deliverables.length > 0 && mod.deliverables[0] !== "" && (
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-[#cca066] uppercase tracking-wider font-mono">
                            Deliverables Checklist:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-4 list-disc text-xs text-slate-600">
                            {mod.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="leading-snug">
                                {del}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Page Break for Print to keep proposal neat */}
              <div className="page-break"></div>

              {/* Scope Costs Table */}
              <div className="py-6">
                <span className="text-[10px] font-bold text-[#cca066] uppercase tracking-widest block mb-3 font-mono">
                  3. INVESTMENT ESTIMATES SUMMARY
                </span>
                
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      <th className="pb-2 w-12 text-center">Phase</th>
                      <th className="pb-2 pl-2">Description</th>
                      <th className="pb-2 text-center w-24">Timeline</th>
                      <th className="pb-2 text-right w-32">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.modules.map((mod, idx) => (
                      <tr key={mod.id} className="border-b border-slate-100 text-xs">
                        <td className="py-3 text-center text-slate-400 font-mono">#{idx + 1}</td>
                        <td className="py-3 pl-2 font-semibold text-slate-800">{mod.title || "—"}</td>
                        <td className="py-3 text-center text-slate-600 font-mono">{mod.timeline || "—"}</td>
                        <td className="py-3 text-right font-bold text-slate-900 font-mono">{state.currency}{formatNumber(mod.cost)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals Box */}
                <div className="flex justify-end pt-4">
                  <div className="w-64 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal Investment:</span>
                      <span className="font-mono text-slate-800">{state.currency}{formatNumber(getSubtotal())}</span>
                    </div>

                    {state.discount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount ({state.discount}%):</span>
                        <span className="font-mono">-{state.currency}{formatNumber(getDiscountAmount())}</span>
                      </div>
                    )}

                    {state.includeTax && state.taxRate > 0 && (
                      <div className="flex justify-between text-slate-500">
                        <span>VAT ({state.taxRate}%):</span>
                        <span className="font-mono text-slate-800">+{state.currency}{formatNumber(getTaxAmount())}</span>
                      </div>
                    )}

                    <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
                      <span>Grand Total:</span>
                      <span className="text-base font-mono font-extrabold text-[#7c4a1e]">
                        {state.currency}{formatNumber(getGrandTotal())}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones Schedule */}
              {state.paymentMilestones.length > 0 && (
                <div className="py-6">
                  <span className="text-[10px] font-bold text-[#cca066] uppercase tracking-widest block mb-2 font-mono">
                    4. MILESTONE PAYMENT SCHEDULE
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {state.paymentMilestones.map((ms, idx) => {
                      const milestoneValue = getGrandTotal() * (ms.percentage / 100);
                      return (
                        <div key={idx} className="bg-slate-50 border border-slate-150 p-4 rounded-lg flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-bold text-[#7c4a1e] uppercase tracking-wider block font-mono">
                              Milestone {idx + 1} ({Number(ms.percentage).toFixed(2)}%)
                            </span>
                            <p className="text-[11px] text-slate-600 leading-snug mt-1 font-medium">
                              {ms.label}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-slate-900 font-mono mt-3 pt-2 border-t border-slate-200">
                            {state.currency}{formatNumber(milestoneValue)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notes / Assumptions */}
              {state.notes && (
                <div className="py-6">
                  <span className="text-[10px] font-bold text-[#cca066] uppercase tracking-widest block mb-1 font-mono">
                    5. ASSUMPTIONS & CONTRACT TERMS
                  </span>
                  <p className="text-[10px] leading-relaxed whitespace-pre-line text-slate-500 text-justify">
                    {state.notes}
                  </p>
                </div>
              )}

            </div>

            {/* Bottom block: Bank Details & Signatures */}
            <div className="mt-12 border-t border-slate-100 pt-6 flex flex-col justify-between text-[10px] text-slate-500">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                {/* Payment bank details */}
                <div className="space-y-1">
                  <span className="font-bold text-slate-700 block uppercase tracking-wider font-mono">
                    BANK DISBURSEMENT INSTRUCTIONS
                  </span>
                  <p className="whitespace-pre-line leading-relaxed font-mono bg-slate-50 border border-slate-100 p-2.5 rounded text-slate-600 max-w-[280px]">
                    {state.paymentInfo}
                  </p>
                </div>

                {/* Handover and sign off block */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Agency sign off */}
                  <div className="flex flex-col items-start gap-1 justify-between h-full self-stretch border-r border-slate-100 pr-2">
                    <span className="text-[#cca066] font-bold uppercase tracking-widest font-mono text-[8px]">
                      PREPARED BY
                    </span>
                    <div className="h-8 flex items-center select-none pt-1">
                      <span className="font-serif italic text-sm text-[#7c4a1e] font-semibold" style={{ fontFamily: "Rye, serif" }}>
                        Clinton Chukwunyere
                      </span>
                    </div>
                    <div className="w-full border-b border-slate-350 mt-1"></div>
                    <p className="text-[8px] text-slate-400 font-medium">Sales Cowboy Engineering</p>
                  </div>
                  
                  {/* Client sign off */}
                  <div className="flex flex-col items-start gap-1 justify-between h-full self-stretch pl-1">
                    <span className="text-[#cca066] font-bold uppercase tracking-widest font-mono text-[8px]">
                      CLIENT ACCEPTANCE
                    </span>
                    <div className="h-8"></div>
                    <div className="w-full border-b border-slate-350 mt-1"></div>
                    <p className="text-[8px] text-slate-400 font-medium">Authorized Representative</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <p className="mt-8 text-center text-xs text-slate-400 font-medium tracking-wide no-print">
            © 2026 Sales Cowboy Marketing Solutions. Scope proposals print correctly to multiple portrait A4 sheets.
          </p>

        </div>

      </main>
    </div>
  );
}

const CURRENCIES = [
  { symbol: "₦", code: "NGN", label: "Naira (₦)" },
  { symbol: "$", code: "USD", label: "US Dollar ($)" },
  { symbol: "£", code: "GBP", label: "British Pound (£)" },
  { symbol: "€", code: "EUR", label: "Euro (€)" },
];

export default function ProposalBuilderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center font-sans">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <span className="text-2xl font-serif text-amber-500 font-bold" style={{ fontFamily: "Rye, serif" }}>
            Sales Cowboy
          </span>
          <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
            Loading Proposal Builder...
          </span>
        </div>
      </div>
    }>
      <ProposalContent />
    </Suspense>
  );
}
