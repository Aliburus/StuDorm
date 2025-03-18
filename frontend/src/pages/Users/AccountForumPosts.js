import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchUserForumPosts = async () => {
      try {
        const fetchedPosts = await getUserForumPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError("An error occurred while fetching your forum posts.");
      }
    };

    fetchUserForumPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deleteUserForumPost(postId);
      setPosts(posts.filter((post) => post.id !== postId)); // Silinen postu listeden kaldır
    } catch (err) {
      setError("An error occurred while deleting the post.");
    }
  };

  const handleEdit = (postId, content) => {
    setEditPostId(postId);
    setCurrentContent(content);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Güncellenmiş postu tekrar yükle
    const updatedPosts = posts.map((post) =>
      post.id === editPostId ? { ...post, content: currentContent } : post
    );
    setPosts(updatedPosts); // Yeni post içeriğini listeye güncelle
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!posts.length)
    return <div className="text-gray-500">No forum posts available</div>;

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
                onClick={() => handleEdit(post.id, post.content)} // Edit butonuna tıklandığında handleEdit çalışır
              >
                ✏️ Düzenle
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(post.id)} // Silme butonuna tıklandığında handleDelete çalışır
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
