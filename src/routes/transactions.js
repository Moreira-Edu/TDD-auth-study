import { Router } from "express";
import {
  CreateTransactionsController,
  GetTransactionController,
  GetTransactionsController,
} from "../services/transactions/transactionsServices.js";

const transactionRoute = Router();
const getTransactions = new GetTransactionsController();
const createTransactions = new CreateTransactionsController();
const getTransaction = new GetTransactionController();

transactionRoute
  .get("/", getTransactions.handle)
  .get("/:id", getTransaction.handle)
  .post("/", createTransactions.handle);

export default transactionRoute;
