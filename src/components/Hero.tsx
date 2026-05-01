import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Image
        src="/assets/hero-bg.jpg"
        alt="SalesCowboy Hero Background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90" />
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cowboy-gold rounded-full animate-pulse delay-75" />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-accent rounded-full animate-pulse delay-150" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <a 
            href="/website-promo" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-accent mb-8 hover:bg-primary/20 transition-all group"
          >
            <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold tracking-wide uppercase">Limited Offer: Get a Website for ₦75,000</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground" style={{ fontFamily: 'Rye, serif' }}>
            Ride Your Brand to the Top.
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Web, SEO, and Ad Strategies That Conquer the Nigerian Market.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg hover-lift hover-glow shadow-glow"
            >
              <a href="#contact">Book a Strategy Call</a>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg hover-lift"
            >
              <a href="#results">See Our Work</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
