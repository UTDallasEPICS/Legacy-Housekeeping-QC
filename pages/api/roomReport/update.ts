import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const { id, room_pics, clean_status, comment, score } = req.body;
      const updatedReport = await prisma.inspection.update({
        where: { id },
        data: {
          timestamp: new Date(),
          comment,
          room_pics,
          clean_status,
          inspect_status: "INSPECTED",
          score,
        },
      });
      res.status(200).json(updatedReport);
    }
  } catch (error) {
    res.status(500).json(error + " :Error creating room");
  }
}
