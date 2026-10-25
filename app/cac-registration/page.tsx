import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "CAC Registration & Tax Compliance | Sales Cowboy Marketing Solutions",
  description: "Official CAC Business Name & LTD incorporation, FIRS TIN, annual returns, and tax compliance in Nigeria.",
};

export default function CacRegistrationPage() {
  return (
    <LandingPage
      title={<>Legitimize your business with <span className="text-accent">CAC & Tax filing.</span></>}
      subtitle="Corporate business registration, FIRS TIN, and annual returns managed by compliance specialists."
      features={[
        { title: "Official CAC Registration", text: "Business Name or Private Limited Liability (LTD)." },
        { title: "FIRS Tax ID (TIN)", text: "Issued directly for corporate banking and contracts." },
        { title: "Status Report & Certs", text: "Full official digital certificates and documentation." },
        { title: "Corporate Bank Support", text: "All documents needed to open corporate accounts." },
        { title: "Annual Returns Filing", text: "Keep your business active and avoid CAC penalties." },
        { title: "Fast Turnaround", text: "Completed in 5–7 business days without hassle." },
      ]}
      plans={[
        {
          name: "Business Name",
          price: "₦45,000",
          note: "one-time payment",
          features: [
            "Name availability search & reservation",
            "Official CAC Certificate of Registration",
            "Status report & business documentation",
            "Turnaround in 5–7 business days",
          ],
          whatsapp: "Hi Sales Cowboy! I want to register a CAC Business Name for ₦45,000.",
        },
        {
          name: "Company (LTD)",
          price: "₦95,000",
          note: "one-time payment",
          featured: true,
          features: [
            "Full CAC Limited Liability (LTD) registration",
            "FIRS Tax Identification Number (TIN)",
            "Memorandum & Articles of Association (MEMART)",
            "Corporate bank account opening readiness",
          ],
          whatsapp: "Hi Sales Cowboy! I want to incorporate a Limited Liability Company (LTD) for ₦95,000.",
        },
        {
          name: "Full Compliance",
          price: "₦190,000",
          note: "one-time package",
          features: [
            "Company Incorporation (LTD) + TIN",
            "1 Year Annual Returns filing included",
            "Tax Clearance Certificate (TCC) processing",
            "SCUML compliance guidance",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦190,000 Full Compliance corporate package.",
        },
      ]}
      steps={[
        { title: "Search", text: "Send 2 preferred names. We verify availability with CAC." },
        { title: "Filing", text: "We submit director details, ID, and corporate documentation." },
        { title: "Delivery", text: "Your official certificates and TIN are delivered to your inbox." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I want to register my business with CAC."
    />
  );
}
