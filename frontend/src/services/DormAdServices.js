import axios from "axios";

const API_URL = "http://localhost:5000/api/yurt-ilan";

export const createYurtIlan = async (formData) => {
  try {
    const token = localStorage.getItem("token"); // <<< JWT’yi al
    if (!token) throw new Error("Kullanıcı yetkilendirmesi bulunamadı");

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("gender_required", formData.gender_required);
    formDataToSend.append("province", formData.province);
    formDataToSend.append("district", formData.district);
    formDataToSend.append("room_type", formData.room_type);

    formData.photos.forEach((photo) => {
      formDataToSend.append("photos", photo);
    });

    const response = await axios.post(API_URL, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // <<< Burada ekliyoruz
      },
    });

    return response.data;
  } catch (err) {
    console.error("createYurtIlan error:", err.response?.data || err.message);
    throw new Error("Failed to save ad.");
  }
};
