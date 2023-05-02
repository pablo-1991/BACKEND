import passport from "passport";
import { userModel } from "../persistencia/mongodb/models/users.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashPassword, comparePasswords } from "../utils.js";
import UsersDBDTO from "../persistencia/DTO/usersDB.dto.js";
import config from "../config.js";

passport.use(
    "registro",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const { first_name, last_name, age } = req.body;
                if (!first_name || !last_name || !age) {
                    return done(null, false);
                }
                const user = await userModel.findOne({ email });
                if (user) {
                    return done(null, false);
                }
                let userRole;
                if (email == config.ADMIN_EMAIL) { userRole = "admin"; } else { userRole = "user"; }
                const hashNewPassword = await hashPassword(password);
                const userFromDto = new UsersDBDTO(req.body);
                const newUser = {
                    ...userFromDto,
                    password: hashNewPassword,
                    role: userRole,
                };
                const newuserBD = await userModel.create(newUser);
                done(null, newuserBD);
            } catch (error) {
                done(error);
            }
        }));

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const user = await userModel.findOne({ email });
                if (user) {
                    console.log(user);
                    const isPassword = await comparePasswords(password, user.password);
                    if (isPassword) {
                        console.log("Login realizado con éxito");
                        req.session.fullName = user.full_name;
                        req.session.email = user.email;
                        req.session.password = user.password;
                        req.session.role = user.role;
                        req.user = user;
                        return done(null, user);
                    } else {
                        console.log("contraseñas no coinciden");
                        return done(null, false);
                    }
                } else {
                    console.log("el usuario no existe");
                    return done(null, false);
                }
            } catch (error) {
                done(error);
            }
        }));


// Github Strategy
passport.use("github", new GithubStrategy({
    clientID: "Iv1.45d783c7a599a2ca",
    clientSecret: "a108ec87ba29e418dd9bf54e2e569f9eb4998b30",
    callbackURL: "http://localhost:8080/users/github",
},
    async (accessToken, refreshToken, profile, done) => {
        const user = await userModel.findOne({ email: profile._json.email })
        if (!user) {
            console.log(profile);
            const newUser = {
                nombre: profile._json.name.split(" ")[0],
                apellido: profile._json.name.split(" ")[1] || " ",
                email: profile._json.email,
                password: " ",
                edad: 0,
                cartId: 0,
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
