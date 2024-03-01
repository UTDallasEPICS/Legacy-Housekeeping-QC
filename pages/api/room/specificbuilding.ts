import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name } = req.body;
      const building = await prisma.building.findFirst({
        where: {
          name: name,
        }
      });
      const floors_amount = await prisma.floor.count({
        where: {
          building_id: building.id
        }
      });
      res.status(200).json({name: building.name, floors_amount: floors_amount, id: building.id});
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving a building");
  }
}
