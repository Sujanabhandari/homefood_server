const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// var validator = require('validator');

const ratingSchema = new Schema({
  rating:{ type: Number, default:0},
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  customerId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
