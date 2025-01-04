const express = require("express");
const router = express.Router();
const parttimeAdvertController = require("../controllers/PartTimeAdvertController");

router.post("/", parttimeAdvertController.createAdvert);

module.exports = router;
