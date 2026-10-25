import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Custom Web App Development from ₦500,000 | Sales Cowboy Marketing Solutions",
  description: "Custom web applications for Nigerian businesses: portals, trackers, POS, VTU, school and loan platforms. From ₦500,000.",
};

export default function WebAppPromoPage() {
  return (
    <LandingPage
      title={<>Custom software that <span className="text-accent">runs your business.</span></>}
      subtitle="Web apps built around how you actually work."
      featuresHeading="What we build"
      features={[
        { title: "Logistics trackers", text: "Shipments, riders and live status." },
        { title: "School portals", text: "Results, fees and installments." },
        { title: "POS & inventory", text: "Multi-branch sales and stock." },
        { title: "Property platforms", text: "Listings with advanced filters." },
        { title: "VTU gateways", text: "Airtime, data and bill payments." },
        { title: "Savings & loans", text: "Contributions and micro-lending." },
      ]}
      plans={[
        {
          name: "Core Web App",
          price: "₦500,000",
          note: "Starting price",
          features: ["Custom-built web app", "Admin dashboard", "User accounts & roles", "Payment integration"],
          whatsapp: "Hi Sales Cowboy! I'm interested in the Core Web App Package starting from ₦500,000.",
        },
        {
          name: "Enterprise",
          price: "₦1,200,000",
          note: "Starting price",
          featured: true,
          features: ["Everything in Core", "Complex workflows", "Integrations & APIs", "Priority support"],
          whatsapp: "Hi Sales Cowboy! I'm interested in the Enterprise Software Package starting from ₦1.2M.",
        },
      ]}
      plansNote="50% upfront, balance on delivery. Mobile apps quoted separately."
      steps={[
        { title: "Scope", text: "We map your workflow." },
        { title: "Build", text: "Weekly demos as we ship." },
        { title: "Launch", text: "Deploy, train, support." },
      ]}
      whatsappNumber="2348104933232"
      whatsappMessage="Hi Sales Cowboy! I'm ready to discuss my custom software project."
    />
  );
}
