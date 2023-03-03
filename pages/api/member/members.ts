import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const members = await prisma.teamMembers.findMany({
    include: {
      points: true,
    },
  });
  res.status(200).json(members);
}
