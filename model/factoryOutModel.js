var mongoose = require("mongoose");

factoryOutSchema = mongoose.Schema({
  factoryOutSerialNo: {
    type: String,
  },
  receiverName: {
    type: String,
  },
  receiverAddress: {
    type: String,
  },
  factoryOutDate: {
    type: String,
  },
  factoryOutTime: {
    type: String,
  },
  factoryOutWeight: {
    type: String,
  },
  factoryOutNumOfPiece: {
    type: String,
  },
  factoryName: {
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
  companyIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
  },
  companyName: {
    type: String,
  },
  companyAddress: {
    type: String,
  },
});

module.exports = mongoose.model("factoryout", factoryOutSchema);
