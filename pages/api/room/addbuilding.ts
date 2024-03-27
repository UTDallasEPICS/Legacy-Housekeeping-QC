import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { building_name, floors_amount } = req.body;
      const addedBuilding = await prisma.building.create({
        data: {
          name: building_name,
          floor_count: Number(floors_amount),
        },
      });
      res.status(200).json(addedBuilding);
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating room");
  }
}
