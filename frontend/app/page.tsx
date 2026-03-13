import HeroSection from "../components/sections/LandingPage2";
import { HeritageStrip } from "../components/sections/LandingPage";
import Categories from "../components/sections/Categories5";
import CustomerReviews from "../components/sections/CustomerReviews";

export default function Home() {
  return (
    <main style={{ background: "#0A0800", minHeight: "100vh" }}>
      {/* 1. Full-bleed hero with model photo + glassmorphism tagline */}
      <HeroSection />

      {/* 2. Category cards — Royal Treasury */}
      <Categories />

      {/* 3. Heritage stats strip */}
      <HeritageStrip />

      {/* 4. Customer reviews */}
      <CustomerReviews />
    </main>
  );
}