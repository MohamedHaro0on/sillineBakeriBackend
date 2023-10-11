import { model } from "mongoose";

import ItemSchema from "../schema/item.schema.js";

const Item = model("Item" , ItemSchema);

export default Item ; 