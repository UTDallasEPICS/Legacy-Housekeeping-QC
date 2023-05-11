import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { team_member_id, room_id, cleaned, comments, score } = req.body;
      const addedReport = await prisma.roomReport.create({
        data: {
          team_member_id,
          room_id,
          cleaned,
          comments,
          score,
        },
      });
      res.status(200).json(addedReport);
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating room report");
  }
}
