import fs from "fs";
const path = "./files/cart.json"


export default class cartManager {
    constructor() {
        this.carts = []
    }
    getCart() {
        if (fs.existsSync(path)) {
            const carts = JSON.parse(fs.readFileSync(path, "utf-8"))
            return carts
        }
        else {
            console.log("no existe carrito")
        }
    }

    addCart() {
        const cart = {
            id: this.#addId(),
            product: []
        }
        const cartFile = this.getCart()
        cartFile.push(cart)
        fs.writeFileSync(path, JSON.stringify(cartFile));
    }

    addProductCart(CartNew) {
        const { pid, quantity, cid } = CartNew

        if (!pid || !quantity || !cid) {
            console.log('Falta campo')
        }
        else {
            const cart = {
                pid,
                quantity
            }
            const cartFile = this.getCart()
            cartFile.push(cart)
            fs.writeFileSync(path, JSON.stringify(cartFile));
        }
    }

    getCartById(id) {
        const carts = this.getCart();
        return (carts.find(cart => cart.id === id)) || 'Error: Carrito no encontrado'
    }

    deleteProductCart(id) {
        const getProds = this.getCart(id);
        let validation = getProds.find((x) => x.id == id);

        if (validation) {
            let searchOthers = getProds.filter((x) => x.id != id);
            fs.writeFileSync("./files/Cart.json", JSON.stringify(searchOthers));
            return `Elemento con id: ${id} eliminado correctamente.`;
        } else {
            return `Elemento con id: ${id} no encontrado`;
        }
    }

    #addId() {
        let id = 1
        const carts = this.getCart()
        if (carts.length !== 0) {
            id = carts[carts.length - 1].id + 1
        }
        return id
    }
}
