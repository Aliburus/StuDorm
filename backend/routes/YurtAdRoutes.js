const express = require("express");
const multer = require("multer");
const path = require("path");
const verifyToken = require("../middleware/authenticateToken");
const {
  createYurtAd,
  getAllYurtAdsWithPhotos,
  getYurtAdsByUserId,
  getYurtAdById,
  updateYurtAd,
  deleteYurtAd,
} = require("../controllers/YurtAdController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

const router = express.Router();

// Yalnızca oturumlu kullanıcı ilan ekleyebilir
router.post(
  "/yurt-ilan",
  verifyToken,
  upload.array("photos", 15), // en fazla 15 dosya
  createYurtAd
);

// Diğer rotalar
router.get("/yurt-ilanlar/user/:userId", getYurtAdsByUserId);
router.get("/yurt-ilanlar", getAllYurtAdsWithPhotos);
router.get("/yurt-ilanlar/:id", getYurtAdById);
router.put(
  "/yurt-ilanlar/:id",
  verifyToken,
  upload.array("photos", 15),
  updateYurtAd
);
router.delete("/yurt-ilanlar/:id", verifyToken, deleteYurtAd);

module.exports = router;
