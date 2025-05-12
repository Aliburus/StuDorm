import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Home,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getYurtAdById } from "../services/ListingService";

function RoomListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    getYurtAdById(id)
      .then((data) => setListing(data))
      .catch((err) => console.error("Error fetching yurt ad:", err));
  }, [id]);

  if (!listing) {
    return <p className="text-center py-20">Yükleniyor...</p>;
  }

  const {
    user_id,
    title,
    description,
    price,
    location,
    gender_required,
    created_at,
    updated_at,
    province,
    district,
    room_type,
    images = [],
  } = listing;

  const nextImage = () =>
    setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  const previousImage = () =>
    setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const selectImage = (idx) => setCurrentImageIndex(idx);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Görsel Galeri */}
          <div className="relative">
            <div className="h-[500px] w-full">
              {images.length > 0 && (
                <img
                  src={`http://localhost:5000${images[currentImageIndex]}`}
                  alt={`Oda görüntüsü ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="flex gap-2 mt-4 px-4">
              {images.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => selectImage(idx)}
                  className="…"
                >
                  <img
                    src={`http://localhost:5000${img}`}
                    alt={`Önizleme ${idx + 1}`}
                    className="w-full h-full object-cover max-h-[100px] rounded-lg border-2 border-transparent hover:border-yellow-500 transition duration-200"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Başlık */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            </div>

            {/* Meta Bilgiler */}
            <div className="text-sm text-gray-500 mb-6">
              <span className="mr-4">İlan ID: {id}</span>
              <span className="mr-4">Kullanıcı: {user_id}</span>
              <span className="mr-4">
                Oluşturma: {new Date(created_at).toLocaleDateString()}
              </span>
              <span>
                Güncelleme: {new Date(updated_at).toLocaleDateString()}
              </span>
            </div>

            {/* Temel Detaylar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yellow-500" />
                  <span>Oda Tipi: {room_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-500" />
                  <span>
                    {province} / {district} ({location})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-yellow-500" />
                  <span>Cinsiyet: {gender_required}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-yellow-500" />
                  <span>Fiyat: {price}₺</span>
                </div>
              </div>

              {/* Açıklama */}
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  Açıklama
                </h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>
            </div>

            {/* İletişim Bilgileri */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                İletişim Bilgileri
              </h2>
              <div className="flex items-center gap-3 text-gray-600 mb-2">
                <Phone className="w-5 h-5" />
                <span>{listing.contact?.phone || "-"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 mb-2">
                <Mail className="w-5 h-5" />
                <span>{listing.contact?.email || "-"}</span>
              </div>
            </div>

            {/* Özellikler */}
            {listing.features?.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Özellikler
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {listing.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RoomListingDetail;
