import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Home,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RoomListingDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();

  // Sample data - replace with actual data from your backend
  const listing = {
    id: 1,
    title: "Kadıköy'de 3+1 Dairede Kiralık Oda",
    description:
      "Kadıköy merkezde, metroya 5 dakika yürüme mesafesinde 3+1 dairede kiralık oda. Daire full eşyalı, odada çalışma masası, gardırop ve yatak bulunmaktadır. Mutfak ve banyo ortak kullanımlıdır. İnternet, elektrik, su ve doğalgaz faturalar dahildir.",
    price: "2500 TL",
    location: "Kadıköy, İstanbul",
    roomType: "Özel Oda",
    availableFrom: "01.04.2024",
    contact: {
      name: "Ahmet Yılmaz",
      phone: "+90 555 123 4567",
      email: "ahmet@email.com",
    },
    features: [
      "İnternet",
      "Eşyalı",
      "Faturalar Dahil",
      "Merkezi Konum",
      "Çamaşır Makinesi",
      "Bulaşık Makinesi",
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    ],
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={`${listing.images[currentImageIndex]}?auto=format&fit=crop&w=1600&h=900`}
                alt={`Room view ${currentImageIndex + 1}`}
                className="w-full h-[500px] object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 mt-4 px-4">
              {listing.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`flex-1 aspect-w-16 aspect-h-9 relative ${
                    currentImageIndex === index
                      ? "ring-2 ring-yellow-500"
                      : "opacity-70"
                  }`}
                >
                  <img
                    src={`${image}?auto=format&fit=crop&w=400&h=225`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover "
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 p-6">
            {/* Main Content */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {listing.title}
              </h1>

              {/* Description */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  İlan Detayları
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Features */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Özellikler
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {listing.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                {/* Price */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-gray-900">
                    {listing.price}
                  </span>
                  <span className="text-gray-500">/aylık</span>
                </div>

                {/* Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Home className="w-5 h-5" />
                    <span>{listing.roomType}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span>Müsaitlik: {listing.availableFrom}</span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    İletişim Bilgileri
                  </h3>
                  <div className="flex items-center gap-3 text-gray-600">
                    <User className="w-5 h-5" />
                    <span>{listing.contact.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>{listing.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span>{listing.contact.email}</span>
                  </div>
                </div>

                {/* Contact Button */}
                <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mt-6 hover:bg-yellow-600 transition-colors duration-200">
                  İletişime Geç
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RoomListingDetail;
