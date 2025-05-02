const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/state', adminController.getState);
router.post('/dispatch', adminController.toggleDispatch);
// Define other admin routes similarly

module.exports = router;
