"use client";

import { useState, useEffect, useRef } from "react";

export default function SarohansLegacy() {
  const [btnHovered, setBtnHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-triggered entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sl-section"
      style={{
        width: "100%",
        background: "#110e08",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scoped styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

        /* ============ ANIMATIONS ============ */
        @keyframes sl-fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes sl-fadeSlideRight {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes sl-fadeSlideLeft {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes sl-scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes sl-lineExpand {
          from { width: 0; }
          to { width: 48px; }
        }

        @keyframes sl-arcGlow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.7; }
        }

        @keyframes sl-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes sl-gentleFloat {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(-50%, calc(-50% - 6px)); }
        }

        /* ============ SECTION ============ */
        .sl-section {
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }

        /* ============ INNER LAYOUT ============ */
        .sl-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 88px 64px 88px 80px;
          display: flex;
          align-items: center;
          gap: 72px;
          position: relative;
          z-index: 2;
        }

        /* ============ TEXT COLUMN ============ */
        .sl-text-col {
          flex: 0 0 auto;
          width: min(44%, 520px);
        }

        /* Tag / eyebrow */
        .sl-tag {
          display: inline-block;
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 20px;
          padding: 6px 0;
          position: relative;
          opacity: 0;
        }

        .sl-tag.sl-visible {
          animation: sl-fadeSlideRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
        }

        .sl-tag::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 0;
          background: linear-gradient(90deg, #C9A84C, transparent);
        }

        .sl-tag.sl-visible::after {
          animation: sl-lineExpand 0.6s ease 0.6s forwards;
        }

        /* Heading */
        .sl-heading {
          color: #C9A84C;
          font-size: clamp(2.4rem, 3.5vw, 3.4rem);
          font-weight: 500;
          font-family: 'Playfair Display', Georgia, serif;
          line-height: 1.15;
          letter-spacing: 0.015em;
          margin: 0 0 36px 0;
          text-transform: capitalize;
          opacity: 0;
        }

        .sl-heading.sl-visible {
          animation: sl-fadeSlideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
        }

        /* Body text */
        .sl-body {
          color: #c8bfa8;
          font-size: 1.05rem;
          line-height: 1.85;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          margin: 0 0 24px 0;
          max-width: 520px;
          opacity: 0;
          letter-spacing: 0.01em;
        }

        .sl-body.sl-visible {
          animation: sl-fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .sl-body-1.sl-visible { animation-delay: 0.4s; }
        .sl-body-2.sl-visible { animation-delay: 0.55s; }
        .sl-body-2 { margin-bottom: 44px; }

        /* CTA Button */
        .sl-cta-btn {
          display: inline-block;
          padding: 15px 36px;
          background: transparent;
          border: 1px solid #C9A84C;
          color: #C9A84C;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          opacity: 0;
        }

        .sl-cta-btn.sl-visible {
          animation: sl-fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
        }

        .sl-cta-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent);
          transition: left 0.5s ease;
        }

        .sl-cta-btn:hover::before {
          left: 100%;
        }

        .sl-cta-btn:hover {
          background: rgba(201,168,76,0.08);
          box-shadow: 0 0 28px rgba(201,168,76,0.2);
          transform: translateY(-2px);
        }

        .sl-cta-btn:active {
          transform: translateY(0);
        }

        /* ============ IMAGE COLUMN ============ */
        .sl-image-col {
          flex: 1;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 520px;
          opacity: 0;
        }

        .sl-image-col.sl-visible {
          animation: sl-scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }

        /* Arch image frame */
        .sl-arch-frame {
          position: relative;
          width: min(88%, 520px);
          aspect-ratio: 4/5;
          border-radius: 300px 300px 8px 8px;
          overflow: hidden;
          border: 1px solid rgba(201,168,76,0.45);
          box-shadow: 0 0 0 1px rgba(201,168,76,0.12), 0 24px 80px rgba(0,0,0,0.7);
          z-index: 3;
          transition: box-shadow 0.6s ease, transform 0.6s ease;
        }

        .sl-arch-frame:hover {
          box-shadow: 0 0 0 1px rgba(201,168,76,0.25), 0 32px 90px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.08);
          transform: translateY(-4px);
        }

        .sl-arch-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sl-arch-frame:hover img {
          transform: scale(1.04);
        }

        .sl-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.25) 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* Gold arc outline */
        .sl-arc-outline {
          position: absolute;
          width: min(92%, 536px);
          aspect-ratio: 4/5;
          border-radius: 300px 300px 10px 10px;
          border: 1px solid rgba(201,168,76,0.55);
          pointer-events: none;
          z-index: 5;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: sl-arcGlow 4s ease-in-out infinite, sl-gentleFloat 6s ease-in-out infinite;
          transition: border-color 0.5s ease;
        }

        .sl-arch-frame:hover ~ .sl-arc-outline {
          border-color: rgba(201,168,76,0.8);
        }

        /* Corner bracket SVG */
        .sl-corner-bracket {
          position: absolute;
          bottom: 0;
          left: 8%;
          z-index: 4;
          pointer-events: none;
          opacity: 0;
        }

        .sl-corner-bracket.sl-visible {
          animation: sl-fadeSlideUp 0.6s ease 0.8s forwards;
        }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 900px) {
          .sl-inner {
            flex-direction: column !important;
            padding: 64px 28px !important;
            gap: 48px !important;
          }
          .sl-text-col {
            width: 100% !important;
            max-width: 100% !important;
          }
          .sl-image-col {
            width: 100% !important;
            min-height: 380px !important;
          }
          .sl-heading {
            font-size: clamp(2rem, 6vw, 2.6rem) !important;
          }
          .sl-body {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .sl-inner {
            padding: 48px 20px !important;
            gap: 36px !important;
          }
          .sl-heading {
            font-size: 1.8rem !important;
            margin-bottom: 24px !important;
          }
          .sl-body {
            font-size: 0.95rem !important;
            line-height: 1.75 !important;
          }
        }
      `}</style>

      {/* ── Inner layout: two columns ── */}
      <div className="sl-inner">
        {/* LEFT — Text column */}
        <div className="sl-text-col">

          {/* Eyebrow tag */}
          <span className={`sl-tag ${isVisible ? 'sl-visible' : ''}`}>
            Our Heritage
          </span>

          {/* Heading */}
          <h2 className={`sl-heading ${isVisible ? 'sl-visible' : ''}`}>
            The Sarohans<br />Legacy
          </h2>

          {/* Body paragraphs */}
          <p className={`sl-body sl-body-1 ${isVisible ? 'sl-visible' : ''}`}>
            Born from the majestic palaces of Rajasthan, Sarohans preserves the
            dying arts of royal craftsmen. Every thread spun, every mirror affixed, and
            every motif designed carries the soul of Rajputana heritage.
          </p>

          <p className={`sl-body sl-body-2 ${isVisible ? 'sl-visible' : ''}`}>
            We work directly with multi-generational artisan families in Jaipur and
            Jodhpur to ensure the authenticity of Zardozi, Gota Patti, and Aari work
            remains untouched by the passage of time.
          </p>

          {/* CTA Button */}
          <button
            className={`sl-cta-btn ${isVisible ? 'sl-visible' : ''}`}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            Read Our Story
          </button>
        </div>

        {/* RIGHT — Image frame column */}
        <div className={`sl-image-col ${isVisible ? 'sl-visible' : ''}`}>
          {/* Corner bracket SVG */}
          <svg
            className={`sl-corner-bracket ${isVisible ? 'sl-visible' : ''}`}
            width="130"
            height="130"
            viewBox="0 0 130 130"
            fill="none"
          >
            <line x1="0" y1="130" x2="90" y2="130" stroke="#C9A84C" strokeWidth="1.2" opacity="0.65" />
            <line x1="0" y1="130" x2="0" y2="40" stroke="#C9A84C" strokeWidth="1.2" opacity="0.65" />
          </svg>

          {/* Arch image frame */}
          <div className="sl-arch-frame">
            <img
              src="https://i.pinimg.com/1200x/a3/74/d4/a374d4f647f1243b31ae973586e82417.jpg"
              alt="Artisan hand-embroidering gold Zardozi on dark fabric"
              onLoad={() => setImageLoaded(true)}
            />
            <div className="sl-vignette" />
          </div>

          {/* Gold arc outline */}
          <div className="sl-arc-outline" />
        </div>
      </div>
    </section>
  );
}