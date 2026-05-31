"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
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

const PageViewTracker = () => {
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!hasMounted.current) {
      hasMounted.current = true;
    }

    const eventId = crypto.randomUUID();

    if (window.fbq) {
      window.fbq("track", "PageView", {}, { eventID: eventId });
    }

    const currentUrl = window.location.href;

    void fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "PageView",
        eventId,
        url: currentUrl,
        userData: {
          fbc: getFbc(),
          fbp: getFbp(),
        },
        customData: {
          currency: "NGN",
          source: "website",
        },
      }),
    }).catch((error) => {
      console.error("[PageViewTracker] Failed to send CAPI event", error);
    });
  }, [pathname]);

  return null;
};

export default PageViewTracker;
