const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const postController = require("../controllers/PostController");

router.post("/", authenticateToken, postController.createPost);
router.get("/", postController.getAllPosts);
// Inside PostRoutes.js
router.get("/user", authenticateToken, postController.getPostByUserId);
router.delete("/:id", authenticateToken, postController.deletePost);
router.put("/:id", authenticateToken, postController.updatePost);
router.put("/:id/like", authenticateToken, postController.likePost);
router.put("/:id/dislike", authenticateToken, postController.dislikePost);
// Post güncelleme

module.exports = router;
