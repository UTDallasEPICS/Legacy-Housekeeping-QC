import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {RoomType} from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        room_id,
      } = req.body;

      let response;
      await prisma.$transaction(async (prisma) => {
          const roomToDelete = await prisma.room.findUnique({
              where: {
                  id: room_id,
              },
          });

          let deletedSubroom

          if (roomToDelete.type == RoomType.PERSONAL_ROOM) {
              deletedSubroom = await prisma.personalRoom.delete({
                  where: {
                      id: room_id,
                  },
              });
          } else if (roomToDelete.type == RoomType.COMMON_AREA) {
              deletedSubroom = await prisma.commonArea.delete({
                  where: {
                      id: room_id,
                  },
              });
          }

          const deletedRoom = await prisma.room.delete({
              where: {
                  id: roomToDelete.id,
              },
          });

          response = {deletedRoom, deletedSubroom};

      });

      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json(error + " :Error deleting room");
  }
}
