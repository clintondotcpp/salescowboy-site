import { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Clock, Globe, Briefcase, Mail, MessageSquare, MapPin, LayoutDashboard, ArrowRight, XCircle } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";

export const metadata: Metadata = {
  title: "Get a Premium Website for ₦75,000 | SalesCowboy Marketing",
  description: "Stop losing customers. Get a fully functional website, business email, and Google Maps setup in 48-72 hours for just ₦75,000. No hidden fees.",
};

export default function WebsitePromo() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      
      {/* Dynamic Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#0f172a]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background opacity-80" />
        <Image
          src="/assets/hero-bg.jpg"
          alt="Premium Web Background"
          fill
          priority
          sizes="100vw"
          className="object-cover mix-blend-overlay opacity-20"
        />
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 animate-fade-in">
            <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold tracking-wide uppercase">Limited Time Offer</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white max-w-5xl mx-auto leading-tight" style={{ fontFamily: "Rye, serif" }}>
            Create a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Fully Functional</span> Website for just ₦75,000
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Stop losing customers because you don't have a website. We build professional sites with zero hidden fees.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <TrackedWhatsAppLink 
              href="https://wa.me/2348104933232?text=Hi%2C%20I%27m%20interested%20in%20the%20%E2%82%A675k%20Website%20bundle%20for%20my%20business.%20When%20can%20we%20start%3F" 
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white font-bold text-lg rounded-lg hover:bg-[#128C7E] hover:scale-105 transition-all shadow-[0_0_40px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              Start My Website Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </TrackedWhatsAppLink>
          </div>

          <div className="mt-16 flex items-center justify-center gap-2 text-muted-foreground font-medium bg-card/30 backdrop-blur-sm border border-white/5 py-4 px-8 rounded-2xl w-fit mx-auto shadow-xl">
            <Clock className="w-6 h-6 text-accent" />
            <span className="text-white text-lg">Done for you in <strong className="text-accent">48-72 Hours.</strong></span>
          </div>
        </div>
      </section>

      {/* What They Get (Features Grid) */}
      <section className="py-24 bg-card/50 relative border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Rye, serif" }}>What You Get</h2>
            <p className="text-muted-foreground text-lg">Everything you need to run your business online successfully.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Standard Features */}
            <div className="bg-background border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <Globe className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 text-white">.com.ng Domain</h3>
              <p className="text-muted-foreground">+ 1 year Free Premium Hosting included.</p>
            </div>
            
            <div className="bg-background border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <Mail className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 text-white">Professional Email</h3>
              <p className="text-muted-foreground">e.g., info@yourbusiness.com to build client trust.</p>
            </div>

            <div className="bg-background border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <MessageSquare className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 text-white">WhatsApp Integration</h3>
              <p className="text-muted-foreground">Customers can chat with you directly from your site.</p>
            </div>

            <div className="bg-background border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <MapPin className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 text-white">Google Maps/Business</h3>
              <p className="text-muted-foreground">Profile setup so local customers can find you instantly.</p>
            </div>

            {/* Highlighted Feature */}
            <div className="md:col-span-2 bg-gradient-to-br from-primary/20 via-background to-background border border-primary/50 p-8 rounded-2xl shadow-[0_0_30px_rgba(251,146,60,0.15)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <LayoutDashboard className="w-40 h-40 text-primary" />
              </div>
              <div className="relative z-10 flex flex-col justify-center h-full">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Premium Feature</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">Admin Dashboard</h3>
                <p className="text-xl text-muted-foreground max-w-md">
                  <strong className="text-primary font-bold">Nobody builds you a website with an admin dashboard for N75k.</strong> Manage your site, view leads, and update content easily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-border grid md:grid-cols-2 shadow-2xl">
            {/* The Old Way */}
            <div className="bg-card/40 p-10 backdrop-blur-sm border-b md:border-b-0 md:border-r border-border flex flex-col justify-center text-center opacity-80 grayscale-[50%]">
              <XCircle className="w-12 h-12 text-destructive mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Other Agencies</h3>
              <div className="text-4xl font-black text-muted-foreground mb-4 line-through">₦300k - ₦500k</div>
              <p className="text-muted-foreground text-lg">Hidden fees, sluggish communication, and weeks of waiting.</p>
            </div>
            
            {/* Our Way */}
            <div className="bg-gradient-to-br from-primary/10 to-transparent p-10 flex flex-col justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-6 relative z-10" />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">SalesCowboy Marketing</h3>
              <div className="text-5xl font-black text-white mb-4 relative z-10">₦75,000</div>
              <p className="text-primary/90 text-lg font-medium relative z-10">One flat fee. 48-72 hours delivery. Period.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-24 bg-card/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Rye, serif" }}>We Build All Kinds of Websites</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From real estate to cleaning services, we design custom systems that perfectly match your industry.</p>
          </div>

          {/* Highlighted Solar App */}
          <div className="max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden border border-border shadow-2xl group relative bg-black">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <div className="relative aspect-video">
              <Image 
                src="/website_samples/solar.png" 
                alt="Solar Power Installation Website" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover object-top hover:object-bottom transition-all duration-[10000ms] ease-in-out"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full flex flex-col sm:flex-row items-end justify-between gap-4">
              <div>
                <span className="text-accent font-bold tracking-wide uppercase text-sm mb-2 block">Featured Framework</span>
                <h3 className="text-3xl font-bold text-white">Solar Power Installers</h3>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-white font-medium text-sm">
                Smooth scrolling preview
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
            {[
              { src: "/website_samples/real-estate.png", title: "Real Estate" },
              { src: "/website_samples/construction.png", title: "Construction Company" },
              { src: "/website_samples/cleaning.png", title: "Cleaning Business" },
              { src: "/website_samples/logistics.png", title: "Logistics Company" },
              { src: "/website_samples/shortlet.png", title: "Shortlet Apartments" },
            ].map((site, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden border border-white/10 shadow-lg aspect-[4/3] bg-black">
                <Image 
                  src={site.src} 
                  alt={site.title} 
                  fill 
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h4 className="text-white font-bold text-lg">{site.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-card p-12 rounded-3xl border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/10 to-transparent" />
            <h2 className="text-4xl font-bold text-white mb-6 relative z-10" style={{ fontFamily: "Rye, serif" }}>
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 relative z-10">
              Skip the forms. Send us a quick WhatsApp message and we'll begin your project immediately.
            </p>
            <TrackedWhatsAppLink 
              href="https://wa.me/2348104933232?text=Hi%2C%20I%27m%20interested%20in%20the%20%E2%82%A675k%20Website%20bundle%20for%20my%20business.%20When%20can%20we%20start%3F"
              className="inline-flex px-10 py-5 bg-[#25D366] text-white font-bold text-xl rounded-full hover:bg-[#128C7E] hover:scale-105 transition-all shadow-[0_0_40px_rgba(37,211,102,0.4)] items-center justify-center gap-3 relative z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              Message Us on WhatsApp
            </TrackedWhatsAppLink>
          </div>
        </div>
      </section>

      <WhatsAppButton 
        message="Hi, I'm interested in the ₦75k Website bundle for my business. When can we start?" 
        eventName="Lead" 
      />

    </main>
  );
}
