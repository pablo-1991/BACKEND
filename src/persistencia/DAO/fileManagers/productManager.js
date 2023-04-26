import fs from "fs";
import { __dirname } from "../../../utils.js";
const path = __dirname + "/files/productos.json"


export default class ProductManager {

    async getProducts() {
        if (fs.existsSync(path)) {
            try {
                const productos = await fs.promises.readFile(path, "utf-8");
                return JSON.parse(productos);
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            return [];
        }
    }

    async addProduct(products) {
        try {
            const { title, description, code, price, status = true, stock, category, thumbnail } = products;
            const product = {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail
            };

            const productFile = await this.getProducts();
            let id = productFile.length === 0 ? 1 : productFile[productFile.length - 1].id + 1
            const prod = { id, ...products }
            productFile.push(prod);
            await fs.promises.writeFile(path, JSON.stringify(productFile));
        } catch (error) {
            console.log(error);
        }
    }

    async deletAllProducts() {
        if (fs.existsSync(path)) { await fs.promises.unlink(path) }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const prod = products.find(product => product.id === id);
        return prod;
    }

    async updateProduct(id, product) {
        const products = await this.getProducts();
        products.forEach((prod) => {
            if (prod.id === id) {
                prod.category = product.category
                prod.title = product.title
                prod.price = products.price
                prod.description = product.description
                prod.thumbnail = product.thumbnail
                prod.code = product.code
                prod.stock = product.stock
            }
        })
        await fs.promises.writeFile(path, JSON.stringify(products))
        return "Producto editado correctamente"
    }

    async deleteProduct(id) {
        const info = await this.getProducts();
        const newArray = info.filter(prod => prod.id !== id)
        await fs.promises.writeFile(path, JSON.stringify(newArray))
    }
}