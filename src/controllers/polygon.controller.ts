import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import { Polygon } from "../models/Models";

const CreatePolygon = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const record = await Polygon.create({
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [75.7077794451175, 16.858210002071672],
            [75.69019584223076, 16.848835844359428],
            [75.68667004028907, 16.828317648248827],
            [75.70028829084384, 16.81159989961739],
            [75.71546359078908, 16.799562205520417],
            [75.73314232633973, 16.799755265118776],
            [75.7475291835865, 16.823644979292595],
            [75.73464318226618, 16.849456948102684],
            [75.72308812365463, 16.861118283746166],
            [75.7077794451175, 16.858210002071672],
          ],
        ],
      },
    });

    return res.status(201).send(record);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const CheckLocation = async (req: Request, res: Response) => {
  try {
    const polygonId = "6679d29e659d8cb1ac20f330";
    const { location } = req.body;
    const record = await Polygon.findOne({
      _id: polygonId,
      geometry: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates: location,
          },
        },
      },
    });

    if (record) return res.sendStatus(200);

    return res.sendStatus(404);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

export { CreatePolygon, CheckLocation };
