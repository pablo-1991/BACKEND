import { Router } from "express";
import {
    addCartController,
    editCartController,
    editProductQtyController,
    emptyCartController,
    getCartByIdController,
    getCartsController,
    addProductToCartController,
    deleteProductFromCartController,
} from "../controllers/carts.controller.js";

const router = Router()

router.post("/", addCartController);
router.get("/", getCartsController)
router.get("/:cid", getCartByIdController);
router.post("/:cid/product/:pid", addProductToCartController);
router.delete("/:cid/product/:pid", deleteProductFromCartController);
router.delete("/:cid", emptyCartController);
router.put("/:cid/product/:pid", editProductQtyController);
router.put("/:cid", editCartController);

export default router
