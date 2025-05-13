// routes/adminRoutes.js
const express = require("express");
const {
  getUsers,
  getAllListings,
  getOverviewStats,
  deleteListing,
  updateListingDetails,
  getReportedContent,
  getAllPosts,
  deleteUser,
  changePassword,
} = require("../controllers/adminController");

const authenticateAdmin = require("../middleware/authenticateAdmin");
const router = express.Router();

const { updateUserType } = require("../controllers/adminController");

router.put("/users/:id/update-type", authenticateAdmin, updateUserType); // Yeni endpoint
router.get("/overview-stats", authenticateAdmin, getOverviewStats);
router.get("/users", authenticateAdmin, getUsers);
router.get("/listings", authenticateAdmin, getAllListings);
router.delete("/listings/:source/:id", authenticateAdmin, deleteListing);

router.put(
  "/listings/:source/:id/details",
  authenticateAdmin,
  updateListingDetails
);
router.put("/change-password", authenticateAdmin, changePassword);
router.get("/reported-content", authenticateAdmin, getReportedContent);
router.get("/posts", authenticateAdmin, getAllPosts);
router.delete("/users/:id", authenticateAdmin, deleteUser);

module.exports = router;
