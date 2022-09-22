
const User = require("../models/User");
const bcrypt = require("bcrypt");

const create_new_user = async(req, res, next) => {

    const { userName, password, email, profilePic } = req.body;
    if(!userName || !password || !email ){
        return res.status(400).send("Please Provide all the fields")
    }
    try{
        const userExists = await User.findOne({$or: [{email},{userName}]})

        if(userExists){
            return res.status(400).send("userName and/or email are already being used")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const registeredUser = await User.create({
            userName, email, password:hashedPassword, profilePic
        });

        const token = registeredUser.generateToken();
        console.log(token)
        res.set("token", token).status(201).json({message: "successfully created new admin", registeredUser:{
            userName: registeredUser.userName,
            _id: registeredUser._id,
            email: registeredUser.email,
            profilePic: registeredUser.profilePic
        }})

    }catch(err){
        console.log(err);
        next(err);
    }
};

const get_all_users = async (req, res, next) => {
    //  console.log(jsonData);
    try {
      return res.status(200).send("Pokemon1 won");
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  const update_field_of_self = async (req, res, next) => {
    //  console.log(jsonData);
    const me = req.user;
    const condition = req.body;

    try {
        const updatedUser = await User.findById(me._id, condition, {new:true});
        // if(!updatedUser){}
      return res.status(200).json({message: "Successfully updated user"});
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

module.exports = { create_new_user, get_all_users,update_field_of_self };