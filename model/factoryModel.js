var mongoose = require("mongoose");

factorySchema = mongoose.Schema({
  factoryName: {
    type: String,
  },
  factoryPrefix: {
    type: String,
  },
  factoryAddress: {
    type: String,
  },
  factoryEmail: {
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
  factoryStatus: {
    type: String,
  },
  factoryDes: {
    type: String,
  },
  addOn: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  cityIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
  },
  cityName: {
    type: String,
  },
});

module.exports = mongoose.model("factory", factorySchema);
