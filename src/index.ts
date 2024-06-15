import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.route";
import ShopRouter from "./routes/shop.route";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
export const SECRET = process.env.SECRET;
app.use("/auth", AuthRouter);
app.use("/shop", ShopRouter);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
