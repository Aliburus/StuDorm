import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
const API = `${BASE_URL}/api/posts`;

export const getUserForumPosts = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await axios.get(`${API}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw new Error(
      error.response?.data?.message || "Failed to fetch user forum posts"
    );
  }
};

export const deleteUserForumPost = async (postId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await axios.delete(`${API}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete the post"
    );
  }
};

export const updateUserForumPost = async (postId, updatedContent) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await axios.put(
      `${API}/${postId}`,
      { content: updatedContent },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Post güncellenirken hata oluştu"
    );
  }
};

export const getTopForumPosts = async () => {
  try {
    const response = await axios.get(`${API}/top`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Top gönderiler alınırken hata oluştu:", error);
    return [];
  }
};

export const getPosts = async () => {
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    throw new Error("Gönderiler alınamadı.");
  }
};

export const createPost = async (content) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      API,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.post;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Post eklenemedi.");
  }
};

export const toggleLike = async (postId, isLiked) => {
  const token = localStorage.getItem("token");
  const action = isLiked ? "unlike" : "like";
  try {
    const response = await axios.put(
      `${API}/${postId}/like`,
      { action },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Like işlemi başarısız");
  }
};

export const toggleDislike = async (postId, isDisliked) => {
  const token = localStorage.getItem("token");
  const action = isDisliked ? "undislike" : "dislike";
  try {
    const response = await axios.put(
      `${API}/${postId}/dislike`,
      { action },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Dislike işlemi başarısız"
    );
  }
};

// Bir postun yorumlarını getir
export const getComments = async (postId) => {
  try {
    const response = await axios.get(`${API}/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw new Error("Yorumlar alınamadı");
  }
};

// Bir posta yorum ekle
export const addComment = async (postId, comment) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${API}/${postId}/comments`,
      { post_id: postId, comment },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Yorum eklenemedi");
  }
};

export const getUserComments = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await axios.get(`${API}/user/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user comments"
    );
  }
};

export const deleteForumComment = async (postId, commentId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await axios.delete(
      `${API}/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Yorum silinemedi");
  }
};
