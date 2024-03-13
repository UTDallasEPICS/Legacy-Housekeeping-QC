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
        building_number,
        building_id,
        room_name,
        floor_num,
        is_clean,
        is_active,
        type_of_room,
      } = req.body;

      const addedRoom = await prisma.room.update({
        where:{
          id : room_id
        },
        data: {
          id :room_id,
          name: room_name,
          type: type_of_room,
          building_id: building_id,
          floor_number: floor_num,
        },
      });
      res.status(200).json(addedRoom);
    }
  } catch (error) {
    res.status(500).json(error + " :Error updating room");
  }
}
