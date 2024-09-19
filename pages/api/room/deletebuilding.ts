import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { RoomType } from "@prisma/client";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { id } = req.body;

      let response;
      await prisma.$transaction(async (prisma) => {
        // Find the building to delete
        const buildingToDelete = await prisma.building.findUnique({
          where: {
            id: Number(id),
          },
        });

        if (!buildingToDelete) {
          throw new Error("Building not found");
        }

        // Find all rooms associated with the building
        const roomsToDelete = await prisma.room.findMany({
          where: {
            building_id: buildingToDelete.id,
          },
        });

        // Delete all related foreign keys and entries for each room
        for (const room of roomsToDelete) {
          let deletedSubroom;

          if (room.type == RoomType.PERSONAL_ROOM) {
            deletedSubroom = await prisma.personalRoom.delete({
              where: {
                id: room.id,
              },
            });
          } else if (room.type == RoomType.COMMON_AREA) {
            deletedSubroom = await prisma.commonArea.delete({
              where: {
                id: room.id,
              },
            });
          }

          // Add more delete operations for other related tables as needed
        }

        // Delete all rooms associated with the building
        const deletedRooms = await prisma.room.deleteMany({
          where: {
            building_id: buildingToDelete.id,
          },
        });

        // Delete the building
        const deletedBuilding = await prisma.building.delete({
          where: {
            id: buildingToDelete.id,
          },
        });

        response = { deletedBuilding, deletedRooms };
      });

      res.status(200).json(response);
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}