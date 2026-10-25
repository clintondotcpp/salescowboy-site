"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-all">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/assets/salescowboy-logo.png"
            alt="Sales Cowboy Marketing Solutions"
            className="h-10 md:h-12 w-auto transition-transform group-hover:scale-102"
            width={175}
            height={120}
            priority
            unoptimized
          />
        </Link>

        {/* Clean, Sleek Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link
            href="/#services"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Divisions
          </Link>
          <Link
            href="/#case-studies"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Case Studies
          </Link>
          <Link
            href="/#about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/#faq"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQs
          </Link>
          <Link
            href="/#contact"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs px-4 py-2 shadow-sm rounded-lg"
          >
            <Link href="/#contact">Get Proposal</Link>
          </Button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Clean Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 pt-3 pb-5 space-y-2.5 shadow-lg text-sm">
          <Link
            href="/#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-foreground font-medium"
          >
            Divisions
          </Link>
          <Link
            href="/#case-studies"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-foreground font-medium"
          >
            Case Studies
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-foreground font-medium"
          >
            How it works
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-foreground font-medium"
          >
            FAQs
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-foreground font-medium"
          >
            Contact
          </Link>
          <div className="pt-2">
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs py-3 rounded-lg"
            >
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                Get Proposal
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
