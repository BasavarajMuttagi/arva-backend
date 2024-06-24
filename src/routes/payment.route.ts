import express from "express";
import {
  createStripeSession,
  getAllOrders,
  getOrderStatus,
} from "../controllers/payment.controller";
import { validateToken } from "../middlewares/auth.middleware";

const PaymentRouter = express.Router();

PaymentRouter.post("/stripe-session", validateToken, createStripeSession);
PaymentRouter.get("/orders", validateToken, getAllOrders);
PaymentRouter.post("/orderstatus", validateToken, getOrderStatus);

export { PaymentRouter };
