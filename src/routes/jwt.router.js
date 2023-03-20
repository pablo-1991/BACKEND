import { Router } from "express";
import { generateToken } from "../utils.js";
import UsersManager from "../dao/mongoManagers/usersManager.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
const router = Router()

const userManager = new UsersManager()


router.post('/login', async (req, res) => {
    //const {email,password} = req.body
    const user = await userManager.loginUser(req.body)
    if (user) {
        console.log('------');
        const token = generateToken(user)
        return res.json({ token })
    }
    res.json({ message: 'Usuario no existe' })
})


router.get("/login", jwtValidation, (req, res) =>{
    res.send("PROBANDO JWT")
})


export default router