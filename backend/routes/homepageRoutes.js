// backend/routes/homepageRoutes.js
const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepageController");

router.get("/premium-listings", homepageController.getHomepagePremiumListings);

module.exports = router;
