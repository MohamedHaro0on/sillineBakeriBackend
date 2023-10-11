import {Router} from "express";


import verfiyToken from "../../../midlleware/verfiyToken.js";
import { deleteItem , getItems   , getItem  } from "../controller/item.controller.js";
import pagination from "../../../midlleware/pagination.js";


const ItemRoutes = Router();

// READ : 
// pagination , , 
ItemRoutes.get("/items" , verfiyToken , pagination ,   getItems);
ItemRoutes.get("/items/:id" , verfiyToken , pagination ,   getItem);



// UPDATE :
ItemRoutes.delete("/delete/:id/" , verfiyToken , deleteItem);


export default ItemRoutes ;