const express = require("express");
const router = express.Router();
const { processPayment } = require("../controllers/PaymentControllers");

// POST -> /api/payments
router.post("/payments", processPayment);

module.exports = router;
