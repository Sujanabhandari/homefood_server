var express = require('express');

var usersRouter = express.Router();

// const {
//   create_login_user
// } = require("../controllers/user_input");

usersRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// const {registerUser, loginUser, getUser} = require("../controllers/auth");

// usersRouter.post('/signup', registerUser);
// usersRouter.post('/signin', loginUser);
// usersRouter.get('/me', getUser);


module.exports = usersRouter;
