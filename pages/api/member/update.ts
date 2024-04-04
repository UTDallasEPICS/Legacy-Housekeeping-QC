import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const {
        member_id,
        first_name,
        last_name,
        email,
      } = req.body;

      const addedMember = await prisma.teamMembers.update({
        where: {
          member_id,
        },
        data: {
          first_name: first_name || undefined,
          last_name: last_name || undefined,
          email: email || undefined,
        },
      });
      res.status(200).json(addedMember);
    }
  } catch (err) {
    res.status(500).send({ error: "Error craeting new member,  " + err });
  }
}
