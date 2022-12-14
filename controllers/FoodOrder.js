
const Order = require("../models/Orders");
const User = require("../models/Users");
const Offer = require("../models/Offers");
const { update } = require("../models/Orders");


const create_new_Order = async (req, res, next) => {

  try {
    const { customerId, creatorId, offerId, order_quantity } = req.body;

    //Getting array from Frontend needs to be parsed

    const data = {
      offerId: req.body.offerId,
      creatorId: req.body.creatorId,
      customerId: req.user._id,
      order_quantity: req.body.order_quantity,
    }
    const newOrder = await Order.create(data);

    const findQuanity = await Offer.findById(req.body.offerId);

    const updateQuanity = await Offer.findByIdAndUpdate(
      req.body.offerId,
      {
        quantity: findQuanity.quantity - req.body.order_quantity,
      },
      { new: true }
    )

    res.status(201).send(newOrder);

  } catch (err) {
    console.error(err);
    next(err);
  }
};


const get_all_order = async (req, res, next) => {
  const condition = req.query;
  try {
    const allOrder = await Order.find(condition).populate(
      {
        path: "offerId",

        select: ["quantity", "title", "price", "address", "timeSlot", "creatorId", "date", "image"],
      },
    ).populate({
      path: "customerId",
      select: ["userName", "profilePic", "date"],
    },)
      .populate({
        path: "creatorId",
        select: ["userName", "profilePic", "averageRating", "date"],
      },)

    if (!allOrder.length)
      return res
        .status(400)
        .send(
          "The collection you are trying to query does not contain any documents"
        );
    return res.status(200).send(allOrder);

  } catch (err) {
    console.error(err);
    next(err);
  }
};


const retrieve_order_by_id = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundOrder = await Order.findById(id);

    if (!foundOrder)
      return res.status(404).send(`The Order with _id ${id} does not exist`);

    return res.status(200).send(foundOrder);
  } catch (err) {
    console.error(err);
    next(err);
  }
};


const update_all_quantity = async (req, res, next) => {

  try {
    const updateQuanity = await Offer.findByIdAndUpdate(
      req.body.offerId,
      {
        quantity: quantity - req.body.order_quantity,
      },
      { new: true }
    )

    return res.status(200).send(updateQuanity);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  create_new_Order,
  get_all_order,
  retrieve_order_by_id,
  update_all_quantity
};
