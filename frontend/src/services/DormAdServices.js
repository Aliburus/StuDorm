import axios from "axios";

const API_URL = "http://localhost:5000/api/yurt-ilan";

// Yurt ilanı gönderme servisi
export const createYurtIlan = async (formData) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("user_id", formData.user_id);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("gender_required", formData.gender_required);

    formData.photos.forEach((photo) => {
      formDataToSend.append("photos", photo);
    });

    const response = await axios.post(API_URL, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("İlan kaydedilemedi.");
  }
};
