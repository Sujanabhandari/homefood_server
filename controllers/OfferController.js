
const Offer = require("../models/Offers");


const create_new_offer = async(req, res, next) => {

  console.log("Here",req.body);
  console.log("Here",req.file);
  try {
    const { title, description,quantity, image, price, timeSlot, specials, categories } = req.body;
    console.log(req.body);
    
    const newOffer = await Offer.create({ title, description,quantity, image, price,timeSlot, specials, categories });
    res.status(201).send(newOffer);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  create_new_offer
};
