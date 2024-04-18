import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { RoomType } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { building_id, room_name, floor_num, type_of_room } = req.body;

      let type: RoomType;
      if (type_of_room == "personal") {
        type = RoomType.PERSONAL_ROOM;
      } else if (type_of_room == "common") {
        type = RoomType.COMMON_AREA;
      } else {
        res.status(500).json("Invalid room type provided.");
      }

      let response = {};
      await prisma.$transaction(async (prisma) => {
        const addedRoom = await prisma.room.create({
          data: {
            name: room_name,
            floor_number: Number(floor_num),
            building: { connect: { id: Number(building_id) } },
            type: type,
          },
        });

        if (type_of_room == "personal") {
          const addedPersonalRoom = await prisma.personalRoom.create({
            data: {
              id: addedRoom.id,
              room_id: addedRoom.id,
              is_occupied: false,
            },
          });
          response = { addedPersonalRoom, addedRoom };
        } else if (type_of_room == "common") {
          const addedCommonRoom = await prisma.commonArea.create({
            data: {
              id: addedRoom.id,
              room_id: addedRoom.id,
            },
          });
          response = { addedCommonRoom, addedRoom };
        }
      });

      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating room");
  }
}
