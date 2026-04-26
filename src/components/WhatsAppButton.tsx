"use client";

import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "2348104933232";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover-glow group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute right-full mr-4 bg-background border border-border px-3 py-1 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none text-foreground">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
