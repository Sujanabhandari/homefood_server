
const Offer = require("../models/Offers");

const UserInfo = require("../models/UserInfo");



const create_new_offer = async (req, res, next) => {

  console.log("jhkasdf",req.user);
  console.log(req.user._id)

  try {
    // const UserInfoData = await UserInfo.create({ "title": "Sujna", "creatorId": "632b0d8248873c979962ca2d" });
    // console.log(UserInfoData);

    const { title, description, quantity, image, address, price, timeSlot, specials, creatorId, categories } = req.body;

    //Getting array from Frontend needs to be parsed
    const data = {
      title: title, description:description, quantity:quantity, address:address, image: req.file.location, price:price, timeSlot:timeSlot,
      specials: JSON.parse(specials), creatorId:req.user._id, categories:categories
    }
    console.log(data);
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
    const allOffers = await Offer.find(condition);
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
  get_all_offer,
  add_creator_to_offer
};
