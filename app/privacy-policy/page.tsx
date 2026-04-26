import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SalesCowboy Marketing",
  description: "Our privacy policy and how we protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 
          className="text-5xl md:text-6xl font-bold mb-12 text-center" 
          style={{ fontFamily: "Rye, serif" }}
        >
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-lg leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
            <p>
              Welcome to SalesCowboy Marketing ("we," "our," or "us"). We are committed to protecting your personal data and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website salescowboy.com, including any other media form, media channel, mobile website, or mobile application related or connected thereto.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our services, such as through our contact form. This information may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact data (Email address, Phone number)</li>
              <li>Business information (Business name)</li>
              <li>Location data (City, State)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our website and services.</li>
              <li>Improve, personalize, and expand our website.</li>
              <li>Understand and analyze how you use our website.</li>
              <li>Develop new products, services, features, and functionality.</li>
              <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">4. Advertising and Analytics</h2>
            <p>
              We use tools like the Facebook Pixel (Meta Pixel) and Conversions API (CAPI) to track user activity on our site. This helps us measure the effectiveness of our advertising campaigns and provide more relevant content to you. These tools collect information about your browser, device, and how you interact with our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">5. Data Protection</h2>
            <p>
              We prioritize the security of your data. We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">6. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="font-semibold text-foreground">
              Email: hello@salescowboy.com<br />
              WhatsApp: +234 810 493 3232
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
