import logger from "../utils/winston.js"

export const verificarUsuarioPremiumOAdmin = (req, res, next) => {
    console.log(req.user, req.sessionID, req.session.user,res.cookie.user, req._passport.session.user)
    if (req.user?.role === 'premium' || req.user?.role === 'admin') {
        next()
    } else {
        logger.error('Debés tener rol premium o admin para realizar esta operación')
    }
}

export const verificarUsuarioPremium = (req, res, next) => {

    if (req.user?.role === 'premium') {
        next()
    } else {
        logger.error('Debés tener rol premium para realizar esta operación')
}
}

export const verificarUsuarioAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') {
        next()
    } else {
        logger.error('No estas autorizado para realizar esta operacion, no sos admin')
    }
}

export const verificarUsuarioClient = (req, res, next) => {
    if (req.user?.role === 'user') {
        next()
    } else {
        logger.error('No estas autorizado para realizar esta operacion, no sos usuario')
    }
}
