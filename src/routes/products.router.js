import { Router } from "express";
import {
    addProductController,
    deleteProductController,
    getProductByIdController,
    getProductsController,
    updateProductController,
    mockedProductsController
} from "../controllers/products.controller.js";
import { verificarUsuarioAdmin, verificarUsuarioPremium, verificarUsuarioPremiumOAdmin } from '../middlewares/auth.js'
import { generateProduct } from "../mocks.js";

const router = Router()


router.get('/', getProductsController)
router.get('/:pid', getProductByIdController)
router.post('/', verificarUsuarioPremiumOAdmin, addProductController)
router.put('/:pid', verificarUsuarioPremiumOAdmin, updateProductController)
router.delete('/:pid', deleteProductController)
router.get('/mockingproducts/products', mockedProductsController)

export default router