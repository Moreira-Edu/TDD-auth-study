import { Router } from "express";
import accountRoutes from "./accounts.js";
import authRoute from "./auth.js";
import userRoute from "./users.js";
import passport from "../middleware/auth/passport.js";

const routes = Router();

routes
  .use("/auth", authRoute)
  .use(passport.authenticate("jwt", { session: false }))
  .use("/users", userRoute)
  .use("/accounts", accountRoutes);

export default routes;
