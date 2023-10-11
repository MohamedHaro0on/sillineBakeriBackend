import { Schema } from "mongoose";
const ItemSchema = new Schema ({
    picture : String , 
    description : {
        type : String , 
        required : true , 
    } ,
    allergy : {
        type : String , 
        required : true , 
    } ,
    category : {
        type : String , 
        required : true , 
    } ,
    price : {
        type : Number , 
        required : true , 
    } ,
}, {
    timestamps : true , 
})


export default ItemSchema ; 