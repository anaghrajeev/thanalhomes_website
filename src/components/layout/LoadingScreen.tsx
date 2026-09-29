"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dismiss = () => {
      setIsLoading(false);
    };

    const checkVideo = () => {
      const video = document.querySelector('video');
      if (video && video.readyState < 2) {
        video.addEventListener('loadeddata', () => {
          setTimeout(dismiss, 1000); 
        }, { once: true });
      } else {
        setTimeout(dismiss, 1500);
      }
    };

    if (document.readyState === "complete") {
      checkVideo();
    } else {
      window.addEventListener("load", checkVideo);
    }

    // Absolute fallback: always dismiss after 4 seconds regardless of load state
    const fallback = setTimeout(dismiss, 4000);

    return () => {
      window.removeEventListener("load", checkVideo);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-brand-gradient opacity-5 mix-blend-multiply" />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            <div className="w-56 h-28 md:w-72 md:h-36 relative mb-8">
              {/* Pulsating glow behind the logo */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.15, 0.9] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-brand-amber/30 blur-3xl rounded-full z-0 pointer-events-none"
              />
              <Image 
                src="/images/bdjet-homes.png" 
                alt="Budget Homes" 
                fill 
                sizes="(max-width: 768px) 250px, 350px"
                className="object-contain relative z-10"
                priority
              />
            </div>
            
            {/* Elegant loading line */}
            <div className="w-48 h-px bg-line relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-brand-gradient w-1/2 rounded-full"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
