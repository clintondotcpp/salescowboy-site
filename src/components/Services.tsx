import { Code, TrendingUp, Share2, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code,
    title: "Web & Mobile Development",
    description: "We build fast, beautiful, and conversion-ready websites and apps that turn visitors into customers.",
  },
  {
    icon: TrendingUp,
    title: "SEO Mastery",
    description: "Outrank your competition and dominate Google search with our proven optimization strategies.",
  },
  {
    icon: Share2,
    title: "Facebook Ads",
    description: "High-ROI campaigns that capture leads, not just clicks. We turn ad spend into revenue.",
  },
  {
    icon: Target,
    title: "Google Ads",
    description: "Laser-targeted ad strategies that deliver measurable growth and maximum return on investment.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Rye, serif' }}>
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital marketing solutions for Nigerian businesses that drive real results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="bg-card border-border hover-lift hover-glow group transition-all duration-300"
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
            <a href="#contact">See Our Packages</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
