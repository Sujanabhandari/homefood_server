const User = require("../models/Users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CLient(Browser) 
// 1. POST/user/log { email, password} 

//Server
// 1. Create JWT For User With Secret and Send JWT to browser

// CLient(Browser) 
// 2. Send Request With JWT

//Server
// 1. Verify JWT Signature and Get User From JWT and Send Response

//Importance of JWT 


const registerUser = async (req, res, next) => {
  /*  
    Validate the input => maybe use a middleware with Joi [x]
    Check if user already exists => User.find(by email) [x]
      if exists say no => throw ErrorResponse [x]
      if no exists create 
        Hash (and salt) the password [x] https://www.npmjs.com/package/bcrypt?activeTab=readme
        Create user [x]
        Create token jsonwebtoken https://www.npmjs.com/package/jsonwebtoken [x]
        Send token => res.json() res.set() res.cookie() [x]
  */
  const {
    body: { userName, email, profilePic, password },
  } = req;

  const found = await User.findOne({ email });
  if (found) res.send("Erro Occurs");
  const hash = await bcrypt.hash(password, 5);

  const createdUser = await User.create({ userName, password: hash, email, profilePic });

  const token = createdUser.generateToken();
 //set token
 res.set("token",token).status(201).json(
 {
  _id:createdUser._id,
  userName: createdUser.userName,
  password: createdUser.password,
  email:createdUser.email,
  profilePic:createdUser.profilePic
})
};

const loginUser = async (req, res, next) => {
  /*  
    Validate the input => maybe use a middleware with Joi [x]
    Check if user already exists => User.find(by email) [x]
      if no exists say no => throw ErrorResponse [x]
      if exists 
        verify the password [x] https://www.npmjs.com/package/bcrypt?activeTab=readme
        if password not a match => throw ErrorResponse [x]
        if password match
          Create token jsonwebtoken https://www.npmjs.com/package/jsonwebtoken [x]
          Send token => res.json() res.set() res.cookie() [x]
  */
  const {
    body: { email, password },
  } = req;

  const found = await User.findOne({ email }).select("+password");
  if (!found) res.status(404).send("User not exist");

  const match = await bcrypt.compare(password, found.password);
  if (!match) return res.status(400).send("Password is incorrect", 400);

  const token = jwt.sign({ _id: found._id }, process.env.SECRET_KEY);
  console.log(token)
 return res.set("token",token).status(200).json({ token });
};

const authenticate_self = async (req, res, next) => {
  try {
    const {  userName, password } = req.body;

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
  console.log(req.user);
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send(`User doesn't exist`, 404);
  console.log(user);
  return res.status(200).json(req.user);
};

module.exports = { authenticate_self, registerUser, loginUser, getUser };
