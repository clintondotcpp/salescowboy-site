"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-card border-y border-border relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
              We Don&apos;t Sell Fluff. <br />
              <span className="text-accent">We Engineer Market Dominance.</span>
            </h2>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              <strong>Sales Cowboy Marketing Solutions</strong> pairs software engineering rigor with aggressive customer acquisition. We build custom platforms, launch high-converting ad funnels, and activate vetted creators to generate measurable profit for Nigerian businesses.
            </p>

            {/* Core Values Pillars */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-foreground">
                  Custom Software Architecture
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-foreground">
                  Transparent Bundle Pricing
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-foreground">
                  Vetted Micro-Influencers
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-foreground">
                  Strict Focus on ROAS & Revenue
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground italic">
                Sales Cowboy Marketing Solutions — Headquartered in Nigeria, serving clients across Lagos, Abuja, and nationwide.
              </p>
            </div>
          </div>

          {/* Image & Visual Graphic */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden border border-border shadow-sm bg-secondary">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Sales Cowboy Marketing Solutions Team"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              
              {/* Overlay Stat Card */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-card/95 border border-border backdrop-blur-md shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-accent uppercase tracking-wider">Engineering</div>
                  <div className="text-xs font-bold text-foreground">Web & Software Dev</div>
                </div>
                <div className="h-6 w-px bg-border" />
                <div>
                  <div className="text-[10px] font-bold text-accent uppercase tracking-wider">Services</div>
                  <div className="text-xs font-bold text-foreground">14 Disciplines</div>
                </div>
                <div className="h-6 w-px bg-border" />
                <div>
                  <div className="text-[10px] font-bold text-accent uppercase tracking-wider">Pricing</div>
                  <div className="text-xs font-bold text-foreground">Tiered Bundles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
