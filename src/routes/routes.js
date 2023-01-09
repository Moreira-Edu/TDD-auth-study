import { Router } from "express";
import accountRoutes from "./accounts.js";
import userRoute from "./users.js";

const routes = Router();

routes
  .use("/users", userRoute)
  .use("/accounts", accountRoutes);

export default routes;
