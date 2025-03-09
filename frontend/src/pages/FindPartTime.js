import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Filter,
  Building2,
  MapPinned,
  GraduationCap,
  ShoppingBag,
  HeadphonesIcon,
  WrenchIcon,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FindPartTime = () => {
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();

  const categories = [
    { name: "Eğitim", icon: <GraduationCap className="w-5 h-5" /> },
    { name: "Satış", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Destek", icon: <HeadphonesIcon className="w-5 h-5" /> },
    { name: "Teknik", icon: <WrenchIcon className="w-5 h-5" /> },
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
    setIsFilterOpen(false);
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict("");
  };

  const handleListingClick = (listing) => {
    navigate(`/listing/${listing.name}`, { state: { listing } });
  };

  const getCategoryIcon = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.icon : <Briefcase className="w-5 h-5" />;
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
            className={`
            md:w-1/4 bg-white rounded-xl shadow-lg p-6
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
                  İş Kategorisi
                </label>
                <select
                  id="category"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Filtrele
              </button>
            </div>
          </div>

          {/* Listings */}
          <div className="md:w-3/4">
            {filteredListings.length > 0 ? (
              <div className="grid gap-6">
                {filteredListings.map((listing, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden"
                    onClick={() => handleListingClick(listing)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(listing.category)}
                            <span className="text-sm font-medium text-indigo-600">
                              {listing.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {listing.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {listing.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">
                                {listing.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{listing.hours}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <DollarSign className="w-4 h-4" />
                              <span className="text-sm">{listing.salary}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">
                  Hiçbir sonuç bulunamadı.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindPartTime;
