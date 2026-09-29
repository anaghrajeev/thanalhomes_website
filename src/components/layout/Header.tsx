"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { brand } from "@/data/content";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Schemes", href: "#schemes" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-5xl"
    >
      <div
        className={`flex items-center justify-between px-4 sm:px-5 md:px-6 rounded-full border border-line backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "h-14 md:h-16 bg-bg/96 shadow-raised"
            : "h-16 md:h-[72px] bg-bg/90 shadow-soft"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center py-2 shrink-0">
          <img
            src="/images/bdgthomes-logo.png"
            alt="Budget Homes"
            className={`object-contain transition-all duration-300 ${
              scrolled ? "h-6 sm:h-7" : "h-7 sm:h-8 md:h-10"
            }`}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-ink-soft hover:text-brand-orange transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button asChild className="bg-brand-gradient text-ink font-semibold shadow-orange hover:brightness-110 h-9 px-5 text-sm">
            <a href="#contact">Free consultation</a>
          </Button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full text-ink hover:bg-ink/5 transition-colors"
                aria-label="Open menu"
              />
            }>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[360px] bg-bg border-l border-line p-0">
              <div className="flex flex-col h-full">
                {/* Sheet header */}
                <div className="flex items-center justify-between p-6 border-b border-line">
                  <img src="/images/bdgthomes-logo.png" alt="Budget Homes" className="h-8 object-contain" />
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col p-6 gap-1 flex-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-ink hover:text-brand-orange hover:bg-brand-orange/5 transition-colors px-4 py-3 rounded-xl"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                {/* CTAs */}
                <div className="p-6 border-t border-line flex flex-col gap-3">
                  <Button asChild className="w-full bg-brand-gradient text-ink font-semibold shadow-orange">
                    <a href="#contact" onClick={() => setIsOpen(false)}>Free consultation</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href={brand.contact.phoneUrl}>Call Us</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
