const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// var validator = require('validator');


const userSchema = new Schema({
  userName: { type: String, unique: true, minLength: 2, maxLength: 255 },
  password: {  type: String, required: [true, 'Password is required']},
  email: { type: String, required: true },
  profilePic: { type: String},
  date: { type: Date, default: Date.now },
  ratingIds: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
  //Reference Should be offers or users?
  // role: {type:String, enum:['creator_id', 'customer', 'guest']},
  offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  // _customerOrderIds: [{ type: Schema.Types.ObjectId, ref: "Order" }]
});

userSchema.methods.generateToken = function () {
  const payload = {
    _id: this._id,
    userName: this.userName,
    email: this.email,
    profilePic: this.profilePic,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  console.log(token);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
