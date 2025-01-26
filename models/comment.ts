import mongoose from "mongoose";
import { PostModelType } from "./post";
import { postModel } from "./index";

export type CommentModelType = {
  avatar: string;
  name: string;
  body: string;
  post: mongoose.Types.ObjectId | PostModelType;
  createdAt: Date;
  status: "queued" | "accepted";
};

const schema = new mongoose.Schema<CommentModelType>(
  {
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const commentModel =
  mongoose.models.Comment || mongoose.model("Comment", schema);
export default commentModel;
