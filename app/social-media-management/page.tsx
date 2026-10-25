import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Social Media Management | Sales Cowboy Marketing Solutions",
  description: "Consistent, on-brand social media management. Content calendars, active daily posting, and DM community nurture.",
};

export default function SocialMediaManagementPage() {
  return (
    <LandingPage
      title={<>Active, on-brand social pages that <span className="text-accent">build trust.</span></>}
      subtitle="Consistent calendars, custom graphics, caption copywriting, and daily audience nurture."
      features={[
        { title: "Monthly Content Calendar", text: "Pre-planned themes and visuals approved by you." },
        { title: "Designer Graphics & Posts", text: "Carousels and single images matching your brand identity." },
        { title: "Engaging Copywriting", text: "Strategic captions, strong calls-to-action, and hashtags." },
        { title: "Active DM & Comment Nurture", text: "Never leave an interested customer hanging in your inbox." },
        { title: "Story Highlights & Polls", text: "Interactive daily stories keeping your page top-of-mind." },
        { title: "Monthly Growth Reports", text: "Reach, follower velocity, and inquiry analytics." },
      ]}
      plans={[
        {
          name: "Starter Presence",
          price: "₦90,000",
          note: "per month",
          features: [
            "12 Branded static & carousel posts per month",
            "Monthly content calendar & strategy",
            "Caption copywriting & targeted hashtags",
            "Comment & DM monitoring",
          ],
          whatsapp: "Hi Sales Cowboy! I want to get started with the ₦90k Starter Social Media package.",
        },
        {
          name: "Growth Engine",
          price: "₦180,000",
          note: "per month",
          featured: true,
          features: [
            "24 Designer posts + 8 edited short-form Reels",
            "Active daily DM nurture into WhatsApp",
            "Story highlights & interactive stickers",
            "Dedicated social media manager",
            "Monthly analytics & lead tracking",
          ],
          whatsapp: "Hi Sales Cowboy! I want to get started with the ₦180k Growth Social Media package.",
        },
        {
          name: "Full Studio Suite",
          price: "₦350,000",
          note: "per month",
          features: [
            "Daily posting (30+ posts) + 16 video reels",
            "On-site studio / business shoot (Lagos or Abuja)",
            "Rapid WhatsApp conversion routing",
            "Influencer cross-posting coordination",
          ],
          whatsapp: "Hi Sales Cowboy! I want to discuss the ₦350k Full Studio Suite.",
        },
      ]}
      steps={[
        { title: "Strategy", text: "We define brand voice, content pillars, and visual style." },
        { title: "Calendar", text: "You approve all posts, captions, and graphics in advance." },
        { title: "Manage", text: "We post, engage your community, and route leads to you." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I want social media management for my brand."
    />
  );
}
