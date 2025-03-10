import React, { useState } from "react";
import LocationSelector from "./LocationSelector";
import { createYurtIlan } from "../services/DormAdServices";
import {
  Building2,
  Upload,
  DollarSign,
  Users,
  FileText,
  MapPin,
  X,
  Image as ImageIcon,
} from "lucide-react";

const DormAdvertForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    description: "",
    price: "",
    location: "",
    gender_required: "herkes",
    status: "active", // Default status
    is_hidden: false, // Default to visible
    is_premium: false, // Default to non-premium
    province: "",
    district: "",
    room_type: "single", // Default to single room
    photos: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setErrors({
        ...errors,
        photos: "En fazla 10 fotoğraf yükleyebilirsiniz.",
      });
      return;
    }

    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
    setFormData({
      ...formData,
      photos: [...formData.photos, ...files],
    });
  };

  const removeImage = (index) => {
    const newPhotos = [...formData.photos];
    const newPreviews = [...previewImages];

    URL.revokeObjectURL(previewImages[index]);
    newPhotos.splice(index, 1);
    newPreviews.splice(index, 1);

    setFormData({
      ...formData,
      photos: newPhotos,
    });
    setPreviewImages(newPreviews);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Başlık gereklidir";
    if (!formData.description.trim())
      newErrors.description = "Açıklama gereklidir";
    if (!formData.price) newErrors.price = "Fiyat gereklidir";
    if (!formData.province) newErrors.province = "İl seçimi gereklidir";
    if (!formData.district) newErrors.district = "İlçe seçimi gereklidir";
    if (!formData.room_type) newErrors.room_type = "Oda türü gereklidir";
    if (formData.photos.length === 0)
      newErrors.photos = "En az bir fotoğraf yüklemelisiniz";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const location = `${formData.province}, ${formData.district}`;
    const updatedFormData = { ...formData, location };

    try {
      const response = await createYurtIlan(updatedFormData);
      alert("İlan başarıyla kaydedildi.");
      setFormData({
        user_id: "",
        title: "",
        description: "",
        price: "",
        location: "",
        gender_required: "herkes",
        status: "active",
        is_hidden: false,
        is_premium: false,
        province: "",
        district: "",
        room_type: "single",
        photos: [],
      });
      setPreviewImages([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("İlan kaydedilirken bir hata oluştu: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900">
                Yeni İlan Oluştur
              </h1>
              <p className="mt-2 text-gray-600">
                Yurt veya oda ilanınızı oluşturmak için aşağıdaki formu doldurun
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline-block mr-2" />
                  İlan Başlığı
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="Örn: Kadıköy'de 3+1 Dairede Kiralık Oda"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline-block mr-2" />
                  İlan Açıklaması
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="İlanınızla ilgili detaylı bilgi verin..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline-block mr-2" />
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
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="0"
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₺
                  </span>
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              {/* Location Selector */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Konum Bilgileri
                </h3>
                <LocationSelector
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>

              {/* Gender Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline-block mr-2" />
                  Cinsiyet Tercihi
                </label>
                <select
                  name="gender_required"
                  value={formData.gender_required}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="erkek">Erkek</option>
                  <option value="kiz">Kız</option>
                  <option value="herkes">Herkes</option>
                </select>
              </div>

              {/* Status (Active/Inactive) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durum
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Pasif</option>
                </select>
              </div>

              {/* Hidden Option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="is_hidden"
                  checked={formData.is_hidden}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">İlanı Gizle</label>
              </div>

              {/* Premium Option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="is_premium"
                  checked={formData.is_premium}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Premium İlan</label>
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oda Türü
                </label>
                <select
                  name="room_type"
                  value={formData.room_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="single">Tek Kişilik</option>
                  <option value="double">Çift Kişilik</option>
                  <option value="shared">Paylaşımlı</option>
                </select>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ImageIcon className="w-4 h-4 inline-block mr-2" />
                  Fotoğraflar
                </label>
                <div className="space-x-2">
                  <input
                    type="file"
                    name="photos"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="w-full file:rounded-lg file:border file:bg-gray-100 file:text-gray-700 file:px-4 file:py-2"
                  />
                  {errors.photos && (
                    <p className="mt-1 text-sm text-red-500">{errors.photos}</p>
                  )}
                </div>

                <div className="mt-4 flex gap-4 overflow-x-auto">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700"
              >
                İlanı Yayınla
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DormAdvertForm;
