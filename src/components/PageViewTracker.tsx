"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
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
        userData: {},
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
