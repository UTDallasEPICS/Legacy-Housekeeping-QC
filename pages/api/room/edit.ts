import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        room_id,
        room_number,
        building_number,
        room_name,
        floor_num,
        is_clean,
        is_active,
        type_of_room,
      } = req.body;
      const addedRoom = await prisma.room.update({
        where:{
          room_id : room_id
        },
        data: {
          room_id,
          room_number,
          building_number,
          room_name,
          floor_num,
          is_clean,
          is_active,
          type_of_room,
        },
      });
      res.status(200).json(addedRoom);
    }
  } catch (error) {
    res.status(500).json(error + " :Error updating room");
  }
}
