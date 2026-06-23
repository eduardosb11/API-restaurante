import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { selectUserById, selectUserByName } from "../database/queries.js";

const authRouter = express.Router();

authRouter.post("/login", passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/",
    failureMessage: true,
}));
authRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
    });
    res.redirect("/");
});

passport.use(
    new LocalStrategy(async (username, password, done) => {        
        try {
            const user = await selectUserByName(username);
            
            if (!user) {
                return done(null, false, { message: "Incorrect username or password" });
            }
            if (user.password !== password) {
                return done(null, false, { message: "Incorrect username or password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {    
    try {
        const user = await selectUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default authRouter;