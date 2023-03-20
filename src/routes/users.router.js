import { Router } from "express";
import passport from "passport";
import UsersManager from "../dao/mongoManagers/usersManager.js";


const router = Router()
const usersMan = new UsersManager()

// router.post("/session", (req, res) => {
//     const { username, password } = req.body
//     req.session.username = username
//     req.session.password = password
//     res.json({ message: "Sesion iniciada con exito" })
// })

// router.get("/logout", (req, res) => {
//     req.session.destroy((error) => {
//         if (error) {
//             console.log(error)
//             res.json({ message: error })
//         } else { res.json({ message: "Sesion eliminada con exito" }) }
//     })
// })

// registro sin passport
// router.post('/registro',async (req, res) => {
//   const newUser = await usersManager.createUser(req.body)
//   if (newUser) {
//     res.redirect('/views')
//   } else {
//     res.redirect('/views/errorRegistro')
//   }
// })

//registro con passport
router.post("/registro",
    passport.authenticate("registro", {
        failureRedirect: '/views/errorRegistro',
        successRedirect: '/products',
        passReqToCallback: true,
    })
)

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await usersMan.loginUser(req.body)
    if (user) {
        req.session.name = user.nombre
        req.session.email = email
        req.session.password = password
        req.session.rol = user.rol
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.rol = true
            res.redirect("/views/isAdmin")
        } else {
            req.session.rol = false
            res.redirect("/products")
        }
    } else { res.redirect("/views/errorLogin") }
})

router.get("/logout", async (req, res) => {
    req.session.destroy(error => {
        if (error) { console.log(error) }
        else { res.redirect("/views") }
    })
})

//registro con Github
router.get("/registroGithub", passport.authenticate("github", { scope: ['user:email'] })) // hace peticion a GH

router.get("/github", passport.authenticate("github"), (req, res) => {
    req.session.email = req.user.email
    res.redirect("/views/products")}) //GH devuelve la respuesta

export default router