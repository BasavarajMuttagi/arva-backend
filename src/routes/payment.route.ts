import express from "express";
import {
  checkSessionStatus,
  createStripeSession,
  getAllOrders,
} from "../controllers/payment.controller";
import { validateToken } from "../middlewares/auth.middleware";

const PaymentRouter = express.Router();

PaymentRouter.post("/stripe-session", validateToken, createStripeSession);
PaymentRouter.get("/orders", validateToken, getAllOrders);
PaymentRouter.get("/session-status", validateToken, checkSessionStatus);

export { PaymentRouter };
