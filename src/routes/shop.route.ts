import express from "express";
import {
  createProducts,
  CreateShop,
  GetShopDetailsById,
  GetShopsNearYou,
  GetUserFavoriteShops,
} from "../controllers/shop.controller";
import { validateToken } from "../middlewares/auth.middleware";

const ShopRouter = express.Router();
ShopRouter.get("/create", validateToken, CreateShop);
ShopRouter.get("/createproducts", validateToken, createProducts);
ShopRouter.get("/getshop/:Id", validateToken, GetShopDetailsById);
ShopRouter.post("/getallfavoriteshops", validateToken, GetUserFavoriteShops);
ShopRouter.post("/getshops", validateToken, GetShopsNearYou);

export default ShopRouter;
