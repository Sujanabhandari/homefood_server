const {Schema, model} = require("mongoose");

const orderSchema = new Schema({
  offerId: { type: Schema.ObjectId, ref: "Offer" },
  customerId: { type: Schema.ObjectId, ref: "User" },
  creatorId: { type: Schema.ObjectId, ref: "User" }
});

const Order = model("Oder", orderSchema);

module.exports = Order;