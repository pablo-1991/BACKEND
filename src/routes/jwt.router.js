import { Router } from "express";
import { generateToken } from "../utils.js";
import UsersManager from '../persistencia/DAO/mongoManagers/usersManager.js'
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import logger from "../utils/winston.js";

const router = Router()

const userManager = new UsersManager()

// COOKIES

// ****** generar token ******
router.post('/login', async (req, res) => {
    const user = await userManager.loginUser(req.body)
    if (user) {
        const token = generateToken(user)
        logger.info("token generado con éxito");
        return res.cookie("token", token, { httpOnly: true }).json({ token })
    }
    res.json({ message: "El usuario no existe..." })
})

// ******* validar token *******
router.get("/login", jwtValidation, (req, res) => {
    logger.info("Token validado");
    res.send("TOKEN VALIDADO!")
})

// ****** devuelve usuario si existe el token *******
router.get('/current', (req, res) => {
    let token = req.cookies.token
    let user = req.cookies.user.user
    if (token) {
        res.json({ tokenFromCookie: token, userFromCookie: user })
    } else {
        logger.error("ERROR! SIN TOKEN")
    }
})

export default router