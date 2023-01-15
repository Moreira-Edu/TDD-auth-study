import { Router } from "express";
import { SigninController, SignupController } from "../services/auth/authServices.js";

const authRoute = Router();
const signin = new SigninController();
const signup = new SignupController();

authRoute.post("/signin", signin.handle);
authRoute.post("/signup", signup.handle);

export default authRoute;
