import { Router } from "express";
import AccountValidationController from "../middleware/validation/AccountValidationController.js";
import {
  CreateAccountController,
  DeleteAccountController,
  GetAccountController,
  GetAccountsController,
  UpdateAccountController,
} from "../services/accounts/accountsServices.js";

const accountRoutes = Router();
const createAccount = new CreateAccountController();
const getAccounts = new GetAccountsController();
const getAccount = new GetAccountController();
const updateAccount = new UpdateAccountController();
const deleteAccount = new DeleteAccountController();
const accountValidation = new AccountValidationController();

accountRoutes
  .post("/", createAccount.handle)
  .get("/", getAccounts.handle)
  .param("id", accountValidation.handle)
  .get("/:id", getAccount.handle)
  .put("/:id", updateAccount.handle)
  .delete("/:id", deleteAccount.handle);

export default accountRoutes;
