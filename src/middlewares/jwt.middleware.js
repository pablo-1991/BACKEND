import jwt from "jsonwebtoken";

export function jwtValidation(req, res, next) {
    const authHeader = req.get("Authorization")
    const token = authHeader.split(" ")[1]
    const verifiedUser = jwt.verify(token, "secretJWT")
    if (verifiedUser) {
        req.user = verifiedUser.user
        next()
    } else { res.json({ message: "Error de Autenticación" }) }
}