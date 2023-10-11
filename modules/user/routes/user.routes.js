import {Router} from "express";
import {login , getUser   , getAllUsers, register } from "../controller/user.controller.js";
import verfiyToken from "../../../midlleware/verfiyToken.js" ;
import validateRequest from "../../../midlleware/validateRequest.js";
import {loginSchema, registerSchema} from "../joi/user.validation.js";


const userRoutes = Router ();


// LOGGING
userRoutes.post ("/login" , validateRequest(loginSchema) , login) ; 
userRoutes.post ("/register" , validateRequest(registerSchema) , register) ; 


// READ
userRoutes.get("/users" , verfiyToken , getAllUsers);
userRoutes.get("/user/:id" , verfiyToken , getUser);


export default userRoutes ;     