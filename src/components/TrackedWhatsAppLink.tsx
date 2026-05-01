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
  const handleClick = async () => {
    const eventId = crypto.randomUUID();
    
    // Pixel tracking
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", eventName, { content_name: "WhatsApp Button Click" }, { eventID: eventId });
    }

    // CAPI tracking
    try {
      await fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName,
          eventId,
          url: typeof window !== "undefined" ? window.location.href : "",
          userData: {},
          customData: { content_name: "WhatsApp Button Click" },
        }),
      });
    } catch (error) {
      console.error("CAPI error:", error);
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
