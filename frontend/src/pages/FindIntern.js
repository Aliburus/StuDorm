import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  Building2,
  MapPinned,
  UserCheck,
  Calendar,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getInterns } from "../services/InternService"; // API servis fonksiyonu

function FindIntern() {
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();

  // Kategoriler ve iller (Örneğin gerçek verilerle uyumlu olacak şekilde)
  const categories = [
    { name: "Software Development", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Marketing", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Finance", icon: <Briefcase className="w-5 h-5" /> },
  ];

  const provinces = [
    { name: "Istanbul" },
    { name: "Ankara" },
    { name: "Izmir" },
  ];

  const districts = {
    Istanbul: ["Kadıköy", "Üsküdar", "Beşiktaş"],
    Ankara: ["Çankaya", "Keçiören", "Mamak"],
    Izmir: ["Konak", "Bornova", "Karşıyaka"],
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getInterns(); // API çağrısı
        console.log("Fetched listings:", response);

        // Liste verisinin geçerli olup olmadığını kontrol et
        if (Array.isArray(response)) {
          setListings(response);
          setFilteredListings(response);
        } else {
          console.error("Veri formatı hatalı:", response);
        }
      } catch (error) {
        console.error("İlanları getirirken hata oluştu:", error);
      }
    };

    fetchListings();
  }, []);

  const applyFilters = () => {
    const result = listings.filter(
      (listing) =>
        (selectedCategory
          ? listing.category
              .toLowerCase()
              .includes(selectedCategory.toLowerCase())
          : true) &&
        (selectedProvince
          ? listing.province
              .toLowerCase()
              .includes(selectedProvince.toLowerCase())
          : true) &&
        (selectedDistrict
          ? listing.district
              .toLowerCase()
              .includes(selectedDistrict.toLowerCase())
          : true)
    );
    setFilteredListings(result);
    setIsFilterOpen(false);
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict(""); // İl değiştiğinde ilçeyi sıfırla
  };

  const handleListingClick = (listing) => {
    navigate(`/intern-details/${listing.id}`, { state: { listing } });
  };

  const getCategoryIcon = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.icon : <Briefcase className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <button
          className="md:hidden w-full mb-4 flex items-center justify-center space-x-2 bg-yellow-500 text-white py-3 rounded-lg shadow-md"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="w-5 h-5" />
          <span>Filtreleri Göster</span>
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div
            className={`md:w-1/4 bg-white rounded-xl shadow-lg p-6
            ${isFilterOpen ? "block" : "hidden"} md:block
            fixed md:relative top-0 left-0 right-0 bottom-0 md:top-auto md:left-auto md:right-auto md:bottom-auto
            z-50 md:z-auto bg-white md:bg-transparent
          `}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtrele
              </h2>
              <button
                className="md:hidden text-gray-500"
                onClick={() => setIsFilterOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="category"
                >
                  <Briefcase className="w-4 h-4 inline mr-2" />
                  Kategori
                </label>
                <select
                  id="category"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Kategori Seç</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="province"
                >
                  <Building2 className="w-4 h-4 inline mr-2" />
                  İl
                </label>
                <select
                  id="province"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <option value="">İl Seç</option>
                  {provinces.map((province, index) => (
                    <option key={index} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="district"
                >
                  <MapPinned className="w-4 h-4 inline mr-2" />
                  İlçe
                </label>
                <select
                  id="district"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedProvince}
                >
                  <option value="">İlçe Seç</option>
                  {selectedProvince &&
                    districts[selectedProvince].map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                </select>
              </div>

              <button
                onClick={applyFilters}
                className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Filtrele
              </button>
            </div>
          </div>

          {/* İlanlar Listesi */}
          <div className="md:w-3/4">
            {filteredListings.length > 0 ? (
              <div className="grid gap-6">
                {filteredListings.map((listing) => {
                  return (
                    <div
                      key={listing.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden"
                    >
                      <div
                        className="p-6"
                        onClick={() => handleListingClick(listing)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getCategoryIcon(listing.category)}
                              <span className="text-sm font-medium text-yellow-500">
                                {listing.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {listing.title}
                            </h3>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(listing.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {listing.description.length > 100
                            ? listing.description.slice(0, 100) + "..."
                            : listing.description}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {listing.province} / {listing.district}
                          </div>
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4" />
                            {listing.contact}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                Hiç ilan bulunamadı
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FindIntern;
