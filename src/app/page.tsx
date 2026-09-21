import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";

import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhyUs } from "@/components/sections/WhyUs";
import { Schemes } from "@/components/sections/Schemes";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main className="flex min-h-screen flex-col relative overflow-clip pb-[72px] md:pb-0">
        {/* Global noise overlay */}
        <div className="fixed inset-0 noise-overlay z-0 pointer-events-none" />

        <div className="relative z-10">
          <Hero />
          <Process />
          <Services />
          <Portfolio />
          <WhyUs />
          <Schemes />
          <CtaBand />
          <Contact />
        </div>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
