import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SalesCowboy Marketing",
  description: "Terms and conditions for using our services.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background text-foreground py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 
          className="text-5xl md:text-6xl font-bold mb-12 text-center" 
          style={{ fontFamily: "Rye, serif" }}
        >
          Terms of Service
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-lg leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">2. Services</h2>
            <p>
              SalesCowboy Marketing provides digital marketing, web development, and SEO services. All services are provided "as is" and are subject to availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">3. User Conduct</h2>
            <p>
              Users agree to use the website for lawful purposes only and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of this site by any third party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">4. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of SalesCowboy Marketing and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">5. Limitation of Liability</h2>
            <p>
              SalesCowboy Marketing will not be liable for any damages that arise from the use of, or inability to use, the materials on this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
            </p>
          </section>

          <section className="pt-12 border-t border-border mt-12 text-sm italic">
            <p>Last Updated: April 2026</p>
          </section>
        </div>
      </div>
    </main>
  );
}
