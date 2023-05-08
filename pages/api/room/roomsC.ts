import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const rooms = await prisma.room.findMany({
        where: {
          building_number: "C",
        },
      });
      res.status(200).json(rooms);
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving rooms");
  }
}
