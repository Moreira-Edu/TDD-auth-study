import { Router } from "express";
import Accounts from "../services/Accounts.js";

const accountRoutes = Router();
const account = new Accounts();

accountRoutes.post("/", account.createAccount);

export default accountRoutes;
