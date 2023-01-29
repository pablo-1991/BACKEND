import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productos = await fs.promises.readFile(this.path, "utf-8");
                const productosJSON = JSON.parse(productos);
                return productosJSON;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
        return this.path;
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
            await fs.promises.writeFile(this.path, JSON.stringify(productFile));
        } catch (error) {
            console.log(error);
        }
    }

    async deletAllProducts() {
        if (fs.existsSync(this.path)) { await fs.promises.unlink(this.path) }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const prod = products.find(product => product.id === id);
        return prod;
    }

    updateProduct(id, title) {
        const actualizar = this.path.find(prop => prop.id === id)
        return actualizar.title = title
    }

    async deleteProduct(id) {
        const info = await this.getProducts();
        const newArray = info.filter(prod => prod.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(newArray))
    }
}
