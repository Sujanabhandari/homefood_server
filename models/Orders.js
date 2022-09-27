const {Schema, model} = require("mongoose");

const orderSchema = new Schema({
  order_quantity: {type:Number},
  offerId: { type: Schema.ObjectId, ref: "Offer" },
  customerId: { type: Schema.Types.ObjectId, ref: "User" },
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
});

const Order = model("Order", orderSchema);

module.exports = Order;