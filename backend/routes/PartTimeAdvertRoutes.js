const express = require("express");
const router = express.Router();
const parttimeAdvertController = require("../controllers/PartTimeAdvertController");

router.post("/", parttimeAdvertController.createAdvert);
router.get("/", parttimeAdvertController.getAllAdverts);
router.get("/:id", parttimeAdvertController.getAdvertById);
router.delete("/:id", parttimeAdvertController.deleteAdvertById);
router.get("/user/:userId", parttimeAdvertController.getAdvertsByUserId);
module.exports = router;
