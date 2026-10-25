import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Content Creation as a Service | Sales Cowboy Marketing Solutions",
  description: "High-impact visual content for businesses: commercial reels, carousels, product graphics, and copywriting.",
};

export default function ContentCreationPage() {
  return (
    <LandingPage
      title={<>Scroll-stopping content that <span className="text-accent">sells your product.</span></>}
      subtitle="Commercial short-form reels, product visuals, infographics, and copy tailored for Nigerian businesses."
      features={[
        { title: "Short-Form Viral Reels", text: "Optimized for Instagram Reels, TikTok, and YouTube Shorts." },
        { title: "Product & Service Mockups", text: "Clean, high-resolution visuals that show real value." },
        { title: "Educational Carousels", text: "High-save swipe decks establishing your authority." },
        { title: "Commercial Ad Copy", text: "Persuasive hooks, benefit-driven angles, and calls-to-action." },
        { title: "Trending Audio Hooks", text: "Leverage popular sounds and formats before they fade." },
        { title: "Brand Consistency", text: "Uniform typography, colors, and polish across all assets." },
      ]}
      plans={[
        {
          name: "Starter Creative",
          price: "₦85,000",
          note: "per month",
          features: [
            "10 Custom graphics & carousels",
            "4 Edited short-form video reels",
            "Full caption copywriting & hooks",
            "Raw source files provided",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦85k Starter Creative package.",
        },
        {
          name: "Growth Media Engine",
          price: "₦160,000",
          note: "per month",
          featured: true,
          features: [
            "20 Custom graphics & multi-slide carousels",
            "10 Professionally edited commercial reels",
            "Product unboxing & feature walkthroughs",
            "Ad creative variations for paid campaigns",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦160k Growth Media Engine package.",
        },
        {
          name: "Full Media Production",
          price: "₦300,000",
          note: "per month",
          features: [
            "Daily creative output (30+ graphics & carousels)",
            "20 Video reels & TikTok assets",
            "Dedicated creative director & video editor",
            "Unlimited revision rounds on drafts",
          ],
          whatsapp: "Hi Sales Cowboy! I'm interested in the ₦300k Full Media Production.",
        },
      ]}
      steps={[
        { title: "Brief", text: "You send raw product photos, footage, or project requirements." },
        { title: "Create", text: "Our design and video team edits, color grades, and polishes." },
        { title: "Deliver", text: "High-resolution ready-to-post assets delivered weekly." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I need content creation for my business."
    />
  );
}
