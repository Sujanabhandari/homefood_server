
const Offer = require("../models/Offers");

const create_new_offer = async (req, res, next) => {

  try {
    const { title, description, quantity, image, address, price, timeSlot, specials, creatorId, categories, date } = req.body;

    //Getting array from Frontend needs to be parsed
    const data = {
      title: title, description:description, quantity:quantity, address:address, image: req.file.location, price:price, timeSlot:timeSlot,
      specials: JSON.parse(specials), creatorId:req.user._id, categories:categories, date:date
    }
    const newOffer = await Offer.create(data);

    res.status(201).send(newOffer);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const add_creator_to_offer = async (req, res, next) => {
  const { id } = req.params;
  const { creator_id } = req.body;

  const updatedOffer = await Offer.findByIdAndUpdate(
    id,
    {
      user: creator_id,
    },
    { new: true }
  ).populate("user");
  res.status(200).send(updatedOffer);
};

const get_all_offer = async (req, res, next) => {
  const condition = req.query;
  try {
    const allOffers = await Offer.find(condition).populate({ 
      path: "creatorId",
      select: ["userName", "email", "profilePic", "averageRating", "date"],
    })

    if (!allOffers.length)
      return res
        .status(400)
        .send(
          "There are no dishes on this category."
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
    const foundOffer = await Offer.findById(id).populate('creatorId'); 

    if (!foundOffer)
      return res.status(404).send(`The Offer with _id ${id} does not exist`);

    return res.status(200).send(foundOffer);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const retrieve_offer_by_category = async (req, res, next) => {

  try {
    const foundCategory = await Offer.find({ categories: req.query.category_name }); 

    if (!foundCategory)
      return res.status(404).send(`The Offer with foundCategory ${foundCategory} does not exist`);

    return res.status(200).send(foundCategory);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const remove_offer_by_id = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundOffer = await Offer.findById(id); 
    const deleteOffer = await Offer.deleteOne(foundOffer._id); 
    return res.status(200).send(deleteOffer);
  } catch (err) {
    console.log(err);
    next(err);
  }
};


module.exports = {
  create_new_offer,
  retrieve_offer_by_id,
  get_all_offer,
  add_creator_to_offer,
  retrieve_offer_by_category,
  remove_offer_by_id
};
