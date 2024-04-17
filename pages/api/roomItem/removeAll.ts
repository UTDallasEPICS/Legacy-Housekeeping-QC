import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "DELETE") {
      const amount = await prisma.item.deleteMany();
      res.status(200).json(amount);
    }
  } catch (error) {
    res.status(500).json(error + ": Error deleting all items");
  }
}
