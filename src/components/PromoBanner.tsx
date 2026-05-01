import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const PromoBanner = () => {
  return (
    <section className="bg-primary/10 py-12 border-y border-primary/20 overflow-hidden relative group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-3 rounded-full animate-pulse shadow-glow">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'Rye, serif' }}>
                Limited Time: Premium Websites for <span className="text-accent underline decoration-primary">₦75,000</span>
              </h2>
              <p className="text-muted-foreground font-medium">
                Domain, Hosting, Professional Email & Admin Dashboard Included. Done in 48-72 hours.
              </p>
            </div>
          </div>
          
          <Link 
            href="/website-promo" 
            className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-elegant"
          >
            Claim This Offer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
