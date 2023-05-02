import {
    createUser,
    loginUser,
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