import { Router } from "express";
import { verificarUsuarioClient } from "../middlewares/auth.js";
import {
    addCartController,
    editCartController,
    editProductQtyController,
    emptyCartController,
    getCartByIdController,
    getCartsController,
    addProductToCartController,
    deleteProductFromCartController,
    completeSaleController,
    eraseProductFromCartController
} from "../controllers/carts.controller.js";


const router = Router();

router.get("/", getCartsController)
router.post("/", addCartController)
router.get("/:cid", getCartByIdController)
router.post("/:cid/product/:pid",verificarUsuarioClient , addProductToCartController)
router.delete("/:cid/product/:pid", deleteProductFromCartController)
router.delete("/:cid", emptyCartController)
router.put("/:cid/product/:pid/:qty", editProductQtyController)
router.put("/:cid", editCartController)
router.post('/:cid/purchase', completeSaleController)
router.delete("/:cid/product/:pid/erase", eraseProductFromCartController)

export default router;
