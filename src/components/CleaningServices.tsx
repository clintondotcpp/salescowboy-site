import { Sparkles, Calendar, Search, MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Sparkles,
    title: "Cleaning Business Websites",
    description: "Professional websites that build trust and drive bookings. Service pages, online booking systems, and customer testimonials that convert visitors into clients.",
  },
  {
    icon: Calendar,
    title: "Online Booking Systems",
    description: "Integrated booking and scheduling systems that make it easy for customers to book cleanings. Reduce phone calls and automate your scheduling.",
  },
  {
    icon: Search,
    title: "Local SEO for Cleaning",
    description: "Rank at the top of local search results for cleaning services. Get found by homeowners and businesses actively searching for cleaning companies.",
  },
  {
    icon: MapPin,
    title: "Service Area Marketing",
    description: "Targeted marketing for your specific service areas across Nigeria. Optimize for Lagos, Abuja, Port Harcourt, and other cities where you operate to maximize local visibility.",
  },
  {
    icon: Clock,
    title: "Google Business Optimization",
    description: "Optimize your Google Business Profile to appear in map searches, collect reviews, and showcase your services. Be the first cleaning company customers call.",
  },
  {
    icon: Star,
    title: "Review Management",
    description: "Systems and strategies to collect, manage, and showcase customer reviews. Build trust and credibility that drives more bookings.",
  },
];

const CleaningServices = () => {
  return (
    <section id="cleaning" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Rye, serif' }}>
            Cleaning Business Marketing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Digital marketing solutions for cleaning companies. Get more bookings, more reviews, and grow your cleaning business with proven strategies.
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
            <a href="#contact">Get More Cleaning Clients</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CleaningServices;
