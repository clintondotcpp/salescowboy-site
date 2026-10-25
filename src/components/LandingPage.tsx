import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";

export type Plan = {
  name: string;
  price: string;
  note?: string;
  features: string[];
  featured?: boolean;
  whatsapp: string;
};

export type LandingProps = {
  title: React.ReactNode;
  subtitle: string;
  features: { title: string; text: string }[];
  featuresHeading?: string;
  plans: Plan[];
  plansNote?: string;
  steps?: { title: string; text: string }[];
  whatsappNumber?: string;
  whatsappMessage: string;
};

const waLink = (num: string, msg: string) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

const h2 = "text-3xl md:text-5xl font-extrabold tracking-tight text-foreground";

export default function LandingPage({
  title,
  subtitle,
  features,
  featuresHeading = "What you get",
  plans,
  plansNote,
  steps = [
    { title: "Talk", text: "Tell us your goal." },
    { title: "Build", text: "We design and ship fast." },
    { title: "Launch", text: "You go live and grow." },
  ],
  whatsappNumber = "2348082697841",
  whatsappMessage,
}: LandingProps) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
          <div className="absolute -top-40 right-[-10%] w-[620px] h-[620px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
              {title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">{subtitle}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#plans"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-8 py-4 text-base font-semibold transition-colors hover:bg-primary"
              >
                See pricing
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={waLink(whatsappNumber, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-border px-8 py-4 text-base font-semibold transition-colors hover:border-foreground"
              >
                Chat on WhatsApp
              </a>
            </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 md:py-28 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className={h2}>{featuresHeading}</h2>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
              {features.map((f) => (
                <div key={f.title} className="bg-background p-8 md:p-10 transition-colors hover:bg-card">
                  <Check className="w-6 h-6 text-accent" />
                  <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="py-24 md:py-28 bg-card/40 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <h2 className={h2}>Transparent packages</h2>
              <p className="mt-3 text-base md:text-lg text-muted-foreground">
                Clear scope and deliverables. Choose a package to start or discuss custom requirements.
              </p>
            </div>

            <div
              className={`grid gap-6 items-stretch ${
                plans.length === 3
                  ? "lg:grid-cols-3 max-w-6xl"
                  : plans.length === 2
                  ? "md:grid-cols-2 max-w-4xl"
                  : "max-w-xl"
              }`}
            >
              {plans.map((p) => (
                <div
                  key={p.name}
                  className={`rounded-3xl p-7 md:p-9 flex flex-col justify-between transition-all ${
                    p.featured
                      ? "bg-card border-2 border-accent shadow-md ring-1 ring-accent/20 relative"
                      : "bg-background border border-border shadow-xs hover:border-foreground/20"
                  }`}
                >
                  <div>
                    {p.featured && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider mb-4">
                        ★ Recommended
                      </div>
                    )}
                    <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                      {p.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                        {p.price}
                      </span>
                    </div>
                    {p.note && (
                      <p className="mt-1.5 text-xs md:text-sm font-medium text-muted-foreground">
                        {p.note}
                      </p>
                    )}

                    <div className="my-6 border-t border-border" />

                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                      What&apos;s included:
                    </div>

                    <ul className="space-y-3 flex-1 text-sm md:text-base">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-foreground/90 leading-snug">
                          <div className="w-5 h-5 rounded-md bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-accent" strokeWidth={2.5} />
                          </div>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/60">
                    <a
                      href={waLink(whatsappNumber, p.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-5 text-sm font-semibold transition-all hover-lift ${
                        p.featured
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                          : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                      }`}
                    >
                      <span>Choose {p.name}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {plansNote && <p className="mt-8 text-base text-muted-foreground">{plansNote}</p>}
          </div>
        </section>

        {/* Steps */}
        <section className="py-24 md:py-28">
          <div className="container mx-auto px-4">
            <h2 className={h2}>How it works</h2>
            <div className="mt-14 grid md:grid-cols-3 gap-10">
              {steps.map((s, i) => (
                <div key={s.title} className="border-t border-foreground pt-6">
                  <div className="text-sm font-semibold text-accent">0{i + 1}</div>
                  <h3 className="mt-3 text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <WhatsAppButton message={whatsappMessage} />
    </div>
  );
}
