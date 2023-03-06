import express from "express";
import cookieParser, { signedCookie } from "cookie-parser";
import session from "express-session";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import path from "path"


//IMPORTAR dbConfig
import "./dao/dbConfig.js"


const app = express();
const PORT = 8080

import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import realTimeProductsRouter from "./routes/realtimeproducts.router.js"


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//cookies
const cookieKey = signedCookie
app.use(cookieParser(cookieKey))


//archivos estaticos (ruta a "/public"):
app.use(express.static(path.join(__dirname, '/public')))

// motores de plantilla (handlebars):
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars") //qué motor de plantilla usamos
app.set("views", __dirname + "/views")//para saber dónde está la carpeta "/views"

//rutas
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/api/realtimeproducts", realTimeProductsRouter)


const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})

//websocket
export const socketServer = new Server(httpServer)

const newProductsArray = []

socketServer.on('connection', socket => {
    console.log(`USUARIO CONECTADO: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`USUARIO DESCONECTADO: ${socket.id}`)
    })

    socket.on('newProduct', newProduct => {
        console.log(newProduct)
        newProductsArray.push(newProduct)
        socketServer.emit('newProductsArray', newProductsArray)
    })
})