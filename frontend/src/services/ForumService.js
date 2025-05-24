const API = "http://localhost:5000/api/posts";
export const getUserForumPosts = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const response = await fetch("http://localhost:5000/api/posts/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  // Eğer 404 dönerse "no posts" yerine boş dizi döndür
  if (response.status === 404) {
    return [];
  }
  const responseBody = await response.text(); // Raw body'yi al

  if (!response.ok) {
    const errorData = JSON.parse(responseBody); // Hata mesajını al
    console.error("Error response:", errorData); // Hata mesajını logla
    throw new Error(errorData.message || "Failed to fetch user forum posts");
  }

  return JSON.parse(responseBody); // Gelen veriyi parse et
};
export const deleteUserForumPost = async (postId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete the post");
  }

  return response.json();
};
export const updateUserForumPost = async (postId, updatedContent) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
    method: "PUT", // PUT metodu ile güncelleme yapılır
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: updatedContent }), // Güncellenmiş içerik
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Post güncellenirken hata oluştu");
  }

  return response.json(); // Güncellenmiş postu döndür
};
export const getTopForumPosts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/posts/top", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Top gönderiler alınamadı");
    }

    return await response.json(); // Top 5 gönderiyi döndür
  } catch (error) {
    console.error("Top gönderiler alınırken hata oluştu:", error);
    return []; // Hata durumunda boş array döndür
  }
};
export const getPosts = async () => {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Gönderiler alınamadı.");
  return res.json();
};

export const createPost = async (content) => {
  const token = localStorage.getItem("token");
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Post eklenemedi.");
  }
  const { post } = await res.json();
  return post;
};

export const toggleLike = async (postId, isLiked) => {
  const token = localStorage.getItem("token");
  const action = isLiked ? "unlike" : "like";
  const res = await fetch(`${API}/${postId}/like`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Like işlemi başarısız");
  }
  return res.json();
};

export const toggleDislike = async (postId, isDisliked) => {
  const token = localStorage.getItem("token");
  const action = isDisliked ? "undislike" : "dislike";
  const res = await fetch(`${API}/${postId}/dislike`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Dislike işlemi başarısız");
  }
  return res.json();
};

// Bir postun yorumlarını getir
export const getComments = async (postId) => {
  const res = await fetch(`http://localhost:5000/api/posts/${postId}/comments`);
  if (!res.ok) throw new Error("Yorumlar alınamadı");
  return await res.json();
};

// Bir posta yorum ekle
export const addComment = async (postId, comment) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:5000/api/posts/${postId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post_id: postId, comment }),
    }
  );
  if (!res.ok) throw new Error("Yorum eklenemedi");
  return await res.json();
};

export const getUserComments = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const response = await fetch(
    "http://localhost:5000/api/posts/user/comments",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch user comments");
  }

  return response.json();
};

export const deleteForumComment = async (postId, commentId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Yorum silinemedi");
  return await res.json();
};
