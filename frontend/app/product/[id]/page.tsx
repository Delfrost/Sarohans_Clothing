"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  sku_general: string;
  variants: Variant[];
  categories: Category[];
}

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_BASE}/products/${productId}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
          // Auto-select first variant
          if (data.product.variants?.length) {
            const v = data.product.variants[0];
            setSelectedSize(v.size);
            setSelectedColor(v.color);
            setSelectedVariant(v);
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }
    if (productId) fetchProduct();
  }, [productId]);

  // Update selected variant when size/color changes
  useEffect(() => {
    if (!product?.variants) return;
    const variant = product.variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor
    );
    setSelectedVariant(variant || null);
  }, [selectedSize, selectedColor, product]);

  const sizes = product?.variants
    ? Array.from(new Set(product.variants.map((v) => v.size)))
    : [];

  const colors = product?.variants
    ? Array.from(
        new Set(
          product.variants
            .filter((v) => !selectedSize || v.size === selectedSize)
            .map((v) => v.color)
        )
      )
    : [];

  const addToCart = async () => {
    if (!selectedVariant) return;

    let sessionId = localStorage.getItem("sarohans_session");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("sarohans_session", sessionId);
    }

    try {
      const res = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          variantId: selectedVariant.id,
          quantity,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCartMessage("✓ Added to cart successfully");
        setTimeout(() => setCartMessage(""), 3000);
      } else {
        setCartMessage(`✗ ${data.message}`);
        setTimeout(() => setCartMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const gender = product?.categories?.find((c) => c.gender)?.gender;
  const backLink = gender === "men" ? "/hans" : "/saro";
  const backLabel = gender === "men" ? "Hans Collection" : "Saro Collection";

  if (loading) {
    return (
      <main style={{ background: "#0A0800", minHeight: "100vh", paddingTop: "120px", textAlign: "center" }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.2rem",
          color: "rgba(201,168,76,0.5)",
        }}>
          Loading product...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main style={{ background: "#0A0800", minHeight: "100vh", paddingTop: "120px", textAlign: "center" }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.2rem",
          color: "rgba(245,230,192,0.4)",
        }}>
          Product not found.
        </p>
        <Link href="/" style={{ color: "#C9A84C", fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem" }}>
          Return to Home
        </Link>
      </main>
    );
  }

  return (
    <main style={{ background: "#0A0800", minHeight: "100vh", paddingTop: "110px" }}>
      <style>{`
        .pd-size-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          padding: 10px 20px;
          border: 1px solid rgba(201,168,76,0.25);
          background: transparent;
          color: rgba(245,237,214,0.6);
          cursor: pointer;
          transition: all 0.3s;
          min-width: 56px;
          text-align: center;
        }
        .pd-size-btn:hover { border-color: rgba(201,168,76,0.5); color: #C9A84C; }
        .pd-size-btn.active {
          background: rgba(201,168,76,0.12);
          border-color: #C9A84C;
          color: #C9A84C;
        }
        .pd-color-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.55rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          padding: 8px 16px;
          border: 1px solid rgba(201,168,76,0.2);
          background: transparent;
          color: rgba(245,237,214,0.5);
          cursor: pointer;
          transition: all 0.3s;
        }
        .pd-color-btn:hover { border-color: rgba(201,168,76,0.5); color: #C9A84C; }
        .pd-color-btn.active {
          background: rgba(201,168,76,0.1);
          border-color: #C9A84C;
          color: #C9A84C;
        }
        .pd-add-cart {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 16px 40px;
          background: #C9A84C;
          border: none;
          color: #0A0800;
          cursor: pointer;
          transition: all 0.4s;
          width: 100%;
        }
        .pd-add-cart:hover {
          background: #E8D5A3;
          box-shadow: 0 4px 20px rgba(201,168,76,0.3);
        }
        .pd-add-cart:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .pd-qty-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(201,168,76,0.3);
          background: transparent;
          color: #C9A84C;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        .pd-qty-btn:hover { background: rgba(201,168,76,0.1); }
        .pd-toast {
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
          .pd-layout { flex-direction: column !important; }
          .pd-image-col { width: 100% !important; max-height: 60vh !important; }
          .pd-info-col { width: 100% !important; padding: 32px 24px !important; }
        }
      `}</style>

      {/* Toast */}
      <AnimatePresence>
        {cartMessage && (
          <motion.div
            className="pd-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {cartMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      <div style={{
        maxWidth: 1300,
        margin: "0 auto",
        padding: "0 40px 24px",
      }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/" style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.5)",
            textDecoration: "none",
          }}>Home</Link>
          <span style={{ color: "rgba(201,168,76,0.3)", fontSize: "0.6rem" }}>›</span>
          <Link href={backLink} style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.5)",
            textDecoration: "none",
          }}>{backLabel}</Link>
          <span style={{ color: "rgba(201,168,76,0.3)", fontSize: "0.6rem" }}>›</span>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: "rgba(245,237,214,0.4)",
          }}>{product.name}</span>
        </div>
      </div>

      {/* ═══ Product Layout ═══ */}
      <div
        className="pd-layout"
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "0 40px 80px",
          display: "flex",
          gap: 60,
        }}
      >
        {/* ── Image Column ── */}
        <motion.div
          className="pd-image-col"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            width: "55%",
            position: "relative",
            overflow: "hidden",
            background: "#1A1508",
            border: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          <div style={{ position: "relative", paddingTop: "130%" }}>
            <img
              src={product.image_url}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            />
          </div>

          {/* Corner accents */}
          {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
            <div
              key={pos}
              style={{
                position: "absolute",
                width: 30,
                height: 30,
                borderColor: "rgba(201,168,76,0.3)",
                borderStyle: "solid",
                borderWidth: 0,
                ...(pos.includes("top") ? { top: 12 } : { bottom: 12 }),
                ...(pos.includes("left") ? { left: 12 } : { right: 12 }),
                ...(pos.includes("top") && pos.includes("left")
                  ? { borderTopWidth: 1, borderLeftWidth: 1 }
                  : pos.includes("top") && pos.includes("right")
                  ? { borderTopWidth: 1, borderRightWidth: 1 }
                  : pos.includes("bottom") && pos.includes("left")
                  ? { borderBottomWidth: 1, borderLeftWidth: 1 }
                  : { borderBottomWidth: 1, borderRightWidth: 1 }),
              }}
            />
          ))}
        </motion.div>

        {/* ── Info Column ── */}
        <motion.div
          className="pd-info-col"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            width: "45%",
            padding: "20px 0",
          }}
        >
          {/* Categories */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {product.categories?.map((cat) => (
              <span key={cat.id} style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.45rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.7)",
                background: "rgba(201,168,76,0.06)",
                padding: "4px 10px",
                border: "1px solid rgba(201,168,76,0.15)",
              }}>
                {cat.name}
              </span>
            ))}
          </div>

          {/* Product Name */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            fontWeight: 400,
            color: "#FAF5E9",
            letterSpacing: "0.04em",
            margin: "0 0 8px",
            lineHeight: 1.2,
          }}>
            {product.name}
          </h1>

          {/* SKU */}
          {product.sku_general && (
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.2em",
              color: "rgba(245,237,214,0.3)",
              margin: "0 0 20px",
            }}>
              SKU: {product.sku_general}
            </p>
          )}

          {/* Price */}
          <div style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            marginBottom: 24,
            paddingBottom: 24,
            borderBottom: "1px solid rgba(201,168,76,0.1)",
          }}>
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "1.8rem",
              fontWeight: 600,
              color: "#C9A84C",
              letterSpacing: "0.03em",
            }}>
              ₹{parseInt(selectedVariant?.price || product.base_price).toLocaleString("en-IN")}
            </span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.15em",
              color: "rgba(245,237,214,0.35)",
              textTransform: "uppercase",
            }}>
              Inclusive of all taxes
            </span>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.05rem",
            color: "rgba(245,230,192,0.6)",
            lineHeight: 1.8,
            margin: "0 0 32px",
            letterSpacing: "0.02em",
          }}>
            {product.description}
          </p>

          {/* Size Selection */}
          {sizes.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h4 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C9A84C",
                margin: "0 0 12px",
              }}>
                Size
              </h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`pd-size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {colors.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h4 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C9A84C",
                margin: "0 0 12px",
              }}>
                Color
              </h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`pd-color-btn ${selectedColor === color ? "active" : ""}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock info */}
          {selectedVariant && (
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
              color: selectedVariant.stock_quantity > 5
                ? "rgba(120,200,120,0.7)"
                : selectedVariant.stock_quantity > 0
                ? "rgba(255,200,100,0.7)"
                : "rgba(255,100,100,0.7)",
              margin: "0 0 24px",
            }}>
              {selectedVariant.stock_quantity > 5
                ? "✓ In Stock"
                : selectedVariant.stock_quantity > 0
                ? `⚡ Only ${selectedVariant.stock_quantity} left`
                : "✗ Out of Stock"}
            </p>
          )}

          {/* Quantity */}
          <div style={{ marginBottom: 28 }}>
            <h4 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A84C",
              margin: "0 0 12px",
            }}>
              Quantity
            </h4>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <button
                className="pd-qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "#FAF5E9",
                width: 52,
                textAlign: "center",
                borderTop: "1px solid rgba(201,168,76,0.3)",
                borderBottom: "1px solid rgba(201,168,76,0.3)",
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {quantity}
              </div>
              <button
                className="pd-qty-btn"
                onClick={() => setQuantity(Math.min(selectedVariant?.stock_quantity || 10, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className="pd-add-cart"
            onClick={addToCart}
            disabled={!selectedVariant || selectedVariant.stock_quantity === 0}
          >
            {!selectedVariant
              ? "Select options"
              : selectedVariant.stock_quantity === 0
              ? "Out of Stock"
              : "Add to Cart"}
          </button>

          {/* View Cart link */}
          <Link href="/cart" style={{
            display: "block",
            textAlign: "center",
            marginTop: 16,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.6)",
            textDecoration: "none",
            transition: "color 0.3s",
          }}>
            View Cart →
          </Link>

          {/* Gold divider */}
          <div style={{
            margin: "36px 0 0",
            height: 1,
            background: "linear-gradient(90deg, rgba(201,168,76,0.2), transparent)",
          }} />

          {/* Product details */}
          <div style={{ marginTop: 24 }}>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.5)",
              marginBottom: 12,
            }}>
              Product Details
            </p>
            <ul style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.9rem",
              color: "rgba(245,230,192,0.45)",
              lineHeight: 2,
              margin: 0,
              paddingLeft: 20,
            }}>
              <li>Premium quality fabric</li>
              <li>Handcrafted with traditional techniques</li>
              <li>Dry clean recommended</li>
              <li>Ships within 3-5 business days</li>
              <li>Free delivery on orders above ₹5,000</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
