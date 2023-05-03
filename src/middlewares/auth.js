export const verificarUsuarioAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') {
        next()
    } else {
        console.log('No estas autorizado para realizar esta operacion, no sos admin')
    }
}

export const verificarUsuarioClient = (req, res, next) => {
    if (req.user?.role === 'user') {
        next()
    } else {
        console.log('No estas autorizado para realizar esta operacion, no sos usuario')
    }
}
