import { userModel } from "../../mongodb/models/users.model.js";
import { hashPassword, comparePasswords, generateToken } from "../../../utils.js";
import config from "../../../config.js";
import UsersRepository from "../../repositories/users.repositories.js";
import { faker } from "@faker-js/faker";
import CustomError from "../../../utils/errors/CustomError.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import logger from "../../../utils/winston.js";
import {
    ErrorsCause,
    ErrorsMessage,
    ErrorsName,
} from "../../../utils/errors/ErrorsEnum.js";


export default class UsersManager {

    async getUsers() {
        try {
            const users = await userModel.find()
            if (!users) {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                });
            }

            return users
        } catch (error) {
            logger.error("Error", error);
            throw new Error(error);
        }
    }

    async createUser(user) {
        if (!user) {
            CustomError.createCustomError({
                name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
                message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
            });
        }
        const userFromDTO = new UsersRepository(user);
        const { email, password } = userFromDTO;
        try {
            const existeUsuario = await userModel.find({ email });
            if (existeUsuario.length !== 0) {
                const hashNewPassword = await hashPassword(password);
                let newUser = { ...userFromDTO, password: hashNewPassword };
                if (email === config.ADMIN_EMAIL) {
                    newUser = { ...newUser, role: "admin" };
                }
                await userModel.create(newUser);
                return newUser;
            } else {
                return null;
            }
        } catch (error) {
            logger.error("ERROR", error);
            throw new Error(error);
        }
    }

    async loginUser(user) {
        if (!user) {
            CustomError.createCustomError({
                name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
                message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
            });
        }
        const { username, password } = user;
        const usuario = await userModel.find({ email: username });
        if (!usuario) {
            CustomError.createCustomError({
                name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
                message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
            });
        }
        if (usuario) {
            const isPassword = await comparePasswords(password, usuario[0].password);
            if (isPassword) {
                // AUTENTICACION:
                const token = generateToken(user)
                console.log('token generado con éxito', token)
                res.cookie('token', token, { httpOnly: true }).json({ token })
                //
                return usuario;
            }
        } else {
            return null;
        }
    }

    async forgotPassword(email) {
        try {
            let user = await userModel.find({ email });
            if (!user) {
                return CustomError.createCustomError({
                    name: ErrorsName.USER_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.USER_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.USER_DATA_NOT_FOUND_IN_DATABASE,
                });
            }
            const token = jwt.sign({ id: user._id }, "nuevaContraseña", { expiresIn: "1h" });

            await userModel.findByIdAndUpdate(
                { _id: user[0]._id },
                { tokenResetPassword: token }
            );

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: `${config.GMAIL_USER}`,
                    pass: `${config.GMAIL_PASSWORD}`,
                },
            });
            const emailPort = config.EMAIL_PORT || 8080;

            const mailOptions = {
                from: "pablodpalumbo@gmail.com",
                to: `${user[0].email}`,
                subject: "LINK PARA RECUPERAR CUENTA",
                html: `<a href='http://localhost:${emailPort}/views/resetpassword/${user[0]._id}/${token}'><button>Recuperar contraseña</button></a>`,
            };

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    logger.error("Error al enviar el mail", err);
                } else {
                    logger.info("Respuesta del mail", response);
                    response
                        .status(200)
                        .json("El email para la recuperación ha sido enviado");
                }
            });
            return user;
        } catch (error) {
            logger.error("Error", error);
        }
    }

    async createNewPassword(newPassword, userId, token) {
        console.log("desde el manager", userId, "token", token);
        try {
            const user = await userModel.find({ _id: userId });

            if (!user) {
                return CustomError.createCustomError({
                    name: ErrorsName.USER_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.USER_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.USER_DATA_NOT_FOUND_IN_DATABASE,
                });
            }

            if (user[0].tokenResetPassword !== token) {
                return CustomError.createCustomError({
                    name: ErrorsName.USER_DATA_INCORRECT_TOKEN,
                    cause: ErrorsCause.USER_DATA_INCORRECT_TOKEN,
                    message: ErrorsMessage.USER_DATA_INCORRECT_TOKEN,
                });
            }
            const hashNewPasswordUpdated = await hashPassword(newPassword);
            await userModel.findByIdAndUpdate(
                { _id: userId },
                { password: hashNewPasswordUpdated }
            );
            const userUpdated = await userModel.find({ _id: userId });
            return userUpdated
        } catch (error) {
            logger.error("Error", error);
        }
    }
    async changeRol(userId) {
        try {
            const user = await userModel.find({ _id: userId });

            if (!user) {
                return CustomError.createCustomError({
                    name: ErrorsName.USER_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.USER_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.USER_DATA_NOT_FOUND_IN_DATABASE,
                });
            }
            let newUser;

            if (user[0].role === "admin" && user[0].documents.length > 0) {
                newUser = await userModel.findByIdAndUpdate(
                    { _id: userId },
                    { role: 'premium' }
                );

                logger.info('Rol cambiado con éxito')
            } else {
                logger.error('El usuario no ha cargado documentación. No puede cambiar a premium.')
            }
            return newUser
        } catch (error) {
            logger.error("Error", error);
        }
    }
    async getUserDataFromMail(email) {
        console.log('mail que llega', email)
        try {
            const user = await userModel.find({ email: email.mail });
            logger.info('user del manager', user)
            if (!user) {
                return CustomError.createCustomError({
                    name: ErrorsName.USER_DATA_NOT_FOUND_IN_DATABASE,
                    cause: ErrorsCause.USER_DATA_NOT_FOUND_IN_DATABASE,
                    message: ErrorsMessage.USER_DATA_NOT_FOUND_IN_DATABASE,
                });
            }
            return user[0]
        } catch (error) {
            logger.error("Error", error);
        }
    }

    async addCartToUser(uid, cid) {
        console.log(uid, cid)
        try {
            const userWithCart = await userModel.findByIdAndUpdate(
                uid,
                {
                    cartId: cid,
                },
                { new: true })
            return userWithCart
        } catch (error) {
            logger.error("Error", error);
        }
    }
    async uploadFiles(uid, docs) {
        console.log(uid)
        console.log(docs)
        try {
            const updatedUser = await userModel.findByIdAndUpdate(
                uid,
                {
                    documents: docs
                },
                { new: true }
            );

            return updatedUser;
        } catch (error) {
            logger.error("Error", error);
            throw new Error(error);
        }
    }
    async login(user, time) {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(
                user._id,
                {
                    lastConnection: time
                },
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            logger.error("Error", error);
            throw new Error(error);
        }
    }
    async logout(user, time) {
        console.log('user del manager logout', user)
        logger.info('del manager logout user y time', user, time)
        try {
            const updatedUser = await userModel.findByIdAndUpdate(
                user._id,
                {
                    lastConnection: time
                },
                { new: true }

            );
            console.log('del manager updatedUser', updatedUser)

            return updatedUser.lastConnection;
        } catch (error) {
            logger.error("Error", error);
            throw new Error(error);
        }
    }
    async deleteUsers() {
        try {
            const users = await userModel.find({})

            const now = Date.parse(new Date());
            const fortyEightHsInMs = 172800000;
            let lastTimeMs;
            const deletedDisconnected = []
            const deletedNotLogged = []

            for (let i = 0; i < users.length; i++) {

                if (users[i].lastConnection !== "0") {
                    let lastTime = users[i].lastConnection
                    lastTimeMs = Date.parse(lastTime)

                    if (now - lastTimeMs > fortyEightHsInMs) {
                        info.logger(`Usuario no vigente, se elimina: ${users[i].email}`)
                        deletedDisconnected.push(users[i].email)
                        await userModel.deleteOne({ email: users[i].email })

                        const transporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                user: `${config.GMAIL_USER}`,
                                pass: `${config.GMAIL_PASSWORD}`,
                            },
                        });
                        const emailPort = config.EMAIL_PORT || 8080;

                        const mailOptions = {
                            from: "pablodpalumbo@gmail.com",
                            to: `${users[i].email}`,
                            subject: "Eliminación de cuenta por inactividad",
                            text: 'Su cuenta ha sido eliminada por inactividad.',
                        };

                        transporter.sendMail(mailOptions, (err, response) => {
                            if (err) {
                                logger.error("Error al enviar el mail", err);
                            } else {
                                logger.info("Respuesta del mail", response);
                                response
                                    .status(200)
                                    .json("El email que informa al usuario que ha sido eliminado ha sido enviado");
                            }
                        });

                    } else { logger.info(`Usuario vigentes: ${users[i].email}`) }

                } else {
                    logger.info(`Usuario registrado, nunca loggeado. Se elimina: ${users[i].email}`)
                    deletedNotLogged.push(users[i].email)
                    await userModel.deleteOne({ email: users[i].email })

                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: `${config.GMAIL_USER}`,
                            pass: `${config.GMAIL_PASSWORD}`,
                        },
                    });
                    const emailPort = config.EMAIL_PORT || 8080;

                    const mailOptions = {
                        from: "pablodpalumbo@gmail.com",
                        to: `${users[i].email}`,
                        subject: "ELIMINACION DE CUENTA POR NUNCA HABER INGRESADO",
                        text: 'Su cuenta ha sido eliminada por haberse registrado pero no haber ingresado.'
                    };

                    transporter.sendMail(mailOptions, (err, response) => {
                        if (err) {
                            logger.error("Error al enviar el mail", err);
                        } else {
                            logger.info("Respuesta del mail", response);
                            response
                                .status(200)
                                .json("El email que informa al usuario que ha sido eliminado ha sido enviado");
                        }
                    })
                }
            }
            const newUsers = await userModel.find()
            return { message: 'Users deleted successfully', deletedDisconnected, deletedNotLogged, remainUsers: newUsers }
        } catch (error) {
            logger.error("Error", error);
            throw new Error(error);
        }
    }
}







