import mongoose from "mongoose";
import { UserModelType } from "./user";
import { CommentModelType } from "./comment";
import { userModel, commentModel, categoryModel } from "@/models";
import { CategoryModelType } from "./category";

export type PostModelType = {
  _id: string;
  title: string;
  body: string;
  desc: string;
  user: UserModelType;
  likes: UserModelType[] | string[];
  status: string;
  cover: string;
  category: CategoryModelType;
  readingTime: string;
  imagesUrl: string[];
  createdAt: Date;
  comments: CommentModelType[];
};

type PostModelTypeMongoose = {
  title: string;
  body: string;
  desc: string;
  user: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  status: string;
  category: mongoose.Types.ObjectId;
  cover: string;
  readingTime: string;
  imagesID: string[];
  imagesUrl: string[];
  comments: mongoose.Types.ObjectId[];
};

const schema = new mongoose.Schema<PostModelTypeMongoose>(
  {
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
    desc: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    readingTime: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    comments: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    },
    imagesID: {
      type: [String],
      required: false,
    },
    imagesUrl: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.models.Post || mongoose.model("Post", schema);
export default postModel;
