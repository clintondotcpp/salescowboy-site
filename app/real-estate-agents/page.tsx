import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Globe, PenTool, TrendingUp, BarChart3, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Real Estate Website & SEO Services | SalesCowboy Marketing Nigeria",
  description:
    "Custom realtor websites, blog content, and local SEO for Nigerian real estate agents. ₦300,000 package delivered in 3 days with blogs, Google Business Profile, and admin dashboard.",
};

const websiteDeliverables = [
  {
    icon: Globe,
    title: "Custom Realtor Website",
    description: "Modern design tailored to your brand with property listings, lead forms, and conversion-optimized layouts.",
  },
  {
    icon: PenTool,
    title: "Blog & Content Hub",
    description: "We set up your blog and deliver SEO-ready articles that rank for searches like “houses for sale in Lekki”.",
  },
  {
    icon: TrendingUp,
    title: "Local SEO Setup",
    description: "Google Business Profile, schema markup, and on-page optimization so you dominate local search results.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Email",
    description: "Professional email, analytics dashboard, and lead tracking so you know exactly what’s working.",
  },
];

const processSteps = [
  {
    title: "Day 1: Strategy Call",
    description: "We review your brand, service areas, and target keywords, then lock in design direction and copy."
  },
  {
    title: "Day 2: Build & Content",
    description: "Our design + dev team builds your site while the content team writes blog posts targeting high-intent Nigerian searches."
  },
  {
    title: "Day 3: Launch & SEO",
    description: "We launch, connect Google Business Profile, configure analytics, and submit sitemaps so you start ranking."
  }
];

const testimonials = [
  {
    quote: "SalesCowboy took my site from invisible to the first page. I closed two Lekki listings in the first month after launch.",
    name: "Chidinma Okoro",
    role: "Realtor, Lagos",
  },
  {
    quote: "You handled our website and SEO and it’s been a game changer. We’re ranking for flooring keywords in Lagos and getting steady client calls now. Highly recommend them, they actually deliver results. Thank you 🙏",
    name: "Chima Unadike",
    role: "Founder, Drenopav Floors",
    url: "https://drenopavfloors.ng/",
  },
];

const stats = [
  { value: "200+", label: "Nigerian real estate websites delivered" },
  { value: "3 Days", label: "Average turnaround time" },
  { value: "₦300K", label: "All-inclusive launch package" },
];

const RealEstateAgentsPage = () => {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">Real Estate Growth</span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold" style={{ fontFamily: "Rye, serif" }}>
              Your Real Estate Website Should Bring Clients, Not Just Look Pretty
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              When Nigerians search for “houses for sale in Lekki” or “shortlet in Abuja,” your website should appear. Our team builds high-converting realtor websites, writes SEO blog posts, and manages your local presence so Google sends you real leads.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/#contact">Book Your Free Strategy Call</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+2348024045815">Talk to a Specialist</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Custom realtor website package: <span className="font-semibold">₦300,000</span> — delivered in 3 days with blog, admin dashboard, professional email, and Google Business Profile.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-4xl font-bold" style={{ fontFamily: "Rye, serif" }}>{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Rye, serif" }}>Everything Your Real Estate Website Needs to Rank & Convert</h2>
            <p className="mt-4 text-muted-foreground">From the first impression to ongoing SEO, we set up every system you need to capture buyers and renters in Nigeria.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {websiteDeliverables.map((item) => (
              <Card key={item.title} className="bg-card/70 border-border hover-lift hover-glow transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-10 w-10 text-primary" />
                    <CardTitle className="text-foreground">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-y border-border" id="pricing">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Rye, serif" }}>Launch in 3 Days – ₦300,000</h2>
              <p className="mt-4 text-muted-foreground text-lg">We’ve built over 200 real estate websites across Lagos, Abuja, Port Harcourt, Enugu, and beyond. Our launch package gives you everything you need to start ranking and capturing leads immediately.</p>
              <ul className="mt-6 space-y-3 text-muted-foreground">
                {[
                  "Custom responsive design aligned with your brand",
                  "Property listing templates and lead capture forms",
                  "SEO-optimized copy for service areas and property types",
                  "Three blog posts targeting high-intent Nigerian keywords",
                  "Google Business Profile setup and optimization",
                  "Professional email, CRM-ready lead notifications, and analytics dashboard",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/#contact">Reserve Your Slot</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:hello@salescowboy.com.ng">Request Portfolio</a>
                </Button>
              </div>
            </div>
            <div className="bg-background border border-border rounded-xl p-6 space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2"><Users className="h-6 w-6 text-primary" /> Why Real Estate Agents Choose SalesCowboy</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Team in Nigeria that understands local neighborhoods and buyer behaviour.</li>
                <li>• Dedicated content writers producing city-specific blog posts that rank.</li>
                <li>• SEO engineers monitoring new Google searches for properties and shortlets.</li>
                <li>• Fast communication: updates and new listings added within 24 hours.</li>
              </ul>
              <div className="rounded-lg bg-primary/10 p-5 border border-primary/20">
                <h4 className="text-lg font-semibold mb-2" style={{ fontFamily: "Rye, serif" }}>Running ads right now?</h4>
                <p className="text-muted-foreground text-sm">We’ll align your landing pages and blogs with your campaigns so every click has a conversion path.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" id="process">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Rye, serif" }}>Launch Blueprint: 3-Day Real Estate Website Sprint</h2>
            <p className="mt-4 text-muted-foreground">No long delays. You’ll review designs, content, and final launch inside three working days.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <Card key={step.title} className="bg-card/70 border-border">
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border" id="case-studies">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Rye, serif" }}>What Nigerian Agents Are Saying</h2>
            <p className="mt-4 text-muted-foreground">A few words from the 200+ realtors and shortlet operators we’ve supported.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-background border-border">
                <CardContent className="p-6 space-y-4">
                  <p className="text-lg text-muted-foreground italic">“{testimonial.quote}”</p>
                  <div>
                    {testimonial.url ? (
                      <a
                        href={testimonial.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-primary hover:underline"
                      >
                        {testimonial.name}
                      </a>
                    ) : (
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                    )}
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" id="lead-capture">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-card border border-border rounded-xl p-10">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Rye, serif" }}>Let’s Make Your Website Work for You</h2>
            <p className="mt-4 text-muted-foreground">
              Fill the contact form below or reach out directly. We’ll review your current website (or lack of one), share our portfolio, and deliver a custom plan for your location and property niche.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/#contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:hello@salescowboy.com.ng" className="inline-flex items-center gap-2">
                  <Mail className="h-5 w-5" /> hello@salescowboy.com.ng
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a href="https://wa.me/2348024045815" target="_blank" rel="noreferrer" className="text-primary">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RealEstateAgentsPage;
