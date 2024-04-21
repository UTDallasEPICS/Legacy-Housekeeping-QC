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
        building_id,
        room_name,
        floor_num,
        is_clean,
        is_active,
        type_of_room,
      } = req.body;

      let type: RoomType;
      if (type_of_room == "PERSONAL_ROOM") {
        type = RoomType.PERSONAL_ROOM;
      } else if (type_of_room == "COMMON_AREA") {
        type = RoomType.COMMON_AREA;
      }
      else{
        res.status(500).json("Invalid room type provided.");
      }

      const room = await prisma.room.findUnique({
        where: {
          id: room_id,
        },
      });

      const updatedRoom = await prisma.room.update({
        where:{
          id : room_id
        },
        data: {
          id :room_id,
          name: room_name,
          type: type,
          building_id: building_id,
          floor_number: floor_num,
        },
      });

      if (type_of_room === "personal" && room.type === RoomType.COMMON_AREA) {
        const addedPersonalRoom = await prisma.personalRoom.create({
          data: {
            id: updatedRoom.id,
            room_id: updatedRoom.id,
            is_occupied: false
          }}
        );

        const deletedCommonRoom = await prisma.commonArea.delete({
            where: {
                room_id: updatedRoom.id
            }
            });

        res.status(200).json({updatedRoom, addedPersonalRoom, deletedCommonRoom});
      }
      else if (type_of_room === "common" && room.type === RoomType.PERSONAL_ROOM) {
        const addedCommonRoom = await prisma.commonArea.create({
          data: {
            id: updatedRoom.id,
            room_id: updatedRoom.id,
          }}
        );

        const deletedPersonalRoom = await prisma.personalRoom.delete({
            where: {
                room_id: updatedRoom.id
            }
            });

        res.status(200).json({updatedRoom, addedCommonRoom, deletedPersonalRoom});
      }
    }
  } catch (error) {
    res.status(500).json(error + " :Error updating room");
  }
}
