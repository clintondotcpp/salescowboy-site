import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "CEO, TechStart Inc",
    content: "SalesCowboy transformed our digital presence. Their SEO work tripled our organic traffic in just 4 months. The team's dedication and expertise are unmatched.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    title: "Founder, GrowthHub",
    content: "The Facebook Ads campaigns they ran delivered a 5X ROI. Finally, an agency that understands both creativity and data. Highly recommended!",
    rating: 5,
  },
  {
    name: "David Martinez",
    title: "Marketing Director, Elite Services",
    content: "Our new website is not just beautiful—it converts. SalesCowboy built us a site that perfectly represents our brand and drives real business results.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Rye, serif' }}>
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-background border-2 border-wood hover-lift hover-glow"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                
                <div className="pt-4 border-t border-border">
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
