"use client";

import React from "react";
import { googleReviews } from "@/data/content";
import { Marquee } from "@/components/ui/marquee";
import { Star, Quote } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "framer-motion";
import Image from "next/image";

export function WhyUs() {
  const marqueePhrases = [
    "Trusted by families",
    "5-Star Rated Construction",
    "On-Time Delivery",
    "Quality Assured",
    "Transparent Pricing",
  ];

  return (
    <section
      id="reviews"
      className="bg-dark pt-8 md:pt-14 border-t border-bg/5 overflow-hidden relative"
    >
      {/* ── Marquee band ───────────────────────────────────── */}
      <div className="mb-14 md:mb-20 w-full transform -rotate-2 scale-105 origin-center">
        <div className="bg-brand-gradient py-3 md:py-4">
          <Marquee className="[--duration:50s]" repeat={5}>
            {marqueePhrases.map((phrase, idx) => (
              <span
                key={idx}
                className="font-display text-xl md:text-3xl text-ink mx-4 flex items-center gap-6 md:gap-8 whitespace-nowrap"
              >
                {phrase}
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-dark/25 block shrink-0" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* ── Cards ─────────────────────────────────────────── */}
      <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-7xl pb-14 md:pb-24">
        <div className="text-center mb-10 md:mb-16 flex flex-col items-center">
          <p className="eyebrow text-brand-amber mb-3">Client Stories</p>
          <h3 className="h2-fluid font-display text-bg mb-6">What our customers say</h3>
          <div className="w-64 md:w-80 h-16 md:h-20 relative">
            <Image 
              src="/images/5star.png" 
              alt="5 Star Google Reviews" 
              fill 
              sizes="(max-width: 768px) 250px, 320px"
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>

        <div className="-mx-5 sm:mx-0 relative">
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
          
          <Marquee pauseOnHover className="[--duration:40s]" repeat={4}>
            {googleReviews.map((review, index) => (
              <div key={index} className="mx-3 sm:mx-4 w-[85vw] sm:w-[380px] shrink-0 h-full py-2">
                <div 
                  className="bg-white p-6 h-full flex flex-col gap-4 rounded-xl border border-gray-200 shadow-sm text-left hover:shadow-md transition-shadow"
                >
                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg shrink-0">
                      {review.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight">{review.author}</h4>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                  
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-gray-200 text-gray-200"}`} 
                      />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <p className="font-sans text-gray-700 text-sm leading-relaxed flex-1">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay mix-blend-overlay pointer-events-none" />
    </section>
  );
}
