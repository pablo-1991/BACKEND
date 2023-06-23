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
import { verificarUsuarioPremiumOAdmin } from "../middlewares/auth.js";
const router = Router()


router.get('/', getProductsController)
router.get('/:pid', getProductByIdController)
router.post('/', verificarUsuarioPremiumOAdmin, addProductController)
router.put('/:pid', verificarUsuarioPremiumOAdmin, updateProductController)
router.delete('/:pid', verificarUsuarioPremiumOAdmin ,deleteProductController)
router.get('/mockingproducts/products', mockedProductsController)

export default router