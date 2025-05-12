import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getListings, getFilteredListings } from "../services/ListingService";
import {
  Filter,
  DollarSign,
  Building2,
  BedDouble,
  Hotel,
  Mouse as House,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LocationSelector from "../components/LocationSelector";

const BASE_UPLOAD_URL = "http://localhost:5000";

function FindingRD() {
  const [listings, setListings] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);

  const [formData, setFormData] = useState({
    minPrice: "",
    maxPrice: "",
    province: "",
    district: "",
  });

  const navigate = useNavigate();

  const roomTypes = [
    {
      name: "Tek Kişilik",
      value: "single",
      icon: <BedDouble className="w-5 h-5" />,
    },
    {
      name: "İki Kişilik",
      value: "double",
      icon: <House className="w-5 h-5" />,
    },
    {
      name: "Paylaşımlı",
      value: "shared",
      icon: <Hotel className="w-5 h-5" />,
    },
    {
      name: "Üç Kişilik",
      value: "triple",
      icon: <BedDouble className="w-5 h-5" />,
    },
    {
      name: "Dört Kişilik",
      value: "quad",
      icon: <House className="w-5 h-5" />,
    },
    { name: "Altı Kişilik", value: "six", icon: <Hotel className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        const withImages = data.map((listing) => ({
          ...listing,
          photos: listing.photos?.map((p) => BASE_UPLOAD_URL + p) || [],
        }));
        setListings(withImages);
        setFilteredListings(withImages);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  const applyFilters = async () => {
    const filters = {
      minPrice: formData.minPrice,
      maxPrice: formData.maxPrice,
      province: formData.province,
      district: formData.district,
      roomType: filterType,
    };

    try {
      const data = await getFilteredListings(filters);
      const withImages = data.map((listing) => ({
        ...listing,
        photos: listing.photos?.map((p) => BASE_UPLOAD_URL + p) || [],
      }));
      setFilteredListings(withImages);
      setIsFilterOpen(false);
    } catch (error) {
      console.error("Error fetching filtered listings:", error);
    }
  };

  const handleListingClick = (listing) => {
    navigate(`/room-listing-details/${listing.id}`, { state: { listing } });
  };

  const getRoomTypeIcon = (typeValue) => {
    const type = roomTypes.find((t) => t.value === typeValue);
    return type ? type.icon : null;
  };

  const getRoomTypeName = (typeValue) => {
    const type = roomTypes.find((t) => t.value === typeValue);
    return type ? type.name : typeValue;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
              fixed md:relative z-50 md:z-auto bg-white md:bg-transparent`}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Minimum Fiyat
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={formData.minPrice}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Maksimum Fiyat
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={formData.maxPrice}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="w-4 h-4 inline mr-2" />
                  Oda Tipi
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                >
                  <option value="">Tür Seç</option>
                  {roomTypes.map((type, index) => (
                    <option key={index} value={type.value}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <LocationSelector
                formData={formData}
                handleChange={handleChange}
              />

              <button
                onClick={applyFilters}
                className="w-full bg-yellow-500 text-white py-2 rounded-lg mt-4"
              >
                Filtreleri Uygula
              </button>
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="grid grid-cols-1 gap-4">
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-row h-48"
                    onClick={() => handleListingClick(listing)}
                  >
                    {listing.photos && listing.photos[0] && (
                      <div className="w-1/3 relative">
                        <img
                          src={listing.photos[0]}
                          alt={`${listing.title} thumbnail`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/50 to-transparent w-full h-1/3" />
                      </div>
                    )}
                    <div className="p-6 w-2/3 flex flex-col justify-around">
                      <div>
                        <div className="text-xl font-semibold text-gray-800 mb-2 text-center">
                          {listing.title}
                        </div>
                        <div className="text-gray-600 flex items-center gap-2 justify-center mb-3">
                          <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm">
                            {getRoomTypeIcon(listing.room_type)}{" "}
                            {getRoomTypeName(listing.room_type)}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span>
                            {listing.district}, {listing.province}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-2xl font-bold text-yellow-500">
                          ₺{listing.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
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
