import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
  Services,
  DeliveryModel,
  CaseStudies,
  WhoWeServe,
  Process,
  TestimonialsAndFAQ,
  CTABand,
} from "@/components/HomeSections";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white">
      <Header />
      <main>
        {/* 01. Hero & 02. Proof Strip */}
        <Hero />

        {/* 03. Four Strategic Service Divisions */}
        <Services />

        {/* Delivery Model & Direct Accountability (Addressing trust / why one team) */}
        <DeliveryModel />

        {/* 04. Featured Case Studies */}
        <CaseStudies />

        {/* 05. Who We Help (Priority Industries) */}
        <WhoWeServe />

        {/* 06. How Engagement Works (5 Milestones) */}
        <Process />

        {/* 07. Client Testimonials & Objection FAQs */}
        <TestimonialsAndFAQ />

        {/* 08. Conversion & Qualification Form */}
        <Contact />

        {/* Final Conversion Band */}
        <CTABand />
      </main>
      <Footer />
      <WhatsAppButton message="Hello Sales Cowboy! I want to discuss a project for my business." />
    </div>
  );
}
