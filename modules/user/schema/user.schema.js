import { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema ({
    userName : {
        type : String , 
        required : true , 
        min : 2 , 
        max : 20 , 
    },
    email : {
        type : String , 
        required : true , 
        max : 50 ,
        unique : true ,  
    },
    password : {
        type : String , 
        required : true , 
        min : 8 , 
    }
} , {
    timestamps : true ,
})

userSchema.pre("save" ,async  function  (next)  {
    const salt = await bcrypt.genSalt() ;
    this.password = await bcrypt.hash(this.password , salt ); 
    next();
})

export default userSchema ; 