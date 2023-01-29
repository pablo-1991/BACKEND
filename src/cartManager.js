import fs from "fs";

export default class CartManager {
    construct() {
        this.cart = [];
    }

    addToCart(id) {
        const getProds = this.#getProds()
        let getItem = getProds.find((x) => x.id === id);
        let getCart = this.getPurchases();
        getCart.push(getItem);
        fs.writeFileSync('/files/cart.json', JSON.stringify(getCart))
        return `Producto agregado correctamente: ${JSON.stringify(getItem)}`;
    }

    getPurchases() {
        if (fs.existsSync("/files/cart.json")) {
            const readFile = fs.readFileSync('/files/cart.json', 'utf-8');
            const readFileJS = JSON.parse(readFile);
            return readFileJS;
        } else {
            return [];
        }
    }

    getPurchaseById(id) { }

    #getProds() {
        try {
            if (fs.existsSync("/files/productos.json")) {
                // * * * Buscar manera para que sea DINAMICO
                const getProds = fs.readFileSync("/files/productos.json", "utf-8");
                const getProdsJS = JSON.parse(getProds);
                return getProdsJS;
            } else {
                return [];
            }
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }
}