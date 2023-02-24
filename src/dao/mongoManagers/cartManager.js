import { cartsModel } from "../models/carts.model.js";


export default class CartManager {
    async readFile() {
        const read = await cartsModel.find({});
        return read;
    }

    async addCart() {
        const create = await cartsModel.create();
        return create;
    }

    async getCartById(id) {
        const getId = await cartsModel.findById(Number(id));
        return getId;
    }

    async addToCart(cid, pid, quantity) {
        const getId = await cartsModel.findById(Number(cid));
        const create = await cartsModel.create();
        if (getId) {
            getId.products.updateOne(
                { id: pid },
                { $inc: { quantity: quantity } }
            )
        } else {
            create.products.create({
                productId: pid,
                quantity: quantity,
            });
        }
    }
}