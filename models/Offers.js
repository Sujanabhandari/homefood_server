const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const offerSchema = new Schema({
  title: { type: String, unique: true, minLength: 2, maxLength: 255 },
  description: { type: String},
  specials: { type: String},
  quantity: { type: Number},
  image: { type: String},
  price: { type: Number},
  timeSlot: { type: String},
  //ID of logged in user.
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  categories: { type: String},
  // categoryId: { type: Schema.Types.ObjectId, ref: "Category" }
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
