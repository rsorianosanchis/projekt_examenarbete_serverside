const Task = require('../models/Task');
const Project = require('../models/Project');

//Skapa ett ny task
exports.createTask = async (req, resp) => {
  try {
    //extract project och check från req properties
    const project = await Project.findById(req.body.project);
    if (!project) {
      resp.status(500).send({ msg: 'Project not found' });
    }
    //kontroll user vs porjectowner
    if (project.owner.toString() !== req.user.id) {
      resp.status(401).send({ msg: 'Init session again' });
    }
    //create tarea
    const task = new Task(req.body);
    await task.save();
    //
    resp.json({ task });
    //
  } catch (error) {
    console.error(error);
    resp.status(500).send('There is an error');
  }
};
//
//get tasks by project id
exports.getTasks = async (req, resp) => {
  try {
    //extract project och check från req properties
    const project = await Project.findById(req.body.project);
    if (!project) {
      resp.status(500).send({ msg: 'Project not found' });
    }
    //kontroll user vs porjectowner
    if (project.owner.toString() !== req.user.id) {
      resp.status(401).send({ msg: 'Init session again' });
    }
    //
    const tasks = await Task.find(req.body.project);
    resp.json(tasks);
  } catch (error) {
    console.error(error);
    resp.status(500).send('There is an error');
  }
};
