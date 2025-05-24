import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserForumPosts,
  deleteUserForumPost,
  getComments,
  getUserComments,
} from "../../services/ForumService";
import EditPostModal from "./EditPostModal";
import {
  MessageSquare,
  Edit,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Star,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

const AccountForumPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [currentContent, setCurrentContent] = useState("");
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [visibleComments, setVisibleComments] = useState({});
  const [commentLoading, setCommentLoading] = useState({});
  const [userComments, setUserComments] = useState([]);
  const [userCommentPosts, setUserCommentPosts] = useState({});
  const [showUserCommentPosts, setShowUserCommentPosts] = useState({});
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getUserForumPosts();
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      setError("Gönderiler alınırken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchUserComments = async () => {
    try {
      const comments = await getUserComments();
      setUserComments(comments);
      comments.forEach(async (comment) => {
        try {
          const post = await fetch(
            `http://localhost:5000/api/posts/${comment.post_id}`
          ).then((res) => res.json());
          setUserCommentPosts((prev) => ({ ...prev, [comment.post_id]: post }));
        } catch (e) {
          console.error("Gönderi alınamadı:", e);
        }
      });
    } catch (err) {
      console.error("Yorumlar alınamadı:", err);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Bu gönderiyi silmek istediğinize emin misiniz?")) {
      try {
        await deleteUserForumPost(postId);
        await fetchPosts();
      } catch (err) {
        setError("Gönderi silinirken bir hata oluştu.");
      }
    }
  };

  const handleEdit = (postId, content) => {
    setEditPostId(postId);
    setCurrentContent(content);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsModalOpen(false);
    await fetchPosts();
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
      setVisibleComments((prev) => ({ ...prev, [postId]: 3 }));
    } catch (e) {
      setComments((prev) => ({ ...prev, [postId]: [] }));
      setVisibleComments((prev) => ({ ...prev, [postId]: 3 }));
    } finally {
      setCommentLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    if (!showComments[postId]) fetchComments(postId);
  };

  const toggleUserCommentPost = (postId) => {
    setShowUserCommentPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex items-center gap-3 animate-fadeIn">
        <AlertCircle className="w-6 h-6 text-red-500" />
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center space-y-6 animate-fadeIn">
        <MessageSquare className="w-20 h-20 text-yellow-500 mx-auto" />
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">
            Henüz paylaşımınız bulunmuyor
          </h3>
          <p className="text-gray-600">
            Forum sayfasına giderek ilk paylaşımınızı yapabilirsiniz.
          </p>
        </div>
        <button
          onClick={() => navigate("/forumpage")}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-98"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          Paylaşım Yap
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl"
        >
          {/* Post Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-white flex items-center justify-center font-bold text-lg mr-2">
                  {post.name ? post.name[0] : "U"}
                </div>
                <span className="font-semibold text-gray-800 text-base">
                  {post.name} {post.surname}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(post.id, post.content)}
                className="p-2 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors"
                title="Düzenle"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                title="Sil"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <p
              className="text-gray-700 text-base mb-2 pl-4 py-2 rounded-r-lg"
              style={{ wordBreak: "break-word" }}
            >
              {expandedPosts.includes(post.id)
                ? post.content
                : post.content.slice(0, 50) +
                  (post.content.length > 50 ? "..." : "")}
            </p>
            {post.content.length > 50 && (
              <button
                onClick={() => toggleExpand(post.id)}
                className="mt-2 text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center gap-1"
              >
                {expandedPosts.includes(post.id) ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Küçült
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Devamını Göster
                  </>
                )}
              </button>
            )}
          </div>

          {/* Post Stats */}
          <div className="flex items-center gap-6 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-green-600">
              <ThumbsUp className="w-5 h-5" />
              <span className="font-medium">{post.likes}</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <ThumbsDown className="w-5 h-5" />
              <span className="font-medium">{post.dislikes}</span>
            </div>
            <button
              onClick={() => toggleComments(post.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                showComments[post.id]
                  ? "bg-yellow-500 text-white"
                  : "text-yellow-600 hover:bg-yellow-50"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">
                {comments[post.id]?.length || 0} Yorum
              </span>
            </button>
          </div>

          {/* Comments Section */}
          {showComments[post.id] && (
            <div className="mt-4 space-y-4">
              {commentLoading[post.id] ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {comments[post.id]?.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Henüz yorum yapılmamış
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {comments[post.id]
                        .slice(0, visibleComments[post.id] || 3)
                        .sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((c) => (
                          <div
                            key={c.id}
                            className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                            style={{ minHeight: 56 }}
                          >
                            <div className="flex-shrink-0">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {c.name[0]}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-yellow-700 text-base">
                                  {c.name} {c.surname}
                                </span>
                                <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                                  {new Date(c.created_at).toLocaleString(
                                    "tr-TR"
                                  )}
                                </span>
                              </div>
                              <div className="text-gray-800 text-sm leading-relaxed">
                                {c.comment}
                              </div>
                            </div>
                            {(String(c.user_id) ===
                              String(localStorage.getItem("userId")) ||
                              localStorage.getItem("userType") === "admin") && (
                              <button
                                className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Yorumu Sil"
                                onClick={async () => {
                                  await require("../../services/AdminService").deleteForumComment(
                                    post.id,
                                    c.id
                                  );
                                  fetchComments(post.id);
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}

                      {comments[post.id]?.length >
                        (visibleComments[post.id] || 3) && (
                        <button
                          onClick={() =>
                            setVisibleComments((prev) => ({
                              ...prev,
                              [post.id]: prev[post.id] + 3,
                            }))
                          }
                          className="w-full py-2 text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                        >
                          Daha Fazla Yorum Göster
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}

      {isModalOpen && (
        <EditPostModal
          postId={editPostId}
          currentContent={currentContent}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AccountForumPosts;
