"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ─── Craftsmanship steps with curated imagery ──────────────────────────────
const STEPS = [
  {
    number: "01",
    title: "The Selection",
    subtitle: "Choosing the Finest Silks",
    description:
      "Our master craftsmen travel to the silk farms of Kanchipuram and Varanasi, hand-selecting only the purest threads — each one examined for luminosity, tensile strength, and the way it catches light.",
    image:
      "https://i.pinimg.com/1200x/c1/9f/61/c19f61b0c0ed1b4e062e783daec08ec0.jpg",
  },
  {
    number: "02",
    title: "The Design",
    subtitle: "Sketching Heritage Motifs",
    description:
      "Patterns inspired by Mughal jali work, Rajputana fort architecture, and sacred temple geometry are hand-drawn on parchment — a tradition passed through six generations of our design atelier.",
    image:
      "https://i.pinimg.com/1200x/5f/84/f1/5f84f18b320dae36a4f9104033baf5ae.jpg",
  },
  {
    number: "03",
    title: "The Weaving",
    subtitle: "Handloom Mastery",
    description:
      "Each garment takes between 22 to 45 days on a handloom. The weavers work in measured rhythm — every weft, every pick deliberate — creating fabric that breathes like a second skin.",
    image:
      "https://i.pinimg.com/1200x/20/6e/b5/206eb5f98ad2327d7c60012e87aedb79.jpg",
  },
  {
    number: "04",
    title: "The Embroidery",
    subtitle: "Zardozi & Aari Artistry",
    description:
      "Gold and silver metallic threads are woven into intricate zardozi patterns by artisans whose families have perfected this craft for over 400 years in the workshops of Lucknow.",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&q=90",
  },
  {
    number: "05",
    title: "The Finishing",
    subtitle: "Fit for Royalty",
    description:
      "Every piece is steam-pressed, inspected under natural light, and wrapped in hand-dyed muslin before being placed in our signature heritage chest — ready to become part of your story.",
    image:
      "https://i.pinimg.com/1200x/64/bd/1f/64bd1f6cf1aeb0cf2ffc3848bcef2f22.jpg",
  },
];

// ─── Single Step Card ──────────────────────────────────────────────────────
function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        flex: "0 0 420px",
        height: 520,
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <motion.img
          src={step.image}
          alt={step.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.45) contrast(1.15) saturate(0.9) sepia(10%)",
          }}
          whileHover={{
            scale: 1.1,
            filter: "brightness(0.65) contrast(1.2) saturate(1.1) sepia(0%)",
          }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Rich Inner Vignette */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, transparent 20%, rgba(10,8,0,0.85) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Gold border frame */}
      <div
        style={{
          position: "absolute",
          inset: 12,
          border: "1px solid rgba(201,168,76,0.2)",
          pointerEvents: "none",
          transition: "border-color 0.6s",
        }}
      />

      {/* Corner accents */}
      <div style={{ position: "absolute", top: 12, left: 12, width: 24, height: 24, borderTop: "1px solid #C9A84C", borderLeft: "1px solid #C9A84C", opacity: 0.5 }} />
      <div style={{ position: "absolute", top: 12, right: 12, width: 24, height: 24, borderTop: "1px solid #C9A84C", borderRight: "1px solid #C9A84C", opacity: 0.5 }} />
      <div style={{ position: "absolute", bottom: 12, left: 12, width: 24, height: 24, borderBottom: "1px solid #C9A84C", borderLeft: "1px solid #C9A84C", opacity: 0.5 }} />
      <div style={{ position: "absolute", bottom: 12, right: 12, width: 24, height: 24, borderBottom: "1px solid #C9A84C", borderRight: "1px solid #C9A84C", opacity: 0.5 }} />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "80px 32px 36px",
          background:
            "linear-gradient(to top, rgba(10,8,0,0.95) 0%, rgba(10,8,0,0.7) 50%, transparent 100%)",
          zIndex: 2,
        }}
      >
        {/* Step number */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "3.5rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(201,168,76,0.15)",
            lineHeight: 1,
            marginBottom: 8,
            letterSpacing: "0.05em",
          }}
        >
          {step.number}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.5rem",
            fontWeight: 600,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: 8,
          }}
        >
          {step.subtitle}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.6rem",
            fontWeight: 400,
            color: "#FAF5E9",
            letterSpacing: "0.02em",
            marginBottom: 14,
            lineHeight: 1.2,
          }}
        >
          {step.title}
        </h3>

        {/* Gold rule */}
        <div
          style={{
            width: 36,
            height: 1,
            background: "linear-gradient(90deg, #C9A84C, transparent)",
            marginBottom: 14,
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.88rem",
            color: "rgba(245,230,192,0.6)",
            lineHeight: 1.7,
            letterSpacing: "0.02em",
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Horizontal Scroll Section ────────────────────────────────────────
export default function CraftsmanshipJourney() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  // Translate the horizontal container
  const x = useTransform(smoothProgress, [0, 1], ["2%", "-62%"]);

  // Parallax for the section heading
  const headingY = useTransform(smoothProgress, [0, 0.3], [0, -60]);
  const headingOpacity = useTransform(smoothProgress, [0, 0.15, 0.5], [1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "300vh", // Tall enough to drive the horizontal scroll
        background: "#0A0800",
      }}
    >
      {/* Sticky container that stays in viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Background texture & majestic lighting */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.03) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Floating dust motes (CSS animation in globals) */}
        <div className="dust-container" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {mounted && Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="dust-mote"
              style={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: "rgba(201,168,76,0.5)",
                borderRadius: "50%",
                boxShadow: "0 0 10px rgba(201,168,76,0.8)",
                animation: `float-mote ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `-${Math.random() * 20}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Section heading — floats above and fades as you scroll */}
        <motion.div
          style={{
            position: "absolute",
            top: "8vh",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 10,
            y: headingY,
            opacity: headingOpacity,
          }}
        >
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.48rem",
              fontWeight: 600,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: 16,
            }}
          >
            The Art Behind Every Garment
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              fontWeight: 400,
              color: "#FAF5E9",
              letterSpacing: "0.03em",
              margin: 0,
            }}
          >
            Our{" "}
            <span style={{ color: "#C9A84C", fontStyle: "italic" }}>
              Craftsmanship
            </span>
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginTop: 18,
            }}
          >
            <div
              style={{
                flex: "0 0 60px",
                height: 1,
                background: "linear-gradient(90deg, transparent, #C9A84C)",
              }}
            />
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path
                d="M4.5 0L5.6 3.4L9 4.5L5.6 5.6L4.5 9L3.4 5.6L0 4.5L3.4 3.4Z"
                fill="#C9A84C"
                opacity="0.7"
              />
            </svg>
            <div
              style={{
                flex: "0 0 60px",
                height: 1,
                background: "linear-gradient(90deg, #C9A84C, transparent)",
              }}
            />
          </div>
        </motion.div>

        {/* Horizontal scrolling cards */}
        <motion.div
          style={{
            display: "flex",
            gap: 32,
            paddingLeft: "8vw",
            paddingRight: "8vw",
            alignItems: "center",
            x,
            marginTop: 40,
          }}
        >
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </motion.div>

        {/* Scroll progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: "6vh",
            left: "50%",
            transform: "translateX(-50%)",
            width: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 1,
              background: "rgba(201,168,76,0.15)",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background:
                  "linear-gradient(90deg, #8B6914, #C9A84C, #F5E6B8)",
                scaleX: smoothProgress,
                transformOrigin: "left",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.42rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.4)",
            }}
          >
            Scroll to Explore
          </span>
        </div>
      </div>
    </section>
  );
}
