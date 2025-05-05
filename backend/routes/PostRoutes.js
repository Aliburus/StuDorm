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
router.put("/:id/like", authenticateToken, forumController.likePost);
router.put("/:id/dislike", authenticateToken, forumController.dislikePost);

// **Yeni eklenen**: Top N postu dönen endpoint
router.get("/top", forumController.getTopPosts);

module.exports = router;
