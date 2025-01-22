import mongoose from "mongoose";
import userModel, { UserModelType } from "./user";

export type PostModelType = {
  _id: string;
  title: string;
  body: string;
  desc: string;
  user: UserModelType;
  likes: number;
  status: string;
  cover: string;
  category: string;
  readingTime: string;
  imagesUrl: string[];
  createdAt: Date;
};

type PostModelTypeMongoose = {
  title: string;
  body: string;
  desc: string;
  user: mongoose.Types.ObjectId | UserModelType;
  likes: number;
  status: string;
  category: string;
  cover: string;
  readingTime: string;
  imagesID: string[];
  imagesUrl: string[];
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
      type: Number,
      default: 0,
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
      type: String,
      required: false,
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
