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
        room_type,
      } = req.body;

      //Defines the Enum so that sorting can happen
      const roomType = room_type === 'PERSONAL_ROOM' ? 'personal' :
                       room_type === 'COMMON_AREA' ? 'common': 
                       room_type === 'default' ? undefined : undefined;

      const rooms = await prisma.room.findMany({
        where: {
          floor_number: Number(floor_num),
          building_id: Number(building_id),
          ...(room_type === "COMMON_AREA" && {type: room_type}),
          ...(room_type === "PERSONAL_ROOM" && {type: room_type})
        }
      });
      res.status(200).json(rooms);
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving rooms");
  }
}
