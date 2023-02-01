import { Router } from "express";
import cartManager from "../cartManager.js";
const router = Router();


const cartMan = new cartManager("./files/cart.json");


router.get('/', (req, res) => {
    let cart = cartMan.getCart();
    res.json(cart)
})

router.get('/:cid', (req, res) => {
    let { cid } = req.params;
    let purch = cartMan.getCartById(parseInt(cid));
    res.json(purch)
})

router.post('/', (req, res) => {
    const cart = req.body
    cartMan.addCart(cart)
    res.send('Producto agregado al carrito')
})

router.post('/:cid/product/:pid', (req, res) => {
    let { cid, pid } = req.params
    let cart = cartMan.getCartById(parseInt(cid))
    if (cart) {
        res.json({ message: 'carrito encontrado', cart })
        cartMan.addProductCart(pid, 1, cid)
    } else {
        res.status(400).send('carrito no existe')
    }
})

router.delete(('/:cid'), (req, res) => {
    let { cid } = req.params;
    let del = cartMan.deleteProductCart(parseInt(cid))
    res.json(del)
})

export default router;
