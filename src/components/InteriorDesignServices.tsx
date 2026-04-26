import { Palette, Home, Camera, Search, Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Palette,
    title: "Interior Design Websites",
    description: "Stunning, portfolio-focused websites that showcase your design work. Beautiful galleries, project showcases, and client testimonials that attract your ideal clients.",
  },
  {
    icon: Camera,
    title: "Portfolio Showcase",
    description: "Immersive before-and-after galleries, virtual tours, and project case studies that highlight your unique design style and expertise.",
  },
  {
    icon: Search,
    title: "Local SEO for Designers",
    description: "Get discovered by homeowners looking for interior design services. Local SEO strategies that connect you with clients ready to invest in their spaces.",
  },
  {
    icon: Home,
    title: "Service Area Optimization",
    description: "Optimize your website and Google Business Profile to rank in searches for interior design services in Lagos, Abuja, Port Harcourt, and other Nigerian cities.",
  },
  {
    icon: Heart,
    title: "Social Media & Content",
    description: "Beautiful Instagram feeds, Pinterest optimization, and design blog content that builds your brand and attracts design-savvy clients.",
  },
  {
    icon: Sparkles,
    title: "Website Management",
    description: "Keep your portfolio fresh with regular updates, new project showcases, and ongoing optimization. We handle the tech so you can focus on design.",
  },
];

const InteriorDesignServices = () => {
  return (
    <section id="interior-design" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Rye, serif' }}>
            Interior Design Marketing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Digital marketing solutions designed for interior designers. Showcase your work, attract premium clients, and grow your design business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="#contact">Showcase Your Design Business</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InteriorDesignServices;
