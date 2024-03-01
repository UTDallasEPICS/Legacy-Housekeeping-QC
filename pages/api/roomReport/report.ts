import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const roomCleaned = await prisma.inspection.findMany({
        include: {
          schedule: {
            include: {
              room: true,
              team_members: true,
            },
          },
        },
      });
      res.status(200).json(roomCleaned);
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving reports");
  }
}
