import React, { useState, useEffect } from "react";
import { updateUserForumPost } from "../../services/ForumService";

const EditPostModal = ({ postId, currentContent, onClose, onSave }) => {
  const [content, setContent] = useState(currentContent);

  useEffect(() => {
    setContent(currentContent);
  }, [currentContent]);

  const handleSave = async () => {
    try {
      await updateUserForumPost(postId, content);
      onSave();
      onClose();
    } catch (err) {
      console.error("Post güncellenirken hata:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Post Düzenle</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="Post içeriğini düzenleyin..."
        />
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
            onClick={onClose}
          >
            Kapat
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSave}
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
