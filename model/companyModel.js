var mongoose = require("mongoose");

companySchema = mongoose.Schema({
  companyName: {
    type: String,
  },
  companyPrefix: {
    type: String,
  },
  companyAddress: {
    type: String,
  },
  companyEmail: {
    type: String,
  },
  companyDes: {
    type: String,
  },
  companyCreatedBy: {
    type: String,
  },
  craetedDateTime: {
    type: String,
  },
  modifiedDateTime: {
    type: String,
  },
  companyStatus: {
    type: String,
  },
  addOn: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model("company", companySchema);
