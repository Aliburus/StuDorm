import React from "react";
import { getTopForumPosts } from "../services/ForumService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ThumbsDown, Star } from "lucide-react";

const TopPosts = () => {
  const [topPosts, setTopPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopPosts = async () => {
      const data = await getTopForumPosts();
      setTopPosts(data);
    };

    fetchTopPosts();
  }, []);

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Header with gradient text and decorative elements */}
      <div className="relative text-center mb-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-yellow-100 rounded-full opacity-20"></div>
        </div>
        <h2 className="relative text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-800">
          Topluluk Tartışmaları
        </h2>
        <p className="relative text-gray-600 max-w-2xl mx-auto text-lg">
          Katıldığınız tartışmalar ve paylaşımlar ile topluluğumuzun bir parçası
          olun. En popüler gönderileri keşfedin ve fikirlerinizi paylaşın.
        </p>
      </div>

      {/* Posts grid with enhanced cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {topPosts.map((post) => (
          <div
            key={post.id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Card header accent */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-1"></div>

            <div className="p-6">
              {/* Author section */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-700 font-semibold">
                    {post.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800 flex items-center">
                    {post.name} {post.surname}
                    {(post.isPremium || post.user_type === "premium") && (
                      <Star
                        className="w-4 h-4 ml-1 text-yellow-400"
                        fill="#facc15"
                        stroke="#facc15"
                        title="Premium Üye"
                      />
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Post content */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed line-clamp-3">
                  {post.content}
                </p>
              </div>

              {/* Interaction buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-yellow-600 transition-colors">
                    <Heart size={18} className="mr-1" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-yellow-600 transition-colors">
                    <ThumbsDown size={18} className="mr-1" />
                    <span className="text-sm">{post.dislikes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => {
            navigate("/forumpage");
            window.scrollTo(0, 0);
          }}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Forumu Görüntüle
          <svg
            className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopPosts;
