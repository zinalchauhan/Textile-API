var mongoose = require("mongoose");

takaSchema = mongoose.Schema({
  serialNumber: {
    type: String,
  },
  takaNumber: {
    type: String,
  },
  beamNumber: {
    type: String,
  },
  noOfSarees: {
    type: String,
  },
  takaMeter: {
    type: String,
  },
  takaWeight: {
    type: String,
  },
  takaQuality: {
    type: String,
  },
  processor_mill: {
    type: String,
  },
  company_mill: {
    type: String,
  },
  processor_butta: {
    type: String,
  },
  company_butta: {
    type: String,
  },
  processor_border: {
    type: String,
  },
  company_border: {
    type: String,
  },
  defect: {
    type: String,
  },
  takaRemark: {
    type: String,
  },
  takaStatus: {
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
    type: String,
  },
  batchIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "batch",
  },
  fresh: {
    type: String,
  },
  second: {
    type: String,
  },
  cl: {
    type: String,
  },
});

module.exports = mongoose.model("taka", takaSchema);
