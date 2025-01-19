import mongoose from "mongoose";
import userModel from "./user";

export type PostModelType = {
  title: string;
  body: string;
  user: mongoose.Types.ObjectId;
  likes: number;
  status: string;
};

const schema = new mongoose.Schema<PostModelType>({
  title: {
    type: String,
    required: false,
    default: "",
  },
  body: {
    type: String,
    required: false,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: true,
  },
});

const postModel = mongoose.models.Post || mongoose.model("Post", schema);
export default postModel;
