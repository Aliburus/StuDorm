// routes/adminRoutes.js
const express = require("express");
const {
  getUsers,
  getAllListings,
  getOverviewStats,
  deleteListing,
  updateListingDetails,
  getAllPosts,
  deleteUser,
  changePassword,
  updateUserType,
  getPremiumRevenueByMonth,
  getPremiumRevenueByCity,
  getListingStatsByCity,
  getUserAndListingTrendsByMonth,
  getUserLogs,
} = require("../controllers/adminController");

const authenticateAdmin = require("../middleware/authenticateAdmin");
const router = express.Router();

// Premium gelir endpointleri
router.get(
  "/premium-revenue-by-month",
  authenticateAdmin,
  getPremiumRevenueByMonth
);
router.get(
  "/premium-revenue-by-city",
  authenticateAdmin,
  getPremiumRevenueByCity
);
router.get("/listing-stats-by-city", authenticateAdmin, getListingStatsByCity);

// Diğer endpointler
router.put("/users/:id/update-type", authenticateAdmin, updateUserType);
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
router.get("/posts", authenticateAdmin, getAllPosts);
router.delete("/users/:id", authenticateAdmin, deleteUser);
router.get(
  "/user-listing-trends-by-month",
  authenticateAdmin,
  getUserAndListingTrendsByMonth
);
router.get("/user-logs", authenticateAdmin, getUserLogs);
router.delete(
  "/posts/:id",
  authenticateAdmin,
  require("../controllers/adminController").deleteForumPost
);

router.delete(
  "/forum/posts/:postId/comments/:commentId",
  authenticateAdmin,
  require("../controllers/adminController").deleteForumComment
);

module.exports = router;
