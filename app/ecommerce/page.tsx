import type { Metadata } from "next";
import PricingComparisonPage, {
  PackageTier,
  ComparisonRow,
} from "@/components/PricingComparisonPage";

export const metadata: Metadata = {
  title: "E-Commerce Online Store Packages (₦110,000 vs ₦165,000) | Sales Cowboy",
  description:
    "Compare our Managed E-Commerce Store (₦110,000) and Dedicated Pro Store (₦165,000). Delivered in 7 days with Paystack payments, hosting, domain, and admin dashboard.",
};

const managedTier: PackageTier = {
  name: "Managed E-Commerce Store",
  badge: "Cost-Effective Starter",
  price: "₦110,000",
  renewalNote: "₦45,000 / year (Managed Hosting, Domain & SSL)",
  tagline: "Ideal for retail brands and growing merchants wanting to sell online with zero technical hassle.",
  deliverables: [
    "5 to 8 Professional Pages",
    "Unlimited Products & Category Management",
    "Admin Dashboard for Managing Products & Stock",
    "Advanced Product Search & Filtering Functionality",
    "Paystack / Flutterwave Payment Gateway Integration",
    "Contact Form & Direct WhatsApp Lead Capture",
    "Email Marketing & Customer List Capture",
    "Full On-Page SEO Optimization",
    "Google Analytics & Google Search Console Setup",
    "Live Chat & Direct Customer Inquiry Integration",
    "Managed Cloud Hosting for 1 Year Included",
    ".COM.NG Domain Name & Free SSL Certificate",
    "Managed High-Speed Storage",
  ],
  whatsappMessage:
    "Hello Sales Cowboy! I want to order the ₦110,000 Managed E-Commerce Store package.",
};

const dedicatedTier: PackageTier = {
  name: "Dedicated Pro E-Commerce Store",
  badge: "Most Popular & Recommended",
  price: "₦165,000",
  renewalNote: "₦75,000 / year (Dedicated Server, Domain & SSL)",
  tagline: "For high-volume merchants needing dedicated server resources, backend code access, and unlimited business emails.",
  featured: true,
  deliverables: [
    "7 to 10 Custom E-Commerce Pages",
    "Unlimited Products & Inventory Tracking",
    "Dedicated High-Speed Server & Hosting (1 Year)",
    "Full Backend Access & Admin Control",
    "Admin Dashboard for Products, Orders & Customers",
    "30GB Dedicated High-Performance Storage",
    "Unlimited Company & Staff Email Accounts (e.g. orders@yourstore.com)",
    "Advanced Product Search, Filters & Price Sliders",
    "Instant Paystack / Flutterwave Card & Bank Checkout",
    "Contact Form, Automated Lead Capture & Cart Recovery",
    "Email Marketing List Capture & Newsletter System",
    ".COM Domain Name Included (or .com.ng)",
    "Full Technical SEO & Speed Optimization",
    "Google Analytics & Google Search Console Integration",
    "Live Chat Integration & Instant WhatsApp Routing",
  ],
  whatsappMessage:
    "Hello Sales Cowboy! I want to order the ₦165,000 Dedicated Pro E-Commerce Store package.",
};

const comparisonRows: ComparisonRow[] = [
  { feature: "Website Scope", tier1: "5 to 8 Pages", tier2: "7 to 10 Pages" },
  { feature: "Product Capacity", tier1: "Unlimited Products", tier2: "Unlimited Products" },
  { feature: "Server & Hosting", tier1: "Managed Cloud Hosting (1 Year)", tier2: "Dedicated Server & Hosting (1 Year)" },
  { feature: "Storage Capacity", tier1: "Managed Storage", tier2: "30GB Dedicated High-Speed SSD" },
  { feature: "Admin Dashboard", tier1: true, tier2: true },
  { feature: "Direct Backend Access", tier1: false, tier2: true },
  { feature: "Domain Name Included", tier1: ".COM.NG (1 Year Free)", tier2: ".COM or .COM.NG (1 Year Free)" },
  { feature: "Business Email Accounts", tier1: "5 Accounts", tier2: "Unlimited Accounts" },
  { feature: "Payment Gateway", tier1: "Paystack & Flutterwave", tier2: "Paystack & Flutterwave" },
  { feature: "Advanced Product Search & Filters", tier1: true, tier2: true },
  { feature: "Lead Capture & Email List", tier1: true, tier2: true },
  { feature: "SEO & Google Search Console", tier1: true, tier2: true },
  { feature: "Google Analytics Tracking", tier1: true, tier2: true },
  { feature: "Live Chat & WhatsApp Integration", tier1: true, tier2: true },
  { feature: "Turnaround Delivery Time", tier1: "7 Days", tier2: "7 Days" },
  { feature: "Year 2 Renewal Fee", tier1: "₦45,000 / year", tier2: "₦75,000 / year" },
];

const faqs = [
  {
    q: "How fast will my e-commerce store be ready?",
    a: "We deploy our standard store packages in 7 days once you provide your product list and company details. Custom applications and complex integrations may take longer depending on technical scope.",
  },
  {
    q: "Can customers pay with Nigerian cards and bank transfers?",
    a: "Yes. Both packages come fully integrated with Paystack and Flutterwave, allowing your customers to pay seamlessly with debit cards, bank transfers, USSD, and Apple Pay.",
  },
  {
    q: "What is the difference between the ₦110,000 and ₦165,000 package?",
    a: "The ₦165,000 Dedicated Store provides a dedicated server with 30GB storage, full backend code access, unlimited staff email accounts, and a premium .COM domain name. The ₦110,000 Managed Store uses managed cloud hosting with a .COM.NG domain.",
  },
];

export default function EcommercePage() {
  return (
    <PricingComparisonPage
      categoryBadge="E-Commerce Online Stores"
      title="Compare E-Commerce Store Packages"
      description="Launch a high-converting online store with seamless Nigerian payment checkouts, advanced product search, and intuitive admin dashboard."
      tier1={managedTier}
      tier2={dedicatedTier}
      comparisonRows={comparisonRows}
      faqs={faqs}
      defaultWhatsappMessage="Hello Sales Cowboy! I want to discuss launching an e-commerce online store."
    />
  );
}
