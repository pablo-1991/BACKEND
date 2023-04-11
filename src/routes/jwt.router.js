import passport from "passport"
import { Router } from "express";
import { generateToken } from "../utils.js";
import UsersManager from "../dao/mongoDB/mongoManagers/usersManager.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";

const router = Router()

const userManager = new UsersManager()

// COOKIES

// ****** generar token ******
router.post('/login', async (req, res) => {
    const user = await userManager.loginUser(req.body)
    if (user) {
        const token = generateToken(user)
        console.log("TOKEN GENERADO!");
        return res.cookie("token", token, { httpOnly: true }).json({ token })
    }
    res.json({ message: "El usuario no existe..." })
})

// ******* validar token *******
router.get("/login", jwtValidation, (req, res) => {
    res.send("TOKEN VALIDADO!")
})

// ****** devuelve usuario si existe el token *******
router.get('/current', (req, res) => {
    let token = req.cookies.token
    let user = req.cookies.user.user
    if (token) {
        res.json({ tokenFromCookie: token, userFromCookie: user })
        console.log(req.cookies)
    } else {
        console.log("ERROR! SIN TOKEN")
    }
})

export default router