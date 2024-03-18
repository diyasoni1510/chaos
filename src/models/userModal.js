import mongoose from "mongoose";
import { boolean, date } from "yup";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  name: String,
  bio: String,
  followers: Array,
  following: Array,
  pic: String,
  deleted : {
    type:Boolean,
    default:false
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
