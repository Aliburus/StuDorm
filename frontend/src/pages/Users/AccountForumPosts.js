import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserForumPosts,
  deleteUserForumPost,
} from "../../services/ForumService";
import EditPostModal from "./EditPostModal";

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

  if (error) return <div className="text-red-500">{error}</div>;

  // Gönderi yoksa yönlendirme butonlu boş durum
  if (!posts.length)
    return (
      <div className="text-center text-gray-500 space-y-4">
        <p>Henüz paylaşımınız bulunmuyor.</p>
        <button
          onClick={() => navigate("/forumpage")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
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
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <p className="text-gray-700">{post.content}</p>
            <div className="flex space-x-4">
              <button
                className="text-blue-500"
                onClick={() => handleEdit(post.id, post.content)}
              >
                ✏️ Düzenle
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(post.id)}
              >
                🗑️ Sil
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">👍 {post.likes}</span>
              <span className="text-red-500">👎 {post.dislikes}</span>
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
