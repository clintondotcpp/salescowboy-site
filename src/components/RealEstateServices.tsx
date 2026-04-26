import { Home, Search, MapPin, TrendingUp, Megaphone, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Home,
    title: "Real Estate Website Design",
    description: "Professional, lead-generating websites designed specifically for real estate agents and companies. Showcase listings beautifully and convert visitors into clients.",
  },
  {
    icon: Search,
    title: "Local SEO for Real Estate",
    description: "Dominate local search results. Get found by buyers and sellers in your area with proven local SEO strategies that drive traffic and leads.",
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    description: "Optimize your Google Business Profile to appear in map searches, attract reviews, and stand out to local homebuyers and sellers.",
  },
  {
    icon: TrendingUp,
    title: "Content Marketing",
    description: "Area guides for Lagos, Abuja, Port Harcourt, and other Nigerian cities. Market reports and property blogs that establish you as the local expert and attract organic traffic.",
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    description: "Consistent, engaging social media presence that showcases your listings, builds your brand, and nurtures client relationships.",
  },
  {
    icon: BarChart3,
    title: "Lead Generation & CRM",
    description: "Integrated lead capture systems and CRM management to track, nurture, and convert every potential client into a closed deal.",
  },
];

const RealEstateServices = () => {
  return (
    <section id="real-estate" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Rye, serif' }}>
            Real Estate Marketing Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tailored digital marketing services for real estate agents and companies. Get more listings, more leads, and more closed deals.
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
            <a href="#contact">Get Your Real Estate Marketing Plan</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RealEstateServices;
