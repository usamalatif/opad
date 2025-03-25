
const presaleStage_controller = require('../controllers/presaleStageController')
const express = require("express");
const router = express.Router();
const auth = require('../config/auth')

router.post('/create', presaleStage_controller.createPresaleStage);
router.post('/toggle', auth, presaleStage_controller.activateStage);
router.post('/update', auth, presaleStage_controller.updateStage)
router.get('/view', auth, presaleStage_controller.getPresales)
module.exports = router;