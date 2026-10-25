import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "SEO & Local SEO Services | Sales Cowboy Marketing Solutions",
  description: "Rank higher on Google in Nigeria. Google Business Profile optimization, local 3-pack rankings, technical SEO, and authority backlinks.",
};

export default function SeoPage() {
  return (
    <LandingPage
      title={<>Rank on Google. Get <span className="text-accent">steady client calls.</span></>}
      subtitle="Technical search optimization, Google Business Profile local 3-pack dominance, and commercial keyword rankings."
      features={[
        { title: "Google Business Profile", text: "Optimized categories, citations, and reviews to rank in the local Google Maps 3-pack." },
        { title: "Commercial Keyword Ranking", text: "Target high-intent Nigerian searches like 'near me' or specific city inquiries." },
        { title: "Technical On-Page Audits", text: "Fix crawl errors, broken redirects, slow server response times, and schema markup." },
        { title: "High-Authority Backlinks", text: "Quality digital PR and localized backlinks that boost your domain rating safely." },
        { title: "Content Cluster Strategy", text: "Publish authoritative articles that capture buyers searching for solutions." },
        { title: "Monthly Ranking Reports", text: "Transparent tracking showing your exact Google position movements and organic calls." },
      ]}
      plans={[
        {
          name: "Local 3-Pack SEO",
          price: "₦80,000",
          note: "per month",
          features: [
            "Google Business Profile optimization (Lagos/Abuja)",
            "Local citation cleanup & directory submissions",
            "On-page schema markup & meta tags",
            "Monthly local ranking progress report",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦80,000 Local 3-Pack SEO package.",
        },
        {
          name: "Rank Domination",
          price: "₦160,000",
          note: "per month",
          featured: true,
          features: [
            "Local 3-pack + 15 commercial keyword targets",
            "Technical speed & Core Web Vitals optimization",
            "2 Authoritative Nigerian SEO blog posts / mo",
            "Competitor rank tracking & monthly audit",
            "Dedicated SEO strategist on WhatsApp",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦160,000 Rank Domination SEO package.",
        },
        {
          name: "National Authority",
          price: "₦300,000",
          note: "per month",
          features: [
            "National search conquest across all Nigerian states",
            "Aggressive authoritative backlink building & PR",
            "4 High-ranking content clusters per month",
            "Bi-weekly strategy call with lead strategist",
          ],
          whatsapp: "Hi Sales Cowboy! I want to discuss National Authority SEO.",
        },
      ]}
      steps={[
        { title: "Audit", text: "We crawl your website and identify technical blocks and target keywords." },
        { title: "Optimize", text: "We fix on-page code, optimize Google Business Profile, and publish content." },
        { title: "Rank", text: "Your rankings climb, organic impressions surge, and leads call you." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I want SEO & Local SEO to rank my business on Google."
    />
  );
}
