const express = require("express");
const router = express.Router();
const {
  getCommentsWithUserAndReactions,
} = require("../controllers/ForumControllers");

router.get("/comments", getCommentsWithUserAndReactions);

module.exports = router;
