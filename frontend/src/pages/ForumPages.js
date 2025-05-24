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
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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

  const handleShare = (postId) => {
    const url = `${window.location.origin}/forumpage#post-${postId}`;
    navigator.clipboard.writeText(url);
    setCopyMessage("Bağlantı kopyalandı!");
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
    try {
      await addComment(postId, newComment[postId]);
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      await fetchComments(postId);
    } catch (e) {
      console.error("Yorum eklenemedi:", e);
    }
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    if (!showComments[postId]) fetchComments(postId);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Bu gönderiyi silmek istediğinize emin misiniz?")) {
      try {
        await deleteUserForumPost(postId);
        await fetchPosts();
      } catch (e) {
        console.error("Gönderi silinemedi:", e);
      }
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    alert(`Yorum silinecek: postId=${postId}, commentId=${commentId}`);
    console.log("handleDeleteComment tetiklendi:", { postId, commentId });
    if (window.confirm("Bu yorumu silmek istediğinize emin misiniz?")) {
      try {
        await deleteForumComment(postId, commentId);
        await fetchComments(postId);
      } catch (e) {
        console.error("Yorum silinemedi:", e);
      }
    }
  };

  const sortedPosts = [...posts].sort(
    (a, b) => b.likes + b.dislikes - (a.likes + a.dislikes)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      {copyMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-lg z-50 text-base font-semibold animate-fade-in">
          {copyMessage}
        </div>
      )}
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
                          <h3 className="text-lg font-bold text-gray-800 flex items-center">
                            {post.name} {post.surname}
                            {(post.isPremium ||
                              post.user_type === "premium") && (
                              <Star
                                className="w-4 h-4 ml-1 text-yellow-400"
                                fill="#facc15"
                                stroke="#facc15"
                                title="Premium Üye"
                              />
                            )}
                          </h3>
                          <span className="text-sm text-gray-500 flex items-center gap-2">
                            {dayjs(post.created_at).fromNow()}
                          </span>
                        </div>
                      </div>

                      <div className="relative" ref={menuRef}>
                        <button
                          className="p-1 rounded-full hover:bg-gray-100"
                          onClick={() =>
                            setMenuOpen(menuOpen === post.id ? null : post.id)
                          }
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                        {menuOpen === post.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => {
                                handleShare(post.id);
                                setMenuOpen(null);
                              }}
                            >
                              Bağlantıyı Kopyala
                            </button>
                            {(() => {
                              console.log(
                                "POST",
                                post.user_id,
                                localStorage.getItem("userId")
                              );
                              return true;
                            })() &&
                              String(post.user_id) ===
                                String(localStorage.getItem("userId")) && (
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                                  onClick={() => {
                                    handleDeletePost(post.id);
                                    setMenuOpen(null);
                                  }}
                                >
                                  Gönderiyi Sil
                                </button>
                              )}
                          </div>
                        )}
                      </div>
                    </div>

                    <p
                      className="text-gray-700 text-lg mb-6 leading-relaxed border-l-4 border-yellow-400 pl-6 py-3 bg-yellow-50 rounded-r-lg"
                      style={{ wordBreak: "break-word" }}
                    >
                      {expandedPosts.includes(post.id)
                        ? post.content
                        : post.content.slice(0, 50) +
                          (post.content.length > 50 ? "..." : "")}
                    </p>
                    {post.content.length > 50 && (
                      <button
                        className="text-yellow-600 underline text-sm mb-2"
                        onClick={() => toggleExpand(post.id)}
                      >
                        {expandedPosts.includes(post.id)
                          ? "Küçült"
                          : "Devamını Göster"}
                      </button>
                    )}

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
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
                      <button
                        onClick={() => toggleComments(post.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
                          showComments[post.id]
                            ? "bg-yellow-100 text-yellow-600"
                            : "text-gray-600 hover:bg-yellow-50 hover:text-yellow-600"
                        }`}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Yorumlar (
                          {post.comment_count || comments[post.id]?.length || 0}
                          )
                        </span>
                      </button>
                    </div>

                    {showComments[post.id] && (
                      <div className="mt-4 space-y-4">
                        {commentLoading[post.id] ? (
                          <div className="text-sm text-gray-500">
                            Yorumlar yükleniyor...
                          </div>
                        ) : (
                          <>
                            <div className="space-y-3">
                              {comments[post.id]?.map((comment) => (
                                <div
                                  key={comment.id}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-white flex items-center justify-center text-sm font-bold">
                                    {comment.name[0]}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm text-gray-800">
                                          {comment.name} {comment.surname}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                          {dayjs(comment.created_at).fromNow()}
                                        </span>
                                      </div>
                                      <div
                                        className="relative"
                                        ref={(el) =>
                                          (commentMenuRefs.current[comment.id] =
                                            el)
                                        }
                                      >
                                        <button
                                          className="p-1 rounded-full hover:bg-gray-100"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setCommentMenuOpen(
                                              commentMenuOpen === comment.id
                                                ? null
                                                : comment.id
                                            );
                                          }}
                                        >
                                          <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </button>
                                        {commentMenuOpen === comment.id && (
                                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-sm">
                                            <button
                                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleShare(comment.id);
                                                setCommentMenuOpen(null);
                                              }}
                                            >
                                              Bağlantıyı Kopyala
                                            </button>
                                            {String(comment.user_id) ===
                                              String(
                                                localStorage.getItem("userId")
                                              ) && (
                                              <button
                                                className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleDeleteComment(
                                                    post.id,
                                                    comment.id
                                                  );
                                                  setCommentMenuOpen(null);
                                                }}
                                              >
                                                Yorumu Sil
                                              </button>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                      {comment.comment}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newComment[post.id] || ""}
                                onChange={(e) =>
                                  setNewComment((prev) => ({
                                    ...prev,
                                    [post.id]: e.target.value,
                                  }))
                                }
                                placeholder="Yorum yazın..."
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-transparent"
                              />
                              <button
                                onClick={() => handleCommentSubmit(post.id)}
                                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                              >
                                Gönder
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
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
                        <span className="font-bold text-gray-800 flex items-center">
                          {post.name} {post.surname}
                          {(post.isPremium || post.user_type === "premium") && (
                            <Star
                              className="w-4 h-4 ml-1 text-yellow-400"
                              fill="#facc15"
                              stroke="#facc15"
                              title="Premium Üye"
                            />
                          )}
                        </span>
                        <p className="text-sm text-gray-500">
                          {dayjs(post.created_at).fromNow()}
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
