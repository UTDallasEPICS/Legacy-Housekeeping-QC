import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { memberID } = req.body;

      const scores = await prisma.score.findMany({
        where: {
            id: memberID,
        }
      });

      res.status(200).json(scores);
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving scores");
  }
}
