var express = require('express');
const multer  = require('multer');

var offerRouter = express.Router();

const {
    create_new_offer, get_all_offer, retrieve_offer_by_id, retrieve_offer_by_category, remove_offer_by_id
} = require("../controllers/OfferController");

const {
  create_new_Order, get_all_order, update_all_quantity
} = require("../controllers/FoodOrder");


const {
    authorizeAdmin
  } = require("../middlewares/authorizeAdmin");

const upload = require("../middlewares/s3ImageUpload");

offerRouter.route("/").get(get_all_offer).put(update_all_quantity);

offerRouter.post('/create', authorizeAdmin,upload.single('image'), create_new_offer);

offerRouter.route("/:id").get(retrieve_offer_by_id);

offerRouter.route("/delete/:id").delete(authorizeAdmin, remove_offer_by_id);
offerRouter.post('/:id/order', authorizeAdmin, create_new_Order);



module.exports = offerRouter;

