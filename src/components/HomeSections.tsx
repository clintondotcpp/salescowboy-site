"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Code2,
  Megaphone,
  Search,
  Users2,
  Share2,
  Palette,
  Bot,
  Award,
  Video,
  MapPin,
  LineChart,
  Wrench,
  FileCheck2,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building2,
  ShoppingBag,
  Briefcase,
  Truck,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* =========================================================================
   03. FOUR STRATEGIC SERVICE DIVISIONS
   Grouped by business outcomes (Marketing, Tech, Brand, Compliance)
   ========================================================================= */

const serviceDivisions = [
  {
    id: "marketing",
    number: "Division A",
    title: "Marketing & Customer Acquisition",
    outcome: "Get attention. Generate qualified leads. Win paying customers.",
    services: [
      {
        icon: Megaphone,
        title: "Paid Advertising (Meta, Google & TikTok)",
        description:
          "Paid campaigns designed to reach your target customers, generate qualified enquiries and track conversions.",
        href: "/advertising",
        badge: "Meta & Google Ads",
      },
      {
        icon: Search,
        title: "SEO & Local SEO",
        description:
          "Local SEO and Google Business Profile optimisation to improve your visibility when nearby customers search for your services.",
        href: "/seo",
        badge: "Search Dominance",
      },
      {
        icon: Share2,
        title: "Social Media Management",
        description:
          "Social media management covering content planning, publishing, community engagement and performance reporting.",
        href: "/social-media-management",
        badge: "Brand Presence",
      },
      {
        icon: Users2,
        title: "Influencer Marketing",
        description:
          "Vetted creator partnerships aligned with your niche to drive authentic endorsements and measurable customer acquisition.",
        href: "/influencer-marketing",
        badge: "Direct Reach",
      },
      {
        icon: Video,
        title: "Video & Real Estate Media",
        description:
          "Commercial reels, 4K architectural property tours and creative visual assets tailored for real estate and brands.",
        href: "/video-production",
        badge: "High-Impact Visuals",
      },
      {
        icon: MapPin,
        title: "Local & Outdoor Advertising",
        description:
          "Strategic billboard media, transit branding, and high-impact physical reach across strategic Nigerian corridors.",
        href: "/local-marketing",
        badge: "OOH & Billboards",
      },
    ],
  },
  {
    id: "technology",
    number: "Division B",
    title: "Digital Products & Technology",
    outcome: "Build the digital infrastructure your business needs to operate and scale.",
    services: [
      {
        icon: ShoppingBag,
        title: "Websites & E-Commerce",
        description:
          "Custom, ultra-fast web platforms engineered to convert traffic into revenue, equipped with seamless Paystack/Flutterwave checkouts.",
        href: "/ecommerce",
        badge: "Online Stores",
      },
      {
        icon: Code2,
        title: "Mobile Apps & Custom Software",
        description:
          "Scalable iOS, Android, and web applications built with modern architecture to automate internal operations and customer portals.",
        href: "/software-development",
        badge: "Custom Web & Mobile",
      },
      {
        icon: Bot,
        title: "CRM Setup & AI Automation",
        description:
          "CRM setup and automated follow-ups that help your team manage leads, reduce manual work and prevent missed enquiries.",
        href: "/crm-ai-automation",
        badge: "Workflows & Follow-ups",
      },
      {
        icon: Wrench,
        title: "Website Maintenance & Support",
        description:
          "Ongoing website maintenance, backups, security updates, monitoring and technical support, with a clearly defined service level.",
        href: "/website-maintenance",
        badge: "24/7 SLA Support",
      },
    ],
  },
  {
    id: "brand",
    number: "Division C",
    title: "Brand & Business Intelligence",
    outcome: "Present a credible, authoritative brand and make informed strategic decisions.",
    services: [
      {
        icon: Award,
        title: "Corporate Branding & Identity",
        description:
          "Distinctive logo systems, corporate brand guidelines, stationery, and investor pitch decks that position you as an industry authority.",
        href: "/corporate-branding",
        badge: "Brand Identity",
      },
      {
        icon: LineChart,
        title: "Market & Competitor Research",
        description:
          "Competitor analysis, customer research and market insights to inform pricing, positioning and marketing decisions.",
        href: "/market-research",
        badge: "Market Intelligence",
      },
      {
        icon: Palette,
        title: "Content Creation & Copywriting",
        description:
          "Commercial messaging, technical copywriting, and high-converting sales assets that clearly articulate your value proposition.",
        href: "/content-creation",
        badge: "Commercial Copy",
      },
    ],
  },
  {
    id: "compliance",
    number: "Division D",
    title: "Business Setup & Compliance",
    outcome: "Help businesses formalise and maintain their legal and regulatory operations.",
    services: [
      {
        icon: FileCheck2,
        title: "CAC Business Registration",
        description:
          "CAC registration and clearly specified compliance support, with official documentation and transparent filing timelines.",
        href: "/cac-registration",
        badge: "CAC Incorporation",
      },
      {
        icon: FileCheck2,
        title: "Tax Filing & Statutory Compliance",
        description:
          "TIN registration, VAT/CIT filing preparation, and structured annual compliance assistance with statutory guidelines.",
        href: "/cac-registration",
        badge: "Tax & Filings",
      },
    ],
  },
];

export function Services() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredDivisions =
    activeTab === "all"
      ? serviceDivisions
      : serviceDivisions.filter((d) => d.id === activeTab);

  return (
    <section id="services" className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
            03 — Strategic Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Four divisions. One growth partner.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed font-sans">
            We don’t offer 13 disconnected services. We organise our capabilities around four core business outcomes: attracting customers, engineering infrastructure, establishing authority, and maintaining compliance.
          </p>
        </div>

        {/* Division Filter Tabs */}
        <div className="mt-10 flex flex-wrap gap-2 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === "all"
                ? "bg-foreground text-background"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All Divisions (13 Services)
          </button>
          {serviceDivisions.map((div) => (
            <button
              key={div.id}
              type="button"
              onClick={() => setActiveTab(div.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === div.id
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {div.title}
            </button>
          ))}
        </div>

        {/* Divisions Display */}
        <div className="mt-12 space-y-16">
          {filteredDivisions.map((div) => (
            <div key={div.id} className="rounded-3xl border border-border bg-card/40 p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-border">
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-accent">
                    {div.number}
                  </span>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-foreground font-sans">
                    {div.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">
                    {div.outcome}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {div.services.length} specialised capabilities
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {div.services.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 transition-all hover:border-foreground/50 hover:shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-accent group-hover:bg-foreground group-hover:text-background transition-colors">
                            <Icon className="w-5 h-5" strokeWidth={1.75} />
                          </div>
                          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                            {item.badge}
                          </span>
                        </div>

                        <h4 className="mt-5 text-lg font-bold text-foreground font-sans group-hover:text-accent transition-colors">
                          {item.title}
                        </h4>

                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-accent group-hover:translate-x-0.5 transition-transform">
                        <span>Learn more</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   DELIVERY MODEL / TRUST
   Addresses Feedback Item 4: Why one company should handle all this
   ========================================================================= */

export function DeliveryModel() {
  return (
    <section className="py-20 md:py-28 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
              Accountability & Delivery
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-[1.2]">
              Why work with one unified growth partner?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
              Most businesses struggle because their web designers, media buyers, and CRM contractors work in silos, passing blame when campaigns don’t produce sales.
            </p>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
              At Sales Cowboy, your technical infrastructure and customer acquisition strategies are engineered by one accountable team. No finger-pointing. No communication gap.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-background border border-border">
              <ShieldCheck className="w-6 h-6 text-accent mb-3" />
              <h3 className="text-base font-bold text-foreground font-sans">
                Direct In-House Execution
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                You work directly with the developers and media strategists building your project. We don’t pass your work off to anonymous subcontractors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-border">
              <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
              <h3 className="text-base font-bold text-foreground font-sans">
                100% Code & Asset Ownership
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                You own your domain, GitHub repository, ad accounts, and customer data from day one. Zero vendor lock-in or proprietary traps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-border">
              <TrendingUp className="w-6 h-6 text-accent mb-3" />
              <h3 className="text-base font-bold text-foreground font-sans">
                Outcome-Driven Architecture
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                We build websites and ads designed for conversion, not just aesthetic awards. Every page, form, and tracking pixel is built to generate pipeline.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-border">
              <Users2 className="w-6 h-6 text-accent mb-3" />
              <h3 className="text-base font-bold text-foreground font-sans">
                Single Point of Contact
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                One dedicated lead manager coordinates your milestones, weekly progress demos, and rapid WhatsApp communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   04. FEATURED CASE STUDIES
   3 concrete projects with Problem, Work, Timeline, and Measurable Results
   ========================================================================= */

const caseStudies = [
  {
    title: "Drenopav Floors",
    category: "SEO & Web Infrastructure",
    location: "Lagos, Nigeria",
    problem:
      "Relied entirely on word-of-mouth. Had zero search visibility for commercial flooring contracts in Lagos, losing deals to competitors.",
    solution:
      "Built a high-performance showcase website, implemented local schema markup, Google Business Profile optimisation, and an automated WhatsApp quote intake funnel.",
    timeline: "10-day sprint",
    results: [
      { metric: "#1 Rank", label: "Google local search for flooring in Lagos" },
      { metric: "14+", label: "Verified commercial enquiries / month" },
      { metric: "₦18M+", label: "Inbound contract pipeline in 90 days" },
    ],
  },
  {
    title: "SunPower Clean Energy",
    category: "Performance Ads & Conversion Funnel",
    location: "Lagos & Abuja",
    problem:
      "High cost per acquisition on social ads with a 70% drop-off rate on a lengthy, cumbersome lead contact form.",
    solution:
      "Re-engineered the conversion path with a high-speed landing page, interactive solar load estimator, focused Meta video ad creative, and direct WhatsApp CRM intake.",
    timeline: "7-day sprint",
    results: [
      { metric: "42%", label: "Reduction in cost per acquisition (CPA)" },
      { metric: "3.9x", label: "Verified return on ad spend (ROAS)" },
      { metric: "85+", label: "Residential solar audit bookings" },
    ],
  },
  {
    title: "Lekki Prime Properties",
    category: "CRM & WhatsApp Automation",
    location: "Lekki, Lagos",
    problem:
      "Sales reps had a 48-hour response lag on incoming Instagram and Google property inquiries, resulting in cold leads and missed buyer inspections.",
    solution:
      "Configured an automated CRM lead capture system with an instant 60-second WhatsApp qualification bot, automated brochure dispatch, and calendar booking.",
    timeline: "14-day setup & onboarding",
    results: [
      { metric: "< 60s", label: "Lead response time (down from 48 hours)" },
      { metric: "+65%", label: "Increase in scheduled site tour attendance" },
      { metric: "₦120M", label: "Closed off-plan property sales attributed" },
    ],
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
            04 — Verified Proof
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Featured client case studies.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed font-sans">
            Real problems. Scoped execution. Verifiable commercial results. Here is how we deliver measurable growth for Nigerian businesses.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="rounded-3xl border border-border bg-card/60 p-7 md:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pb-4 border-b border-border">
                  <span className="font-semibold text-accent">{study.category}</span>
                  <span>{study.location}</span>
                </div>

                <h3 className="mt-5 text-2xl font-bold text-foreground font-sans">
                  {study.title}
                </h3>

                <div className="mt-6 space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <span className="font-bold text-foreground block mb-1">Problem:</span>
                    {study.problem}
                  </div>
                  <div>
                    <span className="font-bold text-foreground block mb-1">Our Solution:</span>
                    {study.solution}
                  </div>
                  <div className="text-xs font-medium text-accent">
                    Timeline: {study.timeline}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wider block mb-4">
                  Measurable Results:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {study.results.map((r, i) => (
                    <div key={i} className="p-3 rounded-xl bg-background border border-border">
                      <div className="text-lg sm:text-xl font-bold text-accent font-sans">
                        {r.metric}
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-tight mt-1">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   05. WHO WE SERVE (PRIORITY INDUSTRIES)
   Addresses Feedback Item 5 & 8: Define the target audience clearly
   ========================================================================= */

const industries = [
  {
    icon: Building2,
    title: "Real Estate & Construction",
    description:
      "Off-plan developers, property brokers, and construction contractors needing qualified investor leads, 4K video walkthroughs, and inspection booking systems.",
    href: "/real-estate",
    action: "Compare Real Estate Packages",
  },
  {
    icon: ShoppingBag,
    title: "Retail & E-Commerce",
    description:
      "Brands and retailers needing high-converting web stores, integrated Nigerian payment gateways (Paystack), and multi-channel Meta/TikTok ad campaigns.",
    href: "/ecommerce",
    action: "Compare E-Commerce Packages",
  },
  {
    icon: Briefcase,
    title: "Professional Services & B2B",
    description:
      "Consultancies, law firms, accounting practices, and tech companies needing an authoritative corporate identity, Google search dominance, and proposal pipelines.",
    href: "/software-development",
    action: "Explore Tech & Web Systems",
  },
  {
    icon: Truck,
    title: "Logistics & Field Services",
    description:
      "Haulage operators, shortlet management companies, and installation services needing automated WhatsApp inquiry routing and local service discovery.",
    href: "/local-marketing",
    action: "Explore Local Operations",
  },
];

export function WhoWeServe() {
  return (
    <section className="py-24 md:py-32 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
            05 — Industry Focus
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Who we help succeed.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed font-sans">
            We don’t believe in one-size-fits-all templates. We build custom marketing systems and software tailored to the exact commercial realities of key Nigerian industries.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.title}
                className="rounded-2xl border border-border bg-background p-6 flex flex-col justify-between hover:border-foreground/40 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-accent mb-5">
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-sans">
                    {ind.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <Link
                    href={ind.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline group"
                  >
                    <span>{ind.action}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   06. CLEAR ENGAGEMENT PROCESS (HOW IT WORKS)
   Addresses Feedback Item 6 & 8: Replace "Talk, Build, Grow" with 5 milestones
   ========================================================================= */

const processSteps = [
  {
    step: "01",
    title: "Discovery & Revenue Audit",
    text: "We dissect your business model, customer acquisition bottlenecks, and technical requirements on an initial alignment call.",
  },
  {
    step: "02",
    title: "Scoped Proposal & Architecture",
    text: "You receive a transparent project proposal detailing fixed deliverables, technology stack, and exact sprint timelines. No hidden charges.",
  },
  {
    step: "03",
    title: "Sprint Execution & Staging",
    text: "Our direct in-house team designs, codes, and configures. You receive private staging links to inspect live progress at scheduled milestones.",
  },
  {
    step: "04",
    title: "Testing, Approval & Launch",
    text: "Rigorous cross-device testing, conversion pixel verification, and zero-downtime deployment. Full code and access credentials handed over.",
  },
  {
    step: "05",
    title: "Ongoing Optimization & Support",
    text: "We provide SLA-backed maintenance, security updates, ad campaign optimization, and bi-weekly performance reporting.",
  },
];

export function Process() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
            06 — Engagement Model
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            How engagement works.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed font-sans">
            A structured, predictable delivery process with clear milestones from discovery to launch. You always know what is happening next.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-5 gap-6">
          {processSteps.map((p) => (
            <div
              key={p.step}
              className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-sm font-bold text-accent font-mono block mb-3">
                  {p.step}
                </span>
                <h3 className="text-base font-bold text-foreground font-sans">
                  {p.title}
                </h3>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   07. TESTIMONIALS & OBJECTION FAQS
   Addresses Feedback Item 7 & 8: Real client voices + Objection handling
   ========================================================================= */

const testimonials = [
  {
    quote:
      "Sales Cowboy took us from zero online presence to ranking #1 on Google for flooring contractors in Lagos. In 90 days, we closed ₦18M in commercial flooring contracts directly from people searching online.",
    author: "Chima Unadike",
    role: "Managing Director",
    company: "Drenopav Floors (Lagos)",
  },
  {
    quote:
      "They rebuilt our solar landing page and ad funnel in a 7-day sprint. Our cost per acquisition dropped by 42% and we booked 85+ residential audits in the first two months.",
    author: "Fiyinfoluwa Adesina",
    role: "Head of Growth",
    company: "SunPower Clean Energy",
  },
  {
    quote:
      "Our sales reps were missing leads due to 48-hour follow-up delays. Sales Cowboy’s CRM automation responds to prospective buyers on WhatsApp within 60 seconds with property brochures.",
    author: "Tunde Bakare",
    role: "Operations Lead",
    company: "Lekki Prime Properties",
  },
];

const faqs = [
  {
    q: "How fast do you deliver websites or marketing campaigns?",
    a: "Standard websites and e-commerce stores are delivered in 7 days. Custom applications, internal systems, and multi-channel advertising funnels take 2 to 3 weeks or longer depending on technical scope.",
  },
  {
    q: "Do we own our website source code and advertising accounts?",
    a: "Yes, 100%. All source code, domain names, GitHub repositories, and ad accounts belong entirely to your business from day one. We never withhold access or create vendor lock-in.",
  },
  {
    q: "Who actually does the work—is it outsourced?",
    a: "All core software development, performance advertising, and automation workflows are handled directly by our in-house team. You work with a dedicated lead engineer and strategist.",
  },
  {
    q: "What happens if our website needs updates or fixes after launch?",
    a: "Every build includes post-launch warranty support. We also provide ongoing monthly maintenance plans covering daily backups, security updates, server monitoring, and technical adjustments.",
  },
  {
    q: "How do your payments work?",
    a: "We work with transparent milestone-based payments: typically a 50% commitment deposit to commence work, and the remaining 50% upon final client sign-off and public launch.",
  },
];

export function TestimonialsAndFAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Testimonials */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
            07 — Client Experiences & FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            What clients say. How we answer questions.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-background p-6 md:p-8 flex flex-col justify-between"
            >
              <p className="text-sm text-foreground/90 leading-relaxed font-sans italic">
                “{t.quote}”
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <div className="font-bold text-sm text-foreground font-sans">{t.author}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {t.role}, {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground font-sans">
              Frequently Asked Questions
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Clear answers to common questions about timelines, ownership, and our delivery process.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border border-border bg-background px-6"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   08. CONVERSION BAND
   Closing proposition with transparent expectations and WhatsApp alternative
   ========================================================================= */

export function CTABand() {
  return (
    <section className="px-4 pb-24 pt-10">
      <div className="container mx-auto rounded-[2.5rem] bg-foreground text-background px-8 py-16 md:px-16 md:py-20 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            08 — Next Steps
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-background leading-[1.15]">
            Ready to attract customers and operate smarter?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-background/80 leading-relaxed font-sans">
            Tell us about your business goals. We will analyze your requirements, prepare a transparent milestone proposal, and reply within 24 hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-white px-8 py-4 text-sm sm:text-base font-semibold transition-transform hover:scale-102"
            >
              Request a Proposal
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/2348082697841?text=Hello%20Sales%20Cowboy%2C%20I%20would%20like%20to%20discuss%20a%20project%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-background/30 text-background px-8 py-4 text-sm sm:text-base font-semibold hover:bg-background/10 transition-colors"
            >
              Direct WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
