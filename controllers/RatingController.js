

const Rating = require("../models/Ratings");
const User = require("../models/Users");

const create_new_ratings = async (req, res, next) => {

  try {

    const data = {
        rating: req.body.rating,
        creatorId: req.body.creatorId,
        customerId: req.body.customerId,
      }

    //Getting array from Frontend needs to be parsed
  
    console.log(data);

    const newRating = await Rating.create(data);

    // const creatorRating = await Rating.find({creatorId: req.body.creatorId});
    const avgRating = await Rating.aggregate([{
    //     $unwind: '$ratings'
    // },{
    //     $match: {
    //        "ratings.creatorId": req.body.creatorId
    //     }
    // },{
        $group: {
            _id: null,
            // rating: {$avg: '$rating'}
            avgRate: {
                $avg: "$rating"
            }
        }
    }
])

    console.log("Average Rating", avgRating);

    await User.findByIdAndUpdate(req.body.creatorId, {
        $push: {
            ratings: newRating._id,
          }, 
    });

    res.status(201).send(newRating);
  } catch (err) {
    console.log(err);
    next(err);
  }
};


module.exports = {
    create_new_ratings,
};
