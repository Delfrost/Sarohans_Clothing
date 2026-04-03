"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroSection from "../components/sections/LandingPage2";
import { HeritageStrip } from "../components/sections/LandingPage";
import Categories from "../components/sections/Categories5";
import CustomerReviews from "../components/sections/CustomerReviews";
import SaroHansShowcase from "../components/sections/Categories6";
import CraftsmanshipJourney from "../components/sections/CraftsmanshipJourney";
import GoldParticles from "../components/ui/GoldParticles";

// ─── Cinematic section divider ────────────────────────────────────────────────
function SectionTransition({ variant = "default" }: { variant?: "default" | "grand" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      style={{
        position: "relative",
        height: variant === "grand" ? 120 : 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#0A0800",
      }}
    >
      {/* Gold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: variant === "grand" ? 300 : 180,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
          transformOrigin: "center",
        }}
      />

      {/* Center diamond */}
      {variant === "grand" && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            background: "#C9A84C",
            opacity: 0.6,
          }}
        />
      )}
    </motion.div>
  );
}

// ─── Parallax section wrapper ─────────────────────────────────────────────────
function ParallaxSection({
  children,
  speed = 0.1,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ background: "#0A0800", minHeight: "100vh", position: "relative" }}>
      {/* Global floating gold particles */}
      <GoldParticles />

      {/* 1. Cinematic hero with parallax */}
      <HeroSection />

      {/* ── Transition ── */}
      <SectionTransition variant="grand" />

      {/* 1.5 Saro & Hans — Collection Showcase */}
      <SaroHansShowcase />

      {/* ── Transition ── */}
      <SectionTransition variant="grand" />

      {/* 2. Category cards — Royal Treasury */}
      <Categories />

      {/* ── Transition ── */}
      <SectionTransition />

      {/* 3. Craftsmanship horizontal scroll journey */}
      <CraftsmanshipJourney />

      {/* ── Transition ── */}
      <SectionTransition variant="grand" />

      {/* 4. Heritage stats strip with animated counters */}
      <ParallaxSection speed={0.05}>
        <HeritageStrip />
      </ParallaxSection>

      {/* ── Transition ── */}
      <SectionTransition />

      {/* 5. Customer reviews */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1 }}
      >
        <CustomerReviews />
      </motion.div>
    </main>
  );
}