"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { brand } from "@/data/content";

export function MobileBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    // Check on mount too
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg/96 backdrop-blur-xl border-t border-line shadow-raised px-4 py-3 flex gap-3">
      <a
        href={brand.contact.phoneUrl}
        className="flex-1 flex items-center justify-center gap-2 border border-brand-orange text-brand-orange-text bg-brand-orange/8 hover:bg-brand-orange/15 py-3 rounded-full font-semibold text-sm transition-colors"
      >
        <Phone className="w-4 h-4 shrink-0" />
        Call Now
      </a>
      <a
        href={brand.contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-full font-semibold text-sm transition-colors hover:bg-[#1fbc58]"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        WhatsApp
      </a>
    </div>
  );
}
