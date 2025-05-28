import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  MapPin,
  Clock,
  UserCheck,
  Tag,
  FileText,
  Award,
  DollarSign,
  Phone,
  Mail,
  User,
  Home,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import {
  getYurtAdById,
  getInternById,
  getPartTimeJobById,
} from "../services/ListingService";
import { FaMapMarkerAlt, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export default function ListingDetails() {
  const [owner, setOwner] = useState(null);
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setData(null);
    async function fetchData() {
      try {
        let result;
        if (type === "room") {
          result = await getYurtAdById(id);
          if (Array.isArray(result.images)) {
            result.images = result.images.map((img) =>
              img.startsWith("http") ? img : `${BASE_URL}${img}`
            );
          }
        } else if (type === "intern") {
          result = await getInternById(id);
        } else {
          result = await getPartTimeJobById(id);
        }
        setData(result);
        setOwner(result.owner || null);
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    }
    fetchData();
  }, [type, id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const nextImage = () =>
    setCurrentImageIndex((i) =>
      i === (data.images?.length || 1) - 1 ? 0 : i + 1
    );
  const previousImage = () =>
    setCurrentImageIndex((i) =>
      i === 0 ? (data.images?.length || 1) - 1 : i - 1
    );
  const selectImage = (idx) => setCurrentImageIndex(idx);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {data.title}
            </h1>
            <div className="flex flex-wrap justify-between items-center">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 hover:border-b-2 hover:border-blue-500 transition-all duration-300">
                  <FaMapMarkerAlt className="mr-2 text-yellow-500" />
                  {data.province} / {data.district}
                </div>
                <div className="flex items-center text-gray-600 hover:border-b-2 hover:border-blue-500 transition-all duration-300">
                  <FaCalendarAlt className="mr-2 text-yellow-500" />
                  {new Date(data.created_at).toLocaleDateString()}
                </div>
              </div>
              {data.price && (
                <div className="text-3xl font-bold text-gray-800">
                  {data.price}₺
                </div>
              )}
            </div>
          </div>

          {type === "room" && data.images && (
            <div className="p-6">
              <div className="relative">
                <div className="h-[500px] w-full bg-gray-100 overflow-hidden">
                  {data.images[currentImageIndex] && (
                    <img
                      src={data.images[currentImageIndex]}
                      alt={`Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
                    />
                  )}
                </div>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex gap-2 mt-4">
                {data.images?.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectImage(idx)}
                    className={`w-1/4 overflow-hidden rounded-lg transition-all duration-300 ${
                      idx === currentImageIndex
                        ? "ring-2 ring-yellow-500"
                        : "opacity-80 hover:opacity-100 hover:ring-2 hover:ring-yellow-500"
                    }`}
                  >
                    <div className="relative pb-[70%] overflow-hidden">
                      <img
                        src={img}
                        alt={`Thumb ${idx + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaClipboardList className="mr-2 text-yellow-500" />
                  İlan Detayları
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="font-medium">{data.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">İlan Sahibi:</span>
                    <span className="font-medium">
                      {owner?.name} {owner?.surname}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Süre:</span>
                    <span className="font-medium">{data.duration}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Açıklama</h2>
                <p className="text-gray-700">{data.description}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Gereksinimler</h2>
              <p className="text-gray-700">{data.requirements}</p>
            </div>

            {owner && (
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Phone className="w-5 h-5 text-yellow-500 mr-2" />
                  İlan Sahibi ile İletişim
                </h2>
                <div className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:bg-yellow-50 transition-colors cursor-pointer">
                  <a
                    href={
                      owner?.phone
                        ? `https://wa.me/${owner.phone.replace(/[^0-9]/g, "")}`
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${
                      !owner?.phone ? "pointer-events-none opacity-50" : ""
                    }`}
                  >
                    <Phone className="w-5 h-5 text-yellow-500 mr-3" />
                    <span className="font-medium">
                      {owner?.phone
                        ? owner.phone
                        : "Telefon numarası eklenmemiş"}
                    </span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
