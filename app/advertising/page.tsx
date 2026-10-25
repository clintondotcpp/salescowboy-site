import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Advertising & Paid Social Marketing | Sales Cowboy Marketing Solutions",
  description: "High-ROAS customer acquisition across Meta, Google, and TikTok. Transparent ad management packages.",
};

export default function AdvertisingPage() {
  return (
    <LandingPage
      title={<>Paid ads that <span className="text-accent">convert into cash.</span></>}
      subtitle="Data-driven Meta, Google and TikTok ad funnels with strict ROAS focus."
      features={[
        { title: "Multi-Platform Coverage", text: "Meta (FB & IG), Google Search, and TikTok." },
        { title: "Server-Side Tracking", text: "Meta CAPI and Google Tag Manager configured." },
        { title: "Creative Ad Variations", text: "Compelling angles, hooks, and copy iterations." },
        { title: "Retargeting Funnels", text: "Recapture warm visitors who didn't buy." },
        { title: "Bi-Weekly Audits", text: "Transparent metrics, spend tracking, and ROAS reports." },
        { title: "Dedicated Media Buyer", text: "Direct WhatsApp support and rapid optimizations." },
      ]}
      plans={[
        {
          name: "Starter Ads",
          price: "₦80,000",
          note: "per month (ad spend separate)",
          features: [
            "1 Core channel (Meta or Google)",
            "Pixel & CAPI server-side setup",
            "4 Ad creative variations per month",
            "Bi-weekly performance audit",
          ],
          whatsapp: "Hi Sales Cowboy! I want to get started with the ₦80k Starter Ads package.",
        },
        {
          name: "Growth Funnel",
          price: "₦180,000",
          note: "per month (ad spend separate)",
          featured: true,
          features: [
            "Meta (FB/IG) + Google Search ads",
            "Dynamic retargeting funnels",
            "8–12 Ad creative & copy variations",
            "Weekly budget & ROAS optimizations",
            "Dedicated media buyer",
          ],
          whatsapp: "Hi Sales Cowboy! I want to get started with the ₦180k Growth Funnel package.",
        },
        {
          name: "Omnichannel Scale",
          price: "₦350,000",
          note: "per month (ad spend separate)",
          features: [
            "Omnichannel: Meta, Google, TikTok & YouTube",
            "High-velocity testing (20+ variations/mo)",
            "Landing page conversion optimization",
            "Daily bid management & live dashboard",
          ],
          whatsapp: "Hi Sales Cowboy! I'm interested in the ₦350k Omnichannel Scale package.",
        },
      ]}
      steps={[
        { title: "Audit", text: "We analyze your audience, offers, and tracking." },
        { title: "Launch", text: "We build creatives, setup funnels, and test." },
        { title: "Scale", text: "We double down on top winners and optimize ROAS." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I want to discuss paid advertising for my business."
    />
  );
}
