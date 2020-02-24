//importamos el modelo  para poder cargar automaticamente
//los datos jason que vienen del usuario y casan en cuanto a campos con el modelo

const User = require('../models/User');
const bcryptsjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// crear sync la hacemos asyncrona para poder poner el await y no hacer nada hasta
//que se consiga crear el usuario

exports.createUser = async (req, res) => {
  // req es lo que el usuario envia y body el contenido
  console.log(req.body);
  //extract destructuring email och password for validation
  const { email, password } = req.body;
  try {
    //chequeamos si hay un mail que se llame igual en la base de datos
    //hacemos consulta con metodo findOne

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'This user´s email already exists' });
    }
    //
    console.log(user, 'antes');

    // creamos nuevo usuario
    user = new User(req.body); // aqui realmete al invocar la instancia User damos formato modelo mongo y nos agrega el id de mongo.mas el date que le pusimos
    //
    console.log(user, 'despues');

    //haschear password// con la variable salt haremos que la resultante de password encriptado sea diferente en caso de tener igual password de usuario

    const salt = await bcryptsjs.genSalt(10); //y luego reescribimos la propiedad password del objeto con el string que viene de password + el segundo parametro de salt para garantizar que sea un encriptacion unica.
    user.password = await bcryptsjs.hash(password, salt);
    //guardamos en DB
    await user.save();
    //creamos y firmamos jwt
    const payload = {
      user: { id: user.id }
    };
    console.log(payload);

    //signature
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 600 //10 MINUTER 600s
      },
      (error, token) => {
        if (error) throw error;
        // enviamos response a usuario de exito
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).send('det fanns ett error');
  }
};
