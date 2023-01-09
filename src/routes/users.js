import { Router } from "express";
import {
  CreateUserController,
  GetUsersController,
} from "../services/users/usersServices.js";

const userRoute = Router();
const createUser = new CreateUserController();
const getUsers = new GetUsersController();

userRoute
  .get("/", getUsers.handle)
  .post("/", createUser.handle);

export default userRoute;
