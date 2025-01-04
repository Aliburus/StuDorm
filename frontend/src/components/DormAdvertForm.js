import React, { useState } from "react";
import LocationSelector from "./LocationSelector";
import { createYurtIlan } from "../services/DormAdServices"; // API servisini import ettik

const DormAdvertForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    description: "",
    price: "",
    city: "",
    district: "",
    neighborhood: "",
    gender_required: "herkes",
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: [...formData.photos, ...e.target.files],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.city || !formData.district || !formData.neighborhood) {
      alert("Lütfen tüm konum bilgilerini doldurduğunuzdan emin olun.");
      return;
    }

    const location = `${formData.city}, ${formData.district}, ${formData.neighborhood}`;
    const updatedFormData = { ...formData, location };

    try {
      const response = await createYurtIlan(updatedFormData);
      alert("İlan başarıyla kaydedildi.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Yurt İlanı Formu
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-600 mb-2">Başlık</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Açıklama</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Fiyat</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* LocationSelector bileşenini burada kullanıyoruz */}
          <LocationSelector formData={formData} handleChange={handleChange} />

          <div>
            <label className="block text-gray-600 mb-2">Cinsiyet Tercihi</label>
            <select
              name="gender_required"
              value={formData.gender_required}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="erkek">Erkek</option>
              <option value="kiz">Kız</option>
              <option value="herkes">Herkes</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Fotoğraflar</label>
            <input
              type="file"
              name="photos"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            İlanı Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default DormAdvertForm;
