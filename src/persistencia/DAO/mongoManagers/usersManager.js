import { userModel } from '../../mongodb/models/users.model.js'
import { hashPassword, comparePasswords } from '../../../utils.js'
import config from '../../../config.js'
import UsersRepository from '../../repositories/users.repositories.js'

export default class UsersManager {

    async createUser(user) {
        console.log('aqui', user)
        const userFromDTO = new UsersRepository(user)
        const { email, password } = userFromDTO
        try {
            const existeUsuario = await userModel.find({ email })
            if (existeUsuario.length === 0) {
                const hashNewPassword = await hashPassword(password)
                let newUser = { ...userFromDTO, password: hashNewPassword }
                if (email === config.ADMIN_EMAIL) { newUser = { ...newUser, role: 'admin' } }
                await userModel.create(newUser)
                return newUser
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async loginUser(user) {
        console.log(user)
        const { username, password } = user
        const usuario = await userModel.find({ email: username })
        console.log(usuario)
        if (usuario) {
            const isPassword = await comparePasswords(password, usuario[0].password)
            if (isPassword) {
                return usuario
            }
        } else {
            return null
        }
    }
    async getUsersData(usersMail) {
        const usersData = await userModel.find({ email: usersMail })
        return usersData
    }
}