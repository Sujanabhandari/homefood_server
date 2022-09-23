var express = require('express');

var usersRouter = express.Router();

const upload = require("../middlewares/s3ImageUpload");

const {
    authorizeAdmin
  } = require("../middlewares/authorizeAdmin");

const {registerUser, loginUser, getUser, get_all_users, authenticate_self, retrieve_all_users_id} = require("../controllers/auth");

usersRouter.post('/signin', loginUser);
usersRouter.get('/me', authorizeAdmin, getUser);

usersRouter.route("/signup").post(upload.single('profilePic'),registerUser);

usersRouter.get('/users', get_all_users);
usersRouter.get('/users/:id', retrieve_all_users_id);
module.exports = usersRouter;
