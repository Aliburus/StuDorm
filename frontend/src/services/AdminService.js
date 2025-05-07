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
const getAllListings = async () => {
  const res = await axios.get(`${API_URL}/listings`);
  return res.data;
};
const getOverviewStats = async () => {
  const res = await axios.get(`${API_URL}/overview-stats`);
  return res.data;
};
const deleteListing = async (source, id) => {
  await axios.delete(`${API_URL}/listings/${source}/${id}`);
};

// services/AdminService.js
const updateListingDetails = async (source, id, data) => {
  const res = await axios.put(
    `${API_URL}/listings/${source}/${id}/details`,
    data
  );
  return res.data;
};
const getReportedContent = async () => {
  try {
    const res = await axios.get(`${API_URL}/reported-content`);
    return res.data;
  } catch (error) {
    console.error("Error fetching reported content:", error);
    throw error;
  }
};
const getAllPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts`);
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
const deleteUser = async (id) => {
  const res = await axios.delete(`${API_URL}/users/${id}`);
  return res.data;
};
export const AdminService = {
  getAllListings,
  getUsers,
  getOverviewStats,
  deleteListing,
  updateListingDetails,
  getReportedContent,
  getAllPosts,
  deleteUser,
};
