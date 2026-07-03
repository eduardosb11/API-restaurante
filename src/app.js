import express from "express";
import passport from "passport";
import session from "express-session";
import pgSimple from "connect-pg-simple";
import router from "./routes/index.js";
import pool from "./database/pool.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pgSession = pgSimple(session);
app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.session());

app.use("/", router)

app.listen(process.env.SERVER_PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log("Listening on port " + process.env.SERVER_PORT);
});
