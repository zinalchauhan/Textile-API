var mongoose = require("mongoose");
const { stringify } = require("uuid");

userSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  userPassword: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userType: {
    type: String,
  },
  userStatus: {
    type: String,
  },
  userImage: {
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
    type: Date,
  },
  isActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model("user", userSchema);
