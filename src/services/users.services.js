import UsersRepository from '../persistencia/repositories/users.repositories.js'
import {
    createUser,
    loginUser,
    //getUsersData
} from '../persistencia/users.persistence.js'


export async function createUserService(user){
    const newUser = await createUser(user)
    return newUser
}

export async function loginUserService(user){
    const newUser = await loginUser(user)
    return newUser
}

export async function getUsersDataService(userFromSession){
    //   const userFromDTO = new UsersRepository(user)
   //acá da la vuelta, poner DTO
       //const usersData = await getUsersData(userFromSession)
    return userFromSession
}