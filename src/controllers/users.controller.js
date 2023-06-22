import {
    createUserService,
    loginUserService,
    getUsersDataService,
    forgotPasswordService,
    createNewPasswordServices,
    changeRolServices,
    getUserDataFromMailService,
    addCartToUserService,
    uploadFilesService,
    logoutService,
    getUsersService,
    deleteUsersService
} from "../services/users.services.js";
import { generateToken } from "../utils.js";
import logger from "../utils/winston.js";
import UsersManager from "../persistencia/DAO/mongoManagers/usersManager.js";
const usersManager = new UsersManager();


export const getUsersController = async (req, res) => {
    try {
        const response = await getUsersService()
        res.json({ message: 'Users got successfully', users: response })
    } catch (error) {
        logger.error('Error del controller', error)
    }
}

export const getUsersDataController = async (req, res) => {
    try {
        const user = req.user;
        console.log('entra', user)
        console.log("mail de usuario", user.email);
        res.json({ usersMail: user.email, userFullname: user.full_name, user, existUser: true });
    } catch (error) {
        logger.error('Error del controller', error)
    }
};

export const getUserDataFromMailController = async (req, res) => {
    const email = req.body
    try {
        const response = await getUserDataFromMailService(email)
        res.json({ user: response })
    } catch (error) {
        console.log('error');
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const mail = req.body.email;
        console.log("mail", mail);
        if (req.body.email == "") {
            res.status(400).send({ message: "Se requiere un mail" });
        } else {
            const user = await forgotPasswordService(mail);
            res.send({ mensaje: "email enviado con éxito", user });
        }
    } catch (error) {
        logger.error('Error del controller', error)
    }
};

export const createNewPasswordController = async (req, res) => {
    console.log(req.body.password);
    console.log(req.params.userId, req.params.token);
    let regExPassword =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])([A-Za-z\d@$!%*?&#]){8,16}&/;
    try {
        const user = await createNewPasswordServices(
            req.body.password,
            req.params.userId,
            req.params.token
        );
        console.log(user);
        res.json({ message: 'Password update successfully', user });
    } catch (error) {
        logger.error('Error del controller', error)
    }
};

export const changeRolController = async (req, res) => {
    const userId = req.params.uid
    try {
        const response = await changeRolServices(userId)
        console.log(response)
        if (response) {
            res.json({ message: 'Role updated successfully', user: response });
        } else {
            res.json({ message: 'Could not change rol. User must upload documentation.' })
        }
    } catch (error) {
        console.log("error");
    }
}

export const addCartToUserController = async (req, res) => {
    const userId = req.body.uid
    const cartId = req.body.cid
    try {
        const user = await addCartToUserService(userId, cartId)
        console.log(user)
        res.json({ message: 'User update successfully' });
    } catch (error) {
        console.log("error");
    }
}

export const uploadFilesController = async (req, res) => {
    const userId = req.params.uid
    const documents = req.files

    let documentsUploaded = []

    if (documents?.profile) {
        documents.profile.forEach(el => {
            documentsUploaded.push({ name: el.filename, reference: el.path })
        })
    }

    if (documents?.product) documents.product.forEach(el => {
        documentsUploaded.push({ name: el.filename, reference: el.path })
    })

    if (documents?.documents) {
        documents.document.forEach(el => {
            documentsUploaded.push({ name: el.filename, reference: el.path })
        })
    }

    try {
        const user = await uploadFilesService(userId, documentsUploaded)
        console.log(user)
        res.json({ message: 'Documents uploaded successfully' });
    } catch (error) {
        logger.error('Error del controller', error)
    }
}


export const loginSuccessController = async (req, res) => {
    console.log("aca", req.user); //funciona

    try {
        //----- Autenticación de usuarios ---
        const token = generateToken(req.user);
        logger.info("token generado con éxito", token); 
        console.log("token generado con éxito", token);

        res
            .cookie("token", token, { httpOnly: true })
            .json({
                existUser: true,
                message: "Login realizado con éxito",
                user: req.user,
                token,
            })
            .send(req.session.sessionID);
    } catch (error) {
        logger.error('Error del controller', error)
    }
}

export const loginController = async (req, res) => {

    try {
        console.log("aqui", req.user); 
        res
            .json({ responseTime: response })
            .cookie("cookie-prueba", "PABLO")
            .redirect("/users/login/success", req.user) 

    } catch (error) {
        logger.error('Error del controller', error)
    }
}

export const logoutController = async (req, res) => {
    req.session.destroy(async (error) => {
        if (error) {
            logger.error('Error del controller', error)
            res.json({ success: false, message: "Error en el logout" });
        } else {
            const time = new Date();
            const response = await logoutService(req.user, time)
            res.json({ success: true, message: `Logout realizado con éxito el ${response}` });
        }
    });
}

export const deleteUsersController = async (req, res) => {
    try {
        const response = await deleteUsersService()
        res.json({ message: response })
    } catch (error) {
        logger.error('Error del controller', error)
    }
}