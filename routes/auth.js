//routes att auth users
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// skapa en användare 'user'

router.post('/', authController.controlUser);

module.exports = router;
