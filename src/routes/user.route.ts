import express from "express";
import { validateToken } from "../middlewares/auth.middleware";
import {
  AddShopToFavorite,
  GetUserProfile,
  UpdateUserProfile,
} from "../controllers/user.controller";

const UserRouter = express.Router();

UserRouter.post("/addShopToFavorite", validateToken, AddShopToFavorite);
UserRouter.get("/profile", validateToken, GetUserProfile);
UserRouter.post("/updateprofile", validateToken, UpdateUserProfile);

export default UserRouter;
