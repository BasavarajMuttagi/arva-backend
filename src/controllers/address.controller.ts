import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import { Address } from "../models/Models";
import { addressType } from "../zod/schemas";

const createAddress = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const { title, pincode, address, location, phone } =
      req.body as addressType;
    const record = await Address.create({
      title,
      pincode,
      address,
      location,
      phone,
      user: user.userId,
    });

    return res.status(201).send(record);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const getAllAddresses = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const addresses = await Address.find({
      user: user.userId,
    });
    return res.status(200).send(addresses);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const getAddressById = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const address = await Address.findById({ _id: user.userId });
    return res.status(200).send(address);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const updateAddressById = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const { title, pincode, address, location, phone } =
      req.body as addressType;
    const updatedAddress = await Address.findByIdAndUpdate(
      { _id: user.userId },
      { title, pincode, address, location, phone }
    );
    return res.status(200).send(updatedAddress);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const deleteAddressById = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const deletedAddress = await Address.findByIdAndDelete({
      _id: user.userId,
    });
    return res.status(200).send(deletedAddress);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

export {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddressById,
  deleteAddressById,
};
