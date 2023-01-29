import { Router } from "express";
import cartManager from "../cartManager.js";
const router = Router();


const cartMan = new cartManager("/files/cart.json");

router.get('/', (req, res) => {
    let cart = cartMan.getPurchases();
    res.json(cart)
})

router.post('/:pid', (req, res) => {
    let { pid } = req.params;
    cartMan.addToCart(parseInt(pid))
})

router.get('/:pid', (req, res) => {
    res.json({ message: "Carrito de compras" })
})

export default router;