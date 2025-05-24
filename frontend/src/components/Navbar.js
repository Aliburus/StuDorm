import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../assets/Logo1.jpeg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giriş durumu
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown kontrolü
  const navigate = useNavigate();
  const location = useLocation(); // useLocation hook to detect page changes

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split(".")[1]));
          const isTokenExpired = decoded.exp * 1000 < Date.now();

          if (isTokenExpired) {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          } else {
            setIsLoggedIn(true);
          }
        } catch (error) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkToken();

    // Sayfa değişimlerinde token kontrolü yap
    window.addEventListener("focus", checkToken);

    return () => {
      window.removeEventListener("focus", checkToken);
    };
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white text-yellow-500 cursor-pointer shadow-lg relative z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-wider">
          <Link to="/">
            <img src={Logo} alt="Dormitory Logo" className="h-10" />
          </Link>
        </div>

        {/* Menü Linkleri (Büyük Ekran) */}
        <div className="hidden md:flex space-x-8">
          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/">Ana Sayfa</Link>
          </div>
          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/find">İlanlar</Link>
          </div>

          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/forumpage">Forum</Link>
          </div>
          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/about">Hakkımızda</Link>
          </div>
          <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
            <Link to="/contact">İletişim</Link>
          </div>
          {/* Giriş Yapılmışsa Account Iconu */}
          {isLoggedIn ? (
            <div className="relative">
              <FaUserCircle
                className="text-yellow-500 text-2xl cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-fade-in">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                    <FaUserCircle className="text-yellow-500 text-3xl" />
                    <div>
                      <div className="font-semibold text-gray-800 text-base">
                        {localStorage.getItem("userName") || ""}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/account")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-50 transition rounded-none"
                  >
                    Profilim
                  </button>
                  <button
                    onClick={() => navigate("/dormAdForm")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-50 transition rounded-none"
                  >
                    İlan Ver
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition rounded-none"
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-md font-semibold hover:text-yellow-500 transition duration-300">
              <Link to="/login">Giriş Yap</Link>
            </div>
          )}
        </div>

        {/* Mobil Menü */}
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

      {/* Mobil Menü Açıldığında */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8 animate-fade-in">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-gray-400 hover:text-yellow-500 text-3xl"
          >
            &times;
          </button>
          <Link
            to="/"
            className="text-2xl font-bold text-yellow-500 hover:text-yellow-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Ana Sayfa
          </Link>
          <Link
            to="/find"
            className="text-2xl font-bold text-yellow-500 hover:text-yellow-600"
            onClick={() => setIsMenuOpen(false)}
          >
            İlanlar
          </Link>
          <Link
            to="/forumpage"
            className="text-2xl font-bold text-yellow-500 hover:text-yellow-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Forum
          </Link>
          <Link
            to="/about"
            className="text-2xl font-bold text-yellow-500 hover:text-yellow-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Hakkımızda
          </Link>
          <Link
            to="/contact"
            className="text-2xl font-bold text-yellow-500 hover:text-yellow-600"
            onClick={() => setIsMenuOpen(false)}
          >
            İletişim
          </Link>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/account");
                }}
                className="text-2xl font-bold text-yellow-500 hover:text-yellow-600"
              >
                Profilim
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/dormAdForm");
                }}
                className="text-2xl font-bold text-yellow-500 hover:text-yellow-600"
              >
                İlan Ver
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="text-2xl font-bold text-red-500 hover:text-red-600"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/login");
              }}
              className="text-2xl font-bold text-yellow-500 hover:text-yellow-600"
            >
              Giriş Yap
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
