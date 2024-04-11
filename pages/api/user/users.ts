import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json(error + " :Error retrieving users");
  }
}
