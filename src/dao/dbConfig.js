import mongoose from "mongoose";
mongoose.set('strictQuery', false)

const URI = "mongodb+srv://pablo-1991:0000122@cluster0.mlrbkpp.mongodb.net/ECOMMERCE?retryWrites=true&w=majority"
mongoose.connect(URI, (error)=>{
    if(error){console.log(error)}
    else {console.log("Conectado con éxito a la DB")}
})