import { useState } from "react";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  TrendingUp,
} from "lucide-react";

function ForumPages() {
  const [comments, setComments] = useState([
    {
      userName: "Ali Yılmaz",
      comment: "Bu forum gerçekten çok faydalı. Herkese tavsiye ederim!",
      likes: 5,
      dislikes: 1,
      timestamp: "2 saat önce",
    },
    {
      userName: "Ayşe Kaya",
      comment: "Yorum yapmadan önce biraz araştırma yapın, eksik bilgiler var.",
      likes: 2,
      dislikes: 3,
      timestamp: "3 saat önce",
    },
    {
      userName: "Mehmet Demir",
      comment:
        "Kesinlikle katılmıyorum, bence daha detaylı bir açıklama yapılmalı.",
      likes: 1,
      dislikes: 2,
      timestamp: "5 saat önce",
    },
    {
      userName: "Seda Özdemir",
      comment: "Güzel bir konuya değinmişsiniz, tebrikler!",
      likes: 8,
      dislikes: 0,
      timestamp: "6 saat önce",
    },
    {
      userName: "Emre Aydın",
      comment:
        "Bence bu konuda daha fazla örnek eklenmeli, biraz daha açıklayıcı olabilir.",
      likes: 3,
      dislikes: 1,
      timestamp: "1 gün önce",
    },
    {
      userName: "Zeynep Yıldız",
      comment:
        "Kendi deneyimlerimi paylaşmak istiyorum, daha önce benzer bir şey yaşadım.",
      likes: 4,
      dislikes: 0,
      timestamp: "1 gün önce",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        userName: "Misafir Kullanıcı",
        comment: newComment,
        likes: 0,
        dislikes: 0,
        timestamp: "Şimdi",
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  const handleLike = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1;
    setComments(updatedComments);
  };

  const handleDislike = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].dislikes += 1;
    setComments(updatedComments);
  };

  const sortedComments = [...comments].sort(
    (a, b) => b.likes + b.dislikes - (a.likes + a.dislikes)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Forum Tartışması
          </h1>
          <p className="text-gray-600">
            Düşüncelerinizi paylaşın ve toplulukla etkileşime geçin
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Comment Form */}
            <div className="comment-card mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Yorum Yap
              </h2>
              <div className="relative">
                <textarea
                  className="w-full p-4 border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all duration-200"
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Düşüncelerinizi buraya yazın..."
                />
                <button
                  onClick={handleCommentSubmit}
                  className="btn-primary absolute bottom-4 right-4"
                >
                  <Send className="w-4 h-4" />
                  Gönder
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="comment-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar w-10 h-10">
                        {comment.userName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {comment.userName}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {comment.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {comment.comment}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(index)}
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span>{comment.likes}</span>
                    </button>
                    <button
                      onClick={() => handleDislike(index)}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                    >
                      <ThumbsDown className="w-5 h-5" />
                      <span>{comment.dislikes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="comment-card sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Popüler Yorumlar
              </h2>
              <div className="space-y-4">
                {sortedComments.slice(0, 3).map((comment, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="avatar w-8 h-8 text-sm">
                        {comment.userName.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">
                        {comment.userName}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      {comment.comment}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" /> {comment.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsDown className="w-4 h-4" /> {comment.dislikes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPages;
