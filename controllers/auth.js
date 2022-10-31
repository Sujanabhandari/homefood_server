const User = require("../models/Users");
const Rating = require("../models/Ratings");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getAmazonS3Url = require("./utils");


const registerUser = async (req, res, next) => {
  console.log("Hello from sujana");
  const {
    body: { userName, email, profilePic, password, date },
  } = req;

  const found = await User.findOne({ email });
  if (found) return res.status(400).send("Error Occurs");

  const hash = await bcrypt.hash(password, 5);
  console.log(req.file);
  console.log(getAmazonS3Url(req.file.location, req.file.key));
  const createdUser = new User({
    userName,
    password: hash,
    email,
    date: date,
    profilePic: getAmazonS3Url(req.file.location, req.file.key)
  });

  await createdUser.save();
  const token = createdUser.generateToken();

  return res.set("token", token).status(201).json(
    {
      _id: createdUser._id,
      userName: createdUser.userName,
      password: createdUser.password,
      email: createdUser.email,
      profilePic: createdUser.profilePic
    })
};

const loginUser = async (req, res, next) => {

  const {
    body: { email, password },
  } = req;

  try {
    const found = await User.findOne({ email }).select("+password");
    if (!found) res.status(404).send("User not exist");

    const match = await bcrypt.compare(password, found.password);
    if (!match) res.status(400).send("Password is incorrect");

    const token = found.generateToken();

    return res.set("token", token).status(200).send("Login was successful");

  }
  catch (err) {
    console.log("showing errors", err);
    return res.status(500).send("Login is failed");
  }

  // const found = await User.findOne({ email }).select("+password");
  // if (!found) res.status(404).send("User not exist");

  // const match = await bcrypt.compare(password, found.password);
  // if (!match) res.status(400).send("Password is incorrect");

  // const token = found.generateToken();

  // return res.set("token", token).status(200).send("Login was successful");
};

const authenticate_self = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).send("Missing Fields");
    }

    const foundUser = await User.findOne({ userName });

    if (!foundUser) {
      return res.status(401).send("No user is registered");
    }
    const isPasswordSame = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordSame) {
      return res.status(401).send("Wrong credentials");
    }
    const token = foundUser.generateToken();
    return res.set("token", token).status(200).send("Login was successfull");

  } catch (err) {
    console.log(err);
    next();
  }
};

const getUser = async (req, res, next) => {

  const user = await User.findById(req.user._id).
    populate(
      {
        path: "offers",
        select: ["title", "description", "specials", "quantity", "image", "price", "timeSlot", "reserved_quantity", "categories"],
      },
    )
    .populate({
      path: "ratings",
      select: ["rating"],
    },)

  if (!user) return res.status(404).send(`User doesn't exist`, 404);
  return res.status(200).json(user);
};


module.exports = { authenticate_self, registerUser, loginUser, getUser };
