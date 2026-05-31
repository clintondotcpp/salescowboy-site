"use client";

import React from "react";

interface TrackedWhatsAppLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  eventName?: string;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

function getFbc(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const cookieFbc = getCookie("_fbc");
  if (cookieFbc) return cookieFbc;
  
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get("fbclid");
  if (fbclid) {
    const creationTime = Date.now();
    return `fb.1.${creationTime}.${fbclid}`;
  }
  return undefined;
}

function getFbp(): string | undefined {
  return getCookie("_fbp");
}

const TrackedWhatsAppLink = ({ 
  href, 
  className, 
  children, 
  eventName = "Lead" 
}: TrackedWhatsAppLinkProps) => {
  const handleClick = async (e: React.MouseEvent) => {
    // STRATEGIC INTERCEPTION: If the page contains the Lead Qualification Form, 
    // prevent users from bypassing it. Scroll them to the form to collect Email/Phone 
    // and DO NOT fire the Purchase event prematurely!
    const qualifyForm = typeof document !== "undefined" ? document.getElementById("qualify-form") : null;
    if (qualifyForm && href.includes("wa.me")) {
      e.preventDefault();
      qualifyForm.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // If no form exists on the page (or it's not a WA link), proceed with standard parallel tracking
    
    const eventId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    
    // Pixel tracking
    if (typeof window !== "undefined" && window.fbq) {
      console.log(`[TrackedWhatsAppLink] Firing Pixel Lead event...`);
      window.fbq("track", "Lead", { 
        content_name: "WhatsApp Button Click",
        content_category: "Conversion",
        value: 0,
        currency: "NGN"
      }, { eventID: eventId });

      console.log(`[TrackedWhatsAppLink] Firing Pixel Purchase event...`);
      window.fbq("track", "Purchase", { 
        content_name: "WhatsApp Button Click",
        content_category: "Conversion",
        value: 0,
        currency: "NGN"
      }, { eventID: "purchase-" + eventId });
    }

    // CAPI tracking
    try {
      console.log(`[TrackedWhatsAppLink] Sending CAPI Lead event...`);
      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "Lead",
          eventId,
          url: typeof window !== "undefined" ? window.location.href : "",
          userData: {
            fbc: getFbc(),
            fbp: getFbp(),
          },
          customData: { 
            content_name: "WhatsApp Button Click",
            value: 0,
            currency: "NGN"
          },
        }),
      }).catch((err) => console.error(err));

      console.log(`[TrackedWhatsAppLink] Sending CAPI Purchase event...`);
      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "Purchase",
          eventId: "purchase-" + eventId,
          url: typeof window !== "undefined" ? window.location.href : "",
          userData: {
            fbc: getFbc(),
            fbp: getFbp(),
          },
          customData: { 
            content_name: "WhatsApp Button Click",
            value: 0,
            currency: "NGN"
          },
        }),
      }).catch((err) => console.error(err));
    } catch (error) {
      console.error("[TrackedWhatsAppLink] Tracking error:", error);
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};

export default TrackedWhatsAppLink;
