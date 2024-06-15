import { Request, Response } from "express";
import prisma from "../../prisma/db";
import { tokenType } from "../middlewares/auth.middleware";

const CreateShop = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const record = await prisma.coffeeShop.create({
      data: {
        name: "Cafetree",
        address: "Vijayapura, Karnataka 586101",
        geo: {
          type: "Point",
          coordinates: [75.72543250758099, 16.808189840933924],
        },
      },
    });

    return res.status(201).send(record);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const GetShopsNearYou = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const { long, lat, min_distance, max_distance } = req.body;
    const records = await prisma.coffeeShop.aggregateRaw({
      pipeline: [
        {
          $geoNear: {
            near: { type: "Point", coordinates: [long, lat] },
            distanceField: "distance",
            maxDistance: max_distance,
            spherical: true,
          },
        },
      ],
    })
    return res.status(200).send(records);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};
export { CreateShop, GetShopsNearYou };
