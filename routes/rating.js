var express = require('express');

var ratingRouter = express.Router();

const {
    authorizeAdmin
  } = require("../middlewares/authorizeAdmin");

const { create_new_ratings} = require("../controllers/RatingController");
ratingRouter.route("/").post(create_new_ratings);
module.exports = ratingRouter;
