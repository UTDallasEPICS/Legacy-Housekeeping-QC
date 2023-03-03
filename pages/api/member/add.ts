import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { first_name, last_name, email } = req.body;
      const addedMember = await prisma.teamMembers.create({
        data: {
          first_name,
          last_name,
          email,
        },
      });
      res.status(200).json(addedMember);
    }
  } catch (error) {
    res.status(500).end(error + " :Error craeting new member");
  }
}
