import { Smartphone, Globe, Code2, Database, Zap, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const developmentTypes = [
  {
    icon: Globe,
    title: "Web Applications",
    description: "Custom web apps built with modern frameworks. From e-commerce platforms to SaaS solutions, we build scalable applications that grow with your business.",
    features: ["React, Next.js, Vue.js", "Full-stack development", "API integration", "Cloud deployment"],
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps for iOS and Android. We create intuitive, high-performance apps that users love.",
    features: ["iOS & Android", "React Native, Flutter", "App Store optimization", "Push notifications"],
  },
  {
    icon: Code2,
    title: "Custom Software",
    description: "Tailored software solutions designed specifically for your workflow. Automate processes, streamline operations, and boost productivity.",
    features: ["Business automation", "CRM systems", "Inventory management", "Custom integrations"],
  },
  {
    icon: Database,
    title: "Backend Systems",
    description: "Robust backend infrastructure and APIs. Secure, scalable server architecture that powers your applications.",
    features: ["REST & GraphQL APIs", "Database design", "Cloud infrastructure", "Security & compliance"],
  },
  {
    icon: Zap,
    title: "Progressive Web Apps",
    description: "PWAs that combine the best of web and mobile. Fast, installable, and work offline—delivering app-like experiences.",
    features: ["Offline functionality", "Push notifications", "App-like experience", "Fast loading"],
  },
  {
    icon: Shield,
    title: "Maintenance & Support",
    description: "Ongoing maintenance, updates, and support to keep your applications running smoothly and securely.",
    features: ["24/7 monitoring", "Security updates", "Performance optimization", "Feature enhancements"],
  },
];

const SoftwareDevelopment = () => {
  return (
    <section id="software-development" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Rye, serif' }}>
            Software Development
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We build powerful web and mobile applications that drive your business forward. From concept to deployment, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {developmentTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <Card 
                key={index} 
                className="bg-background border-border hover-lift hover-glow group transition-all duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{type.title}</h3>
                  <p className="text-muted-foreground">{type.description}</p>
                  <ul className="space-y-2 pt-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-accent mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SoftwareDevelopment;
