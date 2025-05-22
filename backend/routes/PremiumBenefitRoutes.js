const express = require("express");
const router = express.Router();
const PremiumBenefitController = require("../controllers/PremiumBenefitController");
const authenticateAdmin = require("../middleware/authenticateAdmin");

// Public routes
router.get("/", PremiumBenefitController.getAllBenefits);
router.get("/:id", PremiumBenefitController.getBenefitById);

// Admin routes
router.post("/", authenticateAdmin, PremiumBenefitController.createBenefit);
router.put("/:id", authenticateAdmin, PremiumBenefitController.updateBenefit);
router.delete(
  "/:id",
  authenticateAdmin,
  PremiumBenefitController.deleteBenefit
);

module.exports = router;
