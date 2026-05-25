import { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Zap, Shield, Rocket, BarChart3, Code2, Lock, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";

export const metadata: Metadata = {
  title: "Custom Web App Development ₦500,000 | Enterprise Solutions | Sales Cowboy Marketing Nigeria",
  description:
    "Build your custom web app for just ₦500,000. Property listing, logistics, VTU, POS, hotel management, school portals, church systems & more. Full enterprise architecture by Sales Cowboy Marketing.",
  keywords: "custom web app Nigeria, property listing platform, logistics tracking system, VTU gateway, POS system Nigeria, hotel management software, school portal, church management system",
};

const webApps = [
  {
    icon: Rocket,
    title: "Property Listing Platforms",
    description: "Modern real estate marketplace with advanced search, filtering, and lead management. Perfect for portals showcasing hundreds of properties.",
    features: [
      "Advanced property search & filters",
      "High-quality image galleries",
      "Lead capture & management",
      "Agent dashboards",
      "Virtual tours integration",
      "Payment integration",
    ],
    use_case: "Real estate agents, property developers, housing portals",
  },
  {
    icon: Cpu,
    title: "Logistics & Courier Trackers",
    description: "Real-time tracking system for deliveries, shipments, and courier operations. Monitor your entire fleet and shipments in real-time.",
    features: [
      "Real-time GPS tracking",
      "Route optimization",
      "Delivery notifications",
      "Customer-facing tracking links",
      "Driver app integration",
      "Analytics dashboard",
    ],
    use_case: "Courier companies, logistics firms, delivery services",
  },
  {
    icon: Zap,
    title: "High-Volume VTU Gateways",
    description: "Secure airtime & data distribution platform supporting millions of transactions. Handle airtime, data, bills, and utility payments seamlessly.",
    features: [
      "Multiple operator support",
      "High-speed transaction processing",
      "Real-time balance updates",
      "Automated settlements",
      "Commission management",
      "Fraud detection system",
    ],
    use_case: "VTU resellers, telecom distributors, fintech platforms",
  },
  {
    icon: BarChart3,
    title: "Multi-Branch Inventory & Retail POS",
    description: "Enterprise-grade POS system for multi-store operations. Manage inventory, sales, and staff across unlimited branches.",
    features: [
      "Multi-branch management",
      "Real-time inventory sync",
      "Sales reporting & analytics",
      "Staff management",
      "Customer database",
      "Offline functionality",
    ],
    use_case: "Retail chains, supermarkets, quick-service restaurants",
  },
  {
    icon: Code2,
    title: "Shortlet & Hotel Management Systems",
    description: "Complete hospitality platform for managing bookings, guests, and operations. From availability to checkout automation.",
    features: [
      "Online booking system",
      "Channel manager integration",
      "Guest management",
      "Automated invoicing",
      "Staff task management",
      "Rating & review system",
    ],
    use_case: "Hotels, shortlet businesses, vacation rental platforms",
  },
  {
    icon: CheckCircle2,
    title: "School Portals & Fee Installment Ledgers",
    description: "Education management system with student portals, fee tracking, and installment payment plans for parents.",
    features: [
      "Student management",
      "Automated report cards",
      "Fee tracking & installments",
      "Parent communication",
      "Attendance management",
      "Grade recording",
    ],
    use_case: "Private schools, education boards, online learning platforms",
  },
  {
    icon: Shield,
    title: "Church Management Engines",
    description: "Comprehensive church management platform for members, giving, events, and communications.",
    features: [
      "Member database",
      "Giving & donation tracking",
      "Event management",
      "Online tithing integration",
      "Service scheduling",
      "Member communication",
    ],
    use_case: "Churches, religious organizations, faith communities",
  },
  {
    icon: Lock,
    title: "Micro-Loan & Savings Platforms",
    description: "Secure financial management system for loan disbursement, savings tracking, and repayment management.",
    features: [
      "Loan application workflows",
      "Automated repayments",
      "Savings tracking",
      "Risk assessment tools",
      "Financial reports",
      "Compliance features",
    ],
    use_case: "Microfinance institutions, cooperative societies, savings groups",
  },
];

const whyChooseUs = [
  { title: "Enterprise Architecture", description: "Built for scale, security, and performance from day one." },
  { title: "Custom Development", description: "No templates. Your platform is built exactly for your business." },
  { title: "Fast Delivery", description: "Quick development cycles with regular progress updates." },
  { title: "Security First", description: "Enterprise-grade security, data encryption, and compliance." },
  { title: "Post-Launch Support", description: "Technical support and maintenance after launch." },
  { title: "Future-Proof", description: "Scalable architecture ready for growth and new features." },
];

const process = [
  { step: "1", title: "Discovery & Planning", description: "We understand your requirements, workflows, and goals." },
  { step: "2", title: "System Design", description: "Architecture design, database schema, and technical specifications." },
  { step: "3", title: "Development", description: "Build with regular demos and your feedback." },
  { step: "4", title: "Testing & Deployment", description: "QA testing, security audits, and live deployment." },
  { step: "5", title: "Launch & Training", description: "Go-live support and team training." },
];

const features = [
  { icon: Rocket, label: "High Performance" },
  { icon: Shield, label: "Enterprise Security" },
  { icon: Zap, label: "Lightning Fast" },
  { icon: BarChart3, label: "Analytics Ready" },
  { icon: Cpu, label: "Scalable" },
  { icon: CheckCircle2, label: "24/7 Support" },
];

export default function WebAppPromoPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-accent">
              <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold">Custom Enterprise Web Apps</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold" style={{ fontFamily: "Rye, serif" }}>
              Bring Your Idea to Life for Just ₦500,000
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade custom web applications built specifically for your business. No templates. No limitations. Full control.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <TrackedWhatsAppLink
                  href="https://wa.me/2348104933232?text=Hi!%20I'm%20interested%20in%20a%20custom%20web%20app%20for%20₦500,000.%20Can%20we%20discuss%20my%20project%3F"
                  eventName="Lead"
                >
                  Start Your Project on WhatsApp
                </TrackedWhatsAppLink>
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg">
                View Our Process
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              Full custom development • Enterprise architecture • Complete support • No hidden fees
            </p>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-card border-y border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="flex flex-col items-center gap-2 text-center">
                  <Icon className="w-6 h-6 text-primary" />
                  <p className="text-xs md:text-sm font-semibold text-foreground">{feature.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Web App Solutions */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Rye, serif" }}>
              Web Apps We Build
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose from proven platforms or describe your custom requirements. We build exactly what your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {webApps.map((app, index) => {
              const Icon = app.icon;
              return (
                <Card key={index} className="bg-card border-border hover-lift hover-glow transition-all">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <CardTitle className="text-xl">{app.title}</CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{app.description}</p>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Key Features:</p>
                      <ul className="grid grid-cols-2 gap-2">
                        {app.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        <strong>Ideal for:</strong> {app.use_case}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <TrackedWhatsAppLink
                href="https://wa.me/2348104933232?text=I%20want%20a%20custom%20web%20app.%20Let's%20discuss%20options."
                eventName="Lead"
              >
                Discuss Your Custom App
              </TrackedWhatsAppLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Rye, serif" }}>
              Our Development Process
            </h2>
            <p className="text-xl text-muted-foreground">
              From your idea to a fully functional enterprise platform. Here's how we work.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4 md:gap-2">
              {process.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-center font-bold mb-2">{item.title}</h3>
                  <p className="text-xs text-center text-muted-foreground">{item.description}</p>

                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute w-8 h-0.5 bg-primary/30 mt-20 ml-12" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Typical timeline: 8-12 weeks depending on complexity. Regular updates and demos throughout the process.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Rye, serif" }}>
              Why Sales Cowboy Marketing?
            </h2>
            <p className="text-xl text-muted-foreground">
              We don't just build apps. We build business solutions that drive real value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyChooseUs.map((reason, index) => (
              <Card key={index} className="bg-card border-border hover-lift">
                <CardContent className="p-6 space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <h3 className="text-lg font-bold">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Rye, serif" }}>
                Fixed Price. Full Solution.
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Enterprise-grade custom web applications for a transparent, fixed price.
              </p>
            </div>

            <div className="bg-background border-2 border-primary rounded-lg p-8 md:p-12 space-y-6">
              <div>
                <p className="text-muted-foreground text-lg mb-2">Complete Custom Web App</p>
                <div className="text-5xl md:text-7xl font-bold mb-2">₦500,000</div>
                <p className="text-muted-foreground">Full development, deployment & initial support</p>
              </div>

              <div className="space-y-3 border-t border-border pt-6">
                <p className="font-bold text-foreground">Includes:</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    Custom development for your exact requirements
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    Enterprise-grade architecture & security
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    Database design & optimization
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    Admin dashboard & analytics
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    API integrations (payment, SMS, etc.)
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    Testing, QA & security audit
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    Deployment & 30 days support
                  </li>
                </ul>
              </div>

              <Button size="lg" className="bg-primary hover:bg-primary/90 w-full text-lg py-6" asChild>
                <TrackedWhatsAppLink
                  href="https://wa.me/2348104933232?text=I'm%20ready%20to%20build.%20Let's%20start%20with%20₦500,000%20package."
                  eventName="Lead"
                >
                  Get Started Now
                </TrackedWhatsAppLink>
              </Button>
            </div>

            <p className="text-muted-foreground text-sm">
              Need more features or integrations? We can customize the scope. Contact us for a custom quote.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ fontFamily: "Rye, serif" }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "What's included in the ₦500,000 package?",
                answer:
                  "Full custom development, enterprise architecture, database design, admin dashboard, API integrations, testing, and 30 days of post-launch support.",
              },
              {
                question: "How long does development take?",
                answer: "Typically 8-12 weeks depending on complexity. We provide regular demos and updates every 2 weeks.",
              },
              {
                question: "Can I get additional features?",
                answer:
                  "Yes. We can add features or integrations for additional cost. We'll provide a custom quote after understanding your full requirements.",
              },
              {
                question: "What about support after launch?",
                answer:
                  "The package includes 30 days of post-launch support. We offer maintenance plans for ongoing updates and support.",
              },
              {
                question: "Is the platform scalable?",
                answer:
                  "Yes. All our applications are built with enterprise architecture designed to scale as your business grows.",
              },
              {
                question: "What if I need changes during development?",
                answer:
                  "We welcome feedback and iteration. We have regular demo sessions where you can request changes and provide direction.",
              },
            ].map((faq, index) => (
              <div key={index} className="border border-border rounded-lg p-6 hover:bg-card/50 transition-colors">
                <h3 className="font-bold text-lg mb-3 text-foreground">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <Image
          src="/assets/sunset-cta.jpg"
          alt="CTA Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/70" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground" style={{ fontFamily: "Rye, serif" }}>
              Your Idea Deserves to Be Built Right
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground">
              Stop settling for templates. Let's build an enterprise platform for your business.
            </p>

            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <TrackedWhatsAppLink
                href="https://wa.me/2348104933232?text=I'm%20ready%20to%20discuss%20my%20custom%20web%20app%20project.%20Can%20we%20talk%3F"
                eventName="Lead"
              >
                Start Your Project Today
              </TrackedWhatsAppLink>
            </Button>

            <p className="text-muted-foreground text-sm">
              Free consultation • No obligation • Let's understand your needs
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
