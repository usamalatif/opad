const admin_controller = require("../controllers/adminController");
const express = require("express");
const router = express.Router();
const auth = require("../config/auth");
const {
  addVesting,
  updateVesting,
  toggleVesting,
} = require("../controllers/claimController");
router.post("/register", admin_controller.adminSignup);
router.post("/login", admin_controller.login);
router.post("/verify", auth, admin_controller.verifyTwoFactor);
router.get("/generate-qr", auth, admin_controller.generateTwoFactor);
router.get("/disable-2fa", auth, admin_controller.disableTwoFA);
router.post("/connect-wallet", auth, admin_controller.connectWallet);
router.post("/add-vesting", addVesting);
router.post("/update-vesting-date", auth, updateVesting);
router.post("/toggle-vesting", auth, toggleVesting);
router.post("/logout", admin_controller.logout);
router.post("/add-data", admin_controller.addData);
router.post("/update-data", auth, admin_controller.updateData);
router.post("/update-password", auth, admin_controller.updatePassword);
router.post("/add-addresses", auth, admin_controller.addAddresses);
router.get("/get-addresses", admin_controller.getAudit);
router.post("/create-date", auth, admin_controller.addOrUpdateDate);
router.get("/countdown", admin_controller.getDate);
router.post("/start-text", auth, admin_controller.startText);
module.exports = router;
