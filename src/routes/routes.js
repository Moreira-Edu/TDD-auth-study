import { Router } from "express";
import userRoute from "./users.js";

const routes = Router();

routes.use("/users", userRoute);

export default routes;
