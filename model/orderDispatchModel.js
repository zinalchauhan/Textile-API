var mongoose = require("mongoose");

orderDispatchSchema = mongoose.Schema({
  orderItemIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderItems",
  },
  orderItemsDispatched: {
    type: String,
  },
  orderQuantity: {
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
});

module.exports = mongoose.model("orderDispatch", orderDispatchSchema);
