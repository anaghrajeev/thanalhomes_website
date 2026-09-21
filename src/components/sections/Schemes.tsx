"use client";

import React from "react";
import { schemes, figures } from "@/data/content";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { BlurFade } from "@/components/ui/blur-fade";

export function Schemes() {
  return (
    <section id="schemes" className="py-14 md:py-24 bg-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(var(--color-ink) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-7xl relative z-10">

        {/* ── Header ────────────────────────────────────────── */}
        <BlurFade delay={0.1} inView>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-16">
            <div className="max-w-2xl">
              <p className="eyebrow text-ink-soft mb-3">Housing Schemes</p>
              <h3 className="h2-fluid font-display text-ink leading-tight">
                Flexible options to build your future
              </h3>
            </div>
            <p className="text-ink-soft max-w-sm body-base">
              Whether you own land or are looking to purchase, we have structured plans to make your dream home a reality.
            </p>
          </div>
        </BlurFade>

        {/* ── Scheme Cards ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mb-14 md:mb-20">

          {/* Card 1 — Large */}
          <BlurFade delay={0.2} inView className="md:col-span-7 block h-full">
            <a
              href="#contact"
              className="bg-bg-alt rounded-2xl p-7 md:p-12 relative overflow-hidden group border border-line hover:border-brand-amber/50 transition-all duration-500 hover:shadow-orange cursor-pointer flex flex-col h-full h-full"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image 
                  src={schemes[0].image!} 
                  alt="" 
                  fill 
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-15 mix-blend-multiply group-hover:scale-105 group-hover:opacity-70 group-hover:mix-blend-normal group-hover:grayscale-0 transition-all duration-700 grayscale"
                />
                {/* Contrast Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-bg-alt via-bg-alt/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between gap-10 min-h-[220px] md:min-h-[280px]">
                <div>
                  {schemes[0].badge && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full border border-line text-xs uppercase tracking-wider font-medium text-ink-soft mb-6 bg-bg/70 shadow-sm">
                      {schemes[0].badge}
                    </span>
                  )}
                  <h4 className="font-display text-2xl sm:text-3xl md:text-5xl text-ink max-w-md leading-tight group-hover:text-brand-orange-text transition-colors duration-500">
                    {schemes[0].title}
                  </h4>
                </div>
                <div className="flex items-center gap-3 text-ink font-semibold">
                  <span className="w-10 h-10 rounded-full bg-bg flex items-center justify-center shadow-soft group-hover:bg-brand-orange group-hover:shadow-orange transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-brand-orange group-hover:text-ink group-hover:translate-x-0.5 transition-all" />
                  </span>
                  Explore Plan
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-bg/60 to-transparent pointer-events-none" />
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-amber/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </a>
          </BlurFade>

          {/* Right column */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-5 h-full">
            {/* Card 2 */}
            <BlurFade delay={0.3} inView className="flex-1">
              <a
                href="#contact"
                className="h-full bg-dark rounded-2xl p-7 md:p-8 relative overflow-hidden group cursor-pointer hover:ring-1 hover:ring-brand-orange/30 transition-all duration-500 block hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image 
                    src={schemes[1].image!} 
                    alt="" 
                    fill 
                    className="object-cover opacity-10 group-hover:scale-105 group-hover:opacity-50 group-hover:grayscale-0 transition-all duration-700 grayscale"
                  />
                  {/* Contrast Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between gap-5">
                  <div>
                    {schemes[1].badge && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full border border-bg/20 text-xs uppercase tracking-wider font-medium text-bg/60 mb-5 bg-bg/5">
                        {schemes[1].badge}
                      </span>
                    )}
                    <h4 className="font-display text-xl md:text-3xl text-bg leading-snug min-h-[60px] group-hover:text-brand-amber transition-colors duration-500">
                      {schemes[1].title}
                    </h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-bg/10 flex items-center justify-center border border-bg/20 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-bg group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-amber/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </a>
            </BlurFade>

            {/* Card 3 */}
            <BlurFade delay={0.4} inView className="flex-1">
              <a
                href="#contact"
                className="h-full bg-bg border border-line rounded-2xl p-7 md:p-8 relative group hover:border-brand-amber/50 hover:shadow-orange transition-all duration-500 cursor-pointer block overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image 
                    src={schemes[2].image!} 
                    alt="" 
                    fill 
                    className="object-cover opacity-[0.08] mix-blend-multiply group-hover:scale-105 group-hover:opacity-60 group-hover:mix-blend-normal group-hover:grayscale-0 transition-all duration-700 grayscale"
                  />
                  {/* Contrast Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="relative z-10 flex items-center justify-between h-full min-h-[80px]">
                  <h4 className="font-display text-xl md:text-2xl text-ink leading-snug max-w-[75%] group-hover:text-brand-orange-text transition-colors duration-500">
                    {schemes[2].title}
                  </h4>
                  <div className="w-10 h-10 rounded-full bg-bg-alt flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:shadow-orange transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-ink-soft group-hover:text-ink group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-amber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </a>
            </BlurFade>
          </div>
        </div>

        {/* ── Figures Panel ─────────────────────────────────── */}
        <BlurFade delay={0.5} inView>
          <div className="bg-dark rounded-3xl p-8 md:p-14 lg:p-16 relative overflow-hidden shadow-raised group hover:shadow-[0_20px_60px_rgba(230,145,15,0.15)] transition-shadow duration-700">
            <div className="text-center mb-12 md:mb-16">
              <p className="eyebrow text-brand-amber mb-3">Key Figures</p>
              <h4 className="font-display text-2xl md:text-4xl text-bg mt-2">Transparent Pricing</h4>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6 relative z-10">
              {figures.map((fig, idx) => (
                <BlurFade 
                  key={idx} 
                  delay={0.6 + (idx * 0.1)} 
                  inView
                  className={idx === figures.length - 1 && figures.length % 2 !== 0 ? "col-span-2 md:col-span-1" : ""}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-baseline gap-1.5 mb-3 flex-wrap justify-center">
                      <NumberTicker
                        value={fig.value}
                        decimalPlaces={fig.value % 1 !== 0 ? 2 : 0}
                        className="font-display text-4xl sm:text-5xl md:text-6xl text-brand-gradient tabular-nums tracking-tighter"
                      />
                      <span className="font-medium text-bg/50 text-sm md:text-base leading-tight">{fig.unit}</span>
                    </div>
                    <p className="text-xs md:text-sm text-bg/70 font-medium leading-snug">{fig.label}</p>
                  </div>
                </BlurFade>
              ))}
            </div>

            <p className="text-center text-xs text-bg/35 mt-12 max-w-lg mx-auto relative z-10">
              * Rates and loan terms are indicative and subject to change. Please contact us for current details.
            </p>

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100" style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(230,145,15,0.12), transparent 65%)" }} />
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
