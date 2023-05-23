import MongoDb from './DAO/mongoManagers/usersManager.js'
import { userModel } from './mongodb/models/users.model.js'

let persistence = new MongoDb('Products', userModel)

export async function loginUser(user) {
    return await persistence.loginUser(user)
}
export async function createUser(user) {
    return await persistence.createUser(user)
}
export async function forgotPassword(mail) {
    return await persistence.forgotPassword(mail)
}
export async function createNewPassword(password, userId, token) {
    return await persistence.createNewPassword(password, userId, token)
}
export async function changeRol(userId) {
    return await persistence.changeRol(userId)
}
export async function getUserDataFromMail(email){
    return await persistence.getUserDataFromMail(email)
}
export async function addCartToUser(uid, cid) {
    return await persistence.addCartToUser(uid,cid)
}