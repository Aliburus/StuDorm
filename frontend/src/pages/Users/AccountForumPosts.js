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

  // Gönderileri sunucudan çeker
  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getUserForumPosts();
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      setError("Gönderiler alınırken bir hata oluştu.");
    }
  };

  // Bileşen yüklendiğinde gönderileri yükle
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchUserComments = async () => {
    try {
      const comments = await getUserComments();
      setUserComments(comments);
      // Her yorumun ait olduğu gönderiyi çek
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

  // Gönderi silme işlemi
  const handleDelete = async (postId) => {
    try {
      await deleteUserForumPost(postId);
      await fetchPosts(); // Silme sonrası listeyi yenile
    } catch (err) {
      setError("Gönderi silinirken bir hata oluştu.");
    }
  };

  // Düzenleme modalını aç
  const handleEdit = (postId, content) => {
    setEditPostId(postId);
    setCurrentContent(content);
    setIsModalOpen(true);
  };

  // Düzenleme kaydedildiğinde listeyi güncelle
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

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );

  // Gönderi yoksa yönlendirme butonlu boş durum
  if (!posts.length)
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg mb-6">
          Henüz paylaşımınız bulunmuyor.
        </p>
        <button
          onClick={() => navigate("/forumpage")}
          className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
        >
          Paylaşım Yap
        </button>
      </div>
    );

  return (
    <div className="space-y-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-xl shadow-sm p-3 border border-gray-100 hover:shadow-md transition-all duration-300"
          style={{ marginTop: 0, marginBottom: 0 }}
        >
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <span className="font-semibold text-gray-800">
                {post.name} {post.surname}
              </span>
              {(post.isPremium || post.user_type === "premium") && (
                <Star
                  className="w-4 h-4 ml-1 text-yellow-400"
                  fill="#facc15"
                  stroke="#facc15"
                  title="Premium Üye"
                />
              )}
            </div>
            <div className="flex space-x-1">
              <button
                className="p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => handleEdit(post.id, post.content)}
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => handleDelete(post.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center text-gray-500 mb-1">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {new Date(post.created_at).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-3 mb-1">
            <div className="flex items-center text-green-500">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{post.likes}</span>
            </div>
            <div className="flex items-center text-red-500">
              <ThumbsDown className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{post.dislikes}</span>
            </div>
          </div>
          <p
            className="text-gray-700 text-base mb-2 border-l-4 border-yellow-400 pl-4 py-2 bg-yellow-50 rounded-r-lg"
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
              {expandedPosts.includes(post.id) ? "Küçült" : "Devamını Göster"}
            </button>
          )}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => toggleComments(post.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                showComments[post.id]
                  ? "bg-yellow-500 text-white"
                  : "text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Yorumlar ({comments[post.id]?.length || 0})</span>
            </button>
          </div>
          {showComments[post.id] && (
            <div className="mt-4 bg-white border border-gray-100 rounded-2xl shadow p-4">
              {commentLoading[post.id] && (
                <div className="text-yellow-700 font-medium">
                  Yorumlar yükleniyor...
                </div>
              )}
              {comments[post.id] && (
                <div className="space-y-4 mt-2">
                  {comments[post.id].length === 0 && (
                    <div className="text-gray-500 italic">Henüz yorum yok.</div>
                  )}
                  {comments[post.id]
                    .slice(0, visibleComments[post.id] || 3)
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
                    .map((c) => (
                      <div
                        key={c.id}
                        className="flex items-start gap-3 bg-white border border-yellow-100 rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md"
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
                              {new Date(c.created_at).toLocaleString("tr-TR")}
                            </span>
                          </div>
                          <div className="text-gray-800 text-sm leading-relaxed">
                            {c.comment}
                          </div>
                        </div>
                      </div>
                    ))}
                  {comments[post.id].length >
                    (visibleComments[post.id] || 3) && (
                    <button
                      className="text-yellow-600 underline text-xs mt-2"
                      onClick={() =>
                        setVisibleComments((prev) => ({
                          ...prev,
                          [post.id]: (prev[post.id] || 3) + 3,
                        }))
                      }
                    >
                      Daha fazla gör
                    </button>
                  )}
                  {(visibleComments[post.id] || 3) > 3 && (
                    <button
                      className="text-yellow-600 underline text-xs mt-2 ml-2"
                      onClick={() =>
                        setVisibleComments((prev) => ({
                          ...prev,
                          [post.id]: 3,
                        }))
                      }
                    >
                      Daha az gör
                    </button>
                  )}
                </div>
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
