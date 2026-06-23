import express from "express";
import usersRouter from "./usersRouter.js";
import authRouter from "./authRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);

export default router;