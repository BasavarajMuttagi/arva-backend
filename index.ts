import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./src/routes/auth.route";
import ShopRouter from "./src/routes/shop.route";
import UserRouter from "./src/routes/user.route";
import mongoose from "mongoose";
import AddressRouter from "./src/routes/address.route";
import PolygonRouter from "./src/routes/polygon.route";
import { PaymentRouter } from "./src/routes/payment.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
export const SECRET = process.env.SECRET;
const DATABASE_URL = process.env.DATABASE_URL;
export const STRIPE_KEY = process.env.STRIPE_SECRET;
export const FE_BASE_URL = process.env.FE_BASE_URL;

app.get("/", (req, res) => {
  return res.send("Hello From Arva");
});
app.use("/auth", AuthRouter);
app.use("/shop", ShopRouter);
app.use("/user", UserRouter);
app.use("/address", AddressRouter);
app.use("/polygon", PolygonRouter);
app.use("/stripe", PaymentRouter);
async function main() {
  try {
    await mongoose.connect(DATABASE_URL!).then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

main();
export default app;
