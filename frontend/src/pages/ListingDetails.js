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

const BASE_UPLOAD_URL = "http://localhost:5000";
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
            result.images = result.images.map((img) => BASE_UPLOAD_URL + img);
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
        {/* INTERN DETAILS */}
        {type === "intern" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 px-6 py-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
              <div className="flex justify-between items-center relative z-10">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {data.title}
                </h1>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30 transition-all duration-300 hover:bg-white/30">
                  <Tag className="w-3.5 h-3.5 mr-1.5 text-white" />
                  {data.category}
                </span>
              </div>
            </div>
            {/* Owner ad soyad */}
            {owner && (
              <div className="flex items-center gap-2 px-8 pt-4">
                <User className="w-5 h-5 text-amber-600" />
                <span className="font-medium">
                  {owner.name} {owner.surname}
                  {(owner.isPremium || owner.user_type === "premium") && (
                    <Star
                      className="w-4 h-4 ml-1 text-yellow-400"
                      fill="#facc15"
                      stroke="#facc15"
                      title="Premium Üye"
                    />
                  )}
                </span>
              </div>
            )}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="transition-all duration-300 hover:bg-yellow-50/50 p-5 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                    <span className="bg-yellow-100 text-yellow-600 p-1.5 rounded-md mr-2">
                      <FileText className="w-5 h-5" />
                    </span>
                    Staj Detayları
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start group">
                      <div className="p-2 bg-yellow-50 rounded-lg mr-3 mt-0.5 transition-all duration-300 group-hover:bg-yellow-100">
                        <Clock className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Süre
                        </p>
                        <p className="text-gray-800 font-medium">
                          {data.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start group">
                      <div className="p-2 bg-yellow-50 rounded-lg mr-3 mt-0.5 transition-all duration-300 group-hover:bg-yellow-100">
                        <MapPin className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Konum
                        </p>
                        <p className="text-gray-800 font-medium">
                          {data.province} - {data.district}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="transition-all duration-300 hover:bg-yellow-50/50 p-5 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                    <span className="bg-yellow-100 text-yellow-600 p-1.5 rounded-md mr-2">
                      <Award className="w-5 h-5" />
                    </span>
                    Gereksinimler
                  </h2>
                  <div className="flex items-start">
                    <div className="p-2 bg-yellow-50 rounded-lg mr-3 mt-0.5">
                      <Award className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Nitelikler
                      </p>
                      <p className="text-gray-800 font-medium">
                        {data.requirements}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 mb-8 transition-all duration-300 hover:bg-gray-100/80">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                  <span className="bg-yellow-100 text-yellow-600 p-1.5 rounded-md mr-2">
                    <FileText className="w-5 h-5" />
                  </span>
                  Açıklama
                </h2>
                <div className="flex items-start">
                  <p className="text-gray-700 leading-relaxed min-h-[100px]">
                    {data.description}
                  </p>
                </div>
              </div>

              {/* İlan Sahibi İletişim */}
              <div className="bg-amber-50 rounded-xl p-6 mb-6 border border-amber-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Phone className="w-5 h-5 text-amber-600 mr-2" />
                  İlan Sahibi ile İletişim
                </h2>
                <div className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:bg-green-50 transition-colors cursor-pointer">
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
                    <Phone className="w-5 h-5 text-amber-600 mr-3" />
                    <span className="font-medium">
                      {owner?.phone
                        ? owner.phone
                        : "Telefon numarası eklenmemiş"}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PART-TIME DETAILS */}
        {type === "parttime" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 px-6 py-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
              <div className="flex justify-between items-center relative z-10">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {data.title}
                </h1>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30 transition-all duration-300 hover:bg-white/30">
                  <Tag className="w-3.5 h-3.5 mr-1.5 text-white" />
                  {data.category}
                </span>
              </div>
            </div>
            {/* Owner ad soyad */}
            {owner && (
              <div className="flex items-center gap-2 px-8 pt-4">
                <User className="w-5 h-5 text-amber-600" />
                <span className="font-medium">
                  {owner.name} {owner.surname}
                  {(owner.isPremium || owner.user_type === "premium") && (
                    <Star
                      className="w-4 h-4 ml-1 text-yellow-400"
                      fill="#facc15"
                      stroke="#facc15"
                      title="Premium Üye"
                    />
                  )}
                </span>
              </div>
            )}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="transition-all duration-300 hover:bg-yellow-50/50 p-5 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                    <span className="bg-yellow-100 text-yellow-600 p-1.5 rounded-md mr-2">
                      <FileText className="w-5 h-5" />
                    </span>
                    İş Detayları
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start group">
                      <div className="p-2 bg-yellow-50 rounded-lg mr-3 mt-0.5 transition-all duration-300 group-hover:bg-yellow-100">
                        <Clock className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Süre
                        </p>
                        <p className="text-gray-800 font-medium">
                          {data.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start group">
                      <div className="p-2 bg-yellow-50 rounded-lg mr-3 mt-0.5 transition-all duration-300 group-hover:bg-yellow-100">
                        <MapPin className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Konum
                        </p>
                        <p className="text-gray-800 font-medium">
                          {data.province} - {data.district}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="p-2 bg-yellow-50 rounded-lg mr-3 mt-0.5 transition-all duration-300 group-hover:bg-yellow-100">
                        <DollarSign className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Ücret
                        </p>
                        <p className="text-gray-800 font-medium">
                          {data.price}₺
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="transition-all duration-300 hover:bg-yellow-50/50 p-5 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                    <span className="bg-yellow-100 text-yellow-600 p-1.5 rounded-md mr-2">
                      <Award className="w-5 h-5" />
                    </span>
                    Gereksinimler
                  </h2>
                  <div className="flex items-start">
                    <div className="p-2 bg-yellow-50 rounded-lg mr-3 mt-0.5">
                      <FileText className="w-5 h-5 text-yellow-600" />
                    </div>
                    <ul className="text-gray-700 space-y-2 mt-1">
                      {data.requirements.split(",").map((req, idx) => (
                        <li
                          key={idx}
                          className="flex items-start group transition-all duration-200 hover:text-gray-900 pl-2 py-1 hover:bg-yellow-50 rounded-md"
                        >
                          <span className="text-yellow-500 mr-2 transform group-hover:scale-110 transition-transform duration-200">
                            •
                          </span>
                          {req.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 mb-8 transition-all duration-300 hover:bg-gray-100/80">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                  <span className="bg-yellow-100 text-yellow-600 p-1.5 rounded-md mr-2">
                    <FileText className="w-5 h-5" />
                  </span>
                  Açıklama
                </h2>
                <div className="flex items-start">
                  <p className="text-gray-700 leading-relaxed">
                    {data.description}
                  </p>
                </div>
              </div>

              {/* İlan Sahibi İletişim */}
              <div className="bg-amber-50 rounded-xl p-6 mb-6 border border-amber-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Phone className="w-5 h-5 text-amber-600 mr-2" />
                  İlan Sahibi ile İletişim
                </h2>
                <div className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:bg-green-50 transition-colors cursor-pointer">
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
                    <Phone className="w-5 h-5 text-amber-600 mr-3" />
                    <span className="font-medium">
                      {owner?.phone
                        ? owner.phone
                        : "Telefon numarası eklenmemiş"}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROOM DETAILS */}
        {type === "room" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            {/* Image Gallery */}
            <div className="relative">
              <div className="h-[500px] w-full bg-gray-100 overflow-hidden">
                {data.images?.[currentImageIndex] && (
                  <img
                    src={data.images[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
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

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 px-6">
              {data.images?.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => selectImage(idx)}
                  className={`w-1/4 overflow-hidden rounded-lg ${
                    idx === currentImageIndex
                      ? "ring-2 ring-yellow-500"
                      : "opacity-80 hover:opacity-100"
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

            {/* Room Info */}
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <span className="px-3 py-1 text-xs bg-amber-100 rounded-full">
                  {data.room_type}
                </span>
              </div>
              {owner && (
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-amber-600" />
                  <span className="font-medium">
                    {owner.name} {owner.surname}
                    {(owner.isPremium || owner.user_type === "premium") && (
                      <Star
                        className="w-4 h-4 ml-1 text-yellow-400"
                        fill="#facc15"
                        stroke="#facc15"
                        title="Premium Üye"
                      />
                    )}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Oda Bilgileri */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Oda Bilgileri</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-amber-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Oda Tipi</p>
                        <p className="font-medium">{data.room_type}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-amber-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Konum</p>
                        <p className="font-medium">
                          {data.province} / {data.district}
                        </p>
                        <p className="text-sm text-gray-600">{data.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-amber-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Cinsiyet</p>
                        <p className="font-medium">{data.gender_required}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-amber-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Fiyat</p>
                        <p className="font-bold text-lg">{data.price}₺</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Açıklama */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Açıklama</h2>
                  <p className="text-gray-700">{data.description}</p>
                </div>
              </div>

              {/* İlan Sahibi İletişim */}
              <div className="bg-amber-50 rounded-xl p-6 mb-6 border border-amber-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Phone className="w-5 h-5 text-amber-600 mr-2" />
                  İlan Sahibi ile İletişim
                </h2>
                <div className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:bg-green-50 transition-colors cursor-pointer">
                  <a
                    href={`https://wa.me/${data.owner?.phone?.replace(
                      /[^0-9]/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Phone className="w-5 h-5 text-amber-600 mr-3" />
                    <span className="font-medium">
                      {data.owner?.phone || "-"}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
