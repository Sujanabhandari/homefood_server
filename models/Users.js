const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, unique: true, minLength: 2, maxLength: 255 },
  password: {  type: String, required: [true, 'Password is required']},
  email: { type: String,unique: true, required: true },
  profilePic: { type: String},
  date: { type: Date, default: Date.now },
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
  averageRating: {type:Number, default:0},
  offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

userSchema.methods.generateToken = function () {
  const payload = {
    _id: this._id,
    userName: this.userName,
    email: this.email,
    profilePic: this.profilePic,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
