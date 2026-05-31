import { Metadata } from "next";
import Image from "next/image";
import { 
  CheckCircle2, 
  Zap, 
  Shield, 
  Rocket, 
  BarChart3, 
  Code2, 
  Lock, 
  Cpu, 
  Star, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  UserCheck, 
  FileText 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import LeadQualificationForm from "@/components/LeadQualificationForm";

export const metadata: Metadata = {
  title: "Custom Web App Development | Starting from ₦500,000 | Sales Cowboy Marketing Nigeria",
  description:
    "Scale your Nigerian business with a premium custom-built web application starting from ₦500,000. Real Estate Portals, Logistics Trackers, VTU Gateways, POS Systems, School Ledgers, and more. Crafted by Sales Cowboy Marketing.",
  keywords: "custom web app Nigeria, property listing platform, logistics tracking system, VTU gateway, POS system Nigeria, hotel management software, school portal, church management system",
};

const trustbadges = [
  { icon: Rocket, label: "Payment Gateway Integration" },
  { icon: Shield, label: "High-Grade Data Security" },
  { icon: Zap, label: "Ultra-Fast Page Speeds" },
  { icon: BarChart3, label: "Automated Workflows" },
  { icon: Cpu, label: "Robust Databases" },
  { icon: CheckCircle2, label: "Direct Developer Support" },
];

export default function WebAppPromoPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/60 via-background to-background border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary animate-pulse">
              <span className="text-sm font-bold tracking-wider uppercase">Premium Software Engineering</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white" style={{ fontFamily: "Rye, serif" }}>
              Bring Your Custom Software Idea to Life
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stop settling for restrictive templates. We build secure, custom web applications engineered to solve your exact business needs.
              <span className="block text-primary font-bold mt-2">Starting from ₦500,000 • Custom Built • Software Development Only</span>
              <span className="block text-emerald-400 font-extrabold mt-3 text-lg">CAC No RC: 9574672</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-7 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all gap-2" asChild>
                <a href="#qualify-form">
                  <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                  </svg>
                  Qualify Project on WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 px-8 py-7 rounded-2xl font-bold" asChild>
                <a href="#showcase">Explore Software Types</a>
              </Button>
            </div>

            <div className="pt-6 text-xs text-muted-foreground flex flex-wrap justify-center gap-x-6 gap-y-2">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Fully Custom Codebase</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> WhatsApp Integration</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Local Nigerian Team Presence</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOGOS GRID & TRUST BAR */}
      <section className="bg-card border-b border-white/5 py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-6 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 inline-block w-full">
            <p className="text-xs font-bold text-emerald-400 tracking-widest">✓ CERTIFIED & REGISTERED • CAC No RC: 9574672 ✓</p>
          </div>
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-bold mb-8">
            TRUSTED BY BRANDS AND ORGANIZATIONS NATIONWIDE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {[
              { name: "Partner Logo 1", src: "/partner_logos/IMG-20260505-WA0164.jpg" },
              { name: "Partner Logo 2", src: "/partner_logos/IMG_6953.PNG" },
              { name: "Partner Logo 3", src: "/partner_logos/Logo_1.png" },
              { name: "Teo Biggs", src: "/partner_logos/TEO BIGGS.png" },
              { name: "Partner Logo 4", src: "/partner_logos/logo.png" },
            ].map((logo, index) => (
              <div key={index} className="relative w-24 h-10 md:w-32 md:h-14 flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain filter grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  sizes="150px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC LEAD QUALIFICATION FORM */}
      <section id="qualify-form" className="py-24 relative bg-slate-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4 uppercase tracking-wider">
              Lead Filtration System
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: "Rye, serif" }}>
              Qualify Your Web App Project
            </h2>
            <p className="text-muted-foreground">
              Filter out non-serious inquiries. Answer these quick questions to lock in your starting estimate and generate your custom system workflow directly to our engineering team on WhatsApp.
            </p>
          </div>

          <LeadQualificationForm />
        </div>
      </section>

      {/* 4. VALUE PROPOSITION STATS */}
      <section className="py-20 bg-card/40 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-primary" style={{ fontFamily: "Rye, serif" }}>₦50M+</div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Local Payments Synced</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-emerald-500" style={{ fontFamily: "Rye, serif" }}>100%</div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Custom Coding (No Templates)</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-blue-500" style={{ fontFamily: "Rye, serif" }}>3 Weeks</div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Avg. System Launch Time</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-purple-500" style={{ fontFamily: "Rye, serif" }}>24/7</div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Active Support SLA</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEDICATED SOFTWARE SOLUTION SECTIONS */}
      <section id="showcase" className="py-24 space-y-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white" style={{ fontFamily: "Rye, serif" }}>
              Custom Software We Build
            </h2>
            <p className="text-xl text-muted-foreground">
              Deep dive into our verified custom system categories. Each system is designed from scratch, optimized for performance, and fully managed.
            </p>
          </div>

          {/* Solution 1: Logistics & Dispatch Courier Trackers */}
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                Real-Time Tracking & Maps
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "Rye, serif" }}>
                Logistics & Dispatch Systems
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Empower your dispatch or fleet business with a full courier portal. From customer booking terminals to real-time driver tracking and automatic route optimization, we make courier logistics completely headache-free.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Real-time GPS tracker with live maps (Lagos, Abuja & nationwide)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>CSV batch order importing with auto-fleet sorting</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Driver & Rider application terminal with balance wallets</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Automated shipping fee calculation with live distance metrics</span>
                </li>
              </ul>
              <div className="pt-4 flex gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2" asChild>
                  <TrackedWhatsAppLink
                    href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20interested%20in%20building%20a%20custom%20Logistics%20%26%20Courier%20Tracker.%20Let's%20discuss%20our%20project%20scope."
                    eventName="Lead"
                  >
                    <>
                      <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                    </svg>
                    Build My Logistics Portal on WhatsApp
                  </>
                </TrackedWhatsAppLink>
              </Button>
              <div className="text-xs text-muted-foreground flex flex-col justify-center">
                <span>Starting from <strong>₦500,000</strong></span>
                <span>Excludes domain & hosting server fees</span>
                <span className="text-[10px] text-emerald-400 font-semibold mt-0.5">50% upfront to commence • Balance spread on agreed milestones</span>
              </div>
            </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              {/* Laptop frame displaying 2.png */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 p-2 shadow-2xl">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border-b border-white/5 rounded-t-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-muted-foreground font-mono ml-4">najaroute.com.ng/live-tracker</span>
                </div>
                <div className="relative aspect-[16/10] w-full bg-slate-900">
                  <Image
                    src="/500k_websites/2.png"
                    alt="NaijaRoute Logistics Courier Tracking Map Interface"
                    fill
                    className="object-cover"
                    sizes="(max-w-1024px) 100vw, 600px"
                  />
                </div>
              </div>
              
              {/* Dashboard sub-frame showing 3.png */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 p-2 shadow-2xl lg:ml-12">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border-b border-white/5 rounded-t-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-muted-foreground font-mono ml-4">alpineos.logistics/route-optimizer</span>
                </div>
                <div className="relative aspect-[16/10] w-full bg-slate-900">
                  <Image
                    src="/500k_websites/3.png"
                    alt="AlpineOS Logistics B2B Route Optimizer Workspace"
                    fill
                    className="object-cover"
                    sizes="(max-w-1024px) 100vw, 600px"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-white/5 max-w-5xl mx-auto" />

          {/* Solution 2: School Portals & Fee Installment Ledgers */}
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto lg:flex-row-reverse">
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 p-2 shadow-2xl">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border-b border-white/5 rounded-t-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-muted-foreground font-mono ml-4">edunaija.academy/admin/dashboard</span>
                </div>
                <div className="relative aspect-[16/10] w-full bg-slate-900">
                  <Image
                    src="/500k_websites/1.png"
                    alt="Atlantic Heritage Academy EduNaija Portal"
                    fill
                    className="object-cover"
                    sizes="(max-w-1024px) 100vw, 600px"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6 lg:pl-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest">
                Installments & Report Ledgers
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "Rye, serif" }}>
                School Management Portals
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Take your school operations 100% digital. We construct custom student portals, automated bursar invoice trackers, online fee installment plans, parent notification channels, and grade compilation registries.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Custom installment billing paths for parents</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Automated term report cards & grading ledger</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>WAEC / NECO / UBE Grading Standards integration</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Parent broadcast communications via SMS & Email</span>
                </li>
              </ul>
              <div className="pt-4 flex gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2" asChild>
                  <TrackedWhatsAppLink
                    href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20interested%20in%20building%20a%20custom%20School%20Portal%20%26%20Fee%20Installment%20Ledger.%20Let's%20discuss!"
                    eventName="Lead"
                  >
                    <>
                      <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                    </svg>
                    Build My School Portal on WhatsApp
                  </>
                </TrackedWhatsAppLink>
              </Button>
              <div className="text-xs text-muted-foreground flex flex-col justify-center">
                <span>Starting from <strong>₦500,000</strong></span>
                <span>Excludes domain & server hosting fees</span>
                <span className="text-[10px] text-emerald-400 font-semibold mt-0.5">50% upfront to commence • Balance spread on agreed milestones</span>
              </div>
            </div>
            </div>
          </div>

          <hr className="border-white/5 max-w-5xl mx-auto" />

          {/* Solution 3: Multi-Branch Inventory & POS */}
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
                ERP Inventory & Stock Systems
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "Rye, serif" }}>
                Multi-Branch POS & Stock ERPs
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Stop losing money to stock leakage. Manage your warehouse inventory levels, active product sales, SKU registries, low-stock warning triggers, and retail points of sale across multiple store locations in real time.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Real-time multi-branch inventory synchronization</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>SKU & automated barcode generator log</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Automatic warning badges for items with low stock</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Interactive retail registers with daily closing balance logs</span>
                </li>
              </ul>
              <div className="pt-4 flex gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2" asChild>
                  <TrackedWhatsAppLink
                    href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20interested%20in%20building%20a%20custom%20Multi-Branch%20POS%20%26%20Inventory%20System.%20Let's%20discuss!"
                    eventName="Lead"
                  >
                    <>
                      <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                    </svg>
                    Build My POS System on WhatsApp
                  </>
                </TrackedWhatsAppLink>
              </Button>
              <div className="text-xs text-muted-foreground flex flex-col justify-center">
                <span>Starting from <strong>₦500,000</strong></span>
                <span>Excludes domain & server hosting fees</span>
                <span className="text-[10px] text-emerald-400 font-semibold mt-0.5">50% upfront to commence • Balance spread on agreed milestones</span>
              </div>
            </div>
            </div>
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 p-2 shadow-2xl">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border-b border-white/5 rounded-t-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-muted-foreground font-mono ml-4">alpineos.inventory/products</span>
                </div>
                <div className="relative aspect-[16/10] w-full bg-slate-900">
                  <Image
                    src="/500k_websites/4.png"
                    alt="AlpineOS Inventory WMS Stock List Table"
                    fill
                    className="object-cover"
                    sizes="(max-w-1024px) 100vw, 600px"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-white/5 max-w-5xl mx-auto" />

          {/* Solution 4: Property Listing Platforms */}
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto lg:flex-row-reverse">
            <div className="lg:col-span-7 space-y-6">
              {/* Property Screenshot 1 */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 p-2 shadow-2xl">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border-b border-white/5 rounded-t-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-muted-foreground font-mono ml-4">comfortproperties.com.ng/listings</span>
                </div>
                <div className="relative aspect-[16/10] w-full bg-slate-900">
                  <Image
                    src="/property_screenshots/property_screenshot.png"
                    alt="Premium Property Listing Showcase Interface"
                    fill
                    className="object-cover"
                    sizes="(max-w-1024px) 100vw, 600px"
                  />
                </div>
              </div>
              
              {/* Property Screenshot 2 */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 p-2 shadow-2xl lg:ml-12">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border-b border-white/5 rounded-t-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-muted-foreground font-mono ml-4">bigdealshomes.com/properties</span>
                </div>
                <div className="relative aspect-[16/10] w-full bg-slate-900">
                  <Image
                    src="/property_screenshots/property_screenshot_2.png"
                    alt="Advanced Property Search & Filter Dashboard"
                    fill
                    className="object-cover"
                    sizes="(max-w-1024px) 100vw, 600px"
                  />
                </div>
              </div>

              {/* Property Screenshot 3 */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 p-2 shadow-2xl">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border-b border-white/5 rounded-t-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-muted-foreground font-mono ml-4">dejohhomes.com.ng/admin-console</span>
                </div>
                <div className="relative aspect-[16/10] w-full bg-slate-900">
                  <Image
                    src="/property_screenshots/property_screenshot_3.png"
                    alt="Property Management Admin Console"
                    fill
                    className="object-cover"
                    sizes="(max-w-1024px) 100vw, 600px"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6 lg:pl-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest">
                Property Portals
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "Rye, serif" }}>
                Property Listing Systems
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Own your private real estate marketplace. Showcase hundreds of properties, shortlet apartments, or land catalog schemes with advanced multi-tier filtering search and direct WhatsApp broker conversions.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Advanced filters (price, locations, bedrooms, status)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Multi-agent backend console to upload properties</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Virtual tours & embedded High-Definition YouTube galleries</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Automated broker alerts directly on lead dispatch</span>
                </li>
              </ul>
              <div className="pt-4 flex gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2" asChild>
                  <TrackedWhatsAppLink
                    href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20interested%20in%20building%20a%20custom%20Property%20Listing%20Platform.%20Let's%20discuss!"
                    eventName="Lead"
                  >
                    <>
                      <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                    </svg>
                    Build My Real Estate Portal on WhatsApp
                  </>
                </TrackedWhatsAppLink>
              </Button>
              <div className="text-xs text-muted-foreground flex flex-col justify-center">
                <span>Starting from <strong>₦500,000</strong></span>
                <span>Excludes domain & server hosting fees</span>
                <span className="text-[10px] text-emerald-400 font-semibold mt-0.5">50% upfront to commence • Balance spread on agreed milestones</span>
              </div>
            </div>
            </div>
          </div>

          <hr className="border-white/5 max-w-5xl mx-auto" />

          {/* Solution 5: High-Volume VTU Gateways */}
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
                High-Volume Transactions
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "Rye, serif" }}>
                High-Volume VTU Gateways
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Launch a secure airtime, mobile data, utility, and cable TV distribution engine in Nigeria. Connect multiple premium APIs with automated commission structures and high-speed multi-user transaction handling.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Sub-second airtime/data API dispensation pipelines</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Secure automated payment gateway syncs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Tiered membership rates (Reseller, Agent, API Partner)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Automated ledger reconciliations & fraud monitors</span>
                </li>
              </ul>
              <div className="pt-4 flex gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2" asChild>
                  <TrackedWhatsAppLink
                    href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20interested%20in%20building%20a%20custom%20VTU%20Gateway.%20Let's%20discuss!"
                    eventName="Lead"
                  >
                    <>
                      <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                    </svg>
                    Build My VTU Engine on WhatsApp
                  </>
                </TrackedWhatsAppLink>
              </Button>
              <div className="text-xs text-muted-foreground flex flex-col justify-center">
                <span>Starting from <strong>₦500,000</strong></span>
                <span>Excludes domain & server hosting fees</span>
                <span className="text-[10px] text-emerald-400 font-semibold mt-0.5">50% upfront to commence • Balance spread on agreed milestones</span>
              </div>
            </div>
            </div>
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">VTU API Dispenser Terminal</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">API CONNECTED</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-3 bg-slate-900 border border-white/5 rounded text-center">
                    <span className="block text-[10px] text-muted-foreground">MTN</span>
                    <span className="text-xs text-emerald-400 font-extrabold">-2.8%</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-white/5 rounded text-center">
                    <span className="block text-[10px] text-muted-foreground">AIRTEL</span>
                    <span className="text-xs text-emerald-400 font-extrabold">-3.0%</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-white/5 rounded text-center">
                    <span className="block text-[10px] text-muted-foreground">GLO</span>
                    <span className="text-xs text-emerald-400 font-extrabold">-4.5%</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-white/5 rounded text-center">
                    <span className="block text-[10px] text-muted-foreground">9MOBILE</span>
                    <span className="text-xs text-emerald-400 font-extrabold">-5.0%</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-900 rounded border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">User Balance:</span>
                    <span className="text-white font-bold">₦1,248,500.00</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 w-3/4 h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-white/5 max-w-5xl mx-auto" />

          {/* Solution 6: Church, Shortlet, and Micro-Savings */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-card border-white/5 hover:border-emerald-500/20 transition-all flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center">
                  <Code2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white" style={{ fontFamily: "Rye, serif" }}>Shortlets & Hotels</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Avoid paying high OTA commissions. Build a private guest booking portal with automated invoicing, room inventory manager systems, check-in logs, and calendar schedules.
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-primary">Starting from ₦500,000</span>
                <TrackedWhatsAppLink
                  href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20interested%20in%20a%20Shortlet%20Management%20System.%20Let's%20talk!"
                  eventName="Lead"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                  </svg>
                  Discuss on WhatsApp
                </TrackedWhatsAppLink>
              </div>
            </Card>

            <Card className="bg-card border-white/5 hover:border-emerald-500/20 transition-all flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white" style={{ fontFamily: "Rye, serif" }}>Church Management</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Establish a secure home for your congregation. Maintain detailed member databases, track services, stream sermons, and collect automated online tithing and seed giving.
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-primary">Starting from ₦500,000</span>
                <TrackedWhatsAppLink
                  href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20interested%20in%20a%20Church%20Management%20Engine.%20Let's%20talk!"
                  eventName="Lead"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                  </svg>
                  Discuss on WhatsApp
                </TrackedWhatsAppLink>
              </div>
            </Card>

            <Card className="bg-card border-white/5 hover:border-emerald-500/20 transition-all flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white" style={{ fontFamily: "Rye, serif" }}>Savings & Micro-Loans</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Perfect for cooperative societies and local micro-lenders. Oversee active member deposits, handle digital loan application approvals, and run automated repayment drafts.
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-primary">Starting from ₦500,000</span>
                <TrackedWhatsAppLink
                  href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20interested%20in%20a%20Savings%20%26%20Micro-Loan%20Platform.%20Let's%20talk!"
                  eventName="Lead"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                  </svg>
                  Discuss on WhatsApp
                </TrackedWhatsAppLink>
              </div>
            </Card>
          </div>
          
          <div className="text-center mt-10 max-w-xl mx-auto">
            <p className="text-[11px] text-muted-foreground">
              *All web app prices are starting estimates covering standalone custom engineering only. Payment Terms: <strong className="text-emerald-400">50% upfront payment to commence</strong> development, with the 50% balance spread across agreed progress milestones.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED GOOGLE MAPS CUSTOMER REVIEWS */}
      <section className="py-24 bg-slate-950/40 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              Verified Client Feedback
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "Rye, serif" }}>
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground mt-2">
              Read transparent 5-star Google Maps reviews from top Nigerian business owners who built custom systems with us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <a
                href="https://g.page/r/CVciZYSwMy9VEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900 border border-amber-500/20 hover:border-amber-500 transition-all group hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] text-left w-full sm:w-auto"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-extrabold text-sm border border-amber-500/20 group-hover:scale-105 transition-transform">
                  G
                </div>
                <div>
                  <span className="text-xs font-bold text-white block group-hover:text-primary transition-colors">
                    Verified Google Maps Business Profile
                  </span>
                  <span className="text-[10px] text-muted-foreground block">
                    ★ ★ ★ ★ ★ 5.0 Star Rated (Click to View Live Profile)
                  </span>
                </div>
              </a>

              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 py-6 px-6 rounded-2xl w-full sm:w-auto" asChild>
                <TrackedWhatsAppLink
                  href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I've%20read%20your%20Google%20reviews%20and%20want%20to%20discuss%20building%20a%20custom%20app."
                  eventName="Lead"
                >
                  <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                  </svg>
                  Discuss on WhatsApp
                </TrackedWhatsAppLink>
              </Button>
            </div>
            <div className="w-full max-w-4xl mx-auto mt-12 rounded-3xl overflow-hidden border border-white/5 bg-slate-900/60 p-2 shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-white/5 rounded-t-2xl">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Google Business Profile Location
                </span>
                <a 
                  href="https://g.page/r/CVciZYSwMy9VEAE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-amber-400 font-bold hover:underline"
                >
                  View on Google Maps ↗
                </a>
              </div>
              <iframe
                src="https://maps.google.com/maps?q=Sales%20Cowboy%20Marketing&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="w-full grayscale filter invert opacity-75 hover:opacity-100 hover:grayscale-0 hover:invert-0 transition-all duration-500 rounded-b-2xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
            {/* Review 1 */}
            <Card className="bg-card border-white/5 p-8 flex flex-col justify-between hover:border-emerald-500/20 transition-all shadow-xl">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "Sales Cowboy Marketing took on our Company's website project and delivered a sample in less than 3 hours. Apparently we needed to do some edits and trust me, they always responded promptly to every update and corrections that were sent to them, I particularly love the proactive response to updating the website whenever we needed them to do any corrections. One thing that stands them out professionally to me, is they create a collaborative relationship that makes it easy for them to understand the genuine needs on a company's website. We'll definitely be working with Sales Cowboy Marketing on more of our website projects and I recommend them to both Big and growing businesses."
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-6">
                <div>
                  <h5 className="text-sm font-bold text-white">Valentino</h5>
                  <span className="text-xs text-muted-foreground block mt-0.5">Founder, Haceup World Digital Marketing Agency</span>
                </div>
                <a 
                  href="https://haceupworld.com.ng/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-primary font-bold hover:underline"
                >
                  Visit Project ↗
                </a>
              </div>
            </Card>

            {/* Review 2 */}
            <Card className="bg-card border-white/5 p-8 flex flex-col justify-between hover:border-emerald-500/20 transition-all shadow-xl">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "He delivered excellently, didn't get the full package cus of my budget but it was worth the price. Nice guy, delivered well without complains."
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-6">
                <div>
                  <h5 className="text-sm font-bold text-white">Noble</h5>
                  <span className="text-xs text-muted-foreground block mt-0.5">Tech Founder & CEO, Agrinova</span>
                </div>
                <a 
                  href="https://www.agrinova.com.ng/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-primary font-bold hover:underline"
                >
                  Visit Project ↗
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 6.3 LIVE PRODUCTION PORTFOLIOS SHOWCASE */}
      <section className="py-24 bg-card/10 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Verify Our Live Performance
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white font-serif" style={{ fontFamily: "Rye, serif" }}>
              Inspect Our Live Software Deployments
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
              We don't just show screenshots. We invite you to explore the real-world products we've shipped. Click any card below to launch the live platform, test their speed, and verify our premium engineering firsthand.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Comfort Properties", desc: "Property Listing Engine", url: "https://comfortproperties.com.ng/", category: "Real Estate" },
              { name: "Big Deals Homes", desc: "Premium Real Estate Agency", url: "https://bigdealshomes.com/", category: "Real Estate" },
              { name: "Dejoh Homes", desc: "Housing & Listing Platform", url: "https://dejohhomes.com.ng/", category: "Real Estate" },
              { name: "Drenopav Floors", desc: "Industrial Flooring Portal", url: "https://drenopavfloors.ng/", category: "Corporate" },
              { name: "Teo Biggs Construction", desc: "Civil Engineering Portal", url: "https://teobiggsconstruction.com/", category: "Engineering" },
              { name: "TradeInfra", desc: "Infrastructure & Logistics", url: "https://tradeinfra.co/", category: "Logistics" },
              { name: "Tornado Appliances", desc: "E-Commerce Retail Store", url: "https://tornadokitchenappliances.com/", category: "E-Commerce" },
              { name: "Omasiri Foundation", desc: "Charity & NGOs Ledger", url: "https://omasirifoundation.org/", category: "NGO" },
              { name: "Full Light Miracle", desc: "Church Management Engine", url: "https://fullightmiracleministries.com.ng/", category: "NGO" },
              { name: "Trendicomz", desc: "Consulting & Corporate Hub", url: "https://trendicomz.org/", category: "Corporate" },
              { name: "HaceUp World", desc: "Modern Digital Portfolio", url: "https://haceupworld.com.ng/", category: "Corporate" },
              { name: "JPub Business", desc: "Retail Platform & Services", url: "https://jpub.com.ng/", category: "E-Commerce" },
              { name: "Agrinova", desc: "Agricultural Supply Portal", url: "https://agrinova.com.ng/", category: "Corporate" },
              { name: "D'Best Innovation", desc: "Strategy & Management Hub", url: "https://dbestinnovationandstrategy.com.ng/", category: "Corporate" }
            ].map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card/40 border border-white/5 p-4 rounded-2xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group flex flex-col justify-between hover:shadow-[0_0_20px_rgba(16,185,129,0.08)] duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-400">
                      {site.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] text-emerald-400 font-semibold uppercase tracking-wider">Live</span>
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {site.name}
                  </h5>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {site.desc}
                  </p>
                </div>
                <div className="text-[9px] text-emerald-400/80 mt-3 font-semibold group-hover:underline flex items-center justify-between">
                  <span>Visit Platform</span>
                  <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-xs text-muted-foreground mb-4">
              Clicking any card will securely launch their live production environment in a new browser tab.
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 py-6 px-8 rounded-2xl mx-auto" asChild>
              <TrackedWhatsAppLink
                href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20impressed%20by%20your%20live%20production%20portfolio%20deployments.%20Let's%20discuss%20building%20a%20similar%20high-performance%20web%20app%20for%20my%20business!"
                eventName="Lead"
              >
                <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                </svg>
                Deploy My Live App on WhatsApp
              </TrackedWhatsAppLink>
            </Button>
          </div>
        </div>
      </section>

      {/* 6.5 RAW SOCIAL PROOF: UNEDITED CLIENT WHATSAPP CONVERSATIONS */}
      <section className="py-24 bg-slate-950/20 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Real Client Chats
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white font-serif" style={{ fontFamily: "Rye, serif" }}>
              Unedited Chat Proof
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              We build high-trust collaborative partnerships. Read actual, unedited screenshots of feedback from our top project stakeholders in Nigeria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Screenshot 1: MightysGroup */}
            <div className="bg-card border border-white/5 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-emerald-500/20 transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Abuja Real Estate Portal
                </div>
                <blockquote className="text-xs text-muted-foreground leading-relaxed italic">
                  "I love what I saw. You are truly a great web developer..."
                </blockquote>
                <p className="text-[10px] text-muted-foreground">
                  Feedback from Abuja's leading luxury property developer, MightysGroup, upon receiving their platform's initial interactive draft.
                </p>
              </div>
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                <Image
                  src="/whatsapp_reviews/Screenshot_20260526-224717_WhatsAppBusiness.jpg.jpeg"
                  alt="MightysGroup WhatsApp Review Screenshot"
                  fill
                  className="object-cover hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-w-768px) 100vw, 300px"
                />
              </div>
            </div>

            {/* Screenshot 2: Big Deals Homes */}
            <div className="bg-card border border-white/5 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-emerald-500/20 transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Premium Property Agency
                </div>
                <blockquote className="text-xs text-muted-foreground leading-relaxed italic">
                  "This is impressive. Let me share with the team..."
                </blockquote>
                <p className="text-[10px] text-muted-foreground">
                  First draft review of the bespoke housing database and administrative search hub for Big Deals Homes Limited.
                </p>
              </div>
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                <Image
                  src="/whatsapp_reviews/Screenshot_20260526-224854_WhatsAppBusiness.jpg.jpeg"
                  alt="Big Deals Homes WhatsApp Review Screenshot"
                  fill
                  className="object-cover hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-w-768px) 100vw, 300px"
                />
              </div>
            </div>

            {/* Screenshot 3: Omasiri Foundation */}
            <div className="bg-card border border-white/5 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-emerald-500/20 transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Charity & NGO Portal
                </div>
                <blockquote className="text-xs text-muted-foreground leading-relaxed italic">
                  "You did a very great job. The layout is beautiful..."
                </blockquote>
                <p className="text-[10px] text-muted-foreground">
                  Review of Omasiri Chukwu Foundation's custom donation ledger and public outreach site, praising the typography and copywriting.
                </p>
              </div>
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                <Image
                  src="/whatsapp_reviews/Screenshot_20260526-224945_WhatsAppBusiness.jpg.jpeg"
                  alt="Omasiri Foundation WhatsApp Review Screenshot"
                  fill
                  className="object-cover hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-w-768px) 100vw, 300px"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 py-6 px-8 rounded-2xl mx-auto" asChild>
              <TrackedWhatsAppLink
                href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20impressed%20by%20the%20unedited%20WhatsApp%20chat%20feedback%20from%20your%20clients.%20Let's%20discuss%20my%20own%20custom%20software%20project!"
                eventName="Lead"
              >
                <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                </svg>
                Start My Custom App Project
              </TrackedWhatsAppLink>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. MEET THE COWBOW DEVELOPERS SECTION */}
      <section className="py-24 bg-card/20 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              
              <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "Rye, serif" }}>
                Our Development Team
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Based in Nigeria, our highly specialized system architects build enterprise-grade systems with total transparency. We don't farm out code to cheap freelancers. We own the architecture, build it in-house, and handle the support around the clock.
              </p>

              {/* Highlight Chief Engineer Clinton Chukwunyere */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-primary/30 flex-shrink-0 bg-slate-900">
                  <Image
                    src="/profile_photo.png"
                    alt="Clinton Chukwunyere profile photo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Clinton Chukwunyere</h4>
                  <span className="text-xs text-primary font-semibold block mb-1">Chief Software & Cloud Engineer</span>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Leads the systems engineering, cloud integration architectures, and database clustering for all corporate deployments.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <span className="text-white font-bold text-sm block">Local Accountability</span>
                  <span className="text-xs text-muted-foreground block">
                    Meet with our team physically or virtually anytime at our office:
                    <strong className="text-primary block mt-1.5 font-semibold">Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos</strong>
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-white font-bold text-sm block">Custom Training</span>
                  <span className="text-xs text-muted-foreground block">We hand over clean documentation and train your bursars or staff.</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/profile_photo.png"
                  alt="Clinton Chukwunyere - Chief Software & Cloud Engineer"
                  fill
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, 600px"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 py-6 px-8 rounded-2xl mx-auto" asChild>
              <TrackedWhatsAppLink
                href="https://wa.me/2348104933232?text=Hi%20Clinton!%20I'd%20like%20to%20consult%20with%20your%20development%20team%20about%20our%20custom%20software%20architecture."
                eventName="Lead"
              >
                <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                </svg>
                Consult Directly With Our Developers
              </TrackedWhatsAppLink>
            </Button>
          </div>
        </div>
      </section>

      {/* 9. DETAILED TRANSPARENT PRICING PLANS */}
      <section className="py-24 bg-slate-950/20 border-y border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <p className="text-xs font-extrabold text-emerald-400 tracking-widest">REGISTERED COMPANY • CAC No RC: 9574672</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "Rye, serif" }}>
              Transparent Cost Model
            </h2>
            <p className="text-muted-foreground mt-2">
              No hidden fees. Full ownership from day one. Select the starting package that fits your operational needs:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Core Package */}
            <Card className="bg-card border border-white/10 p-8 flex flex-col justify-between hover:border-primary/30 transition-all relative overflow-hidden">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Single-Core App</span>
                  <h4 className="text-3xl font-bold text-white mt-1" style={{ fontFamily: "Rye, serif" }}>Core Package</h4>
                  <p className="text-xs text-muted-foreground">For single businesses and automated operations.</p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground block">Starting from</span>
                  <span className="text-5xl font-extrabold text-white">₦500,000</span>
                </div>

                <hr className="border-white/5" />

                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Single-system core architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Fully responsive Web & Mobile dashboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Paystack, Monnify, or Squad syncs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Admin control console with core reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-emerald-400 font-semibold">50% upfront deposit to commence engineering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-emerald-400 font-semibold">50% balance spread on progress milestones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>30 days priority technical support</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-6 rounded-xl" asChild>
                  <TrackedWhatsAppLink
                    href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20ready%20to%20get%20started%20with%20the%20Core%20Web%20App%20Package%20starting%20from%20₦500,000.%20Let's%20build!"
                    eventName="Lead"
                  >
                    Deploy Core App
                  </TrackedWhatsAppLink>
                </Button>
              </div>
            </Card>

            {/* Advanced & Enterprise Package */}
            <Card className="bg-card border-2 border-primary p-8 flex flex-col justify-between hover:scale-[1.01] transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-bl">
                MOST POPULAR
              </div>
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Multi-System ERP</span>
                  <h4 className="text-3xl font-bold text-white mt-1" style={{ fontFamily: "Rye, serif" }}>Enterprise Package</h4>
                  <p className="text-xs text-muted-foreground">For scaling startups, multi-branch platforms & high-volume systems.</p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground block">Starting from</span>
                  <span className="text-5xl font-extrabold text-white">₦1,200,000</span>
                </div>

                <hr className="border-white/5" />

                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Multi-database sync with microservice channels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Unlimited admin accounts & multi-tier permissions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Paystack split payments & automated bank disbursements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>WhatsApp and SMS notification gateway triggers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Advanced graphical reports & data exporting (CSV/PDF)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-emerald-400 font-semibold">50% upfront to commence, balance spread on milestones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>90 days extended developer support & maintenance SLA</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 rounded-xl" asChild>
                  <TrackedWhatsAppLink
                    href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20interested%20in%20the%20Enterprise%20Software%20Package%20starting%20from%20₦1.2M.%20Let's%20discuss%20my%20complex%20requirements!"
                    eventName="Lead"
                  >
                    Deploy Enterprise ERP
                  </TrackedWhatsAppLink>
                </Button>
              </div>
            </Card>
          </div>

          {/* Web App strictly scope warning banner */}
          <div className="mt-12 p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-extrabold text-lg flex-shrink-0">
              ⚠️
            </div>
            <div>
              <h5 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
                Strict Technical Scope Disclaimer (Web Apps Only)
              </h5>
              <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">
                All development packages are strictly for fully custom, high-throughput <strong className="text-white">Web Applications</strong> (accessible globally via mobile and desktop browsers like Chrome, Safari, and Edge). Native mobile applications requiring compilation into Android APKs, Apple iOS bundles, or submission to the Apple App Store / Google Play Store are <strong className="text-white">NOT included</strong> in these packages. Native mobile app wrappers or compilation can be quoted separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. HIGH-TRUST FAQS */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "Rye, serif" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-2">
              Everything you need to know about our custom app development process.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-white/10 rounded-2xl px-6 bg-card/20 hover:bg-card/50 transition-colors">
              <AccordionTrigger className="text-white hover:no-underline font-bold text-left py-5">
                What does "Starting from ₦500,000" cover and what are your payment terms?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5">
                This covers our Core custom software development package, which includes complete custom database design, business logic engineering, clean responsive dashboards, secure API integrations, and 30 days of direct developer support. Our payment terms are highly structured: <strong className="text-white">50% upfront commitment payment</strong> to commence engineering, and the remaining <strong className="text-white">50% spread across agreed progress milestones</strong>. Note that custom domains, custom corporate mailboxes, and production cloud hosting server fees are billed separately based on your specific traffic requirements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-white/10 rounded-2xl px-6 bg-card/20 hover:bg-card/50 transition-colors">
              <AccordionTrigger className="text-white hover:no-underline font-bold text-left py-5">
                Do we get full ownership of the source code?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5">
                Yes, absolutely. Once final delivery payments are verified, 100% of the custom application source code, databases, and assets are fully handed over to you. We hold zero hostage copyrights or restrictive licenses.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-white/10 rounded-2xl px-6 bg-card/20 hover:bg-card/50 transition-colors">
              <AccordionTrigger className="text-white hover:no-underline font-bold text-left py-5">
                How long will it take to build my custom web app?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5">
                Core applications are completed and live-deployed in 3 to 5 weeks depending on database scope. Highly complex multi-system custom enterprise platforms can take 6 to 10 weeks. We provide active workspace preview links every 7-10 days so you track development live.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-white/10 rounded-2xl px-6 bg-card/20 hover:bg-card/50 transition-colors">
              <AccordionTrigger className="text-white hover:no-underline font-bold text-left py-5">
                Will you integrate automated WhatsApp notifications or SMS bills?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5">
                Yes, we excel in automation! We seamlessly connect WhatsApp API gateways (e.g. Twilio or local gateways) and bulk SMS APIs to trigger student report drops, parcel delivery tracking pin codes, and VTU dispensing notifications.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-white/10 rounded-2xl px-6 bg-card/20 hover:bg-card/50 transition-colors">
              <AccordionTrigger className="text-white hover:no-underline font-bold text-left py-5">
                Are native iOS and Android mobile apps included in this price?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5">
                No. The packages listed strictly cover the engineering of <strong className="text-white">Custom Web Applications</strong> that run directly in web browsers (e.g. Google Chrome, Apple Safari, Microsoft Edge) on both desktop and mobile devices. While our web apps are 100% mobile-responsive, look and feel exactly like mobile apps when loaded on a phone, and support pinning to phone home screens, they do not include native App Store compilation (APKs/IPAs) or submission files for the Google Play Store or Apple App Store. Native app shells or native development can be quoted separately.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 11. FINAL CTA BANNER */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-background/90 to-background" />
        <Image
          src="/nigerian_business_owners_portraits_1778127143305.png"
          alt="Sales Cowboy Coworking Backdrop"
          fill
          className="object-cover mix-blend-overlay opacity-20 filter saturate-50"
          sizes="100vw"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-6 py-3 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500/50 mb-4">
              <p className="text-sm font-extrabold text-emerald-300 tracking-widest">✓ OFFICIALLY REGISTERED ✓ CAC No RC: 9574672 ✓</p>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight" style={{ fontFamily: "Rye, serif" }}>
              Your Business Deserves Real Engineering
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Stop losing paying customers because of broken site templates. Let us engineer a premium, high-speed custom app for your brand today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-7 rounded-2xl gap-2 shadow-[0_0_30px_rgba(16,185,129,0.2)]" asChild>
                <TrackedWhatsAppLink
                  href="https://wa.me/2348104933232?text=Hi%20Sales%20Cowboy!%20I'm%20ready%20to%20discuss%20my%20custom%20software%20project.%20Can%20we%20schedule%20a%20planning%20session%3F"
                  eventName="Lead"
                >
                  <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                  </svg>
                  Schedule Free Planning Session on WhatsApp
                </TrackedWhatsAppLink>
              </Button>
            </div>

            <p className="text-muted-foreground text-xs">
              No consultation fees • Fully transparent estimates • 100% money-back timeline guarantee
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
