import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export const userModel = mongoose.model("Users", usersSchema)