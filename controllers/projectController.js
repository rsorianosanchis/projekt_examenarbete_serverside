const Project = require('../models/Project');
//
exports.createProject = async (req, resp) => {
  try {
    //create a new project
    const project = new Project(req.body); //solo tarera el name
    project.owner = req.user.id; //asiganamos el id de usuario que hemos anadido en middleware auth,para poder saber quiesn es el usuario/owner del proyecto
    project.save(); //guardamos en db
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
    //update
  } catch (error) {
    console.error(error);
    resp.status(500).send('There is an error');
  }
};
