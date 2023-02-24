import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io"

//IMPORTAR dbConfig
import "./dao/dbConfig.js"

const app = express();
const PORT = 8080

import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import realTimeProductsRouter from "./routes/realtimeproducts.router.js"
import chatRouter from "./routes/chat.router.js"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//archivos estaticos (ruta a "/public"):
app.use(express.static(__dirname + "/public"))

// motores de plantilla (handlebars):
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars") //qué motor de plantilla usamos
app.set("views", __dirname + "/views")//para saber dónde está la carpeta "/views"

//rutas
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/realtimeproducts", realTimeProductsRouter)
app.use("/chat", chatRouter)

const httpServer = app.listen(PORT, () => {
    console.log("Escuchando al puerto 8080...")
})

//websocket
export const socketServer = new Server(httpServer)


const infoMessages = []; // vuelco mensajes

socketServer.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on("disconnected", (msg) => {
        console.log('Usuario desconectado');
    })

    socket.on("newUser", (usuario) => {
        socket.broadcast.emit('broadcast', usuario); // emite a todos menos al nuevo
    })

    socket.on("mensaje", (info) => {
        infoMessages.push(info);
        socketServer.emit("chat", infoMessages)
    })
})