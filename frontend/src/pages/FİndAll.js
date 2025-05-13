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
  const [selectedType, setSelectedType] = useState("room"); // room | intern | parttime
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Ne Arıyorsunuz?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            İhtiyacınıza uygun yurt, oda arkadaşı, staj veya part-time iş
            ilanlarını keşfedin.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedType("room")}
            className={`px-5 py-2.5 rounded-full flex items-center font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedType === "room"
                ? "bg-yellow-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Home className="w-4 h-4 mr-2" />
            Yurt & Oda Arkadaşı
          </button>
          <button
            onClick={() => setSelectedType("intern")}
            className={`px-5 py-2.5 rounded-full flex items-center font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedType === "intern"
                ? "bg-yellow-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Staj
          </button>
          <button
            onClick={() => setSelectedType("parttime")}
            className={`px-5 py-2.5 rounded-full flex items-center font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedType === "parttime"
                ? "bg-yellow-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Clock className="w-4 h-4 mr-2" />
            Part-time İş
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center mb-4 pb-2 border-b border-gray-100">
            <Filter className="text-yellow-500 w-5 h-5 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Filtreler</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedType !== "room" && (
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Briefcase className="inline w-4 h-4 mr-1.5 text-gray-500" />
                  Kategori
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
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
                <DollarSign className="inline w-4 h-4 mr-1.5 text-gray-500" />
                Minimum Fiyat
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="Min ₺"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="inline w-4 h-4 mr-1.5 text-gray-500" />
                Maksimum Fiyat
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max ₺"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              />
            </div>

            <div className="col-span-1 flex items-end">
              <button
                onClick={applyFilters}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrele
              </button>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              {getListingIcon()}
              {getListingTitle()}
            </h2>
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {filteredListings.length} ilan bulundu
            </span>
          </div>

          {/* Listing Cards */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="grid gap-6">
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {item.photos?.[0] ? (
                      <div className="md:w-48 lg:w-64 h-48 md:h-auto overflow-hidden flex-shrink-0">
                        <img
                          src={item.photos[0]}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="md:w-48 lg:w-64 h-48 md:h-auto bg-gray-200 flex-shrink-0 flex items-center justify-center">
                        {getListingIcon()}
                      </div>
                    )}
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.title}
                          </h3>
                          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                            {item.price}₺
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {item.description?.slice(0, 150)}...
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm text-gray-500 flex items-center">
                          <span className="inline-block bg-gray-100 rounded-full px-3 py-1">
                            {item.province} / {item.district}
                          </span>
                        </div>
                        <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium transition-colors">
                          Detayları Gör →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-gray-400 mb-3">
                <Filter className="mx-auto w-12 h-12" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Hiç ilan bulunamadı
              </h3>
              <p className="text-gray-500">
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
