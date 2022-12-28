import { Router } from "express";

const userRoute = Router();

userRoute.get("/", (req, res) => {
  const users = [{ name: "John Doe", email: "john@email.com" }];
  res.status(200).json(users);
});

userRoute.post("/", (req, res) => {
  res.status(201).json(req.body);
});

export default userRoute;
