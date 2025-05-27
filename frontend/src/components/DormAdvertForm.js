import React, { useState, useEffect } from "react";
import LocationSelector from "./LocationSelector";
import {
  DollarSign,
  FileText,
  MapPin,
  X,
  Image as ImageIcon,
  Send,
} from "lucide-react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {
  createYurtIlan,
  createIntern,
  createPartTimeAdvert,
} from "../services/ListingService"; // Adjust the import path as necessary
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

const DormAdvertForm = () => {
  const [adType, setAdType] = useState("dorm"); // NEW: ad type selection
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumError, setPremiumError] = useState("");

  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    description: "",
    price: "",
    gender_required: "herkes",
    province: "",
    district: "",

    room_type: "single",
    category: "",

    duration: "",
    requirements: "",
    photos: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) {
      setError("");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const totalFiles = formData.photos.length + files.length;

    if (totalFiles > 15) {
      setError("listing/validation/images");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const removeImage = (index) => {
    setFormData((prev) => {
      const photosCopy = [...prev.photos];
      photosCopy.splice(index, 1);
      return { ...prev, photos: photosCopy };
    });
    setPreviewImages((prev) => {
      const previewsCopy = [...prev];
      URL.revokeObjectURL(previewsCopy[index]);
      previewsCopy.splice(index, 1);
      return previewsCopy;
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("listing/validation/title");
      return false;
    }
    if (!formData.description.trim()) {
      setError("listing/validation/description");
      return false;
    }
    if (!formData.province) {
      setError("listing/validation/province");
      return false;
    }
    if (!formData.district) {
      setError("listing/validation/district");
      return false;
    }
    if (!formData.price) {
      setError("listing/validation/price");
      return false;
    }
    if (!formData.gender_required) {
      setError("listing/validation/gender");
      return false;
    }
    if (!formData.room_type) {
      setError("listing/validation/room-type");
      return false;
    }
    if (!formData.category) {
      setError("listing/validation/category");
      return false;
    }
    if (!formData.duration) {
      setError("listing/validation/duration");
      return false;
    }
    if (!formData.requirements) {
      setError("listing/validation/requirements");
      return false;
    }
    return true;
  };

  const checkEligibility = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/check-ad-eligibility`,
        {
          params: { adType },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.eligible;
    } catch (error) {
      console.error("Eligibility check error:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    const isEligible = await checkEligibility();
    if (!isEligible) {
      setError("listing/premium/required");
      setShowPremiumModal(true);
      return;
    }

    setIsSubmitting(true);
    const location = `${formData.province}, ${formData.district}`;
    const payload = { ...formData, location };

    try {
      if (adType === "dorm") {
        const data = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (key === "photos") {
            Array.from(value).forEach((file) => {
              data.append("photos", file);
            });
          } else {
            data.append(key, value);
          }
        });
        await createYurtIlan(data);
        setSuccess("listing/create/success");
      } else if (adType === "interns") {
        await createIntern(payload);
        setSuccess("listing/create/success");
      } else if (adType === "parttime") {
        await createPartTimeAdvert(payload);
        setSuccess("listing/create/success");
      }

      // Reset form
      setFormData({
        user_id: "",
        title: "",
        description: "",
        price: "",
        gender_required: "herkes",
        province: "",
        district: "",
        room_type: "single",
        category: "",
        duration: "",
        requirements: "",
        photos: [],
      });
      setPreviewImages([]);
    } catch (error) {
      const backendMsg =
        error.response?.data?.error || error.response?.data?.message;
      if (
        backendMsg &&
        backendMsg.includes("Normal üyeler 6 ayda sadece 1 ilan ekleyebilir")
      ) {
        setPremiumError(backendMsg);
        setShowPremiumModal(true);
      }
      setError("listing/create/failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-8 sm:px-10 sm:py-10">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Yeni İlan Oluştur
                </h1>
                <p className="text-yellow-100">
                  İlan türünü seçin ve bilgileri girin
                </p>
              </div>
            </div>

            {/* Ad Type Selector */}
            <div className="px-6 pt-6 flex justify-center gap-4">
              {["dorm", "interns", "parttime"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`px-4 py-2 rounded-lg ${
                    adType === type
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } transition-colors`}
                  onClick={() => setAdType(type)}
                >
                  {type === "dorm"
                    ? "Yurt/Oda"
                    : type === "interns"
                    ? "Staj"
                    : "Part-Time"}
                </button>
              ))}
            </div>

            <div className="px-6 py-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FileText className="w-4 h-4 inline-block mr-2 text-yellow-500" />
                    İlan Başlığı
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Başlık girin"
                  />
                  {error && <ErrorMessage message={error} />}
                </div>

                {adType !== "dorm" && (
                  <>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    >
                      <option value="">Kategori Seçin</option>
                      <option value="software">Yazılım Geliştirme</option>
                      <option value="marketing">Pazarlama</option>
                      <option value="finance">Finans</option>
                      <option value="design">Tasarım</option>
                      <option value="sales">Satış</option>
                      <option value="customer_support">Müşteri Destek</option>
                      <option value="hr">İnsan Kaynakları</option>
                    </select>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="Süre"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    />
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="Gereksinimler"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    />
                  </>
                )}

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                    rows="4"
                  />
                </div>

                {/* Location */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-yellow-500" />
                    Konum Bilgileri
                  </h3>
                  <LocationSelector
                    formData={formData}
                    handleChange={handleChange}
                  />
                  {error && (
                    <div className="mt-2 text-red-500 text-sm">{error}</div>
                  )}
                </div>

                {/* Price if dorm or parttime */}
                {(adType === "dorm" || adType === "parttime") && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <DollarSign className="w-4 h-4 inline-block mr-2 text-yellow-500" />
                      Ücret
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="₺"
                    />
                  </div>
                )}

                {/* Gender & Room Type (only for dorm) */}
                {adType === "dorm" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Cinsiyet Tercihi
                      </label>
                      <select
                        name="gender_required"
                        value={formData.gender_required}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                      >
                        <option value="erkek">Erkek</option>
                        <option value="kiz">Kız</option>
                        <option value="herkes">Herkes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Oda Türü
                      </label>
                      <select
                        name="room_type"
                        value={formData.room_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                      >
                        <option value="single">Tek Kişilik</option>
                        <option value="double">Çift Kişilik</option>
                        <option value="triple">Üç Kişilik</option>
                        <option value="quad">Dört Kişilik</option>
                        <option value="six">Altı Kişilik</option>
                        <option value="shared">Paylaşımlı</option>
                      </select>
                    </div>
                  </div>
                )}

                {adType === "dorm" && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fotoğraflar
                    </label>
                    <input
                      type="file"
                      name="photos"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="block"
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {previewImages.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                        {previewImages.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={img}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600"
                    } text-white rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>İşleniyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>İlanı Yayınla</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Premium Üyelik Gerekli</h2>
            <p className="text-gray-600 mb-6">{premiumError}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPremiumModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Kapat
              </button>
              <button
                onClick={() => {
                  setShowPremiumModal(false);
                  window.location.href = "/payment";
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Premium Ol
              </button>
            </div>
          </div>
        </div>
      )}

      {success && <ErrorMessage message={success} severity="success" />}
    </>
  );
};

export default DormAdvertForm;
