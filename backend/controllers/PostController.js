const ForumPost = require("../models/ForumPosts");

// Post oluşturma
const createPost = async (req, res) => {
  const { content } = req.body;
  const user_id = req.user.id;

  if (!content) {
    return res.status(400).json({ message: "İçerik boş olamaz!" });
  }

  try {
    const newPostId = await ForumPost.create({
      user_id,
      content,
      likes: 0, // Varsayılan değer
      dislikes: 0, // Varsayılan değer
    });

    // Yeni postu veritabanına ekledikten sonra, eklenen postun detaylarını döndürelim
    const newPost = await ForumPost.getById(newPostId);

    return res
      .status(201)
      .json({ message: "Post başarıyla oluşturuldu", post: newPost });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Post oluşturulurken bir hata oluştu." });
  }
};
// Like işlemi
const likePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const updated = await ForumPost.updateLikes(postId);
    if (updated === 0) {
      return res.status(404).json({ message: "Post bulunamadı!" });
    }

    res.status(200).json({ message: "Like verildi!" });
  } catch (err) {
    console.error("Like verirken hata:", err);
    res.status(500).json({ message: "Bir hata oluştu." });
  }
};

// Dislike işlemi
const dislikePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const updated = await ForumPost.updateDislikes(postId);
    if (updated === 0) {
      return res.status(404).json({ message: "Post bulunamadı!" });
    }

    res.status(200).json({ message: "Dislike verildi!" });
  } catch (err) {
    console.error("Dislike verirken hata:", err);
    res.status(500).json({ message: "Bir hata oluştu." });
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

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user." });
    }

    console.log("Posts fetched:", posts); // Fetch edilen postları logluyoruz

    return res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({ message: "Posts could not be retrieved." });
  }
};
// Post silme
const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id; // JWT'den alınan user ID

  try {
    // Postu veritabanından silmeden önce, postun sahibi olup olmadığını kontrol edelim
    const post = await ForumPost.getById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post bulunamadı!" });
    }

    if (post.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "Bu postu silmeye yetkiniz yok!" });
    }

    // Postu silme işlemi
    const result = await ForumPost.delete(postId);
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

module.exports = {
  createPost,
  likePost,
  dislikePost,
  getAllPosts,
  getPostByUserId,
  deletePost,
  updatePost,
};
