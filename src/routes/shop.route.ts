import express from "express";
import { CreateShop, GetShopsNearYou } from "../controllers/shop.controller";
import { validateToken } from "../middlewares/auth.middleware";

const ShopRouter = express.Router();
ShopRouter.get("/create", validateToken, CreateShop);
ShopRouter.post("/getshops", validateToken, GetShopsNearYou);

export default ShopRouter;
