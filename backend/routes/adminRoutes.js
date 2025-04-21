// routes/adminRoutes.js
const express = require("express");
const {
  getUsers,
  getAllListings,
  getOverviewStats,
  deleteListing,
  updateListingDetails,
} = require("../controllers/adminController");
const router = express.Router();
router.get("/overview-stats", getOverviewStats); // ✅ yeni rota
router.get("/users", getUsers); // Kullanıcıları çekmek için rota
router.get("/listings", getAllListings);
router.delete("/listings/:source/:id", deleteListing);

router.put("/listings/:source/:id/details", updateListingDetails);
module.exports = router; // Modül olarak dışa aktar
