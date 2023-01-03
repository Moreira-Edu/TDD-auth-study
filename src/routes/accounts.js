import { Router } from "express";
import Accounts from "../services/Accounts.js";

const accountRoutes = Router();
const account = new Accounts();

accountRoutes.post("/", account.createAccount);
accountRoutes.get("/", account.getAccounts);
accountRoutes.get("/:id", account.getAccount);

export default accountRoutes;
