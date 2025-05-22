import React, { useEffect, useState } from "react";
import { AdminService } from "../../../../services/AdminService";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Loader,
  AlertCircle,
  Trash2,
} from "lucide-react";

const ForumPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const posts = await AdminService.getAllPosts();
      setPosts(posts);
    } catch (error) {
      console.error("Postlar alınamadı:", error);
      setError("Forum postları yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await AdminService.deleteForumPost(postId);
      await fetchPosts();
    } catch (error) {
      console.error("Post silinemedi:", error);
      setError("Post silinirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("tr-TR", options);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-lg p-8">
        <Loader className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">
          Forum postları yükleniyor...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-lg p-8">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button
          onClick={fetchPosts}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-8">
        <MessageSquare className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Forum Postları</h2>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Henüz bir post bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </h3>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${post.name}+${post.surname}&background=random`}
                      alt={`${post.name} ${post.surname}`}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {post.name} {post.surname}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(post.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">
                        {post.likes}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsDown className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-600">
                        {post.dislikes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumPosts;
