const Project = require('../models/Project');
//
exports.createProject = async (req, resp) => {
  try {
    //create a new project
    const project = new Project(req.body); //solo tarera el name
    project.owner = req.user.id; //asiganamos el id de usuario que hemos anadido en middleware auth,para poder saber quiesn es el usuario/owner del proyecto
    await project.save(); //guardamos en db
    resp.json(project); // rspondemos con el objeto entero creado con formato mongodb
  } catch (error) {
    console.error(error);
    resp.status(500).send('There is an error');
  }
};

//get alla project av nuvarande user
exports.getProjects = async (req, resp) => {
  try {
    console.log(req.user);
    const projects = await Project.find({ owner: req.user.id }).sort({
      created: -1
    }); //con el sort invertimos el orden de la fecha de creacion
    resp.json({ projects });
  } catch (error) {
    console.error(error);
    resp.status(500).send('There is an error');
  }
};

//update PUT en project med id
exports.updateProject = async (req, resp) => {
  const { name } = req.body;
  const newNameProject = {};
  if (name) {
    newNameProject.name = name;
  }

  try {
    //get project id
    console.log(req.params.id);
    let project = await Project.findById(req.params.id); //sök project i dDB

    if (!project) {
      resp.status(500).send({ msg: 'Project not found' });
    }

    //jämnföra owner project vs nuvarande user
    console.log('AAA', typeof project.owner);
    console.log('BBB', typeof req.user.id);
    console.log('CCC', typeof project.owner.toString());
    console.log(project.owner.toString(), req.user.id);

    if (project.owner.toString() !== req.user.id) {
      resp.status(401).send({ msg: 'Init session again' });
    }
    //update
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newNameProject },
      { new: true }
    );
    resp.json({ project });
  } catch (error) {
    console.error(error);
    resp.status(500).send('There is an error');
  }
};

//delete project by id
exports.deleteProject = async (req, resp) => {
  const { name } = req.body;
  const newNameProject = {};
  if (name) {
    newNameProject.name = name;
  }
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      resp.status(500).send({ msg: 'Project not found' });
    }
    if (project.owner.toString() !== req.user.id) {
      resp.status(401).send({
        msg:
          'Problems with your identity vs project-owners identity.Init session again.'
      });
    }
    project = await Project.findOneAndRemove({ _id: req.params.id });
    resp.json({ msg: 'project deleted' });
  } catch (error) {
    console.error(error);
    resp.status(500).send('There is an error');
  }
};
