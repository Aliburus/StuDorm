// routes/ContactRoutes.js
const express = require("express");
const router = express.Router();
const {
  createContactMessage,
  getAllMessages,
  getUserMessages,
} = require("../controllers/ContactController");

const authenticateToken = require("../middleware/authenticateToken");

router.post("/message", createContactMessage);

router.get("/messages", getAllMessages);
router.get("/messages/user", authenticateToken, getUserMessages);
module.exports = router;
