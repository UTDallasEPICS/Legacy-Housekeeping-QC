import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { id } = req.query;
      const member = await prisma.teamMembers.findUnique({
        where: {
          member_id: id.toString(),
        },
        include: {
          points: true,
        },
      });
      res.status(200).json(member);
    }
  } catch (error) {
    res.status(500).send(error + ": Error retrieving member");
  }
}
