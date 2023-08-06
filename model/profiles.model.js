const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: Number,
  image: String,
  selection: {
    type: Boolean,
    default: false,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required: true,
  },
});

module.exports = mongoose.model("ProfileSchema", ProfileSchema);
