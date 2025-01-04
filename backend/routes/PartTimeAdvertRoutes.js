const express = require("express");
const router = express.Router();
const parttimeAdvertController = require("../controllers/PartTimeAdvertController");

// Yeni part-time ilan oluştur
// `parttime-adverts` rotasını `/api/parttimeadverts` ile eşleştiriyoruz
router.post("/", parttimeAdvertController.createAdvert);

module.exports = router;
