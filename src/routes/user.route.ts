import express from "express";
import { validateToken } from "../middlewares/auth.middleware";
import { addShopToFavorite } from "../controllers/user.controller";

const UserRouter = express.Router();

UserRouter.post("/addShopToFavorite", validateToken, addShopToFavorite);

export default UserRouter;
