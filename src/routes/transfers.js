import { Router } from "express";
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

transfersRoute
  .get("/", getTransfers.handle)
  .post("/", createTransfer.handle)
  .get("/:id", getTransfer.handle)
  .put("/:id", updateTransfer.handle)
  .delete("/:id", deleteTransfer.handle);

export default transfersRoute;
