import passport from "passport";
import { userModel } from "../dao/models/users.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashPassword } from "../utils.js";

passport.use("registro", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, async (req, email, password, done) => {
    const user = await userModel.findOne({email})
    if (user) {
        return done(null, false)
    }
    const hashNewPassword = await hashPassword(password)
    const newUser = { ...req.body, password: hashNewPassword }
    const newuserBD = await userModel.create(newUser)
    done(null, newuserBD)
}))

// Github Strategy
passport.use("github", new GithubStrategy({
    clientID: "Iv1.45d783c7a599a2ca",
    clientSecret: "a108ec87ba29e418dd9bf54e2e569f9eb4998b30",
    callbackURL: "http://localhost:8080/users/github"
},
    async (accessToken, refreshToken, profile, done) => {
        const user = await userModel.findOne({ email: profile._json.email })
        if (!user) {
            const newUser = {
                nombre: profile._json.name.split(" ")[0],
                apellido: profile._json.name.split(" ")[1] || " ",
                email: profile._json.email,
                password: " ",
            }
            const userDB = await userModel.create(newUser)
            done(null, userDB)
        } else { done(null, user) }
    }))


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id)
    done(null, user)
});
