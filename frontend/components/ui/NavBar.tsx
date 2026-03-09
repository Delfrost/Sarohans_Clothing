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

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        background: scrolled ? "rgba(10,8,0,0.97)" : "rgba(10,8,0,0.6)",
        backdropFilter:"blur(16px)",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.75)" : "none",
        transition:"background .4s ease, box-shadow .4s ease",
      }}>

        {/* top gold line */}
        <div style={{
          height:"1px",
          background:"linear-gradient(90deg,transparent,#C9A84C,transparent)",
          opacity:.5
        }}/>

        {/* 3-column grid */}
        <div style={{
          maxWidth:"1440px", margin:"0 auto", padding:"0 2.5rem",
          height:"86px",
          display:"grid",
          gridTemplateColumns:"1fr auto 1fr",
          alignItems:"center",
        }}>

          {/* LEFT */}
          <div className="nav-left">
            {leftLinks.map(l => (
              <Link key={l.label} href={l.href} className="nav-link">{l.label}</Link>
            ))}
            <div className="vdiv"/>
          </div>

          {/* CENTRE — logo + wordmark */}
          <Link href="/" className="logo">
            <Image
              src="/images/sarohans-logo.png"
              alt="Sarohans"
              width={80}
              height={80}
              className="logo-img"
              priority
            />
            <div className="logo-words">
              <span className="logo-name">SAROHANS</span>
              <div className="logo-rule"/>
              <span className="logo-sub">ROYAL HERITAGE</span>
            </div>
          </Link>

          {/* RIGHT */}
          <div className="nav-right">
            <div className="vdiv nav-desktop"/>
            {rightLinks.map(l => (
              <Link key={l.label} href={l.href} className="nav-link nav-desktop">{l.label}</Link>
            ))}
            <div className="login-spacer nav-desktop"/>
            <Link href="/login" className="btn-login nav-desktop">LOGIN</Link>

            <button
              className="hamburger nav-mobile"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span style={{transform:menuOpen?"rotate(45deg) translate(4px,4px)":"none"}}/>
              <span style={{opacity:menuOpen?0:1}}/>
              <span style={{transform:menuOpen?"rotate(-45deg) translate(4px,-4px)":"none"}}/>
            </button>
          </div>

        </div>

        {/* bottom gold line */}
        <div style={{
          height:"1px",
          background: scrolled
            ? "linear-gradient(90deg,transparent,rgba(201,168,76,.45),transparent)"
            : "linear-gradient(90deg,transparent,rgba(201,168,76,.18),transparent)",
          transition:"background .4s",
        }}/>
      </nav>

      {/* mobile dropdown */}
      {menuOpen && (
        <div className="mob-menu">
          {[...leftLinks,...rightLinks].map((l,i,arr) => (
            <Link key={l.label} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="mob-link"
              style={{borderBottom:i<arr.length-1?"1px solid rgba(201,168,76,.1)":"none"}}
            >{l.label}</Link>
          ))}
          <Link href="/login" className="mob-login-btn">LOGIN</Link>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:wght@400;500&display=swap');
        @keyframes shimmer{0%{background-position:0% center}100%{background-position:250% center}}

        /* ── Logo ── */
        .logo {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: .8rem;
          flex-shrink: 0;
        }

        /* Black bg logo blends into dark nav — no tricks needed.
           Just a clean gold glow on hover. */
        .logo-img {
          object-fit: contain;
          border-radius: 50%;
          opacity: .9;
          transition: opacity .3s ease, filter .3s ease;
        }
        .logo:hover .logo-img {
          opacity: 1;
          filter: drop-shadow(0 0 10px rgba(201,168,76,0.6)) brightness(1.1);
        }

        .logo-words { display:flex; flex-direction:column; align-items:flex-start; }
        .logo-name {
          font-family: 'Cinzel', serif;
          font-size: 1.75rem;
          font-weight: 600;
          letter-spacing: .28em;
          line-height: 1;
          background: linear-gradient(90deg,#8B6914 0%,#F5E6B8 28%,#C9A84C 50%,#F5E6B8 72%,#8B6914 100%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .logo-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg,transparent,#C9A84C,transparent);
          margin: 5px 0 4px;
        }
        .logo-sub {
          font-family: 'EB Garamond', serif;
          font-size: .5rem;
          letter-spacing: .55em;
          color: #8B6914;
        }

        /* ── Layout ── */
        .nav-left  { display:flex; align-items:center; gap:2.8rem; justify-content:flex-end;  padding-right:3rem; }
        .nav-right { display:flex; align-items:center; gap:2.8rem; justify-content:flex-start; padding-left:3rem; }
        .login-spacer { flex:1; }
        .vdiv {
          width:1px; height:34px; flex-shrink:0;
          background:linear-gradient(to bottom,transparent,rgba(201,168,76,.45),transparent);
        }

        /* ── Links ── */
        .nav-link {
          font-family:'Cinzel',serif; font-size:.62rem; letter-spacing:.18em;
          color:#E8D5A3; text-decoration:none; position:relative;
          padding-bottom:3px; white-space:nowrap; transition:color .3s;
        }
        .nav-link::after {
          content:''; position:absolute; bottom:0; left:0; right:0;
          height:1px; background:#C9A84C;
          transform:scaleX(0); transform-origin:center; transition:transform .35s ease;
        }
        .nav-link:hover { color:#F5E6B8; }
        .nav-link:hover::after { transform:scaleX(1); }

        /* ── Login ── */
        .btn-login {
          font-family:'Cinzel',serif; font-size:.62rem; letter-spacing:.2em;
          color:#0A0800;
          background:linear-gradient(135deg,#C9A84C 0%,#E8D5A3 50%,#C9A84C 100%);
          background-size:200% auto; border:none; padding:.55rem 1.8rem;
          cursor:pointer; text-decoration:none; display:inline-block;
          white-space:nowrap; flex-shrink:0;
          transition:background-position .4s, box-shadow .3s;
        }
        .btn-login:hover {
          background-position:right center;
          box-shadow:0 0 22px rgba(201,168,76,.55);
        }

        /* ── Hamburger ── */
        .hamburger {
          background:none; border:1px solid rgba(201,168,76,.35);
          padding:.45rem .6rem; cursor:pointer;
          flex-direction:column; gap:5px; margin-left:auto;
        }
        .hamburger span { display:block; width:22px; height:1px; background:#C9A84C; transition:all .3s; }

        /* ── Mobile menu ── */
        .mob-menu {
          position:fixed; top:88px; left:0; right:0; z-index:99;
          background:rgba(10,8,0,.98); border-bottom:1px solid rgba(201,168,76,.2);
          padding:1.2rem 2rem 1.8rem;
        }
        .mob-link {
          display:block; font-family:'Cinzel',serif; font-size:.75rem;
          letter-spacing:.22em; color:#E8D5A3; text-decoration:none;
          padding:.9rem 0; transition:color .2s;
        }
        .mob-link:hover { color:#F5E6B8; }
        .mob-login-btn {
          margin-top:1.2rem; display:inline-block;
          font-family:'Cinzel',serif; font-size:.62rem; letter-spacing:.2em;
          color:#0A0800; background:linear-gradient(135deg,#C9A84C,#E8D5A3);
          padding:.55rem 1.5rem; text-decoration:none;
        }

        /* ── Responsive ── */
        @media(max-width:900px){
          .nav-left, .nav-desktop { display:none!important; }
          .nav-mobile { display:flex!important; }
          .nav-right { padding-left:0; justify-content:flex-end; }
        }
        @media(min-width:901px){
          .nav-mobile { display:none!important; }
          .nav-left, .nav-desktop { display:flex!important; }
        }
      `}</style>
    </>
  );
}