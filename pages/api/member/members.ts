import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { toTeamMember } from "../../../ts/types/db.interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const persons = await prisma.person.findMany({
        where: { type: "TEAM_MEMBER" },
        include: { teamMember: true },
      });
      const members = persons.map(toTeamMember);

      res.status(200).json(members);
    } else if (req.method === "DELETE") {
      const amount = await prisma.person.deleteMany({
        where: { type: "TEAM_MEMBER" },
      });
      res.status(200).json(amount);
    }
  } catch (error) {
    res.status(500).send({ error: "Error: " + error });
  }
}
