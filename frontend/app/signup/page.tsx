"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User } from "lucide-react";
import "../auth.css";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed. Please try again.");
        return;
      }

      router.push("/login");
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Form Side */}
      <div className="auth-form-side auth-signup">
        <div className="auth-form-wrapper">
          <h1 className="auth-title">Become Royal</h1>
          <p className="auth-subtitle">Create an account to discover true elegance and craftsmanship.</p>

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <User className="auth-input-icon" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                required
                placeholder="Full Name"
              />
            </div>

            <div className="auth-input-group">
              <Mail className="auth-input-icon" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
                placeholder="Email Address"
              />
            </div>

            <div className="auth-input-group">
              <Lock className="auth-input-icon" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
                placeholder="Password"
              />
            </div>

            <div className="auth-input-group">
              <Lock className="auth-input-icon" size={20} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
                required
                placeholder="Confirm Password"
              />
            </div>

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "0.85rem", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>
                {error}
              </p>
            )}

            <button type="submit" className="auth-btn" disabled={isSubmitting}>
              {isSubmitting ? "SIGNING UP..." : "SIGN UP"}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="auth-social-btns">
            <button className="auth-social-btn" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="auth-link-text">
            Already have an account?{" "}
            <Link href="/login" className="auth-link">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Image Side */}
      <div className="auth-image-side">
        <img
          src="https://i.pinimg.com/736x/8a/ce/32/8ace32acd7cc0511b89b1ae51c3b01f9.jpg"
          alt="Sarohans Fashion"
          className="auth-image"
        />
      </div>
    </div>
  );
}
