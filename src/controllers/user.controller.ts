import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import { UserPreferences } from "../models/Models";

const addShopToFavorite = async (req: Request, res: Response) => {
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

export { addShopToFavorite };
