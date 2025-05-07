import React, { useEffect, useState } from "react";
import { AdminService } from "../../../../services/AdminService";

const ForumPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await AdminService.getAllPosts();
        setPosts(posts);
        setLoading(false);
      } catch (error) {
        console.error("Postlar alınamadı:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Forum Postları</h2>
      {posts.length === 0 ? (
        <p>Henüz bir post yok.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Yazan: {post.name} {post.surname}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Tarih: {new Date(post.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Beğeni: {post.likes} | Beğenmeme: {post.dislikes}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ForumPosts;
