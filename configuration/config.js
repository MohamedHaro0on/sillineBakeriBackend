import mongoose from "mongoose"
const connection = ()=>mongoose.connect(process.env.CONNECTION_STRING , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family:4

}).then(result =>{
    console.log("the db is connected") ;
}).catch(error => {
    console.log("the db is not connected : ", error ) ;
})
export default connection ;