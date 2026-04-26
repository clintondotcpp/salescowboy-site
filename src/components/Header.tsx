"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-elegant" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center">
          <Image src="/assets/salescowboy-logo.png" alt="SalesCowboy Marketing" className="h-12 w-auto" width={48} height={48} />
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-foreground hover:text-accent transition-colors">
            Services
          </a>
          <a href="/real-estate-agents" className="text-foreground hover:text-accent transition-colors">
            Real Estate
          </a>
          <a href="#software-development" className="text-foreground hover:text-accent transition-colors">
            Development
          </a>
          <a href="#results" className="text-foreground hover:text-accent transition-colors">
            Results
          </a>
          <a href="#why-us" className="text-foreground hover:text-accent transition-colors">
            Why Us
          </a>
          <a href="#contact" className="text-foreground hover:text-accent transition-colors">
            Contact
          </a>
        </nav>

        <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
          <a href="#contact">Book a Strategy Call</a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
