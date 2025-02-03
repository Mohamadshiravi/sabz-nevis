import mongoose from "mongoose";

export type CategoryModelType = {
  _id: string;
  name: string;
};

type CategoryModelTypeMongoose = {
  name: string;
};

const schema = new mongoose.Schema<CategoryModelTypeMongoose>({
  name: {
    type: String,
    required: true,
  },
});

const categoryModel =
  mongoose.models.Category || mongoose.model("Category", schema);
export default categoryModel;
