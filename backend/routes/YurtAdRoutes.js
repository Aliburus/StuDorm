const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createYurtAd,
  getAllYurtAdsWithPhotos,
} = require("../controllers/YurtAdController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/yurt-ilan", upload.array("photos"), createYurtAd);

// Tüm yurt ilanlarını ve fotoğraflarını almak için route
router.get("/yurt-ilanlar", getAllYurtAdsWithPhotos);

module.exports = router;
