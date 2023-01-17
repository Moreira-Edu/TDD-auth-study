import { Router } from "express";
import { GetTransactionsController } from "../services/transactions/transactionsServices.js";

const transactionRoute = Router();
const getTransaction = new GetTransactionsController();

transactionRoute.get("/", getTransaction.handle);

export default transactionRoute;
