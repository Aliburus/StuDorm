import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FindIntern = () => {
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const navigate = useNavigate();

  const categories = [
    { name: "Software Development" },
    { name: "Marketing" },
    { name: "Finance" },
  ];

  const cities = [
    { name: "Istanbul", districts: ["Kadıköy", "Üsküdar", "Beşiktaş"] },
    { name: "Ankara", districts: ["Çankaya", "Keçiören", "Mamak"] },
    { name: "Izmir", districts: ["Konak", "Bornova", "Karşıyaka"] },
  ];

  const sampleListings = [
    {
      id: 1,
      name: "Software Development Intern",
      location: "Kadıköy, Istanbul",
      category: "Software Development",
      contact: "Ali Veli",
      description:
        "A great opportunity to work on cutting-edge software projects.",
      duration: "3 months",
      requirements: "Basic knowledge of JavaScript and React.",
    },
    {
      id: 2,
      name: "Marketing Intern",
      location: "Çankaya, Ankara",
      category: "Marketing",
      contact: "Jane Smith",
      description:
        "Join our marketing team and help with social media campaigns.",
      duration: "6 months",
      requirements: "Experience in digital marketing is a plus.",
    },
    {
      id: 3,
      name: "Finance Intern",
      location: "Konak, Izmir",
      category: "Finance",
      contact: "John Doe",
      description: "Assist with financial analysis and reporting.",
      duration: "4 months",
      requirements: "Interest in finance and accounting.",
    },
    {
      id: 4,
      name: "Marketing Intern",
      location: "Üsküdar, Istanbul",
      category: "Marketing",
      contact: "Mehmet Can",
      description:
        "Work with the marketing team on content creation and strategy.",
      duration: "5 months",
      requirements: "Good communication and creative thinking skills.",
    },
  ];

  useEffect(() => {
    setListings(sampleListings);
    setFilteredListings(sampleListings);
  }, []);

  const applyFilters = () => {
    const result = listings.filter(
      (listing) =>
        (selectedCategory
          ? listing.category
              .toLowerCase()
              .includes(selectedCategory.toLowerCase())
          : true) &&
        (selectedCity
          ? listing.location.toLowerCase().includes(selectedCity.toLowerCase())
          : true) &&
        (selectedDistrict
          ? listing.location
              .toLowerCase()
              .includes(selectedDistrict.toLowerCase())
          : true)
    );
    setFilteredListings(result);
  };

  const goToDetails = (id) => {
    navigate(`/intern-details/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar className="w-full bg-indigo-600 text-white" />
      <div className="container mx-auto p-6 flex flex-grow flex-col md:flex-row">
        <div className="w-full lg:w-1/4 bg-white p-6 mb-4 lg:mb-0 flex-none flex flex-col justify-start">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtrele</h2>

          <div className="mb-4">
            <label
              className="block text-sm text-gray-600 font-medium mb-2"
              htmlFor="category"
            >
              Kategori Seç
            </label>
            <select
              id="category"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none"
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

          <div className="mb-4">
            <label
              className="block text-sm text-gray-600 font-medium mb-2"
              htmlFor="city"
            >
              Şehir Seç
            </label>
            <select
              id="city"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Şehir Seç</option>
              {cities.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm text-gray-600 font-medium mb-2"
              htmlFor="district"
            >
              İlçe Seç
            </label>
            <select
              id="district"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedCity}
            >
              <option value="">İlçe Seç</option>
              {selectedCity &&
                cities
                  .find((city) => city.name === selectedCity)
                  .districts.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
            </select>
          </div>

          <button
            onClick={applyFilters}
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 outline-none focus:outline-none transition-all"
          >
            Filtrele
          </button>
        </div>

        <div className="w-full lg:w-3/4 pl-6 flex flex-col">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing, index) => (
              <div
                key={index}
                className="w-full mb-6"
                onClick={() => goToDetails(listing.id)}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4 cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {listing.name}
                  </h3>
                  <p className="text-sm text-gray-600">{listing.location}</p>
                  <p className="text-sm text-gray-600">
                    Kategori: {listing.category}
                  </p>
                  <p className="text-sm text-gray-600">{listing.description}</p>
                  <p className="text-sm text-gray-600">
                    Süre: {listing.duration}
                  </p>
                  <p className="text-sm text-gray-600">
                    Gereksinimler: {listing.requirements}
                  </p>
                  <p className="text-sm text-gray-600">
                    İletişim: {listing.contact}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-600">Hiçbir sonuç bulunamadı.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindIntern;
