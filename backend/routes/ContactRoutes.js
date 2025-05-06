// routes/ContactRoutes.js
const express = require("express");
const router = express.Router();
const {
  createContactMessage,
  getAllMessages,
} = require("../controllers/ContactController");

// Mesaj gönderme (POST) - Authenticated users only
router.post("/message", createContactMessage);

// Admin için mesajları listeleme (GET)
router.get("/messages", getAllMessages); // Mesajları listeleme işlemi (GET)

module.exports = router;
