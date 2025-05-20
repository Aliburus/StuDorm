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
    return dayjs(dateString).format("DD MMMM YYYY, HH:mm");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8 backdrop-blur-lg backdrop-filter">
              <h2 className="text-2xl font-bold text-yellow-600 mb-6 flex items-center gap-3">
                <MessageSquare className="w-6 h-6" />
                Gönderi Paylaş
              </h2>
              <div className="relative">
                <textarea
                  className="w-full p-6 border-2 border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                  rows={4}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Düşüncelerinizi buraya yazın..."
                />
                <button
                  onClick={handlePostSubmit}
                  className="absolute bottom-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                  Gönder
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <div
                    key={post.id || `temp-${index}`}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
                          {post.name ? post.name[0] : "U"}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {post.name} {post.surname}
                          </h3>
                          <span className="text-sm text-gray-500 flex items-center gap-2">
                            {formatDate(post.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed border-l-4 border-yellow-400 pl-6 py-3 bg-yellow-50 rounded-r-lg">
                      {post.content}
                    </p>
                    <div className="flex gap-6 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 ${
                          likedPosts.includes(post.id)
                            ? "bg-yellow-100 text-yellow-600"
                            : "text-gray-600 hover:bg-yellow-50 hover:text-yellow-600"
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span className="font-medium">{post.likes}</span>
                      </button>
                      <button
                        onClick={() => handleDislike(post.id)}
                        className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 ${
                          dislikedPosts.includes(post.id)
                            ? "bg-yellow-100 text-yellow-600"
                            : "text-gray-600 hover:bg-yellow-50 hover:text-yellow-600"
                        }`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                        <span className="font-medium">{post.dislikes}</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                  <MessageSquare className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Henüz bir gönderi yapılmamış
                  </h3>
                  <p className="text-gray-500 text-lg">
                    İlk gönderiyi siz yapabilirsiniz!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold text-yellow-600 mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                Popüler Gönderiler
              </h2>
              <div className="space-y-6">
                {sortedPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    className="p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-100 hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-white flex items-center justify-center font-bold shadow-md">
                        {post.name ? post.name.charAt(0) : "U"}
                      </div>
                      <div>
                        <span className="font-bold text-gray-800">
                          {post.name} {post.surname}
                        </span>
                        <p className="text-sm text-gray-500">
                          {formatDate(post.created_at)}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="flex justify-between text-sm font-medium pt-3 border-t border-yellow-100">
                      <span className="flex items-center gap-2 text-yellow-600">
                        <ThumbsUp className="w-4 h-4" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-2 text-yellow-600">
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
      <Footer />
    </div>
  );
}

export default ForumPages;
