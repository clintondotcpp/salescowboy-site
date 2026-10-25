"use client";

import { useState } from "react";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BundleTier {
  tierName: "Starter" | "Growth" | "Enterprise";
  price: string;
  cadence: "one-time" | "per month" | "per campaign" | "per shoot";
  badge?: string;
  tagline: string;
  deliverables: string[];
  popular?: boolean;
}

interface ServicePricingGroup {
  id: string;
  serviceTitle: string;
  category: "Tech & Dev" | "Marketing & Ads" | "Legal & Ops" | "Creative & Media";
  description: string;
  tiers: BundleTier[];
}

const pricingData: ServicePricingGroup[] = [
  {
    id: "software-dev",
    serviceTitle: "Web & Software Development",
    category: "Tech & Dev",
    description: "High-performance software engineering tailored to your business model.",
    tiers: [
      {
        tierName: "Starter",
        price: "₦250,000",
        cadence: "one-time",
        tagline: "High-speed business website or MVP landing page.",
        deliverables: [
          "5-8 custom responsive pages (Next.js)",
          "Lead capture & WhatsApp routing",
          "On-page SEO & Google indexing setup",
          "Speed score 95+ on Google Lighthouse",
          "2 weeks turnaround",
        ],
      },
      {
        tierName: "Growth",
        price: "₦750,000",
        cadence: "one-time",
        popular: true,
        badge: "Most Popular",
        tagline: "Full-stack web application with user auth, database & payments.",
        deliverables: [
          "Custom React/Next.js dynamic web app",
          "User authentication & profile permissions",
          "Paystack / Flutterwave automated billing",
          "Cloudflare D1 SQL relational database",
          "Admin management backoffice",
          "4-6 weeks turnaround with staging reviews",
        ],
      },
      {
        tierName: "Enterprise",
        price: "₦2,200,000+",
        cadence: "one-time",
        tagline: "End-to-end bespoke software platform or mobile app architecture.",
        deliverables: [
          "Multi-tenant SaaS architecture or mobile app",
          "High-throughput API microservices",
          "Cloudflare R2 object storage & edge caching",
          "Custom algorithmic or AI pipeline modules",
          "Dedicated software lead & 6 months SLA warranty",
        ],
      },
    ],
  },
  {
    id: "advertising-paid",
    serviceTitle: "Advertising & Paid / Social Growth",
    category: "Marketing & Ads",
    description: "Aggressive paid customer acquisition across Meta, Google, YouTube, and TikTok with strict ROAS focus.",
    tiers: [
      {
        tierName: "Starter",
        price: "₦80,000",
        cadence: "per month",
        tagline: "Single-channel customer acquisition (Meta or Google Ads).",
        deliverables: [
          "1 core ad platform (Meta or Google)",
          "Pixel & Conversions API (CAPI) setup",
          "2-4 ad creative iterations per month",
          "Bi-weekly performance & ROAS audit",
          "Direct WhatsApp chat support",
        ],
      },
      {
        tierName: "Growth",
        price: "₦180,000",
        cadence: "per month",
        popular: true,
        badge: "Recommended",
        tagline: "Multi-channel funnel (Meta + Google Ads + Retargeting).",
        deliverables: [
          "Meta (FB/IG) + Google Search ads",
          "Dynamic retargeting & lookalike audience scaling",
          "8-12 custom ad creatives & copy variations",
          "Weekly deep-dive analytics & budget adjustments",
          "Dedicated media buyer assigned to your account",
        ],
      },
      {
        tierName: "Enterprise",
        price: "₦350,000",
        cadence: "per month",
        tagline: "Omnichannel market dominance across Meta, Google, TikTok & YouTube.",
        deliverables: [
          "Full omnichannel coverage (Meta, Google, TikTok, YouTube)",
          "High-velocity creative testing (20+ variations/mo)",
          "Custom landing page conversion rate optimization (CRO)",
          "Daily bid optimizations & real-time ROAS dashboard",
          "Guaranteed customer acquisition targets",
        ],
      },
    ],
  },
  {
    id: "influencer-umbrella",
    serviceTitle: "Influencer Marketing (<100k Umbrella)",
    category: "Marketing & Ads",
    description: "Curated micro-influencers managed directly under our umbrella for authentic brand trust and sales.",
    tiers: [
      {
        tierName: "Starter",
        price: "₦120,000",
        cadence: "per campaign",
        tagline: "3 curated niche micro-influencers (<100k) to test market response.",
        deliverables: [
          "3 vetted micro-creators matched to your audience",
          "1x Reel/TikTok + 2x Stories per creator",
          "Script guidance & product unboxing briefs",
          "Trackable affiliate promo codes & link tracking",
          "Campaign impression & engagement report",
        ],
      },
      {
        tierName: "Growth",
        price: "₦300,000",
        cadence: "per campaign",
        popular: true,
        badge: "Highest Engagement",
        tagline: "8 to 10 creators in a coordinated 48-hour social feed blitz.",
        deliverables: [
          "8 to 10 handpicked creators under our umbrella",
          "Coordinated launch wave for maximum market buzz",
          "Full creator contract management & asset rights",
          "Direct comment pinning & WhatsApp bio links",
          "Post-campaign customer acquisition report",
        ],
      },
      {
        tierName: "Enterprise",
        price: "₦750,000+",
        cadence: "per campaign",
        tagline: "20+ creators executing a full-scale market wave & brand takeover.",
        deliverables: [
          "20+ micro-creators across Instagram, TikTok & X",
          "Multi-week drip campaigns with trending audio hooks",
          "Whitelisting rights to run paid ads through creator handles",
          "PR & press amplification cross-pollination",
          "Live campaign tracking dashboard",
        ],
      },
    ],
  },
  {
    id: "cac-compliance",
    serviceTitle: "CAC Registration, Tax Filing & Compliance",
    category: "Legal & Ops",
    description: "Full corporate legality, incorporation, tax filing, and annual returns managed by compliance specialists.",
    tiers: [
      {
        tierName: "Starter",
        price: "₦45,000",
        cadence: "one-time",
        tagline: "Official CAC Business Name Registration.",
        deliverables: [
          "Name availability search & reservation",
          "Official CAC Certificate of Registration",
          "Status report & business documentation",
          "Turnaround within 5-7 business days",
        ],
      },
      {
        tierName: "Growth",
        price: "₦95,000",
        cadence: "one-time",
        popular: true,
        badge: "Best for Startups",
        tagline: "Private Limited Liability Company (LTD) Incorporation.",
        deliverables: [
          "Full CAC Limited Liability (LTD) company registration",
          "FIRS Tax Identification Number (TIN) issuance",
          "Articles & Memorandum of Association",
          "Corporate bank account opening support",
        ],
      },
      {
        tierName: "Enterprise",
        price: "₦190,000",
        cadence: "one-time",
        tagline: "Complete Legal & Corporate Tax Compliance Suite.",
        deliverables: [
          "Full Company Incorporation (LTD) + TIN",
          "1 Year Annual Returns filing included",
          "Tax Clearance Certificate (TCC) application",
          "SCUML compliance filing guidance",
          "Dedicated corporate compliance secretary for 12 months",
        ],
      },
    ],
  },
  {
    id: "social-media-content",
    serviceTitle: "Social Media Management & Content Creation",
    category: "Creative & Media",
    description: "High-impact storytelling, graphic design, commercial video reels, and active daily community management.",
    tiers: [
      {
        tierName: "Starter",
        price: "₦90,000",
        cadence: "per month",
        tagline: "Essential social presence for consistent credibility.",
        deliverables: [
          "12 branded static & carousel posts per month",
          "Monthly content strategy & calendar approval",
          "Caption copywriting & targeted hashtag research",
          "Basic comment and direct message monitoring",
        ],
      },
      {
        tierName: "Growth",
        price: "₦180,000",
        cadence: "per month",
        popular: true,
        badge: "High Growth",
        tagline: "Active social engine with 24 posts + 8 short-form viral reels.",
        deliverables: [
          "24 designer posts + 8 professionally edited Reels/TikToks",
          "Active daily community engagement & DM nurture",
          "Story highlights & weekly interactive polls/stickers",
          "Monthly follower acquisition & conversion analytics",
          "Dedicated social media manager",
        ],
      },
      {
        tierName: "Enterprise",
        price: "₦350,000",
        cadence: "per month",
        tagline: "Full studio creative takeover, daily posting & influencer co-creation.",
        deliverables: [
          "Daily posting (30+ posts) + 16 video reels & TikToks",
          "On-site studio or location content shoot (Lagos/Abuja)",
          "Rapid-response DM customer nurture into WhatsApp sales",
          "Co-creation with our micro-influencer umbrella",
          "Bi-weekly strategy call with our Creative Director",
        ],
      },
    ],
  },
  {
    id: "crm-ai-automation",
    serviceTitle: "CRM, Martech & AI Automation",
    category: "Tech & Dev",
    description: "Automate sales pipelines, customer intake, WhatsApp messaging, and deploy custom AI agents.",
    tiers: [
      {
        tierName: "Starter",
        price: "₦150,000",
        cadence: "one-time",
        tagline: "CRM deployment (HubSpot or Zoho) & basic lead capture routing.",
        deliverables: [
          "CRM platform setup & sales pipeline configuration",
          "Website lead form integration to CRM",
          "Automated instant email & WhatsApp welcome notifications",
          "Staff training & onboarding video guide",
        ],
      },
      {
        tierName: "Growth",
        price: "₦350,000",
        cadence: "one-time",
        popular: true,
        badge: "High Automation",
        tagline: "Intelligent WhatsApp automation bot + multi-stage drip workflows.",
        deliverables: [
          "WhatsApp Business API automation & menu bot",
          "Multi-stage automated lead nurture sequence",
          "Automated lead qualification scoring",
          "Stale deal alerts & automated staff task assignments",
          "Webhook integration with your accounting or internal tools",
        ],
      },
      {
        tierName: "Enterprise",
        price: "₦750,000+",
        cadence: "one-time",
        tagline: "Custom AI agent trained on your business documents & knowledge base.",
        deliverables: [
          "Custom LLM AI agent capable of answering complex customer inquiries",
          "Full CRM + ERP two-way database synchronization",
          "Automated document processing & contract drafting",
          "Custom dashboard for AI conversation analytics",
          "Dedicated AI systems engineer & monthly fine-tuning",
        ],
      },
    ],
  },
  {
    id: "branding-corporate",
    serviceTitle: "Corporate Branding & Visual Identity",
    category: "Creative & Media",
    description: "Craft a commanding visual identity that separates you from cheap competitors and justifies premium rates.",
    tiers: [
      {
        tierName: "Starter",
        price: "₦80,000",
        cadence: "one-time",
        tagline: "Core brand identity for new companies.",
        deliverables: [
          "Primary & secondary logo marks (vector formats)",
          "Brand color palette & typography hierarchy guidelines",
          "Business card & email signature design",
          "Social media profile kit (avatar & cover headers)",
        ],
      },
      {
        tierName: "Growth",
        price: "₦180,000",
        cadence: "one-time",
        popular: true,
        badge: "Complete Identity",
        tagline: "Full commercial brand system & investor pitch deck.",
        deliverables: [
          "Complete logo system with sub-marks & iconography",
          "Investor pitch deck / Company profile template (12-16 slides)",
          "Corporate letterhead, invoice template & envelopes",
          "Merchandise & packaging mockup guidelines",
          "Comprehensive 30-page Brand Identity Guidelines PDF",
        ],
      },
      {
        tierName: "Enterprise",
        price: "₦380,000",
        cadence: "one-time",
        tagline: "Executive corporate identity overhaul & trademark assistance.",
        deliverables: [
          "Complete corporate rebrand & architectural design kit",
          "3D brand assets, custom typography pairing & vector suite",
          "Executive pitch presentation with interactive motion graphics",
          "Full stationery, physical collateral & signage specs",
          "Trademark application guidance & complete asset copyright handover",
        ],
      },
    ],
  },
  {
    id: "seo-maintenance",
    serviceTitle: "SEO & Website Maintenance",
    category: "Tech & Dev",
    description: "Continuous 24/7 technical website care, security patching, and Google search ranking conquest.",
    tiers: [
      {
        tierName: "Starter",
        price: "₦65,000",
        cadence: "per month",
        tagline: "Essential security, uptime monitoring & on-page SEO health.",
        deliverables: [
          "24/7 uptime monitoring & instant downtime alerts",
          "Weekly core & plugin updates with pre-backup",
          "Monthly technical on-page SEO health audit",
          "Google Search Console & sitemap submission check",
        ],
      },
      {
        tierName: "Growth",
        price: "₦140,000",
        cadence: "per month",
        popular: true,
        badge: "Rank Domination",
        tagline: "Active webmaster support + Google Business Profile local 3-pack SEO.",
        deliverables: [
          "Dedicated webmaster for on-demand content/banner updates",
          "Google Business Profile optimization (Lagos/Abuja local rankings)",
          "Targeted commercial keyword optimization (10 primary keywords)",
          "Page speed & Core Web Vitals optimization",
          "Monthly organic keyword ranking progress report",
        ],
      },
      {
        tierName: "Enterprise",
        price: "₦280,000",
        cadence: "per month",
        tagline: "National SEO conquest & 24/7 priority emergency SLA.",
        deliverables: [
          "Aggressive authoritative backlink building & digital PR",
          "Content cluster architecture (4 authoritative SEO articles/mo)",
          "National keyword ranking target across all major Nigerian cities",
          "1-hour SLA emergency emergency code fix response",
          "Bi-weekly SEO & traffic consultation with lead strategist",
        ],
      },
    ],
  },
  {
    id: "video-realestate-local",
    serviceTitle: "Video Production, Real Estate Marketing & Billboards",
    category: "Creative & Media",
    description: "4K commercial video production, cinematic drone tours, and high-impact out-of-home (OOH) billboards.",
    tiers: [
      {
        tierName: "Starter",
        price: "₦120,000",
        cadence: "per shoot",
        tagline: "4K video reel & high-res product/property spotlight.",
        deliverables: [
          "1x 60-second 4K video reel with cinematic color grading",
          "10 high-resolution edited photos",
          "Professional audio recording & licensed commercial music",
          "Turnaround within 7 days",
        ],
      },
      {
        tierName: "Growth",
        price: "₦280,000",
        cadence: "per shoot",
        popular: true,
        badge: "Cinematic Grade",
        tagline: "Drone aerials, interior/exterior walkthrough + 3 social cutdowns.",
        deliverables: [
          "Cinematic drone aerial videography (licensed pilot)",
          "Full property / business interior & exterior walkthrough",
          "Founder / realtor spotlight on-camera interview",
          "3 distinct social cutdowns optimized for Meta & TikTok ads",
          "Raw 4K b-roll archive provided on Google Drive",
        ],
      },
      {
        tierName: "Enterprise",
        price: "₦650,000+",
        cadence: "per campaign",
        tagline: "Multi-property launch film + OOH billboard campaign coordination.",
        deliverables: [
          "TV-commercial grade 4K production crew & cinema cameras",
          "Multi-location shoot across Lagos or Abuja",
          "Strategic billboard design & prime location procurement",
          "Paid video ad distribution campaign setup (Meta & YouTube)",
          "Complete broadcast-ready master files with full commercial buyout",
        ],
      },
    ],
  },
  {
    id: "market-research",
    serviceTitle: "Market Research & Feasibility",
    category: "Legal & Ops",
    description: "Competitor intelligence, consumer pricing sensitivity studies, and Nigerian market feasibility audits.",
    tiers: [
      {
        tierName: "Starter",
        price: "₦100,000",
        cadence: "one-time",
        tagline: "Competitor benchmarking & local pricing report.",
        deliverables: [
          "Detailed audit of top 5 direct competitors in Nigeria",
          "Pricing & packaging matrix comparison",
          "Key differentiation opportunities report",
          "Executive summary slide deck",
        ],
      },
      {
        tierName: "Growth",
        price: "₦280,000",
        cadence: "one-time",
        popular: true,
        badge: "Strategic Intel",
        tagline: "In-depth consumer sentiment & target audience study.",
        deliverables: [
          "Survey of 100+ target consumers in Lagos/Abuja",
          "Customer buying objections & willingness-to-pay analysis",
          "Channel effectiveness breakdown (where your buyers actually look)",
          "Go-to-market tactical action plan",
        ],
      },
      {
        tierName: "Enterprise",
        price: "₦650,000+",
        cadence: "one-time",
        tagline: "Full nationwide market feasibility study & expansion roadmap.",
        deliverables: [
          "Comprehensive quantitative & qualitative research across 3+ states",
          "Regulatory & distribution channel barrier analysis",
          "Financial projection model & risk mitigation playbook",
          "In-person presentation to your executive board",
        ],
      },
    ],
  },
];

const categories = [
  "All Services",
  "Tech & Dev",
  "Marketing & Ads",
  "Legal & Ops",
  "Creative & Media",
] as const;

const BundlePricing = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Services");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = pricingData.filter((group) => {
    const matchesCategory =
      selectedCategory === "All Services" || group.category === selectedCategory;
    const matchesSearch =
      group.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="pricing" className="py-28 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-xl mx-auto text-center mb-8 space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Tiered Bundle Pricing
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Clear, transparent pricing tiers for every budget.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-secondary/80 rounded-xl border border-border w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-card text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search services (e.g. software, ads, cac)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl text-xs bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Pricing Groups */}
        <div className="max-w-6xl mx-auto space-y-12">
          {filteredData.map((group) => (
            <div
              key={group.id}
              className="bg-card border border-border rounded-xl p-6 md:p-7 shadow-sm transition-all hover:border-accent/50"
            >
              {/* Group Title */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 mb-5 border-b border-border">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">
                    {group.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mt-1">
                    {group.serviceTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-2xl">
                    {group.description}
                  </p>
                </div>
              </div>

              {/* 3 Tiers Grid */}
              <div className="grid md:grid-cols-3 gap-5 items-stretch">
                {group.tiers.map((tier, tIdx) => {
                  const whatsappMessage = encodeURIComponent(
                    `Hello Sales Cowboy, I would like to order or inquire about the ${tier.tierName} bundle for ${group.serviceTitle} (${tier.price} / ${tier.cadence}).`
                  );
                  return (
                    <div
                      key={tIdx}
                      className={`rounded-xl border p-5 flex flex-col justify-between transition-all duration-300 ${
                        tier.popular
                          ? "bg-secondary/40 border-primary ring-1 ring-primary/30 relative shadow-sm"
                          : "bg-background border-border"
                      }`}
                    >
                      {tier.badge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-md uppercase tracking-wider shadow">
                          {tier.badge}
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {tier.tierName} Tier
                          </span>
                        </div>

                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-extrabold text-foreground">{tier.price}</span>
                          <span className="text-xs text-muted-foreground">/ {tier.cadence}</span>
                        </div>

                        <p className="text-xs text-muted-foreground leading-normal">
                          {tier.tagline}
                        </p>

                        <div className="pt-3 border-t border-border space-y-2">
                          <div className="text-[10px] font-bold text-foreground uppercase tracking-wider">
                            What&apos;s Included:
                          </div>
                          <ul className="space-y-1.5">
                            {tier.deliverables.map((item, dIdx) => (
                              <li key={dIdx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-5 space-y-2">
                        <Button
                          asChild
                          size="sm"
                          className={`w-full font-semibold text-xs py-4 ${
                            tier.popular
                              ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow"
                              : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                          }`}
                        >
                          <a href={`#contact?service=${encodeURIComponent(group.serviceTitle)}&tier=${encodeURIComponent(tier.tierName)}`}>
                            Choose {tier.tierName} Bundle
                          </a>
                        </Button>

                        <a
                          href={`https://wa.me/2348082697841?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-green-600 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                          Order via WhatsApp
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-16 text-muted-foreground text-xl">
              No service bundles matching &quot;{searchQuery}&quot;. Clear your search or contact us for a custom scope.
            </div>
          )}
        </div>

        {/* Custom Bundling Banner */}
        <div className="mt-14 bg-secondary/70 border border-border rounded-xl p-6 sm:p-8 max-w-3xl mx-auto text-center space-y-3">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Need a Custom Multi-Service Retainer?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Combine software development, monthly ads, and micro-influencer campaigns into one discounted contract.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs px-5 py-2.5">
              <a href="#contact">Request Custom Proposal</a>
            </Button>
            <Button asChild size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold text-xs px-5 py-2.5">
              <a href="/proposal">Open Proposal Builder</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundlePricing;
