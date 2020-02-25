const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

// create project ---backend/project
router.post('/', auth, projectController.createProject);
// get all projects from db--- backend/project
router.get('/', auth, projectController.getProjects);
// PUT en project via id
router.put('/:id', auth, projectController.updateProject);
//DELETE PROJECT
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
