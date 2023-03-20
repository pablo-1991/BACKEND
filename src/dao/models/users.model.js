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
        required: true,
        unique: true
    },
    edad: {
        type: Number,
        required: true,   
        default: 0   // o required: false
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        required: false,
        default: 'user'
    }
})

export const userModel = mongoose.model("Users", usersSchema)