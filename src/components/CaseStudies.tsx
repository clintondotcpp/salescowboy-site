import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const caseStudies = [
  {
    title: "E-Commerce Revolution",
    metric: "+320%",
    description: "Increase in organic traffic",
    details: "Transformed a struggling online store into a market leader through SEO optimization and conversion rate improvements.",
  },
  {
    title: "SaaS Growth Campaign",
    metric: "5X ROI",
    description: "Return on Facebook Ads",
    details: "Strategic ad targeting and funnel optimization delivered exceptional returns for a B2B software company.",
  },
  {
    title: "Local Business Domination",
    metric: "#1 Ranking",
    description: "Google local search results",
    details: "Achieved top ranking for core keywords, driving consistent customer acquisition for a service business.",
  },
  {
    title: "Brand Awareness Blitz",
    metric: "450K+",
    description: "Impressions in 90 days",
    details: "Multi-channel campaign that exponentially increased brand visibility and market presence.",
  },
];

const CaseStudies = () => {
  return (
    <section id="results" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Rye, serif' }}>
            From Rust to Gold — Real Client Wins.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Results that speak louder than words
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {caseStudies.map((study, index) => (
            <Card 
              key={index}
              className="bg-background border-border hover-lift hover-glow group cursor-pointer transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-accent" style={{ fontFamily: 'Rye, serif' }}>
                      {study.metric}
                    </div>
                    <p className="text-lg font-semibold text-foreground">{study.description}</p>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{study.title}</h3>
                <p className="text-muted-foreground text-sm">{study.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
