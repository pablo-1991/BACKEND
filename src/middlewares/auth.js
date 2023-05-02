export const verificarUsuarioAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') {
        next()
    } else {
        res.json({ message: 'No estas autorizado para realizar esta operacion' }).status(401)
    }
}

export const verificarUsuarioClient = (req, res, next) => {
    if (req.user?.role === 'user') {
        next()
    } else {
        res.json({ message: 'No estas autorizado para realizar esta operacion' }).status(401)
    }
}





export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/errorLogin');
};

export const isAuthorized = (req, res, next) => {
    const statusRol = req.user && req.user.rol;
    if (statusRol) {
        if (
            statusRol === 'user' ||
            statusRol === undefined ||
            statusRol === 'undefined' ||
            statusRol === null
        ) {
            return res.status(403).redirect('/errorAuthorization'); 
        }
        return next(); 
    }
    return res.redirect('/errorAuthorization');

};