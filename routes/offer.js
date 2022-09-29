var express = require('express');
const multer  = require('multer');

var offerRouter = express.Router();

const {
    create_new_offer, get_all_offer, retrieve_offer_by_id, add_creator_to_offer, retrieve_offer_by_category
} = require("../controllers/OfferController");


const {
  create_new_Order, get_all_order, update_all_quantity
} = require("../controllers/FoodOrder");

// const upload = require("../middlewares/image_storage");

const {
    authorizeAdmin
  } = require("../middlewares/authorizeAdmin");

const upload = require("../middlewares/s3ImageUpload");

offerRouter.route("/").get(get_all_offer).put(update_all_quantity);

offerRouter.post('/create', authorizeAdmin,upload.single('image'), create_new_offer);

offerRouter.route("/:id").get(retrieve_offer_by_id);

// offerRouter.route("/category_name").get(retrieve_offer_by_category);


//for Reserve the Food Order
offerRouter.post('/:id/order', authorizeAdmin, create_new_Order);



module.exports = offerRouter;

