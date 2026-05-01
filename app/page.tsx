import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import SoftwareDevelopment from "@/components/SoftwareDevelopment";
import RealEstateServices from "@/components/RealEstateServices";
import ConstructionServices from "@/components/ConstructionServices";
import InteriorDesignServices from "@/components/InteriorDesignServices";
import CleaningServices from "@/components/CleaningServices";
import CaseStudies from "@/components/CaseStudies";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PromoBanner />
        <About />
        <Services />
        <SoftwareDevelopment />
        <RealEstateServices />
        <ConstructionServices />
        <InteriorDesignServices />
        <CleaningServices />
        <CaseStudies />
        <WhyChoose />
        <Testimonials />
        <CTABanner />
        <PromoBanner />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
