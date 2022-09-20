const User = require("../models/User");
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
    body: { user_name, password, email },
  } = req;

  const found = await User.findOne({ email });
  if (found) res.send("Erro Occurs");
  const hash = await bcrypt.hash(password, 5);
  // const { _id } = await User.create ({ user_name, password: hash, email});
  // const token = jwt.sign({ _id }, process.env.SECRET_KEY);
  // res.json({ token });
  const createdUser = await User.create({ user_name, password: hash, email });

  const token = createdUser.generateToken();
 //set token
 res.set("token",token).status(201).json(
 {
  _id:createdUser._id,
  user_name: createdUser.user_name,
  password: createdUser.password,
  email:createdUser.email,
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
  if (!found) res.send("User not exist");

  const match = await bcrypt.compare(password, found.password);
  if (!match) res.send("Password is incorrect", 400);

  const token = jwt.sign({ _id: found._id }, process.env.SECRET_KEY);
  res.json({ token });
};

const authenticate_self = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Missing Fields");
    }

    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(401).send("No user is registered");
    }
    const isPasswordSame = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordSame) {
      return res.status(401).send("Wrong credentials");
    }
    const token = foundUser.generateToken();
    res.set("token", token).status(200).send("Login was successfull");
  } catch (err) {
    console.log(err);
    next();
  }
};

const getUser = async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) throw new ErrorResponse(`User doesn't exist`, 404);
  res.json(user);
};

module.exports = { authenticate_self, registerUser, loginUser, getUser };
