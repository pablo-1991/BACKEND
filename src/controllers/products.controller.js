import {
    getProductsService,
    getProductByIdService,
    addProductService,
    deleteProductService,
    updateProductService,
    mockedProductsService,
} from "../services/products.services.js";
import CustomError from "../utils/errors/CustomError.js";
import {
    ErrorsCause,
    ErrorsMessage,
    ErrorsName,
} from "../utils/errors/ErrorsEnum.js";
import logger from "../utils/winston.js";

export const getProductsController = async (req, res) => {
    const { limit = 50, page = 1, sort, category } = req.query;
    if (typeof limit !== "number") {
        CustomError.createCustomError({
            name: ErrorsName.PRODUCT_DATA_INCORRECT_TYPE,
            cause: ErrorsCause.PRODUCT_DATA_INCORRECT_TYPE,
            message: ErrorsMessage.PRODUCT_DATA_INCORRECT_TYPE,
        });
    }

    try {
        let user = req.user;
        let products = await getProductsService(limit, page, sort, category, user);
        res.json({ response: products });
    } catch (error) {
        console.log("Error desde el controller: ", error);
    }
};

export const getProductByIdController = async (req, res) => {
    try {
        let id = req.params.pid;
        const product = await getProductByIdService(id);
        res.json({ response: product });
    } catch (error) {
        console.log("Error desde el controller", error);
        return error;
    }
};

export const addProductController = async (req, res) => {
    try {
        let product = req.body.newProduct;
        let owner = req.body.owner
        const newProductCreated = await addProductService(product, owner);
        res.json({ response: newProductCreated });
    } catch (error) {
        console.log("Error desde el controller: ", error);
    }
};

export const updateProductController = async (req, res) => {
    try {
        const pid = req.params.pid;
        const updatedProduct = req.body.updatedProduct;
        const owner = req.body.owner;
        const updatedProductFromDb = await updateProductService(pid, updatedProduct, owner)
        res.json({
            reponse: updatedProductFromDb,
        });
    } catch (error) {
        console.log("Error desde el controller: ", error);
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const pid = req.params.pid;
        let owner = req.body.owner;
        const deletedProduct = await deleteProductService(pid, owner);
        res.json({
            response: deletedProduct,
        });
    } catch (error) {
        console.log("Error desde el controller: ", error);
    }
};

export const mockedProductsController = async (req, res) => {
    try {
        const products = await mockedProductsService();
        res.json({ response: products });
    } catch (error) {
        console.log("Error desde el controller: ", error);
    }
};