import React from "react";
import { IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex-1 mb-6 md:mb-0">
          <h2 className="text-xl font-bold mb-2">StuDorm</h2>
          <p className="text-gray-400 text-sm">
            Öğrenciler için en iyi ilan ve forum platformu.
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-gray-800 p-2 rounded-full">
                <Phone className="w-4 h-4 text-yellow-400" />
              </span>
              <span className="text-sm">+90 (212) 123 45 67</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-800 p-2 rounded-full">
                <Mail className="w-4 h-4 text-yellow-400" />
              </span>
              <span className="text-sm">info@studorm.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-800 p-2 rounded-full">
                <MapPin className="w-4 h-4 text-yellow-400" />
              </span>
              <span className="text-sm">Beşiktaş, İstanbul</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-800 p-2 rounded-full">
                <Clock className="w-4 h-4 text-yellow-400" />
              </span>
              <span className="text-sm">Pzt-Cuma: 09:00-18:00</span>
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-yellow-50 transition-colors"
            >
              <Facebook className="w-5 h-5 text-gray-300 hover:text-yellow-500" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-yellow-50 transition-colors"
            >
              <Twitter className="w-5 h-5 text-gray-300 hover:text-yellow-500" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-yellow-50 transition-colors"
            >
              <Instagram className="w-5 h-5 text-gray-300 hover:text-yellow-500" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-yellow-50 transition-colors"
            >
              <Linkedin className="w-5 h-5 text-gray-300 hover:text-yellow-500" />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-6 text-sm text-gray-400 mb-2 md:mb-0">
          <Link to="/about" className="hover:text-yellow-400 transition">
            Hakkımızda
          </Link>
          <Link to="/terms" className="hover:text-yellow-400 transition">
            Kullanım Koşulları
          </Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">
            İletişim
          </Link>
        </div>
        <div className="text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} StuDorm. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
