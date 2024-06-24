import { Request, Response } from "express";
import stripe from "stripe";
import { STRIPE_KEY, FE_BASE_URL, STRIPE_WEBHOOK } from "../..";
import { tokenType } from "../middlewares/auth.middleware";
import { Order } from "../models/Models";
const createStripeSession = async (req: Request, res: Response) => {
  try {
    const Stripe = new stripe(STRIPE_KEY as string);
    const { userId, name, email } = req.body.user as tokenType;
    const { products, address, shopId } = req.body;

    const customer = await Stripe.customers.create({
      name,
      email,
      address: {
        city: "Vijayapura",
        line1: "ABC",
        state: "Karnataka",
        country: "India",
        postal_code: "586109",
      },
    });
    const now = Math.floor(Date.now() / 1000);
    const session = await Stripe.checkout.sessions
      .create({
        customer: customer.id,
        ui_mode: "embedded",
        payment_method_types: ["card"],
        line_items: [...products],
        mode: "payment",
        return_url: `${FE_BASE_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
        expires_at: now + 30 * 60,
      })
      .then(async (res) => {
        const record = await Order.create({
          shopId,
          items: products,
          address,
          user: userId,
          sessionId: res.id,
          customerId: res.customer,
          paymentStatus: "Processing",
        });

        return res;
      });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const record = await Order.find({ user: userId })
      .select({
        "address.title": 1,
        images: 1,
        items: 1,
        sessionId: 1,
        paymentStatus: 1,
      })
      .populate("shopId", {
        name: 1,
        address: 1,
      });

    res.status(200).send({ message: "success", data: record ? record : [] });
  } catch (error) {
    res.sendStatus(400);
  }
};

const checkSessionStatus = async (req: Request, res: Response) => {
  try {
    const Stripe = new stripe(STRIPE_KEY as string);
    const session_id = req.query.session_id as string;
    const session = await Stripe.checkout.sessions.retrieve(session_id);
    res.send({
      status: session.status,
    });
  } catch (error) {
    res.sendStatus(400);
  }
};

export { createStripeSession, getAllOrders, checkSessionStatus };
