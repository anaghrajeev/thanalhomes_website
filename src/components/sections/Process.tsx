"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { processSteps } from "@/data/content";

function ProcessStep({
  step,
  isActive,
  onClick,
}: {
  step: { id: string; title: string; description: string };
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex md:flex-1 md:flex-col gap-5 md:gap-6 cursor-pointer group ${isActive ? "opacity-100" : "opacity-40 hover:opacity-80"} transition-all duration-500`}
    >
      <div className="flex md:justify-center relative">
        {/* Node */}
        <div className={`w-11 h-11 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center font-display text-sm md:text-lg transition-all duration-500 z-10 shrink-0 shadow-soft relative bg-bg ${isActive ? "border-brand-orange text-brand-orange scale-110 md:scale-125 shadow-[0_0_20px_rgba(230,145,15,0.3)] bg-bg" : "border-line text-ink/50 group-hover:border-brand-orange/50"}`}>
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-brand-orange"
              animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {step.id}
        </div>
      </div>
      
      <div className="md:text-center mt-1.5 md:mt-4 flex-1">
        <h4 className={`font-semibold transition-colors duration-500 ${isActive ? "text-brand-orange text-lg md:text-xl" : "text-ink text-base md:text-lg"}`}>
          {step.title}
        </h4>
        <motion.div
          initial={false}
          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
          className="overflow-hidden"
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-ink-soft text-sm mt-3 leading-relaxed max-w-[280px] md:mx-auto">
            {step.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "end 30%"],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = processSteps.map((_, i) => i / (processSteps.length - 1 || 1));
    const closest = breakpoints.reduce((acc, bp, i) => {
      return Math.abs(latest - bp) < Math.abs(latest - breakpoints[acc]) ? i : acc;
    }, 0);
    if (closest !== activeStep) {
      setActiveStep(closest);
    }
  });

  return (
    <section ref={containerRef} className="pt-14 pb-4 md:pt-28 md:pb-4 bg-bg overflow-hidden relative">
      <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-6xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <p className="eyebrow text-brand-orange mb-3 tracking-widest">OUR PROCESS</p>
          <h3 className="h2-fluid font-display text-ink">How we build your dream</h3>
        </div>

        <div className="relative max-w-sm md:max-w-none mx-auto md:mx-0">
          {/* ── Desktop horizontal line ───────────────────── */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px]">
            <div className="w-full h-full bg-line rounded-full" />
            <motion.div
              className="absolute inset-y-0 left-0 bg-brand-gradient rounded-full"
              style={{ scaleX: lineProgress, transformOrigin: "0% 50%" }}
            />
          </div>

          {/* ── Mobile vertical line ──────────────────────── */}
          <div className="md:hidden absolute top-[22px] bottom-[22px] left-[22px] w-[2px]">
            <div className="w-full h-full bg-line rounded-full" />
            <motion.div
              className="absolute inset-x-0 top-0 bg-brand-gradient rounded-full"
              style={{ scaleY: lineProgress, transformOrigin: "50% 0%" }}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 relative z-10">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step as any}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
