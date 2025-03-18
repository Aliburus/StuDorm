// services/AdminService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin"; // Backend API URL'sini tam olarak belirtin

// Kullanıcıları çekme
const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`); // Kullanıcıları almak için GET isteği yap
    return response.data; // Kullanıcı verilerini döndür
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const AdminService = {
  getUsers,
};
