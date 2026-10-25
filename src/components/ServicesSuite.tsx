"use client";

import { 
  Code2, 
  Megaphone, 
  Users2, 
  FileCheck2, 
  Share2, 
  Palette, 
  Cpu, 
  Award, 
  Wrench, 
  LineChart, 
  MapPin, 
  Video, 
  Search, 
  Bot,
  ArrowRight,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  icon: any;
  category: "Development" | "Acquisition" | "Operations & Legal" | "Creative & Media";
  summary: string;
  deliverables: string[];
  startingPrice: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-software-dev",
    number: "01",
    title: "Web & Software Development",
    icon: Code2,
    category: "Development",
    summary: "Custom web applications, SaaS platforms, portals, and mobile apps built for scale.",
    deliverables: [
      "Custom React / Next.js web applications",
      "Native iOS & Android mobile apps",
      "Paystack & Flutterwave checkout flows",
    ],
    startingPrice: "From ₦250k (Starter) to ₦2.2m+ (Enterprise)",
  },
  {
    id: "paid-advertising",
    number: "02",
    title: "Advertising & Paid / Social",
    icon: Megaphone,
    category: "Acquisition",
    summary: "High-ROAS customer acquisition across Meta, Google, and TikTok.",
    deliverables: [
      "Meta CAPI & server-side tracking",
      "Google Search intent campaigns",
      "High-velocity creative ad testing",
    ],
    startingPrice: "From ₦80k/mo (Starter) to ₦350k/mo (Enterprise)",
  },
  {
    id: "influencer-marketing",
    number: "03",
    title: "Micro-Influencer Marketing Umbrella",
    icon: Users2,
    category: "Acquisition",
    summary: "Vetted creators under 100k followers delivering 4x the trust and engagement of celebrity accounts.",
    deliverables: [
      "Niche-matched creator curation",
      "Coordinated wave posting schedules",
      "Trackable affiliate & discount codes",
    ],
    startingPrice: "From ₦120k (Starter) to ₦750k+ (Enterprise Blitz)",
  },
  {
    id: "cac-tax-filing",
    number: "04",
    title: "CAC Registration, Tax Filing & Compliance",
    icon: FileCheck2,
    category: "Operations & Legal",
    summary: "Corporate business name and LTD incorporation, TIN, and annual tax clearance.",
    deliverables: [
      "CAC Business Name & LTD registration",
      "FIRS Tax ID (TIN) & annual returns",
      "TCC certificates & SCUML compliance",
    ],
    startingPrice: "From ₦45k (Business Name) to ₦190k (Corporate)",
  },
  {
    id: "social-media-management",
    number: "05",
    title: "Social Media Management",
    icon: Share2,
    category: "Acquisition",
    summary: "Strategic content planning, daily posting, and audience engagement across all channels.",
    deliverables: [
      "Monthly content calendars",
      "Daily posting, copy & hashtags",
      "Active DM and lead engagement",
    ],
    startingPrice: "From ₦90k/mo (Starter) to ₦350k/mo (Full Suite)",
  },
  {
    id: "content-creation",
    number: "06",
    title: "Content Creation as a Service",
    icon: Palette,
    category: "Creative & Media",
    summary: "High-impact visual assets: commercial reels, product mockups, and scroll-stopping carousels.",
    deliverables: [
      "Short-form viral reels & TikToks",
      "High-resolution product visuals",
      "Branded infographic carousel decks",
    ],
    startingPrice: "From ₦85k/mo (Starter) to ₦300k/mo (Full Media)",
  },
  {
    id: "crm-martech-ai",
    number: "07",
    title: "CRM & MarTech Deployment",
    icon: Cpu,
    category: "Operations & Legal",
    summary: "Deploy and automate HubSpot, Zoho, or custom pipelines with instant WhatsApp notifications.",
    deliverables: [
      "CRM pipeline mapping & setup",
      "Automated WhatsApp lead triggers",
      "Drip email & SMS nurturing sequences",
    ],
    startingPrice: "From ₦150k (Starter) to ₦750k+ (Enterprise)",
  },
  {
    id: "corporate-branding",
    number: "08",
    title: "Corporate Branding & Identity",
    icon: Award,
    category: "Creative & Media",
    summary: "Premium visual identities: vector logos, typography systems, and executive pitch decks.",
    deliverables: [
      "Primary & secondary vector logos",
      "Curated color palette & fonts",
      "Company profile & pitch deck templates",
    ],
    startingPrice: "From ₦80k (Starter) to ₦380k (Brand Book)",
  },
  {
    id: "website-maintenance",
    number: "09",
    title: "Website Maintenance & Updates",
    icon: Wrench,
    category: "Development",
    summary: "24/7 uptime monitoring, security patches, plugin audits, and rapid content updates.",
    deliverables: [
      "24/7 uptime & latency monitoring",
      "Weekly security scans & backups",
      "Speed & Core Web Vitals maintenance",
    ],
    startingPrice: "From ₦50k/mo (Starter) to ₦250k/mo (Enterprise SLA)",
  },
  {
    id: "market-research",
    number: "10",
    title: "Market Research & Intelligence",
    icon: LineChart,
    category: "Operations & Legal",
    summary: "Competitor benchmarking, consumer pricing sensitivity, and Nigerian market feasibility audits.",
    deliverables: [
      "Competitor matrix & price audits",
      "Target buyer surveys & interviews",
      "Actionable go-to-market roadmap",
    ],
    startingPrice: "From ₦100k (Starter) to ₦650k+ (Nationwide Study)",
  },
  {
    id: "local-marketing",
    number: "11",
    title: "Local Marketing & Billboards (OOH)",
    icon: MapPin,
    category: "Acquisition",
    summary: "Prime outdoor billboard site procurement, large format creative design, and city activations.",
    deliverables: [
      "Strategic billboard site selection",
      "High-visibility large format design",
      "Transit & bus branding procurement",
    ],
    startingPrice: "From ₦150k + Media Rates (Custom Scopes)",
  },
  {
    id: "video-production",
    number: "12",
    title: "Video Production & Real Estate Marketing",
    icon: Video,
    category: "Creative & Media",
    summary: "4K cinematic drone tours, walkthroughs, and ad cuts for real estate and corporate brands.",
    deliverables: [
      "4K drone aerials & walkthroughs",
      "Architectural video editing",
      "Social-ready paid ad cuts",
    ],
    startingPrice: "From ₦120k/shoot (Starter) to ₦500k+ (Campaign)",
  },
  {
    id: "seo",
    number: "13",
    title: "Search Engine Optimization (SEO)",
    icon: Search,
    category: "Acquisition",
    summary: "Technical indexing, Google Business Profile local dominance, and commercial keyword rankings.",
    deliverables: [
      "Technical indexing & site health fixes",
      "Google Business Profile 3-pack rank",
      "Targeted commercial search strategy",
    ],
    startingPrice: "From ₦80k/mo (Starter) to ₦280k/mo (Dominance)",
  },
  {
    id: "ai-automation",
    number: "14",
    title: "AI Automation & Custom Agents",
    icon: Bot,
    category: "Development",
    summary: "Custom AI support bots, automated WhatsApp responders, and internal workflow pipelines.",
    deliverables: [
      "AI support bot trained on your docs",
      "Automated WhatsApp customer intake",
      "Lead qualification & CRM synching",
    ],
    startingPrice: "From ₦180k (Starter) to ₦850k+ (Enterprise)",
  },
];

const ServicesSuite = () => {
  return (
    <section id="services" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-xl mx-auto text-center mb-10 space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            All 14 Core Services
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Complete growth, engineering, and operations suite for Nigerian businesses.
          </p>
        </div>

        {/* 14 Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesData.map((svc) => {
            const Icon = svc.icon;
            const isPrimary = svc.id === "web-software-dev";
            return (
              <div
                key={svc.id}
                id={`service-${svc.id}`}
                className={`bg-card rounded-xl border p-5 flex flex-col justify-between transition-all duration-300 hover-lift ${
                  isPrimary
                    ? "border-primary/80 ring-2 ring-primary/20 shadow-md bg-gradient-to-b from-card to-secondary/30"
                    : "border-border shadow-sm hover:border-accent/60"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-muted-foreground">
                      {svc.number}
                    </span>
                    <span className="text-xs text-accent font-semibold">{svc.category}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground leading-snug">
                        {svc.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {svc.summary}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-border">
                    <ul className="space-y-1">
                      {svc.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3.5 mt-3 border-t border-border flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Starting Price</div>
                    <div className="font-bold text-foreground text-xs mt-0.5">{svc.startingPrice}</div>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    variant={isPrimary ? "default" : "outline"}
                    className={
                      isPrimary
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs px-3"
                        : "border-border text-foreground hover:bg-secondary text-xs px-3"
                    }
                  >
                    <a href="#pricing">
                      View Bundles <ArrowRight className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSuite;
