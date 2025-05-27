import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  TrendingUp,
  Star,
  MoreVertical,
  Trash2,
  Share2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ErrorMessage from "../components/ErrorMessage";
dayjs.extend(relativeTime);
import {
  toggleLike,
  toggleDislike,
  createPost,
  getPosts,
  getComments,
  addComment,
  deleteUserForumPost,
  deleteForumComment,
} from "../services/ForumService";

function ForumPages() {
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [copyMessage, setCopyMessage] = useState("");
  const menuRef = useRef();
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [showComments, setShowComments] = useState({});
  const [commentLoading, setCommentLoading] = useState({});
  const [commentMenuOpen, setCommentMenuOpen] = useState(null);
  const commentMenuRefs = useRef({});
  const [popularCount, setPopularCount] = useState(3);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
      Object.entries(commentMenuRefs.current).forEach(([id, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setCommentMenuOpen((openId) => (openId === id ? null : openId));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    if (!newPostContent.trim()) {
      setError("Lütfen bir gönderi içeriği giriniz");
      return;
    }

    if (newPostContent.trim().length > 1000) {
      setError("Gönderi içeriği çok uzun. Maksimum 1000 karakter olmalıdır");
      return;
    }

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
      setSuccess("Gönderiniz başarıyla paylaşıldı");
    } catch (error) {
      setError("Gönderi paylaşılırken bir hata oluştu. Lütfen tekrar deneyin");
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
      setError("İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin");
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
      setError("İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin");
    }
  };

  const handleShare = (postId) => {
    const url = `${window.location.origin}/forumpage#post-${postId}`;
    navigator.clipboard.writeText(url);
    setCopyMessage("Gönderi bağlantısı panoya kopyalandı!");
    setTimeout(() => setCopyMessage(""), 1500);
  };

  const toggleExpand = (postId) => {
    setExpandedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const fetchComments = async (postId) => {
    setCommentLoading((prev) => ({ ...prev, [postId]: true }));
    try {
      const data = await getComments(postId);
      setComments((prev) => ({ ...prev, [postId]: data }));
    } catch (e) {
      console.error("Yorumlar alınamadı:", e);
    } finally {
      setCommentLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!newComment[postId]?.trim()) {
      setError("Lütfen bir yorum giriniz");
      return;
    }

    if (newComment[postId].trim().length > 500) {
      setError("Yorum çok uzun. Maksimum 500 karakter olmalıdır");
      return;
    }

    try {
      await addComment(postId, newComment[postId]);
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      await fetchComments(postId);
      setSuccess("Yorumunuz başarıyla eklendi");
    } catch (e) {
      setError("Yorum eklenirken bir hata oluştu. Lütfen tekrar deneyin");
    }
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    if (!showComments[postId]) fetchComments(postId);
  };

  const handleDeletePost = async (postId) => {
    if (
      window.confirm(
        "Bu gönderiyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
      )
    ) {
      try {
        await deleteUserForumPost(postId);
        await fetchPosts();
        setSuccess("Gönderi başarıyla silindi");
      } catch (e) {
        setError("Gönderi silinirken bir hata oluştu. Lütfen tekrar deneyin");
      }
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (
      window.confirm(
        "Bu yorumu silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
      )
    ) {
      try {
        await deleteForumComment(postId, commentId);
        await fetchComments(postId);
        setSuccess("Yorum başarıyla silindi");
      } catch (e) {
        setError("Yorum silinirken bir hata oluştu. Lütfen tekrar deneyin");
      }
    }
  };

  const sortedPosts = [...posts].sort(
    (a, b) => b.likes + b.dislikes - (a.likes + a.dislikes)
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      {error && <ErrorMessage message={error} />}
      {success && <ErrorMessage message={success} severity="success" />}

      {copyMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-xl z-50 text-sm font-medium animate-fadeIn">
          {copyMessage}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Create Post */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">
                  Yeni Gönderi
                </h2>
              </div>
              <div className="relative">
                <textarea
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg border focus:border-yellow-500 focus:ring-0 transition-colors duration-200 resize-none text-gray-700 placeholder-gray-400 text-sm"
                  rows={2}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Düşüncelerinizi paylaşın..."
                  style={{ fontSize: "14px" }}
                />
                <button
                  onClick={handlePostSubmit}
                  disabled={!newPostContent.trim()}
                  className={`absolute bottom-2 right-2 rounded-lg px-4 py-1.5 font-medium flex items-center gap-2 text-xs
                    ${
                      newPostContent.trim()
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  style={{ fontSize: "13px" }}
                >
                  <Send className="w-4 h-4" />
                  Paylaş
                </button>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  id={`forum-post-${post.id}`}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 text-sm"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white font-bold text-base shadow-inner">
                        {post.name?.[0] || "U"}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {post.name} {post.surname}
                          </h3>
                          {(post.isPremium || post.user_type === "premium") && (
                            <Star
                              className="w-3 h-3 text-yellow-500"
                              fill="currentColor"
                            />
                          )}
                        </div>
                        <time className="text-xs text-gray-500">
                          {dayjs(post.created_at).fromNow()}
                        </time>
                      </div>
                    </div>

                    <div className="relative" ref={menuRef}>
                      <button
                        onClick={() =>
                          setMenuOpen(menuOpen === post.id ? null : post.id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>

                      {menuOpen === post.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-10">
                          <button
                            onClick={() => {
                              handleShare(post.id);
                              setMenuOpen(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Share2 className="w-4 h-4" />
                            Paylaş
                          </button>

                          {String(post.user_id) ===
                            String(localStorage.getItem("userId")) && (
                            <button
                              onClick={() => {
                                handleDeletePost(post.id);
                                setMenuOpen(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Sil
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-3">
                    <p
                      className="text-gray-700 leading-relaxed break-words overflow-hidden text-sm"
                      style={{ maxHeight: "60px" }}
                    >
                      {expandedPosts.includes(post.id)
                        ? post.content
                        : post.content.slice(0, 120) +
                          (post.content.length > 120 ? "..." : "")}
                    </p>
                    {post.content.length > 120 && (
                      <button
                        onClick={() => toggleExpand(post.id)}
                        className="text-yellow-500 hover:text-yellow-600 text-xs font-medium mt-1"
                      >
                        {expandedPosts.includes(post.id)
                          ? "Küçült"
                          : "Devamını Oku"}
                      </button>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors text-xs
                        ${
                          likedPosts.includes(post.id)
                            ? "bg-yellow-500 text-white"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="font-medium">{post.likes}</span>
                    </button>
                    <button
                      onClick={() => handleDislike(post.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors text-xs
                        ${
                          dislikedPosts.includes(post.id)
                            ? "bg-yellow-500 text-white"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span className="font-medium">{post.dislikes}</span>
                    </button>
                    <button
                      onClick={() => toggleComments(post.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors text-xs
                        ${
                          showComments[post.id]
                            ? "bg-yellow-500 text-white"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="font-medium">
                        {post.comment_count || comments[post.id]?.length || 0}
                      </span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {showComments[post.id] && (
                    <div className="mt-6 space-y-4">
                      {commentLoading[post.id] ? (
                        <div className="flex items-center justify-center py-4">
                          <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-4">
                            {comments[post.id]?.map((comment) => (
                              <div
                                key={comment.id}
                                className="flex items-start gap-3 bg-white p-4 rounded-xl"
                              >
                                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-medium text-sm">
                                  {comment.name[0]}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <div>
                                      <span className="font-medium text-gray-900">
                                        {comment.name} {comment.surname}
                                        {(comment.isPremium ||
                                          comment.user_type === "premium") && (
                                          <Star
                                            className="w-3 h-3 ml-1 text-yellow-500"
                                            fill="currentColor"
                                          />
                                        )}
                                      </span>
                                      <span className="mx-2 text-gray-300">
                                        •
                                      </span>
                                      <time className="text-sm text-gray-500">
                                        {dayjs(comment.created_at).fromNow()}
                                      </time>
                                    </div>

                                    {String(comment.user_id) ===
                                      String(
                                        localStorage.getItem("userId")
                                      ) && (
                                      <button
                                        onClick={() =>
                                          handleDeleteComment(
                                            post.id,
                                            comment.id
                                          )
                                        }
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                  <p className="text-gray-700 break-words">
                                    {comment.comment}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2 mt-4">
                            <input
                              type="text"
                              value={newComment[post.id] || ""}
                              onChange={(e) =>
                                setNewComment((prev) => ({
                                  ...prev,
                                  [post.id]: e.target.value,
                                }))
                              }
                              placeholder="Yorum yaz..."
                              className="flex-1 px-4 py-2 bg-gray-50 rounded-xl border-2 border-transparent focus:border-yellow-500 focus:ring-0 transition-colors"
                            />
                            <button
                              onClick={() => handleCommentSubmit(post.id)}
                              disabled={!newComment[post.id]?.trim()}
                              className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                                newComment[post.id]?.trim()
                                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              Gönder
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Trending Posts Sidebar */}
          <div className="lg:col-span-4">
            <div
              className="bg-white p-8 rounded-2xl shadow-lg sticky top-8"
              style={{ maxHeight: "480px", overflowY: "auto" }}
            >
              <h2 className="text-2xl font-bold text-yellow-600 mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                Popüler Gönderiler
              </h2>
              <div className="space-y-6">
                {sortedPosts.slice(0, 10).map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-xl bg-white border border-yellow-100 hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md text-xs cursor-pointer"
                    onClick={() => {
                      const el = document.getElementById(
                        `forum-post-${post.id}`
                      );
                      if (el) {
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                        el.classList.add("ring-2", "ring-yellow-400");
                        setTimeout(
                          () =>
                            el.classList.remove("ring-2", "ring-yellow-400"),
                          1200
                        );
                      }
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-white flex items-center justify-center font-bold shadow-md">
                        {post.name ? post.name.charAt(0) : "U"}
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 flex items-center text-xs">
                          {post.name} {post.surname}
                          {(post.isPremium || post.user_type === "premium") && (
                            <Star
                              className="w-3 h-3 ml-1 text-yellow-400"
                              fill="#facc15"
                              stroke="#facc15"
                              title="Premium Üye"
                            />
                          )}
                        </span>
                        <p className="text-xs text-gray-500">
                          {dayjs(post.created_at).fromNow()}
                        </p>
                      </div>
                    </div>
                    <p
                      className="text-gray-700 mb-2 line-clamp-2 leading-relaxed break-words overflow-hidden"
                      style={{ maxHeight: "40px" }}
                    >
                      {post.content.length > 60
                        ? post.content.slice(0, 60) + "..."
                        : post.content}
                    </p>
                    <div className="flex justify-between text-xs font-medium pt-2 border-t border-yellow-100">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1 text-yellow-600 hover:bg-yellow-100 px-1 py-0.5 rounded-lg"
                      >
                        <ThumbsUp className="w-3 h-3" /> {post.likes}
                      </button>
                      <button
                        onClick={() => handleDislike(post.id)}
                        className="flex items-center gap-1 text-yellow-600 hover:bg-yellow-100 px-1 py-0.5 rounded-lg"
                      >
                        <ThumbsDown className="w-3 h-3" /> {post.dislikes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ForumPages;
