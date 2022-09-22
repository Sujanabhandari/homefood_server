
const Offer = require("../models/Offers");

//Get secure url from our server
//post the image directly to the s3 bucket


const create_new_offer = async(req, res, next) => {

  console.log("Here",req.body);
  console.log("Here",req.file);
  try {
    const { title, description,quantity, image,address, price, timeSlot, specials, categories } = req.body;
    console.log(req.body);
    
    //Getting array from Frontend needs to be parsed
    const newOffer = await Offer.create({ title, description,quantity,address, image:req.file.location, price,timeSlot, specials:JSON.parse(specials), categories });
    res.status(201).send(newOffer);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const get_all_offer = async (req, res, next) => {
  const condition = req.query;
  try {
    const allOffers= await Offer.find(condition);
    if (!allOffers.length)
      return res
        .status(400)
        .send(
          "The collection you are trying to query does not contain any documents"
        );
    return res.status(200).send(allOffers);
    
  } catch (err) {
    console.log(err);

    next(err);
  }
};

const retrieve_offer_by_id = async (req, res, next) => {
  const { id } = req.params;
  try {
    //findOne({_id:id})
    const foundOffer = await Offer.findById(id);

    if (!foundOffer)
      return res.status(404).send(`The Offer with _id ${id} does not exist`);

    return res.status(200).send(foundOffer);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  create_new_offer,
  retrieve_offer_by_id,
  get_all_offer
};
