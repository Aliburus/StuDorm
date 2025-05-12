import axios from "axios";

const API_URL = "http://localhost:5000/api/yurt-ilan";

// Updated: accept FormData directly
export const createYurtIlan = async (formData) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Kullanıcı yetkilendirmesi bulunamadı");

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error("createYurtIlan error:", err.response?.data || err.message);
    throw new Error("Failed to save ad.");
  }
};
