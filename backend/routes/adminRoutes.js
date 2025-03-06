const express = require("express");
const router = express.Router();
const { getUsersWithPartTimeAds } = require("../controllers/adminController");
const { getUsersWithYurtAds } = require("../controllers/adminController");

router.get("/yurtads", getUsersWithYurtAds);

router.get("/parttimeads", getUsersWithPartTimeAds);

module.exports = router;
