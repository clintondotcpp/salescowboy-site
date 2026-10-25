import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "CRM, MarTech & Custom AI Automation | Sales Cowboy Marketing Solutions",
  description: "Automate sales pipelines, WhatsApp messaging bots, CRM deployments, and custom AI agents for Nigerian businesses.",
};

export default function CrmAiAutomationPage() {
  return (
    <LandingPage
      title={<>Automate your sales pipelines with <span className="text-accent">CRM & AI.</span></>}
      subtitle="Stop losing leads. Deploy intelligent WhatsApp bots, automated follow-up workflows, and custom AI agents."
      features={[
        { title: "CRM Setup & Pipeline Mapping", text: "HubSpot, Zoho, or custom CRM configured to your exact sales stages." },
        { title: "WhatsApp Business Automation", text: "Instant automated greeting, menu routing, and catalog answers." },
        { title: "Multi-Stage Lead Nurturing", text: "Automated SMS, email, and WhatsApp drip sequences that re-engage prospects." },
        { title: "Custom AI Agents", text: "Trained on your business FAQs, price sheets, and catalogs to reply 24/7." },
        { title: "Staff Task Assignment", text: "Automatically alert and assign sales reps when high-intent leads arrive." },
        { title: "Accounting & Webhook Sync", text: "Connect form submissions to Google Sheets, Notion, or internal tools." },
      ]}
      plans={[
        {
          name: "Starter CRM",
          price: "₦150,000",
          note: "one-time setup",
          features: [
            "CRM platform setup (HubSpot, Zoho, etc.)",
            "Website lead form routing to CRM",
            "Instant WhatsApp & email notifications",
            "Team onboarding walkthrough",
          ],
          whatsapp: "Hi Sales Cowboy! I want to deploy Starter CRM for ₦150,000.",
        },
        {
          name: "Growth Automation",
          price: "₦350,000",
          note: "one-time setup",
          featured: true,
          features: [
            "WhatsApp Business API automated menu bot",
            "Multi-stage automated lead nurture drips",
            "Lead scoring & automated rep assignments",
            "Stale deal alerts & conversion tracking",
            "Webhook sync to accounting/billing tools",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦350k Growth Automation package.",
        },
        {
          name: "Custom AI Suite",
          price: "₦750,000+",
          note: "one-time setup",
          features: [
            "Custom LLM AI agent trained on your documents",
            "Full 2-way database synchronization",
            "Automated proposal & invoice dispatch",
            "AI conversation analytics dashboard",
            "Dedicated systems engineer & monthly fine-tuning",
          ],
          whatsapp: "Hi Sales Cowboy! I'm interested in the Custom AI Suite starting from ₦750k.",
        },
      ]}
      steps={[
        { title: "Map", text: "We document your sales workflow and lead drop-off points." },
        { title: "Build", text: "We connect CRM, configure bots, and test automation triggers." },
        { title: "Deploy", text: "Your team is trained and automation runs 24/7 in the background." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I want to automate my business workflows and CRM."
    />
  );
}
