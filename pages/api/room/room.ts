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
        floor, 
        roomId,
      } = req.body;
      
      const room = await prisma.room.findFirst({
        where: {
            building_id: buildingId,
            floor_number: floor,
            id: roomId,
        }
      });

      res.status(200).json(room);
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving a room");
  }
}
