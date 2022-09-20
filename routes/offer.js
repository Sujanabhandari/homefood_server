var express = require('express');

var offerRouter = express.Router();

const {
    create_new_offer
} = require("../controllers/OfferController");

offerRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// offerRouter.route("/").post(create_new_offer);
offerRouter.route("/").post(create_new_offer);

module.exports = offerRouter;

