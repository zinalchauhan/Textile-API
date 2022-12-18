var mongoose = require("mongoose");

citySchema = mongoose.Schema({
  cityName: {
    type: String,
  },
  addOn: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  stateIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "state",
  },
  stateName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "state",
  },
});

module.exports = mongoose.model("city", citySchema);
