var mongoose = require("mongoose");

particularSchema = mongoose.Schema({
  particular: {
    type: String,
  },
  particularQtyTaka: {
    type: String,
  },
  particularWeight: {
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
  factoryOutIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "factoryout",
  },
});

module.exports = mongoose.model("particular", particularSchema);
