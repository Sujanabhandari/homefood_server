const User = require("../models/Users");
const Rating = require("../models/Ratings");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res, next) => {

  const {
    body: { userName, email, profilePic, password, date },
  } = req;

  const found = await User.findOne({ email });
  if (found) res.send("Erro Occurs");

  const hash = await bcrypt.hash(password, 5);

  const createdUser = new User({
    userName,
    password: hash,
    email,
    date: date,
    profilePic: req.file.location
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

  const found = await User.findOne({ email }).select("+password");
  if (!found) res.status(404).send("User not exist");

  const match = await bcrypt.compare(password, found.password);
  if (!match) return res.status(400).send("Password is incorrect", 400);

  const token = found.generateToken();

  return res.set("token", token).status(200).send("Login was successful");
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

  const creatorInfo = await User.find(req.user);
  console.log("Creator Id", creatorInfo);

  const avgRating = await Rating.aggregate([{
    $group: {
      _id: null,
      avgRate: {
        $avg: "$rating"
      }
    }
  }
  ])

  console.log("Average Rating", avgRating);



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
