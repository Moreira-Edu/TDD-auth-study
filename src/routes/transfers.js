import { Router } from "express";
import {
  GetTransfersController,
  CreateTransfersController,
} from "../services/transfers/transfersServices.js";

const transfersRoute = Router();
const getTransfers = new GetTransfersController();
const createTransfer = new CreateTransfersController();

transfersRoute
  .get("/", getTransfers.handle)
  .post("/", createTransfer.handle);

export default transfersRoute;
