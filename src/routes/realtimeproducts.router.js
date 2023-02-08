import { Router } from "express";
const realtimeproducts = Router();
import ProductManager from "../productManager.js";

import { socketServer } from "../app.js";


const prodMan = new ProductManager("./files/productos.json");

realtimeproducts.get("/", async (req, res) => {
    const { limit } = req.query;
    const products = await prodMan.getProducts(parseInt());
    const newProduct = products.slice(0, limit);
    res.render("realtimeproducts", { products: newProduct });
});

realtimeproducts.post("/", async (req, res) => {
    const prod = req.body;
    await prodMan.addProduct(prod);
    socketServer.sockets.emit("sendProduct", prod);
    res.redirect("/realtimeproducts");
});

export default realtimeproducts;