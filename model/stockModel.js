var mongoose = require("mongoose");

stockschema = mongoose.Schema({
  fresh: {
    type: String,
  },
  second: {
    type: String,
  },
  cl: {
    type: String,
  },
  foldingDone: {
    type: String,
  },
  returned: {
    type: String,
  },
  total: {
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
});

module.exports = mongoose.model("stock", stockschema);
