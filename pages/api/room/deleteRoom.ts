import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        givenroom_id,
      } = req.body;
      const deletedRoom = await prisma.room.delete({
        where: {
          room_id:givenroom_id,
        },
      });
      res.status(200).json(deletedRoom);
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating room");
  }
}
