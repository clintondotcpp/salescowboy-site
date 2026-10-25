"use client";

import { CheckCircle2, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const umbrellaStats = [
  { value: "< 100k", label: "Audience Sweet Spot", desc: "High engagement & authentic trust" },
  { value: "4.8x", label: "Higher Conversion", desc: "Compared to bloated celebrity posts" },
  { value: "100%", label: "Vetted Followers", desc: "Zero bots, audited Nigerian engagement" },
  { value: "7 Days", label: "Rapid Deployment", desc: "Turnkey briefs executed in synchronized waves" },
];

const umbrellaTiers = [
  {
    name: "Micro-Trio Starter",
    price: "₦120,000",
    creators: "3 Vetted Creators (<100k)",
    idealFor: "Ideal for product testing and targeted promotional sales.",
    features: [
      "3 vetted creators matched to your target niche",
      "1x Reel/TikTok + 2x Stories per creator",
      "Direct link in bio + trackable promo discount codes",
    ],
  },
  {
    name: "Growth Blitz",
    price: "₦300,000",
    badge: "Most Popular",
    creators: "8-10 Vetted Creators (<100k)",
    idealFor: "Coordinated wave across Lagos, Abuja & major cities.",
    features: [
      "8-10 creators posting in a 48-hour synchronized wave",
      "Mix of reviews, lifestyle integration & unboxing",
      "Pinned comments + WhatsApp call-to-actions",
    ],
  },
  {
    name: "Market Dominance",
    price: "₦750,000+",
    creators: "20+ Vetted Creators (<100k)",
    idealFor: "National brand launches, app rollouts, and multi-week dominance.",
    features: [
      "20+ creators across Instagram, TikTok & X",
      "Whitelisting rights to run paid ads through creator handles",
      "Dedicated campaign lead & live conversion reports",
    ],
  },
];

const InfluencerUmbrella = () => {
  return (
    <section id="influencer-umbrella" className="py-20 bg-card border-y border-border relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-xl mx-auto text-center mb-8 space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Micro-Influencer Umbrella (&lt;100k)
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Vetted Nigerian creators with high authentic trust and 4.8x higher conversion than celebrity pages.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
          {umbrellaStats.map((stat, sIdx) => (
            <div key={sIdx} className="bg-background border border-border rounded-xl p-3.5 text-center">
              <div className="text-2xl font-extrabold text-primary">{stat.value}</div>
              <div className="text-xs font-bold text-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pricing Bundles for Influencer Marketing */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 space-y-1">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Micro-Influencer Campaign Bundles
            </h3>
            <p className="text-xs text-muted-foreground">
              Select the reach that fits your immediate promotional campaign.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {umbrellaTiers.map((tier, tIdx) => (
              <div
                key={tIdx}
                className={`bg-background rounded-xl border p-5 flex flex-col justify-between transition-all ${
                  tier.badge
                    ? "border-primary ring-1 ring-primary/30 shadow-sm relative md:-translate-y-1"
                    : "border-border shadow-sm"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-md uppercase tracking-wider shadow">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-accent">{tier.creators}</span>
                    <h4 className="text-lg font-bold text-foreground mt-0.5">{tier.name}</h4>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-xs text-muted-foreground">/ campaign</span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-normal">{tier.idealFor}</p>

                  <div className="pt-3 border-t border-border space-y-2">
                    <div className="text-[10px] font-bold text-foreground uppercase tracking-wider">
                      Included in Umbrella:
                    </div>
                    <ul className="space-y-1.5">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5">
                  <Button
                    asChild
                    size="sm"
                    className={`w-full font-semibold text-xs ${
                      tier.badge
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow"
                        : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    <a href={`#contact?service=influencer-umbrella&tier=${encodeURIComponent(tier.name)}`}>
                      Book Influencer Wave <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Callout for Creators */}
          <div className="mt-10 bg-secondary/60 border border-border rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-foreground">Are you a creator with under 100k followers?</div>
              <div className="text-xs text-muted-foreground">
                Join our umbrella roster to receive consistent paid brand sponsorship deals.
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold text-xs shrink-0">
              <a href="#contact?type=creator-application">Apply to Join Umbrella</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfluencerUmbrella;
