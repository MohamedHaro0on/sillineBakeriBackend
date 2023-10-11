import { Schema } from "mongoose";
const CategorySchema = new Schema(
  {
    picture: {
      type: String,
      requried: true,
    },
    title: {
      type: String,
      requried: true,
    },
  },
  {
    timestamps: true,
  }
);

export default CategorySchema;
