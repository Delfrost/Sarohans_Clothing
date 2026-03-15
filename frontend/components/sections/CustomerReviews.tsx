"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';

// --- TypeScript Interfaces ---
interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  timestamp: number;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Ananya R.",
    rating: 5,
    text: "The Rajputana Saree I received is nothing short of a masterpiece. The zardozi work reflects true royal heritage. I felt like a queen draped in elegance.",
    timestamp: Date.now() - 100000,
  },
  {
    id: 2,
    name: "Priyanka S.",
    rating: 5,
    text: "Impeccable craftsmanship! The deep red tones paired with the gold brocade are mesmerizing. Truly a brand that honors traditional Indian artistry.",
    timestamp: Date.now() - 50000,
  },
  {
    id: 3,
    name: "Nandini V.",
    rating: 4,
    text: "A beautiful addition to my ethnic collection. The silk is incredibly soft and the rich dark aesthetics of the packaging were a delightful premium touch.",
    timestamp: Date.now() - 20000,
  },
];

const ROYAL_IMAGES = [
  "https://i.pinimg.com/736x/79/19/13/7919137f9828778dbcf30196742c3739.jpg",
  "https://i.pinimg.com/736x/b1/ae/a4/b1aea4b0bf08acca7b6bea0259e12bcf.jpg",
  "https://i.pinimg.com/736x/94/0b/0a/940b0a76dd03450bb6ff4c0907fc018d.jpg"
];

function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState({ name: '', rating: 5, text: '' });
  const [notification, setNotification] = useState<{ message: string; isError: boolean } | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [formVisible, setFormVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  // Load reviews on mount
  useEffect(() => {
    const stored = localStorage.getItem('tanviReviews');
    if (stored) {
      setReviews(JSON.parse(stored));
    } else {
      localStorage.setItem('tanviReviews', JSON.stringify(DEFAULT_REVIEWS));
      setReviews(DEFAULT_REVIEWS);
    }
  }, []);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) {
              setTimeout(() => {
                setVisibleCards(prev => new Set([...prev, idx]));
              }, idx * 200);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [reviews]);

  // Intersection Observer for form
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFormVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (formRef.current) observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) {
      showToast("Please complete all fields gracefully.", true);
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      name: formData.name.trim(),
      rating: formData.rating,
      text: formData.text.trim(),
      timestamp: Date.now(),
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem('tanviReviews', JSON.stringify(updatedReviews));
    setFormData({ name: '', rating: 5, text: '' });
    showToast("Your review has been added gracefully.", false);
  };

  const showToast = (message: string, isError: boolean) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 3000);
  };

  const topReviews = [...reviews]
    .sort((a, b) => b.rating !== a.rating ? b.rating - a.rating : b.timestamp - a.timestamp)
    .slice(0, 3);

  return (
    <div className="sr-reviews-wrapper" ref={sectionRef}>
      <section id="customer-experiences" className="sr-reviews-section">
        
        {/* Animated background elements */}
        <div className="sr-bg-pattern"></div>
        <div className="sr-floating-ornament sr-float-1">✦</div>
        <div className="sr-floating-ornament sr-float-2">❖</div>
        <div className="sr-floating-ornament sr-float-3">✧</div>
        <div className="sr-corner-accent sr-corner-tl"></div>
        <div className="sr-corner-accent sr-corner-br"></div>

        {/* Section Header */}
        <div className="sr-section-header">
          <span className="sr-header-tag">TESTIMONIALS</span>
          <h2 className="sr-section-title">Customer Experiences</h2>
          <div className="sr-ornament-line">
            <span className="sr-ornament-diamond">◆</span>
          </div>
          <p className="sr-section-subtitle">Voices of Elegance from Our Royal Clients</p>
        </div>

        {/* Reviews Grid */}
        <div className="sr-reviews-grid">
          {topReviews.map((review, index) => (
            <div 
              key={review.id} 
              className={`sr-review-card ${visibleCards.has(index) ? 'sr-card-visible' : ''}`}
              ref={el => { cardRefs.current[index] = el; }}
            >
              <div className="sr-card-glow"></div>
              <div 
                className="sr-card-bg-image" 
                style={{ backgroundImage: `url('${ROYAL_IMAGES[index % ROYAL_IMAGES.length]}')` }}
              />
              <div className="sr-card-gradient-overlay"></div>
              <div className="sr-card-border-anim"></div>
              <div className="sr-card-inner-frame"></div>
              
              <div className="sr-review-content">
                <div className="sr-quote-mark">❝</div>
                <p className="sr-review-text">{review.text}</p>
                <div className="sr-review-divider"></div>
                <h4 className="sr-review-author">— {review.name}</h4>
                <div className="sr-review-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={star <= review.rating ? 'sr-star-filled' : 'sr-star-empty'}>
                      {star <= review.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Review Form */}
        <div 
          className={`sr-submission-section ${formVisible ? 'sr-form-visible' : ''}`}
          ref={formRef}
        >
          <div className="sr-form-accent-top"></div>
          <h3 className="sr-form-title">Share Your Heritage Tale</h3>
          <div className="sr-form-subtitle-line"></div>
          <form onSubmit={handleSubmit}>
            
            <div className="sr-form-group">
              <label htmlFor="reviewer-name">Your Gracious Name</label>
              <input 
                type="text" 
                id="reviewer-name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="sr-form-input" 
                required 
                placeholder="e.g. Maharani Devika" 
              />
            </div>

            <div className="sr-form-group">
              <label>Rate Your Experience</label>
              <div className="sr-star-rating-input">
                {[5, 4, 3, 2, 1].map((star) => (
                  <React.Fragment key={star}>
                    <input 
                      type="radio" 
                      id={`sr-star${star}`} 
                      name="rating" 
                      value={star} 
                      checked={formData.rating === star}
                      onChange={handleInputChange}
                      required 
                    />
                    <label htmlFor={`sr-star${star}`} title={`${star} stars`}>★</label>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="sr-form-group">
              <label htmlFor="review-text">Your Review</label>
              <textarea 
                id="review-text" 
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                className="sr-form-input sr-textarea" 
                required 
                placeholder="Describe the elegance and craftsmanship of your attire..."
              />
            </div>

            <button type="submit" className="sr-submit-btn">
              <span className="sr-btn-text">Submit Review</span>
              <span className="sr-btn-shine"></span>
            </button>
          </form>
        </div>
      </section>

      {/* Notification Toast */}
      <div 
        className={`sr-notification-toast ${notification ? 'sr-toast-show' : ''}`}
        style={{
          backgroundColor: notification?.isError ? '#6b1010' : '#1a3a1a',
          borderColor: notification?.isError ? '#c5383a' : '#c9a84c',
          color: '#fff'
        }}
      >
        <span className="sr-toast-icon">{notification?.isError ? '⚠' : '✦'}</span>
        {notification?.message}
      </div>

      {/* =========================== SCOPED CSS =========================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');

        /* ============ ROOT VARIABLES ============ */
        .sr-reviews-wrapper {
          --sr-black: #0a0a0a;
          --sr-black-deep: #050505;
          --sr-black-card: #0d0d0d;
          --sr-gold: #c9a84c;
          --sr-gold-light: #e8d5a3;
          --sr-gold-bright: #f0d060;
          --sr-gold-dim: rgba(201, 168, 76, 0.15);
          --sr-green-deep: #0b2b1a;
          --sr-green-accent: #1a4d2e;
          --sr-green-glow: rgba(26, 77, 46, 0.4);
          --sr-green-border: rgba(26, 77, 46, 0.35);
          --sr-white: #f5f0e8;
          --sr-white-muted: #b8a99a;
          --sr-font-display: 'Cinzel', serif;
          --sr-font-elegant: 'Playfair Display', serif;
          --sr-font-body: 'Cormorant Garamond', serif;
          --sr-font-ui: 'Lato', sans-serif;
          --sr-ease: cubic-bezier(0.16, 1, 0.3, 1);

          font-family: var(--sr-font-body);
          background-color: var(--sr-black);
          color: var(--sr-white);
          width: 100%;
          position: relative;
        }

        /* ============ SECTION WRAPPER ============ */
        .sr-reviews-section {
          padding: 130px 24px 120px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            175deg,
            #050505 0%,
            #0a0f0b 25%,
            #0b1a10 40%,
            #080d09 60%,
            #050505 100%
          );
          border-top: 1px solid var(--sr-gold-dim);
          border-bottom: 1px solid var(--sr-gold-dim);
          width: 100%;
        }

        /* ============ BACKGROUND PATTERN ============ */
        .sr-bg-pattern {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image:
            radial-gradient(ellipse 600px 800px at 15% 20%, rgba(26, 77, 46, 0.12), transparent),
            radial-gradient(ellipse 500px 700px at 85% 75%, rgba(201, 168, 76, 0.06), transparent),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 80px,
              rgba(201, 168, 76, 0.02) 80px,
              rgba(201, 168, 76, 0.02) 81px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 80px,
              rgba(201, 168, 76, 0.02) 80px,
              rgba(201, 168, 76, 0.02) 81px
            );
          z-index: 0;
          pointer-events: none;
          animation: sr-patternShift 20s ease-in-out infinite alternate;
        }

        @keyframes sr-patternShift {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        /* ============ FLOATING ORNAMENTS ============ */
        .sr-floating-ornament {
          position: absolute;
          color: var(--sr-gold);
          opacity: 0.08;
          font-size: 2.5rem;
          z-index: 0;
          pointer-events: none;
          animation: sr-floatOrn 8s ease-in-out infinite;
        }

        .sr-float-1 { top: 12%; left: 8%; animation-delay: 0s; }
        .sr-float-2 { top: 55%; right: 6%; animation-delay: 2.5s; font-size: 3rem; }
        .sr-float-3 { bottom: 15%; left: 15%; animation-delay: 5s; font-size: 2rem; }

        @keyframes sr-floatOrn {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.06; }
          50% { transform: translateY(-18px) rotate(15deg); opacity: 0.14; }
        }

        /* ============ CORNER ACCENTS ============ */
        .sr-corner-accent {
          position: absolute;
          width: 120px;
          height: 120px;
          z-index: 0;
          pointer-events: none;
        }

        .sr-corner-tl {
          top: 30px; left: 30px;
          border-top: 2px solid var(--sr-gold);
          border-left: 2px solid var(--sr-gold);
          opacity: 0.2;
          animation: sr-cornerPulse 4s ease-in-out infinite;
        }

        .sr-corner-br {
          bottom: 30px; right: 30px;
          border-bottom: 2px solid var(--sr-gold);
          border-right: 2px solid var(--sr-gold);
          opacity: 0.2;
          animation: sr-cornerPulse 4s ease-in-out infinite 2s;
        }

        @keyframes sr-cornerPulse {
          0%, 100% { opacity: 0.15; width: 120px; height: 120px; }
          50% { opacity: 0.35; width: 130px; height: 130px; }
        }

        /* ============ SECTION HEADER ============ */
        .sr-section-header {
          text-align: center;
          margin: 0 auto 80px auto;
          max-width: 1200px;
          position: relative;
          z-index: 1;
          animation: sr-headerFadeIn 1.2s var(--sr-ease) forwards;
          opacity: 0;
          transform: translateY(25px);
        }

        @keyframes sr-headerFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .sr-header-tag {
          display: inline-block;
          font-family: var(--sr-font-ui);
          font-size: 0.7rem;
          letter-spacing: 6px;
          color: var(--sr-gold);
          text-transform: uppercase;
          font-weight: 700;
          padding: 8px 24px;
          border: 1px solid var(--sr-gold-dim);
          margin-bottom: 28px;
          position: relative;
          background: linear-gradient(135deg, rgba(26, 77, 46, 0.15), rgba(10, 10, 10, 0.9));
        }

        .sr-section-title {
          font-family: var(--sr-font-display);
          font-size: 3.5rem;
          color: #ffffff;
          letter-spacing: 5px;
          margin-bottom: 8px;
          text-transform: uppercase;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff 0%, var(--sr-gold-light) 50%, #ffffff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: sr-shimmerTitle 5s ease-in-out infinite;
        }

        @keyframes sr-shimmerTitle {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }

        .sr-section-subtitle {
          font-family: var(--sr-font-elegant);
          font-size: 1.15rem;
          color: var(--sr-gold);
          font-style: italic;
          letter-spacing: 3px;
          opacity: 0.85;
          margin-top: 4px;
        }

        .sr-ornament-line {
          margin: 24px auto;
          width: 220px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--sr-green-accent), var(--sr-gold), var(--sr-green-accent), transparent);
          position: relative;
          animation: sr-ornamentGlow 3s ease-in-out infinite;
        }

        @keyframes sr-ornamentGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(201, 168, 76, 0.0); }
          50% { box-shadow: 0 0 16px rgba(201, 168, 76, 0.3); }
        }

        .sr-ornament-diamond {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--sr-gold);
          font-size: 12px;
          background: var(--sr-green-deep);
          padding: 0 16px;
        }

        /* ============ REVIEWS GRID ============ */
        .sr-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 36px;
          max-width: 1200px;
          margin: 0 auto 110px auto;
          position: relative;
          z-index: 1;
        }

        /* ============ REVIEW CARD ============ */
        .sr-review-card {
          background: linear-gradient(165deg, var(--sr-black-card) 0%, #0a1a10 50%, var(--sr-black-card) 100%);
          border: 1px solid var(--sr-green-border);
          padding: 50px 35px 40px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition: all 0.7s var(--sr-ease);
          cursor: default;
        }

        .sr-review-card.sr-card-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .sr-review-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: var(--sr-gold);
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(201, 168, 76, 0.08),
            inset 0 1px 0 rgba(201, 168, 76, 0.15);
        }

        /* Card glow effect on hover */
        .sr-card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(201, 168, 76, 0.06), transparent 60%);
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
          z-index: 0;
        }

        .sr-review-card:hover .sr-card-glow {
          opacity: 1;
        }

        /* Background image with overlay */
        .sr-card-bg-image {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0.1;
          filter: grayscale(60%) contrast(1.1) brightness(0.6);
          z-index: 0;
          pointer-events: none;
          transition: all 0.8s ease;
        }

        .sr-review-card:hover .sr-card-bg-image {
          opacity: 0.18;
          transform: scale(1.08);
          filter: grayscale(40%) contrast(1.2) brightness(0.7);
        }

        .sr-card-gradient-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(
            180deg,
            rgba(11, 43, 26, 0.5) 0%,
            rgba(10, 10, 10, 0.85) 40%,
            rgba(5, 5, 5, 0.95) 100%
          );
          z-index: 0;
          pointer-events: none;
        }

        /* Animated border shine */
        .sr-card-border-anim {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .sr-card-border-anim::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            transparent 0deg,
            transparent 340deg,
            rgba(201, 168, 76, 0.3) 345deg,
            rgba(201, 168, 76, 0.5) 350deg,
            transparent 360deg
          );
          animation: sr-borderRotate 6s linear infinite;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .sr-review-card:hover .sr-card-border-anim::before {
          opacity: 1;
        }

        @keyframes sr-borderRotate {
          to { transform: rotate(360deg); }
        }

        /* Inner frame */
        .sr-card-inner-frame {
          position: absolute;
          top: 12px; left: 12px; right: 12px; bottom: 12px;
          border: 1px solid rgba(201, 168, 76, 0.08);
          pointer-events: none;
          z-index: 1;
          transition: all 0.5s var(--sr-ease);
        }

        .sr-review-card:hover .sr-card-inner-frame {
          border-color: rgba(201, 168, 76, 0.25);
          top: 14px; left: 14px; right: 14px; bottom: 14px;
        }

        /* Review content */
        .sr-review-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          width: 100%;
        }

        .sr-quote-mark {
          color: var(--sr-gold);
          font-size: 4rem;
          font-family: var(--sr-font-elegant);
          line-height: 1;
          opacity: 0.25;
          margin-bottom: -8px;
          transition: all 0.5s ease;
          filter: drop-shadow(0 0 6px rgba(201, 168, 76, 0.15));
        }

        .sr-review-card:hover .sr-quote-mark {
          opacity: 0.5;
          transform: scale(1.1);
          filter: drop-shadow(0 0 12px rgba(201, 168, 76, 0.3));
        }

        .sr-review-text {
          font-family: var(--sr-font-body);
          font-size: 1.1rem;
          color: var(--sr-white);
          margin-bottom: 28px;
          margin-top: 12px;
          flex-grow: 1;
          line-height: 1.9;
          font-weight: 400;
          letter-spacing: 0.3px;
        }

        .sr-review-divider {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--sr-gold), transparent);
          margin-bottom: 20px;
          transition: width 0.5s var(--sr-ease);
        }

        .sr-review-card:hover .sr-review-divider {
          width: 80px;
        }

        .sr-review-author {
          font-family: var(--sr-font-display);
          color: var(--sr-gold-light);
          font-size: 1rem;
          letter-spacing: 3px;
          margin-bottom: 10px;
          text-transform: uppercase;
          font-weight: 600;
        }

        .sr-review-stars {
          letter-spacing: 5px;
          font-size: 1.1rem;
        }

        .sr-star-filled {
          color: var(--sr-gold);
          text-shadow: 0 0 8px rgba(201, 168, 76, 0.4);
          transition: transform 0.3s ease;
          display: inline-block;
        }

        .sr-review-card:hover .sr-star-filled {
          animation: sr-starPop 0.4s ease forwards;
        }

        .sr-review-card:hover .sr-star-filled:nth-child(2) { animation-delay: 0.05s; }
        .sr-review-card:hover .sr-star-filled:nth-child(3) { animation-delay: 0.1s; }
        .sr-review-card:hover .sr-star-filled:nth-child(4) { animation-delay: 0.15s; }
        .sr-review-card:hover .sr-star-filled:nth-child(5) { animation-delay: 0.2s; }

        @keyframes sr-starPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        .sr-star-empty {
          color: rgba(201, 168, 76, 0.15);
        }

        /* ============ SUBMISSION SECTION ============ */
        .sr-submission-section {
          background: linear-gradient(145deg, #080808 0%, var(--sr-green-deep) 50%, #080808 100%);
          border: 1px solid rgba(201, 168, 76, 0.18);
          padding: 65px 55px;
          position: relative;
          z-index: 1;
          max-width: 780px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.9s var(--sr-ease);
          overflow: hidden;
        }

        .sr-submission-section.sr-form-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .sr-form-accent-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--sr-green-accent), var(--sr-gold), var(--sr-green-accent), transparent);
          animation: sr-accentShine 4s ease-in-out infinite;
        }

        @keyframes sr-accentShine {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .sr-form-title {
          font-family: var(--sr-font-display);
          color: #ffffff;
          text-align: center;
          font-size: 2rem;
          margin-bottom: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: linear-gradient(135deg, #ffffff, var(--sr-gold-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sr-form-subtitle-line {
          width: 60px;
          height: 1px;
          background: var(--sr-gold);
          margin: 0 auto 45px;
          opacity: 0.5;
        }

        .sr-form-group {
          margin-bottom: 32px;
        }

        .sr-form-group label {
          display: block;
          margin-bottom: 10px;
          color: var(--sr-white-muted);
          font-family: var(--sr-font-ui);
          font-size: 0.78rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sr-form-input {
          width: 100%;
          background: rgba(5, 5, 5, 0.8);
          border: 1px solid rgba(201, 168, 76, 0.1);
          color: var(--sr-white);
          font-family: var(--sr-font-body);
          font-size: 1.05rem;
          padding: 16px 22px;
          transition: all 0.4s var(--sr-ease);
          border-radius: 0;
          letter-spacing: 0.5px;
          box-sizing: border-box;
        }

        .sr-form-input:focus {
          outline: none;
          border-color: var(--sr-gold);
          background: rgba(11, 43, 26, 0.15);
          box-shadow: 
            0 0 0 1px rgba(201, 168, 76, 0.1),
            0 0 20px rgba(201, 168, 76, 0.05),
            inset 0 0 20px rgba(26, 77, 46, 0.08);
        }

        .sr-form-input::placeholder {
          color: rgba(184, 169, 154, 0.35);
          font-style: italic;
        }

        .sr-textarea {
          resize: vertical;
          min-height: 130px;
        }

        /* Star rating */
        .sr-star-rating-input {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
          gap: 6px;
        }

        .sr-star-rating-input input { display: none; }

        .sr-star-rating-input label {
          color: rgba(201, 168, 76, 0.15);
          font-size: 2.4rem;
          cursor: pointer;
          transition: all 0.25s ease;
          margin: 0;
          line-height: 1;
        }

        .sr-star-rating-input label:hover,
        .sr-star-rating-input label:hover ~ label,
        .sr-star-rating-input input:checked ~ label {
          color: var(--sr-gold);
          text-shadow: 0 0 12px rgba(201, 168, 76, 0.4);
          transform: scale(1.1);
        }

        /* Submit button */
        .sr-submit-btn {
          background: linear-gradient(135deg, var(--sr-green-deep), #0a1a10);
          color: var(--sr-gold);
          border: 1px solid var(--sr-gold);
          padding: 18px 56px;
          font-family: var(--sr-font-display);
          font-size: 0.9rem;
          letter-spacing: 4px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.5s var(--sr-ease);
          display: block;
          margin: 50px auto 0;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
        }

        .sr-btn-text {
          position: relative;
          z-index: 1;
        }

        .sr-btn-shine {
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.15), transparent);
          transition: left 0.6s ease;
          z-index: 0;
        }

        .sr-submit-btn:hover .sr-btn-shine {
          left: 100%;
        }

        .sr-submit-btn:hover {
          background: linear-gradient(135deg, var(--sr-gold), var(--sr-gold-bright));
          color: var(--sr-black-deep);
          border-color: var(--sr-gold-bright);
          box-shadow:
            0 0 30px rgba(201, 168, 76, 0.25),
            0 8px 30px rgba(0, 0, 0, 0.4);
          transform: translateY(-3px);
        }

        .sr-submit-btn:active {
          transform: translateY(0);
          box-shadow: 0 0 15px rgba(201, 168, 76, 0.15);
        }

        /* ============ NOTIFICATION TOAST ============ */
        .sr-notification-toast {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%) translateY(80px);
          padding: 16px 36px;
          font-family: var(--sr-font-ui);
          font-weight: 600;
          letter-spacing: 2px;
          opacity: 0;
          border: 1px solid;
          transition: all 0.5s var(--sr-ease);
          z-index: 1000;
          pointer-events: none;
          text-transform: uppercase;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 10px;
          backdrop-filter: blur(10px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
        }

        .sr-notification-toast.sr-toast-show {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }

        .sr-toast-icon {
          font-size: 1.1rem;
          color: var(--sr-gold);
        }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 992px) {
          .sr-reviews-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
          .sr-section-title { font-size: 2.6rem; letter-spacing: 3px; }
          .sr-corner-accent { width: 80px; height: 80px; }
        }

        @media (max-width: 768px) {
          .sr-reviews-section { padding: 90px 16px 80px; }
          .sr-section-title { font-size: 2rem; letter-spacing: 2px; }
          .sr-section-subtitle { font-size: 0.95rem; letter-spacing: 1px; }
          .sr-reviews-grid { grid-template-columns: 1fr; gap: 32px; max-width: 480px; }
          .sr-review-card { padding: 40px 28px 32px; }
          .sr-submission-section { 
            padding: 45px 24px; 
            margin: 0 12px;
          }
          .sr-form-title { font-size: 1.5rem; letter-spacing: 2px; }
          .sr-submit-btn { padding: 16px 40px; font-size: 0.8rem; letter-spacing: 3px; }
          .sr-corner-accent { display: none; }
          .sr-floating-ornament { display: none; }
          .sr-header-tag { font-size: 0.6rem; letter-spacing: 4px; padding: 6px 16px; }
        }

        @media (max-width: 480px) {
          .sr-reviews-section { padding: 70px 12px 60px; }
          .sr-section-title { font-size: 1.6rem; }
          .sr-review-card { padding: 32px 20px 28px; }
          .sr-submission-section { padding: 35px 18px; }
        }
      `}</style>
    </div>
  );
}

// --- Main Page Component ---
export default function App() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505] overflow-hidden">
      
      {/* This is where the full page layout goes. 
        Uncomment the sections below once you want to see everything together! 
      */}
      
      {/* <HeroSection /> */}
      {/* <FeaturedCollections /> */}
      {/* <ShopByCraft /> */}
      {/* <ArtisanSpotlight /> */}

      {/* Your New Reviews Section */}
      <CustomerReviews />

    </main>
  );
}