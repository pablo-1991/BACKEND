import CustomError from "../../../utils/errors/CustomError.js";
import {
    ErrorsCause,
    ErrorsMessage,
    ErrorsName,
} from "../../../utils/errors/ErrorsEnum.js"
import logger from "../../../utils/winston.js";
import { productsModel } from "../../mongodb/models/products.model.js";
import { faker } from "@faker-js/faker";

export default class ProductManager {
    async getProducts(limit, page, sort, category, user) {
        const filter = {};
        if (category) filter.category = category;

        const options = {
            limit: limit,
            page: page,
            sort: { price: sort },
            category: category,
        };

        try {
            const allProductsDB = await productsModel.paginate(filter, options);
            if (!allProductsDB) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                });
                logger.info("NO EXISTEN PRODUCTOS EN LA DB")
            }
            let oldProducts = allProductsDB.docs;
            let products = oldProducts.map((el) => {
                return {
                    title: el.title,
                    description: el.description,
                    price: el.price,
                    category: el.category,
                    thumbnails: el.thumbnails,
                    code: el.code,
                    stock: el.stock,
                    status: el.status,
                };
            });


            const response = {
                status: "success",
                payload: allProductsDB.docs,
                totalPages: allProductsDB.totalPages,
                prevPage: allProductsDB.prevPage,
                nextPage: allProductsDB.nextPage,
                hasPrevPage: allProductsDB.hasPrevPage,
                hasNextPage: allProductsDB.hasNextPage,
                prevLink: allProductsDB.prevPage
                    ? `https://localhost8080/products?page=${allProductsDB.prevPage}`
                    : null,
                nextLink: allProductsDB.nextPage
                    ? `https://localhost8080/products?page=${allProductsDB.nextPage}`
                    : null,
            };
            
            logger.info("PRODUCTOS ENCONTRADOS!")
            return { message: "Productos encontrados", products: products };
        } catch (error) {
            logger.error("Error desde el manager", error);
            return error;
        }
    }

    async getProductById(productoId) {
        try {
            if (productoId.length != 24) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
                    cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
                    message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID,
                });
                return productoId;
            }

            const productIdDB = await productsModel.findById(productoId).lean();
            if (!productIdDB) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                });
                logger.warn("NO EXISTE ÉSTE PRODUCTO EN LA DB")
            }
            return { message: "Producto encontrado", product: productIdDB };
        } catch (error) {
            logger.error("Error desde el manager", error);
            return error;
        }
    }

    async addProduct(product) {
        try {
            if (
                !product.title ||
                !product.description ||
                !product.price ||
                !product.code ||
                !product.stock ||
                !product.status ||
                !product.category
            ) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                    cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
                    message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
                });
                logger.warn("DATOS DEL PRODUCTO INCOMPLETO/S")
                return;
            }
            let alreadyExists = await productsModel.find({ code: product.code });
            if (alreadyExists.length) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_CODE_ALREADY_EXISTS_IN_DATABASE,
                    cause: ErrorsCause.PRODUCT_DATA_CODE_ALREADY_EXISTS_IN_DATABASE,
                    message: ErrorsMessage.PRODUCT_DATA_CODE_ALREADY_EXISTS_IN_DATABASE,
                });
                logger.warn("PRODUCTO YA EXISTE EN DB!")
                return alreadyExists;
            }

            const newProduct = await productsModel.create(product);

            return { message: "Producto creado con éxito", product: newProduct };
        } catch (error) {
            console.log(error);
            logger.error("Error desde el manager", error);
            return error;
        }
    }

    async deleteProduct(id) {
        try {
            if (id.length != 24) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
                    cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
                    message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID,
                });
                return;
            }

            const deletedProduct = await productsModel.findByIdAndDelete(id);
            if (deletedProduct === null) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                });
                logger.warn("PRODUCTO NO ENCONTRADO")
                return;
            }
            logger.info("PRODUCTO ELIMINADO")
            return { message: "Producto eliminado con éxito", deletedProduct };
        } catch (error) {
            logger.error("Error desde el manager", error);
            return error;
        }
    }

    async updateProduct(id, newProduct) {

        try {
            if (id.length != 24) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
                    cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
                    message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID,
                });
                return
            }

            if (
                !newProduct.title ||
                !newProduct.description ||
                !newProduct.price ||
                !newProduct.code ||
                !newProduct.stock ||
                !newProduct.status ||
                !newProduct.category
            ) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                    cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
                    message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
                });
                logger.warn("FALTAN DATOS DEL PRODUCTO")
                return;
            }

            const updatedProduct = await productsModel.findByIdAndUpdate(
                id,
                {
                    title: newProduct.title,
                    description: newProduct.description,
                    price: newProduct.price,
                    code: newProduct.code,
                    stock: newProduct.stock,
                    status: newProduct.status,
                    category: newProduct.category
                },
                { new: true }
            );
            logger.info("PRODUCTO ACTUALIZADO!")
            return updatedProduct;
        } catch (error) {
            logger.error("Error desde el manager", error);
            return error;
        }
    }

    async mockedProducts() {
        try {
            const products = [];
            for (let i = 0; i < 50; i++) {
                const product = await productsModel.create({

                    title: faker.commerce.product(),
                    price: faker.commerce.price(),
                    description: faker.commerce.productDescription(),
                    category: faker.commerce.department(),
                    stock: faker.random.numeric(),
                    code: faker.random.alphaNumeric(5),
                    thumbnails: [faker.image.imageUrl(), faker.image.imageUrl()],
                    status: faker.datatype.boolean(),
                });

                products.push(product);
                //product.save();
            }
            console.log(products)
            return { message: 'Productos creados con éxito', products };
        } catch (error) {
            logger.error("Error desde el manager", error);
            return error;
        }
    }
}