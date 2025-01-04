import React, { useState } from "react";
import LocationSelector from "./LocationSelector"; // LocationSelector bileşenini import ettik
import { createPartTimeAdvert } from "../services/PartTimeAdvertServices"; // API servisini import ettik

const PartTimeAdvertForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    description: "",
    salary: "",
    city: "",
    district: "",
    neighborhood: "",
    requirements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.salary) {
      alert(
        "Lütfen başlık, açıklama ve maaş bilgilerini doldurduğunuzdan emin olun."
      );
      return;
    }

    const location = `${formData.city}, ${formData.district}, ${formData.neighborhood}`;
    const updatedFormData = { ...formData, location };

    try {
      const response = await createPartTimeAdvert(updatedFormData);
      alert("İlan başarıyla kaydedildi.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Part-Time İlanı Formu
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
            <label className="block text-gray-600 mb-2">Maaş</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* LocationSelector bileşenini burada kullanıyoruz */}
          <LocationSelector formData={formData} handleChange={handleChange} />

          <div>
            <label className="block text-gray-600 mb-2">Gereksinimler</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
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

export default PartTimeAdvertForm;
