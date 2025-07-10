const express = require('express');
const { createRoom, joinRoom } = require('../controllers/roomController');
const { protectRoute } = require('../controllers/authController');
const router = express.Router();

router.route('/').post(protectRoute, createRoom);
router.route('/:roomId').post(protectRoute, joinRoom);


module.exports = router;