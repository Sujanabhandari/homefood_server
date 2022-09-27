var express = require('express');

var ratingRouter = express.Router();



const {
    authorizeAdmin
  } = require("../middlewares/authorizeAdmin");

const { create_new_ratings} = require("../controllers/RatingController");


ratingRouter.route("/").post(create_new_ratings);

// usersRouter.get('/users', get_all_users);
// usersRouter.get('/users/:id', retrieve_all_users_id);
module.exports = ratingRouter;
