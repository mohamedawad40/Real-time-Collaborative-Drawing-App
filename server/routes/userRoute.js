const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

router.route('/signup').post(register);

module.exports = router;