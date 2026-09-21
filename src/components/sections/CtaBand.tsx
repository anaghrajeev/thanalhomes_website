"use client";

import React from "react";
import { brand } from "@/data/content";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { Phone, MessageCircle } from "lucide-react";

export function CtaBand() {
  return (
    <section className="py-12 md:py-16 bg-bg overflow-hidden relative">
      <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-5xl">
        <BlurFade delay={0.2} inView>
          <div className="relative rounded-3xl bg-dark p-8 sm:p-12 md:p-16 text-center overflow-hidden flex flex-col items-center justify-center gap-8 shadow-raised group hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)] transition-shadow duration-700">
            
            {/* Ambient glow inside card */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-amber/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10">
              <p className="eyebrow text-brand-amber mb-4">Get Started Today</p>
              <h3 className="font-display text-2xl sm:text-3xl md:text-5xl text-bg max-w-2xl leading-tight">
                Not sure where to start?{" "}
                <i className="text-brand-amber group-hover:text-brand-orange transition-colors duration-500">Get a free consultation.</i>
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
              <Button
                asChild
                size="lg"
                className="bg-brand-gradient text-ink font-semibold shadow-orange h-14 px-8 text-base hover:brightness-110 hover:scale-105 transition-all duration-300"
              >
                <a href={brand.contact.phoneUrl}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call {brand.contact.phone}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-[#25D366] text-white hover:bg-[#1fbc58] h-14 px-8 text-base font-semibold hover:scale-105 transition-all duration-300 shadow-soft"
              >
                <a href={brand.contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>

            <BorderBeam
              size={350}
              duration={10}
              delay={0}
              colorFrom="var(--color-brand-orange)"
              colorTo="var(--color-brand-amber)"
            />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
