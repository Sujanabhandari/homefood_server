

const Rating = require("../models/Ratings");
const User = require("../models/Users");

const create_new_ratings = async (req, res, next) => {

  try {

    const data = {
      rating: req.body.rating,
      creatorId: req.body.creatorId,
      customerId: req.body.customerId,
    }
  
    const newRating = await Rating.create(data);


    const [{avgRate}]= await Rating.aggregate([{
      //filters the doccuments.
      $match: { creatorId: newRating.creatorId }
    }, {
      $group: {
        _id: null,
        avgRate: {
          $avg: "$rating"
        }
      }
    }
    ])


   const updatedUser= await User.findByIdAndUpdate(req.body.creatorId, {
    averageRating:avgRate,
      $push: {
        ratings: newRating._id,
      },
    });
    console.log(newRating._id)
    console.log(updatedUser);
    
    res.status(201).send(newRating);
  } catch (err) {
    console.log(err);
    next(err);
  }
};


module.exports = {
  create_new_ratings,
};
