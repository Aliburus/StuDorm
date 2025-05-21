import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserForumPosts,
  deleteUserForumPost,
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
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center mb-2">
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
            <div className="flex space-x-3">
              <button
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => handleEdit(post.id, post.content)}
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => handleDelete(post.id)}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {new Date(post.created_at).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-green-500">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{post.likes}</span>
              </div>
              <div className="flex items-center text-red-500">
                <ThumbsDown className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{post.dislikes}</span>
              </div>
            </div>
          </div>
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
