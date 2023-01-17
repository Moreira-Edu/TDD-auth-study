import { Router } from "express";
import {
  CreateTransactionsController,
  GetTransactionsController,
} from "../services/transactions/transactionsServices.js";

const transactionRoute = Router();
const getTransaction = new GetTransactionsController();
const createTransactions = new CreateTransactionsController();

transactionRoute
  .get("/", getTransaction.handle)
  .post("/", createTransactions.handle);

export default transactionRoute;
