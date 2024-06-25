import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import { CoffeeShop, Product, UserPreferences } from "../models/Models";
import mongoose from "mongoose";

const CreateShop = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const record = await CoffeeShop.create({
      name: "Chai Patram",
      address: "Vijayapura, Karnataka 586101",
      location: {
        type: "Point",
        coordinates: [75.71949571239814, 16.813640678849257],
      },
    });

    return res.status(201).send(record);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const createProducts = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const record = await Product.insertMany([]);

    return res.status(201).send(record);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const GetShopsNearYou = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const { long, lat } = req.body;
    const records = await CoffeeShop.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [long, lat],
          },
          distanceField: "distance",
          spherical: true,
        },
      },
      {
        $lookup: {
          from: "userpreferences",
          localField: "_id",
          foreignField: "coffeeShop",
          as: "pref",
        },
      },
      {
        $addFields: {
          pref: {
            $filter: {
              input: "$pref",
              as: "prefItem",
              cond: {
                $eq: ["$$prefItem.user", new mongoose.Types.ObjectId(userId)],
              },
            },
          },
        },
      },
      {
        $unwind: {
          path: "$pref",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          address: 1,
          distance: 1,
          reviews: 1,
          rating: 1,
          isFavorite: {
            $ifNull: ["$pref.isFavorite", false],
          },
          isBookmarked: {
            $ifNull: ["$pref.isBookmarked", false],
          },
          images: 1,
          user: 1,
          coffeeShop: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    return res.status(200).send(records);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const GetShopDetailsById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const shopId = req.params.Id;
    const records = await CoffeeShop.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(shopId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "coffeeShop",
          as: "products",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          address: 1,
          images: 1,
          location: 1,
          reviews: 1,
          rating: 1,
          products: {
            $map: {
              input: "$products",
              as: "product",
              in: {
                _id: "$$product._id",
                name: "$$product.name",
                price: "$$product.price",
                description: "$$product.description",
                dietType: "$$product.dietType",
                category: "$$product.category",
                imageUrl: "$$product.imageUrl",
              },
            },
          },
        },
      },
    ]);
    res.status(200).json(records[0] ? records[0] : []);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const GetUserFavoriteShops = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user as tokenType;
    const { long, lat } = req.body;

    const records = await CoffeeShop.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [long, lat],
          },
          distanceField: "distance",
          spherical: true,
        },
      },
      {
        $lookup: {
          from: "userpreferences",
          localField: "_id",
          foreignField: "coffeeShop",
          as: "pref",
        },
      },
      {
        $match: {
          "pref.user": new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $addFields: {
          pref: {
            $filter: {
              input: "$pref",
              as: "prefItem",
              cond: {
                $eq: ["$$prefItem.user", new mongoose.Types.ObjectId(userId)],
              },
            },
          },
        },
      },
      {
        $unwind: {
          path: "$pref",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "pref.isFavorite": true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          address: 1,
          distance: 1,
          reviews: 1,
          rating: 1,
          isFavorite: { $ifNull: ["$pref.isFavorite", false] },
          isBookmarked: { $ifNull: ["$pref.isBookmarked", false] },
          images: 1,
          user: 1,
          coffeeShop: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return res.status(200).send(records);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

export {
  CreateShop,
  GetShopsNearYou,
  GetShopDetailsById,
  createProducts,
  GetUserFavoriteShops,
};
