import mongoose from "mongoose";


const ticketsSchema = new mongoose.Schema({
code: {
    type: Number,
    unique: true
},
purchase_datetime :{
    type: String,
},
amount: {
    type: Number,
},
purchaser: {
    type: String, 
}
})

export const ticketsModel = mongoose.model('Tickets', ticketsSchema)