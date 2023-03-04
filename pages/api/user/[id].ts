import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { id } = req.query;
      const user = await prisma.user.findUnique({
        where: {
          user_id: id.toString(),
        },
      });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving user");
  }
}
