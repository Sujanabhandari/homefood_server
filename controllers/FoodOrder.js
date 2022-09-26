
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

module.exports = {
  create_new_Order,
  get_all_order
};
