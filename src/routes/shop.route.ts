import express from "express";
import { createProducts, CreateShop, GetShopDetailsById, GetShopsNearYou } from "../controllers/shop.controller";
import { validateToken } from "../middlewares/auth.middleware";

const ShopRouter = express.Router();
ShopRouter.get("/create", validateToken, CreateShop);
ShopRouter.get("/createproducts", validateToken, createProducts);

ShopRouter.post("/getshops", validateToken, GetShopsNearYou);
ShopRouter.get("/getshop/:Id", validateToken, GetShopDetailsById);


export default ShopRouter;
