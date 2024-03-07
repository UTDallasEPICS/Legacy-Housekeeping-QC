import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        id,
        building_name,
        floors_amount,
      } = req.body;
      const editedBuilding = await prisma.building.update({
        where:{
          id: Number(id),
        },
        data: {
          id: Number(id),
          name: building_name,
          floor_count: floors_amount
        },
      });
      res.status(200).json(editedBuilding);
    }
  } catch (error) {
    res.status(500).json(error + " :Error editing building");
  }
}
