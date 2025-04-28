// routes/InternRoutes.js
const express = require("express");
const router = express.Router();
const InternController = require("../controllers/InternController");

// Get all interns
router.get("/", InternController.getAllInterns);

// Get an intern by ID
router.get("/:id", InternController.getInternById);

// Create a new intern
router.post("/", InternController.createIntern);

// Update an existing intern
router.put("/:id", InternController.updateIntern);

// Delete an intern
router.delete("/:id", InternController.deleteIntern);
router.get("/user/:userId", InternController.getInternsByUserId);
module.exports = router;
