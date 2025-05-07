import React, { useEffect, useState } from "react";
import { AdminService } from "../../../../services/AdminService"; // Adjust the import path as necessary

const ReportedContent = () => {
  const [reportedContent, setReportedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    AdminService.getReportedContent()
      .then((data) => {
        setReportedContent(data);
      })
      .catch((err) => {
        console.error("❌ Error fetching reported content:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-4">
        Loading reported content...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to load reported content.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reportedContent.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No reported content with 50 or more dislikes.
        </div>
      ) : (
        reportedContent.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.description}</p>
            <p className="text-gray-500">Dislikes: {post.dislike_count}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportedContent;
