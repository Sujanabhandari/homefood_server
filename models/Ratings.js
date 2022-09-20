const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// var validator = require('validator');

const ratingSchema = new Schema({
  rating:{ type: Number},
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  customerId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Rating = mongoose.model("Game", ratingSchema);

module.exports = Rating;
