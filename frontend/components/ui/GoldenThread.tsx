"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ─── Zardozi stitch marks along the thread path ───────────────────────────────
const STITCH_POSITIONS = [0.08, 0.15, 0.22, 0.32, 0.41, 0.5, 0.58, 0.67, 0.76, 0.85, 0.93];

function StitchMark({ progress, position, pathRef }: {
  progress: number;
  position: number;
  pathRef: React.RefObject<SVGPathElement | null>;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const totalLen = path.getTotalLength();
    const pt = path.getPointAtLength(position * totalLen);
    setCoords({ x: pt.x, y: pt.y });
  }, [pathRef, position]);

  const visible = progress >= position;
  const opacity = visible ? Math.min(1, (progress - position) / 0.03) : 0;

  return (
    <g style={{ opacity, transition: "opacity 0.4s ease" }}>
      {/* Diamond stitch */}
      <rect
        x={coords.x - 3}
        y={coords.y - 3}
        width={6}
        height={6}
        transform={`rotate(45 ${coords.x} ${coords.y})`}
        fill="none"
        stroke="#C9A84C"
        strokeWidth={0.8}
        opacity={0.7}
      />
      {/* Center dot */}
      <circle
        cx={coords.x}
        cy={coords.y}
        r={1.5}
        fill="#F5E6B8"
        opacity={0.9}
      />
    </g>
  );
}

// ─── Leading glow at the drawing tip ──────────────────────────────────────────
function LeadingGlow({ progress, pathRef }: {
  progress: number;
  pathRef: React.RefObject<SVGPathElement | null>;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const totalLen = path.getTotalLength();
    const pt = path.getPointAtLength(progress * totalLen);
    setCoords({ x: pt.x, y: pt.y });
  }, [pathRef, progress]);

  if (progress < 0.02 || progress > 0.98) return null;

  return (
    <circle
      cx={coords.x}
      cy={coords.y}
      r={8}
      fill="none"
      style={{
        filter: "url(#thread-tip-glow)",
        opacity: 0.8,
      }}
    >
      <circle cx={coords.x} cy={coords.y} r={3} fill="#F5E6B8" opacity={0.9} />
    </circle>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GoldenThread() {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });

  // Track the numeric value for stitch marks and tip glow
  const [currentProgress, setCurrentProgress] = useState(0);
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v: number) => {
      setCurrentProgress(v);

      // Update tip position
      const path = pathRef.current;
      if (path) {
        const totalLen = path.getTotalLength();
        const pt = path.getPointAtLength(v * totalLen);
        setTipPos({ x: pt.x, y: pt.y });
      }
    });
    return unsubscribe;
  }, [smoothProgress]);

  // Measure path length after mount
  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      setPathLength(path.getTotalLength());
    }
  }, []);

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Transform scroll progress → dashoffset
  const dashOffset = useTransform(smoothProgress, [0, 1], [pathLength, 0]);

  // Opacity: fade in after 3% scroll
  const containerOpacity = useTransform(scrollYProgress, [0, 0.03, 0.06], [0, 0, 1]);

  if (isMobile) return null;

  // The flowing path — graceful S-curves spanning the full page
  const threadPath = `
    M 85,0
    C 85,120 320,180 300,350
    S 60,520 100,680
    S 340,840 280,1020
    S 50,1180 120,1360
    S 350,1500 260,1700
    S 70,1850 140,2050
    S 330,2200 250,2400
    S 60,2550 150,2750
    S 340,2900 200,3100
    S 80,3250 160,3400
  `;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 5,
        opacity: containerOpacity,
      }}
    >
      <svg
        viewBox="0 0 400 3400"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          {/* Gold gradient for the thread */}
          <linearGradient id="thread-gold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5E6B8" />
            <stop offset="25%" stopColor="#C9A84C" />
            <stop offset="50%" stopColor="#F5E6B8" />
            <stop offset="75%" stopColor="#8B6914" />
            <stop offset="100%" stopColor="#C9A84C" />
          </linearGradient>

          {/* Glow filter for the thread */}
          <filter id="thread-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glow for the leading tip */}
          <filter id="thread-tip-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feFlood floodColor="#F5E6B8" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Very faint full path ghost — gives a subtle preview */}
        <path
          d={threadPath}
          fill="none"
          stroke="rgba(201,168,76,0.04)"
          strokeWidth={1}
        />

        {/* The drawing thread */}
        <motion.path
          ref={pathRef}
          d={threadPath}
          fill="none"
          stroke="url(#thread-gold)"
          strokeWidth={1.5}
          strokeLinecap="round"
          filter="url(#thread-glow)"
          style={{
            pathLength: smoothProgress,
          }}
        />

        {/* Zardozi stitch marks */}
        {STITCH_POSITIONS.map((pos) => (
          <StitchMark
            key={pos}
            progress={currentProgress}
            position={pos}
            pathRef={pathRef}
          />
        ))}

        {/* Leading tip glow */}
        {currentProgress > 0.02 && currentProgress < 0.98 && (
          <circle
            cx={tipPos.x}
            cy={tipPos.y}
            r={4}
            fill="#F5E6B8"
            opacity={0.85}
            filter="url(#thread-tip-glow)"
          />
        )}
      </svg>
    </motion.div>
  );
}
