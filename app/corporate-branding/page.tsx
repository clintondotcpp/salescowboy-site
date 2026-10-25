import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Corporate Branding & Visual Identity | Sales Cowboy Marketing Solutions",
  description: "Commanding corporate visual identities: vector logos, typography guidelines, brand books, and investor pitch decks.",
};

export default function CorporateBrandingPage() {
  return (
    <LandingPage
      title={<>A commanding brand identity that <span className="text-accent">justifies premium prices.</span></>}
      subtitle="Separate your business from cheap competitors with high-end logos, typography systems, and executive slide decks."
      features={[
        { title: "Vector Logo Suite", text: "Primary logo, sub-marks, and monochrome variants in SVG, PNG, and EPS." },
        { title: "Color & Typography Systems", text: "Curated HSL palettes and modern font pairings engineered for clarity." },
        { title: "Corporate Stationery", text: "Business cards, letterheads, invoice templates, and email signatures." },
        { title: "Investor Pitch Decks", text: "12–16 slide presentations structured for funding and partnership proposals." },
        { title: "Comprehensive Brand Book", text: "Clear usage guidelines ensuring every department stays consistent." },
        { title: "Complete Copyright Handover", text: "You own 100% of all intellectual property and vector raw source files." },
      ]}
      plans={[
        {
          name: "Starter Identity",
          price: "₦80,000",
          note: "one-time investment",
          features: [
            "Primary & secondary logo marks (vector)",
            "Brand color palette & font pairings",
            "Business card & email signature design",
            "Social media profile kit (avatar & covers)",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦80,000 Starter Identity branding package.",
        },
        {
          name: "Complete Brand System",
          price: "₦180,000",
          note: "one-time investment",
          featured: true,
          features: [
            "Full logo system with sub-marks & iconography",
            "Investor pitch deck / Company profile (14 slides)",
            "Corporate letterhead, invoice template & envelopes",
            "Merchandise & packaging mockup guidelines",
            "Comprehensive Brand Guidelines PDF",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦180,000 Complete Brand System package.",
        },
        {
          name: "Executive Overhaul",
          price: "₦380,000",
          note: "one-time investment",
          features: [
            "Complete enterprise rebrand & vector suite",
            "3D brand assets & animated motion logo intro",
            "Executive pitch presentation with interactive graphics",
            "Physical collateral & signage architecture specs",
            "Trademark filing support & full IP handover",
          ],
          whatsapp: "Hi Sales Cowboy! I want to discuss the ₦380,000 Executive Brand Overhaul.",
        },
      ]}
      steps={[
        { title: "Discovery", text: "We analyze your target market, competitors, and brand tone." },
        { title: "Concepts", text: "We present distinct design directions for your feedback." },
        { title: "Guidelines", text: "We deliver full vector packages, decks, and brand rules." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I need corporate branding for my company."
    />
  );
}
