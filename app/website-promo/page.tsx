import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Website Design ₦75,000 | Sales Cowboy Marketing Solutions",
  description: "A fully functional, mobile-ready, SEO-optimized business website for ₦75,000. Fast turnaround.",
};

export default function WebsitePromoPage() {
  return (
    <LandingPage
      title={<>A full business website for <span className="text-accent">₦75,000.</span></>}
      subtitle="Mobile-ready, SEO-optimized and live in days."
      features={[
        { title: "Mobile-ready design", text: "Looks great on every phone." },
        { title: "Admin dashboard", text: "Edit your site yourself." },
        { title: "SEO setup", text: "Built to be found on Google." },
        { title: "Contact & WhatsApp", text: "Turn visitors into enquiries." },
        { title: "Any industry", text: "Real estate, logistics, shortlets and more." },
        { title: "Fast turnaround", text: "Live in 7 days." },
      ]}
      plans={[
        {
          name: "Business Website",
          price: "₦75,000",
          note: "One-off payment",
          featured: true,
          features: ["Fully functional website", "Mobile responsive", "SEO optimized", "Admin dashboard", "Contact form & WhatsApp"],
          whatsapp: "Hi, I'm interested in the ₦75k Website bundle for my business. When can we start?",
        },
      ]}
      whatsappNumber="2348104933232"
      whatsappMessage="Hi, I'm interested in the ₦75k Website bundle for my business. When can we start?"
    />
  );
}
