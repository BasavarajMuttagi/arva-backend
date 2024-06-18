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
AddressRouter.get("/create", validateToken, createAddress);
AddressRouter.get("/get", validateToken, getAddressById);
AddressRouter.get("/getall", validateToken, getAllAddresses);
AddressRouter.get("/update", validateToken, updateAddressById);
AddressRouter.post("/delete", validateToken, deleteAddressById);

export default AddressRouter;
