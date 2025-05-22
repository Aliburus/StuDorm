const express = require("express");
const router = express.Router();
const parttimeAdvertController = require("../controllers/PartTimeAdvertController");
const verifyToken = require("../middleware/authenticateToken");

router.post("/", verifyToken, parttimeAdvertController.createAdvert); // 🔒 Sadece oturumlu kullanıcı
router.get("/", parttimeAdvertController.getAllAdverts);
router.get("/:id", parttimeAdvertController.getAdvertById);
router.delete("/:id", verifyToken, parttimeAdvertController.deleteAdvertById);
router.get("/user/:userId", parttimeAdvertController.getAdvertsByUserId);
router.get("/:id", parttimeAdvertController.getAdvertById);
router.put("/:id", verifyToken, parttimeAdvertController.updateAdvertById);
module.exports = router;
