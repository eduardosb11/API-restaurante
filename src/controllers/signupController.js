import { insertUser } from "../database/queries.js";
import bcrypt from "bcryptjs";

async function postSignup(req, res, next) {
    try {
        const hashsedPassword = await bcrypt.hash(req.body.password, 10);
        await insertUser(
            req.body.username,
            hashsedPassword,
        );
        res.json(req.body);
    } catch (err) {
        return next(err);
    }
}

export { postSignup };