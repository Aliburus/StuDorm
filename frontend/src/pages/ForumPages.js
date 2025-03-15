import { useState, useEffect } from "react";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  TrendingUp,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import dayjs from "dayjs"; // Day.js kullanımı için

function ForumPages() {
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState([]); // Ensure posts is always an array
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts"); // Assuming the API is hosted here
        const data = await response.json();
        if (response.ok) {
          setPosts(data); // Set the posts to state
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Call the function on mount
  }, []);
  const handlePostSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token bulunamadı.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newPostContent }),
      });

      const data = await response.json();

      if (response.ok) {
        // Yeni post ID'sini backend'den alıp burada ekle
        setPosts((prevPosts) => [
          {
            ...data.post, // Backend'den gelen veriyi burada kullanıyoruz
            userName: "Current User",
            timestamp: "Just now",
          },
          ...prevPosts,
        ]);
        setNewPostContent(""); // Clear content after submit
      } else {
        console.error("API Error: ", data.message);
        alert("Post eklenemedi: " + data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Post gönderilirken hata oluştu.");
    }
  };

  const handleLike = async (postId, index) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/like`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedPosts = [...posts];
        updatedPosts[index].likes += 1;
        setPosts(updatedPosts);
      } else {
        console.error("Like işlemi başarısız oldu.");
      }
    } catch (error) {
      console.error("Like hatası:", error);
    }
  };

  const handleDislike = async (postId, index) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/dislike`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedPosts = [...posts];
        updatedPosts[index].dislikes += 1;
        setPosts(updatedPosts);
      } else {
        console.error("Dislike işlemi başarısız oldu.");
      }
    } catch (error) {
      console.error("Dislike hatası:", error);
    }
  };

  const sortedPosts = [...posts].sort(
    (a, b) => b.likes + b.dislikes - (a.likes + a.dislikes)
  );
  const formatDate = (dateString) => {
    return dayjs(dateString).format("DD.MM.YYYY HH:mm:ss");
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Comment Form */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-yellow-600 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Yorum Yap
                </h2>
                <div className="relative">
                  <textarea
                    className="w-full p-4 border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none transition-all duration-200"
                    rows={4}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Düşüncelerinizi buraya yazın..."
                  />
                  <button
                    onClick={handlePostSubmit}
                    className="absolute bottom-4 right-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200"
                    title="Gönder"
                  >
                    <Send className="w-4 h-4" />
                    Gönder
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <div
                      key={post.id}
                      className="bg-white p-6 rounded-lg shadow-md"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center font-semibold">
                            {post.name ? post.name[0] : "U"}
                          </div>
                          <div>
                            <h3 className="font-semibold text-yellow-600">
                              {post.name || "Unknown User"} {post.surname || ""}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {formatDate(post.created_at) || "Just now"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {post.content}
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleLike(post.id, index)}
                          className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200"
                        >
                          <ThumbsUp className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button
                          onClick={() => handleDislike(post.id, index)}
                          className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200"
                        >
                          <ThumbsDown className="w-5 h-5" />
                          <span>{post.dislikes}</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">
                    Henüz bir gönderi yapılmamış.
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
                <h2 className="text-xl font-semibold text-yellow-600 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Popüler Yorumlar
                </h2>
                <div className="space-y-4">
                  {sortedPosts.slice(0, 3).map((post, index) => (
                    <div
                      key={post.id} // Ensure a unique key is provided
                      className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center text-sm font-semibold">
                          {/* Check if userName exists and fall back to 'U' if not */}
                          {post.userName ? post.userName.charAt(0) : "U"}
                        </div>
                        <span className="font-medium text-yellow-600">
                          {post.userName || "Unknown User"}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">
                        {post.content}
                      </p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsDown className="w-4 h-4" /> {post.dislikes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForumPages;
