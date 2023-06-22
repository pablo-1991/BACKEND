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
import { errorMiddleware } from './utils/errors/errorsMiddleware.js'
import { createLog } from './middlewares/winston.middleware.js'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'
import { swaggerSetup } from "./swaggerSpecs.js"
import cors from "cors";

//IMPORTAR dbConfig
import './persistencia/mongodb/dbConfig.js'
//IMPORTAR passportStrategies
import "./passport/passportStrategies.js"


const app = express();

import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import realTimeProductsRouter from "./routes/views/realtimeproducts.router.js"
import usersRouter from "./routes/users.router.js"
import viewsRouter from "./routes/views/views.router.js"
import chatRouter from './routes/views/messages.router.js'
import jwtRouter from "./routes/jwt.router.js"
import loggerTestRouter from './routes/loggerTest.router.js'


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

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
            mongoUrl: "mongodb+srv://pablo-1991:0000122@cluster0.mlrbkpp.mongodb.net/ECOMMERCE?retryWrites=true&w=majority",
            collectionName: 'sessions'
        }),
        cookie: {
            maxAge: 9999999,
        }
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
app.use('/chat', chatRouter)
app.use("/views", viewsRouter)
app.use('/jwt', jwtRouter)
app.use('/loggerTest', loggerTestRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

//faker
app.use(errorMiddleware)

//logger
app.use(createLog)

const PORT = config.PORT || 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})

import MessageManager from './persistencia/DAO/mongoManagers/messageManager.js'
const messageManager = new MessageManager()

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


/* CHAT */
socketServer.on('connection', async (socket) => {
    console.log(`Cliente conectado: ${socket.id}`)
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`)
    })

    socket.emit('chat', await messageManager.getMessages());
    socket.on('update-chat', async (newMessage) => {
        await messageManager.addMessage(newMessage)
        socketServer.sockets.emit('chat', await messageManager.getMessages());
    })
})