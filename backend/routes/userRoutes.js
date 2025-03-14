// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const {
  getUserProfile,
  updateUserProfile,
  upgradeToPremium,
} = require("../controllers/userController");

// Kullanıcı profilini al (Token doğrulama ile)
router.get("/profile", authenticateToken, getUserProfile);

// Kullanıcı profilini güncelle (Token doğrulama ile)
router.put("/profile", authenticateToken, updateUserProfile);

// Ödeme işlemi başarılıysa kullanıcıyı premium yap
router.post("/upgrade-to-premium", authenticateToken, upgradeToPremium);

module.exports = router;
