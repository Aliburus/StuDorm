const express = require("express");
const { registerUser } = require("../controllers/AuthControllers");
const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
