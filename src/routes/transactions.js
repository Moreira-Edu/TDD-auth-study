import { Router } from "express";
import {
  CreateTransactionsController,
  GetTransactionController,
  GetTransactionsController,
  UpdateTransactionsController,
  DeleteTransactionsController,
} from "../services/transactions/transactionsServices.js";
import TransactionValidationController from "../middleware/validation/transactionsValidationController.js";

const transactionRoute = Router();
const getTransactions = new GetTransactionsController();
const createTransactions = new CreateTransactionsController();
const getTransaction = new GetTransactionController();
const updateTransactions = new UpdateTransactionsController();
const deleteTransactions = new DeleteTransactionsController();
const transactionValidate = new TransactionValidationController();

transactionRoute
  .get("/", getTransactions.handle)
  .post("/", createTransactions.handle)
  .param("id", transactionValidate.handle)
  .get("/:id", getTransaction.handle)
  .put("/:id", updateTransactions.handle)
  .delete("/:id", deleteTransactions.handle);

export default transactionRoute;
