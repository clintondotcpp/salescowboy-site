import { Check } from "lucide-react";

const benefits = [
  "Data-Driven Campaigns",
  "Creative That Converts",
  "Full Funnel Strategy",
  "Transparent Reporting",
  "U.S. & Nigeria Team Expertise",
  "Proven Track Record",
];

const WhyChoose = () => {
  return (
    <section id="why-us" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-gold" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8" style={{ fontFamily: 'Rye, serif' }}>
              Why Ride With SalesCowboy?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We combine the best of both worlds: U.S. marketing expertise with Nigerian creativity and hustle. This unique blend gives us a global edge and local insight that most agencies can't match.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border hover-lift"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-semibold">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
