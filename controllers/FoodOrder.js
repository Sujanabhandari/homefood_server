
const Order = require("../models/Orders");
const User = require("../models/Users");



const create_new_Order = async (req, res, next) => {

  console.log("Offer Information", req.body)

  try {
    const {customerId , creatorId, offerId } = req.body;

    //Getting array from Frontend needs to be parsed
    const data = {
        offerId: req.body.offerId,
        creatorId: req.body.creatorId,
        customerId: req.user._id
    }
    console.log(data);
    const newOrder = await Order.create(data);

    res.status(201).send(newOrder);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const get_all_order = async (req, res, next) => {
    const condition = req.query;
    try {
      const allOrder = await Order.find()
      if (!allOrder.length)
        return res
          .status(400)
          .send(
            "The collection you are trying to query does not contain any documents"
          );
      return res.status(200).send(allOrder);
  
    } catch (err) {
      console.log(err);
  
      next(err);
    }
  };

// const get_all_order = async (req, res, next) => {
//     const condition = req.query;
//     try {
//       const allOrder = await Order.find().populate({ 
//         path: "offerId",
//         select: ["title", "quanitity", "creatorId"]
//       })
  
//       if (!allOrder.length)
//         return res
//           .status(400)
//           .send(
//             "The collection you are trying to query does not contain any documents"
//           );
//       return res.status(200).send(allOrder);
  
//     } catch (err) {
//       console.log(err);
  
//       next(err);
//     }
//   };

// const add_creator_to_Order = async (req, res, next) => {
//   const { id } = req.params;
//   const { creator_id } = req.body;

//   const updatedOrder = await Order.findByIdAndUpdate(
//     id,
//     {
//       user: creator_id,
//     },
//     { new: true }
//   ).populate("user");
//   res.status(200).send(updatedOrder);
// };

// const get_all_Order = async (req, res, next) => {
//   const condition = req.query;
//   try {
//     const allOrders = await Order.find(condition).populate({ 
//       path: "creatorId",
//       select: ["userName", "email", "profilePic"],
//     })

//     if (!allOrders.length)
//       return res
//         .status(400)
//         .send(
//           "The collection you are trying to query does not contain any documents"
//         );
//     return res.status(200).send(allOrders);

//   } catch (err) {
//     console.log(err);

//     next(err);
//   }
// };

// const retrieve_Order_by_id = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const foundOrder = await Order.findById(id).populate('creatorId'); 
//     // .populate({ {
//     //   path: "creatorId",
//     //   select: ["userName", "email", "profilePic"],
//     // }})

//     if (!foundOrder)
//       return res.status(404).send(`The Order with _id ${id} does not exist`);

//     return res.status(200).send(foundOrder);
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };

module.exports = {
  create_new_Order,
  get_all_order
//   get_all_Order,
//   add_creator_to_Order
};
