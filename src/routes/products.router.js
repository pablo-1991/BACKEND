import { Router } from "express";
import { addProductController, deleteProductController, getProductByIdController, getProductsController, updateProductController } from "../controllers/products.controller.js";
const router = Router()


router.get('/', getProductsController)
router.get('/:pid', getProductByIdController)
router.post('/', addProductController)
router.put('/:pid', updateProductController)
router.delete('/:pid', deleteProductController)


export default router
