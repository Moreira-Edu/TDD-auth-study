import { Router } from "express";
import Users from "../services/Users.js";

const userRoute = Router();
const users = new Users();

userRoute.get("/", users.getUsers);

userRoute.post("/", users.createUser);

export default userRoute;
