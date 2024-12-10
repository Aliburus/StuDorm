import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FindPartTime = () => {
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);

  const navigate = useNavigate();

  const categories = [
    { name: "Eğitim" },
    { name: "Satış" },
    { name: "Destek" },
    { name: "Teknik" },
  ];

  const provinces = [
    { name: "Istanbul" },
    { name: "Ankara" },
    { name: "Izmir" },
  ];

  const districts = {
    Istanbul: ["Kadıköy", "Üsküdar", "Pendik"],
    Ankara: ["Çankaya", "Keçiören"],
    Izmir: ["Konak", "Bornova"],
  };

  const sampleListings = [
    {
      name: "Özel Ders Öğretmeni",
      location: "Kadıköy, Istanbul",
      category: "Eğitim",
      contact: "Ahmet Yılmaz",
      description: "Bireysel ders veren öğretmen arayışındayız.",
      salary: "5000 TL",
      hours: "20 saat/hafta",
    },
    {
      name: "Satış Danışmanı",
      location: "Çankaya, Ankara",
      category: "Satış",
      contact: "Ayşe Demir",
      description: "Satış yapmak üzere bir danışman arayışımız var.",
      salary: "4000 TL",
      hours: "30 saat/hafta",
    },
    {
      name: "Teknik Destek Personeli",
      location: "Konak, Izmir",
      category: "Teknik",
      contact: "Ali Veli",
      description: "Teknik destek sağlayacak personel arayışı.",
      salary: "3500 TL",
      hours: "25 saat/hafta",
    },
    {
      name: "Çağrı Merkezi Elemanı",
      location: "Üsküdar, Istanbul",
      category: "Destek",
      contact: "Mehmet Can",
      description: "Çağrı merkezi için personel alımı.",
      salary: "3000 TL",
      hours: "40 saat/hafta",
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
        (selectedProvince
          ? listing.location
              .toLowerCase()
              .includes(selectedProvince.toLowerCase())
          : true) &&
        (selectedDistrict
          ? listing.location
              .toLowerCase()
              .includes(selectedDistrict.toLowerCase())
          : true)
    );
    setFilteredListings(result);
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict("");
  };

  const handleListingClick = (listing) => {
    navigate(`/listing/${listing.name}`, { state: { listing } });
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
              İş Kategorisi
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
              htmlFor="province"
            >
              İl Seç
            </label>
            <select
              id="province"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none"
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
              htmlFor="district"
            >
              İlçe Seç
            </label>
            <select
              id="district"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none"
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
                className="w-full mb-6 cursor-pointer"
                onClick={() => handleListingClick(listing)}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-6">
                  <div className="flex flex-col justify-center w-full space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {listing.name}
                    </h3>
                    <p className="text-sm text-gray-600">{listing.location}</p>
                    <p className="text-sm text-gray-600">
                      Kategori: {listing.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      {listing.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      Maaş: {listing.salary}
                    </p>
                    <p className="text-sm text-gray-600">
                      Çalışma Saatleri: {listing.hours}
                    </p>
                  </div>
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

export default FindPartTime;
