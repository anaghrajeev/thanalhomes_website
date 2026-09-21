"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/content";

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-bg overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-5 sm:px-8 md:px-14">
        {/* Header */}
        <div className="mb-12 md:mb-20 text-center max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow text-ink-soft mb-4"
          >
            Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h2-fluid font-display text-ink leading-tight mb-6"
          >
            Our Latest <i className="text-brand-orange">Projects</i>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="body-base text-ink-soft"
          >
            A glimpse into the homes we've brought to life. High-quality construction meeting timeless design.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.1 }}
              className="group cursor-pointer flex flex-col gap-4"
            >
              {/* Image Container with Hover */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-line">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-bg/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-ink shadow-sm">
                  {project.category}
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-1 px-2">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-display text-xl sm:text-2xl text-ink leading-tight group-hover:text-brand-orange transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-sm font-medium text-ink-soft whitespace-nowrap pt-1">
                    {project.location}
                  </span>
                </div>
                <p className="text-sm text-ink-soft/80">{project.specs}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
