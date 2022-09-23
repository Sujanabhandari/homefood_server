const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userInfoSchema = new Schema({
  title: { type: String, minLength: 2, maxLength: 255 },
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);


module.exports = UserInfo;
