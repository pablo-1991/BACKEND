import { Router } from 'express'
import UsersManager from '../persistencia/DAO/mongoManagers/usersManager.js'
import passport from 'passport'
import { getUsersDataController, 
    forgotPasswordController, 
    createNewPasswordController, 
    changeRolController,
    getUserDataFromMailController, 
    addCartToUserController} from '../controllers/users.controller.js'


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
    }))
///////////////////////

router.post(
    '/login',
    passport.authenticate('login', {
        failureRedirect: '/views/errorLogin',
        successRedirect: '/products',
        passReqToCallback: true,
    }))


router.get("/logout", async (req, res) => {
    req.session.destroy(error => {
        if (error) { console.log(error) }
        else { res.redirect("/views/login") }
    })
})

//registro con Github
router.get("/registroGithub", passport.authenticate("github", { scope: ['user:email'] })) // hace peticion a GH

router.get("/github", passport.authenticate("github"), (req, res) => {
    req.session.email = req.user.email
    res.redirect("/products")
}) //GH devuelve la respuesta

router.get('/current', getUsersDataController)// obtiene datos del usuario
router.post('/current', getUserDataFromMailController)


//recuperar contraseña
router.post('/forgot-password', forgotPasswordController)

//Crear contraseña nueva
router.post('/create-new-password/:userId/:token', createNewPasswordController)

//premium
router.put('/premium/:uid', changeRolController)

router.put('/add-cart-to-user', addCartToUserController)

export default router