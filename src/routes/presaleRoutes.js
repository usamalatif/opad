// routes/presaleRoutes.js
const express = require('express');
const presaleController = require('../controllers/presaleController');
const router = express.Router();
const auth = require('../config/auth');

router.get('/view', presaleController.getAllCodes);
router.post('/add', auth, presaleController.addCode);
router.put('/update/:id', auth, presaleController.updateCode);
router.delete('/delete/:id', auth, presaleController.deleteCode);
router.patch('/:code/increment', presaleController.incrementEntries);
module.exports = router;