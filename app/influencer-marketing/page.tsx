import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Influencer Marketing | Sales Cowboy Marketing Solutions",
  description: "Curated Nigerian micro-influencers managed directly under our umbrella for authentic brand trust and sales.",
};

export default function InfluencerMarketingPage() {
  return (
    <LandingPage
      title={<>Creators who actually <span className="text-accent">move product.</span></>}
      subtitle="Vetted Nigerian creators under our umbrella delivering authentic engagement and trackable conversions."
      features={[
        { title: "Vetted Micro-Creators", text: "Creators with high trust and real engagement." },
        { title: "Coordinated Blitz", text: "48-hour social waves for maximum market buzz." },
        { title: "Briefs & Direction", text: "We handle scripts, product unboxings, and hooks." },
        { title: "Trackable Links & Codes", text: "Direct measurement of orders and inquiries." },
        { title: "Contract Management", text: "Full asset rights and deliverables enforcement." },
        { title: "Comment & DM Routing", text: "Pinned comments directing traffic to WhatsApp." },
      ]}
      plans={[
        {
          name: "Starter Wave",
          price: "₦120,000",
          note: "per campaign",
          features: [
            "3 Vetted niche creators",
            "1x Reel/TikTok + 2x Stories each",
            "Script briefs & product guidance",
            "Trackable promo codes & report",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦120k Starter Wave influencer campaign.",
        },
        {
          name: "Growth Blitz",
          price: "₦300,000",
          note: "per campaign",
          featured: true,
          features: [
            "8–10 Curated creators in one coordinated wave",
            "Multi-format reels, posts & live stories",
            "Direct comment pinning & WhatsApp routing",
            "Full creator contract & asset usage rights",
            "Post-campaign acquisition report",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦300k Growth Blitz influencer campaign.",
        },
        {
          name: "Market Takeover",
          price: "₦750,000+",
          note: "per campaign",
          features: [
            "20+ Creators across IG, TikTok & X",
            "Multi-week drip campaign with trending hooks",
            "Whitelisting rights to run paid ads through creator handles",
            "Live campaign tracking dashboard",
          ],
          whatsapp: "Hi Sales Cowboy! I want to discuss a Market Takeover influencer campaign.",
        },
      ]}
      steps={[
        { title: "Match", text: "We pick creators whose audience matches your buyers." },
        { title: "Produce", text: "We script, ship products, and review drafts." },
        { title: "Drop", text: "Content goes live in a synchronized wave." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I'm interested in an influencer marketing campaign."
    />
  );
}
