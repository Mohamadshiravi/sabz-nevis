import mongoose from "mongoose";

export type UserModelType = {
  loading: boolean;
  _id: string;
  phone: string;
  displayName?: string;
  about?: string;
  gender?: string;
  birthDay?: string;
  username?: string;
  email?: string;
  password?: string;
  xProfile: string;
  linkedin: string;
};

const schema = new mongoose.Schema<UserModelType>({
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
});

const userModel = mongoose.models.User || mongoose.model("User", schema);
export default userModel;
