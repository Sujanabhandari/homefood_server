var express = require('express');

var usersRouter = express.Router();

const {
  create_login_user
} = require("../controllers/user_input");

const upload = require("../middlewares/image_storage");
const {
    authorizeAdmin
  } = require("../middlewares/authorizeAdmin");

const {registerUser, loginUser, getUser} = require("../controllers/auth");

usersRouter.post('/signup', registerUser);
usersRouter.post('/signin', loginUser);
usersRouter.get('/me', authorizeAdmin, getUser);

usersRouter.route("/signup").post(upload.single('profilePic'),registerUser);


module.exports = usersRouter;
