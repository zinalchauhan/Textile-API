var mongoose = require("mongoose");

partySchema = mongoose.Schema({
  partyName: {
    type: String,
  },
  partyContactNo: {
    type: String,
  },
  partyPlace: {
    type: String,
  },
  partyOwner: {
    type: String,
  },
  partyAgentName: {
    type: String,
  },
  agentContact: {
    type: String,
  },
  partyGST: {
    type: String,
  },
  partyTransport: {
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
  cityIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
  },
  cityName: {
    type: String,
  },
});

module.exports = mongoose.model("party", partySchema);
