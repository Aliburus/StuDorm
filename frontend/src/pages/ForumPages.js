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
import dayjs from "dayjs";
import {
  toggleLike,
  toggleDislike,
  createPost,
  getPosts,
} from "../services/ForumService";

function ForumPages() {
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Postlar alınamadı:", error.message);
    }
  };

  const handlePostSubmit = async () => {
    try {
      const newPost = await createPost(newPostContent);
      setPosts((prevPosts) => [
        {
          ...newPost,
          userName: "Current User",
          timestamp: "Just now",
        },
        ...prevPosts,
      ]);
      setNewPostContent("");
    } catch (error) {
      console.error("Post eklenemedi:", error.message);
      alert("Post eklenemedi: " + error.message);
    }
  };
  const handleLike = async (postId) => {
    const already = likedPosts.includes(postId);
    try {
      await toggleLike(postId, already);
      await fetchPosts();
      setLikedPosts((prev) =>
        already ? prev.filter((id) => id !== postId) : [...prev, postId]
      );
      // Dislike varsa kaldır
      setDislikedPosts((prev) => prev.filter((id) => id !== postId));
    } catch (e) {
      console.error("Like hatası:", e.message);
    }
  };

  const handleDislike = async (postId) => {
    const already = dislikedPosts.includes(postId);
    try {
      await toggleDislike(postId, already);
      await fetchPosts();
      setDislikedPosts((prev) =>
        already ? prev.filter((id) => id !== postId) : [...prev, postId]
      );
      setLikedPosts((prev) => prev.filter((id) => id !== postId));
    } catch (e) {
      console.error("Dislike hatası:", e.message);
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
            <div className="lg:w-2/3">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-yellow-600 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Gönderi Paylaş
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
                      key={post.id || `temp-${index}`} // id yoksa geçici key
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
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 ${
                            likedPosts.includes(post.id)
                              ? "text-yellow-600"
                              : "text-gray-600 hover:text-yellow-600"
                          } transition-colors duration-200`}
                        >
                          <ThumbsUp className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button
                          onClick={() => handleDislike(post.id)}
                          className={`flex items-center gap-2 ${
                            dislikedPosts.includes(post.id)
                              ? "text-yellow-600"
                              : "text-gray-600 hover:text-yellow-600"
                          } transition-colors duration-200`}
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

            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
                <h2 className="text-xl font-semibold text-yellow-600 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Popüler Gönderiler
                </h2>
                <div className="space-y-4">
                  {sortedPosts.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center text-sm font-semibold">
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
