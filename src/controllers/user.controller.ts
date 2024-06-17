import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import { User, UserPreferences } from "../models/Models";

const AddShopToFavorite = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const { shopId, isFavorite } = req.body;

    const existingFavorite = await UserPreferences.exists({
      coffeeShop: shopId,
      user: userId,
    }).then(async (data) => {
      if (data) {
        const record = await UserPreferences.findByIdAndUpdate(
          { _id: data._id },
          { isFavorite: isFavorite }
        );
        return res.sendStatus(200);
      } else {
        const record = await UserPreferences.create({
          coffeeShop: shopId,
          user: userId,
          isFavorite,
        });
        return res.status(201).json(record);
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const GetUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const record = await User.findById(
      userId,
      "-password -createdAt -updatedAt -__v"
    );
    return res.status(200).json(record);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const UpdateUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const { phone, address, pincode, fullname } = req.body;
    const record = await User.findByIdAndUpdate(
      {_id: userId },
      { phone, address, pincode, fullname }
    );
    return res.status(200).json(record);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};
export { AddShopToFavorite, GetUserProfile ,UpdateUserProfile};
