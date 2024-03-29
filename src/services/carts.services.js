import {
    addCart,
    getCarts,
    getCartById,
    addProductToCart,
    deleteProductFromCart,
    emptyCart,
    editProductQty,
    editCart,
    completeSale,
    eraseProductFromCart
} from '../persistencia/carts.persistence.js'

export async function addCartService(newCart) {
    const cart = await addCart(newCart)
    return cart
}

export async function deleteProductFromCartService(cid, pid) {
    const cart = await deleteProductFromCart(cid, pid)
    return cart
}

export async function getCartsService() {
    const carts = await getCarts()
    return carts
}

export async function getCartByIdService(cid) {
    const cart = await getCartById(cid)
    return cart
}

export async function addProductToCartService(cid, pid, owner) {
    const editedCart = await addProductToCart(cid, pid, owner)
    return editedCart
}

export async function emptyCartService(cid) {
    const cart = await emptyCart(cid)
    return cart
}

export async function editProductQtyService(cid, pid, quantity) {
    const cart = await editProductQty(cid, pid, quantity)
    return cart
}

export async function editCartService(cid, newCart) {
    const cart = await editCart(cid, newCart)
    return cart
}

export async function completeSaleService(cid, userFulllName) {
    const sale = await completeSale(cid, userFulllName)
    return sale
}

export async function eraseProductFromCartService(cid, pid){
    const cart = await eraseProductFromCart(cid, pid)
    return cart
}