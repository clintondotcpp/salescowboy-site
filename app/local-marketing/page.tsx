import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Local Marketing & Billboards (OOH) | Sales Cowboy Marketing Solutions",
  description: "Prime outdoor billboard site procurement, high-visibility large format design, transit advertising, and city activations.",
};

export default function LocalMarketingPage() {
  return (
    <LandingPage
      title={<>Own your city with <span className="text-accent">billboards & local marketing.</span></>}
      subtitle="Prime outdoor advertising site procurement, large format creative design, and physical activations across Nigeria."
      features={[
        { title: "Strategic Site Procurement", text: "Prime high-traffic billboard locations in Lagos (Lekki, Ikeja, Island), Abuja, and major hubs." },
        { title: "Large-Format Creative Design", text: "Bold, legible typography and visuals engineered to be absorbed in 3 seconds at 60km/h." },
        { title: "Transit & Bus Branding", text: "BRT bus wraps, interstate vehicle branding, and high-frequency commuter visibility." },
        { title: "Permits & APCON Clearance", text: "We handle regulatory approvals, LASAA / local government permits, and sign-offs." },
        { title: "Flyer & Physical Collateral", text: "High-grade offset print collateral distributed at key targeted residential and corporate estates." },
        { title: "Digital + Physical Tracking", text: "QR codes, dedicated WhatsApp vanity URLs, and localized call-tracking numbers." },
      ]}
      plans={[
        {
          name: "Billboard Creative & Prep",
          price: "₦150,000",
          note: "one-time design & permit prep",
          features: [
            "High-impact billboard creative design",
            "Multi-format sizing for static & LED screens",
            "Regulatory & APCON review readiness",
            "Print-ready ultra-high-res vector files",
          ],
          whatsapp: "Hi Sales Cowboy! I want Billboard Creative & Prep for ₦150,000.",
        },
        {
          name: "City Billboard Campaign",
          price: "₦350,000+",
          note: "agency management + media rates",
          featured: true,
          features: [
            "Site procurement at prime high-traffic locations",
            "Static or LED digital board booking",
            "Print production supervision & mounting check",
            "Trackable QR / WhatsApp campaign setup",
            "Bi-weekly site verification & photo proof",
          ],
          whatsapp: "Hi Sales Cowboy! I want to launch a City Billboard Campaign.",
        },
        {
          name: "Omnichannel Local Takeover",
          price: "₦750,000+",
          note: "full campaign + media spend",
          features: [
            "Multi-board strategic placement across key corridors",
            "BRT or transit branding coordination",
            "Estate flyer distribution & local activation",
            "Synchronized geo-fenced Meta & Google mobile ads",
          ],
          whatsapp: "Hi Sales Cowboy! I want to discuss an Omnichannel Local Takeover.",
        },
      ]}
      steps={[
        { title: "Location", text: "We evaluate traffic patterns, commuter routes, and budget." },
        { title: "Design", text: "We craft bold, high-contrast creative tailored to outdoor distance." },
        { title: "Deploy", text: "We oversee printing, mounting, approvals, and verify execution." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I want to discuss local marketing and billboards."
    />
  );
}
