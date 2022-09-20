const {Schema, model} = require("mongoose");

const orderSchema = new Schema({
  offerId: { type: Schema.Types.ObjectId, ref: "Offers" },
  customerId: { type: Schema.Types.ObjectId, ref: "User" },
  creatorId: { type: Schema.Types.ObjectId, ref: "User" }
});

const Order = model("Oder", orderSchema);

module.exports = Order;