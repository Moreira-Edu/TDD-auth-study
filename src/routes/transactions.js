import { Router } from "express";
import {
  CreateTransactionsController,
  GetTransactionController,
  GetTransactionsController,
  UpdateTransactionsController,
} from "../services/transactions/transactionsServices.js";

const transactionRoute = Router();
const getTransactions = new GetTransactionsController();
const createTransactions = new CreateTransactionsController();
const getTransaction = new GetTransactionController();
const updateTransactions = new UpdateTransactionsController();

transactionRoute
  .get("/", getTransactions.handle)
  .post("/", createTransactions.handle)
  .get("/:id", getTransaction.handle)
  .put("/:id", updateTransactions.handle);

export default transactionRoute;
