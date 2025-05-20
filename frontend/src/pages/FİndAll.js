import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getYurtListings,
  getInterns,
  getPartTimeJobs,
} from "../services/ListingService";
import {
  Filter,
  Briefcase,
  DollarSign,
  Home,
  GraduationCap,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LocationSelector from "../components/LocationSelector";

const internCategories = ["Software Development", "Marketing", "Finance"];
const partTimeCategories = ["Eğitim", "Satış", "Destek", "Teknik"];
const BASE_UPLOAD_URL = "http://localhost:5000";

function FindAll() {
  const [selectedType, setSelectedType] = useState("room");
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    province: "",
    district: "",
    minPrice: "",
    maxPrice: "",
    category: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, [selectedType]);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      let data = [];

      if (selectedType === "room") {
        const result = await getYurtListings();
        data = result.map((item) => ({
          ...item,
          photos: item.photos?.map((p) => BASE_UPLOAD_URL + p) || [],
        }));
      } else if (selectedType === "intern") {
        data = await getInterns();
      } else if (selectedType === "parttime") {
        data = await getPartTimeJobs();
      }

      setListings(data);
      setFilteredListings(data);
    } catch (error) {
      console.error("Veri alınırken hata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    const { province, district, minPrice, maxPrice, category } = filters;
    let result = [...listings];

    if (province) {
      result = result.filter((item) =>
        item.province?.toLowerCase().includes(province.toLowerCase())
      );
    }
    if (district) {
      result = result.filter((item) =>
        item.district?.toLowerCase().includes(district.toLowerCase())
      );
    }
    if (minPrice) {
      result = result.filter((item) => Number(item.price) >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((item) => Number(item.price) <= Number(maxPrice));
    }
    if (category && selectedType !== "room") {
      result = result.filter((item) =>
        item.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    setFilteredListings(result);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    if (name === "province") {
      setFilters((prev) => ({ ...prev, district: "" }));
    }
  };

  const handleClick = (item) => {
    navigate(`/listing-details/${selectedType}/${item.id}`);
  };

  const getListingIcon = () => {
    switch (selectedType) {
      case "room":
        return <Home className="w-5 h-5 mr-2" />;
      case "intern":
        return <GraduationCap className="w-5 h-5 mr-2" />;
      case "parttime":
        return <Clock className="w-5 h-5 mr-2" />;
      default:
        return <Home className="w-5 h-5 mr-2" />;
    }
  };

  const getListingTitle = () => {
    switch (selectedType) {
      case "room":
        return "Yurt & Oda İlanları";
      case "intern":
        return "Staj İlanları";
      case "parttime":
        return "Part-time İş İlanları";
      default:
        return "İlanlar";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedType("room")}
            className={`px-6 py-3 rounded-full flex items-center font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedType === "room"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg shadow-yellow-500/20"
                : "bg-white text-gray-700 border border-gray-200 hover:border-yellow-400 hover:text-yellow-500"
            }`}
          >
            <Home className="w-5 h-5 mr-2" />
            Yurt & Oda Arkadaşı
          </button>
          <button
            onClick={() => setSelectedType("intern")}
            className={`px-6 py-3 rounded-full flex items-center font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedType === "intern"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg shadow-yellow-500/20"
                : "bg-white text-gray-700 border border-gray-200 hover:border-yellow-400 hover:text-yellow-500"
            }`}
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Staj
          </button>
          <button
            onClick={() => setSelectedType("parttime")}
            className={`px-6 py-3 rounded-full flex items-center font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedType === "parttime"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg shadow-yellow-500/20"
                : "bg-white text-gray-700 border border-gray-200 hover:border-yellow-400 hover:text-yellow-500"
            }`}
          >
            <Clock className="w-5 h-5 mr-2" />
            Part-time İş
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12 backdrop-blur-lg backdrop-filter">
          <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
            <Filter className="text-yellow-500 w-6 h-6 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Filtreler</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedType !== "room" && (
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Briefcase className="inline w-4 h-4 mr-2 text-yellow-500" />
                  Kategori
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-400"
                >
                  <option value="">Kategori Seç</option>
                  {(selectedType === "intern"
                    ? internCategories
                    : partTimeCategories
                  ).map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <LocationSelector formData={filters} handleChange={handleChange} />

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="inline w-4 h-4 mr-2 text-yellow-500" />
                Minimum Fiyat
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="Min ₺"
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-400"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="inline w-4 h-4 mr-2 text-yellow-500" />
                Maksimum Fiyat
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max ₺"
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-400"
              />
            </div>

            <div className="col-span-1 flex items-end">
              <button
                onClick={applyFilters}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30 transform hover:-translate-y-0.5"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filtrele
              </button>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              {getListingIcon()}
              {getListingTitle()}
            </h2>
            <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
              {filteredListings.length} ilan bulundu
            </span>
          </div>

          {/* Listing Cards */}
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="grid gap-8">
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
                >
                  <div className="flex flex-col md:flex-row">
                    {item.photos?.[0] ? (
                      <div className="md:w-56 lg:w-72 h-56 md:h-auto overflow-hidden flex-shrink-0">
                        <img
                          src={item.photos[0]}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="md:w-56 lg:w-72 h-56 md:h-auto bg-gradient-to-br from-yellow-50 to-yellow-100 flex-shrink-0 flex items-center justify-center">
                        {getListingIcon()}
                      </div>
                    )}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-yellow-500 transition-colors">
                            {item.title}
                          </h3>
                          <div className="bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-medium border border-yellow-100">
                            {item.price}₺
                          </div>
                        </div>
                        <p className="text-base text-gray-600 mb-4 line-clamp-2">
                          {item.description?.slice(0, 150)}...
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-500 flex items-center">
                          <span className="inline-block bg-gray-50 rounded-full px-4 py-1.5 border border-gray-100">
                            {item.province} / {item.district}
                          </span>
                        </div>
                        <button className="text-yellow-500 hover:text-yellow-600 text-sm font-medium transition-colors flex items-center group-hover:translate-x-1 duration-300">
                          Detayları Gör
                          <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">
                            →
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-lg">
              <div className="text-yellow-400 mb-4">
                <Filter className="mx-auto w-16 h-16" />
              </div>
              <h3 className="text-2xl font-medium text-gray-700 mb-3">
                Hiç ilan bulunamadı
              </h3>
              <p className="text-gray-500 text-lg">
                Lütfen farklı filtre kriterleri deneyiniz.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FindAll;
