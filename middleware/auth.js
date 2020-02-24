//https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb/5656301-set-up-authentication-middleware

const jwt = require('jsonwebtoken');

module.exports = function(req, resp, next) {
  //läser token fråm header
  const token = req.header('testtoken');
  console.log(token);
  //check om det finns inte token

  //confirm token
};
