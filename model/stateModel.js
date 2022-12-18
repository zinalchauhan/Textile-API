var mongoose = require("mongoose");

stateSchema = mongoose.Schema({
  stateName: {
    type: String,
  },
  addOn: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model("state", stateSchema);
