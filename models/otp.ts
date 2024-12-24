import mongoose from "mongoose";

export type OtpModelType = {
  phone: string;
  code: number;
  expTime: number;
};

const schema = new mongoose.Schema<OtpModelType>({
  phone: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  expTime: {
    type: Number,
    required: true,
  },
});

const otpModel = mongoose.models.Otp || mongoose.model("Otp", schema);
export default otpModel;
