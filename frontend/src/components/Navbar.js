import React, { useState } from "react";

import Logo from "../assets/Logo1.jpeg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-yellow-500 cursor-pointer shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-3xl font-bold tracking-wider">
          <Link to="/">
            {" "}
            {/* Logo'ya tıklandığında ana sayfaya yönlendirecek */}
            <img src={Logo} alt="Dormitory Logo" className="h-10" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-8">
          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/">Home</Link> {/* Home bağlantısı */}
          </div>
          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/find-dorms">Find Dorms & Roommates</Link>{" "}
            {/* Kendi sayfanızın linkini buraya ekleyin */}
          </div>
          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/find-intern">Find Intern</Link>{" "}
            {/* Kendi sayfanızın linkini buraya ekleyin */}
          </div>
          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/find-part-time">Find Part Time</Link>{" "}
            {/* Kendi sayfanızın linkini buraya ekleyin */}
          </div>
          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/about">About Us</Link> {/* About Us bağlantısı */}
          </div>
          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/contact">Contact</Link> {/* Contact bağlantısı */}
          </div>
          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/login">Login</Link> {/* Login bağlantısı */}
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="text-yellow-400 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white text-yellow-400 p-4 space-y-4">
          <div
            className="block text-lg font-semibold hover:text-yellow-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </div>
          <div
            className="block text-lg font-semibold hover:text-yellow-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Find Dorms & Roommates
          </div>
          <div
            className="block text-lg font-semibold hover:text-yellow-500"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </div>
          <div
            className="block text-lg font-semibold hover:text-yellow-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </div>
          <div
            className="block text-lg font-semibold hover:text-yellow-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
