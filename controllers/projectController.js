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
