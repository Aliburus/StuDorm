import React, { useState } from "react";
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
const DormAdvertForm = () => {
  const [adType, setAdType] = useState("dorm"); // NEW: ad type selection

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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const totalFiles = formData.photos.length + files.length;

    if (totalFiles > 15) {
      setErrors((prev) => ({
        ...prev,
        photos: "En fazla 15 fotoğraf yükleyebilirsiniz.",
      }));
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
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Başlık gereklidir";
    if (!formData.description.trim())
      newErrors.description = "Açıklama gereklidir";
    if (!formData.province) newErrors.province = "İl seçimi gereklidir";
    if (!formData.district) newErrors.district = "İlçe seçimi gereklidir";

    if (adType === "dorm") {
      if (!formData.price) newErrors.price = "Fiyat gereklidir";
      if (formData.photos.length < 5)
        newErrors.photos = "En az 5 fotoğraf yüklemelisiniz";
    }

    if (adType === "parttime" && !formData.price) {
      newErrors.price = "Ücret gereklidir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const location = `${formData.province}, ${formData.district}`;
    const payload = { ...formData, location };

    try {
      if (adType === "dorm") {
        // Use FormData to handle file uploads
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
        alert("Yurt ilanınız başarıyla kaydedildi.");
      } else if (adType === "interns") {
        await createIntern(payload);
        alert("Staj ilanınız başarıyla kaydedildi.");
      } else if (adType === "parttime") {
        await createPartTimeAdvert(payload);
        alert("Part-time ilanınız başarıyla kaydedildi.");
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
      console.error("Error submitting form:", error);
      alert("İlan kaydedilirken bir hata oluştu: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
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
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Başlık girin"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
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
                      errors.description ? "border-red-500" : "border-gray-300"
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
                  {(errors.province || errors.district) && (
                    <div className="mt-2 text-red-500 text-sm">
                      {errors.province || errors.district}
                    </div>
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
                        errors.price ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="₺"
                    />
                    {errors.price && (
                      <p className="text-sm text-red-500">{errors.price}</p>
                    )}
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
                    {errors.photos && (
                      <p className="text-sm text-red-500">{errors.photos}</p>
                    )}
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
    </div>
  );
};

export default DormAdvertForm;
