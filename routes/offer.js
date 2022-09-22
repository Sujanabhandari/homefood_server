var express = require('express');
const multer  = require('multer');

var offerRouter = express.Router();

const {
    create_new_offer, get_all_offer, retrieve_offer_by_id
} = require("../controllers/OfferController");

// const upload = require("../middlewares/image_storage");


const upload = require("../middlewares/s3ImageUpload");

// offerRouter.route("/").post(create_new_offer);
offerRouter.route("/").get(get_all_offer).post(upload.single('image'),create_new_offer);
offerRouter.route("/:id").get(retrieve_offer_by_id);

module.exports = offerRouter;

