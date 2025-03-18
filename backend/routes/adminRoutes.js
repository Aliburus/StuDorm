// routes/adminRoutes.js
const express = require("express");
const { getUsers } = require("../controllers/adminController"); // `require` ile içe aktar
const router = express.Router();

router.get("/users", getUsers); // Kullanıcıları çekmek için rota

module.exports = router; // Modül olarak dışa aktar
