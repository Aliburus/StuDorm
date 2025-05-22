// routes/ContactRoutes.js
const express = require("express");
const router = express.Router();
const {
  createContactMessage,
  getUserMessages,
  getAllContactMessages,
} = require("../controllers/ContactController");

const authenticateToken = require("../middleware/authenticateToken");
const authenticateAdmin = require("../middleware/authenticateAdmin");

router.post("/message", createContactMessage);
router.get("/messages/user", authenticateToken, getUserMessages);
router.get("/all", authenticateAdmin, getAllContactMessages);

module.exports = router;
