import mongoose from "mongoose";

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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      type: String,
      default: null,
    },
    profile_picture_path: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
