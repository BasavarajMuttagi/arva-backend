import { Request, Response } from "express";

import stripe from "stripe";
import { STRIPE_KEY, FE_BASE_URL } from "../..";

import { decode } from "jsonwebtoken";
import { tokenType } from "../middlewares/auth.middleware";
import { Order } from "../models/Models";

const createStripeSession = async (req: Request, res: Response) => {
  try {
    const { userId, name, email } = req.body.user as tokenType;
    const Stripe = new stripe(STRIPE_KEY as string);
    const { products, address, shopId } = req.body;

    console.log(products);
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
    const session = await Stripe.checkout.sessions
      .create({
        customer: customer.id,
        ui_mode: "embedded",
        payment_method_types: ["card"],
        line_items: [...products],
        mode: "payment",
        return_url: `${FE_BASE_URL}/success`,
      })
      .then(async (res) => {
        const record = await Order.create({
          shopId,
          items: products,
          address,
          user: userId,
          paymentId: res.client_secret,
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
    const { userId, name, email } = req.body.user as tokenType;
    const record = await Order.find({ user: userId })
      .select({
        "address.title": 1,
        images: 1,
        items: 1,
        paymentId: 1,
      })
      .populate("shopId", {
        name: 1,
        address: 1,
      });

    res.status(200).send({ message: "success", data: record ? record : [] });
  } catch (error) {
    console.log(error);
  }
};

const getOrderStatus = async (req: Request, res: Response) => {
  console.log(req.body);
  const Stripe = new stripe(STRIPE_KEY as string);
};
export { createStripeSession, getAllOrders, getOrderStatus };
