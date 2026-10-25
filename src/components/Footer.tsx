"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Phone, MapPin, Mail, ShieldCheck } from "lucide-react";

const divisions = [
  { href: "/advertising", label: "Paid Ads (Meta, Google, TikTok)" },
  { href: "/software-development", label: "Websites & Custom Software" },
  { href: "/ecommerce", label: "E-Commerce Online Stores" },
  { href: "/real-estate", label: "Real Estate Websites & Portals" },
  { href: "/seo", label: "SEO & Local Search Dominance" },
  { href: "/crm-ai-automation", label: "CRM & AI Workflow Automation" },
  { href: "/video-production", label: "Real Estate & Commercial Video" },
  { href: "/corporate-branding", label: "Corporate Brand Identity" },
  { href: "/cac-registration", label: "CAC Registration & Compliance" },
];

const companyLinks = [
  { href: "/#services", label: "Four Service Divisions" },
  { href: "/#case-studies", label: "Verified Case Studies" },
  { href: "/#about", label: "How Engagement Works" },
  { href: "/#faq", label: "Frequently Asked Questions" },
  { href: "/#contact", label: "Request a Proposal" },
];

const socials = [
  { href: "https://wa.me/2348082697841", label: "WhatsApp", Icon: MessageCircle },
  { href: "https://www.facebook.com/share/14bB9mYQd5p/", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/salescowboymarketing", label: "Instagram", Icon: Instagram },
];

const Footer = () => (
  <footer className="border-t border-border bg-card/60 pt-16 pb-12">
    <div className="container mx-auto px-4">
      {/* Top Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border">
        {/* Brand & Overview */}
        <div className="lg:col-span-5 space-y-5">
          <Link href="/" className="inline-block">
            <Image
              src="/assets/salescowboy-logo.png"
              alt="Sales Cowboy Marketing Solutions"
              className="h-11 w-auto"
              width={175}
              height={120}
              unoptimized
            />
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-sans">
            Sales Cowboy Marketing Solutions helps businesses attract customers, operate smarter, and build the digital systems to serve them.
          </p>

          <div className="space-y-2 pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>Serving businesses in Lagos, Abuja, Port Harcourt & nationwide.</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              <a href="tel:+2348082697841" className="hover:text-foreground transition-colors">
                +234 808 269 7841
              </a>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>Direct execution, 100% code ownership, fixed proposals.</span>
            </div>
          </div>

          <div className="flex gap-2.5 pt-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-xs uppercase font-bold tracking-wider text-foreground">
            Services & Solutions
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            {divisions.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company & Legal */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs uppercase font-bold tracking-wider text-foreground">
            Engagement & Trust
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>
          © {new Date().getFullYear()} Sales Cowboy Marketing Solutions. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
