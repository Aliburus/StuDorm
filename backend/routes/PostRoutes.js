const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const forumController = require("../controllers/PostController");

// Mevcut rotaların
router.post("/", authenticateToken, forumController.createPost);
router.get("/", forumController.getAllPosts);
router.get("/user", authenticateToken, forumController.getPostByUserId);
router.delete("/:id", authenticateToken, forumController.deletePost);
router.put("/:id", authenticateToken, forumController.updatePost);
router.put("/:id/like", authenticateToken, forumController.toggleLike);
router.put("/:id/dislike", authenticateToken, forumController.toggleDislike);

// **Yeni eklenen**: Top N postu dönen endpoint
router.get("/top", forumController.getTopPosts);

// Yorum ekle
router.post("/:postId/comments", authenticateToken, forumController.addComment);
// Posta ait yorumları getir
router.get("/:postId/comments", forumController.getCommentsByPostId);

// Yorum silme (admin)
router.delete(
  "/:postId/comments/:commentId",
  authenticateToken,
  forumController.deleteComment
);

module.exports = router;
