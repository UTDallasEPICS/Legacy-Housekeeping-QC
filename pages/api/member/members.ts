import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getServerSession(req, res, authOptions);
  try {
    if (req.method === "GET") {
      const members = await prisma.teamMembers.findMany({
        include: {
          points: true,
        },
      });
      res.status(200).json(members);
    } else if (req.method === "DELETE") {
      const members = await prisma.teamMembers.deleteMany({});
      res.status(200).json(members);
    }
  } catch (error) {
    res.status(500).send({ error: "Error: " + error });
  }
}
