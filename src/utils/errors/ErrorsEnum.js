export const ErrorsName = {
    PRODUCT_DATA_INCOMPLETE: 'Error products',
    USER_DATA_INCOMPLETE: 'Error users',
    CART_DATA_INCOMPLETE: 'Error carts',

    PRODUCT_DATA_NOT_FOUND_IN_DATABASE: 'Error products',
    USER_DATA_NOT_FOUND_IN_DATABASE: 'Error users',
    CART_DATA_NOT_FOUND_IN_DATABASE: 'Error carts',

    PRODUCT_DATA_INCORRECT_TYPE: 'Error products',
    USER_DATA_INCORRECT_TYPE: 'Error users',
    CART_DATA_INCORRECT_TYPE: 'Error carts',

    PRODUCT_DATA_INCORRECT_ID: 'Error products',
    USER_DATA_INCORRECT_ID: 'Error users',
    CART_DATA_INCORRECT_ID: 'Error carts',

    PRODUCT_DATA_CODE_ALREADY_EXISTS_IN_DATABASE: 'Error products',

    PRODUCT_DATA_NOT_ENOUGH_STOCK: 'Error products',
    
    USER_DATA_INCORRECT_TOKEN: 'Error user',
    USER_DATA_NOT_ALLOWED: 'Error user'

}

export const ErrorsMessage = {
    PRODUCT_DATA_INCOMPLETE: 'Request failed. Valid properties required',
    USER_DATA_INCOMPLETE: 'Request failed. Valid properties required',
    CART_DATA_INCOMPLETE: 'Request failed. Valid properties required',

    PRODUCT_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database',
    USER_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database',
    CART_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database',

    PRODUCT_DATA_INCORRECT_TYPE: 'Request failed. Only numbers accepted',
    USER_DATA_INCORRECT_TYPE: 'Request failed. Only numbers accepted',
    CART_DATA_INCORRECT_TYPE: 'Request failed. Only numbers accepted',

    PRODUCT_DATA_INCORRECT_ID: 'Request failed. ID must have 24 characters.',
    USER_DATA_INCORRECT_ID: 'Request failed. ID must have 24 characters.',
    CART_DATA_INCORRECT_ID: 'Request failed. ID must have 24 characters.',

    PRODUCT_DATA_CODE_ALREADY_EXISTS_IN_DATABASE: 'Request failed. This product already exists in database. Please change the product code.',

    PRODUCT_DATA_NOT_ENOUGH_STOCK: 'Request failed. This product has not enough stock.',
    USER_DATA_INCORRECT_TOKEN: 'Request failed. Incorrect or expired token',
    USER_DATA_NOT_ALLOWED: 'Request failed. You do not have permissions for this operation.'
}

export const ErrorsCause = {
    PRODUCT_DATA_INCOMPLETE: 'Properties missing',
    USER_DATA_INCOMPLETE: 'Properties missing',
    CART_DATA_INCOMPLETE: 'Properties missing',

    PRODUCT_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Cause: Not found in database.',
    USER_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database',
    CART_DATA_NOT_FOUND_IN_DATABASE: 'Request failed. Not found in database',

    PRODUCT_DATA_INCORRECT_TYPE: 'Request failed. Incorrect Data type of ',
    USER_DATA_INCORRECT_TYPE: 'Request failed. Incorrect Data type of',
    CART_DATA_INCORRECT_TYPE: 'Request failed. Incorrect Data type of',

    PRODUCT_DATA_INCORRECT_ID: 'Request failed. Invalid ID',
    USER_DATA_INCORRECT_ID: 'Request failed. Invalid ID',
    CART_DATA_INCORRECT_ID: 'Request failed. Invalid ID',

    PRODUCT_DATA_CODE_ALREADY_EXISTS_IN_DATABASE: 'Request failed. Product code already exists in database.',

    PRODUCT_DATA_NOT_ENOUGH_STOCK: 'Request failed. Not enough product\'s stock.',
    USER_DATA_INCORRECT_TOKEN: 'Request failed. Expired token',
    USER_DATA_NOT_ALLOWED: 'Request failed. Missing permissions.'
}