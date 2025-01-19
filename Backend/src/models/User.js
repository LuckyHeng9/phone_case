const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,  // Ensures email is unique
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    address: {
      type: String,
      required: true,
    },
    profile_picture_path: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
