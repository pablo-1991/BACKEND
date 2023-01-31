import fs from "fs";

export default class CartManager {
    construct() {
    }

    addToCart(id) {
        const getProds = this.#getProds();
        let getItem = getProds.find((x) => x.id === id);
        let getCart = this.getPurchases();

        let purch = {
            id: getItem.id,
            title: getItem.title,
            quantity: 1
        }

        const getCartProd = getCart.find((x) => x.id === id);

        if (getCartProd) {
            const getCartRest = getCart.filter((x) => x.id != id);
            purch.quantity = getCartProd.quantity + 1;
            let concatenados = getCartRest.concat(purch);
            fs.writeFileSync('./files/cart.json', JSON.stringify(concatenados));
            return "Producto agregado anteriormente. Se sumó una unidad";
        } else {
            getCart.push(purch);
            fs.writeFileSync('./files/cart.json', JSON.stringify(getCart))
            return "Producto agregado correctamente:";
        };
    }

    getPurchases() {
        if (fs.existsSync("./files/cart.json")) {
            const readFile = fs.readFileSync("./files/cart.json", "utf-8");
            const readFileJS = JSON.parse(readFile);
            return "su compra", readFileJS;
        } else {
            return [];
        }
    }

    getPurchaseById(id) {
        const getProds = this.getPurchases();
        const searchId = getProds.find((x) => x.id === id);
        if (searchId) {
            return searchId
        } else {
            return "Producto no agregado al carrito"
        }
    }

    deletePurchase(id) {
        const getProds = this.getPurchases(id);
        let validation = getProds.find((x) => x.id == id);

        if (validation) {
            let searchOthers = getProds.filter((x) => x.id != id);
            fs.writeFileSync('./files/cart.json', JSON.stringify(searchOthers));
            return `Elemento con id: ${id} eliminado correctamente.`;
        } else {
            return `Elemento con id: ${id} no encontrado`;
        }

    }

    #getProds() {
        try {
            if (fs.existsSync("./files/productos.json")) {
                
                const getProds = fs.readFileSync("./files/productos.json", "utf-8");
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