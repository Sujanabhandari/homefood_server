
const Order = require("../models/Orders");
const User = require("../models/Users");


const create_new_Order = async (req, res, next) => {

  console.log("Offer Information", req.body)

  try {
    const {customerId , creatorId, offerId,order_quantity } = req.body;

    //Getting array from Frontend needs to be parsed
    console.log(req.body);

    const data = {
        offerId: req.body.offerId,
        creatorId: req.body.creatorId,
        customerId: req.user._id,
        order_quantity: req.body.order_quantity
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
  console.log("Hello")
    const condition = req.query;
    try {
      const allOrder = await Order.find(condition)
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

  const retrieve_order_by_id = async (req, res, next) => {
    console.log("Retrieve Orders by Id")
    const { id } = req.params;
   
    try {
      const foundOrder = await Order.findById(id); 
      // .populate({ {
      //   path: "creatorId",
      //   select: ["userName", "email", "profilePic"],
      // }})
  
      if (!foundOrder)
        return res.status(404).send(`The Order with _id ${id} does not exist`);
  
      return res.status(200).send(foundOrder);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

module.exports = {
  create_new_Order,
  get_all_order,
  retrieve_order_by_id
};
