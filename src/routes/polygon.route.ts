import express from "express";
import { validateToken } from "../middlewares/auth.middleware";
import {
  CheckLocation,
  CreatePolygon,
} from "../controllers/polygon.controller";

const PolygonRouter = express.Router();

PolygonRouter.get("/create", validateToken, CreatePolygon);
PolygonRouter.post("/check", validateToken, CheckLocation);
export default PolygonRouter;
