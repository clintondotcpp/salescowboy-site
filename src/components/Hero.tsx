import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

const stats = [
  { value: "₦50M+", label: "Client pipeline & revenue generated" },
  { value: "3.8x", label: "Average verified ROAS on paid ads" },
  { value: "7 Days", label: "Average sprint delivery (custom apps scaled by scope)" },
  { value: "100%", label: "Direct execution (zero outsourced guesswork)" },
];

const Hero = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute -top-40 right-[-10%] w-[620px] h-[620px] rounded-full bg-accent/10 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Value Proposition */}
          <div className="lg:col-span-7">
           

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-foreground leading-[1.1]">
              We help businesses get customers, operate smarter and{" "}
              <span className="text-accent">grow.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-sans">
              From advertising and websites to custom software and AI automation, Sales Cowboy helps businesses attract customers and build the systems to serve them.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-8 py-4 text-base font-semibold transition-all hover:bg-primary shadow-sm"
              >
                Start a project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background/50 px-8 py-4 text-base font-semibold text-foreground transition-colors hover:border-foreground hover:bg-card"
              >
                Explore our services
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" /> Fixed, transparent proposals
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" /> You own 100% of your code & IP
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" /> Dedicated lead engineer & strategist
              </span>
            </div>
          </div>

          {/* Featured Proof / Recent Sprint Highlight */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card/80 p-6 md:p-8 backdrop-blur shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-5 border-b border-border">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-accent">
                    Featured Client Outcome
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Lagos, Nigeria</span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Drenopav Floors</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Industrial & decorative flooring contractor needing direct inbound commercial clients in Lagos & Abuja.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-background border border-border">
                    <div className="text-2xl font-bold text-accent">#1 Rank</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Google local search for Lagos flooring</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-background border border-border">
                    <div className="text-2xl font-bold text-foreground">₦18M+</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Inbound pipeline within 90 days</div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground/90 leading-relaxed border-t border-border pt-4">
                  Delivered high-speed mobile showcase, Google Business Profile dominance, and automated WhatsApp inquiry routing in a 10-day sprint.
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href="#case-studies"
                    className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
                  >
                    View all 3 case studies <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] text-muted-foreground">Verified client project</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 02. Verified Proof Strip */}
        <div className="mt-16 pt-10 border-t border-border">
          <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-6">
            Verified execution metrics across our active client portfolio
          </p>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-accent/40 pl-4">
                <dt className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-sans">
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-snug">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Hero;
