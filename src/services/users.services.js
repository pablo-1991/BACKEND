import {
    createUser,
    loginUser,
    forgotPassword,
    createNewPassword,
    changeRol
} from '../persistencia/users.persistence.js'



export async function createUserService(user) {
    const newUser = await createUser(user)
    return newUser
}

export async function loginUserService(user) {
    const newUser = await loginUser(user)
    return newUser
}

export async function getUsersDataService(userFromSession) {
    return userFromSession
}

export async function forgotPasswordService(mail) {
    const user = await forgotPassword(mail)
    return user
}

export async function createNewPasswordServices(password, userId, token) {
    const user = await createNewPassword(password, userId, token)
    return user
}

export async function changeRolServices(userId) {
    const user = await changeRol(userId)
    return user
}