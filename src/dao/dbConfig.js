import mongoose from "mongoose";
mongoose.set('strictQuery', false)

const URI = "mongodb+srv://pablo-1991:0000122@cluster0.mlrbkpp.mongodb.net/ECOMMERCE?retryWrites=true&w=majority"

try {
    await mongoose.connect(URI)
    console.log("Conectado con éxito a la DB")
} catch (error) {
    console.log("error")
}