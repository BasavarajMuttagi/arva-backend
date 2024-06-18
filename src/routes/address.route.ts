import express from "express";
import {
  createAddress,
  deleteAddressById,
  getAddressById,
  getAllAddresses,
  updateAddressById,
} from "../controllers/address.controller";
import { validateToken } from "../middlewares/auth.middleware";

const AddressRouter = express.Router();
AddressRouter.post("/create", validateToken, createAddress);
AddressRouter.get("/get", validateToken, getAddressById);
AddressRouter.get("/getall", validateToken, getAllAddresses);
AddressRouter.post("/update", validateToken, updateAddressById);
AddressRouter.get("/delete/:id", validateToken, deleteAddressById);

export default AddressRouter;
