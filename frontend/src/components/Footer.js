import React from "react";
import { IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg font-semibold text-yellow-500 mb-4">
          &copy; 2024 StuDorm. Tüm hakları saklıdır.
        </p>
        <div className="flex justify-center space-x-6">
          <Link
            to="/about"
            className="text-gray-400 hover:text-yellow-500 transition duration-300"
          >
            Hakkımızda
          </Link>
          <Link
            to="/terms"
            className="text-gray-400 hover:text-yellow-500 transition duration-300"
          >
            Kullanım Koşulları
          </Link>
          <Link
            to="/contact"
            className="text-gray-400 hover:text-yellow-500 transition duration-300"
          >
            İletişim
          </Link>
        </div>

        <div className="mt-6">
          <div className="flex justify-center space-x-6">
            <IconButton
              component="a"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-400"
            >
              <InstagramIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 p-2 rounded-full hover:bg-green-400"
            >
              <WhatsAppIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>
          </div>
          <div className="mt-6">
            <p className="text-gray-500 text-sm">
              StuDorm Ekibi tarafından özenle tasarlanmıştır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
