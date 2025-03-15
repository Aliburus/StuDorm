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
  const user_id = req.user.id; // Kullanıcı id'si authenticateToken middleware'den alınıyor

  try {
    const posts = await ForumPost.getPostByUserId(user_id); // Kullanıcı id'sine göre postları alıyoruz
    res.status(200).json(posts); // Kullanıcıya ait postları döndürüyoruz
  } catch (err) {
    console.error("Posts alınırken hata:", err);
    res.status(500).json({ message: "Posts getirilemedi." });
  }
};
module.exports = {
  createPost,
  likePost,
  dislikePost,
  getAllPosts,
  getPostByUserId,
};
