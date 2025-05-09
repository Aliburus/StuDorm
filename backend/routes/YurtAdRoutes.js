const express = require("express");
const multer = require("multer");
const path = require("path");
const verifyToken = require("../middleware/authenticateToken");
const {
  createYurtAd,
  getAllYurtAdsWithPhotos,
  getYurtAdsByUserId,
  getYurtAdById,
} = require("../controllers/YurtAdController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

const router = express.Router();

// Yalnızca oturumlu kullanıcı ilan ekleyebilir
router.post("/yurt-ilan", verifyToken, upload.array("photos"), createYurtAd);

// Diğer rotalar
router.get("/yurt-ilanlar/user/:userId", getYurtAdsByUserId);
router.get("/yurt-ilanlar", getAllYurtAdsWithPhotos);
router.get("/yurt-ilanlar/:id", getYurtAdById);

module.exports = router;
