/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Providers } from "./providers";
import "@/index.css";
import PageViewTracker from "@/components/PageViewTracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sales Cowboy Marketing Nigeria | Web, Mobile and Desktop App Development, SEO & Ads That Convert",
  description: "Bold digital marketing strategies for Nigerian businesses. Expert web & mobile development, SEO dominance, and high-ROI Facebook & Google Ads campaigns across Lagos, Abuja & Nigeria.",
  keywords: "digital marketing Nigeria, web development Nigeria, SEO Nigeria, Facebook Ads Nigeria, Google Ads Nigeria, marketing agency Lagos, marketing agency Abuja",
  authors: [{ name: "Sales Cowboy Marketing" }],
  openGraph: {
    title: "Sales Cowboy Marketing Nigeria | Digital Marketing That Rides Hard & Wins Big",
    description: "Web development, SEO, Facebook Ads, and Google Ads strategies that conquer the Nigerian market.",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Cowboy Marketing Nigeria",
    description: "Bold digital marketing strategies for Nigerian businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rye&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://salescowboy.com.ng/" />
        <link rel="sitemap" href="/sitemap.xml" />
        <meta name="geo.position" content="6.5244;3.3792" />
        <meta name="ICBM" content="6.5244, 3.3792" />
        <meta name="geo.placename" content="Nigeria" />
        <meta name="geo.region" content="NG" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Sales Cowboy Marketing",
              "image": "https://salescowboy.com.ng/assets/salescowboy-logo.png",
              "description": "Bold digital marketing strategies for Nigerian businesses. Expert web development, SEO, and high-ROI ad campaigns.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Red Brick House, Peace Land Estate, Ogombo, Ajah",
                "addressLocality": "Lagos",
                "addressRegion": "Lagos State",
                "addressCountry": "NG"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Lagos",
                  "addressCountry": "NG",
                },
                {
                  "@type": "City",
                  "name": "Abuja",
                  "addressCountry": "NG",
                },
                {
                  "@type": "State",
                  "name": "Nigeria",
                  "addressCountry": "NG",
                },
              ],
              "url": "https://salescowboy.com.ng",
              "telephone": "+234",
              "sameAs": [
                "https://www.facebook.com/share/14bB9mYQd5p/",
                "https://www.instagram.com/salescowboymarketing",
              ],
              "priceRange": "₦",
              "serviceType": ["Digital Marketing", "Web Development", "SEO", "Social Media Ads", "Real Estate Marketing"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sales Cowboy Marketing",
              "url": "https://salescowboy.com.ng",
              "logo": "https://salescowboy.com.ng/assets/salescowboy-logo.png",
              "description": "Digital marketing agency in Nigeria offering web development, SEO, and ad services.",
              "foundingDate": "2023",
              "foundingLocation": "Nigeria",
              "sameAs": [
                "https://www.facebook.com/share/14bB9mYQd5p/",
                "https://www.instagram.com/salescowboymarketing",
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "areaServed": "NG",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Sales Cowboy Marketing",
              "url": "https://salescowboy.com.ng",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://salescowboy.com.ng/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '362932362737714');`,
          }}
        />
      </head>
      <body className={inter.variable}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=362932362737714&ev=PageView&noscript=1"
            alt="Facebook pixel"
          />
        </noscript>
        <Providers>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
