import React, { useState, useEffect } from "react";
import { getForumPosts } from "../../services/ForumService"; // Assume this service fetches the forum posts

const AccountForumPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForumPosts = async () => {
      try {
        const fetchedPosts = await getForumPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError("An error occurred while fetching forum posts.");
      }
    };

    fetchForumPosts();
  }, []);

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
          <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
          <p className="text-gray-700">{post.content}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">{post.author}</span>
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountForumPosts;
