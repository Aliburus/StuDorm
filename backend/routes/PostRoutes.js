const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const postController = require("../controllers/PostController");
const getAllPosts = require("../controllers/PostController");

// Yeni post oluştur
router.post("/", authenticateToken, postController.createPost);
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await ForumPost.getPostByUserId(userId);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});
// Like işlemi
router.put("/:id/like", authenticateToken, postController.likePost);

// Dislike işlemi
router.put("/:id/dislike", authenticateToken, postController.dislikePost);
router.get("/", postController.getAllPosts); // Route to get all posts
module.exports = router;
