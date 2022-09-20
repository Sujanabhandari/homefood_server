const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// var validator = require('validator');

const gameSchema = new Schema({
  name: { type: String, minLength: 2,  maxLength: 255 },
  winner_name: { type: String, minLength: 2,  maxLength: 255 },
  looser_name: { type: String, minLength: 2,  maxLength: 255 },
  game_points : { type: Number},

});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
