import express from "express";
import cookieParser, { signedCookie } from "cookie-parser";
import session from "express-session";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import MongoStore from "connect-mongo";
import path from "path"
import passport from "passport";
import config from "./config.js";



//IMPORTAR dbConfig
import "./dao/mongoDB/dbConfig.js"
//IMPORTAR passportStrategies
import "./passport/passportStrategies.js"


const app = express();

import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import realTimeProductsRouter from "./routes/realtimeproducts.router.js"
import usersRouter from "./routes/users.router.js"
import viewsRouter from "./routes/views.router.js"
import jwtRouter from "./routes/jwt.router.js"


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cookies
app.use(cookieParser())

//archivos estaticos (ruta a "/public"):
app.use(express.static(path.join(__dirname, '/public')))

// motores de plantilla (handlebars):
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars") //qué motor de plantilla usamos
app.set("views", __dirname + "/views")//para saber dónde está la carpeta "/views"

// MONGO SESSIONS
app.use(
    session({
        secret: "sessionKey",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: "mongodb+srv://pablo-1991:0000122@cluster0.mlrbkpp.mongodb.net/ECOMMERCE?retryWrites=true&w=majority"
        })
    })
)

//PASSPORT
app.use(passport.initialize())  //inicializar passport
app.use(passport.session())   //passport guarda info de session

//rutas
app.use("/products", productsRouter)
app.use("/carts", cartRouter)
app.use("/realtimeproducts", realTimeProductsRouter)
app.use("/users", usersRouter)
app.use("/views", viewsRouter)
app.use('/jwt',jwtRouter)


const PORT = config.PORT
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