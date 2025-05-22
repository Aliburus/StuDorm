// routes/ContactRoutes.js
const express = require("express");
const router = express.Router();
const {
  createContactMessage,
  getUserMessages,
  getAllContactMessages,
  replyToContactMessage,
  getContactAnswerByMessageId,
} = require("../controllers/ContactController");

const authenticateToken = require("../middleware/authenticateToken");
const authenticateAdmin = require("../middleware/authenticateAdmin");

router.post("/message", createContactMessage);
router.get("/messages/user", authenticateToken, getUserMessages);
router.get("/all", authenticateAdmin, getAllContactMessages);
router.post("/reply", authenticateAdmin, replyToContactMessage);
router.get("/answer/:messageId", getContactAnswerByMessageId);

module.exports = router;
