"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ThreadDivider() {
  const dividerPath = "M 0,20 C 80,5 160,35 240,20 S 400,5 480,20 S 640,35 720,20 S 880,5 960,20";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 6,
      }}
    >
      <motion.svg
        viewBox="0 0 960 40"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          maxWidth: 960,
          height: 40,
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <defs>
          <linearGradient id="divider-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="#8B6914" />
            <stop offset="35%" stopColor="#F5E6B8" />
            <stop offset="50%" stopColor="#C9A84C" />
            <stop offset="65%" stopColor="#F5E6B8" />
            <stop offset="85%" stopColor="#8B6914" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <filter id="divider-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ghost path */}
        <path
          d={dividerPath}
          fill="none"
          stroke="rgba(201,168,76,0.06)"
          strokeWidth={1}
        />

        {/* Drawing thread */}
        <motion.path
          d={dividerPath}
          fill="none"
          stroke="url(#divider-gold)"
          strokeWidth={1.2}
          strokeLinecap="round"
          filter="url(#divider-glow)"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: { duration: 1.8, ease: "easeInOut" },
                opacity: { duration: 0.3 },
              },
            },
          }}
        />

        {/* Stitch dots along the divider */}
        {[120, 240, 360, 480, 600, 720, 840].map((x, i) => (
          <motion.g
            key={x}
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { delay: 0.6 + i * 0.12, duration: 0.4 },
              },
            }}
          >
            <circle cx={x} cy={20} r={1.5} fill="#F5E6B8" opacity={0.7} />
          </motion.g>
        ))}

        {/* Center diamond ornament */}
        <motion.g
          variants={{
            hidden: { opacity: 0, scale: 0, rotate: 0 },
            visible: {
              opacity: 1,
              scale: 1,
              rotate: 45,
              transition: { delay: 1.0, duration: 0.6, ease: "easeOut" },
            },
          }}
          style={{ transformOrigin: "480px 20px" }}
        >
          <rect
            x={474}
            y={14}
            width={12}
            height={12}
            rx={1}
            fill="none"
            stroke="#C9A84C"
            strokeWidth={1}
          />
          <rect
            x={477}
            y={17}
            width={6}
            height={6}
            rx={0.5}
            fill="#C9A84C"
            opacity={0.6}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}
