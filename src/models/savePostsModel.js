import mongoose from "mongoose";
import { date } from "yup";

const savePostSchema = new mongoose.Schema({
  userId: String,
  postId : String,
});

const Saved = mongoose.models.saved || mongoose.model("saved", savePostSchema);

export default Saved;
