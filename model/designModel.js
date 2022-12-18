var mongoose = require("mongoose");

designSchema = mongoose.Schema({
  designNo: {
    type: String,
  },
  saleNum: {
    type: String,
  },
  designQuality: {
    type: String,
  },
  designDes: {
    type: String,
  },
  designType: {
    type: String,
  },
  designer: {
    type: String,
  },
  designHook: {
    type: String,
  },
  designSheddingPattern: {
    type: String,
  },
  designTotalPick: {
    type: String,
  },
  designReed: {
    type: String,
  },
  designPickInch: {
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
  machineIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "machine",
  },
  machineType: {
    type: String,
  },
});

module.exports = mongoose.model("design", designSchema);
