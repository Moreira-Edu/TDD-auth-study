import { Router } from "express";
import SigninController from "../services/auth/signin/SigninController.js";
import SignupController from "../services/auth/signup/SiginUpController.js";

const authRoute = Router();
const signin = new SigninController();
const signup = new SignupController();

authRoute.post("/signin", signin.handle);
authRoute.post("/signup", signup.handle);

export default authRoute;
