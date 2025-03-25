const express = require("express");
const toggleController = require("../controllers/toggleController");
const router = express.Router();
const auth = require("../config/auth");
// Get the current toggle state
router.get("/toggle/state", toggleController.getToggleState);

// Update the toggle state
router.put("/toggle/state", auth, toggleController.updateToggleState);

module.exports = router;
