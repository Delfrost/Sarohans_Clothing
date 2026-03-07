"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "COLLECTIONS", href: "/collections" },
  { label: "OUR CRAFTS", href: "/crafts" },
  { label: "ABOUT SAROHANS", href: "/about" },
  { label: "JOURNAL", href: "/journal" },
  { label: "CONTACT", href: "/contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.4s ease",
          background: scrolled
            ? "rgba(10, 8, 0, 0.97)"
            : "rgba(10, 8, 0, 0.6)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid rgba(201, 168, 76, 0.3)"
            : "1px solid rgba(201, 168, 76, 0.1)",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.6)" : "none",
        }}
      >
        {/* Top gold line */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            opacity: 0.6,
          }}
        />

        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ textAlign: "center", lineHeight: 1 }}>
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  background:
                    "linear-gradient(90deg, #8B6914 0%, #F5E6B8 40%, #C9A84C 60%, #8B6914 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 4s linear infinite",
                }}
              >
                SAROHANS
              </div>
              <div
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.4em",
                  color: "#8B6914",
                  marginTop: "2px",
                }}
              >
                ROYAL HERITAGE
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul
            style={{
              display: "flex",
              gap: "2.5rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    color: "#E8D5A3",
                    textDecoration: "none",
                    position: "relative",
                    paddingBottom: "4px",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "#F5E6B8";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "#E8D5A3";
                  }}
                >
                  {link.label}
                  {/* Underline on hover via CSS class */}
                </Link>
              </li>
            ))}
          </ul>

          {/* Login Button */}
          <Link
            href="/login"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "#0A0800",
              background: "linear-gradient(135deg, #C9A84C, #E8D5A3, #C9A84C)",
              border: "none",
              padding: "0.55rem 1.4rem",
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 0.3s ease",
              display: "inline-block",
            }}
            className="desktop-nav"
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background =
                "linear-gradient(135deg, #E8D5A3, #F5E6B8, #E8D5A3)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background =
                "linear-gradient(135deg, #C9A84C, #E8D5A3, #C9A84C)";
            }}
          >
            LOGIN
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: "none",
              border: "1px solid rgba(201, 168, 76, 0.4)",
              cursor: "pointer",
              padding: "0.4rem 0.6rem",
              display: "none",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: "#C9A84C",
                  transition: "all 0.3s ease",
                  transform:
                    menuOpen && i === 0
                      ? "rotate(45deg) translate(4px, 4px)"
                      : menuOpen && i === 2
                      ? "rotate(-45deg) translate(4px, -4px)"
                      : menuOpen && i === 1
                      ? "opacity: 0"
                      : "none",
                }}
              />
            ))}
          </button>
        </div>

        {/* Bottom gold line */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
          }}
        />
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "74px",
            left: 0,
            right: 0,
            zIndex: 99,
            background: "rgba(10, 8, 0, 0.98)",
            borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
            padding: "1.5rem 2rem",
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                color: "#E8D5A3",
                textDecoration: "none",
                padding: "0.9rem 0",
                borderBottom:
                  i < navLinks.length - 1
                    ? "1px solid rgba(201, 168, 76, 0.1)"
                    : "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            style={{
              display: "inline-block",
              marginTop: "1.2rem",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "#0A0800",
              background: "linear-gradient(135deg, #C9A84C, #E8D5A3)",
              padding: "0.6rem 1.6rem",
              textDecoration: "none",
            }}
          >
            LOGIN
          </Link>
        </div>
      )}

      {/* Shimmer keyframe */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:wght@400;500&display=swap');

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}