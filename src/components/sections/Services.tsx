"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { services } from "@/data/content";

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardLength = services.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = services.map((_, i) => i / cardLength);
    const closest = breakpoints.reduce((acc, bp, i) => {
      return Math.abs(latest - bp) < Math.abs(latest - breakpoints[acc]) ? i : acc;
    }, 0);
    setActiveCard(closest);
  });

  return (
    <section id="services" ref={containerRef} className="relative bg-bg h-[300vh] md:h-[400vh] overflow-clip">
      <div className="sticky top-0 h-[100svh] w-full flex items-center will-change-transform [transform:translateZ(0)]">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
          
          {/* Ambient glowing blobs */}
          <motion.div 
            className="absolute -top-40 -right-40 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-orange/5 blur-[100px]"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-brand-amber/5 blur-[120px]"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        <div className="container mx-auto px-5 sm:px-8 md:px-12 w-full h-full py-20 md:py-28 flex flex-col md:flex-row gap-8 md:gap-16 relative z-10">

          {/* ── Left: Content ─────────────────────────────── */}
          <div className="w-full h-full md:w-1/2 flex flex-col justify-center relative">
            <p className="eyebrow text-ink-soft mb-6 md:mb-10">Our Services</p>

            {/* Progress dots */}
            <div className="flex gap-2 mb-8">
              {services.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === activeCard ? "w-8 bg-brand-orange" : "w-2 bg-line"
                  }`}
                />
              ))}
            </div>

            <div className="relative h-56 sm:h-64 md:h-80 w-full">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="absolute inset-0 flex flex-col justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0,
                    y: activeCard === index ? 0 : activeCard > index ? -20 : 20,
                    pointerEvents: activeCard === index ? "auto" : "none",
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="font-display text-4xl md:text-6xl text-brand-orange/25 mb-2 leading-none select-none">
                    {service.id}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-ink mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="body-base text-ink-soft max-w-md">{service.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Mobile inline image */}
            <div className="flex-1 w-full min-h-[250px] md:hidden mt-4 relative pointer-events-none">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`absolute inset-0 bg-contain bg-center bg-no-repeat transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeCard === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ backgroundImage: `url(${service.image})` }}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Floating Image (Desktop) ──────────────── */}
          <div className="hidden md:flex w-full md:w-1/2 h-full items-center justify-center relative pointer-events-none -mr-4 lg:-mr-12 xl:-mr-24">
            <div className="w-[120%] h-[90%] lg:w-[140%] lg:h-[100%] xl:w-[160%] xl:h-[120%] relative">
              {services.map((service, index) => (
                <motion.div
                  key={`img-${service.id}`}
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat mix-blend-multiply origin-center"
                  initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0,
                    scale: activeCard === index ? 1 : 0.92,
                    filter: activeCard === index ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ backgroundImage: `url(${service.image})` }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
