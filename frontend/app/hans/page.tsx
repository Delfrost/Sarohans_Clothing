"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const API_BASE = "http://localhost:5000/api";

interface Variant {
  id: string;
  size: string;
  color: string;
  price: string;
  stock_quantity: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  gender: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  base_price: string;
  image_url: string;
  variants: Variant[];
  categories: Category[];
}

// ── Subcategories for Hans (Men) ──
const HANS_FILTERS = [
  { label: "All", slug: "" },
  { label: "Printed Shirts", slug: "printed-shirts" },
  { label: "Jaipuri Shirts", slug: "jaipuri-shirts" },
  { label: "Ethnic Shirts", slug: "ethnic-shirts" },
  { label: "Koti", slug: "koti" },
  { label: "Bottom Wear", slug: "bottom-wear" },
];

const MAIN_CATEGORIES = [
  { label: "All", slug: "" },
  { label: "Kurta", slug: "kurta" },
  { label: "Shirts", slug: "shirts" },
];

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "A → Z", value: "name_asc" },
];

function HansShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeFilter, setActiveFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [cartMessage, setCartMessage] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ gender: "men", sort: sortBy });
      if (activeCategory) params.set("category", activeCategory);
      if (activeFilter) params.set("subcategory", activeFilter);

      const res = await fetch(`${API_BASE}/products?${params}`);
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, activeFilter, sortBy]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const addToCart = async (product: Product) => {
    if (!product.variants?.length) return;
    const variant = product.variants[0];

    let sessionId = localStorage.getItem("sarohans_session");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("sarohans_session", sessionId);
    }

    try {
      const res = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, variantId: variant.id, quantity: 1 }),
      });
      const data = await res.json();
      if (data.success) {
        setCartMessage(`✓ ${product.name} added to cart`);
        setTimeout(() => setCartMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <main style={{ background: "#0A0800", minHeight: "100vh", paddingTop: "100px" }}>
      <style>{`
        @keyframes hans-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .hans-filter-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 8px 18px;
          border: 1px solid rgba(201,168,76,0.2);
          background: transparent;
          color: rgba(245,237,214,0.6);
          cursor: pointer;
          transition: all 0.4s ease;
          white-space: nowrap;
        }
        .hans-filter-btn:hover {
          border-color: rgba(201,168,76,0.5);
          color: #C9A84C;
        }
        .hans-filter-btn.active {
          background: rgba(201,168,76,0.12);
          border-color: #C9A84C;
          color: #C9A84C;
        }
        .hans-product-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease;
        }
        .hans-product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(201,168,76,0.1);
        }
        .hans-add-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 10px 20px;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.5);
          color: #C9A84C;
          cursor: pointer;
          transition: all 0.4s ease;
          width: 100%;
        }
        .hans-add-btn:hover {
          background: #C9A84C;
          color: #0A0800;
        }
        .hans-sort-select {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          background: rgba(26,21,8,0.8);
          border: 1px solid rgba(201,168,76,0.25);
          color: #E8D5A3;
          padding: 8px 14px;
          cursor: pointer;
          outline: none;
        }
        .hans-sort-select option {
          background: #1A1508;
          color: #E8D5A3;
        }
        .hans-toast {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: rgba(10,8,0,0.95);
          border: 1px solid #C9A84C;
          color: #C9A84C;
          padding: 16px 28px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          z-index: 1000;
          box-shadow: 0 8px 30px rgba(0,0,0,0.5);
        }
        @media (max-width: 768px) {
          .hans-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hans-sidebar { display: none !important; }
          .hans-mobile-filters { display: block !important; }
        }
        @media (max-width: 480px) {
          .hans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Toast notification */}
      <AnimatePresence>
        {cartMessage && (
          <motion.div
            className="hans-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {cartMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Page Header ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", padding: "0 24px 60px" }}
      >
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.5rem",
          fontWeight: 500,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "rgba(201,168,76,0.7)",
          margin: "0 0 16px",
        }}>
          Men's Collection
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          fontWeight: 400,
          letterSpacing: "0.08em",
          margin: "0 0 12px",
          background: "linear-gradient(90deg, #8B6914 0%, #F5E6B8 28%, #E2C46A 52%, #F5E6B8 76%, #8B6914 100%)",
          backgroundSize: "300% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "hans-shimmer 12s linear infinite",
        }}>
          Hans
        </h1>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1rem",
          color: "rgba(245,230,192,0.55)",
          maxWidth: 500,
          margin: "0 auto",
          lineHeight: 1.7,
        }}>
          Commanding presence, refined tradition — crafted for the modern king
        </p>

        {/* Gold divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 32 }}>
          <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4))" }} />
          <div style={{ width: 6, height: 6, transform: "rotate(45deg)", background: "#C9A84C", opacity: 0.5 }} />
          <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, rgba(201,168,76,0.4))" }} />
        </div>
      </motion.div>

      {/* ═══ Main Category Tabs ═══ */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        padding: "0 24px 24px",
        flexWrap: "wrap",
      }}>
        {MAIN_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            className={`hans-filter-btn ${activeCategory === cat.slug ? "active" : ""}`}
            onClick={() => { setActiveCategory(cat.slug); setActiveFilter(""); }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ═══ Layout: Sidebar + Grid ═══ */}
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 24px 80px",
        display: "flex",
        gap: 40,
      }}>

        {/* ── Sidebar Filters ── */}
        <motion.aside
          className="hans-sidebar"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ width: 240, flexShrink: 0 }}
        >
          <div style={{ position: "sticky", top: 120 }}>
            <h3 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A84C",
              margin: "0 0 20px",
              paddingBottom: 12,
              borderBottom: "1px solid rgba(201,168,76,0.15)",
            }}>
              Style & Type
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {HANS_FILTERS.map((f) => (
                <button
                  key={f.slug}
                  onClick={() => setActiveFilter(f.slug === activeFilter ? "" : f.slug)}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: activeFilter === f.slug ? 600 : 400,
                    letterSpacing: "0.1em",
                    textAlign: "left",
                    padding: "10px 14px",
                    background: activeFilter === f.slug ? "rgba(201,168,76,0.08)" : "transparent",
                    border: "none",
                    borderLeft: activeFilter === f.slug ? "2px solid #C9A84C" : "2px solid transparent",
                    color: activeFilter === f.slug ? "#C9A84C" : "rgba(245,237,214,0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <h3 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A84C",
              margin: "36px 0 16px",
              paddingBottom: 12,
              borderBottom: "1px solid rgba(201,168,76,0.15)",
            }}>
              Sort By
            </h3>
            <select
              className="hans-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: "100%" }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Cart link */}
            <Link href="/cart" style={{
              display: "block",
              marginTop: 36,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textAlign: "center",
              padding: "12px 20px",
              border: "1px solid rgba(201,168,76,0.4)",
              color: "#C9A84C",
              textDecoration: "none",
              transition: "all 0.3s",
            }}>
              🛒 View Cart
            </Link>
          </div>
        </motion.aside>

        {/* ── Mobile filter toggle ── */}
        <div className="hans-mobile-filters" style={{ display: "none" }}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "10px 20px",
              background: "transparent",
              border: "1px solid rgba(201,168,76,0.3)",
              color: "#C9A84C",
              cursor: "pointer",
              marginBottom: 16,
            }}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          {showFilters && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {HANS_FILTERS.map((f) => (
                <button
                  key={f.slug}
                  className={`hans-filter-btn ${activeFilter === f.slug ? "active" : ""}`}
                  onClick={() => setActiveFilter(f.slug === activeFilter ? "" : f.slug)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Product Grid ── */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <div style={{
              textAlign: "center",
              padding: "80px 0",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.2rem",
              color: "rgba(201,168,76,0.5)",
            }}>
              Loading collection...
            </div>
          ) : products.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "80px 0",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.2rem",
              color: "rgba(245,230,192,0.4)",
            }}>
              No products found for this filter. Try a different selection.
            </div>
          ) : (
            <div
              className="hans-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 28,
              }}
            >
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  className="hans-product-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  style={{
                    background: "#120F03",
                    border: "1px solid rgba(201,168,76,0.1)",
                  }}
                >
                  {/* Image */}
                  <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "130%",
                      overflow: "hidden",
                      background: "#1A1508",
                    }}>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 1s cubic-bezier(0.25, 1, 0.5, 1), filter 0.6s",
                          transform: hoveredProduct === product.id ? "scale(1.08)" : "scale(1)",
                          filter: hoveredProduct === product.id ? "brightness(1.05)" : "brightness(0.85)",
                        }}
                      />
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "40%",
                        background: "linear-gradient(to top, rgba(18,15,3,0.9), transparent)",
                        pointerEvents: "none",
                      }} />
                    </div>
                  </Link>

                  {/* Info */}
                  <div style={{ padding: "18px 20px 20px" }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                      {product.categories?.slice(0, 2).map((cat: Category) => (
                        <span key={cat.id} style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "0.45rem",
                          fontWeight: 500,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "rgba(201,168,76,0.6)",
                          background: "rgba(201,168,76,0.06)",
                          padding: "3px 8px",
                          border: "1px solid rgba(201,168,76,0.1)",
                        }}>
                          {cat.name}
                        </span>
                      ))}
                    </div>

                    <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: "#FAF5E9",
                        margin: "0 0 8px",
                        lineHeight: 1.3,
                      }}>
                        {product.name}
                      </h3>
                    </Link>

                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.85rem",
                      color: "rgba(245,230,192,0.4)",
                      margin: "0 0 14px",
                      lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {product.description}
                    </p>

                    <p style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#C9A84C",
                      margin: "0 0 16px",
                      letterSpacing: "0.05em",
                    }}>
                      ₹{parseInt(product.base_price).toLocaleString("en-IN")}
                    </p>

                    {product.variants && product.variants.length > 0 && (
                      <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.5rem",
                        color: "rgba(245,237,214,0.35)",
                        letterSpacing: "0.1em",
                        margin: "0 0 14px",
                      }}>
                        {Array.from(new Set(product.variants.map((v: Variant) => v.size))).length} sizes available
                      </p>
                    )}

                    <button className="hans-add-btn" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function HansShop() {
  return (
    <Suspense fallback={<div style={{ background: "#0A0800", minHeight: "100vh", paddingTop: "100px", textAlign: "center", color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>Loading...</div>}>
      <HansShopContent />
    </Suspense>
  );
}
