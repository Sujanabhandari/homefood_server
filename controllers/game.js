const game = require("../models/pokemonGame");

const display_game_result = async (req, res, next) => {
   
      try {
        return res.status(200).send("Sujana said for now");
      } catch (err) {
        console.log(err);
        next(err);
      }
    };
const display_leaderboard = async (req, res, next) => {
   
        try {
          return res.status(200).send("Sujana said for now");
        } catch (err) {
          console.log(err);
          next(err);
        }
      };    

module.exports = { display_game_result, display_leaderboard };    