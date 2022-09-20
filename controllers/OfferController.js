const Offer = require("../models/Offers");

const create_new_offer = async(req, res, next) => {

  const { title, description, quantity, image, price, timeSlot, specials } = req.body;

  try {
    const { title, description,quantity, image, price, timeSlot, specials } = req.body;
    const newOffer = await Offer.create({ title, description,quantity, image, price,timeSlot, specials });
    res.status(201).send(newOffer);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = {
  create_new_offer
};
