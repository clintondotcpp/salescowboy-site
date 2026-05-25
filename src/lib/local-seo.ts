// Local business information for Sales Cowboy Marketing
export const localBusinessInfo = {
  name: "Sales Cowboy Marketing",
  url: "https://salescowboy.com.ng",
  logo: "https://salescowboy.com.ng/assets/salescowboy-logo.png",
  description: "Bold digital marketing strategies for Nigerian businesses",
  telephone: "+234",
  email: "hello@salescowboy.com.ng",
  
  // Primary locations
  locations: {
    lagos: {
      city: "Lagos",
      state: "Lagos State",
      country: "Nigeria",
      coordinates: {
        latitude: 6.5244,
        longitude: 3.3792,
      },
    },
    abuja: {
      city: "Abuja",
      state: "FCT",
      country: "Nigeria",
      coordinates: {
        latitude: 9.0765,
        longitude: 7.3986,
      },
    },
  },

  // Social media
  socialMedia: {
    facebook: "https://www.facebook.com/share/14bB9mYQd5p/",
    instagram: "https://www.instagram.com/salescowboymarketing",
  },

  // Services offered
  services: [
    "Web Development",
    "Digital Marketing",
    "SEO Services",
    "Social Media Advertising",
    "Facebook Ads",
    "Google Ads",
    "Real Estate Marketing",
    "Business Consultation",
  ],

  // Service areas (states in Nigeria)
  serviceAreas: [
    "Lagos",
    "Abuja",
    "Rivers",
    "Kano",
    "Kaduna",
    "Oyo",
    "Enugu",
    "Akwa Ibom",
    "Bayelsa",
    "Cross River",
    "Delta",
    "Edo",
    "Ekiti",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Plateau",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ],

  // Business hours
  businessHours: {
    monday: { opens: "09:00", closes: "18:00" },
    tuesday: { opens: "09:00", closes: "18:00" },
    wednesday: { opens: "09:00", closes: "18:00" },
    thursday: { opens: "09:00", closes: "18:00" },
    friday: { opens: "09:00", closes: "18:00" },
    saturday: { opens: "10:00", closes: "16:00" },
    sunday: { opens: "closed", closes: "closed" },
  },

  // Keywords
  keywords: [
    "digital marketing Nigeria",
    "web development Nigeria",
    "SEO Nigeria",
    "Facebook Ads Nigeria",
    "Google Ads Nigeria",
    "marketing agency Lagos",
    "marketing agency Abuja",
    "real estate marketing Nigeria",
    "sales funnel optimization",
    "conversion rate optimization",
  ],
};

// Generate schema markup for local business
export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": localBusinessInfo.name,
  "image": localBusinessInfo.logo,
  "description": localBusinessInfo.description,
  "url": localBusinessInfo.url,
  "telephone": localBusinessInfo.telephone,
  "areaServed": localBusinessInfo.serviceAreas.map(area => ({
    "@type": "State",
    "name": area,
    "addressCountry": "NG",
  })),
  "sameAs": [
    localBusinessInfo.socialMedia.facebook,
    localBusinessInfo.socialMedia.instagram,
  ],
});

// Generate service schema
export const generateServiceSchema = (serviceName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "LocalBusiness",
    "name": localBusinessInfo.name,
    "url": localBusinessInfo.url,
  },
  "areaServed": localBusinessInfo.serviceAreas,
});

// Generate FAQPage schema
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
});
