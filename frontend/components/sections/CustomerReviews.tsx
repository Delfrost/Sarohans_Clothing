"use client";

import React, { useState, useEffect, FormEvent } from 'react';

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

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  // Handle Submit
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
    
    setFormData({ name: '', rating: 5, text: '' }); // Reset form
    showToast("Your review has been added gracefully.", false);
  };

  const showToast = (message: string, isError: boolean) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 3000);
  };

  // Sort and pick top 3
  const topReviews = [...reviews]
    .sort((a, b) => b.rating !== a.rating ? b.rating - a.rating : b.timestamp - a.timestamp)
    .slice(0, 3);

  return (
    <div className="tanvi-reviews-wrapper">
      <section id="customer-experiences" className="reviews-section">
        
        <div className="section-header">
          <h2 className="section-title">Customer Experiences</h2>
          <div className="ornament"></div>
          <p className="section-subtitle">Voices of Elegance from Our Royal Clients</p>
        </div>

        {/* Dynamic Grid for Top 3 Reviews */}
        <div className="reviews-grid">
          {topReviews.map((review, index) => (
            <div key={review.id} className="review-card">
              <div 
                className="card-texture" 
                style={{ backgroundImage: `url('${ROYAL_IMAGES[index % ROYAL_IMAGES.length]}')` }}
              />
              <div className="card-inner-border"></div>
              <div className="review-content-wrapper">
                <div className="quote-icon">“</div>
                <p className="review-text">{review.text}</p>
                <h4 className="review-author">— {review.name}</h4>
                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star}>{star <= review.rating ? '★' : '☆'}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Review Form */}
        <div className="submission-section">
          <h3 className="form-title">Share Your Heritage Tale</h3>
          <form onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label htmlFor="reviewer-name">Your Gracious Name</label>
              <input 
                type="text" 
                id="reviewer-name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control" 
                required 
                placeholder="e.g. Maharani Devika" 
              />
            </div>

            <div className="form-group">
              <label>Rate Your Experience</label>
              <div className="star-rating-input">
                {[5, 4, 3, 2, 1].map((star) => (
                  <React.Fragment key={star}>
                    <input 
                      type="radio" 
                      id={`star${star}`} 
                      name="rating" 
                      value={star} 
                      checked={formData.rating === star}
                      onChange={handleInputChange}
                      required 
                    />
                    <label htmlFor={`star${star}`} title={`${star} stars`}>★</label>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="review-text">Your Review</label>
              <textarea 
                id="review-text" 
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                className="form-control" 
                required 
                placeholder="Describe the elegance and craftsmanship of your attire..."
              />
            </div>

            <button type="submit" className="submit-btn">Submit Review</button>
          </form>
        </div>
      </section>

      {/* Notification Toast */}
      <div 
        className={`notification-toast ${notification ? 'show' : ''}`}
        style={{
          backgroundColor: notification?.isError ? '#8b0000' : 'var(--gold-primary)',
          color: notification?.isError ? '#fff' : 'var(--bg-dark)'
        }}
      >
        {notification?.message}
      </div>

      {/* Embedded Scoped CSS ensuring no conflicts with teammate's repo */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400&display=swap');

        .tanvi-reviews-wrapper {
            --bg-dark: #0b0b0b;
            --bg-card: rgba(18, 18, 18, 0.6);
            --gold-primary: #d4af37;
            --gold-light: #f3e5ab;
            --gold-dark: #aa8529;
            --gold-glow: rgba(212, 175, 55, 0.3);
            --gold-glow-strong: rgba(212, 175, 55, 0.6);
            --text-main: #e0e0e0;
            --text-muted: #a0a0a0;
            --font-heading: 'Cinzel', serif;
            --font-subheading: 'Playfair Display', serif;
            --font-body: 'Lato', sans-serif;
            --transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            
            font-family: var(--font-body);
            background-color: var(--bg-dark);
            color: var(--text-main);
            width: 100%;
        }

        .tanvi-reviews-wrapper .reviews-section {
            padding: 100px 20px;
            position: relative;
            overflow: hidden;
            background-color: #050505;
            border-top: 1px solid rgba(212, 175, 55, 0.15);
            border-bottom: 1px solid rgba(212, 175, 55, 0.15);
            width: 100%;
        }

        .tanvi-reviews-wrapper .reviews-section::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%; width: 200%; height: 200%;
            background: 
                radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 45%),
                radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 45%),
                radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 45%);
            z-index: 0; pointer-events: none;
            animation: ambientDrift 20s ease-in-out infinite alternate;
            mix-blend-mode: screen;
        }

        .tanvi-reviews-wrapper .reviews-section::after {
            content: '';
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background-image: url('https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1920&auto=format&fit=crop'); 
            background-size: cover; background-position: center; background-attachment: fixed;
            opacity: 0.03; mix-blend-mode: screen; z-index: 0; pointer-events: none;
        }

        @keyframes ambientDrift {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(2%, 2%) scale(1.03); }
        }

        .tanvi-reviews-wrapper .section-header {
            text-align: center; margin: 0 auto 60px auto; max-width: 1200px; position: relative; z-index: 1;
        }

        .tanvi-reviews-wrapper .section-title {
            font-family: var(--font-heading); font-size: 2.8rem; color: var(--gold-primary);
            letter-spacing: 3px; margin-bottom: 10px; text-transform: uppercase;
            text-shadow: 0 0 30px var(--gold-glow);
        }

        .tanvi-reviews-wrapper .section-subtitle {
            font-family: var(--font-subheading); font-size: 1.2rem; color: var(--gold-light);
            font-style: italic; letter-spacing: 1px; opacity: 0.9;
        }

        .tanvi-reviews-wrapper .ornament {
            margin: 20px auto; width: 150px; height: 2px;
            background: linear-gradient(90deg, transparent, var(--gold-primary), transparent);
            position: relative;
        }
        
        .tanvi-reviews-wrapper .ornament::after {
            content: '❖'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            color: var(--gold-primary); font-size: 14px; background-color: #050505; padding: 0 10px;
        }

        .tanvi-reviews-wrapper .reviews-grid {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;
            max-width: 1200px; margin: 0 auto 80px auto; position: relative; z-index: 1;
        }

        .tanvi-reviews-wrapper .review-card {
            background: var(--bg-card); border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 8px; padding: 40px 30px; position: relative; overflow: hidden;
            backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
            transition: var(--transition); display: flex; flex-direction: column;
            align-items: center; text-align: center; opacity: 0; transform: translateY(30px);
            animation: fadeUpIn 0.8s forwards;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(212,175,55,0.05);
        }

        .tanvi-reviews-wrapper .review-card:nth-child(2) { animation-delay: 0.2s; }
        .tanvi-reviews-wrapper .review-card:nth-child(3) { animation-delay: 0.4s; }

        @keyframes fadeUpIn { to { opacity: 1; transform: translateY(0); } }

        .tanvi-reviews-wrapper .review-card:hover {
            transform: translateY(-12px) scale(1.02); border-color: var(--gold-primary);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.9), 0 0 40px var(--gold-glow-strong), inset 0 0 20px rgba(212,175,55,0.1);
            z-index: 10;
        }

        .tanvi-reviews-wrapper .card-texture {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover; background-position: center; opacity: 0.6;
            z-index: 0; pointer-events: none; transition: transform 0.8s ease, opacity 0.4s ease;
        }

        .tanvi-reviews-wrapper .review-card:hover .card-texture { transform: scale(1.08); opacity: 0.8; }

        .tanvi-reviews-wrapper .card-texture::after {
            content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to bottom, rgba(11, 11, 11, 0.5) 0%, rgba(11, 11, 11, 0.95) 100%);
        }

        .tanvi-reviews-wrapper .card-inner-border {
            position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;
            border: 1px solid rgba(212, 175, 55, 0.1); border-top-left-radius: 50% 20px;
            border-top-right-radius: 50% 20px; pointer-events: none; z-index: 0; transition: var(--transition);
        }

        .tanvi-reviews-wrapper .review-card:hover .card-inner-border { border-color: rgba(212, 175, 55, 0.3); }

        .tanvi-reviews-wrapper .review-content-wrapper {
            position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; height: 100%; width: 100%;
        }

        .tanvi-reviews-wrapper .quote-icon {
            position: absolute; top: -10px; left: 10px; color: var(--gold-primary); font-size: 7rem;
            font-family: var(--font-subheading); line-height: 1; margin-bottom: 0; opacity: 0.15; z-index: -1; transition: var(--transition);
        }

        .tanvi-reviews-wrapper .review-card:hover .quote-icon {
            opacity: 0.35; transform: scale(1.1) rotate(-5deg); text-shadow: 0 0 30px var(--gold-primary);
        }

        .tanvi-reviews-wrapper .review-text {
            font-family: var(--font-subheading); font-size: 1.05rem; color: var(--text-main);
            font-style: italic; margin-bottom: 25px; margin-top: 15px; flex-grow: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.9);
        }

        .tanvi-reviews-wrapper .review-author {
            font-family: var(--font-heading); color: var(--gold-light); font-size: 1.1rem; letter-spacing: 1px; margin-bottom: 5px;
        }

        .tanvi-reviews-wrapper .review-stars { color: var(--gold-primary); font-size: 1.2rem; letter-spacing: 2px; }

        .tanvi-reviews-wrapper .submission-section {
            background: rgba(15, 15, 15, 0.8); border: 1px solid rgba(212, 175, 55, 0.15);
            padding: 50px; border-radius: 4px; position: relative; z-index: 1; max-width: 800px; margin: 0 auto;
        }

        .tanvi-reviews-wrapper .form-title {
            font-family: var(--font-heading); color: var(--gold-primary); text-align: center; font-size: 1.8rem; margin-bottom: 30px;
        }

        .tanvi-reviews-wrapper .form-group { margin-bottom: 25px; }

        .tanvi-reviews-wrapper .form-group label {
            display: block; margin-bottom: 8px; color: var(--gold-light); font-family: var(--font-heading); font-size: 0.9rem; letter-spacing: 1px;
        }

        .tanvi-reviews-wrapper .form-control {
            width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(212, 175, 55, 0.3);
            color: var(--text-main); font-family: var(--font-body); font-size: 1rem; padding: 10px 0; transition: var(--transition);
        }

        .tanvi-reviews-wrapper .form-control:focus {
            outline: none; border-bottom-color: var(--gold-primary); background: rgba(212, 175, 55, 0.05); box-shadow: 0 10px 10px -10px var(--gold-glow);
        }

        .tanvi-reviews-wrapper textarea.form-control { resize: vertical; min-height: 100px; }

        .tanvi-reviews-wrapper .star-rating-input { display: flex; flex-direction: row-reverse; justify-content: flex-end; gap: 5px; }
        .tanvi-reviews-wrapper .star-rating-input input { display: none; }
        .tanvi-reviews-wrapper .star-rating-input label {
            color: rgba(255, 255, 255, 0.2); font-size: 2rem; cursor: pointer; transition: color 0.2s ease-in-out; margin: 0;
        }

        .tanvi-reviews-wrapper .star-rating-input label:hover,
        .tanvi-reviews-wrapper .star-rating-input label:hover ~ label,
        .tanvi-reviews-wrapper .star-rating-input input:checked ~ label {
            color: var(--gold-primary); text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }

        .tanvi-reviews-wrapper .submit-btn {
            background: rgba(212, 175, 55, 0.05); color: var(--gold-primary); border: 1px solid var(--gold-primary);
            padding: 15px 40px; font-family: var(--font-heading); font-size: 1rem; letter-spacing: 2px;
            cursor: pointer; transition: var(--transition); display: block; margin: 40px auto 0;
            text-transform: uppercase; position: relative; overflow: hidden; box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
        }

        .tanvi-reviews-wrapper .submit-btn:hover {
            background: var(--gold-primary); color: var(--bg-dark); box-shadow: 0 0 30px var(--gold-glow-strong), 0 0 10px var(--gold-primary); transform: translateY(-2px);
        }

        .tanvi-reviews-wrapper .notification-toast {
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
            padding: 15px 30px; font-family: var(--font-heading); border-radius: 4px; opacity: 0;
            transition: var(--transition); z-index: 1000; box-shadow: 0 10px 30px rgba(0,0,0,0.5); pointer-events: none;
        }

        .tanvi-reviews-wrapper .notification-toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

        @media (max-width: 992px) { .tanvi-reviews-wrapper .reviews-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
            .tanvi-reviews-wrapper .reviews-section { padding: 60px 15px; }
            .tanvi-reviews-wrapper .section-title { font-size: 2rem; }
            .tanvi-reviews-wrapper .reviews-grid { grid-template-columns: 1fr; gap: 20px; }
            .tanvi-reviews-wrapper .submission-section { padding: 30px 20px; }
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