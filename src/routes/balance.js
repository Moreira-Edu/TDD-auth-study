import { Router } from "express";
import GetBalanceController from "../services/balance/balanceServices.js";

const balanceRouter = Router();
const getBalance = new GetBalanceController();

balanceRouter.get("/", getBalance.handle);

export default balanceRouter;
