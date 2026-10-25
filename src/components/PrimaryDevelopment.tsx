"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Globe, 
  Database, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  ShoppingCart
} from "lucide-react";
import Link from "next/link";

const devCapabilities = [
  {
    icon: Globe,
    title: "Custom Web Applications & SaaS",
    description: "High-performance web apps built with Next.js, React, and automated Paystack/Flutterwave checkouts.",
    features: ["User Auth & Roles", "Automated Checkout", "Interactive Dashboards", "Cloud Edge Deployment"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native iOS and Android applications with offline support, push notifications, and fast UX.",
    features: ["iOS & Android Apps", "React Native", "Push Notifications", "Offline Data Sync"],
  },
  {
    icon: Database,
    title: "Internal Tools, ERPs & Portals",
    description: "Custom portals, order trackers, real-time inventory, and automated billing tools.",
    features: ["Workflow Automation", "Inventory Tracking", "Automated Billing", "Multi-Branch Access"],
  },
  {
    icon: Terminal,
    title: "Backend, APIs & Databases",
    description: "Scalable APIs, Cloudflare D1/R2 databases, and webhooks engineered for 99.9% uptime.",
    features: ["Microservices & APIs", "Cloudflare D1 & R2", "Payment Webhooks", "High Concurrency"],
  },
];

const PrimaryDevelopment = () => {
  return (
    <section id="primary-dev" className="py-16 md:py-20 bg-card border-y border-border relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-xl mx-auto text-center mb-10 space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Web & Software Development
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Fast, reliable web and mobile systems that drive profit.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {devCapabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-background border border-border rounded-xl p-6 hover-lift transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-border/70 grid grid-cols-2 gap-2 text-xs">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 text-foreground/90 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* E-Commerce Banner Spotlight */}
        <div className="bg-secondary/70 border border-primary/40 rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-left">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Dedicated ₦165,000 E-Commerce Store
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xl">
              1-year dedicated hosting, unlimited products, Paystack payments, and full admin dashboard.
            </p>
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs px-6 py-4 shrink-0 shadow-sm">
            <Link href="/ecommerce">
              <ShoppingCart className="w-4 h-4 mr-2" /> View ₦165k Plan Details
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PrimaryDevelopment;
