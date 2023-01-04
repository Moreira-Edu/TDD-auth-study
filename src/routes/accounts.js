import { Router } from "express";
import Accounts from "../services/Accounts.js";

const accountRoutes = Router();
const account = new Accounts();

accountRoutes.post("/", account.createAccount);
accountRoutes.get("/", account.getAccounts);
accountRoutes.get("/:id", account.getAccount);
accountRoutes.put("/:id", account.updateAccount);
accountRoutes.delete("/:id", account.deleteAccount);

export default accountRoutes;
