//importamos el modelo  para poder cargar automaticamente
//los datos jason que vienen del usuario y casan en cuanto a campos con el modelo

const User = require('../models/User');

// crear sync la hacemos asyncrona para poder poner el await y no hacer nada hasta
//que se consiga crear el usuario

exports.createUser = async (req, res) => {
  // req es lo que el usuario envia y body el contenido
  console.log(req.body);
  try {
    let user;
    // creamos nuevo usuario
    user = new User(req.body);
    //guardamos en DB
    await user.save();

    // enviamos response a usuario de exito
    res.send('User has been created');
  } catch (error) {
    console.error(error);
    res.status(400).send('det fanns ett error');
  }
};
