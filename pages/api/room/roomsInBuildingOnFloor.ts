import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        floor_num,
        building_id,
      } = req.body;
      const rooms = await prisma.room.findMany({
        where: {
          floor_number: Number(floor_num),
          building_id: Number(building_id)
        }
      });
      res.status(200).json(rooms);
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving rooms");
  }
}
