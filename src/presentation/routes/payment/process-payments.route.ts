import express from "express";
import { getTransactions, initiatePayment, transactionStatus } from "../../../infrastructure/momo-api/process-payment.controller";
import { isAuthenticatedMiddleware } from "../../../shared/middlewares/is-authenticated.middleware";

const processPaymentRouter = express.Router();


processPaymentRouter.post("/", initiatePayment);
processPaymentRouter.get("/:reference", transactionStatus);
processPaymentRouter.post("/history", isAuthenticatedMiddleware, getTransactions);

export default processPaymentRouter;
