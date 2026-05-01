/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Providers } from "./providers";
import "../src/index.css";
import PageViewTracker from "@/components/PageViewTracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SalesCowboy Marketing Nigeria | Web Development, SEO & Ads That Convert",
  description: "Bold digital marketing strategies for Nigerian businesses. Expert web & mobile development, SEO dominance, and high-ROI Facebook & Google Ads campaigns in Nigeria.",
  authors: [{ name: "SalesCowboy Marketing" }],
  openGraph: {
    title: "SalesCowboy Marketing Nigeria | Digital Marketing That Rides Hard & Wins Big",
    description: "Web development, SEO, Facebook Ads, and Google Ads strategies that conquer the Nigerian market.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SalesCowboy Marketing Nigeria",
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
