import express from "express";
import router from "./routes/index.js";
import { insertUser } from "./database/queries.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

app.listen(port, () => {
    console.log("Running on port " + process.env.SERVER_PORT);
});
