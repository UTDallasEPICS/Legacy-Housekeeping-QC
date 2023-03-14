import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const { team_member_id, room_id, cleaned, comments } = req.body;
      const updatedReport = await prisma.roomReport.update({
        where: {
          team_member_id_room_id: {
            team_member_id,
            room_id,
          },
        },
        data: {
          cleaned,
          comments,
          date: new Date(),
        },
      });
      res.status(200).json(updatedReport);
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating room");
  }
}
// began 11:24pm
