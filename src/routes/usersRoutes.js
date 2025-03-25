
const user_controller = require('../controllers/userController')
const express = require("express");
const router = express.Router();
const auth = require('../config/auth');
const { viewVesting } = require('../controllers/claimController');
const { viewData } = require('../controllers/adminController');
const cors = require('cors');
const corsOptions = {
    origin: ["https://optimuspresale.netlify.app/", "http://localhost:3000"]
};
router.post('/signup', cors(corsOptions), user_controller.userLogin)
router.get('/view-presales', user_controller.viewPresales);
router.get('/view-vestings', viewVesting);
router.get('/view-data', viewData);
router.get('/view-text', user_controller.viewText)
module.exports = router;