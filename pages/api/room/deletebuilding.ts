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
      } = req.body;
      const deletedBuilding = await prisma.building.delete({
        where:{
          id: id,
        },
      });
      const deletedRooms = await prisma.room.deleteMany({
        where:{
          building_id: id,
        }
      })
      res.status(200).json(deletedBuilding);
    }
  } catch (error) {
    res.status(500).json(error + " :Error editing building");
  }
}
