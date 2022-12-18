var mongoose = require("mongoose");

machineSchema = mongoose.Schema({
  machineNumber: {
    type: String,
  },
  machineType: {
    type: String,
  },
  machineDes: {
    type: String,
  },
  machineSheddingPattern: {
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
  factoryIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "factory",
  },
  factoryName: {
    type: String,
  },
  factoryPrefix: {
    type: String,
  },
});

module.exports = mongoose.model("machine", machineSchema);
