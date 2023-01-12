import { Router } from "express";
import accountRoutes from "./accounts.js";
import signinRoute from "./signin.js";
import userRoute from "./users.js";

const routes = Router();

routes
  .use("/users", userRoute)
  .use("/accounts", accountRoutes)
  .use("/auth/signin", signinRoute);

export default routes;
