import { Request, Response } from "express";
import prisma from "../../prisma/db";
import { tokenType } from "../middlewares/auth.middleware";

const addShopToFavorite = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const { shopId } = req.body;
    const record = await prisma.favorite.create({
      data: { coffeeShopId: shopId, userId },
    });

    return res.sendStatus(201);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

export { addShopToFavorite };
