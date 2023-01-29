import { Router } from "express";
import productManager from "../productManager.js"
const router = Router();


const prodMan = new productManager("/files/productos.json");

router.get('/', async (req, res) => {
    const { limit } = req.query
    const products = await prodMan.getProducts(parseInt())
    const newProduct = products.slice(0, limit)
    res.json({ message: "Productos enviados correctamente", newProduct })
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const id = parseInt(pid)
    const product = await prodMan.getProductById(id)
    try {
        if (!product) { return res.status(400).json({ error: "No existe ese ID." }) }
        else { res.json({ message: `Producto con el ID: ${id} enviado`, product }) }
    }
    catch (error) { console.log(error) }
})

router.post('/', async (req, res) => {
    const prod = req.body
    await prodMan.addProduct(prod)
    res.json("Producto agregado")
})

router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const prod = req.body
    await prodMan.updateProduct(parseInt(pid), prod)
    res.json("Producto actualizado")
})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    await prodMan.deleteProduct(parseInt(pid))
    res.json("Producto eliminado")
})

router.delete("/", async (req, res) => {
    await prodMan.deletAllProducts()
    res.json("Todos los productos eliminados")
})

export default router;