"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const leftLinks  = [
  { label: "COLLECTIONS", href: "/collections" },
  { label: "OUR CRAFTS",  href: "/crafts"      },
];
const rightLinks = [
  { label: "JOURNAL", href: "/journal" },
  { label: "CONTACT", href: "/contact" },
];

export default function NavBar2() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap');

        @keyframes nb2-shimmer { 0% { background-position: 0% center; } 100% { background-position: 250% center; } }
        @keyframes nb2-fadeDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

        .nb2-link { font-family: 'Cinzel', serif; font-size: .625rem; font-weight: 500; letter-spacing: .2em; color: rgba(232,213,163,0.95); text-decoration: none; position: relative; padding-bottom: 3px; white-space: nowrap; transition: color .3s; }
        .nb2-link::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: #C9A84C; transform: scaleX(0); transform-origin: center; transition: transform .35s ease; }
        .nb2-link:hover { color: #FAF5E9; }
        .nb2-link:hover::after { transform: scaleX(1); }

        .nb2-logo { text-decoration: none; display: flex; align-items: center; gap: .78rem; flex-shrink: 0; }
        .nb2-logo-img { object-fit: contain; border-radius: 50%; opacity: .95; transition: opacity .3s, filter .3s; }
        .nb2-logo:hover .nb2-logo-img { opacity: 1; filter: drop-shadow(0 0 12px rgba(232,213,163,.65)) brightness(1.1); }
        .nb2-logo-words { display: flex; flex-direction: column; align-items: flex-start; }
        .nb2-logo-name { font-family: 'Cinzel', serif; font-size: 1.72rem; font-weight: 600; letter-spacing: .28em; line-height: 1; background: linear-gradient(90deg, #8B6914 0%, #F5E6B8 28%, #C9A84C 50%, #F5E6B8 72%, #8B6914 100%); background-size: 250% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: nb2-shimmer 4s linear infinite; }
        .nb2-logo-rule { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, #C9A84C, transparent); margin: 5px 0 4px; }
        .nb2-logo-sub { font-family: 'Montserrat', sans-serif; font-size: .42rem; font-weight: 500; letter-spacing: .54em; color: rgba(232,213,163,0.95); }

        .nb2-vdiv { width: 1px; height: 32px; flex-shrink: 0; background: linear-gradient(to bottom, transparent, rgba(232,213,163,.55), transparent); }

        .nb2-login { font-family: 'Cinzel', serif; font-size: .625rem; font-weight: 600; letter-spacing: .2em; color: #0A0800; background: linear-gradient(135deg, #FAF5E9 0%, #E8D5A3 50%, #FAF5E9 100%); background-size: 200% auto; border: none; padding: .54rem 1.7rem; cursor: pointer; text-decoration: none; display: inline-block; white-space: nowrap; flex-shrink: 0; transition: background-position .4s, box-shadow .3s; }
        .nb2-login:hover { background-position: right center; box-shadow: 0 0 22px rgba(232,213,163,.7); }

        .nb2-ham { background: none; border: 1px solid rgba(232,213,163,.4); padding: .45rem .6rem; cursor: pointer; display: flex; flex-direction: column; gap: 5px; margin-left: auto; }
        .nb2-ham span { display: block; width: 22px; height: 1px; background: #C9A84C; transition: all .3s; }

        .nb2-mob-menu { position: fixed; top: 88px; left: 0; right: 0; z-index: 98; background: rgba(10,8,0,.98); border-bottom: 1px solid rgba(201,168,76,.2); padding: 1.2rem 2rem 1.8rem; animation: nb2-fadeDown .3s both; }
        .nb2-mob-link { display: block; font-family: 'Cinzel', serif; font-size: .75rem; letter-spacing: .22em; color: #E8D5A3; text-decoration: none; padding: .9rem 0; transition: color .2s; }
        .nb2-mob-link:hover { color: #FAF5E9; }
        .nb2-mob-login { margin-top: 1.2rem; display: inline-block; font-family: 'Cinzel', serif; font-size: .62rem; letter-spacing: .2em; color: #0A0800; background: linear-gradient(135deg, #FAF5E9, #E8D5A3); padding: .55rem 1.5rem; text-decoration: none; }

        @media (max-width: 900px) { .nb2-desktop { display: none !important; } .nb2-mobile  { display: flex  !important; } }
        @media (min-width: 901px) { .nb2-mobile  { display: none  !important; } .nb2-desktop { display: flex  !important; } }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,8,0,0.98)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.85)" : "none",
        transition: "background .4s ease, backdrop-filter .4s ease, box-shadow .4s ease",
      }}>
        {/* Top gold accent line preserved */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)", opacity: scrolled ? .6 : .4, transition: "opacity .4s" }} />

        {/* 3-column grid layout preserved */}
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 2.5rem", height: 86, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          
          {/* LEFT */}
          <div className="nb2-desktop" style={{ display: "flex", alignItems: "center", gap: "2.6rem", justifyContent: "flex-end", paddingRight: "2.8rem" }}>
            {leftLinks.map(l => <Link key={l.label} href={l.href} className="nb2-link">{l.label}</Link>)}
            <div className="nb2-vdiv" />
          </div>

          {/* CENTRE */}
          <Link href="/" className="nb2-logo">
            <Image src="/images/sarohans-logo.png" alt="Sarohans emblem" width={72} height={72} className="nb2-logo-img" priority />
            <div className="nb2-logo-words">
              <span className="nb2-logo-name">SAROHANS</span>
              <div className="nb2-logo-rule" />
              <span className="nb2-logo-sub">ROYAL HERITAGE</span>
            </div>
          </Link>

          {/* RIGHT */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2.8rem" }}>
            <div className="nb2-desktop" style={{ display: "flex", alignItems: "center", gap: "2.6rem" }}>
              <div className="nb2-vdiv" />
              {rightLinks.map(l => <Link key={l.label} href={l.href} className="nb2-link">{l.label}</Link>)}
              <Link href="/login" className="nb2-login">LOGIN</Link>
            </div>
            
            <button className="nb2-ham nb2-mobile" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Bottom gold line preserved */}
        <div style={{ height: 1, background: scrolled ? "linear-gradient(90deg, transparent, rgba(232,213,163,.6), transparent)" : "linear-gradient(90deg, transparent, rgba(232,213,163,.3), transparent)", transition: "background .4s" }} />
      </nav>

      {/* Mobile dropdown preserved */}
      {menuOpen && (
        <div className="nb2-mob-menu">
          {[...leftLinks, ...rightLinks].map((l, i, arr) => (
            <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="nb2-mob-link" style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(201,168,76,.1)" : "none" }}>{l.label}</Link>
          ))}
          <Link href="/login" className="nb2-mob-login">LOGIN</Link>
        </div>
      )}
    </>
  );
}