import { productsModel } from "../models/products.model.js";

export default class ProductManager {
    async getProducts() {
        try {
            const productsDB = await productsModel.find()
            return productsDB
        }
        catch (error) { return error }
    }

    async addProduct(prod) {
        try {
            const newProduct = await productsModel.create(prod)
            return newProduct
        }
        catch (error) { return error }
    }

    async getProductById(id) {
        try {
            const getProdById = await productsModel.find({"_id" : id });
            return getProdById;
        } catch (error) {
            return error;
        }
    }
    async deleteProduct(id){
        try {
            const delProd = await productsModel.deleteOne({ '_id' : id})
            return "Producto eliminado correctamente"
        } catch (error) {
            return error;
        }
    }
}
