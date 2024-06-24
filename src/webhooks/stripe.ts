import { Request, Response } from "express";
import stripe from "stripe";
import { STRIPE_WEBHOOK } from "../..";
import { Order } from "../models/Models";

const stripWebHook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, STRIPE_WEBHOOK!);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (session.payment_status == "paid") {
        const record = await Order.findOneAndUpdate(
          { sessionId: session.id },
          { $set: { paymentStatus: "Success" } }
        );
      }

      if (session.payment_status == "unpaid") {
        const record = await Order.findOneAndUpdate(
          { sessionId: session.id },
          { $set: { paymentStatus: "Failure" } }
        );
      }
      break;
    }
  }

  res.sendStatus(200);
};

export default stripWebHook;
