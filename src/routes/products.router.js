import { Router } from "express";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
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
router.post('/', addProductController)
router.put('/:pid', updateProductController)
router.delete('/:pid', deleteProductController)
router.get('/mockingproducts/products', mockedProductsController)

export default router