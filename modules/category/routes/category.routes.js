import { Router } from "express";
import verfiyToken from "../../../midlleware/verfiyToken.js";
import validateRequest from "../../../midlleware/validateRequest.js";
import {
  getCategory,
  deleteCategory,
  getCategories,
} from "../controller/category.controller.js";
import pagination from "../../../midlleware/pagination.js";

const categoryRoutes = Router();

// READ :

categoryRoutes.get("/categories", verfiyToken, pagination, getCategories);
categoryRoutes.get("/categories/:id", verfiyToken, pagination, getCategory);

// UPDATE :
categoryRoutes.delete("/categroies-delete/:id/", verfiyToken, deleteCategory);

export default categoryRoutes;
