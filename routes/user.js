//routes att skapa users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a user
// endpoint  => backend/users
//nota: como esta declarada en index.js då, aqui ponemos solo /
// router.post('/', () => {
//   console.log('testing creando usuario enpoint');
// });

router.post('/', userController.createUser);

module.exports = router;
