const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

//create task
router.post('/', auth, taskController.createTask);
//get tasks by project
router.get('/', auth, taskController.getTasks);
//
router.module.exports = router;
