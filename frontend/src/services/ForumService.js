export const getUserForumPosts = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const response = await fetch("http://localhost:5000/api/posts/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  // Eğer 404 dönerse “no posts” yerine boş dizi döndür
  if (response.status === 404) {
    return [];
  }
  console.log("Response status:", response.status); // Status kodunu logla
  const responseBody = await response.text(); // Raw body'yi al
  console.log("Response body:", responseBody); // Raw response'ı logla

  if (!response.ok) {
    const errorData = JSON.parse(responseBody); // Hata mesajını al
    console.error("Error response:", errorData); // Hata mesajını logla
    throw new Error(errorData.message || "Failed to fetch user forum posts");
  }

  return JSON.parse(responseBody); // Gelen veriyi parse et
};
export const deleteUserForumPost = async (postId) => {
  const token = sessionStorage.getItem("token");
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
  const token = sessionStorage.getItem("token");
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
