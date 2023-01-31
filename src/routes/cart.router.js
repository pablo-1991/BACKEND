import { Router } from "express";
import cartManager from "../cartManager.js";
import productManager from "../productManager.js"
const router = Router();

const cartMan = new cartManager("./files/cart.json");
const prodMan = new productManager("./files/productos.json")

router.get('/', (req, res) => {
    let cart = cartMan.getPurchases();
    res.json(cart)
})

router.post('/:cid', (req, res) => {
    let { cid } = req.params;
    let cart = cartMan.addToCart(parseInt(cid))
    res.json(cart)
})

router.post("/:cid/product/:pid"), (req, res) => {
    try {
        const result = prodMan.addProduct(req.params);
        if (result.error) { res.status(500).json({ error: result.error }); }
        else { res.json({ message: "Producto agregado al carrito" }) }
    } catch (error) { res.status(500).json({ error: error.message }) }
}

router.get('/:cid', (req, res) => {
    let { cid } = req.params;
    let purch = cartMan.getPurchaseById(parseInt(cid));
    res.json(purch)
})

router.delete(('/:cid'), (req, res) => {
    let { cid } = req.params;
    let del = cartMan.deletePurchase(parseInt(cid))
    res.json(del)
})

export default router;
