import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getListings, getFilteredListings } from "../services/ListingService"; // Servisi import ettik
import {
  Search,
  MapPin,
  Home,
  DollarSign,
  Filter,
  Building2,
  MapPinned,
  BedDouble,
  Hotel,
  Mouse as House,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FindingRD() {
  const [listings, setListings] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();

  const roomTypes = [
    { name: "Private Room", icon: <BedDouble className="w-5 h-5" /> },
    { name: "Shared Room", icon: <Hotel className="w-5 h-5" /> },
    { name: "Studio", icon: <House className="w-5 h-5" /> },
  ];

  const provinces = [
    { name: "Istanbul" },
    { name: "Ankara" },
    { name: "Izmir" },
  ];

  const districts = {
    Istanbul: ["Kadıköy", "Üsküdar", "Pendik", "Gaziosmanpaşa"],
    Ankara: ["Çankaya", "Keçiören"],
    Izmir: ["Konak", "Bornova"],
  };

  // Verileri çekerken backend API'sini çağır
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const applyFilters = async () => {
    const filters = {
      minPrice: minPrice,
      maxPrice: maxPrice,
      province: selectedProvince,
      district: selectedDistrict,
      roomType: filterType,
    };

    try {
      const data = await getFilteredListings(filters);
      setFilteredListings(data);
      setIsFilterOpen(false);
    } catch (error) {
      console.error("Error fetching filtered listings:", error);
    }
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict("");
  };

  const handleListingClick = (listing) => {
    navigate(`/listing/${listing.id}`, { state: { listing } });
  };

  const getRoomTypeIcon = (typeName) => {
    const type = roomTypes.find((t) => t.name === typeName);
    return type ? type.icon : <Home className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <button
          className="md:hidden w-full mb-4 flex items-center justify-center space-x-2 bg-indigo-600 text-white py-3 rounded-lg shadow-md"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="w-5 h-5" />
          <span>Filtreleri Göster</span>
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
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
                  htmlFor="minPrice"
                >
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Minimum Fiyat
                </label>
                <input
                  type="number"
                  id="minPrice"
                  placeholder="Min Fiyat"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="maxPrice"
                >
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Maximum Fiyat
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  placeholder="Max Fiyat"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="roomType"
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Oda Tipi
                </label>
                <select
                  id="roomType"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">Tür Seç</option>
                  {roomTypes.map((type, index) => (
                    <option key={index} value={type.name}>
                      {type.name}
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
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-4"
              >
                Filtreleri Uygula
              </button>
            </div>
          </div>

          {/* Yurt İlanları */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                    onClick={() => handleListingClick(listing)}
                  >
                    <div className="text-lg font-semibold text-gray-800">
                      {listing.title}
                    </div>
                    <div className="mt-2 text-gray-600">
                      {listing.district}, {listing.province}
                    </div>
                    <div className="mt-4 text-gray-500">
                      {getRoomTypeIcon(listing.roomType)} {listing.roomType}
                    </div>
                    <div className="mt-2 text-lg font-semibold text-indigo-600">
                      ₺{listing.price}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-500">
                  Henüz ilan bulunamadı.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FindingRD;
