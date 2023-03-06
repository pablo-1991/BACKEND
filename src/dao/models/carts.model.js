import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    cart: {
        type: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                    default: []
                },
                quantity: {
                    type: Number
                }
            }
        ],
        required: true,
        unique: true
    }

})

cartsSchema.pre('find',function(next){
    this.populate({path: 'cart.id'})
    next()
})


export const cartsModel = mongoose.model('Carts', cartsSchema)