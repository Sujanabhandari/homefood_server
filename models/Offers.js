const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const offerSchema = new Schema({
  title: { type: String, unique: true, minLength: 2, maxLength: 255 },
  description: { type: String, required: true },
  specials: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  timeSlot: { type: String, required: true },
  //ID of logged in user.
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" }
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
