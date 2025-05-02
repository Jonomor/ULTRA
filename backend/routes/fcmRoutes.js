const express = require('express');
const router = express.Router();
const fcmController = require('../controllers/fcmController');

router.post('/fcm-token', fcmController.registerToken);
router.post('/fcm-send', fcmController.sendNotification);

module.exports = router;
