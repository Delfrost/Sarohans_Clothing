"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const API_BASE = "http://localhost:5000/api";

interface CartItem {
  cart_item_id: number;
  quantity: number;
  variant_id: string;
  size: string;
  color: string;
  price: string;
  stock_quantity: number;
  product_id: string;
  product_name: string;
  image_url: string;
  description: string;
}

interface Cart {
  id: number;
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const fetchCart = useCallback(async () => {
    const sessionId = localStorage.getItem("sarohans_session");
    if (!sessionId) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/cart?sessionId=${sessionId}`);
      const data = await res.json();
      if (data.success) setCart(data.cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    setUpdating(cartItemId);
    try {
      const res = await fetch(`${API_BASE}/cart/item/${cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCart();
      } else {
        setMessage(data.message);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (cartItemId: number) => {
    setUpdating(cartItemId);
    try {
      const res = await fetch(`${API_BASE}/cart/item/${cartItemId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchCart();
        setMessage("Item removed from cart");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error removing item:", err);
    } finally {
      setUpdating(null);
    }
  };

  const clearCart = async () => {
    const sessionId = localStorage.getItem("sarohans_session");
    if (!sessionId) return;

    try {
      const res = await fetch(`${API_BASE}/cart/clear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCart();
        setMessage("Cart cleared");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const shipping = cart && cart.subtotal >= 5000 ? 0 : 199;
  const total = cart ? cart.subtotal + shipping : 0;

  return (
    <main style={{ background: "#0A0800", minHeight: "100vh", paddingTop: "110px" }}>
      <style>{`
        .cart-qty-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(201,168,76,0.3);
          background: transparent;
          color: #C9A84C;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        .cart-qty-btn:hover { background: rgba(201,168,76,0.1); }
        .cart-remove-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.5rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,100,100,0.6);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          transition: color 0.3s;
        }
        .cart-remove-btn:hover { color: rgba(255,100,100,0.9); }
        .cart-checkout-btn {
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
        .cart-checkout-btn:hover {
          background: #E8D5A3;
          box-shadow: 0 4px 20px rgba(201,168,76,0.3);
        }
        .cart-clear-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.5rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,237,214,0.35);
          background: none;
          border: 1px solid rgba(245,237,214,0.15);
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .cart-clear-btn:hover { border-color: rgba(255,100,100,0.4); color: rgba(255,100,100,0.6); }
        .cart-continue-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.55rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 12px 24px;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.35);
          color: #C9A84C;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-block;
          text-align: center;
          width: 100%;
        }
        .cart-continue-btn:hover { border-color: #C9A84C; }
        .cart-toast {
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
          .cart-layout { flex-direction: column !important; }
          .cart-items-col { width: 100% !important; }
          .cart-summary-col { width: 100% !important; }
          .cart-item-row { flex-direction: column !important; }
          .cart-item-image { width: 100% !important; height: 200px !important; }
        }
      `}</style>

      {/* Toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            className="cart-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Page Header ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        style={{ textAlign: "center", padding: "0 24px 50px" }}
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
          Your Selection
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 400,
          color: "#FAF5E9",
          letterSpacing: "0.04em",
          margin: "0 0 12px",
        }}>
          Shopping Cart
        </h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4))" }} />
          <div style={{ width: 6, height: 6, transform: "rotate(45deg)", background: "#C9A84C", opacity: 0.5 }} />
          <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, rgba(201,168,76,0.4))" }} />
        </div>
      </motion.div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            color: "rgba(201,168,76,0.5)",
          }}>Loading cart...</p>
        </div>
      ) : !cart || cart.items.length === 0 ? (
        /* Empty Cart */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center", padding: "40px 24px 100px" }}
        >
          <div style={{
            width: 80,
            height: 80,
            margin: "0 auto 24px",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
          }}>
            🛒
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.3rem",
            color: "rgba(245,230,192,0.5)",
            margin: "0 0 32px",
          }}>
            Your cart is empty
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/saro" style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "14px 28px",
              border: "1px solid rgba(201,168,76,0.5)",
              color: "#C9A84C",
              textDecoration: "none",
              transition: "all 0.3s",
            }}>
              Browse Saro
            </Link>
            <Link href="/hans" style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "14px 28px",
              border: "1px solid rgba(201,168,76,0.5)",
              color: "#C9A84C",
              textDecoration: "none",
              transition: "all 0.3s",
            }}>
              Browse Hans
            </Link>
          </div>
        </motion.div>
      ) : (
        /* Cart with items */
        <div
          className="cart-layout"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px 80px",
            display: "flex",
            gap: 40,
            alignItems: "flex-start",
          }}
        >
          {/* ── Cart Items ── */}
          <div className="cart-items-col" style={{ flex: 1 }}>
            {/* Clear cart + item count */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: "1px solid rgba(201,168,76,0.1)",
            }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                color: "rgba(245,237,214,0.4)",
                textTransform: "uppercase",
              }}>
                {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}
              </span>
              <button className="cart-clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>

            {/* Items list */}
            <AnimatePresence>
              {cart.items.map((item) => (
                <motion.div
                  key={item.cart_item_id}
                  className="cart-item-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  style={{
                    display: "flex",
                    gap: 24,
                    padding: "24px 0",
                    borderBottom: "1px solid rgba(201,168,76,0.06)",
                    opacity: updating === item.cart_item_id ? 0.5 : 1,
                    transition: "opacity 0.3s",
                  }}
                >
                  {/* Image */}
                  <Link href={`/product/${item.product_id}`}>
                    <div
                      className="cart-item-image"
                      style={{
                        width: 120,
                        height: 160,
                        overflow: "hidden",
                        flexShrink: 0,
                        background: "#1A1508",
                        border: "1px solid rgba(201,168,76,0.08)",
                      }}
                    >
                      <img
                        src={item.image_url}
                        alt={item.product_name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: "brightness(0.9)",
                        }}
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <Link href={`/product/${item.product_id}`} style={{ textDecoration: "none" }}>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: "#FAF5E9",
                        margin: "0 0 6px",
                      }}>
                        {item.product_name}
                      </h3>
                    </Link>

                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.5rem",
                      color: "rgba(245,237,214,0.4)",
                      letterSpacing: "0.1em",
                      margin: "0 0 4px",
                    }}>
                      Size: {item.size} &nbsp;|&nbsp; Color: {item.color}
                    </p>

                    <p style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#C9A84C",
                      margin: "12px 0",
                    }}>
                      ₹{parseInt(item.price).toLocaleString("en-IN")}
                    </p>

                    {/* Quantity controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 10 }}>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item.cart_item_id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <div style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        color: "#FAF5E9",
                        width: 40,
                        textAlign: "center",
                        borderTop: "1px solid rgba(201,168,76,0.3)",
                        borderBottom: "1px solid rgba(201,168,76,0.3)",
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {item.quantity}
                      </div>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock_quantity}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="cart-remove-btn"
                      onClick={() => removeItem(item.cart_item_id)}
                    >
                      Remove
                    </button>
                  </div>

                  {/* Line total */}
                  <div style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#FAF5E9",
                    whiteSpace: "nowrap",
                  }}>
                    ₹{(parseInt(item.price) * item.quantity).toLocaleString("en-IN")}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── Order Summary ── */}
          <motion.div
            className="cart-summary-col"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              width: 360,
              flexShrink: 0,
              position: "sticky",
              top: 120,
            }}
          >
            <div style={{
              background: "#120F03",
              border: "1px solid rgba(201,168,76,0.15)",
              padding: "32px 28px",
            }}>
              <h3 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C9A84C",
                margin: "0 0 24px",
                paddingBottom: 16,
                borderBottom: "1px solid rgba(201,168,76,0.1)",
              }}>
                Order Summary
              </h3>

              {/* Subtotal */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "rgba(245,237,214,0.5)",
                }}>
                  Subtotal
                </span>
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.85rem",
                  color: "#FAF5E9",
                }}>
                  ₹{cart.subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Shipping */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "rgba(245,237,214,0.5)",
                }}>
                  Shipping
                </span>
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.85rem",
                  color: shipping === 0 ? "rgba(120,200,120,0.8)" : "#FAF5E9",
                }}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>

              {shipping > 0 && (
                <p style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.45rem",
                  color: "rgba(201,168,76,0.5)",
                  letterSpacing: "0.1em",
                  margin: "0 0 12px",
                }}>
                  Free shipping on orders above ₹5,000
                </p>
              )}

              {/* Divider */}
              <div style={{
                height: 1,
                background: "linear-gradient(90deg, rgba(201,168,76,0.2), transparent)",
                margin: "16px 0",
              }} />

              {/* Total */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 28,
              }}>
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                }}>
                  Total
                </span>
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#C9A84C",
                }}>
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Checkout button */}
              <button className="cart-checkout-btn">
                Proceed to Checkout
              </button>

              {/* Continue shopping */}
              <Link href="/" className="cart-continue-btn" style={{ marginTop: 12 }}>
                Continue Shopping
              </Link>

              {/* Trust badges */}
              <div style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid rgba(201,168,76,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}>
                {["🔒 Secure Checkout", "📦 Free Returns within 7 days", "✨ Authentic Handcrafted Products"].map((badge) => (
                  <p key={badge} style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.45rem",
                    letterSpacing: "0.1em",
                    color: "rgba(245,237,214,0.35)",
                    margin: 0,
                  }}>
                    {badge}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
