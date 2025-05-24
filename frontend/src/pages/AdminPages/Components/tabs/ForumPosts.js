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
import { getComments } from "../../../../services/ForumService";

const ForumPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [commentLoading, setCommentLoading] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [expandedPosts, setExpandedPosts] = useState([]);

  const fetchAllCommentCounts = async (posts) => {
    const counts = {};
    await Promise.all(
      posts.map(async (post) => {
        try {
          const data = await getComments(post.id);
          counts[post.id] = data.length;
        } catch {
          counts[post.id] = 0;
        }
      })
    );
    setCommentCounts(counts);
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      let posts = await AdminService.getAllPosts();
      posts = posts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setPosts(posts);
      await fetchAllCommentCounts(posts);
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

  const fetchComments = async (postId) => {
    setCommentLoading((prev) => ({ ...prev, [postId]: true }));
    try {
      const data = await getComments(postId);
      setComments((prev) => ({ ...prev, [postId]: data }));
    } catch (e) {
      setComments((prev) => ({ ...prev, [postId]: [] }));
    } finally {
      setCommentLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    if (!showComments[postId]) fetchComments(postId);
  };

  const toggleExpand = (postId) => {
    setExpandedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleDeleteComment = async (commentId, postId) => {
    try {
      await AdminService.deleteForumComment(postId, commentId);
      await fetchComments(postId);
      setCommentCounts((prev) => ({
        ...prev,
        [postId]: (prev[postId] || 1) - 1,
      }));
    } catch (e) {
      alert("Yorum silinirken hata oluştu");
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
                <p
                  className="text-gray-600 leading-relaxed mb-4"
                  style={{ wordBreak: "break-word" }}
                >
                  {expandedPosts.includes(post.id)
                    ? post.content
                    : post.content.slice(0, 100) +
                      (post.content.length > 100 ? "..." : "")}
                </p>
                {post.content.length > 100 && (
                  <button
                    className="text-indigo-600 underline text-sm mb-2"
                    onClick={() => toggleExpand(post.id)}
                  >
                    {expandedPosts.includes(post.id)
                      ? "Küçült"
                      : "Devamını Gör"}
                  </button>
                )}

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

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      showComments[post.id]
                        ? "bg-indigo-500 text-white"
                        : "text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Yorumlar ({commentCounts[post.id] ?? 0})</span>
                  </button>
                </div>
                {showComments[post.id] && (
                  <div className="mt-4 bg-gray-50 border border-gray-100 rounded-2xl shadow p-4">
                    {commentLoading[post.id] && (
                      <div className="text-indigo-700 font-medium">
                        Yorumlar yükleniyor...
                      </div>
                    )}
                    {comments[post.id] && (
                      <div className="space-y-4 mt-2">
                        {comments[post.id].length === 0 && (
                          <div className="text-gray-500 italic">
                            Henüz yorum yok.
                          </div>
                        )}
                        {comments[post.id]
                          .sort(
                            (a, b) =>
                              new Date(b.created_at) - new Date(a.created_at)
                          )
                          .map((c) => (
                            <div
                              key={c.id}
                              className="flex items-start gap-3 bg-white border border-indigo-100 rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                              style={{ minHeight: 56 }}
                            >
                              <div className="flex-shrink-0">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center">
                                  <span className="text-white font-bold">
                                    {c.name[0]}
                                  </span>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-indigo-700 text-base">
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
                              <button
                                className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Yorumu Sil"
                                onClick={() =>
                                  handleDeleteComment(c.id, post.id)
                                }
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumPosts;
