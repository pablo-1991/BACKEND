import { Router } from "express";
//import cartManager from "../dao/fileManagers/cartManager.js"; // FILES
import cartManager from "../dao/mongoManagers/cartManager.js"; // MONGODB
const router = Router();


const cartMan = new cartManager();


router.post('/', async (req, res) => {
    const cart = req.body
    const addedCart = await cartMan.addCart(cart)
    res.json({ mensaje: "Carrito agregado", carrito: addedCart })

})

router.get('/', async (req,res)=>{
    const carts = await cartMan.getCarts()
    //res.render('carts', {carts})
    res.json({mensaje: 'carritos encontrados', carritos: carts})
})

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    const cartFoundById = await cartMan.getCartById(cid)
    console.log(cartFoundById.cart)
    let cart = cartFoundById.cart
    res.render('carts', {cart})
})

router.post('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const addedProduct = await cartMan.addProductToCart(cid, pid)
    res.json({ mensaje: `Producto agregado a carrito ${cid}`, carrito: addedProduct })
})

router.delete('/:cid/products/:pid', async (req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const deletedProduct = await cartMan.deleteProductFromCart(cid, pid)
    res.json({ mensaje: `Producto eliminado del carrito ${cid}`, carrito: deletedProduct })
})

router.delete('/:cid', async(req,res)=>{
    const cid = req.params.cid
    const emptyCart = await cartMan.emptyCart(cid)
    res.json({ mensaje: `Carrito ${cid} vaciado` })
})

router.put('/:cid/products/:pid', async (req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity
    const editedProductQty = await cartMan.editProductQty(cid,pid,quantity)
    res.json({mensaje: `Producto editado: ${editedProductQty}`})
})

router.put('/:cid', async(req,res)=>{
    const cid = req.params.cid
    const newCart = req.body.cart
    console.log(newCart)
    const editedCart = await cartMan.editCart(cid, newCart)
    res.json({mensaje: `Carrito editado: ${editedCart}`})
})

export default router
