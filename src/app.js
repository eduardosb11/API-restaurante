import express from "express";
import passport from "passport";
import session from "express-session";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use("/", router)

app.listen(process.env.SERVER_PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log("Listening on port " + process.env.SERVER_PORT);
});
