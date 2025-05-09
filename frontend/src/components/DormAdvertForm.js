import React, { useState } from "react";
import LocationSelector from "./LocationSelector";
import {
  DollarSign,
  Users,
  FileText,
  MapPin,
  X,
  Image as ImageIcon,
  Home,
  Send,
} from "lucide-react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const DormAdvertForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    description: "",
    price: "",
    gender_required: "herkes",
    province: "",
    district: "",
    neighborhood: "",
    room_type: "single",
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
    if (files.length > 10) {
      setErrors((prev) => ({
        ...prev,
        photos: "En fazla 10 fotoğraf yükleyebilirsiniz.",
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
    if (!formData.price) newErrors.price = "Fiyat gereklidir";
    if (!formData.province) newErrors.province = "İl seçimi gereklidir";
    if (!formData.district) newErrors.district = "İlçe seçimi gereklidir";
    if (formData.photos.length === 0)
      newErrors.photos = "En az bir fotoğraf yüklemelisiniz";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const location = `${formData.province}, ${formData.district}`;
    const payload = { ...formData, location };
    delete payload.neighborhood;

    try {
      // Mocking the createYurtIlan function since it's not available
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      alert("İlan başarıyla kaydedildi.");
      setFormData({
        user_id: "",
        title: "",
        description: "",
        price: "",
        gender_required: "herkes",
        province: "",
        district: "",
        neighborhood: "",
        room_type: "single",
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
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-8 sm:px-10 sm:py-10">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Yeni İlan Oluştur
                </h1>
                <p className="text-yellow-100">
                  Yurt veya oda ilanınızı oluşturmak için aşağıdaki formu
                  doldurun
                </p>
              </div>
            </div>

            <div className="px-6 py-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title */}
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
                    } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Örn: Kadıköy'de 3+1 Dairede Kiralık Oda"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FileText className="w-4 h-4 inline-block mr-2 text-yellow-500" />
                    İlan Açıklaması
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                    placeholder="İlanınızla ilgili detaylı bilgi verin..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <DollarSign className="w-4 h-4 inline-block mr-2 text-yellow-500" />
                    Fiyat
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                      placeholder="0"
                    />
                    <div className="absolute left-0 top-0 bottom-0 w-10 bg-gray-100 rounded-l-lg flex items-center justify-center border-r border-gray-300">
                      <span className="text-gray-500 font-medium">₺</span>
                    </div>
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                  )}
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

                {/* Room Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Users className="w-4 h-4 inline-block mr-2 text-yellow-500" />
                      Cinsiyet Tercihi
                    </label>
                    <select
                      name="gender_required"
                      value={formData.gender_required}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="erkek">Erkek</option>
                      <option value="kiz">Kız</option>
                      <option value="herkes">Herkes</option>
                    </select>
                  </div>

                  {/* Room Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Home className="w-4 h-4 inline-block mr-2 text-yellow-500" />
                      Oda Türü
                    </label>
                    <select
                      name="room_type"
                      value={formData.room_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="single">Tek Kişilik</option>
                      <option value="double">Çift Kişilik</option>
                      <option value="shared">Paylaşımlı</option>
                    </select>
                  </div>
                </div>

                {/* Photos */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <ImageIcon className="w-4 h-4 inline-block mr-2 text-yellow-500" />
                    Fotoğraflar
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 transition-all duration-300 hover:border-yellow-400 bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <ImageIcon className="w-8 h-8 text-yellow-500 mb-2" />
                      <p className="text-sm font-medium text-gray-700">
                        Fotoğrafları sürükleyin veya seçin
                      </p>
                      <p className="text-xs text-gray-500">
                        En fazla 10 adet fotoğraf yükleyebilirsiniz
                      </p>
                      <input
                        type="file"
                        name="photos"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="w-full cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-yellow-500 file:px-4 file:py-2 file:text-white file:transition-colors file:duration-300 file:hover:bg-yellow-600"
                      />
                    </div>
                  </div>

                  {errors.photos && (
                    <p className="text-sm text-red-500">{errors.photos}</p>
                  )}

                  {previewImages.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-yellow-500" />
                        Yüklenen Fotoğraflar
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {previewImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative group rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-md"
                          >
                            <img
                              src={img}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 transform hover:scale-110"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
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
      </div>{" "}
      <Footer />
    </div>
  );
};

export default DormAdvertForm;
