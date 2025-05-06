import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import HeroSection from "../components/HeroSection";
import PremiumListings from "../components/PremiumListings";
import TopPosts from "../components/TopPosts";
import Features from "../components/Features";

function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />

      <Features />

      <PremiumListings />

      <TopPosts />

      <Footer />
    </div>
  );
}

export default Homepage;
