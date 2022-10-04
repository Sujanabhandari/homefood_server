var express = require('express');
var usersRouter = express.Router();
const upload = require("../middlewares/s3ImageUpload");
const {
    authorizeAdmin
  } = require("../middlewares/authorizeAdmin");
const {registerUser, loginUser, getUser} = require("../controllers/auth");
usersRouter.post('/signin', loginUser);
usersRouter.get('/me', authorizeAdmin, getUser);
usersRouter.route("/signup").post(upload.single('profilePic'),registerUser);
module.exports = usersRouter;
