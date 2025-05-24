const ForumPost = require("../models/ForumPosts"); // ForumPost modelini içe aktarıyoruz

// Post oluşturma
const createPost = async (req, res) => {
  const { content } = req.body;
  const user_id = req.user.id;
  if (!content) {
    return res.status(400).json({ message: "İçerik boş olamaz!" });
  }
  try {
    const newPostId = await ForumPost.create({ user_id, content });
    const newPost = await ForumPost.getById(newPostId);
    return res
      .status(201)
      .json({ message: "Post başarıyla oluşturuldu", post: newPost });
  } catch (error) {
    console.error("createPost Hata:", error);
    return res
      .status(500)
      .json({ message: "Post oluşturulurken bir hata oluştu." });
  }
};
// Like işlemi
const toggleLike = async (req, res) => {
  const postId = req.params.id;
  const { action } = req.body; // 'like' veya 'unlike'

  try {
    if (action === "like") {
      // Eğer like atılıyorsa: dislikes'ı -1, likes'ı +1
      await ForumPost.updateDislikes(postId, -1);
      await ForumPost.updateLikes(postId, 1);
      return res.json({ message: "Beğenildi." });
    } else {
      // unlike
      await ForumPost.updateLikes(postId, -1);
      return res.json({ message: "Beğeni geri alındı." });
    }
  } catch (error) {
    console.error("toggleLike Hata:", error);
    return res
      .status(500)
      .json({ message: "Like işlemi sırasında hata oluştu." });
  }
};

// Dislike işlemi
const toggleDislike = async (req, res) => {
  const postId = req.params.id;
  const { action } = req.body; // 'dislike' veya 'undislike'

  try {
    if (action === "dislike") {
      // Eğer dislike atılıyorsa: likes'ı -1, dislikes'ı +1
      await ForumPost.updateLikes(postId, -1);
      await ForumPost.updateDislikes(postId, 1);
      return res.json({ message: "Dislike yapıldı." });
    } else {
      // undislike
      await ForumPost.updateDislikes(postId, -1);
      return res.json({ message: "Dislike geri alındı." });
    }
  } catch (error) {
    console.error("toggleDislike Hata:", error);
    return res
      .status(500)
      .json({ message: "Dislike işlemi sırasında hata oluştu." });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await ForumPost.getAll(); // Kullanıcı adı ve soyadı ile postları alıyoruz
    res.status(200).json(posts); // Posts arrayini döndürüyoruz
  } catch (err) {
    console.error("Posts alınırken hata:", err);
    res.status(500).json({ message: "Posts getirilemedi." });
  }
};
const getPostByUserId = async (req, res) => {
  const user_id = req.user?.id; // Middleware ile gelen user_id
  if (!user_id) {
    return res
      .status(401)
      .json({ message: "Unauthorized - User ID not found" });
  }

  console.log("User ID:", user_id); // Kullanıcı ID'sini logluyoruz

  try {
    // Kullanıcıya ait tüm postları alıyoruz
    const posts = await ForumPost.getPostByUserId(user_id);

    // Artık boş bile olsa 200 + [] dönüyoruz
    return res.status(200).json(posts || []);
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({ message: "Posts could not be retrieved." });
  }
};
// Post silme
const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  try {
    const post = await ForumPost.getById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post bulunamadı!" });
    }
    const isAdmin = req.user?.user_type === "admin";
    // Sadece admin veya post sahibi silebilsin
    if (!isAdmin && String(post.user_id) !== String(userId)) {
      return res
        .status(403)
        .json({ message: "Bu postu silmeye yetkiniz yok!" });
    }
    const result = await ForumPost.delete(postId, isAdmin ? userId : null);
    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Post silinemedi." });
    }
    return res.status(200).json({ message: "Post başarıyla silindi." });
  } catch (err) {
    console.error("Post silinirken hata:", err);
    return res.status(500).json({ message: "Bir hata oluştu." });
  }
};
// Post güncelleme
const updatePost = async (req, res) => {
  const { content } = req.body; // Yeni içerik
  const postId = req.params.id; // Güncellenecek post ID'si
  const userId = req.user.id; // JWT'den alınan user ID

  if (!content) {
    return res.status(400).json({ message: "İçerik boş olamaz!" });
  }

  try {
    // Postu veritabanından alıyoruz
    const post = await ForumPost.getById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post bulunamadı!" });
    }

    // Postu sadece sahip olan kişi güncelleyebilir
    if (post.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "Bu postu güncellemeye yetkiniz yok!" });
    }

    // Postu güncelleme
    const updated = await ForumPost.updateContent(postId, content);
    if (updated === 0) {
      return res.status(500).json({ message: "Post güncellenemedi." });
    }

    // Güncellenmiş postu döndür
    const updatedPost = await ForumPost.getById(postId);

    return res
      .status(200)
      .json({ message: "Post başarıyla güncellendi", post: updatedPost });
  } catch (err) {
    console.error("Post güncellenirken hata:", err);
    return res.status(500).json({ message: "Bir hata oluştu." });
  }
};
const getTopPosts = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  try {
    // Burayı düzeltin:
    const posts = await ForumPost.getTopPosts(limit); // Burada getTop yerine getTopPosts kullanılıyor
    return res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching top posts:", err);
    return res.status(500).json({ message: "Could not fetch top posts." });
  }
};

// Yorum ekle
const addComment = async (req, res) => {
  const { post_id, comment } = req.body;
  const user_id = req.user.id;
  if (!comment || !post_id) {
    return res.status(400).json({ message: "Yorum ve post_id zorunlu!" });
  }
  try {
    const commentId = await ForumPost.addComment({ post_id, user_id, comment });
    return res.status(201).json({ message: "Yorum eklendi", commentId });
  } catch (error) {
    console.error("Yorum eklenirken hata:", error);
    return res.status(500).json({ message: "Yorum eklenemedi." });
  }
};

// Posta ait yorumları getir
const getCommentsByPostId = async (req, res) => {
  const post_id = req.params.postId;
  try {
    const comments = await ForumPost.getCommentsByPostId(post_id);
    return res.status(200).json(comments);
  } catch (error) {
    console.error("Yorumlar alınırken hata:", error);
    return res.status(500).json({ message: "Yorumlar alınamadı." });
  }
};

const getUserComments = async (req, res) => {
  const user_id = req.user.id;
  try {
    const comments = await ForumPost.getUserComments(user_id);
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Admin yorum silme
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;
    const isAdmin = req.user?.user_type === "admin";
    // Yorumu bul
    const [rows] = await require("../config/db").query(
      "SELECT * FROM forum_comments WHERE id = ?",
      [commentId]
    );
    const comment = rows[0];
    console.log("DEBUG deleteComment:", {
      userId,
      commentUserId: comment?.user_id,
      isAdmin,
      comment,
    });
    if (!comment) {
      return res.status(404).json({ message: "Yorum bulunamadı!" });
    }
    // Sadece admin veya yorum sahibi silebilsin
    if (!isAdmin && String(comment.user_id) !== String(userId)) {
      return res
        .status(403)
        .json({
          message: "Bu yorumu silmeye yetkiniz yok!",
          userId,
          commentUserId: comment.user_id,
          isAdmin,
        });
    }
    await ForumPost.deleteComment(commentId, isAdmin ? userId : null);
    res.status(200).json({ message: "Yorum silindi" });
  } catch (err) {
    res.status(500).json({ message: "Yorum silinemedi", error: err.message });
  }
};

module.exports = {
  createPost,
  toggleLike,
  toggleDislike,
  getAllPosts,
  getPostByUserId,
  deletePost,
  updatePost,
  getTopPosts,
  addComment,
  getCommentsByPostId,
  getUserComments,
  deleteComment,
};
