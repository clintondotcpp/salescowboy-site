import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Website Maintenance & Webmaster Support | Sales Cowboy Marketing Solutions",
  description: "24/7 uptime monitoring, security patching, Core Web Vitals speed optimization, and on-demand webmaster updates.",
};

export default function WebsiteMaintenancePage() {
  return (
    <LandingPage
      title={<>24/7 website care, security & <span className="text-accent">rapid updates.</span></>}
      subtitle="Keep your site fast, secure, and always online with dedicated webmasters on call."
      features={[
        { title: "24/7 Uptime Monitoring", text: "Instant alerts and rapid response if your site ever drops offline." },
        { title: "Security & Patching", text: "Regular updates to plugins, CMS core, and firewall configurations." },
        { title: "Automated Cloud Backups", text: "Off-site backups so you can restore your entire site in minutes." },
        { title: "Speed & Core Web Vitals", text: "Ongoing cache optimization, image compression, and high Lighthouse scores." },
        { title: "On-Demand Content Updates", text: "Send new products, text, banners, or blog posts on WhatsApp." },
        { title: "Technical Bug Fixes", text: "Broken forms, checkout bugs, and layout issues fixed quickly." },
      ]}
      plans={[
        {
          name: "Essential Care",
          price: "₦50,000",
          note: "per month",
          features: [
            "24/7 Uptime monitoring & alerts",
            "Weekly core/plugin updates & backups",
            "Monthly technical health report",
            "2 Minor content/banner updates per month",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦50k Essential Care maintenance plan.",
        },
        {
          name: "Active Webmaster",
          price: "₦120,000",
          note: "per month",
          featured: true,
          features: [
            "Dedicated webmaster on WhatsApp",
            "Unlimited minor content & banner updates",
            "Speed & Core Web Vitals optimization",
            "Lead form & checkout health testing",
            "Priority same-day bug fix response",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦120k Active Webmaster maintenance plan.",
        },
        {
          name: "Enterprise SLA",
          price: "₦250,000",
          note: "per month",
          features: [
            "1-Hour emergency response SLA",
            "Custom feature additions & landing page builds",
            "Database maintenance & edge CDN caching",
            "Dedicated lead software engineer",
          ],
          whatsapp: "Hi Sales Cowboy! I'm interested in the ₦250k Enterprise SLA plan.",
        },
      ]}
      steps={[
        { title: "Audit", text: "We review your current code, hosting setup, and security posture." },
        { title: "Connect", text: "We install automated backups, monitoring scripts, and secure access." },
        { title: "Care", text: "Send change requests anytime via WhatsApp for immediate turnaround." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I want website maintenance and updates for my site."
    />
  );
}
