import React from "react";
import headerImg from "../assets/headerImg.jpeg"; // Görseli import et

const Header = () => {
  return (
    <header
      className="w-full text-white py-24 text-center bg-cover bg-center relative fixed top-0 left-0 right-0 z-20"
      style={{ backgroundImage: `url(${headerImg})` }} // Arka plan görselini ayarla
    >
      {/* Overlay kısmı */}
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Yarı saydam siyah overlay */}
      <div className="relative z-10">
        <h1 className="text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          Discover Your Ideal Dormitory and Roommates
        </h1>
        <p className="text-2xl mb-8">
          You find roommates and dormitories in the best locations, offering
          luxury and comfort at unbeatable prices.
        </p>
        <button className="mt-4 px-8 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300">
          Explore Premium Dorms
        </button>
      </div>
    </header>
  );
};

export default Header;
