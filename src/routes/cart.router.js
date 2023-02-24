import { Router } from "express";
//import cartManager from "../dao/fileManagers/cartManager.js"; // FILES
import cartManager from "../dao/mongoManagers/cartManager.js"; // MONGODB
const router = Router();


const cartMan = new cartManager();


router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    let cart = await cartMan.getCartById(parseInt(cid));
    if (!cart) {
        res.status(400).json({ message: 'el carrito ' + cid + ' no se encontró' })
    } else { res.status(200).json({ message: 'productos del carrito ' + cid, productos: cart.products }) }})


    router.post('/', (req, res) => {
        const newCart = cartMan.addCart()
        res.status(200).json({ message: 'carrito creado con éxito', Carrito: newCart })
    })

    router.post('/:cid/product/:pid', async (req, res) => {
        const { cid, pid } = req.params
        const { quantity } = req.body

        const cart = await cartMan.addToCart(parseInt(cid), parseInt(pid), parseInt(quantity))
        res.status(200).json({ message: 'carrito actualizado ', cart: cart })
    })


    export default router;
