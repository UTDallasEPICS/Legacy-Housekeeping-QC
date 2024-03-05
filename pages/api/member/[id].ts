import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { toTeamMember } from "../../../ts/types/db.interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { id } = req.query;
      const person = await prisma.person.findUnique({
        where: { id: parseInt(id.toString()) },
        include: { teamMember: true },
      });

      res.status(200).json(person);
    }
  } catch (error) {
    res.status(500).send(error + ": Error retrieving member");
  }
}
