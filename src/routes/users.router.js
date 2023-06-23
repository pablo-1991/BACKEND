import { Router } from 'express'
import UsersManager from '../persistencia/DAO/mongoManagers/usersManager.js'
import passport from 'passport'
import { upload } from "../middlewares/multer.js";
import {
    getUsersDataController,
    forgotPasswordController,
    createNewPasswordController,
    changeRolController,
    getUserDataFromMailController,
    addCartToUserController,
    uploadFilesController,
    loginSuccessController,
    loginController,
    logoutController,
    getUsersController,
    deleteUsersController,
    changeRolByAdminController
} from '../controllers/users.controller.js'


const router = Router()
const usersMan = new UsersManager()


//registro con passport
router.post("/registro",
    passport.authenticate("registro", {
        failureRedirect: "/users/registro/error",
        successRedirect: "/users/registro/success",
        passReqToCallback: true,
    })
);

router.get("/registro/success", (req, res) => {
    res.json({ success: true, message: "Usuario registrado con éxito" });
});

router.get("/registro/error", (req, res) => {
    res.json({ success: false, message: "Registro incorrecto" });
});
///////////////////////

router.post(
    '/login',
    passport.authenticate('login', {
        failureRedirect: "/users/login/error",
        successRedirect: '/users/login/success',
        passReqToCallback: true,
        session: true,
        
    }),
    loginController
);

router.get("/login/success", loginSuccessController);
router.get("/login/error", async (req, res) => {
    res.json({ existUser: false, message: "Usuario o contraseña incorrectos" });
});

router.get("/logout", logoutController);

//registro con Github
router.get("/registroGithub", passport.authenticate("github", { scope: ['user:email'] })) // hace peticion a GH

router.get("/github", passport.authenticate("github"), (req, res) => {
    req.session.email = req.user.email
    res.redirect("/users/login/success")
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

const cpUpload = upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "product", maxCount: 3 },
    { name: "document", maxCount: 3 },
]);
router.post("/:uid/documents", cpUpload, uploadFilesController);
router.get('/', getUsersController)

// Elimina usuarios sin conexión de las ultimas 48hs ---
router.delete('/', deleteUsersController)
// Cambia el rol de un usuario ---
router.put("/change-rol", changeRolByAdminController);

export default router