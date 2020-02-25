const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

//create task
router.post('/', auth, taskController.createTask);
//get tasks by project
router.get('/', auth, taskController.getTasks);
//update name eller state
router.get('/:id', auth, taskController.updateTask);
//delete task

module.exports = router;
