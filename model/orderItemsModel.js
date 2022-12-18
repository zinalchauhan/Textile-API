var mongoose = require("mongoose");

orderItemsSchema = mongoose.Schema({
  orderItemsDispatched: {
    type: String,
  },
  orderItemsToDeliver: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdDateTime: {
    type: String,
  },
  modifiedDateTime: {
    type: String,
  },
  addOn: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  orderIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
  orderQuantity: {
    type: String,
  },
  orderRate: {
    type: String,
  },
  designIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "design",
  },
});

module.exports = mongoose.model("orderItems", orderItemsSchema);
