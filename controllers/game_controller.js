const Game = require("../models/Game");

// const { body, validationResult } = require("express-validator");

const get_result_of_game = async (req, res, next) => {
  //  console.log(jsonData);
  try {
    return res.status(200).send("Pokemon1 won");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const get_leaderboard_info = async (req, res, next) => {
  //  console.log(jsonData);
  try {
    return res.status(200).send("This is a leaderboard Information");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const get_previous_information = async (req, res, next) => {
  //  console.log(jsonData);
  try {
    return res.status(200).send("This is a previous leaderboard Information");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = {
  get_result_of_game,
  get_leaderboard_info,
  get_previous_information
};
