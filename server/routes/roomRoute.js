const express = require('express');
const { createRoom, joinRoom, getRoomById, getAllPublicRooms } = require('../controllers/roomController');
const { protectRoute } = require('../controllers/authController');
const router = express.Router();

router.route('/').post(protectRoute, protectRoute, createRoom);
router.route('/:roomId/join').post(protectRoute, joinRoom);
router.route('/public').get(protectRoute, getAllPublicRooms);
router.route('/:id').get(protectRoute, getRoomById);


module.exports = router;