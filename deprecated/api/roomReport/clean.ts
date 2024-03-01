import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const roomCleaned = await prisma.roomReport.findMany({
        where: {
          cleaned: true,
        },
        include: {
          team_member: true,
          room: true,
        },
      });
      res.status(200).json(roomCleaned);
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving cleaned report");
  }
}
