//https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb/5656301-set-up-authentication-middleware

const jwt = require('jsonwebtoken');

module.exports = function(req, resp, next) {
  //läser token fråm header
  const token = req.header('kontrol-token');
  console.log(token);
  //check om det finns inte token

  if (!token) {
    //unauthorized
    resp.status(401).json({ msg: 'There is not token' });
  }
  //chek if token valid verify med vår secret ord
  try {
    const checkToken = jwt.verify(token, process.env.SECRET);
    //if token ok, añadimos al objeto req la propiiedad id que viene integrada en el token cuando se crea.
    req.user = checkToken.user; // user är payload som kommer i token. Det skapas när user skapade.userController.js
    next(); // kör till nästa middleware.
  } catch (error) {
    resp.status(401).json({ msg: 'Invalid token' });
  }

  //check om det finns inte token

  //confirm token
};
