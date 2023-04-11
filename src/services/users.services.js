import { createUser, loginUser } from '../dao/users.persistence.js'


export async function createUserService(user) {
    const newUser = await createUser(user)
    return newUser
}

export async function loginUserService(user) {
    const newUser = await loginUser(user)
    return newUser
}