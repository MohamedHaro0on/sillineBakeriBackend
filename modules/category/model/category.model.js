import { model } from "mongoose";

import CategorySchema from "../schema/category.schema.js";

const Category = model("Category" , CategorySchema);

export default Category ; 