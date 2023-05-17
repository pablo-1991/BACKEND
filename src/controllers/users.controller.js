import {
    forgotPasswordService,
    createNewPasswordServices,
    changeRolServices
} from '../services/users.services.js'


export const logoutController = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
            res.json({ message: error });
        } else {
            res.redirect("/views/login");
        }
    });
};

export const getUsersDataController = async (req, res) => {
    try {
        const user = req.user;
        console.log("mail de usuario", user.email);
        res.json({ usersMail: user.email, userFullname: user.full_name });
    } catch (error) {
        console.log("error");
    }
};

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
        console.log("error");
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
        console.log("error");
    }
};

export const changeRolController = async (req, res) => {
    const userId = req.params.uid
    try {
        const user = await changeRolServices(userId)
        console.log(user)
        res.json({ message: 'Role update successfully' });
    } catch (error) {
        console.log("error");
    }}