import { userModel } from "../models/users.model.js"
import { hashPassword, comparePasswords } from "../../../utils.js";

export default class UsersManager {
    async createUser(user) {
        const { email, password } = user
        try {
            const existUser = await userModel.find({ email })
            if (existUser.length === 0) {
                const hashNewPassword = await hashPassword(password)
                const newUser = { ...user, password: hashNewPassword }
                await userModel.create(newUser)
                return newUser
            } else { return null }
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }

    async loginUser(user) {
        const { email, password } = user
        const usuario = await userModel.findOne({ email })
        if (usuario) {
            const isPassword = comparePasswords(password, usuario.password)
            if (isPassword) { return usuario }
        }
        return null
    }
}