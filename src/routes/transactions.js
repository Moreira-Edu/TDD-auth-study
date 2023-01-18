import { Router } from "express";
import {
  CreateTransactionsController,
  GetTransactionController,
  GetTransactionsController,
  UpdateTransactionsController,
  DeleteTransactionsController,
} from "../services/transactions/transactionsServices.js";

const transactionRoute = Router();
const getTransactions = new GetTransactionsController();
const createTransactions = new CreateTransactionsController();
const getTransaction = new GetTransactionController();
const updateTransactions = new UpdateTransactionsController();
const deleteTransactions = new DeleteTransactionsController();

transactionRoute
  .get("/", getTransactions.handle)
  .post("/", createTransactions.handle)
  .get("/:id", getTransaction.handle)
  .put("/:id", updateTransactions.handle)
  .delete("/:id", deleteTransactions.handle);

export default transactionRoute;
