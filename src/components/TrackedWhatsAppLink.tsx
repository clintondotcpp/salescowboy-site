"use client";

import React from "react";

interface TrackedWhatsAppLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  eventName?: string;
}

const TrackedWhatsAppLink = ({ 
  href, 
  className, 
  children, 
  eventName = "Lead" 
}: TrackedWhatsAppLinkProps) => {
  const handleClick = async (e: React.MouseEvent) => {
    // We don't prevent default as we want the link to open, 
    // but we fire tracking first or in parallel.
    
    const eventId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    
    // Pixel tracking
    if (typeof window !== "undefined" && window.fbq) {
      console.log(`[TrackedWhatsAppLink] Firing Pixel ${eventName} event...`);
      window.fbq("track", eventName, { 
        content_name: "WhatsApp Button Click",
        content_category: "Conversion",
        value: 0,
        currency: "NGN"
      }, { eventID: eventId });
    }

    // CAPI tracking
    try {
      console.log(`[TrackedWhatsAppLink] Sending CAPI ${eventName} event...`);
      const response = await fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName,
          eventId,
          url: typeof window !== "undefined" ? window.location.href : "",
          userData: {},
          customData: { 
            content_name: "WhatsApp Button Click",
            value: 0,
            currency: "NGN"
          },
        }),
      });
      const data = await response.json();
      console.log(`[TrackedWhatsAppLink] CAPI Response:`, data);
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
