import { insertUser } from "../../database/queries.js";

async function postSignup(req, res, next) {
    try {
        await insertUser(
            req.body.username,
            req.body.password,
        );
        console.log(req.body.username,
            req.body.password,
        );

        res.json(req.body);
    } catch (err) {
        return next(err);
    }
}

export { postSignup };