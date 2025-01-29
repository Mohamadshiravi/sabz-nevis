import mongoose from "mongoose";
import { PostModelType } from "./post";
import { UserModelType } from "./user";

export type ListModelType = {
  name: string;
  user: UserModelType | string;
  posts: PostModelType[] | string[];
  status: "public" | "private";
};

type ListModelTypeMongoose = {
  name: string;
  user: mongoose.Types.ObjectId;
  posts: mongoose.Schema.Types.ObjectId[];
  status: "public" | "private";
};

const schema = new mongoose.Schema<ListModelTypeMongoose>({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    required: false,
  },
  status: {
    type: String,
    default: "private",
  },
});

const listModel = mongoose.models.List || mongoose.model("List", schema);
export default listModel;
