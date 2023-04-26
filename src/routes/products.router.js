import { Router } from "express";
import {
    addProductController,
    deleteProductController,
    getProductByIdController,
    getProductsController,
    updateProductController
} from "../controllers/products.controller.js";
import { verificarUsuarioAdmin } from '../middlewares/auth.js'

const router = Router()


router.get('/', getProductsController)
router.get('/:pid', getProductByIdController)
router.post('/', verificarUsuarioAdmin, addProductController)
router.put('/:pid', verificarUsuarioAdmin, updateProductController)
router.delete('/:pid', verificarUsuarioAdmin, deleteProductController)

export default router