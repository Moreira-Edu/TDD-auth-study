import { Router } from "express";
import TransferValidationController from "../middleware/validation/TransferValidationController.js";
import {
  GetTransfersController,
  CreateTransfersController,
  GetTransferController,
  UpdateTransferController,
  DeleteTransferController,
} from "../services/transfers/transfersServices.js";

const transfersRoute = Router();
const getTransfers = new GetTransfersController();
const createTransfer = new CreateTransfersController();
const getTransfer = new GetTransferController();
const updateTransfer = new UpdateTransferController();
const deleteTransfer = new DeleteTransferController();
const transferValidation = new TransferValidationController();

transfersRoute
  .get("/", getTransfers.handle)
  .post("/", createTransfer.handle)
  .param("id", transferValidation.handle)
  .get("/:id", getTransfer.handle)
  .put("/:id", updateTransfer.handle)
  .delete("/:id", deleteTransfer.handle);

export default transfersRoute;
