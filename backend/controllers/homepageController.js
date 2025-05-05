// backend/controllers/homepageController.js
const PremiumAdsModel = require("../models/PremiumAdsModel");

const getHomepagePremiumListings = async (req, res) => {
  try {
    const listings = await PremiumAdsModel.getRandomPremiumUserAds();
    res.json({ success: true, data: listings });
  } catch (err) {
    console.error("Premium listings error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getHomepagePremiumListings };
