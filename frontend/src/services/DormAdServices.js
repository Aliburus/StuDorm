import axios from "axios";

const API_URL = "http://localhost:5000/api/yurt-ilan";

// Create a new yurt ilan (ad) by sending the form data
export const createYurtIlan = async (formData) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("user_id", formData.user_id);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("gender_required", formData.gender_required);
    formDataToSend.append("province", formData.province);
    formDataToSend.append("district", formData.district);
    formDataToSend.append("room_type", formData.room_type);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("is_hidden", formData.is_hidden);
    formDataToSend.append("is_premium", formData.is_premium);

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
    throw new Error("Failed to save ad.");
  }
};
