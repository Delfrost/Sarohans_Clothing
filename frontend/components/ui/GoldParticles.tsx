"use client";

import React, { useState, useEffect } from "react";

// ─── Deterministic particle configs (avoids hydration mismatch) ─────────────
const PARTICLE_COUNT = 35;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: `${(i * 2.85 + Math.sin(i * 1.7) * 12 + 50) % 100}%`,
  top: `${(i * 2.8 + Math.cos(i * 2.3) * 15 + 50) % 100}%`,
  size: 2 + (i % 4),
  duration: 14 + (i % 8) * 3,
  delay: (i % 6) * 2,
  opacity: 0.2 + (i % 5) * 0.08,
}));

export default function GoldParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes gp-float {
          0% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: var(--gp-opacity);
          }
          20% {
            transform: translateY(-50px) translateX(18px) scale(1.2);
            opacity: calc(var(--gp-opacity) * 2);
          }
          40% {
            transform: translateY(-90px) translateX(-12px) scale(0.9);
            opacity: var(--gp-opacity);
          }
          60% {
            transform: translateY(-50px) translateX(22px) scale(1.3);
            opacity: calc(var(--gp-opacity) * 1.8);
          }
          80% {
            transform: translateY(-20px) translateX(-10px) scale(1);
            opacity: calc(var(--gp-opacity) * 0.7);
          }
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: var(--gp-opacity);
          }
        }

        @keyframes gp-twinkle {
          0%, 100% { opacity: var(--gp-opacity); }
          50% { opacity: calc(var(--gp-opacity) * 2.5); }
        }

        .gp-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #FFF0B3 0%, #F5E6B8 30%, #C9A84C 70%, transparent 100%);
          box-shadow: 0 0 6px 2px rgba(201,168,76,0.5), 0 0 12px 4px rgba(201,168,76,0.15);
          pointer-events: none;
          animation: gp-float var(--gp-duration) ease-in-out infinite,
                     gp-twinkle calc(var(--gp-duration) * 0.5) ease-in-out infinite;
          animation-delay: var(--gp-delay);
          will-change: transform, opacity;
        }

        @media (max-width: 768px) {
          .gp-container { opacity: 0.5 !important; }
        }
      `}</style>

      <div
        className="gp-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 3,
          overflow: "hidden",
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="gp-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              "--gp-opacity": p.opacity,
              "--gp-duration": `${p.duration}s`,
              "--gp-delay": `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}

