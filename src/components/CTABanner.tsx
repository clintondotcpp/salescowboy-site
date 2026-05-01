import { Button } from "@/components/ui/button";
import Image from "next/image";

const CTABanner = () => {
  return (
    <section 
      className="relative py-32 overflow-hidden"
    >
      <Image
        src="/assets/sunset-cta.jpg"
        alt="CTA Background"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-background/70" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground" style={{ fontFamily: 'Rye, serif' }}>
            Your Brand Deserves a Wild Ride.
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground">
            Let's build something legendary.
          </p>

          <Button 
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-8 text-xl hover-lift hover-glow shadow-glow"
          >
            <a href="#contact">Book a Free Consultation</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
