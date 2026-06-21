import express from "express";
import { postSignup } from "../controllers/users/signupController.js";

const usersRouter = express.Router();

usersRouter.post("/signup", postSignup);

export default usersRouter;