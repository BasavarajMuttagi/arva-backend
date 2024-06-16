import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./src/routes/auth.route";
import ShopRouter from "./src/routes/shop.route";
import UserRouter from "./src/routes/user.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
export const SECRET = process.env.SECRET;
app.get("/", (req, res) => {
  return res.send("Hello From Arva");
});
app.use("/auth", AuthRouter);
app.use("/shop", ShopRouter);
app.use("/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
