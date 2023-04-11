import File from './fileManagers/CartManager.js'
import MongoDb from './mongoDB/mongoManagers/CartManager.js'
import {cartsModel} from './mongoDB/models/carts.model.js'
import {Command} from 'commander'

const program = new Command();
program.option('-p', 'persistence', 'memory');
program.parse();

let persistence;

let argv = program.args[0]

switch (argv) {
    case 'fs':
        persistence = new File('../files/cart.json')
        break;
        case 'mongo':
            persistence = new MongoDb('Carts', cartsModel)
            break;
    default:
        break;
}

export async function addCart(cart) {
    return await persistence.addCart(cart)
}

export async function getCarts() {
    return await persistence.getCarts()
}

export async function getCartById(cid) {
    return await persistence.getCartById(cid)
}

export async function addProductToCart(cid, pid) {
    return await persistence.addProductToCart(cid, pid)
}

export async function deleteProductFromCart(cid, pid) {
    return await persistence.deleteProductFromCart(cid, pid)
}

export async function emptyCart(cid) {
    return await persistence.emptyCart(cid)
}

export async function editProductQty(cid, pid, quantity) {
    return await persistence.editProductQty(cid, pid, quantity)
}

export async function editCart(cid, newCart) {
    return await persistence.editCart(cid, newCart)
}
