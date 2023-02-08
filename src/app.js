import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io"

const app = express();

import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import realTimeProductsRouter from "./routes/realtimeproducts.router.js"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//archivos estaticos (ruta a "/public"):
app.use(express.static(__dirname+"/public"))

// motores de plantilla (handlebars):
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars") //qué motor de plantilla usamos
app.set("views", __dirname+ "/views")//para saber dónde está la carpeta "/views"

//rutas
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/realtimeproducts", realTimeProductsRouter)

const httpServer = app.listen(8080, () => {
    console.log("Escuchando al puerto 8080...")
})

//websocket
export const socketServer = new Server(httpServer)

socketServer.on("connection", (socket)=>{console.log(`Usuario conectado: ${socket.id}`)
socket.on("disconnect", (mensaje)=>{console.log("Usuario desconectado")})})