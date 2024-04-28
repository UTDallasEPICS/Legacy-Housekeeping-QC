import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { id } = req.body;

      let response;
      await prisma.$transaction(async (prisma) => {
          const deletedBuilding = await prisma.building.delete({
            where: {
              id: Number(id),
            },
          });
          const deletedRooms = await prisma.room.deleteMany({
            where: {
              building_id: Number(id),
            },
          });

          response = {deletedBuilding, deletedRooms};

        });

      res.status(200).json(response);

    }
  } catch (error) {
    res.status(500).json(error + " :Error editing building");
  }
}
