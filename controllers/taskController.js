const Task = require('../models/Task');
const Project = require('../models/Project');

//Skapa ett ny task
exports.createTask = async (req, resp) => {
  try {
    //extract project och check från req properties
    const project = await Project.findById(req.body.project);
    if (!project) {
      resp.status(404).send({ msg: 'Project not found' });
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
    const { project } = req.body;
    const projectDB = await Project.findById(project);
    if (!projectDB) {
      return resp.status(404).send({ msg: 'Project not found' });
    }
    //kontroll user vs porjectowner
    if (projectDB.owner.toString() !== req.user.id) {
      return resp.status(401).send({ msg: 'Init session again' });
    }
    //
    const tasks = await Task.find({ project }); //find({}) med detta sintaxis.
    resp.json({ tasks });
  } catch (error) {
    console.error(error);
    resp.status(500).send('There is an error');
  }
};
//
//PUt task name eller state
exports.updateTask = async (req, resp) => {
  try {
    //extract task inkomande properties.
    const { project, name, state } = req.body;
    //
    let task = await Task.findById(req.params.id); //params url
    if (!task) {
      return resp.status(404).json({ msg: 'Task not exists' });
    }
    ////kontroll user vs porjectowner
    const projectDB = await Project.findById(project);
    if (projectDB.owner.toString() !== req.user.id) {
      return resp.status(401).send({ msg: 'Init session again' });
    }
    //Nu skapar vi ett object med ny info
    const nyTask = {};
    if (name) {
      nyTask.name = name;
    }
    if (state) {
      nyTask.state = state;
    }
    //save task
    task = await Task.findOneAndUpdate({ _id: req.params.id }, nyTask, {
      new: true
    });
    resp.json({ task });
  } catch (error) {
    console.error(error);
    resp.status(500).send('There is an error');
  }
};
