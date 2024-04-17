import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { 
        buildingId,
      } = req.body;
      
      const building = await prisma.building.findFirst({
        where: {
          id: buildingId,
        }
      });

      res.status(200).json(building);
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving a room");
  }
}
