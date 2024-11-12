import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // Navbar bileşeniniz
import Footer from "../components/Footer"; // Footer bileşeniniz
import Dorm1 from "../assets/Dorm1.jpeg";
import Dorm2 from "../assets/Dorm2.jpeg";
import Dorm3 from "../assets/Dorm3.jpeg";
import Dorm4 from "../assets/Dorm4.jpeg";

const FindingRD = () => {
  const [listings, setListings] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [filterType, setFilterType] = useState(""); // Yurt/Oda Türü filtresi
  const [filteredListings, setFilteredListings] = useState([]);

  // Mock data for provinces and districts
  const provinces = [
    { name: "Istanbul" },
    { name: "Ankara" },
    { name: "Izmir" },
  ];

  // Sample listing data
  const sampleListings = [
    {
      name: "Room 1",
      location: "Kadıköy, Istanbul",
      price: 1000,
      contact: "John Doe",
      type: "Private Room",
      imageUrl: Dorm1,
      id: 1, // Listing ID
    },
    {
      name: "Room 2",
      location: "Çankaya, Ankara",
      price: 1200,
      contact: "Jane Smith",
      type: "Shared Room",
      imageUrl: Dorm2,
      id: 2,
    },
    {
      name: "Room 3",
      location: "Konak, Izmir",
      price: 800,
      contact: "Ali Veli",
      type: "Private Room",
      imageUrl: Dorm3,
      id: 3,
    },
    {
      name: "Room 4",
      location: "Üsküdar, Istanbul",
      price: 3500,
      contact: "Mehmet Can",
      type: "Shared Room",
      imageUrl: Dorm1,
      id: 4,
    },
    {
      name: "Room 4",
      location: "Pendik, Istanbul",
      price: 2500,
      contact: "Mehmet Can",
      type: "Shared Room",
      imageUrl: Dorm3,
      id: 5,
    },
    {
      name: "Room 4",
      location: "Gaziosmanpaşa, Istanbul",
      price: 1300,
      contact: "Mehmet Can",
      type: "Shared Room",
      imageUrl: Dorm2,
      id: 6,
    },
    {
      name: "Room 4",
      location: "Üsküdar, Istanbul",
      price: 1200,
      contact: "Mehmet Can",
      type: "Shared Room",
      imageUrl: Dorm4,
      id: 7,
    },
  ];

  useEffect(() => {
    setListings(sampleListings);
    setFilteredListings(sampleListings); // Başlangıçta tüm listelemeler görünsün
  }, []);

  // Apply the filters when the user clicks on "Filtrele"
  const applyFilters = () => {
    const result = listings.filter(
      (listing) =>
        (minPrice ? listing.price >= minPrice : true) &&
        (maxPrice ? listing.price <= maxPrice : true) &&
        (selectedProvince
          ? listing.location
              .toLowerCase()
              .includes(selectedProvince.toLowerCase())
          : true) &&
        (filterType
          ? listing.type.toLowerCase().includes(filterType.toLowerCase())
          : true)
    );
    setFilteredListings(result);
  };

  const handleProvinceChange = (e) => setSelectedProvince(e.target.value);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar className="w-full bg-indigo-600 text-white" />
      <div className="container mx-auto p-6 flex flex-grow flex-col md:flex-row">
        {/* Filters section */}
        <div className="w-full lg:w-1/4 bg-white p-6 mb-4 lg:mb-0 flex-none flex flex-col justify-start">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtrele</h2>

          <div className="mb-4">
            <label
              className="block text-sm text-gray-600 font-medium mb-2"
              htmlFor="minPrice"
            >
              Min Fiyat
            </label>
            <input
              type="number"
              id="minPrice"
              placeholder="Min Fiyat"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none  "
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm text-gray-600 font-medium mb-2"
              htmlFor="maxPrice"
            >
              Max Fiyat
            </label>
            <input
              type="number"
              id="maxPrice"
              placeholder="Max Fiyat"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none "
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm text-gray-600 font-medium mb-2"
              htmlFor="province"
            >
              İl Seç
            </label>
            <select
              id="province"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none "
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

          <div className="mb-4">
            <label
              className="block text-sm text-gray-600 font-medium mb-2"
              htmlFor="filterType"
            >
              Tür Seç
            </label>
            <select
              id="filterType"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none "
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Tür</option>
              <option value="Private Room">Oda</option>
              <option value="Shared Room">Yurt</option>
              <option value="Dormitory">Yurt (Genel)</option>
              <option value="Studio">Studio</option>
            </select>
          </div>

          <button
            onClick={applyFilters}
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 outline-none focus:outline-none transition-all"
          >
            Filtrele
          </button>
        </div>

        {/* Listings section */}
        <div className="w-full lg:w-3/4 pl-6 flex flex-col">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing, index) => (
              <div
                key={index}
                className="w-full mb-6 cursor-pointer"
                // İlan detay sayfasına yönlendirme işlevi daha sonra eklenecek
              >
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-6">
                  {/* Image section (left side) */}
                  <div className="flex justify-center w-1/4">
                    <img
                      src={listing.imageUrl}
                      alt={listing.name}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>

                  {/* Listing details (center) */}
                  <div className="flex flex-col justify-center w-1/2 space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {listing.name}
                    </h3>
                    <p className="text-sm text-gray-600">{listing.location}</p>
                    <p className="text-sm text-gray-600">Tür: {listing.type}</p>
                  </div>

                  {/* Price section (right side) */}
                  <div className="w-1/4 flex flex-col justify-center items-end space-y-2">
                    <p className="text-xl font-semibold text-gray-800">
                      {listing.price}₺
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No listings found.</p>
          )}
        </div>
      </div>

      <Footer className="w-full bg-indigo-600 text-white mt-12" />
    </div>
  );
};

export default FindingRD;
