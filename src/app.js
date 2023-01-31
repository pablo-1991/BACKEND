import express from "express";
const app = express();

import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)


app.listen(8080, () => {
    console.log("Escuchando al puerto 8080...")
})