var express = require('express');
const multer  = require('multer');

var offerRouter = express.Router();

const {
    create_new_offer
} = require("../controllers/OfferController");

const upload = require("../middlewares/image_storage");

offerRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// offerRouter.route("/").post(create_new_offer);
offerRouter.route("/").post(upload.single('image'), create_new_offer);

module.exports = offerRouter;

