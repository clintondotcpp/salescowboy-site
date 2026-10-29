const fs = require('fs');
const path = require('path');

// Safe UTF-8 Base64 serialization matching frontend
const serializeState = (state) => {
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

const DEFAULT_SENDER = {
  senderName: "Clinton Chukwunyere",
  senderDesignation: "Chief Software & Cloud Engineer",
  senderAddress: "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos",
  senderEmail: "hello@salescowboy.com.ng",
  senderPhone: "+234 810 493 3232",
  senderWebsite: "salescowboy.com.ng",
};

const PAYMENT_INFO = "Bank Name: GLOBUS BANK\nAccount Name: CLINTON NNAMDI CHUKWUNYERE\nAccount Number: 9976907387";

const today = new Date();
const formatToday = today.toISOString().split("T")[0];
const propId = `PROP-${today.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

const proposalState = {
  proposalTitle: "On-Demand Geolocation Dispatch, Real-Time Tracking & Provider Booking Ecosystem",
  proposalId: propId,
  proposalDate: formatToday,
  
  ...DEFAULT_SENDER,
  
  clientName: "On-Demand Platform Sponsors",
  clientContact: "Founding Team & Product Leadership",
  clientAddress: "Nigeria",
  clientEmail: "",
  clientPhone: "",
  
  projectOverview: "This technical proposal covers the complete architecture, engineering, and deployment of a multi-endpoint on-demand service and dispatch ecosystem (similar to Uber/Bolt architecture). The system interconnects three synchronized applications: a Customer App (discovery, booking, live tracking, and escrow checkout), a Provider App (online/offline toggle, radar dispatch notifications, background GPS emission, and job lifecycle execution), and a central Backend Infrastructure featuring Redis Geospatial indexing, WebSocket event streams, a strict Finite State Machine (FSM), and an Admin Control Console.",
  
  modules: [
    {
      id: "1",
      title: "Module 1: Real-Time Geospatial Indexing, Location Cache & WebSockets Infrastructure",
      timeline: "7 - 10 Days",
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
      timeline: "8 - 10 Days",
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
      timeline: "8 - 10 Days",
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
      timeline: "7 - 9 Days",
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
      timeline: "5 - 7 Days",
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
    { label: "Milestone 1: Project Mobilization, Database & Geospatial Architecture Setup (40%)", percentage: 40 },
    { label: "Milestone 2: Mobile Apps Core, Dispatch Radar & Live Tracking Integration (40%)", percentage: 40 },
    { label: "Milestone 3: Admin Console, Escrow Settlements, Field Testing & Live Deployment (20%)", percentage: 20 }
  ],
  
  paymentInfo: PAYMENT_INFO,
  notes: "1. Total Project Investment: ₦750,000 fixed price.\n2. Milestone Structure: 40% Kickoff Deposit (₦300,000), 40% Mobile Core & Tracking Milestone (₦300,000), 20% Final Testing & Cloud Production Deployment (₦150,000).\n3. Payment Details: Globus Bank, Account No: 9976907387, Clinton Nnamdi Chukwunyere.\n4. Delivery Timeline: 3 to 4 weeks total elapsed sprint time including end-to-end integration, stress testing, and cloud deployment."
};

const baseUrl = "https://salescowboy.com.ng";
const proposalData = serializeState(proposalState);

const links = {
  proposal: {
    clientView: `${baseUrl}/proposal/?data=${proposalData}&mode=view`,
    editable: `${baseUrl}/proposal/?data=${proposalData}&mode=edit`
  }
};

fs.writeFileSync(path.join(__dirname, 'ondemand-dispatch-links.json'), JSON.stringify(links, null, 2));

console.log("Successfully generated on-demand dispatch proposal links at ₦750k.");
