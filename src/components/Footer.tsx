import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-2">
            <Image src="/assets/salescowboy-logo.png" alt="SalesCowboy Marketing" className="h-16 w-auto mb-4" width={200} height={64} />
            <p className="text-muted-foreground max-w-md">
              Bold digital marketing strategies for Nigerian businesses. We ride hard and win big for our clients across Nigeria.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-muted-foreground hover:text-accent transition-colors">Marketing</a></li>
              <li><a href="#software-development" className="text-muted-foreground hover:text-accent transition-colors">Development</a></li>
              <li><a href="#results" className="text-muted-foreground hover:text-accent transition-colors">Case Studies</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Industries</h3>
            <ul className="space-y-2">
              <li><a href="/real-estate-agents" className="text-muted-foreground hover:text-accent transition-colors">Real Estate</a></li>
              <li><a href="#construction" className="text-muted-foreground hover:text-accent transition-colors">Construction</a></li>
              <li><a href="#interior-design" className="text-muted-foreground hover:text-accent transition-colors">Interior Design</a></li>
              <li><a href="#cleaning" className="text-muted-foreground hover:text-accent transition-colors">Cleaning</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/14bB9mYQd5p/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all hover-lift">
                <Facebook className="w-5 h-5 text-foreground" />
              </a>
              <a href="https://www.instagram.com/salescowboymarketing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all hover-lift">
                <Instagram className="w-5 h-5 text-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 SalesCowboy Marketing Nigeria. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <a href="/privacy-policy" className="hover:text-accent transition-colors underline-offset-4 hover:underline">Privacy Policy</a>
              <a href="/terms" className="hover:text-accent transition-colors underline-offset-4 hover:underline">Terms of Service</a>
            </div>
          </div>
          <p className="text-accent font-semibold" style={{ fontFamily: 'Rye, serif' }}>
            Marketing That Rides Hard and Wins Big.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
