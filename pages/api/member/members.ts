import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { toTeamMember } from "../../../ts/types/db.interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const memberPersons = await prisma.teamMember.findMany({
        include: { person: true },
      });
      const members = memberPersons.map(toTeamMember);

      res.status(200).json(members);
    } else if (req.method === "DELETE") {
      const members = await prisma.teamMember.deleteMany({});
      res.status(200).json(members);
    }
  } catch (error) {
    res.status(500).send({ error: "Error: " + error });
  }
}
