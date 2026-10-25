"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Check,
  ArrowRight,
  Sparkles,
  Clock,
  MessageCircle,
  HelpCircle,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface PackageTier {
  name: string;
  badge?: string;
  price: string;
  renewalNote: string;
  tagline: string;
  featured?: boolean;
  deliverables: string[];
  whatsappMessage: string;
}

export interface ComparisonRow {
  feature: string;
  tier1: string | boolean;
  tier2: string | boolean;
}

export interface PricingComparisonProps {
  categoryBadge: string;
  title: string;
  description: string;
  tier1: PackageTier;
  tier2: PackageTier;
  comparisonRows: ComparisonRow[];
  faqs?: { q: string; a: string }[];
  defaultWhatsappMessage: string;
}

export default function PricingComparisonPage({
  categoryBadge,
  title,
  description,
  tier1,
  tier2,
  comparisonRows,
  faqs,
  defaultWhatsappMessage,
}: PricingComparisonProps) {
  const waUrl = (msg: string) =>
    `https://wa.me/2348082697841?text=${encodeURIComponent(msg)}`;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white">
      <Header />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Hero Header */}
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
            {categoryBadge}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            {title}
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Quick Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-muted-foreground font-medium">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" /> Delivered in 7 Days
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-accent" /> Zero Hidden Setup Fees
            </span>
          </div>
        </div>

        {/* Side-by-Side Pricing Cards */}
        <div className="container mx-auto px-4 max-w-5xl mt-14">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: ₦110,000 */}
            <div className="rounded-3xl border border-border bg-card/60 p-7 sm:p-9 flex flex-col justify-between shadow-xs hover:border-foreground/30 transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {tier1.badge || "Standard Package"}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-foreground tracking-tight">
                  {tier1.name}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {tier1.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
                    {tier1.price}
                  </span>
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    / One-time
                  </span>
                </div>

                <div className="mt-2 text-xs font-medium text-accent">
                  Renewal: {tier1.renewalNote}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                    What&apos;s Included:
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-foreground/90">
                    {tier1.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-snug">
                        <div className="w-4 h-4 rounded-md bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-accent" strokeWidth={3} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/80 space-y-3">
                <a
                  href={waUrl(tier1.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background py-4 px-6 text-sm font-semibold hover:bg-primary transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp ({tier1.price})
                </a>
                <a
                  href={`/#contact?service=${encodeURIComponent(tier1.name)}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Request formal quotation
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 2: ₦165,000 (Recommended / Dedicated) */}
            <div className="rounded-3xl border-2 border-accent bg-card p-7 sm:p-9 flex flex-col justify-between shadow-lg relative ring-1 ring-accent/30">
              <div className="absolute -top-3 left-8 bg-accent text-accent-foreground text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-xs">
                ★ {tier2.badge || "Most Popular & Recommended"}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    Dedicated Enterprise Tier
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-foreground tracking-tight">
                  {tier2.name}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {tier2.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
                    {tier2.price}
                  </span>
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    / One-time
                  </span>
                </div>

                <div className="mt-2 text-xs font-medium text-accent">
                  Renewal: {tier2.renewalNote}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                    Everything in Standard, plus:
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-foreground/90">
                    {tier2.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-snug">
                        <div className="w-4 h-4 rounded-md bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-accent" strokeWidth={3} />
                        </div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/80 space-y-3">
                <a
                  href={waUrl(tier2.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-white py-4 px-6 text-sm font-semibold hover:bg-accent/90 transition-transform hover:scale-101 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order Dedicated Pro ({tier2.price})
                </a>
                <a
                  href={`/#contact?service=${encodeURIComponent(tier2.name)}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-accent hover:underline transition-colors"
                >
                  Request formal quotation & invoice
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="container mx-auto px-4 max-w-5xl mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Detailed Feature-by-Feature Comparison
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Review every specification and deliverable side by side to pick the right package for your business.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="py-4 px-5 font-bold text-foreground">Features & Deliverables</th>
                    <th className="py-4 px-5 font-bold text-foreground w-1/4">
                      {tier1.name} ({tier1.price})
                    </th>
                    <th className="py-4 px-5 font-bold text-accent w-1/4">
                      {tier2.name} ({tier2.price})
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-background" : "bg-card/40"}
                    >
                      <td className="py-3.5 px-5 font-medium text-foreground">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-5 text-muted-foreground">
                        {typeof row.tier1 === "boolean" ? (
                          row.tier1 ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <span className="text-muted-foreground/50">—</span>
                          )
                        ) : (
                          row.tier1
                        )}
                      </td>
                      <td className="py-3.5 px-5 text-foreground font-semibold">
                        {typeof row.tier2 === "boolean" ? (
                          row.tier2 ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <span className="text-muted-foreground/50">—</span>
                          )
                        ) : (
                          row.tier2
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQs */}
        {faqs && faqs.length > 0 && (
          <div className="container mx-auto px-4 max-w-3xl mt-20">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                Frequently Asked Questions
              </h3>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-2xl border border-border bg-card px-5"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-4">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="container mx-auto px-4 max-w-4xl mt-20">
          <div className="rounded-3xl bg-foreground text-background p-8 md:p-12 text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-background">
              Need custom integrations or bespoke functionality?
            </h3>
            <p className="text-xs sm:text-sm text-background/80 max-w-xl mx-auto leading-relaxed">
              We also build multi-vendor marketplaces, API connectors, custom mobile apps, and enterprise portals. Talk directly with our lead engineer.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waUrl(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white text-xs sm:text-sm font-semibold hover:scale-102 transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp Now
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-background/30 text-background text-xs sm:text-sm font-semibold hover:bg-background/10 transition-colors"
              >
                Request Custom Quotation
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton message={defaultWhatsappMessage} />
    </div>
  );
}
