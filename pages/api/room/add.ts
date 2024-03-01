import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { RoomType } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        building_id,
        room_name,
        floor_num,
        type_of_room,
      } = req.body;

      let type: RoomType;
      if (type_of_room == "personal") {
        type = RoomType.PERSONAL_ROOM;
      } else if (type_of_room == "common") {
        type = RoomType.COMMON_AREA;
      }

      const addedRoom = await prisma.room.create({
        data: {
          building_id: building_id,
          name: room_name,
          floor_number: floor_num,
          type: type
        },
      });
      res.status(200).json(addedRoom);
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating room");
  }
}
