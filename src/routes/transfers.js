import { Router } from "express";
import {
  GetTransfersController,
  CreateTransfersController,
  GetTransferController,
} from "../services/transfers/transfersServices.js";

const transfersRoute = Router();
const getTransfers = new GetTransfersController();
const createTransfer = new CreateTransfersController();
const getTransfer = new GetTransferController();

transfersRoute
  .get("/", getTransfers.handle)
  .post("/", createTransfer.handle)
  .get("/:id", getTransfer.handle);

export default transfersRoute;
