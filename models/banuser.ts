import mongoose from "mongoose";

export type banUserModelType = {
  _id: string;
  phone: string;
};

const schema = new mongoose.Schema<banUserModelType>({
  phone: {
    type: String,
    required: true,
  },
});

const banUserModel =
  mongoose.models.BanUser || mongoose.model("BanUser", schema);
export default banUserModel;
