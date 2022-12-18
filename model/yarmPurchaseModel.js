var mongoose = require("mongoose");

yarmPurchaseSchema = mongoose.Schema({
  challanNumber: {
    type: String,
  },
  purchaseGrade: {
    type: String,
  },
  purchasePieceBox: {
    type: String,
  },
  purchaselotNumber: {
    type: String,
  },
  purchaseQuality: {
    type: String,
  },
  purchaseColor: {
    type: String,
  },
  purchaseDate: {
    type: String,
  },
  purchaseYarnFrom: {
    type: String,
  },
  purchaseNetWeight: {
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
  companyIDFK: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
  },
  companyName: {
    type: String,
  },
});

module.exports = mongoose.model("yarmpurchase", yarmPurchaseSchema);
