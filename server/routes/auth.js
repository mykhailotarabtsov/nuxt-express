const express = require('express');
const authController = require('../controllers/auth.js');
const router = express.Router();

router.post('/login', authController.postLogin)

router.post('/postSignup', authController.postLogout)

module.exports = router;
