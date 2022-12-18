var mongoose = require("mongoose");

defectSchema = mongoose.Schema({
  defectName: {
    type: String,
  },
  addOn: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

//========== Defect API ==========

module.exports = mongoose.model("defect", defectSchema);
