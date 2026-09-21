"use client";

import React from "react";
import Image from "next/image";
import { brand } from "@/data/content";

export function WhatsAppFab() {
  return (
    <a
      href={brand.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:block fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform duration-300 drop-shadow-[0_8px_30px_rgba(37,211,102,0.4)]"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        <Image
          src="/images/c_whatsapp.png"
          alt="WhatsApp"
          fill
          sizes="(max-width: 768px) 64px, 80px"
          className="object-contain"
        />
      </div>
    </a>
  );
}
