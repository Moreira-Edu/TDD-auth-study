import { Router } from "express";
import {
  CreateUserController,
  GetUsersController,
  GetUserController,
} from "../services/users/usersServices.js";

const userRoute = Router();
const createUser = new CreateUserController();
const getUsers = new GetUsersController();
const getUser = new GetUserController();

userRoute
  .get("/", getUsers.handle)
  .get("/:id", getUser.handle)
  .post("/", createUser.handle);

export default userRoute;
