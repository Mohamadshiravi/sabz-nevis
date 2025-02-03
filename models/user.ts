import mongoose from "mongoose";

export type UserModelType = {
  _id: string;
  phone: string;
  displayName?: string;
  about?: string;
  gender?: string;
  birthDay?: string;
  username: string;
  email?: string;
  password?: string;
  xProfile?: string;
  linkedin?: string;
  avatar: string;
  followers: UserModelType[] | string[];
  following: UserModelType[] | string[];
};
type UserModelTypeMongoose = {
  _id: string;
  phone: string;
  displayName?: string;
  about?: string;
  gender?: string;
  birthDay?: string;
  username: string;
  email?: string;
  password?: string;
  xProfile?: string;
  linkedin?: string;
  avatar: string;
  fileID: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
};

const schema = new mongoose.Schema<UserModelTypeMongoose>({
  phone: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  birthDay: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  xProfile: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    default: "/images/guest-avatar.webp",
  },
  fileID: {
    type: String,
    required: false,
  },
  followers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: false,
  },
  following: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: false,
  },
});

const userModel = mongoose.models.User || mongoose.model("User", schema);
export default userModel;
