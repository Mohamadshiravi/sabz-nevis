import mongoose from "mongoose";

export default async function ConnectToDB(): Promise<boolean> {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    } else {
      await mongoose.connect(process.env.MONGODB_URI!);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
