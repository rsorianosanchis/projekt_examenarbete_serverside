const User = require('../models/User');
const bcryptsjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.controlUser = async (req, resp) => {
  //extract email och password från request
  const { email, password } = req.body;
  try {
    //här ,kontrollerar man om det finns en registrerad användare med samma uppgifterna. Vi använder mongoose method.
    let user = await User.findOne({ email });
    if (!user) {
      return resp.status(400).json({ msg: 'User do not exists' });
    }
    // nu kontrollerar man om passsword är korrekt
    let passOk = await bcryptsjs.compare(password, user.password);
    if (!passOk) {
      return resp.status(400).json({ msg: 'Password is not correct' });
    }
    //if allt är korrekt ,skapar och signature man jwt
    const payload = {
      user: { id: user.id }
    };

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
        resp.json({ token: token });
      }
    );
  } catch (error) {
    console.error('från authController.js:', error);
  }
};
