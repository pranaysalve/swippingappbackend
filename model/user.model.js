const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  MobileNumber: {
    type: String,
    unique: true,
  },
  OTP: {
    type: String,
    default: "0000",
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("UserSchema", UserSchema);
