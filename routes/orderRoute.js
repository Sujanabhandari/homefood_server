var express = require('express');
var orderRouter = express.Router();
const {
  get_all_order, retrieve_order_by_id
} = require("../controllers/FoodOrder");
const {
    authorizeAdmin
  } = require("../middlewares/authorizeAdmin");

orderRouter.route("/").get(get_all_order);
orderRouter.route("/:id").get(retrieve_order_by_id);


module.exports = orderRouter;

