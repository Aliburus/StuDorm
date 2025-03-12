const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const { getUserProfile } = require("../controllers/userController");
const { updateUserProfile } = require("../controllers/userController");

// Kullanıcı profilini al (Token doğrulama ile)
router.get("/profile", authenticateToken, getUserProfile);
router.put("/profile", authenticateToken, updateUserProfile);
module.exports = router;
