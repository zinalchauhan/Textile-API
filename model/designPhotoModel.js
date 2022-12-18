var mongoose = require("mongoose");
designPhSchema = mongoose.Schema({
  pathImage: {
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

module.exports = mongoose.model("designPhoto", designPhSchema);
