import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import userRoutes from "./modules/user/routes/user.routes.js";
import itemRoutes from "./modules/item/routes/item.routes.js";
import validateRequest from "./midlleware/validateRequest.js";
import verfiyToken from "./midlleware/verfiyToken.js";


// import {
//   registerSchema,
//   updateProfileSchema,
// } from "./modules/user/joi/user.validation.js";
import { createItemSchema, editItemSchema } from "./modules/item/joi/item.joi.js";
import connection from "./configuration/config.js";
import { createItem, editItem } from "./modules/item/controller/item.controller.js";
import { createCategory, editCategory } from "./modules/category/controller/category.controller.js";
import categoryRoutes from "./modules/category/routes/category.routes.js";

// Configurations :

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();



app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));



app.use(cors());


// FILE Storage Configurations :
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
      return cb(null, true);
  } else {
      cb('Error: Images Only!');
  }
}

const upload = multer({
  storage ,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
  }
});

// END 

// ROUTES WITH FILES
app.put(
  "/categories/edit-category",
  verfiyToken,
  // validateRequest(editItemSchema),
  upload.single("picture"),
  editCategory
);

app.put(
  "/items/edit-item",
  verfiyToken,
  // validateRequest(editItemSchema),
  upload.single("picture"),
  editItem
);

app.post(
  "/items/create-item",
  verfiyToken,
  // validateRequest(createItemSchema),
  upload.single("picture"),
  createItem
);
app.post(
  "/category/create-category",
  verfiyToken,
  // validateRequest(createItemSchema),
  upload.single("picture"),
  createCategory 
);
app.put(
  "/category/edit-category",
  verfiyToken,
  // validateRequest(createItemSchema),
  upload.single("picture"),
  editCategory 
);


// Routes :
app.use(userRoutes);
app.use(itemRoutes);
app.use(categoryRoutes);
connection();

app.listen(process.env.PORT , ()=>{
  console.log("the application is running on port 5000"); 
})