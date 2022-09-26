const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const offerSchema = new Schema({
  title: { type: String, minLength: 2, maxLength: 255 },
  description: { type: String},
  specials: { type: Array},
  quantity: { type: Number},
  image: { type: String},
  price: { type: Number},
  address: { type: String},
  timeSlot: { type: String},
  reserved_quantity: { type: Number},
  date: { type: Date, default: Date.now },
  //ID of logged in user.
  creatorId: { type: Schema.ObjectId, ref:"User" },
  categories: { type: String},
  // categoryId: { type: Schema.Types.ObjectId, ref: "Category" }
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
