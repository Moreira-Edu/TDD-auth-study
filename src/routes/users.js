import { Router } from "express";
import database from "../database/index.js";

const userRoute = Router();

userRoute.get("/", async (req, res) => {
  const users = await database("users").select();

  res.status(200).json(users);
});

userRoute.post("/", async (req, res) => {
  const user = await database("users").insert(req.body, "*");
  res.status(201).json(user[0]);
});

export default userRoute;
