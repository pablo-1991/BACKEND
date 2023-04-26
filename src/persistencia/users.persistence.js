import MongoDb from './DAO/mongoManagers/usersManager.js'
import { userModel } from './mongodb/models/users.model.js'


let persistence = new MongoDb('Products', userModel)

export async function createUser(user) {
    return await persistence.createUser(user)
}

export async function loginUser(user) {
    return await persistence.loginUser(user)
}

export async function getUsersData(usersMail) {
    return await persistence.getUsersData(usersMail)
}