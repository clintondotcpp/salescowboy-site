import { Hammer, Wrench, Zap, Search, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Hammer,
    title: "Construction Company Websites",
    description: "Professional websites that showcase your projects, build trust, and capture leads. Portfolio galleries, service pages, and project showcases that convert visitors into clients.",
  },
  {
    icon: Wrench,
    title: "Contractor & Electrician Sites",
    description: "Specialized websites for general contractors, electricians, plumbers, and trades. Service area pages, emergency contact forms, and booking systems that bring in jobs.",
  },
  {
    icon: Search,
    title: "Local SEO for Contractors",
    description: "Get found by homeowners searching for your services. Local SEO strategies that put you at the top of search results when customers need you most.",
  },
  {
    icon: MapPin,
    title: "Google Business Optimization",
    description: "Optimize your Google Business Profile to appear in local searches, collect reviews, and showcase your work. Be the first contractor homeowners call.",
  },
  {
    icon: TrendingUp,
    title: "Pay-Per-Click Ads",
    description: "Targeted Google and Facebook ads that reach homeowners across Nigeria actively searching for contractors, electricians, and construction services in Lagos, Abuja, and other cities.",
  },
  {
    icon: Zap,
    title: "Website Management",
    description: "Ongoing website maintenance, content updates, and performance optimization. Keep your site fresh, fast, and generating leads while you focus on your craft.",
  },
];

const ConstructionServices = () => {
  return (
    <section id="construction" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Rye, serif' }}>
            Construction & Contractor Marketing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Digital marketing solutions built for construction companies, contractors, and electricians. Get more leads, more jobs, and grow your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="bg-background border-border hover-lift hover-glow group transition-all duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <a href="#contact">Get More Construction Leads</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConstructionServices;
