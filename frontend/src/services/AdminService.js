import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/admin`;

// Axios instance'ı oluşturuyoruz
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token'ı almak ve isteklerde eklemek için interceptor ekliyoruz
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Admin API fonksiyonlarını oluşturuyoruz
const getUsers = async () => {
  try {
    const response = await apiClient.get("/users"); // Authorization header'ı otomatik ekler
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getAllListings = async () => {
  const response = await apiClient.get("/listings");
  return response.data;
};

const getOverviewStats = async () => {
  const response = await apiClient.get("/overview-stats");
  return response.data;
};

const deleteListing = async (source, id) => {
  await apiClient.delete(`/listings/${source}/${id}`);
};

const updateListingDetails = async (source, id, data) => {
  const response = await apiClient.put(
    `/listings/${source}/${id}/details`,
    data
  );
  return response.data;
};

const getAllPosts = async () => {
  try {
    const response = await apiClient.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};
const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await apiClient.put("/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
const updateUserType = async (userId, user_type) => {
  try {
    const response = await apiClient.put(`/users/${userId}/update-type`, {
      user_type,
    });
    return response; // <- .data değil, tamamını döndür
  } catch (error) {
    console.error("Error updating user type:", error);
    throw error;
  }
};

const deleteForumPost = async (postId) => {
  try {
    const response = await apiClient.delete(`/posts/${postId}`);
    if (!response.data) {
      throw new Error("Post silinemedi");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting forum post:", error);
    throw new Error("Post silinemedi");
  }
};

const getUserLogs = async (userId) => {
  try {
    const url = userId ? `/user-logs?userId=${userId}` : "/user-logs";
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching user logs:", error);
    throw error;
  }
};

export const deleteForumComment = async (postId, commentId) => {
  try {
    const response = await apiClient.delete(
      `/forum/posts/${postId}/comments/${commentId}`
    );
    if (!response.data) {
      throw new Error("Yorum silinemedi");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting forum comment:", error);
    throw new Error("Yorum silinemedi");
  }
};

export const AdminService = {
  getUsers,
  getAllListings,
  getOverviewStats,
  deleteListing,
  updateListingDetails,

  getAllPosts,
  deleteUser,
  changePassword,
  updateUserType,
  deleteForumPost,
  getUserLogs,
  deleteForumComment,
};
