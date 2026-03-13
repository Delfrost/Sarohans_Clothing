"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      width: "100%",
      overflow: "hidden",
      background: "#0A0800",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Montserrat:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');

        @keyframes lp2-fadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes lp2-fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lp2-bg-reveal { from { filter: blur(8px) brightness(0.6); } to { filter: blur(0px) brightness(1); } }
        @keyframes lp2-shimmer { 0% { background-position: -400% center; } 100% { background-position: 400% center; } }
        @keyframes lp2-float { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
        
        @keyframes lp2-glow-pulse { 
          0%,100% { box-shadow: 0 8px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1); } 
          50%     { box-shadow: 0 8px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2); } 
        }

        /* ════════ HIGH-TRANSPARENCY GLASS PANEL ════════ */
        .lp2-glass {
          position: relative;
          background: rgba(255, 255, 255, 0.03); 
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2); 
          border-radius: 2px;
          padding: clamp(40px, 5.5vw, 68px) clamp(32px, 5vw, 68px);
          padding: clamp(30px, 4vw, 50px) clamp(24px, 3.5vw, 50px);
          width: 100%;
          max-width: 540px;
          max-width: 460px;
          animation: lp2-fadeIn 0.9s 0.1s both, lp2-glow-pulse 7s 2s ease-in-out infinite;
        }
        
        .lp2-glass::before, .lp2-glass::after, .lp2-corner-tr, .lp2-corner-bl {
          content: ''; position: absolute; width: 18px; height: 18px; pointer-events: none;
        }
        .lp2-glass::before { top: -1px; left: -1px; border-top: 1.5px solid rgba(255,255,255,0.7); border-left: 1.5px solid rgba(255,255,255,0.7); }
        .lp2-glass::after { bottom: -1px; right: -1px; border-bottom: 1.5px solid rgba(255,255,255,0.7); border-right: 1.5px solid rgba(255,255,255,0.7); }
        .lp2-corner-tr { top: -1px; right: -1px; border-top: 1.5px solid rgba(255,255,255,0.7); border-right: 1.5px solid rgba(255,255,255,0.7); }
        .lp2-corner-bl { bottom: -1px; left: -1px; border-bottom: 1.5px solid rgba(255,255,255,0.7); border-left: 1.5px solid rgba(255,255,255,0.7); }

        /* ════════ TYPOGRAPHY ════════ */
        .lp2-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 0.55rem; font-weight: 500; letter-spacing: 0.52em; text-transform: uppercase; color: rgba(255,255,255,0.9); opacity: 0; animation: lp2-fadeUp 0.9s 0.35s forwards; }
        .lp2-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 0.45rem; font-weight: 500; letter-spacing: 0.52em; text-transform: uppercase; color: rgba(255,255,255,0.9); opacity: 0; animation: lp2-fadeUp 0.9s 0.35s forwards; }
        
        .lp2-title { font-family: 'Playfair Display', Georgia, serif; font-weight: 400; font-size: clamp(2.9rem, 4.8vw, 5.4rem); line-height: 1.06; color: #FFFFFF; letter-spacing: 0.01em; opacity: 0; animation: lp2-fadeUp 1.2s 0.5s forwards; text-shadow: 0 2px 16px rgba(0,0,0,0.8); }
        .lp2-title { font-family: 'Playfair Display', Georgia, serif; font-weight: 400; font-size: clamp(2.2rem, 3.5vw, 3.8rem); line-height: 1.06; color: #FFFFFF; letter-spacing: 0.01em; opacity: 0; animation: lp2-fadeUp 1.2s 0.5s forwards; text-shadow: 0 2px 16px rgba(0,0,0,0.8); }
        .lp2-title em { font-style: italic; font-weight: 400; background: linear-gradient(90deg, #C9A84C 0%, #F5E6B8 28%, #E2C46A 52%, #F5E6B8 76%, #C9A84C 100%); background-size: 300% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: lp2-shimmer 14s linear infinite; }
        
        .lp2-sub { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(1.1rem, 1.5vw, 1.35rem); color: rgba(255,255,255,0.9); letter-spacing: 0.04em; line-height: 1.7; opacity: 0; animation: lp2-fadeUp 1s 0.75s forwards; text-shadow: 0 1px 8px rgba(0,0,0,0.5); }
        .lp2-sub { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(0.95rem, 1.2vw, 1.15rem); color: rgba(255,255,255,0.9); letter-spacing: 0.04em; line-height: 1.7; opacity: 0; animation: lp2-fadeUp 1s 0.75s forwards; text-shadow: 0 1px 8px rgba(0,0,0,0.5); }

        /* ════════ CTA ════════ */
        .lp2-cta { display: inline-flex; align-items: center; gap: 14px; font-family: 'Montserrat', sans-serif; font-size: 0.58rem; font-weight: 600; letter-spacing: 0.32em; text-transform: uppercase; color: #FFFFFF; border: 1px solid rgba(255,255,255,0.5); padding: 14px 38px; background: transparent; cursor: pointer; position: relative; overflow: hidden; text-decoration: none; transition: color 0.5s; opacity: 0; animation: lp2-fadeUp 0.9s 1.1s forwards; }
        .lp2-cta { display: inline-flex; align-items: center; gap: 14px; font-family: 'Montserrat', sans-serif; font-size: 0.5rem; font-weight: 600; letter-spacing: 0.32em; text-transform: uppercase; color: #FFFFFF; border: 1px solid rgba(255,255,255,0.5); padding: 12px 30px; background: transparent; cursor: pointer; position: relative; overflow: hidden; text-decoration: none; transition: color 0.5s; opacity: 0; animation: lp2-fadeUp 0.9s 1.1s forwards; }
        .lp2-cta::before { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.9); transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(0.22,1,0.36,1); }
        .lp2-cta:hover { color: #0A0800; }
        .lp2-cta:hover::before { transform: scaleX(1); }
        .lp2-cta span, .lp2-cta svg { position: relative; z-index: 1; }

        /* ════════ SCROLL ════════ */
        .lp2-scroll { position: absolute; bottom: 34px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; font-family: 'Montserrat', sans-serif; font-size: 0.44rem; letter-spacing: 0.44em; text-transform: uppercase; color: rgba(255,255,255,0.6); opacity: 0; animation: lp2-fadeIn 1s 1.6s forwards, lp2-float 3.5s 2.6s ease-in-out infinite; z-index: 10; }

        @media (max-width: 900px) {
          .lp2-layout { justify-content: center !important; padding: 120px 24px 60px !important; }
          .lp2-glass { max-width: 100% !important; background: rgba(255,255,255,0.06) !important; backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important; }
        }
      `}</style>

      {/* ════════ FULLY UNZOOMED BACKGROUND ════════ */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <img
          src="/images/bg_test2.png"
          alt="Sarohans — Heritage Fashion"
          style={{ 
            width: "120%", 
            height: "120%", 
            objectFit: "contain", 
            objectPosition: "100% 0%", 
            animation: "lp2-bg-reveal 1.8s cubic-bezier(0.2,0.8,0.2,1) both" 
          }}
        />
        
        {/* Soft, small gradient at the very top JUST so the NavBar links stay readable */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "15%", background: "linear-gradient(to bottom, rgba(10,8,0,0.6) 0%, transparent 100%)", pointerEvents: "none" }} />
        
        {/* Small bottom fade to blend into your Categories section below */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "15%", background: "linear-gradient(to top, #0A0800 0%, transparent 100%)", pointerEvents: "none" }} />
      </div>

      {/* ════════ CONTENT ════════ */}
      <div className="lp2-layout" style={{
        display: "flex", alignItems: "flex-start", justifyContent: "flex-start", minHeight: "100vh", width: "100%",
        /* CHANGED: Reduced the first value (top padding) to pull the box up toward the photo */
        padding: "clamp(96px, 10vw, 110px) clamp(44px, 8vw, 110px) 60px",
        boxSizing: "border-box", position: "relative", zIndex: 1,
      }}>
        <div className="lp2-glass">
          <div className="lp2-corner-tr" />
          <div className="lp2-corner-bl" />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, opacity: loaded ? 1 : 0, transition: "opacity 1.2s 0.15s" }}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6))" }} />
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M4.5 0L5.6 3.4L9 4.5L5.6 5.6L4.5 9L3.4 5.6L0 4.5L3.4 3.4Z" fill="#FFFFFF" opacity="0.9"/>
              </svg>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.6), transparent)" }} />
            </div>

            <div className="lp2-eyebrow" style={{ marginBottom: 18 }}>
              Est. Since Generations &nbsp;·&nbsp; Handcrafted in India
            </div>

            <h1 className="lp2-title" style={{ marginBottom: 20 }}>
              Where Heritage<br />Becomes <em>Royalty</em>
            </h1>

            <div style={{ width: 52, height: 1, background: "linear-gradient(90deg, #FFFFFF, transparent)", marginBottom: 24, opacity: 0, animation: "lp2-fadeIn 1s 0.85s forwards" }} />

            <p className="lp2-sub" style={{ marginBottom: 44 }}>
              Sarohans brings you the finest handcrafted ethnic wear — each thread
              woven with centuries of artisan mastery, each drape a story of
              timeless Indian grandeur.
            </p>

            <Link href="#collections" className="lp2-cta">
              <span>Discover Collections</span>
              <svg width="18" height="10" viewBox="0 0 20 10" fill="none">
                <line x1="0" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="0.9"/>
                <polyline points="11,1 15,5 11,9" stroke="currentColor" strokeWidth="0.9" fill="none"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="lp2-scroll">
        <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent)" }} />
        Scroll
      </div>
    </section>
  );
}