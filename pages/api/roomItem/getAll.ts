import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const items = await prisma.item.findMany();
      res.status(200).json(items);
    }
  } catch (error) {
    res.status(500).json(error + ": Error retrieving items");
  }
}
