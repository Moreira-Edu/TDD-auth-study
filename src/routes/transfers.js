import { Router } from "express";
import GetTransfersController from "../services/transfers/transfersServices.js";

const transfersRoute = Router();
const getTransfers = new GetTransfersController();

transfersRoute
  .get("/", getTransfers.handle);

export default transfersRoute;
