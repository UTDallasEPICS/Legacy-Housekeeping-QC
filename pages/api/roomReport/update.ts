import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const { team_member_id, room_id, cleaned, comments } = req.body;
      const updatedReport = await prisma.roomReport.create({
        data: {
          team_member_id,
          room_id,
          cleaned,
          comments,
        },
      });
      res.status(200).json(updatedReport);
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating room");
  }
}
