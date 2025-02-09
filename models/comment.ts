import mongoose from "mongoose";
import { PostModelType } from "./post";
import { postModel, userModel } from "@/models";
import { UserModelType } from "./user";

export type CommentModelType = {
  _id: string;
  user: UserModelType;
  body: string;
  post: PostModelType;
  createdAt: Date;
  status: "queued" | "accepted";
  likes: mongoose.Types.ObjectId[];
  replyTo: CommentModelType;
  replies: CommentModelType[];
};
type CommentModelTypeMongoose = {
  _id: string;
  user: UserModelType;
  body: string;
  post: PostModelType;
  createdAt: Date;
  status: "queued" | "accepted";
  likes: mongoose.Types.ObjectId[];
  replyTo: mongoose.Types.ObjectId;
  replies: mongoose.Types.ObjectId[];
};

const schema = new mongoose.Schema<CommentModelTypeMongoose>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    likes: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    replies: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    },
  },
  {
    timestamps: true,
  }
);

const commentModel =
  mongoose.models.Comment || mongoose.model("Comment", schema);
export default commentModel;
