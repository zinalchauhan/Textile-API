var mongoose = require("mongoose");

orderSchema = mongoose.Schema({
  orderRemark: {
    type: String,
  },
  orderChallanNo: {
    type: String,
  },
  orderDate: {
    type: String,
  },
  orderStatus: {
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
  partyIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "party",
  },
  partyAgentName: {
    type: String,
  },
  partyTransport: {
    type: String,
  },
  partyGST: {
    type: String,
  },
});

module.exports = mongoose.model("order", orderSchema);
