import type { Metadata } from "next";
import PricingComparisonPage, {
  PackageTier,
  ComparisonRow,
} from "@/components/PricingComparisonPage";

export const metadata: Metadata = {
  title: "Real Estate Website Packages (₦110,000 vs ₦165,000) | Sales Cowboy",
  description:
    "Compare our Standard Real Estate Website (₦110,000) and Corporate Property Portal (₦165,000). Includes property search, admin dashboard, WhatsApp lead capture, and appointment booking.",
};

const standardRealEstateTier: PackageTier = {
  name: "Standard Real Estate Showcase",
  badge: "High-Value Starter",
  price: "₦110,000",
  renewalNote: "₦45,000 / year (Managed Hosting, Domain & SSL)",
  tagline: "Designed for independent realtors and boutique agencies wanting to showcase listings and capture buyer leads.",
  deliverables: [
    "5 to 8 Professional Website Pages",
    "Unlimited Property Listings & Dedicated Listing Pages",
    "Property Search & Filtering (Location, Price, Buy/Rent)",
    "Property Management Admin Dashboard",
    "Property Inquiry & WhatsApp Lead Capture System",
    "Property Viewing & Inspection Appointment Booking",
    "On-Page SEO Setup & Google Maps / Business Profile Setup",
    "Managed Cloud Hosting for 1 Year Included",
    ".COM.NG Domain Name & Free SSL Certificate",
    "Contact Forms & Instant Client Routing",
  ],
  whatsappMessage:
    "Hello Sales Cowboy! I want to order the ₦110,000 Standard Real Estate Website package.",
};

const corporateRealEstateTier: PackageTier = {
  name: "Corporate Real Estate & Property Portal",
  badge: "Most Popular & Recommended",
  price: "₦165,000",
  renewalNote: "₦75,000 / year (Dedicated Server, Domain & SSL)",
  tagline: "For property developers and corporate real estate firms needing advanced filtering, mortgage calculators, multi-agent profiles, and backend access.",
  featured: true,
  deliverables: [
    "7 to 15 Professional Website Pages",
    "Unlimited Property Listings & Dedicated High-Res Listing Pages",
    "Advanced Property Search & Multi-Filters (Location, Price, Type, Bedrooms)",
    "Property Management Admin Dashboard with Full Backend Access",
    "Property Inquiry & Automated Lead Capture System",
    "WhatsApp Lead Funnel & Automated Brochure Dispatch",
    "Property Viewing & Site Tour Appointment Booking Calendar",
    "Built-in Mortgage & Affordability Calculator",
    "Multi-Agent Profiles with Individual Contact Links",
    "Real Estate Blog, Market News & Project Updates",
    "Newsletter & High-Intent Investor Email Capture",
    "Full SEO Architecture & Google Business Profile Setup",
    "Google Analytics & Google Search Console Integration",
    "30GB High-Performance Dedicated Storage",
    "Unlimited Company & Staff Email Accounts",
    ".COM or .COM.NG Domain Name Included (1 Year)",
    "Dedicated High-Speed Server & Hosting (1 Year)",
  ],
  whatsappMessage:
    "Hello Sales Cowboy! I want to order the ₦165,000 Corporate Real Estate & Property Portal package.",
};

const comparisonRows: ComparisonRow[] = [
  { feature: "Website Scope", tier1: "5 to 8 Pages", tier2: "7 to 15 Pages" },
  { feature: "Property Listings", tier1: "Unlimited Listings", tier2: "Unlimited Listings" },
  { feature: "Search & Filtering", tier1: "Search by Location, Price, Buy/Rent", tier2: "Advanced Multi-Filter (Beds, Baths, Location, Price, Type)" },
  { feature: "Property Admin Dashboard", tier1: true, tier2: true },
  { feature: "Full Backend Access", tier1: false, tier2: true },
  { feature: "Mortgage / Affordability Calculator", tier1: false, tier2: true },
  { feature: "Multi-Agent Profiles", tier1: false, tier2: "Unlimited Agent Team Profiles" },
  { feature: "Inspection Booking Calendar", tier1: true, tier2: true },
  { feature: "WhatsApp Lead Capture", tier1: true, tier2: true },
  { feature: "Real Estate Blog / Market Updates", tier1: false, tier2: true },
  { feature: "Investor Newsletter Capture", tier1: false, tier2: true },
  { feature: "Server & Hosting", tier1: "Managed Cloud Hosting (1 Year)", tier2: "Dedicated High-Speed Server (1 Year)" },
  { feature: "Storage Capacity", tier1: "Managed Storage", tier2: "30GB Dedicated SSD" },
  { feature: "Domain Name Included", tier1: ".COM.NG (1 Year Free)", tier2: ".COM or .COM.NG (1 Year Free)" },
  { feature: "Staff Email Accounts", tier1: "—", tier2: "Unlimited Accounts" },
  { feature: "Google Business Profile & SEO Setup", tier1: true, tier2: true },
  { feature: "Google Analytics & Search Console", tier1: true, tier2: true },
  { feature: "Turnaround Delivery Time", tier1: "7 Days", tier2: "7 Days" },
  { feature: "Year 2 Renewal Fee", tier1: "₦45,000 / year", tier2: "₦75,000 / year" },
];

const faqs = [
  {
    q: "How quickly will our real estate website launch?",
    a: "We design and deploy our real estate packages within 7 days once you provide your company profile and initial property listings. Custom bespoke portals and advanced integrations may take longer depending on technical scope.",
  },
  {
    q: "Can my team upload and manage property listings easily?",
    a: "Yes. Both packages include an intuitive Property Management Admin Dashboard where you can add, edit, or remove listings, upload photos, set prices, and mark properties as Sold or Under Offer with no coding required.",
  },
  {
    q: "How do inquiries reach our agents?",
    a: "Every listing has a dedicated inquiry form and direct WhatsApp chat button that routes buyer inquiries straight to your phone or assigned sales agent.",
  },
];

export default function RealEstateAgentsPage() {
  return (
    <PricingComparisonPage
      categoryBadge="Real Estate & Property Development"
      title="Compare Real Estate Website Packages"
      description="Showcase luxury properties, capture high-net-worth buyers, and automate inspection appointments with a custom real estate portal."
      tier1={standardRealEstateTier}
      tier2={corporateRealEstateTier}
      comparisonRows={comparisonRows}
      faqs={faqs}
      defaultWhatsappMessage="Hello Sales Cowboy! I want to discuss building a real estate website for my agency."
    />
  );
}
