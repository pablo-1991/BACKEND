import { Router } from "express";
//import ProductManager from "../dao/fileManagers/productManager.js"  // FILES
import ProductManager from "../dao/mongoManagers/productManager.js";  //MONGODB
import { socketServer } from "../app.js";
const router = Router();


const prodMan = new ProductManager();

router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, category } = req.query
    let products = await prodMan.getProducts(limit, page, sort, category) //category en la url va sin comillas
    res.render('products', {products})
})

router.get('/:pid', async (req, res) => {
    const product = await prodMan.getProductById(req.params.pid)
    res.json({ mensage: "Producto encontrado por id", producto: product })
})

router.post('/', async (req, res) => {
    let newProduct = req.body
    const newProductCreated = await prodMan.addProduct(newProduct)
    res.json({ mensage: "Producto creado con éxito", producto: newProductCreated })
})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid
    const newProduct = req.body
    const updatedProduct = await prodMan.updateProduct(pid, newProduct)
    res.json({ mensaje: "Producto actualizado con éxito", producto: updatedProduct })
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    const deletedProduct = await prodMan.deleteProduct(pid)
    res.json({ mensaje: "Producto borrado con éxito", producto: deletedProduct })
})

export default router