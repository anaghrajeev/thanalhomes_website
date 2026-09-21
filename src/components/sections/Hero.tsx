"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from "framer-motion";
import { useLenis } from "lenis/react";
import { brand, processSteps, videoAssets } from "@/data/content";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Define transform ranges outside the component to keep their references stable
// and prevent Framer Motion from triggering synchronous state updates during React's render phase
const HIGHLIGHT_INPUT = [0.27, 0.54];
const HIGHLIGHT_OUTPUT = [0, 5];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Raw 0-1 progress driven by Lenis scroll events
  const rawProgress = useMotionValue(0);
  const [activeStage, setActiveStage] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // ── Subscribe to Lenis scroll and compute progress from container ──────
  useLenis(({ scroll }) => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const rect = el.getBoundingClientRect();
    const elTop = scroll + rect.top; // absolute top of container
    const elHeight = el.offsetHeight - window.innerHeight;
    if (elHeight <= 0) return;
    const p = Math.max(0, Math.min(1, (scroll - elTop) / elHeight));
    rawProgress.set(p);
  });

  // ── Update active stage from progress ─────────────────────────────────
  useEffect(() => {
    const unsub = rawProgress.on("change", (p) => {
      // Only 2 stages now
      if (p < 0.5) setActiveStage(0);
      else setActiveStage(1);
    });
    return unsub;
  }, [rawProgress]);

  // ── Video scrubbing completely removed ──
  useEffect(() => {}, []);

  // ── Variant definitions ───────────────────────────────────────────────
  const variants = {
    hidden:  { opacity: 0, y: 30, transition: { duration: 0.4, ease: "easeIn"  as const } },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.6, ease: "easeOut" as const } },
    exit:    { opacity: 0, y: -20,transition: { duration: 0.4, ease: "easeIn"  as const } },
  };

  const getVariant = (stage: number) =>
    activeStage === stage ? "visible" : activeStage > stage ? "exit" : "hidden";

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${isReducedMotion ? "h-screen" : "h-[150vh]"}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-dark">

        {/* ── Video ───────────────────────────────────────── */}
        <div className="absolute inset-0">
          {!videoError ? (
            <video
              ref={videoRef}
              src={videoAssets.mp4}
              poster={videoAssets.poster}
              muted
              playsInline
              autoPlay
              preload="auto"
              onLoadedMetadata={() => setVideoReady(true)}
              onError={() => setVideoError(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center bg-dark"
              style={{ backgroundImage: videoAssets.poster ? `url(${videoAssets.poster})` : undefined }}
            />
          )}
          {/* Overlay: Stronger gradient for text visibility */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, rgba(35,38,42,0.95) 0%, rgba(35,38,42,0.5) 50%, rgba(35,38,42,0.2) 100%)"
          }} />
        </div>

        {/* ── Text content ─────────────────────────────────── */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-14">

            {/* Reduced motion: single static view */}
            {isReducedMotion ? (
              <div className="flex flex-col gap-6 max-w-3xl drop-shadow-xl">
                <p className="eyebrow text-brand-amber">{brand.name}</p>
                <h1 className="h1-fluid font-display text-bg leading-tight">
                  Home for all.<br />
                  <i className="text-brand-amber">All for home.</i>
                </h1>
                <p className="body-base text-bg/90 max-w-xl">
                  From Planning — Agreement — Bank loan — Permit — to Completing the HOME construction.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild size="lg" className="bg-brand-gradient text-ink font-semibold shadow-orange hover:scale-105 transition-transform">
                    <a href="#contact">Free consultation</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-bg/40 text-bg hover:bg-bg/10 hover:scale-105 transition-transform">
                    <a href={brand.contact.whatsapp} target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              /* Only 2 stages always rendered — controlled by animate variant */
              <div className="relative max-w-3xl drop-shadow-2xl">

                {/* Stage 0 — Headline */}
                <motion.div
                  className="absolute inset-x-0 top-0 -translate-y-1/2"
                  animate={getVariant(0)}
                  variants={variants}
                  initial="hidden"
                >
                  <p className="eyebrow text-brand-amber mb-4 drop-shadow-md">{brand.name}</p>
                  <h1 className="h1-fluid font-display text-bg leading-tight mb-8">
                    Home for all.<br />
                    <i className="text-brand-amber">All for home.</i>
                  </h1>
                  {/* Scroll indicator */}
                  <div className="flex items-center gap-3 opacity-70">
                    <span className="text-xs uppercase tracking-widest text-bg drop-shadow-md">Scroll</span>
                    <div className="w-10 h-px bg-bg/50 overflow-hidden relative">
                      <motion.div
                        className="absolute inset-y-0 w-full bg-bg"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Stage 1 — CTA */}
                <motion.div
                  className="absolute inset-x-0 top-0 -translate-y-1/2"
                  animate={getVariant(1)}
                  variants={variants}
                  initial="hidden"
                >
                  <h2 className="h2-fluid font-display text-bg leading-tight mb-6">
                    Ready to build your <br className="hidden sm:block" />
                    <i className="text-brand-amber">dream home?</i>
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-brand-gradient text-ink font-semibold shadow-orange hover:scale-105 transition-transform">
                      <a href="#contact">Free consultation</a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-bg/40 text-bg hover:bg-bg/10 hover:scale-105 transition-transform bg-dark/20 backdrop-blur-sm">
                      <a href={brand.contact.whatsapp} target="_blank" rel="noopener noreferrer">
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </div>
                </motion.div>

              </div>
            )}
          </div>
        </div>

        {/* ── Progress bar ──────────────────────────────────── */}
        {!isReducedMotion && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-bg/10">
            <motion.div
              className="h-full bg-brand-gradient"
              style={{ scaleX: rawProgress, transformOrigin: "0% 50%" }}
            />
          </div>
        )}

        {/* ── Stage dots indicator ──────────────────────────── */}
        {!isReducedMotion && (
          <div className="absolute bottom-6 right-6 flex gap-2">
            {[0,1].map(s => (
              <div
                key={s}
                className={`rounded-full transition-all duration-400 ${
                  activeStage === s
                    ? "w-6 h-2 bg-brand-amber shadow-[0_0_10px_rgba(247,176,26,0.5)]"
                    : "w-2 h-2 bg-bg/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
