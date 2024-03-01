import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        name,
        floors_amount,
      } = req.body;
      const addedBuilding = await prisma.building.create({
        data: {
          name
        },
      });
      const addedFloors = await prisma.floor.createMany({
        data: Array.from({length: floors_amount}, (_, i) => ({
          number: i + 1,
          building_id: addedBuilding.id
        }))
      });
      res.status(200).json({addedBuilding, addedFloors});
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating room");
  }
}
