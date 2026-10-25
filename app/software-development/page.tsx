import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Web, App & Software Development | Sales Cowboy Marketing Solutions",
  description: "Custom software engineering for Nigerian businesses: web apps, portals, SaaS, mobile applications, and high-speed websites.",
};

export default function SoftwareDevelopmentPage() {
  return (
    <LandingPage
      title={<>Web, app and software that <span className="text-accent">powers your business.</span></>}
      subtitle="Bespoke web applications, mobile apps, SaaS platforms, and high-performance digital systems built to scale."
      features={[
        { title: "Custom Web & Mobile Apps", text: "React, Next.js, and React Native applications engineered for maximum performance." },
        { title: "Nigerian Payment Rails", text: "Seamless automated collections via Paystack, Flutterwave, and Monnify." },
        { title: "Robust Cloud Databases", text: "Relational SQL architecture, fast edge caching, and scalable file storage." },
        { title: "Role-Based Access & Auth", text: "Admin dashboards, staff permissions, customer portals, and session security." },
        { title: "Clean API Microservices", text: "Integrate with third-party logistics, SMS gateways, and internal systems." },
        { title: "Post-Launch Warranty", text: "Full code handover, documentation, training, and SLA support guarantee." },
      ]}
      plans={[
        {
          name: "Business Website / MVP",
          price: "₦250,000",
          note: "one-time payment",
          features: [
            "5–8 Custom responsive pages (Next.js)",
            "Lead capture & WhatsApp routing",
            "On-page SEO & Google indexing setup",
            "Speed score 95+ on Google Lighthouse",
            "2 Weeks turnaround",
          ],
          whatsapp: "Hi Sales Cowboy! I want to build a Business Website / MVP for ₦250,000.",
        },
        {
          name: "Full-Stack Web App",
          price: "₦750,000",
          note: "one-time payment",
          featured: true,
          features: [
            "Custom dynamic web application",
            "User authentication & profile permissions",
            "Paystack / Flutterwave automated billing",
            "Relational database & Admin backoffice",
            "Staging reviews & 4–6 weeks turnaround",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦750k Full-Stack Web App package.",
        },
        {
          name: "Enterprise Software & Mobile",
          price: "₦2,200,000+",
          note: "one-time investment",
          features: [
            "Multi-tenant SaaS architecture or mobile app",
            "High-throughput API microservices",
            "Cloud edge caching & object storage",
            "Custom algorithmic or AI pipeline modules",
            "Dedicated lead engineer & 6 months warranty",
          ],
          whatsapp: "Hi Sales Cowboy! I want to discuss Enterprise Software & Mobile development.",
        },
      ]}
      steps={[
        { title: "Blueprint", text: "We define data models, user flows, tech stack, and milestone timelines." },
        { title: "Sprint", text: "We build in weekly testable increments with live staging previews." },
        { title: "Deploy", text: "We launch to production, train your team, and provide post-launch care." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I want to discuss a custom web, app, or software project."
    />
  );
}
