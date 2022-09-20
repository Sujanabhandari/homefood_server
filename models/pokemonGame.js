const {Schema, model} = require("mongoose");

const pokemonSchema = new Schema({
  name: { type: String },
  winner_name: { type: String },
  loser_name: { type: String },
  game_point: { type: Number}
});

const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;