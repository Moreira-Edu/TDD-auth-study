import { Router } from "express";
import SigninController from "../services/auth/SigninController.js";

const signinRoute = Router();
const signin = new SigninController();

signinRoute.post("/", signin.handle);

export default signinRoute;
