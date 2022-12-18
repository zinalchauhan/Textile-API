var mongoose = require("mongoose");

batchschema = mongoose.Schema({
  status: {
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
  designIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "design",
  },
  machineIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "machine",
  },
});

module.exports = mongoose.model("batch", batchschema);
