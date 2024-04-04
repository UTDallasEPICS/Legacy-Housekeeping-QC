import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { userId } = req.body;
      const addedAdmin = await prisma.admin.create({
        data: {
          userId,
        },
      });
      res.status(200).json(addedAdmin);
    }
  } catch (error) {
    res.status(500).end(error + " :Error adding admin");
  }
}
