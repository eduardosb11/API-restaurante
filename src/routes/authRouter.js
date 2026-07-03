import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import { selectUserById, selectUserByName } from "../database/queries.js";
import { postLogin } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", passport.authenticate("local", {
    failureMessage: true,
}), postLogin);

authRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
    });
    res.send();
});

passport.use(
    new LocalStrategy(async (username, password, done) => {        
        try {
            const user = await selectUserByName(username);
            
            if (!user) {
                return done(null, false, { message: "Incorrect username or password" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
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