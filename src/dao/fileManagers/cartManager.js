import fs from "fs";
import { __dirname } from "../../utils.js";
const path = __dirname + "/files/cart.json"


export default class CartManager {
    constructor() {
        this.carts = []
    }

    async saveFile() {
        await fs.promises.writeFile(path, JSON.stringify(this.carts))
        console.log(path, 'guardado con exito')
    }

    async getCart() {
        try {
            if (!fs.existsSync(path)) {
                console.log('Error: archivo no encontrado', path);
                return false;
            }

            const data = await fs.promises.readFile(path, 'utf-8')
            this.carts = JSON.parse(data)
            console.log(path, 'leido con exito')
            return this.carts
        } catch (error) {
            console.log('Error: ', error)
        }
        return false;
    }

    async addCart() {
        await this.getCart()
        const newCart = {
            "id": this.carts.length,
            "products": []
        }
        this.carts.push(newCart)
        this.saveFile()
        return newCart
    }

    async getCartById(id) {
        await this.getCart()
        const cart = this.carts.find((cart) => cart.id === id)
        if (!cart) {
            console.log('el carrito ' + id + ' no se encontró')
            return false
        }
        return cart
    }

    async addToCart(cid, pid, quantity) {
        const cart = await this.getCartById(cid)
        if (!cart) {
            return false
        }
        const prodInCart = cart.products.find((prodInCart) => prodInCart.productId === pid)
        if (prodInCart) {
            prodInCart.quantity += quantity
        } else {
            cart.products.push({
                "productId": pid,
                "quantity": quantity
            })
        }
        this.saveFile()
        console.log('Carrito actualizado con éxito');
        return cart
    }

}

